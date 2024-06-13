import { useTranslation } from 'react-i18next';

import { Text, Icon, Action } from '@bloobirds-it/flamingo-ui';

import styles from '../pages/SelectSlots.module.css';
import { getTimeZoneString, getDateTimeString } from '../utils/time';

const DividerWithPoint = () => (
  <div className={styles.dividerConfirmation}>
    <div className={styles.point} />
  </div>
);

interface ConfirmationProps {
  userName: string;
  timeZone: string;
  duration: string;
  startDateTime: string;
}

const Confirmation = ({ userName, duration, startDateTime, timeZone }: ConfirmationProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler' });

  const timeZoneString = getTimeZoneString(startDateTime, timeZone);
  const dateString = getDateTimeString(startDateTime, timeZone);

  return (
    <div className={styles.confirmation}>
      <Text size="xxl" weight="medium">
        {t('confirmation.title')}
      </Text>
      <div className={styles.name}>
        <Text size="xl">{t('confirmation.subtitle')} </Text>
        <div className={styles.title}>
          <Text size="xl" color="bloobirds" weight="heavy">
            {userName}
          </Text>
          <Action icon="check" color="verySoftMelon" />
        </div>
      </div>
      <DividerWithPoint />
      <div className={styles.infoSlot}>
        <div className={styles.date}>
          <Icon name="calendar" color="softPeanut" />
          <Text size="l">{dateString}</Text>
        </div>

        <div className={styles.date}>
          <Icon name="clock" color="softPeanut" />
          <Text size="l">{t('mins', { count: Number(duration) })}</Text>
        </div>
        <div className={styles.date}>
          <Icon name="timezonesAlter" color="softPeanut" />
          <Text size="l">{timeZoneString}</Text>
        </div>
      </div>
      <DividerWithPoint />
      <Text size="m">{t('confirmation.invitationSent')}</Text>
    </div>
  );
};

export default Confirmation;
