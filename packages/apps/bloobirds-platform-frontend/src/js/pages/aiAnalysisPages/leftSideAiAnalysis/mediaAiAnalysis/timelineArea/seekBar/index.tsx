import React, { memo } from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

import { calculateGradient, secondsToTime } from '../../../../utiils';
import styles from './seekBar.module.css';

const SeekBar = ({ currentTime, duration }: { currentTime: number; duration: number }) => {
  return (
    <div className={styles.seekBarContainer}>
      <Text className={styles.text} size="xxs" color="softPeanut" weight="medium">
        {secondsToTime(currentTime)} / {secondsToTime(duration)}
      </Text>
      <input
        type="range"
        min="0"
        max={duration || 0}
        step={0.01}
        value={currentTime}
        style={{
          background: calculateGradient(currentTime, duration),
        }}
        className={styles.seekBar}
        //onChange={handleSeekBarChange}
      />
    </div>
  );
};

export default memo(SeekBar);
