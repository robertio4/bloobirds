import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Checkbox,
  Dropdown,
  Icon,
  Item,
  Select,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useCalendar } from '@bloobirds-it/hooks';
import clsx from 'clsx';

import styles from './calendarSelector.module.css';

export const CalendarsSelector = ({
  connections,
  disabled,
  anchor,
}: {
  connections: any;
  disabled: boolean;
  anchor?: (x: boolean, y: React.Dispatch<React.SetStateAction<boolean>>) => JSX.Element;
}) => {
  const { ref, visible, setVisible } = useVisible(false);
  const {
    calendarSelected,
    setSelectedCalendar,
    calendarsAvailable,
    accountSelected,
    setAccountSelected,
    calendarsWithColor,
  } = useCalendar();
  const { t } = useTranslation('translation', { keyPrefix: 'meetingModal.calendarSelector' });
  const myCalendars = calendarsAvailable?.data?.filter((calendar: any) => calendar?.primary) || [];
  const otherCalendars =
    calendarsAvailable?.data?.filter((calendar: any) => !calendar?.primary) || [];
  const openLearnHow = () => {
    if (connections?.list[0]?.provider === 'gmail') {
      window.open('https://www.youtube.com/watch?v=Atgi1wxj8m4', '_blank');
    } else if (connections?.list[0]?.provider === 'eas') {
      window.open(
        'https://support.microsoft.com/en-us/office/share-your-calendar-in-outlook-2fcf4f4f-8d46-4d8b-ae79-5d94549e531b',
        '_blank',
      );
    } else {
      window.open('https://www.youtube.com/watch?v=Atgi1wxj8m4', '_blank');
    }
  };

  const handleClickCalendar = (value: boolean, id: string) => {
    value
      ? setSelectedCalendar((prevSelected: any) => [...prevSelected, id])
      : setSelectedCalendar((prevSelected: any) => prevSelected?.filter((c: any) => c !== id));
  };

  return (
    <Dropdown
      anchor={
        anchor ? (
          anchor(visible, setVisible)
        ) : (
          <div
            className={clsx(styles._select_anchor, { [styles._select_disabled]: disabled })}
            onClick={() => (disabled ? null : setVisible(!visible))}
          >
            <span style={{ display: 'flex' }}>
              <span className={styles._icon_container}>
                <Icon name="calendar" size={12} color="softPeanut" />
              </span>
              <Text
                size="xs"
                color={disabled ? 'softPeanut' : 'peanut'}
                className={styles._select_text}
              >
                {disabled
                  ? t('noCalendarsSelected')
                  : calendarSelected?.length > 0
                  ? calendarSelected?.length > 1
                    ? t('calendarsSelected').toLowerCase()
                    : calendarsAvailable?.data?.find(c => c?.id === calendarSelected[0])?.name
                  : t('noCalendarsSelected')}
              </Text>
            </span>
            <span style={{ marginRight: '4px' }}>
              <Icon name="chevronDown" size={12} color="softPeanut" />
            </span>
          </div>
        )
      }
      visible={visible}
      ref={ref}
    >
      <div className={styles._calendars_container}>
        <Text size="s">{t('calendarAccount')}:</Text>
        <div className={styles._accounts_selector}>
          <Select
            size="small"
            value={accountSelected}
            onChange={setAccountSelected}
            borderless={false}
            width="300px"
          >
            {connections?.list?.map((connection: any) => (
              <Item key={connection?.id} value={connection?.id}>
                {connection?.email}
              </Item>
            ))}
          </Select>
        </div>
        {myCalendars?.length > 0 && (
          <>
            <Text size="m" color="peanut">
              {t('myCalendars')}
            </Text>
            <div className={styles._calendars_list}>
              {myCalendars?.map((calendar: any) => (
                <Checkbox
                  key={calendar?.id}
                  size="small"
                  checked={!!calendarSelected?.find((c: any) => c === calendar?.id)}
                  onClick={v => handleClickCalendar(v, calendar?.id)}
                  color={calendarsWithColor?.find(c => c.calendarId === calendar?.id)?.color}
                >
                  {calendar?.name}
                </Checkbox>
              ))}
            </div>
          </>
        )}
        {otherCalendars?.length > 0 && (
          <>
            <Text size="m" color="peanut">
              {t('otherCalendars')}
            </Text>
            <div className={styles._calendars_list}>
              {otherCalendars?.map((calendar: any) => (
                <Checkbox
                  key={calendar?.id}
                  size="small"
                  checked={!!calendarSelected?.find((c: any) => c === calendar?.id)}
                  onClick={v => handleClickCalendar(v, calendar?.id)}
                  color={calendarsWithColor?.find(c => c.calendarId === calendar?.id)?.color}
                >
                  {calendar?.name}
                </Checkbox>
              ))}
            </div>
          </>
        )}
        <div className={styles._help_container}>
          <Text size="s" color="peanut">
            {t('infoText.missingCalendar')}
          </Text>
          <Text size="xs" color="softPeanut">
            {t('infoText.learnHere')}{' '}
            <a style={{ color: 'var(--bloobirds)', cursor: 'pointer' }} onClick={openLearnHow}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {t('infoText.howToAsk')}
            </a>{' '}
            {t('infoText.toSeeIt')}
          </Text>
        </div>
      </div>
    </Dropdown>
  );
};
