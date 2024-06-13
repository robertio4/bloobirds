import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Player from 'video.js/dist/types/player';

import { InterventionMap } from '../../../aiAnalysisPage';
import CurrentTimeIndicator from './currentTimeIndicator';
import HoverTimeIndicator from './hoverTimeIndicator';
import SeekBar from './seekBar';
import TimelineSpeakers from './timeline';
import styles from './timelineArea.module.css';

const TimelineArea = ({
  data,
  player,
  openTimeline,
}: {
  data: InterventionMap;
  player: Player;
  openTimeline: boolean;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(0);

  const duration: number = player.duration() || 0;

  // Función para manejar el clic en la línea de tiempo
  const handleChangeTime = useCallback((time: number) => {
    if (player) {
      player.currentTime(time);
      setCurrentTime(time);
    }
  }, []);

  const updateThumbValue = () => {
    setCurrentTime(player.currentTime());
  };

  useEffect(() => {
    const thumbUpdateInterval = setInterval(() => {
      updateThumbValue();
    }, 50);

    return () => clearInterval(thumbUpdateInterval);
  }, [player]);

  return (
    <div
      className={styles.timelineArea}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const time = (x / width) * (player.duration() || 0);
        setHoverTime(time);
      }}
      onMouseLeave={() => setHoverTime(null)}
      onClick={() => hoverTime !== null && handleChangeTime(hoverTime)}
    >
      <SeekBar currentTime={currentTime} duration={duration} />

      <TimelineSpeakers
        data={data}
        openTimeline={openTimeline}
        duration={duration}
        handleChangeTime={handleChangeTime}
      />

      <CurrentTimeIndicator time={currentTime} duration={duration} />

      <HoverTimeIndicator time={hoverTime} duration={duration} />
    </div>
  );
};

export default TimelineArea;
