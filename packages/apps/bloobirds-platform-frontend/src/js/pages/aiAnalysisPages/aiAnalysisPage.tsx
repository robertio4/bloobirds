import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { TabGroup } from '@bloobirds-it/flamingo-ui';
import { useMediaQuery } from '@bloobirds-it/hooks';
import { Bobject } from '@bloobirds-it/types';
import clsx from 'clsx';
import Player from 'video.js/dist/types/player';

import styles from './aiAnalysisPage.module.css';
import LeftSideAiAnalysis from './leftSideAiAnalysis';
import InfoAiAnalysis from './leftSideAiAnalysis/infoAiAnalysis';
import MediaAiAnalysis from './leftSideAiAnalysis/mediaAiAnalysis';
import RightSideAiAnalysis from './rightSideAiAnalysis';
import ActivityFeed from './rightSideAiAnalysis/activityFeed/activityFeed';
import Insights from './rightSideAiAnalysis/insights/insights';
import Summary from './rightSideAiAnalysis/summary/summary';
import Tab from './rightSideAiAnalysis/tabAiAnalysis';
import Transcript from './rightSideAiAnalysis/transcript/transcript';
import { SfdcRecord, Source } from './useActivityAnalysis';

export interface InterventionDuration {
  start: number;
  duration: number;
}

export type InterventionMap = Record<string, InterventionDuration[]>;

const AiAnalysisPage = ({
  activity,
  source,
  sfdcRecord,
}: {
  activity: Bobject;
  source: Source;
  sfdcRecord: SfdcRecord;
}) => {
  const { isSmallDesktop, isMediumDesktop } = useMediaQuery();
  const [player, setPlayer] = useState<Player | null>(null);
  const { t } = useTranslation();

  return (
    <div
      className={clsx(styles.container, {
        [styles.container_small_desktop]: isSmallDesktop || isMediumDesktop,
      })}
    >
      <div className={styles.body}>
        <LeftSideAiAnalysis>
          <InfoAiAnalysis activity={activity} isLoading={false} />
          {source && (
            <MediaAiAnalysis
              source={source}
              player={player}
              setPlayer={setPlayer}
              sfdcRecord={sfdcRecord}
            />
          )}
        </LeftSideAiAnalysis>
        <RightSideAiAnalysis>
          <TabGroup>
            <Tab active name={t('ai.aiAnalysis.summary')} icon="snippet">
              <Summary />
            </Tab>
            <Tab name={t('ai.aiAnalysis.transcript')} icon="alignCenter">
              <Transcript onClick={time => player.currentTime(time)} />
            </Tab>
            <Tab name={t('ai.aiAnalysis.insights')} icon="magic">
              <Insights activity={activity}></Insights>
            </Tab>
            <Tab name={t('ai.aiAnalysis.activities')} icon="activity">
              <ActivityFeed activity={activity} />
            </Tab>
          </TabGroup>
        </RightSideAiAnalysis>
      </div>
    </div>
  );
};

export default AiAnalysisPage;
