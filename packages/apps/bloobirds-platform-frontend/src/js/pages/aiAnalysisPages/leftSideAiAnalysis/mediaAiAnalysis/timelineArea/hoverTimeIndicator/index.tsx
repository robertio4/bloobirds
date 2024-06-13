import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

import { secondsToTime } from '../../../../utiils';
import styles from './hoverTimeIndicator.module.css';

const HoverTimeIndicator = ({ time, duration }: { time: number; duration: number }) => {
  if (!time || time < 0 || !duration || time > duration) {
    return null;
  }

  return (
    <div
      className={styles.indicator}
      style={{
        opacity: time !== null ? 1 : 0,
        left: `${(time / (duration || 1)) * 100}%`,
      }}
    >
      <div className={styles.indicatorInfo}>
        <Text size="xxs" color="white">
          {secondsToTime(time)}
        </Text>
      </div>
    </div>
  );
};

export default HoverTimeIndicator;
