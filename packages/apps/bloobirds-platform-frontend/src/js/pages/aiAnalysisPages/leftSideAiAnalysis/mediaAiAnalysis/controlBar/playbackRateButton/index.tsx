import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Dropdown, Text, Tooltip, useVisible } from '@bloobirds-it/flamingo-ui';
import Player from 'video.js/dist/types/player';

import styles from './playbackRateButton.module.css';

const PlaybackRateButton = ({ player }: { player: Player }) => {
  const { t } = useTranslation();
  const [rate, setRate] = useState(1);

  const { ref, visible, setVisible } = useVisible(false);

  const rates = [1, 1.5, 2];

  const handleChangeVelocity = (newRate: number) => {
    setRate(newRate);
    player.playbackRate(newRate);
    setVisible(false);
  };

  return (
    <Tooltip title={t('ai.aiAnalysis.changePlaySpeed')} position="top">
      <Dropdown
        ref={ref}
        visible={visible}
        anchor={
          <Button
            color="purple"
            variant="tertiary"
            onClick={() => setVisible(true)}
            uppercase={false}
          >
            {rate}x
          </Button>
        }
        onClose={() => setVisible(false)}
      >
        <div className={styles.velocityDropdown}>
          {rates?.map(velocity => (
            <div key={velocity} onClick={() => handleChangeVelocity(velocity)}>
              <Text size="s" color="peanut">
                {velocity}x
              </Text>
            </div>
          ))}
        </div>
      </Dropdown>
    </Tooltip>
  );
};

export default PlaybackRateButton;
