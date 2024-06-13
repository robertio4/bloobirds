import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { fetchAndOpenNylasUrl } from '@bloobirds-it/utils';

import { Calendar, DayCalendarBackground, Outlook } from '../../../assets/png';
import { GoogleSignIn } from './BrandedButtons/GoogleSignIn';
import { MicrosoftSignIn } from './BrandedButtons/MicrosoftSignIn';
import styles from './calendarNotConnected.module.css';

export const CalendarNotConnected = ({
  mode,
  onCalendarReconnect,
}: {
  mode: 'day' | 'week';
  onCalendarReconnect: () => void;
}) => {
  const [signInClicked, setSignInClicked] = useState<boolean>(false);
  const { t } = useTranslation('translation', {
    keyPrefix: 'meetingModal.calendar.calendarNotConnected',
  });
  return (
    <>
      {mode === 'week' ? (
        <div className={styles.calendar_not_connected}>
          <Text size="xxl" align="center">
            {t('syncBloobirds')}
          </Text>
          <div className={styles.calendar_buttons}>
            <GoogleSignIn
              onClick={() => {
                fetchAndOpenNylasUrl();
                setSignInClicked(true);
              }}
            />
            <MicrosoftSignIn
              onClick={() => {
                fetchAndOpenNylasUrl();
                setSignInClicked(true);
              }}
            />
          </div>
          {signInClicked && (
            <div
              onClick={() => {
                if (onCalendarReconnect) {
                  onCalendarReconnect();
                }
              }}
              className={styles.link}
            >
              <Text color="bloobirds" decoration="underline" size="s">
                {t('clickAndRefresh')}
              </Text>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.day_calendar_not_connected_container}>
          <img
            src={DayCalendarBackground}
            alt={'day_calendar_background'}
            className={styles._background_image}
          />
          <div className={styles.day_calendar_not_connected}>
            <Text size="xl" align="center" weight="bold" color="peanut">
              {t('syncBloobirds')}
            </Text>
            <div className={styles.day_calendar_buttons}>
              <Button
                onClick={() => {
                  fetchAndOpenNylasUrl();
                  setSignInClicked(true);
                }}
                uppercase
              >
                <img
                  alt="calendar_logo"
                  src={Calendar}
                  height={18}
                  width={18}
                  style={{ marginRight: 8 }}
                />
                {t('connectGoogle')}
              </Button>
              <Button
                onClick={() => {
                  fetchAndOpenNylasUrl();
                  setSignInClicked(true);
                }}
                variant="alternative"
                uppercase
              >
                <img
                  alt="outlook_logo"
                  src={Outlook}
                  height={18}
                  width={18}
                  style={{ marginRight: 8 }}
                />
                {t('connectOutlook')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
