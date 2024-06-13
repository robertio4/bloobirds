import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomDateDialog } from '@bloobirds-it/bobjects';
import {
  Button,
  DateTimeShortcut,
  IconButton,
  Modal,
  Skeleton,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useCadenceInfo, useUserTimeZone } from '@bloobirds-it/hooks';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { Bobject, BobjectTypes, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { formatDate, getUserTimeZone, getValueFromLogicRole } from '@bloobirds-it/utils';
import spacetime from 'spacetime';

import styles from './rescheduleCadence.module.css';
import { useRescheduleCadence } from './useRescheduleCadence';

export const RescheduleCadence = ({
  bobject,
  onClose,
  onSave,
}: {
  bobject: Bobject;
  onClose: () => void;
  onSave?: any;
}) => {
  const userTimeZone = useUserTimeZone();

  const [customDateVisible, setCustomDateVisible] = useState(false);

  const { t, i18n } = useTranslation('translation', { keyPrefix: 'cadence.rescheduleCadence' });

  const { getNextTaskDate, handleSubmit, nextTask } = useRescheduleCadence(bobject);
  const { cadence } = useCadenceInfo(bobject);
  const cadenceNotReschedulable = cadence?.reschedulableMode !== 'RESCHEDULABLE';

  const nextTaskDate = getNextTaskDate();

  const getFormattedHour = () => {
    const dateTimeInfo = !Array.isArray(bobject)
      ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME))
      : null;
    return dateTimeInfo && dateTimeInfo.getHours() !== 0
      ? dateTimeInfo.getHours() + ':' + dateTimeInfo.getMinutes() + ''
      : '8:00';
  };

  const taskTime = getFormattedHour();

  const tomorrowMorning = spacetime().startOf('day').add(1, 'day').time(taskTime).toNativeDate();

  const nextMondayDatetime = spacetime()
    .startOf('week')
    .add(1, 'week')
    .time(taskTime)
    .toNativeDate();

  const inTwoDays = spacetime().startOf('day').add(2, 'day').time(taskTime).toNativeDate();

  const inOneWeek = spacetime().startOf('day').add(1, 'week').time(taskTime).toNativeDate();

  const handleSave = async (date: string | Date) => {
    if (nextTask) {
      handleSubmit(date as string, nextTask).then(() => {
        setCustomDateVisible(false);
        onSave();
        onClose();
      });
    }
  };

  if (customDateVisible) {
    return (
      <CustomDateDialog
        bobject={bobject as Bobject<BobjectTypes.Task>}
        onCancel={() => setCustomDateVisible(false)}
        onSubmit={async date => {
          const offsetDate = spacetime()
            .goto(userTimeZone)
            .year(date.getFullYear())
            .month(date.getMonth())
            .date(date.getDate())
            .hour(date.getHours())
            .minute(date.getMinutes())
            .toNativeDate();
          await handleSave(offsetDate);
        }}
      />
    );
  }

  return (
    <Modal className={styles.modal} open onClose={onClose} width={364}>
      <header className={styles.header}>
        <Text size="xl">{t('title')}</Text>
        <IconButton size={40} name="cross" color="bloobirds" onClick={onClose} />
      </header>
      <main className={styles.content}>
        <div className={styles._mainCalendarBox}>
          <div className={styles._text}>
            <Text size="l" weight="bold" color="peanut">
              {t('nextStepIn')}
            </Text>
            {nextTaskDate ? (
              <Text size="m" color="peanut">
                {
                  getI18nSpacetimeLng(i18n.language, new Date(), getUserTimeZone()).since(
                    getI18nSpacetimeLng(i18n.language, new Date(nextTaskDate), getUserTimeZone()),
                  ).rounded
                }
              </Text>
            ) : (
              <Skeleton width={60} height={24} variant="text" />
            )}
          </div>
          <div className={styles._calendar}>
            <header>
              {nextTaskDate ? (
                <Text align="center" size="m" weight="bold" color="white">
                  {formatDate(new Date(nextTaskDate), 'MMM').toUpperCase()}
                </Text>
              ) : (
                <Skeleton width={40} height={24} variant="text" />
              )}
            </header>
            <div>
              {nextTaskDate ? (
                <Text align="center" size="xxl" weight="bold" color="peanut">
                  {new Date(nextTaskDate)?.getDate()}
                </Text>
              ) : (
                <Skeleton width={30} height={40} variant="rect" />
              )}
            </div>
          </div>
        </div>
        <Text size="m" color="softPeanut">
          {t('subtitle')}
        </Text>
        <div className={styles.shortcuts}>
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('tomorrow')}
            date={tomorrowMorning}
            onClick={handleSave}
            format={t('dates.shortMonth')}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('nextMonday')}
            date={nextMondayDatetime}
            onClick={handleSave}
            format={t('dates.shortMonth')}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('inTwoDays')}
            date={inTwoDays}
            onClick={handleSave}
            format={t('dates.shortMonth')}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('inOneWeek')}
            date={inOneWeek}
            onClick={handleSave}
            format={t('dates.shortMonth')}
          />
        </div>
        <Tooltip title={cadenceNotReschedulable ? 'error' : undefined} position="top">
          <Button
            className={styles.customButton}
            expand={true}
            variant="tertiary"
            uppercase={true}
            iconLeft="calendar"
            onClick={() => setCustomDateVisible(true)}
            disabled={cadenceNotReschedulable}
          >
            {t('selectDateAndTime')}
          </Button>
        </Tooltip>
      </main>
    </Modal>
  );
};
