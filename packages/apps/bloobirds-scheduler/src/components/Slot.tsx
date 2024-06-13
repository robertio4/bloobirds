import { ReactNode, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from '../pages/SelectSlots.module.css';

interface SlotProps {
  children: ReactNode;
}

interface SlotTextProps {
  available: boolean;
  children: ReactNode;
  onClick: () => void;
}

interface SlotButtonProps {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}

const SlotText = ({ available, children, onClick }: SlotTextProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler' });

  const classes = clsx(styles.slotText, {
    [styles.slotTextDisabled]: !available,
  });

  return (
    <div className={classes} onClick={available ? onClick : null}>
      <Tooltip title={available ? '' : t('noAvailableSlot')} position="top">
        <Text size="s" color={available ? 'peanut' : 'softCondition'} align="center">
          {children}
        </Text>
      </Tooltip>
    </div>
  );
};

const SlotButton = ({ selected = false, children, onClick }: SlotButtonProps) => {
  const classes = clsx(styles.slotButton, {
    [styles.slotButtonSelected]: selected,
  });

  return (
    <div className={classes}>
      <Button variant="primary" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

const Slot = ({ children }: SlotProps): ReactElement => {
  return <div className={styles.slot}>{children}</div>;
};

Slot.Text = SlotText;
Slot.Button = SlotButton;

export default Slot;
