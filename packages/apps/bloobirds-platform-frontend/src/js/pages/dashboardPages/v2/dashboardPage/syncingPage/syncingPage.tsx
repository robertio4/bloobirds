import React from 'react';
import { Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import styles from './syncingPage.module.css';

const SyncingPage = () => {
  return (
    <div className={styles._container}>
      <span className={styles._clock}>
        <Icon name="clock" size={48} />
      </span>
      <Text size="xxl" weight="medium" color="peanut" align="center">
        Syncing data
      </Text>
      <div className={styles._subtitle}>
        <Text size={'m'} weight="regular" color="softPeanut" align={'center'}>
          Syncronization is in progress. This process may take a few minutes
        </Text>
      </div>
      <span className={styles._spinner}>
        <Spinner name="dots" size={50} />
      </span>
    </div>
  );
};

export default SyncingPage;
