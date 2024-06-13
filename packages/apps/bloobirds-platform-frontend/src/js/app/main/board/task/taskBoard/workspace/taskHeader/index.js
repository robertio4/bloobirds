import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import styles from './taskHeader.module.css';

const Index = ({ title, subtitle, Button }) => (
  <div className={styles.root}>
    <div className={styles.left}>
      <div className={styles.title}>
        <Text color="peanut" size="xl">
          {title}
        </Text>
      </div>
      {subtitle !== undefined && (
        <Text color="peanut" size="s">
          {subtitle}
        </Text>
      )}
    </div>
    {Button && (
      <div className={styles.right}>
        <Button />
      </div>
    )}
  </div>
);

export const TaskHeader = Index;
