import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SearchBobjects } from '@bloobirds-it/bobjects';
import { Icon, IconButton, IconType, Spinner, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useSuggestedTemplates } from '@bloobirds-it/hooks';
import { InfoWarning } from '@bloobirds-it/misc';
import {
  Bobject,
  BobjectType,
  BobjectTypes,
  GlobalSearchResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  LogicRoleType,
  MIXPANEL_EVENTS,
  MainBobjectTypes,
  MessagesEvents,
  PlaybookTab,
} from '@bloobirds-it/types';
import { api, getTextFromLogicRole, isValidPhone as checkValidPhone } from '@bloobirds-it/utils';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';
import { AsYouType } from 'libphonenumber-js';
import debounce from 'lodash/debounce';
import mixpanel from 'mixpanel-browser';

import bobjectStyles from './bobjectItem.module.css';
import {
  BobjectOfPhone,
  DialerOpenStatus,
  DialerStatus,
  DialerTab,
  useDialer,
  useDialerStore,
} from './dialer';
import styles from './dialer.module.css';

const ICONS: Partial<Record<BobjectType, IconType>> = {
  Lead: 'person',
  Company: 'company',
  Opportunity: 'fileOpportunity',
};

async function tryToMatchPhoneNumber(
  dialedPhoneNumber: string,
  bobjectId: string,
  setMatchedBobject: (bobject: BobjectOfPhone) => void,
) {
  setMatchedBobject(null);
  try {
    const response = await api.post('/calls/whiteLabel/search', { phoneNumber: dialedPhoneNumber });
    if (response.status === 200) {
      const bobjects: Bobject<MainBobjectTypes>[] = response.data;

      if (bobjects.length === 0) {
        setMatchedBobject({
          hasMatched: false,
        });
        return;
      }

      let bobject: Bobject<MainBobjectTypes>;
      if (!bobjectId || bobjects.length === 1) {
        bobject = bobjects[0];
      } else {
        bobject = bobjects.find(b => b.id.value === bobjectId);
      }

      if (bobject) {
        const type = bobject.id.typeName;
        const isLead = type === BobjectTypes.Lead;
        const name = getTextFromLogicRole(
          bobject,
          (type.toUpperCase() + (isLead ? '__FULL_NAME' : '__NAME')) as LogicRoleType<
            BobjectTypes.Company | BobjectTypes.Lead
          >,
        );
        const leadCompanyId =
          isLead && getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY);
        const foundBobject = {
          bobject,
          companyId: leadCompanyId,
          id: bobject.id.value,
          name,
          type,
          hasMatched: true,
        };
        setMatchedBobject(foundBobject);
      } else {
        setMatchedBobject({
          hasMatched: false,
        });
      }

      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
      if (bobjectId) {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ForceOpenExtension, {
            detail: { bobjectId, avoidRefreshBobjectFromContext: true },
          }),
        );
      }
    }
    if (response.status === 404) {
      setMatchedBobject({
        hasMatched: false,
      });
    }
  } catch (e) {
    console.log(e);
    setMatchedBobject({
      hasMatched: false,
    });
  }
}

const debounceTryToMatchPhoneNumber = debounce(tryToMatchPhoneNumber, 500);

export const isValidPhone = phone => {
  try {
    return checkValidPhone(phone);
  } catch (e) {
    return false;
  }
};

function isNumeric(value) {
  return /^\d+$/.test(value);
}

const getName = bobject => {
  switch (bobject.bobjectType) {
    case 'Lead':
      return bobject?.fullName;
    default:
      return bobject?.companyName;
  }
};

