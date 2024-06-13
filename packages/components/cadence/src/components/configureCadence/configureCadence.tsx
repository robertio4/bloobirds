import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';

import {
  Button,
  Callout,
  createToast,
  DateTimePicker,
  Icon,
  Item,
  ModalContent,
  ModalFooter,
  Select,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId } from '@bloobirds-it/hooks';
import {
  Bobject,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  MIXPANEL_EVENTS,
  SalesforceTabs,
  UseEveryBobjectType,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getTextFromLogicRole,
  isLead,
  isOpportunity,
  toSentenceCase,
  toTitleCase,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { addHours, isBefore } from 'date-fns';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

import { useCadenceSteps } from '../../hooks/useCadenceSteps';
import { useCadenceTable } from '../../hooks/useCadenceTable';
import { useCadences } from '../../hooks/useCadences';
import { useCadenceControlData } from '../cadenceControlModal/useCadenceControlModal';
import { CadencePreview } from '../cadencePreview/cadencePreview';
import { CadenceSelector } from '../cadenceSelector/cadenceSelector';
import styles from './configureCadence.module.css';

const parseDate = (date: Date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000);

export const ConfigureCadenceStep = ({
  handleBack,
  handleNext,
  bobject,
  //saveCadence,
  previousStep,
  useEveryBobject,
  subhomeTab,
  onCadenceChange,
  onDateChange,
}: {
  bobject: Bobject;
  handleBack: () => void;
  handleNext?: () => void;
  //saveCadence?: (selectedCadence: any, handleNext: any, startCadenceDate: any) => void;
  onCadenceChange?: (cadenceId: string) => void;
  onDateChange?: (startCadence?: string | Date) => void;
  onEmailPreviewClicked?: (templateId: string, bobject: Bobject) => void;
  previousStep: any;
  subhomeTab?: SalesforceTabs;
  useEveryBobject?: UseEveryBobjectType;
}) => {
  const userId = useActiveUserId();
  const { cadence, defaultCadence } = useCadenceTable(Array.isArray(bobject) ? undefined : bobject);
  const { saveCadence } = useCadenceControlData(bobject);
  const [selectedCadence, setSelectedCadence] = useState(cadence?.id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateHasChanged, setDateHasChanged] = useState(false);

  const isBulkAction = Array.isArray(bobject);
  const selectedBobject: Bobject = isBulkAction ? bobject[0] : bobject;
  const { cadences, isLoading } = useCadences({
    bobjectTypeName: selectedBobject?.id.typeName,
    accountId: selectedBobject?.id?.accountId,
  });
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.configureCadence',
  });
  const { t: bobjectTypeT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });

  const { steps } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCadenceSelector, setShowCadenceSelector] = useState(false);
  const ref = useRef(null);
  const modalRef = useRef(null);
  useClickAway(ref, () => setShowCadenceSelector(false));

  const isSelectedDatePast = isBefore(
    addHours(selectedDate, 1) || new Date(),
    new Date().setHours(0),
  );

  const LOGIC_ROLES = FIELDS_LOGIC_ROLE[selectedBobject?.id.typeName];

  const enabledCadences = cadences?.filter((cadenceElement: any) => cadenceElement?.enabled);

  const stage = isOpportunity(bobject) ? 'sales' : 'prospecting';

  useEffect(() => {
    let showDateTime = false;
    steps?.forEach(step => {
      if (step?.dayNumber === 0 && step.actionTypes.includes('AUTOMATED_EMAIL')) {
        showDateTime = step.automationSchedulingMode === 'DELAY';
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);
  }, [steps, selectedCadence]);

  useLayoutEffect(() => {
    if (!showCadenceSelector) {
      if (modalRef?.current) {
        // @ts-ignore
        modalRef?.current?.click();
      }
    }
  }, [showCadenceSelector]);

  const bobjectName = selectedBobject?.id.typeName;
  const findCadenceByName = (cadenceName: any) =>
    cadences?.find((cadenceData: any) => cadenceData.name === cadenceName);

  const generateData = (isActionInBulk: any) => {
    if (isActionInBulk) {
      return {
        currentCadence: null,
        currentStartDate: null,
        defaultCadence: null,
      };
    }

    return {
      currentCadence: cadence,
      // @ts-ignore
      currentStartDate: getTextFromLogicRole(bobject, LOGIC_ROLES?.START_CADENCE),
      currentDefaultCadence: defaultCadence,
    };
  };
  const { currentCadence, currentStartDate, currentDefaultCadence } = generateData(isBulkAction);

  const hasData = !!(selectedCadence && selectedDate);
  const cadenceHasChanged = selectedCadence !== currentCadence?.id;

  useEffect(() => {
    setDateHasChanged(true);
  }, [selectedDate]);

  useEffect(() => {
    if (currentDefaultCadence) {
      setSelectedCadence(currentDefaultCadence?.id);
    }
  }, [currentDefaultCadence]);

  useEffect(() => {
    if (currentCadence) {
      setSelectedCadence(cadence?.enabled ? currentCadence?.id : null);
    }
  }, [currentCadence]);

  useEffect(() => {
    if (currentStartDate) {
      setSelectedDate(new Date(currentStartDate));
    }
  }, [currentStartDate]);

  useEffect(() => {
    if (selectedDate?.getHours() === 0 && selectedDate?.getMinutes() === 0) {
      selectedDate.setHours(new Date().getHours());
      selectedDate.setMinutes(new Date().getMinutes());
      setSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  const disableButton = isSubmitting || !hasData || !(dateHasChanged || cadenceHasChanged);
  const showMessage =
    (selectedCadence === findCadenceByName(defaultCadence)?.id &&
      selectedCadence &&
      defaultCadence) ||
    (selectedDate && !isOpportunity);
  const hasCadences = cadences?.length > 0;
  const leadStatus = getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const showLeadChangeStatusMessage =
    isLead(bobject) &&
    [
      LEAD_STATUS_LOGIC_ROLE.NEW,
      LEAD_STATUS_LOGIC_ROLE.BACKLOG,
      LEAD_STATUS_LOGIC_ROLE.DELIVERED,
    ].includes(leadStatus as LEAD_STATUS_LOGIC_ROLE);

  function localSaveCadence(startCadenceDate) {
    const url = `/messaging/cadences/${selectedCadence}/start`;
    const body = {
      bobjectId: selectedBobject?.id?.objectId,
      bobjectType: selectedBobject?.id?.typeName,
      startCadence: startCadenceDate || new Date(),
    };
    const toastMessage = t('toast', {
      bobjectType: bobjectTypeT(bobject?.id?.typeName?.toLowerCase()),
    });
    api.put(url, body).then(() => {
      createToast({
        type: 'success',
        message: toastMessage,
      });
      handleNext();
    });
  }

  const actionsEnabled = previousStep || handleNext;
  const startButton = useRef<HTMLDivElement>(undefined);

  return (
    <div>
      {isLead(bobject) && !isLoading && !cadences && (
        <div className={styles._banner_wrapper}>
          <Callout width="100%" variant="alert">
            <Text size="s">
              <Icon name="cadence" color="banana" />️{' '}
              <Trans
                i18nKey="cadence.configureCadence.topCallout"
                values={{ cadence: t('cadence') }}
                components={[
                  <strong key="0"></strong>,
                  <a
                    className={styles._lead_cadence_link}
                    key="1"
                    onClick={() => {
                      window.open('https://app.bloobirds.com/app/playbook/cadences', '_blank');
                    }}
                  />,
                  <strong key="2"></strong>,
                ]}
              />
              ✨
            </Text>
          </Callout>
        </div>
      )}
      <ModalContent>
        <div className={styles._section_title__wrapper} ref={modalRef}>
          <Text
            dataTest="Text-Modal-ConfigureProspectingCadence"
            size="m"
            weight="bold"
            align="center"
            color="peanut"
          >
            {t('title')}
          </Text>
        </div>
        <div className={styles._cadence_preview_wrapper}>
          <CadencePreview cadenceId={selectedCadence} />
        </div>
        {showCadenceSelector && (
          <CadenceSelector
            selectedBobject={selectedBobject}
            onCadenceSelected={c => {
              setSelectedCadence(c.id);
              setShowCadenceSelector(false);
              onCadenceChange?.(c.id);
            }}
            ref={ref}
            userId={userId}
            className={styles._command_box_wrapper}
          />
        )}
        <div className={styles._section__wrapper}>
          <div className={styles._list__wrapper}>
            <Select
              dataTest={`${bobjectName?.toUpperCase()}__CADENCE`}
              defaultValue={defaultCadence && findCadenceByName(defaultCadence)?.id}
              value={selectedCadence || (!hasCadences && 'none')}
              placeholder={t('placeholder', {
                bobjectType: toSentenceCase(bobjectTypeT(bobjectName?.toLowerCase())),
              })}
              disabled={!hasCadences}
              width="100%"
              onClick={() => setShowCadenceSelector(true)}
            >
              {hasCadences ? (
                enabledCadences?.map((cadenceItem: any) => (
                  <Item
                    value={cadenceItem.id}
                    key={cadenceItem.id}
                    dataTest={`${cadenceItem.name}`}
                    className={styles.hidden}
                  >
                    {cadenceItem.name}
                  </Item>
                ))
              ) : (
                <Item value="none" dataTest="cadence-not-exist">
                  {t('none')}
                </Item>
              )}
            </Select>
          </div>
          <div>
            <DateTimePicker
              dataTest="BaseInput-Cadence-DatetimePicker"
              value={selectedDate}
              placeholder={t('datePlaceholder')}
              withTimePicker={isStartCadenceWithDateTime}
              onChange={date => {
                setDateHasChanged(true);
                setSelectedDate(date);
                onDateChange?.(date);
              }}
            />
          </div>
        </div>
        {isSelectedDatePast && (
          <Callout width="100%" variant="alert" icon="alertTriangle">
            {t('bottomCallout')}
          </Callout>
        )}
        {showLeadChangeStatusMessage && (
          <div
            className={clsx(styles._on_prospection_message, {
              [styles._with_more_messages]: isSelectedDatePast,
            })}
          >
            <Text size="m" htmlTag="span" color="peanut" inline>
              <span role="img" aria-label="backhand">
                👉{' '}
              </span>
              <Trans i18nKey="cadence.configureCadence.leadStatusCallout" />
            </Text>
          </div>
        )}
        {actionsEnabled &&
          (!isBulkAction && hasCadences && showMessage ? (
            <Callout variant="alert" width="100%" withoutIcon>
              <div className={styles._message__wrapper}>
                <div>
                  <span role="img" aria-label="hand">
                    👉
                  </span>{' '}
                  {selectedCadence === findCadenceByName(defaultCadence)?.id && (
                    <Trans i18nKey="cadence.configureCadence.recommendedStage" values={{ stage }} />
                  )}{' '}
                  {!selectedDate && <>{t('selectDateInfo')}</>}
                </div>
              </div>
            </Callout>
          ) : (
            <div className={styles._cadence_placeholder} />
          ))}
        {isBulkAction && (
          <Callout width="100%" withoutIcon>
            <div className={styles._message__wrapper}>
              <div>
                <span role="img" aria-label="hand">
                  👉
                </span>{' '}
                {t('bulkInfo')}
              </div>
            </div>
          </Callout>
        )}
      </ModalContent>
      {actionsEnabled && (
        <ModalFooter>
          <div className={styles._buttons__wrapper}>
            {previousStep && (
              <Button variant="clear" onClick={handleBack}>
                {t('back')}
              </Button>
            )}
            {handleNext && (
              <div ref={startButton}>
                <Tooltip title={disableButton && t('startCadenceDateInfo')} position="top">
                  <Button
                    dataTest="saveCadence"
                    disabled={disableButton}
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      event.currentTarget.disabled = true;
                      setIsSubmitting(true);
                      mixpanel.track(MIXPANEL_EVENTS.CLICK_START_CADENCE_FROM_MODAL);
                      setTimeout(() => {
                        if (selectedCadence && selectedDate) {
                          const startCadenceDate = isStartCadenceWithDateTime
                            ? spacetime(selectedDate).format('iso-utc')
                            : parseDate(selectedDate);
                          saveCadence
                            ? saveCadence(
                                selectedCadence,
                                handleNext,
                                startCadenceDate,
                                useEveryBobject,
                                subhomeTab,
                              )
                            : localSaveCadence(startCadenceDate);
                          setIsSubmitting(false);
                        }
                      }, 2500);
                    }}
                  >
                    {isSubmitting ? (
                      <Spinner name="loadingCircle" size={16} color="white" />
                    ) : (
                      t('start')
                    )}
                  </Button>
                </Tooltip>
              </div>
            )}
          </div>
        </ModalFooter>
      )}
    </div>
  );
};

export default ConfigureCadenceStep;
