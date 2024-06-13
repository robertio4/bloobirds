import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, IconType, Tooltip } from '@bloobirds-it/flamingo-ui';
import Player from 'video.js/dist/types/player';

const PlayButton = ({ player }: { player: Player }) => {
  const { t } = useTranslation();
  const [icon, setIcon] = useState<IconType>('play');

  player.on('play', () => {
    setIcon('pause');
  });

  player.on('pause', () => {
    setIcon('play');
  });

  const handlePlayPause = () => {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  };

  return (
    <Tooltip
      title={icon === 'play' ? t('ai.aiAnalysis.play') : t('ai.aiAnalysis.pause')}
      position="top"
    >
      <IconButton color="purple" name={icon} onClick={handlePlayPause} />
    </Tooltip>
  );
};

export default PlayButton;
