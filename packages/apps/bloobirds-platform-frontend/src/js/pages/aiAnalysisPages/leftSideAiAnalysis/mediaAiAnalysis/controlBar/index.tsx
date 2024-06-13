import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Action, IconButton, Switch, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import Player from 'video.js/dist/types/player';

import { SfdcRecord } from '../../../useActivityAnalysis';
import { updateHeightRightSide } from '../../../utiils';
import styles from './controlBar.module.css';
import PlayButton from './playButton';
import PlaybackRateButton from './playbackRateButton';
import SeekButton from './seekButton';
import VolumeButton from './volumeButton';

type CustomControlBarProps<Player> = {
  player: Player;
  setOpenTimeLine: (openTimeline: boolean) => void;
  onChangeIntervention: (player: Player, time: number) => void;
  sfdcRecord: SfdcRecord;
};

const ControlBar = ({
  player,
  setOpenTimeLine,
  onChangeIntervention,
  sfdcRecord,
}: CustomControlBarProps<Player>) => {
  const { t } = useTranslation();
  const [openTimelineSwitch, setOpenTimelineSwitch] = useState(true);

  const { settings } = useActiveUserSettings();
  const salesforceInstance = settings?.account?.salesforceInstance;

  const onChangeTimelineSwitch = () => {
    setOpenTimelineSwitch(!openTimelineSwitch);
    setOpenTimeLine(!openTimelineSwitch);

    setTimeout(() => {
      updateHeightRightSide();
    }, 100);
  };

  const goToSalesforce = () => {
    window.open(
      `${salesforceInstance}/lightning/r/${sfdcRecord.type}/${sfdcRecord.id}/view`,
      '_blank',
    );
  };

  return (
    <div className={styles.customControlBar}>
      <div className={styles.leftButtons}>
        {sfdcRecord?.id && (
          <Tooltip title={t('ai.aiAnalysis.seeOnSfdc')} position="top">
            <Action
              icon={'salesforceOutlined'}
              color="darkBloobirds"
              size="s"
              onClick={goToSalesforce}
            />
          </Tooltip>
        )}
      </div>
      <div className={styles.centerButtons}>
        <PlaybackRateButton player={player} />
        <SeekButton type="backward" player={player} />
        <PlayButton player={player} />
        <SeekButton type="forward" player={player} />
        <Tooltip title={t('ai.aiAnalysis.nextSpeaker')} position="top">
          <IconButton
            color="purple"
            name="personArrow"
            onClick={() => onChangeIntervention(player, player.currentTime())}
          />
        </Tooltip>
      </div>
      <div className={styles.rightButtons}>
        <div className={styles.switchContainer}>
          <Switch
            size="small"
            color="purple"
            checked={openTimelineSwitch}
            onChange={onChangeTimelineSwitch}
          />
          <Text size="s" color="peanut">
            {t('ai.aiAnalysis.attendees')}
          </Text>
        </div>
        <VolumeButton player={player} />
      </div>
    </div>
  );
};

export default ControlBar;
