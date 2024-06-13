import React, { useState } from 'react';

import { IconButton } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import Player from 'video.js/dist/types/player';

import VolumeBar from './volumeBar';
import styles from './volumeBar.module.css';

const VolumeButton = ({ player }: { player: Player }) => {
  const [isVolumeBarVisible, setIsVolumeBarVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleIncreaseVolume = () => {
    const muted = !player.muted();
    player.muted(muted);
    setIsMuted(muted);
  };

  const handleVolumeButtonHover = (isHovering: boolean) => {
    setIsVolumeBarVisible(isHovering);
  };

  const classes = clsx(styles.volumeControl, {
    [styles.volumeControlVisible]: isVolumeBarVisible,
  });

  return (
    <div
      className={classes}
      onMouseEnter={() => handleVolumeButtonHover(true)}
      onMouseLeave={() => handleVolumeButtonHover(false)}
    >
      <IconButton
        color="purple"
        name={isMuted ? 'volume' : 'volume2'}
        onClick={handleIncreaseVolume}
      />
      <VolumeBar player={player} isVisible={isVolumeBarVisible} />
    </div>
  );
};

export default VolumeButton;
