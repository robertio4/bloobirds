import React, { memo } from 'react';

import styles from './currentTimeIndicator.module.css';

const CurrentTimeIndicator = ({ time, duration }: { time: number; duration: number }) => {
  if (!time || !duration || time > duration) {
    return null;
  }

  return (
    <div
      className={styles.indicator}
      style={{
        left: `${(time / (duration || 1)) * 100}%`,
      }}
    >
      <div className={styles.indicatorDot} />
    </div>
  );
};

export default memo(CurrentTimeIndicator);
