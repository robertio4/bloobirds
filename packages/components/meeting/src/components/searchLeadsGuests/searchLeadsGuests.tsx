import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';

import {
  Chip,
  Icon,
  Item,
  SearchInput,
  Spinner,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';
import classNames from 'clsx';

import { useSearchLeadsGuests } from '../../hooks/useSearchLeadsGuests';
import { Coworker, SearchType } from '../../types/calendar';
import { NoContacts } from '../noContacts/noContacts';
import styles from './searchLeadsGuests.module.css';

export const SearchLeadsGuests = ({
  size = 16,
  handleSelect,
  company,
  inviteesEmails,
}: {
  size: number | string;
  handleSelect: (lead: Bobject | Coworker | string) => void;
  company?: Bobject<BobjectTypes.Company>;
  inviteesEmails: string[];
}) => {
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { ref, visible, setVisible } = useVisible(false);
  const [error, setError] = useState<string | null>();
  useClickAway(ref, () => setVisible(false));
  const { t } = useTranslation('translation', { keyPrefix: 'meetingModal.searchLeadsGuests' });

  const includeCoworkers = useIsOTOAccount();

  const {
    searchType,
    setSearchType,
    debounceSearchValue,
    allCoworkersAdded,
    availableContacts,
    isValidating,
    searchQuery,
    setSearchQuery,
    isValidEmail,
  } = useSearchLeadsGuests({ company, inviteesEmails });

  function setDropdownFocused(focus: boolean) {
    setVisible(v => (v === focus ? v : focus));
  }

  const handleDropdownChipClick = (type: SearchType) => {
    setDropdownFocused(true);
    if (type !== searchType) {
      setSearchType(type);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      if (debounceSearchValue) {
        if (isValidEmail) {
          handleSelect(debounceSearchValue);
          setVisible(false);
          setSearchQuery(null);
        } else {
          setError(t('invalidEmail'));
        }
      }
    }
  };

  useEffect(() => {
    if (error && isValidEmail) {
      setError(null);
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    if (focused) {
      setVisible(true);
    }
  }, [focused]);

  return (
    <div
      className={styles.inputContainer}
      onClick={() => {
        const input = inputRef.current;
        input?.focus();
        setFocused(true);
      }}
    >
      <SearchInput
        innerRef={inputRef as any}
        width="100%"
        placeholder={t('addAnother')}
        value={searchQuery}
        onChange={setSearchQuery}
        onKeyPress={handleKeyPress}
        // @ts-ignore
        error={error}
        size="small"
        name="lead"
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={() => setVisible(true)}
      />
      {visible ? (
        <div ref={ref} className={styles.dropdown}>
          {includeCoworkers && (
            <DropdownHeader
              allCoworkersAdded={allCoworkersAdded}
              handleDropdownChipClick={handleDropdownChipClick}
              searchType={searchType}
              hasCompany={!!company}
            />
          )}
          {isValidating ? (
            <div className={styles.spinnerContainer}>
              <Spinner name="loadingCircle" />
            </div>
          ) : availableContacts?.length > 0 ? (
            <div className={styles._item_wrapper}>
              <>
                {availableContacts?.map((option: Bobject<BobjectTypes.Lead> | Coworker) => {
                  const isCoworker = 'type' in option && option.type === 'Coworker';
                  const name = isCoworker
                    ? option.name
                    : getValueFromLogicRole(
                        option as Bobject<BobjectTypes.Lead>,
                        LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
                      );
                  const email = isCoworker
                    ? option.email
                    : getValueFromLogicRole(
                        option as Bobject<BobjectTypes.Lead>,
                        LEAD_FIELDS_LOGIC_ROLE.EMAIL,
                      );
                  return (
                    <GuestCard
                      key={typeof option?.id === 'string' ? option?.id : option.id?.value}
                      size={size}
                      option={option}
                      name={name}
                      email={email}
                      handleSelect={handleSelect}
                    />
                  );
                })}
              </>
            </div>
          ) : (
            <NoContacts hasSearchTerm={searchQuery !== '' && !isValidating} />
          )}
        </div>
      ) : null}
    </div>
  );
};

const DropdownHeader = ({
  searchType,
  handleDropdownChipClick,
  allCoworkersAdded,
  hasCompany = true,
}: {
  searchType: SearchType;
  handleDropdownChipClick: (type: SearchType) => void;
  allCoworkersAdded: boolean;
  hasCompany?: boolean;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'meetingModal.searchLeadsGuests.dropdownHeader',
  });

  return (
    <div className={styles.chipGroupDiv}>
      <div
        className={classNames({
          [styles.chipSelected]: searchType === SearchType.leads,
        })}
      >
        <Chip
          size="small"
          variant="secondary"
          selected={searchType === SearchType.leads}
          onClick={() => handleDropdownChipClick(SearchType.leads)}
        >
          {t('search')} {hasCompany ? t('inCompany') : t('everywhere')}
        </Chip>
      </div>
      <div
        className={classNames({
          [styles.chipSelected]: searchType === SearchType.coworkers,
        })}
      >
        <Chip
          size="small"
          variant={allCoworkersAdded ? 'primary' : 'secondary'}
          disabled={allCoworkersAdded}
          selected={searchType === SearchType.coworkers}
          onClick={() => handleDropdownChipClick(SearchType.coworkers)}
        >
          {t('coworkersEmails')}
        </Chip>
      </div>
    </div>
  );
};

const GuestCard = ({
  option,
  name,
  email,
  size,
  handleSelect,
}: {
  option: Bobject | Coworker;
  name: string;
  email: string;
  size: string | number;
  handleSelect: (option: Bobject | Coworker) => void;
}) => (
  <Item
    onMouseDown={() => {
      handleSelect(option);
      //setFocused(false);
    }}
    key={typeof option?.id === 'string' ? option?.id : option?.id?.value}
    value={typeof option?.id === 'string' ? option?.id : option?.id?.value}
    className={styles.item}
  >
    <>
      <div className={styles._lead_icon}>
        <Icon name="person" size={14} color="white" />
      </div>
      <div className={styles._lead__info}>
        <Text color="peanut" size={size === 'medium' ? 'm' : 's'} weight="medium" ellipsis={30}>
          {name}
        </Text>
        <Text
          color="softPeanut"
          size={size === 'medium' ? 's' : 'xs'}
          inline
          className={styles._lead__company}
        >
          {email && (
            <>
              <Icon size={16} name="mail" color="softPeanut" className={styles._company__icon} />
              {email}
            </>
          )}
        </Text>
      </div>
    </>
  </Item>
);
