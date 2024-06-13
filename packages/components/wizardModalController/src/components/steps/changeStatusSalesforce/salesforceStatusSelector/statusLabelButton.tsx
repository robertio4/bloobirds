import React from 'react';

import { SalesforceStatus } from '@bloobirds-it/types';
import classNames from 'clsx';

import styles from './salesforceStatusSelector.module.css';

const StatusLabelButton = ({
  status,
  selectedStatus,
  onClick,
}: {
  status: SalesforceStatus;
  selectedStatus: string;
  onClick?: () => void;
}) => {
  const { name, salesforceLabel, backgroundColor, textColor } = status;
  const isSelected = name === selectedStatus;

  const classes = classNames(styles.label, {
    [styles.selected]: isSelected,
  });

  return (
    <div
      className={classes}
      style={{
        backgroundColor: backgroundColor ?? 'var(--darkGray)',
        color: textColor ?? 'white',
      }}
      aria-label={'Label'}
      onClick={onClick}
    >
      {salesforceLabel}
    </div>
  );
};

export default StatusLabelButton;
