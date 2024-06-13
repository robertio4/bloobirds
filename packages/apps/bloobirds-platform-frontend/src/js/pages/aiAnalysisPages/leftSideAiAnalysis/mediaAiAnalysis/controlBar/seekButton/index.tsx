import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import Player from 'video.js/dist/types/player';

const SeekButton = ({ player, type }: { player: Player; type: 'forward' | 'backward' }) => {
  const { t } = useTranslation();

  const handleSeekBackward = () => {
    player.currentTime(player.currentTime() - 10);
  };

  const handleSeekForward = () => {
    player.currentTime(player.currentTime() + 10);
  };

  return (
    <Tooltip
      title={type === 'forward' ? t('ai.aiAnalysis.skipForward') : t('ai.aiAnalysis.skipBack')}
      position="top"
    >
      <IconButton
        color="purple"
        name={type === 'forward' ? 'forward10' : 'rewind10'}
        onClick={type === 'forward' ? handleSeekForward : handleSeekBackward}
      />
    </Tooltip>
  );
};

export default SeekButton;