export const Dial = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState(null);
  const [noResults, setNoResults] = useState<boolean>();
  const [bobjectsWithSamePhone, setBobjectsWithSamePhone] = useState<GlobalSearchResponse[]>([]);
  const [openSearch, setOpenSearch] = useState(false);
  const { setDialedPhoneNumber, setMatchedBobject, snapshot } = useDialerStore();
  const dialedPhoneNumber = useDialer(state => state.dialedPhoneNumber);
  const bobjectId = useDialer(state => state.bobjectId);
  const status = useDialer(state => state.status);
  const bobjectOfPhone = useDialer(state => state.bobjectMatch);
  const tab = useDialer(state => state.tab);
  const open = useDialer(state => state.open);
  const dialRef = useRef<HTMLInputElement>();
  //preload the suggested templates
  useSuggestedTemplates(bobjectOfPhone?.bobject, undefined, PlaybookTab.PITCHES);

  const { t } = useTranslation();

  const { settings } = useActiveUserSettings();
  const accountId = settings?.account.id;

  const shouldRenderLoader =
    bobjectOfPhone &&
    bobjectOfPhone.hasMatched === undefined &&
    dialedPhoneNumber?.startsWith('+') &&
    dialedPhoneNumber?.length >= 9;

  const isNumber =
    (search &&
      search.length > 0 &&
      ((search.startsWith('+') && search.length >= 9) || isValidPhone(search))) ||
    isNumeric(search);

  const handleChange = bobject => {
    if (bobject?.rawBobject?.id !== bobjectId) {
      setDialedPhoneNumber(bobject.phone, bobject?.rawBobject?.id);
    }
    setOpenSearch(false);
  };

  useEffect(() => {
    if (open !== DialerOpenStatus.closed) {
      setMatchedBobject(null);
      // If the dialedPhoneNumber is a e.164 number (starts with +) and the lenght is the minimum lenght for a e.164 number (starts with + and has at least 8 digits after the +)
      // then we try to find the number in the bobjects
      if (dialedPhoneNumber && dialedPhoneNumber.startsWith('+') && dialedPhoneNumber.length >= 9) {
        debounceTryToMatchPhoneNumber(dialedPhoneNumber, bobjectId, setMatchedBobject);
      }

      if (dialedPhoneNumber) {
        setSearch(dialedPhoneNumber);
      }
    } else {
      setSearch(null);
    }
  }, [dialedPhoneNumber, bobjectId, open]);

  useEffect(() => {
    if (search !== null && search !== dialedPhoneNumber) {
      if (isNumber && noResults) {
        setDialedPhoneNumber(search);
      } else {
        setDialedPhoneNumber('');
      }
    }
  }, [search, noResults, isNumber]);

  useEffect(() => {
    if (status === DialerStatus.idle) {
      setSearch(null);
    }
  }, [status]);

  useEffect(() => {
    const handleKeyPress = e => {
      if (/^[0-9#*+]$/.test(e.key) && status === DialerStatus.connected) {
        dialRef.current.focus();
        snapshot()?.call?.sendDigits(e.key);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const onNameClick = event => {
    event.preventDefault();
    event.stopPropagation();
    if (bobjectOfPhone?.id) {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ForceOpenExtension, {
          detail: { bobjectId: bobjectOfPhone?.id },
        }),
      );
    }
  };

  return (
    <div className={styles.dial}>
      <SearchBobjects
        accountId={accountId}
        onChange={handleChange}
        anchorElement={() => (
          <input
            className={styles.dialInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMatchedBobject(null);

              if (
                //@ts-ignore
                e.nativeEvent.inputType === 'insertFromPaste'
              ) {
                setDialedPhoneNumber(e.target.value);
              } else {
                setSearch(e.target.value);
              }
            }}
            placeholder="E.G Bloobirds, +34 123 456 789..."
            disabled={
              ![DialerStatus.connected, DialerStatus.idle].includes(status) &&
              tab === DialerTab.dialer
            }
            value={search ?? dialedPhoneNumber}
            ref={dialRef}
          />
        )}
        hiddenDropdown={
          !openSearch && Boolean((noResults && isNumber) || dialedPhoneNumber || !search)
        }
        customStyles={{
          marginTop: -6,
        }}
        // @ts-ignore
        onlyKeyboard
        search={search}
        forceOpen={openSearch}
        setForceOpen={setOpenSearch}
      >
        {(results, totalMatching) => {
          const noData =
            results?.length === 0 ||
            // @ts-ignore
            results?.filter(item => item.phone || item.phoneNumbers?.length > 0).length === 0;
          setNoResults(noData);

          const phoneNumbersWithData = [];

          const searchIsNumber = search && (search.startsWith('+') || isValidPhone(search));
          results?.forEach(bobject => {
            // @ts-ignore
            const phones = bobject.phoneNumbers || [bobject.phone];
            if (!phones || phones.length === 0 || (phones.length === 1 && !phones[0])) {
              return;
            }
            phones.forEach(phone => {
              if (searchIsNumber && !phone.includes(search)) {
                return;
              }
              phoneNumbersWithData.push({
                ...bobject,
                phone,
              });
            });
          });

          setBobjectsWithSamePhone(results);

          return (
            <div
              ref={parentRef}
              style={{
                maxHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                width: '286px',
              }}
            >
              {phoneNumbersWithData.length > 0 ? (
                <VirtualInfiniteScroll
                  parentRef={parentRef}
                  rows={phoneNumbersWithData}
                  totalRows={totalMatching}
                  isFetchingData={!results}
                  rowsLength={results.length}
                >
                  {result => {
                    const type = result.bobjectType;
                    const name = getName(result);
                    const phone = result.phone;

                    return (
                      <div
                        key={result.id}
                        onClick={() => handleChange(result)}
                        className={bobjectStyles.dialResult}
                      >
                        <div className={bobjectStyles.bobjectItemCompressed}>
                          <div className={bobjectStyles.circleIcon}>
                            <Icon name={ICONS[type]} size={20} color="bloobirds" />
                          </div>
                          <div className={bobjectStyles.bobjectItemContent}>
                            <div className={bobjectStyles.bobjectItemName}>
                              <Text
                                size="s"
                                color="bloobirds"
                                className={bobjectStyles.bobjectItemNameSpan}
                              >
                                <span dangerouslySetInnerHTML={{ __html: name }} />
                              </Text>
                            </div>

                            <div className={bobjectStyles.bobjectItemContentInfoRow}>
                              <Text
                                size="xs"
                                color="softPeanut"
                                className={bobjectStyles.bobjectItemContentSpan}
                              >
                                {isValidPhone(phone) ? new AsYouType().input(phone) : phone}
                              </Text>
                              <div className={bobjectStyles.bobjectItemContentInfoRowSeparator}>
                                <Icon name={'circle'} size={15} color={'softPeanut'} />
                                <Icon name={'phone'} size={15} color={'bloobirds'} />
                              </div>
                              <Text
                                size="xs"
                                color="bloobirds"
                                className={styles.bobjectItemContentSpan}
                              >
                                {t('dialer.dial.mainNumber')}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </VirtualInfiniteScroll>
              ) : (
                !isNumber && (
                  <div className={bobjectStyles.noResultFound}>
                    <div className={bobjectStyles.text}>
                      <Text color="peanut" size="m" align="center" weight="heavy">
                        {t('dialer.dial.emptySearch_a')}
                      </Text>
                      <Text color="softPeanut" size="s" align="center">
                        {t('dialer.dial.emptySearch_b')}
                      </Text>
                    </div>
                  </div>
                )
              )}
            </div>
          );
        }}
      </SearchBobjects>
      <div className={styles.feedback}>
        {!search &&
          !dialedPhoneNumber &&
          (status !== DialerStatus.authorizing ? (
            <div className={styles.dialHelpText}>
              <Text size="xs" color="softPeanut" weight="bold" align="center">
                {t('dialer.dial.action')}
              </Text>
            </div>
          ) : (
            <div className={styles.dialHelpTextNotConfig}>
              <Text size="xs" color="softPeanut" weight="bold" align="center">
                {t('dialer.dial.setAPhone')}
              </Text>
            </div>
          ))}
        {shouldRenderLoader ? (
          <div className={styles.dialSpinner}>
            <Spinner name="dots" size={16} color="verySoftPeanut" />
          </div>
        ) : (
          bobjectOfPhone &&
          (bobjectOfPhone.hasMatched ? (
            <div className={styles.dialMatchText}>
              {bobjectsWithSamePhone?.length > 1 ? (
                <>
                  <div className={styles.warning}>
                    <InfoWarning message={'There are multiple records with this phone number'} />
                  </div>
                  <div
                    style={{ cursor: 'pointer' }}
                    className={styles.bobject}
                    onClick={() => {
                      setOpenSearch(!openSearch);
                      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_DUPLICATE_LEADS_FROM_DIALER);
                    }}
                  >
                    <Tooltip title={bobjectOfPhone.name} position="top">
                      <Text size="s" color="bloobirds">
                        {bobjectOfPhone.name}
                      </Text>
                    </Tooltip>
                  </div>
                  <IconButton
                    size={16}
                    name={'chevronDown'}
                    color="peanut"
                    onClick={() => {
                      setOpenSearch(!openSearch);
                      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_DUPLICATE_LEADS_FROM_DIALER);
                    }}
                  />
                </>
              ) : (
                <>
                  <div className={bobjectStyles.circleIconLightBloobirds}>
                    <Icon
                      name={bobjectOfPhone.type === 'Lead' ? 'person' : 'company'}
                      size={20}
                      color="bloobirds"
                    />
                  </div>
                  <div className={styles.bobject}>
                    <Tooltip title={bobjectOfPhone.name} position="top">
                      <span onClick={onNameClick} className={styles._bobjectName}>
                        <Text size="s" color="bloobirds">
                          {bobjectOfPhone.name}
                        </Text>
                      </span>
                    </Tooltip>
                  </div>
                </>
              )}
            </div>
          ) : (
            search && (
              <div className={styles.dialMatchText}>
                <Icon name="phone" size={16} color="peanut" />
                <Text size="xs" color="peanut">
                  {t('dialer.dial.noMatch')}
                </Text>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};
