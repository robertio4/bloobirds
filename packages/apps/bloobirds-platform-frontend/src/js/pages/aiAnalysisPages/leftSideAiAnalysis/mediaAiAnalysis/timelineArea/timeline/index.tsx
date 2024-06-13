import React, { memo, useMemo } from 'react';

import { ColorType, Text } from '@bloobirds-it/flamingo-ui';

import { InterventionDuration, InterventionMap } from '../../../../aiAnalysisPage';
import styles from './timeline.module.css';

const Timeline = memo(
  ({
    duration,
    changeTime,
    speaker,
    role,
    interventions,
    color = 'softPurple',
  }: {
    duration: number;
    changeTime: (time: number) => void;
    speaker: string;
    role: string;
    interventions: InterventionDuration[];
    color?: ColorType;
  }) => {
    if (!duration) {
      return null;
    }

    return (
      <div className={styles.timelineContainer}>
        <div className={styles.actor}>
          <Text size="xs" color="peanut" weight="medium" inline>
            {speaker}
          </Text>
          <Text size="xs" color="softPeanut" weight="medium" inline>
            {role}
          </Text>
        </div>
        <div className={styles.timeline}>
          {interventions &&
            interventions.map((point, index) => {
              const width = (point?.duration / (duration || 1)) * 100;

              if (point?.start + point?.duration > duration) {
                return <></>;
              }

              return (
                <div
                  key={index}
                  className={styles.blob}
                  style={{
                    left: `${(point?.start / (duration || 1)) * 100}%`,
                    width: `${width}%`,
                    background: `var(--${color})`,
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    changeTime(point?.start);
                  }}
                />
              );
            })}
        </div>
      </div>
    );
  },
  () => true,
);

const TimelineSpeakers = ({
  openTimeline,
  data,
  duration,
  handleChangeTime,
}: {
  openTimeline: boolean;
  data: InterventionMap;
  duration: number;
  handleChangeTime: (time: number) => void;
}) => {
  const timelines = openTimeline && data && Object.keys(data).length > 0 && (
    <div id="attendees" className={styles.attendees}>
      {Object.keys(data).map(speaker => (
        <Timeline
          key={speaker}
          speaker={speaker}
          role=""
          interventions={data[speaker]}
          duration={duration}
          changeTime={handleChangeTime}
        />
      ))}
    </div>
  );

  return <>{timelines}</>;
};

export default memo(TimelineSpeakers);
