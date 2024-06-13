import React, { useEffect, useRef, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

import { IconType, Spinner, useVisible } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectId, BobjectTypes, SmartEmailContext } from '@bloobirds-it/types';
import { isEmail } from '@bloobirds-it/utils';
import classNames from 'clsx';

import { DropdownHeader } from './components/dropdownHeader';
import { EmailBadge } from './components/emailBadge';
import NoContacts from './components/noContacts';
import { SelectableItem } from './components/selectableItem';
import { useParseEmailsIntoContact, useRecipientSeachInput } from './hooks/useRecipient';
import styles from './recipientSearchInput.module.css';

type ContactCompany = {
  id: BobjectId;
  bobjectType: BobjectTypes.Company;
  name: string;
};

type ContactLead = {
  id: BobjectId;
  bobjectType: BobjectTypes.Lead;
  fullName: string;
  company?: { id: BobjectId };
  rawBobject?: Record<string, any>;
};

export type ContactBobject = ContactCompany | ContactLead;

export type Contact = {
  bobject: ContactBobject;
  email: string;
  icon: string; // to be displayed on the search dropdown
  isInDB: boolean; // to determine email badge style
  referenceId: string; // to determine email badge style
  name: string; // to be displayed on the search dropdown
  isCompanyMember?: boolean;
};

export const emptyContact: Contact = {
  bobject: undefined,
  email: '',
  icon: 'questionCircle' as IconType,
  isInDB: false,
  referenceId: '',
  name: 'Unknown',
};

interface RecipientSearchInputProps {
  contextProps?: SmartEmailContext;
  emails: string[];
  id: string;
  onChange?: (value: Array<Contact>) => void;
}

export enum SearchType {
  relatedBobjects,
  globalSearch,
  companySearch,
}

