import React from 'react';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import styles from './kpisError.module.css';

export const KpisError = () => {
  return (
    <div className={styles.root}>
      <Icon name="clock" color="softPeanut" />
      <div className={styles.text}>
        <Text size="m" color="softPeanut">
          There was a problem loading your stats.
        </Text>
        <Text size="m" color="softPeanut">
          Try reloading the page to display them{' '}
        </Text>
      </div>
    </div>
  );
};
