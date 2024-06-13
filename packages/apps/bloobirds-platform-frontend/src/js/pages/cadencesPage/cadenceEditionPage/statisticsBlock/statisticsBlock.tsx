import React from 'react';

import { Callout, Text } from '@bloobirds-it/flamingo-ui';
import { CadenceStatistics } from '@bloobirds-it/types';

import styles from '../cadenceEditionPage.module.css';

const StatisticsBlock = ({ cadenceStatistics }: { cadenceStatistics: CadenceStatistics }) =>
  cadenceStatistics ? (
    <Callout width="800px" withoutIcon={true}>
      <div className={styles._callout_content}>
        <div className={styles._callout_block}>
          <Text weight="bold" color="softBloobirds">
            {cadenceStatistics?.totalSteps}
          </Text>
          <Text color="softBloobirds" size="s">
            Steps
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" color="softBloobirds">
            {cadenceStatistics?.prospectCount}
          </Text>
          <Text color="softBloobirds" size="s">
            Prospects
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" color="softBloobirds">
            {cadenceStatistics?.totalDays}
          </Text>
          <Text color="softBloobirds" size="s">
            Days
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" color="softBloobirds">
            {Math.round(cadenceStatistics?.automatedPercentage * 100 || 0)}%
          </Text>
          <Text color="softBloobirds" size="s">
            Automated
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" color="softBloobirds">
            {cadenceStatistics?.activeCount}
          </Text>
          <Text color="softBloobirds" size="s">
            Active
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" color="softBloobirds">
            {cadenceStatistics?.optOutCount}
          </Text>
          <Text color="softBloobirds" size="s">
            Opted-out
          </Text>
        </div>
      </div>
    </Callout>
  ) : (
    <></>
  );

export default StatisticsBlock;
