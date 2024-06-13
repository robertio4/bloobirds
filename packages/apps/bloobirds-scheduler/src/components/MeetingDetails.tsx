import { useTranslation } from 'react-i18next';

import { Tooltip, Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../pages/SelectSlots.module.css';
import { getSlotTime, getTimeZoneString, getDateString } from '../utils/time';

interface MeetingDetailsProps {
  data: {
    userName: string;
    title: string;
    timeZone?: string;
  };
  open: boolean;
  slotSelected: { duration: string; startDateTime: string };
}

const DividerWithPoint = () => (
  <div className={styles.divider}>
    <div className={styles.point} />
  </div>
);

const MeetingDetails = ({ data, open, slotSelected }: MeetingDetailsProps) => {
  const { userName, title, timeZone } = data;
  const { duration, startDateTime } = slotSelected;

  const { t, i18n } = useTranslation('translation', { keyPrefix: 'scheduler' });

  const timeZoneString = getTimeZoneString(startDateTime, timeZone);
  const dateString = getDateString(startDateTime, timeZone);

  return (
    <div className={styles.info}>
      <div className={styles.firstContainer}>
        <div className={styles.name}>
          <Tooltip title={userName} position="top">
            <Text size="xl" color="bloobirds">
              {userName}
            </Text>
          </Tooltip>
        </div>
        <div className={styles.title}>
          <Tooltip title={title} position="top">
            <Text size="xl" color="peanut" weight="bold">
              {title ?? t('minsMeeting', { count: Number(duration) })}
            </Text>
          </Tooltip>
        </div>
      </div>

      <DividerWithPoint />

      <div className={styles.secondContainer}>
        {open && (
          <div className={styles.date}>
            <Icon name="calendar" color="softPeanut" />
            <Text size="m">{dateString}</Text>
          </div>
        )}

        <div className={styles.date}>
          <Icon name="clock" color="softPeanut" />
          <Text size="m">
            {!open
              ? `${t('mins', { count: Number(duration) })}`
              : getSlotTime(startDateTime, duration, timeZone, i18n.language)}
          </Text>
        </div>
        <div className={styles.date}>
          <Icon name="timezonesAlter" color="softPeanut" />
          <Text size="m">{timeZoneString}</Text>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
