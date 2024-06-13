import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './errorPanel.module.css';

export const ErrorPanel = () => (
  <div className={styles.root}>
    <div className={styles.icon}>
      <Icon size={24} color="softPeanut" name="searchNone" />
    </div>
    <div className={styles.text}>
      <Text size="m" align="center" color="softPeanut">
        Something went wrong
      </Text>
      <Text size="m" align="center" color="softPeanut">
        Data could not be retrieved
      </Text>
    </div>
  </div>
);
