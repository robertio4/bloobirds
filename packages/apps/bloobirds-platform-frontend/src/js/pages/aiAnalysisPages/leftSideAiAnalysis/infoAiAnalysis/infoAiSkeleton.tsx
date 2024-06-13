import React from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';

import styles from './infoAiAnalysis.module.css';

const MeetingAnalysisSkeleton = () => (
  <div className={styles.container}>
    <div className={styles.leftSide}>
      <div className={styles.header}>
        <Skeleton variant="rect" width="70%" height={50} />
        <Skeleton variant="rect" width="20%" height={50} />
      </div>
      <Skeleton variant="rect" height={60} width="100%" />
    </div>
  </div>
);

export default MeetingAnalysisSkeleton;
