import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import styles from '../pages/SelectSlots.module.css';
import { MIXPANEL_EVENTS } from '../utils/mixpanel';
import { getSlotTime, getDayString } from '../utils/time';
import Slot from './Slot';

interface SlotSelectionProps {
  slots: { startDateTime: string; duration: string; available: boolean }[];
  day: string;
  onToggle: () => void;
  slotSelected: { duration: string; startDateTime: string };
  setSlotSelected: (slotSelected: { duration: string; startDateTime: string }) => void;
  timeZone: string;
}

const SlotSelection = ({
  slots,
  day,
  onToggle,
  slotSelected,
  setSlotSelected,
  timeZone,
}: SlotSelectionProps) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'scheduler' });

  const handleSlotClick = (startDateTime: string, duration: string) => {
    setSlotSelected({ duration, startDateTime });
    mixpanel.track(MIXPANEL_EVENTS.SCHEDULER_CLICK_ON_SLOT);
  };

  return (
    <div className={styles.slots}>
      <div className={styles.slotsTitle}>
        <Text size="m" color="peanut" weight="bold">
          {getDayString(day, timeZone)}
        </Text>
      </div>
      <div className={styles.slotsDetails}>
        {slots?.map(({ startDateTime, duration, available }) => {
          return (
            <Slot key={startDateTime}>
              <Slot.Text
                available={available}
                onClick={() => handleSlotClick(startDateTime, duration)}
              >
                {getSlotTime(startDateTime, duration, timeZone, i18n.language)}
              </Slot.Text>
              <Slot.Button
                selected={available && startDateTime === slotSelected.startDateTime}
                onClick={() => {
                  onToggle();
                  mixpanel.track(MIXPANEL_EVENTS.SCHEDULER_SELECT_SLOT);
                }}
              >
                {startDateTime === slotSelected.startDateTime ? t('continue') : ''}
              </Slot.Button>
            </Slot>
          );
        })}
      </div>
    </div>
  );
};

export default SlotSelection;
