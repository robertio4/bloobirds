import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Item, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useSessionStorage, useUserPhoneNumbers } from '@bloobirds-it/hooks';
import { SessionStorageKeys } from '@bloobirds-it/types';
import clsx from 'clsx';
import { parsePhoneNumber } from 'libphonenumber-js';

import { DialerStatus, useDialer, useDialerStore } from './dialer';
import styles from './dialer.module.css';
import { PREFIX_TO_STATE, STATE_TO_PREFIXS } from './localPresenceUtils';

export function getLocalUsNumber(dialedPhone: string, usPhoneNumbers: string[]): string {
  // Get the prefix of the dialed phone
  const prefix = dialedPhone.substring(2, 5);
  // Get the states that match with the prefix
  const stateOfPrefix = PREFIX_TO_STATE[prefix];
  const prefixesOfTheState = STATE_TO_PREFIXS[stateOfPrefix];
  // Get the phone numbers that match with the states
  const phoneNumbers = usPhoneNumbers.filter(
    phoneNumber => !!prefixesOfTheState.find(prefix => prefix === phoneNumber.substring(2, 5)),
  );
  // Get the first phone number
  if (phoneNumbers.length > 0) {
    return phoneNumbers[0];
  }
  return usPhoneNumbers[0];
}

export function DialerUserPhoneSelector() {
  const { setState } = useDialerStore();
  const status = useDialer(state => state.status);
  const selectedPhoneNumber = useDialer(state => state.selectedPhoneNumber);
  const dialedPhoneNumber = useDialer(state => state.dialedPhoneNumber);
  const { settings } = useActiveUserSettings();
  const autoChangePhoneExtension = settings?.user?.autoChangePhoneExtension;
  const { ref, visible, setVisible } = useVisible();
  const { t } = useTranslation();

  const { userPhones } = useUserPhoneNumbers(filteredPhones => {
    if (selectedPhoneNumber === null && filteredPhones.length > 0) {
      const defaultOrFirst =
        filteredPhones.find((phoneNumber: any) => phoneNumber?.phoneByDefault) || filteredPhones[0];
      setState('selectedPhoneNumber', defaultOrFirst.phoneNumber);
    }
  });
  const { set } = useSessionStorage();

  useEffect(() => {
    if (autoChangePhoneExtension && dialedPhoneNumber && userPhones && userPhones.length > 1) {
      try {
        const phoneParsed = parsePhoneNumber(dialedPhoneNumber);
        if (
          phoneParsed &&
          (!selectedPhoneNumber ||
            parsePhoneNumber(selectedPhoneNumber)?.country !== phoneParsed?.country ||
            phoneParsed.country === 'US')
        ) {
          const userPhonesSameCountry = userPhones.filter(userPhone => {
            try {
              return parsePhoneNumber(userPhone.phoneNumber)?.country === phoneParsed?.country;
            } catch (e) {
              return false;
            }
          });
          if (userPhonesSameCountry.length > 0) {
            if (phoneParsed.country === 'US') {
              const phone = getLocalUsNumber(
                dialedPhoneNumber,
                userPhonesSameCountry.map(phone => phone.phoneNumber),
              );
              setState('selectedPhoneNumber', phone);
            } else {
              setState('selectedPhoneNumber', userPhonesSameCountry[0]?.phoneNumber);
            }
          }
        }
      } catch (error) {
        console.error('Phone not parsed', error);
      }
    }
  }, [dialedPhoneNumber, userPhones, autoChangePhoneExtension]);

  const userPhoneSelectorClasses = clsx(styles.userPhoneSelector, {
    [styles.userPhoneSelector_disabled]: status < DialerStatus.idle,
  });

  return (
    <Dropdown
      anchor={
        <div
          className={userPhoneSelectorClasses}
          onClick={() => {
            if (status === DialerStatus.idle) {
              setVisible(true);
            }
          }}
        >
          <div className={styles.userPhoneSelectorLabels}>
            <Text size="xs" weight="bold">
              {t('dialer.yourPhoneNumber')}
            </Text>
            <Text size="xs">{selectedPhoneNumber}</Text>
          </div>
          {status === DialerStatus.idle && <Icon name="chevronDown" size={16} color="bloobirds" />}
        </div>
      }
      visible={visible}
      ref={ref}
    >
      {userPhones?.map((phoneNumber: any) => (
        <Item
          key={phoneNumber.id}
          onClick={() => {
            setState('selectedPhoneNumber', phoneNumber.phoneNumber);
            set(SessionStorageKeys.LastPhoneUsed, phoneNumber.phoneNumber);
            setVisible(false);
          }}
        >
          {phoneNumber?.phoneNumber}
        </Item>
      ))}
    </Dropdown>
  );
}
