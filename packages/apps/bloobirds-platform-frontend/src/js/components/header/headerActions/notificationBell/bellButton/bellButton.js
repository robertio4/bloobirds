import React from 'react';

import { IconButton } from '@bloobirds-it/flamingo-ui';
import { useNotificationsData } from '@bloobirds-it/hooks';
import classNames from 'clsx';

import styles from './bellButton.module.css';

const BellButton = ({ onClick }) => {
  const { totalUnread } = useNotificationsData();
  const classes = classNames(styles.bell, {
    [styles.pending]: totalUnread !== 0,
  });

  return (
    <div
      data-test="Button-HeaderNotificationBell"
      role="button"
      tabIndex={0}
      key={totalUnread}
      className={classes}
      onClick={onClick}
    >
      <IconButton name="bellFilled" color="peanut" size={20} />
      {totalUnread > 0 && (
        <div data-test="Number-HeaderNotificationCounterValue" className={styles.count}>
          {totalUnread}
        </div>
      )}
    </div>
  );
};

export default BellButton;