export function RecipientSearchInput(props: RecipientSearchInputProps) {
  const { id, emails, onChange, contextProps } = props;
  const {
    accountId,
    activeBobject,
    company,
    dataModel,
    filters,
    setFilters,
    setLeadCreatedCallback,
    setRelatedBobjectsInfo,
  } = contextProps;
  const inputRef = useRef<AutosizeInput>();
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const {
    relatedContacts,
    availableCompanyContacts,
    availableContacts,
    availableGlobalContacts,
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType,
    isValidating,
  } = useRecipientSeachInput({
    company,
    dataModel,
    selectedContacts,
  });
  const [focused, setFocused] = useState(false);
  const { ref, visible: dropdownFocused, setVisible } = useVisible(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hasLoadContacts, setHasLoadContacts] = useState(false);
  const historyRef = useRef([selectedContacts]);

  function setDropdownFocused(focus: boolean) {
    setVisible(v => (v === focus ? v : focus));
  }

  const firstValidEmail = selectedContacts?.findIndex(c => isEmail(c.email) && c.isInDB);

  const isFirstLoad = selectedContacts.length === 0 && searchTerm === '' && !hasLoadContacts;
  const { contacts, isLoadingContacts } = useParseEmailsIntoContact(
    accountId,
    isFirstLoad,
    emails,
    dataModel,
  );

  useEffect(() => {
    if (!isLoadingContacts && contacts && contacts.length > 0) {
      setSelectedContacts(contacts);
      onChange(contacts);
      updateRelatedBobjectsInfo(contacts, contacts[0]);
    }
    if (!isLoadingContacts) {
      setHasLoadContacts(true);
    }
  }, [isLoadingContacts]);

  const hasNoEmailsLeftOnContext =
    relatedContacts.filter(c => !selectedContacts.some(selectedC => selectedC.email === c.email))
      .length === 0;

  useEffect(() => {
    if (company && !hasNoEmailsLeftOnContext) {
      setSearchType(SearchType.relatedBobjects);
    } else {
      setSearchType(SearchType.globalSearch);
    }
  }, [!!company, hasNoEmailsLeftOnContext]);

  useEffect(() => {
    setLeadCreatedCallback?.(() => (leadEmail: string) => {
      setSelectedContacts(selected =>
        selected?.map(contact =>
          contact.email?.toLowerCase() === leadEmail ? { ...contact, isInDB: true } : contact,
        ),
      );
    });
  }, []);

  useEffect(() => {
    if ((!dropdownFocused || availableContacts?.length === 0) && !focused && searchTerm) {
      const contact = availableGlobalContacts?.find(agc => agc.email === searchTerm);
      if (contact) {
        selectContact(contact);
      } else {
        createContact(searchTerm);
      }
      setSearchTerm('');
    }
  }, [dropdownFocused, focused]);

  const updateRelatedBobjectsInfo = (updatedContacts: Contact[], contact: Contact) => {
    if (contact.bobject) {
      const isActiveBobject = contact.bobject.id.value === activeBobject?.id.value;
      const enrichedBobject = {
        ...contact.bobject,
        ...(isActiveBobject
          ? { rawBobject: activeBobject?.rawBobject ?? (activeBobject as Bobject)?.raw?.contents }
          : {}),
      };
      const dataToUpdate = { activeBobject: enrichedBobject };
      if (contact?.bobject?.bobjectType === BobjectTypes.Company /*&& !company*/) {
        //@ts-ignore
        dataToUpdate.company = contact.bobject;
      } else {
        setFilters({
          ...filters,
          lead: updatedContacts.reduce((acc, { bobject }) => {
            if (bobject?.bobjectType === BobjectTypes.Lead) return [...acc, bobject?.id.value];
            else return acc;
          }, []),
        });
        const setNewCompany =
          filters.lead.length === 0 &&
          contact.bobject?.bobjectType === BobjectTypes.Lead &&
          contact.bobject?.company;

        if (setNewCompany) {
          // @ts-ignore
          dataToUpdate.company = contact.bobject.company;
        }
      }
      // @ts-ignore
      setRelatedBobjectsInfo(dataToUpdate);
    }
  };

  const selectContact = (contact: Contact) => {
    const updatedContacts = [...selectedContacts, contact];
    setSelectedContacts(updatedContacts);
    setSearchTerm('');
    onChange(updatedContacts);
    if (isEmail(contact.email) && searchType !== SearchType.companySearch) {
      updateRelatedBobjectsInfo(updatedContacts, contact);
    }
    setSelectedIndex(-1);
    if (searchType === SearchType.globalSearch && !focused) {
      setDropdownFocused(false);
    }
    if (searchType === SearchType.relatedBobjects) {
      const leftContacts = relatedContacts.filter(
        c =>
          !updatedContacts?.find(
            selectedC => selectedC.email?.toLowerCase() === c.email?.toLowerCase(),
          ),
      );
      if (leftContacts.length === 0) {
        setSearchType(SearchType.globalSearch);
      }
    }
    if (searchType === SearchType.companySearch) {
      const leftContacts = availableContacts.filter(
        c =>
          !updatedContacts?.find(
            selectedC => selectedC.email?.toLowerCase() === c.email?.toLowerCase(),
          ),
      );
      if (leftContacts.length === 0) {
        setSearchType(SearchType.globalSearch);
      }
    }
  };

  const unselectContact = (contact?: Contact, index?: number) => {
    const updatedContacts: Contact[] = [...selectedContacts];
    if (contact) {
      updatedContacts.splice(index, 1);
    } else {
      updatedContacts.pop();
    }
    // @ts-ignore
    const updatedContactsEmails = updatedContacts.map(contact => contact?.bobject?.id?.value);
    setFilters({
      ...filters,
      lead: updatedContactsEmails.reduce((acc, email) => {
        if (email && email.includes(BobjectTypes.Lead)) return [...acc, email];
        else return acc;
      }, []),
    });
    const contactIndex = selectedContacts?.findIndex(c => c.email === contact?.email);
    if (contactIndex === firstValidEmail && selectedContacts.length > 1) {
      const lastContact = updatedContacts?.find(c => isEmail(c.email) && c.isInDB);
      if (lastContact && lastContact.bobject) {
        // @ts-ignore
        setRelatedBobjectsInfo({
          ...(!activeBobject ? { activeBobject: lastContact.bobject } : {}),
          // @ts-ignore
          ...(activeBobject && activeBobject === contact.bobject
            ? { activeBobject: lastContact.bobject }
            : {}),
          company:
            lastContact.bobject.bobjectType === BobjectTypes.Lead
              ? lastContact.bobject.company
              : lastContact.bobject,
        });
      }
    }
    setSelectedContacts(updatedContacts);
    onChange(updatedContacts);
  };

  const createContact = (email: string) => {
    if (email.trim() !== '') {
      const contact: Contact = {
        ...emptyContact,
        email,
        isInDB: availableContacts?.some(c => c.email?.toLowerCase() === email?.toLowerCase()),
      };
      selectContact(contact);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
      if (historyRef.current.length > 2) {
        historyRef.current.pop();
        const previousLabels = historyRef.current.pop();
        setSelectedContacts(previousLabels);
        onChange(previousLabels);
      }
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex((selectedIndex + 1) % availableContacts.length);
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex(
        selectedIndex <= 0
          ? availableContacts.length - 1
          : (selectedIndex - 1) % availableContacts.length,
      );
    } else if (event.key === 'Backspace' && searchTerm === '' && selectedContacts?.length > 0) {
      unselectContact();
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      if (searchTerm !== '') {
        if (availableContacts[selectedIndex]) {
          selectContact(availableContacts[selectedIndex]);
        } else if (
          availableContacts.filter(contact => contact.email === searchTerm?.toLowerCase())?.length >
          0
        ) {
          selectContact(
            availableContacts.filter(contact => contact.email === searchTerm?.toLowerCase())[0],
          );
        } else {
          createContact(searchTerm);
        }
        setSearchTerm('');
      } else if (
        searchType !== SearchType.globalSearch &&
        availableContacts &&
        availableContacts?.[selectedIndex]
      ) {
        selectContact(availableContacts[selectedIndex]);
      }
    }
    setDropdownFocused(true);
  };

  const handleDropdownChipClick = (type: SearchType) => {
    setDropdownFocused(true);
    if (type !== searchType) {
      setSearchType(type);
    }
  };

  return (
    <div
      className={classNames(styles.container)}
      onClick={() => {
        const input = inputRef.current.getInput();
        input.focus();
      }}
    >
      {selectedContacts?.map((contact, index) => {
        function isOutsiderEmail() {
          if (contact.isCompanyMember) return false;
          else if (company) return company.id.value !== contact?.referenceId;
          else {
            return selectedContacts.slice(0, index).some(c => c.isInDB);
          }
        }
        const isOutsider = isOutsiderEmail();

        return (
          <EmailBadge
            key={contact.email + index}
            contact={contact}
            unselectEmail={() => unselectContact(contact, index)}
            isOutsider={isOutsider}
          />
        );
      })}
      <AutosizeInput
        ref={inputRef as any}
        value={searchTerm}
        inputClassName={styles.input}
        type="text"
        id={`${id}-input`}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        aria-activedescendant={
          availableContacts?.[selectedIndex] ? `${availableContacts[selectedIndex]}-option` : null
        }
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setFocused(true);
          setDropdownFocused(true);
        }}
        onBlur={() => {
          setFocused(true);
          setFocused(false);
        }}
        onChange={event => {
          const trimmedValue = event.target.value.trim();
          setSearchTerm(isEmail(trimmedValue) ? trimmedValue : event.target.value);
        }}
      />
      {focused || dropdownFocused ? (
        <div role="listbox" id={`${id}-listbox`} className={styles.dropdown} ref={ref}>
          <DropdownHeader
            hasValuesAdded={selectedContacts.length > 0}
            searchType={searchType}
            hasCompany={!!company}
            hasNoEmailsLeftOnContext={hasNoEmailsLeftOnContext}
            handleDropdownChipClick={handleDropdownChipClick}
            allCoworkersAdded={
              availableCompanyContacts &&
              availableContacts?.length > 0 &&
              availableContacts.every(({ email }) =>
                selectedContacts.some(({ email: selectedEmail }) => selectedEmail === email),
              )
            }
          />
          <div className={styles.dropdownContent}>
            {(searchTerm !== '' || searchType !== SearchType.globalSearch) &&
            availableContacts?.length > 0 ? (
              isValidating ? (
                <div className={styles.spinnerContainer}>
                  <Spinner name="loadingCircle" />
                </div>
              ) : (
                availableContacts?.map((contact, index) => (
                  <SelectableItem
                    key={contact.email + index}
                    contact={contact}
                    selectContact={contact => {
                      selectContact(contact);
                      setSearchTerm('');
                      setDropdownFocused(false);
                      setFocused(false);
                    }}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    index={index}
                  />
                ))
              )
            ) : (
              <NoContacts hasSearchTerm={searchTerm !== '' && !isValidating} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
