import React, { useState } from 'react';
import { useParams } from 'react-router';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { useCopilotActivity } from '@bloobirds-it/hooks';
import { TranscriptFragment } from '@bloobirds-it/types';
import Player from 'video.js/dist/types/player';

import { SfdcRecord, Source } from '../../useActivityAnalysis';
import { updateHeightRightSide } from '../../utiils';
import ControlBar from './controlBar';
import VideoJS from './player';
import TimelineArea from './timelineArea';

interface Intervention {
  text: string;
  start: number;
  end: number;
  speaker: string;
}

export interface InterventionDuration {
  start: number;
  duration: number;
}

export type InterventionMap = Record<string, InterventionDuration[]>;

const soundWaveOptions = {
  plugins: {
    wavesurfer: {
      displayMilliseconds: true,
      debug: true,
      waveColor: '#f6fafd',
      progressColor: '#94A5B4',
      hideScrollbar: true,
      barWidth: 3,
      barHeight: 0.6,
    },
  },
};

const getSpeakers = (data: TranscriptFragment[], activityType: string) => {
  const speakers: InterventionMap = data?.reduce(
    (object: InterventionMap, intervention: Intervention) => {
      const { speaker, start, end } = intervention;

      const duration: number = end - start;
      let newIntervention: InterventionDuration = { start, duration };

      if (activityType === 'call') {
        newIntervention = {
          start: start / 1000,
          duration: duration / 1000,
        };
      }

      if (object[speaker]) {
        object[speaker].push(newIntervention);
      } else {
        object[speaker] = [newIntervention];
      }

      return object;
    },
    {},
  );

  return speakers;
};

const MediaAnalysis = ({
  source,
  player,
  setPlayer,
  sfdcRecord,
}: {
  source: Source;
  player: Player | null;
  setPlayer: (player: Player) => void;
  sfdcRecord: SfdcRecord;
}) => {
  const { activityType } = useParams<{ activityType: string }>();
  const [openTimeline, setOpenTimeline] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { transcript: data } = useCopilotActivity();
  const speakers = getSpeakers(data?.transcript, activityType);

  const handlePlayerReady = (player: Player) => {
    setPlayer(player);

    player.on('loadeddata', () => {
      setDataLoaded(true);

      updateHeightRightSide();
    });

    player.on('waveReady', () => {
      setDataLoaded(true);

      updateHeightRightSide();
    });
  };

  const handleChangeIntervention = (player: Player, currentTime: number) => {
    const nextIntervention = data?.transcript?.find(
      (intervention: Intervention) => intervention.start > currentTime,
    );
    player.currentTime(nextIntervention.start);
  };

  return (
    <div id="videoModule">
      <VideoJS
        onReady={handlePlayerReady}
        onChangeIntervention={handleChangeIntervention}
        source={source}
        options={activityType === 'call' ? soundWaveOptions : {}}
      />
      {player && (
        <>
          {dataLoaded ? (
            <>
              <ControlBar
                player={player}
                setOpenTimeLine={setOpenTimeline}
                onChangeIntervention={handleChangeIntervention}
                sfdcRecord={sfdcRecord}
              />
              <TimelineArea data={speakers} player={player} openTimeline={openTimeline} />
            </>
          ) : (
            <>
              <Skeleton variant="text" width="100%" height={80} />
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="text" width="100%" height={40} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MediaAnalysis;
