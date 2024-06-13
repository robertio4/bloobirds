import { useTranslation } from 'react-i18next';

import { Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import { time } from 'console';

import styles from '../pages/SelectSlots.module.css';
import { getDayString } from '../utils/time';

interface SelectDateProps {
  days: { [key: string]: boolean };
  updateDay: (day: string) => void;
  selectedDay: string;
  timeZone: string;
}

interface DayProps {
  day: string;
  updateDay: (day: string) => void;
  selected: boolean;
  disabled: boolean;
  timeZone: string;
}

const Day = ({ day, updateDay, selected, disabled, timeZone }: DayProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler' });

  const classes = clsx(styles.day, {
    [styles.daySelected]: selected,
    [styles.dayDisabled]: disabled,
  });

  const handleClick = () => {
    if (disabled) {
      return;
    }
    updateDay(day);
  };

  return (
    <div key={day} className={classes} onClick={handleClick}>
      <Tooltip title={disabled ? t('allSlotsBooked') : ''} position="top">
        <Text size="s" color={disabled ? 'softCondition' : 'peanut'}>
          {getDayString(day, timeZone)}
        </Text>
      </Tooltip>
    </div>
  );
};

const SelectDate = ({ days, selectedDay, updateDay, timeZone }: SelectDateProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler' });

  return (
    <div className={styles.selectDate}>
      <div className={styles.title}>
        <Text size="m" color="peanut" weight="bold">
          {t('chooseDate')}
        </Text>
      </div>
      <div className={styles.list}>
        {Object.keys(days).map(day => (
          <Day
            key={day}
            day={day}
            updateDay={updateDay}
            selected={selectedDay === day}
            disabled={!days[day]}
            timeZone={timeZone}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectDate;
