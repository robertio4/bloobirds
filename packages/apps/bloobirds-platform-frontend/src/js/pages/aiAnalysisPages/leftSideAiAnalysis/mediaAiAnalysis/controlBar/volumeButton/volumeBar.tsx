import React, { useRef, useEffect, useState } from 'react';

import clsx from 'clsx';
import Player from 'video.js/dist/types/player';

import styles from './volumeBar.module.css';

interface VolumeBarProps {
  player: Player | null;
  isVisible: boolean;
}

const VolumeBar = ({ player, isVisible }: VolumeBarProps) => {
  const [volumeLevel, setVolumeLevel] = useState(1);

  useEffect(() => {
    if (!player) return;

    const updateVolume = () => {
      const newVolume = player.volume();
      setVolumeLevel(newVolume);
    };

    updateVolume();

    player.on('volumechange', updateVolume);

    return () => {
      if (player) {
        player.off('volumechange', updateVolume);
      }
    };
  }, [player]);

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolumeLevel(newVolume);
    player.volume(newVolume);
  };

  const classesContainer = clsx(styles.volumeBarContainer, {
    [styles.volumeBarContainerVisible]: isVisible,
  });

  const calculateGradient = () => {
    return `linear-gradient(to right, var(--purple) ${volumeLevel * 100}%, var(--lightPurple) ${
      volumeLevel * 100
    }%)`;
  };

  return (
    <div className={classesContainer}>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volumeLevel}
        onChange={handleChangeVolume}
        className={styles.volumeBar}
        style={{
          background: calculateGradient(),
        }}
      />
    </div>
  );
};

export default VolumeBar;
