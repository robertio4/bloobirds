import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import {
  GoogleMeetSvg as googleMeetSvg,
  GoogleMeetWhiteSvg as googleMeetWhiteSvg,
} from '../../assets/svg';
import { useCalendar } from '../../hooks/useCalendar';
import styles from './conferencingForm.module.css';

export const ConferencingForm = () => {
  const {
    conferencingGoogleMeet,
    setConferencingGoogleMeet,
    connections,
    accountSelected,
  } = useCalendar();
  const [emailProvider, setEmailProvider] = useState(null);
  const { control } = useFormContext();
  const {
    field: { value: conferencingValue, onChange: conferencingOnChange },
  } = useController({
    control,
    name: 'conferencingGoogleMeet',
    defaultValue: conferencingGoogleMeet,
  });
  const { t } = useTranslation('translation', {
    keyPrefix: 'meetingModal.mainForm.conferencingForm',
  });

  useEffect(() => {
    if (accountSelected && connections && connections?.list?.length > 0) {
      const selectedConnection = connections?.list?.find(
        connection => connection.id == accountSelected,
      );
      setEmailProvider(selectedConnection?.provider || connections?.list[0]?.provider);
    }
  }, [accountSelected]);

  let conferencingIcon, conferencingLabel;

  if (emailProvider && emailProvider == 'ews') {
    conferencingIcon = (
      <Icon size={20} color={conferencingValue ? 'white' : 'purple'} name="mSTeams" />
    );
    conferencingLabel = conferencingValue ? t('linkByTeams') : t('addTeams');
  } else {
    conferencingIcon = conferencingValue ? (
      <img src={googleMeetWhiteSvg} />
    ) : (
      <img src={googleMeetSvg} />
    );
    conferencingLabel = conferencingValue ? t('linkByGoogle') : t('addGoogle');
  }

  return (
    <div>
      <div
        className={clsx(styles._conferencing_container, {
          [styles._conferencing_container_marked]: conferencingValue,
        })}
      >
        <div className={styles._title}>
          <div className={styles._google_meet_icon}>{conferencingIcon}</div>
          <Text size="s" color={conferencingValue ? 'white' : 'peanut'}>
            {conferencingLabel}
          </Text>
        </div>
        <IconButton
          name={conferencingValue ? 'cross' : 'plus'}
          color={conferencingValue ? 'white' : 'bloobirds'}
          onClick={() => {
            setConferencingGoogleMeet(!conferencingGoogleMeet);
            conferencingOnChange(!conferencingValue);
          }}
        />
      </div>
    </div>
  );
};
