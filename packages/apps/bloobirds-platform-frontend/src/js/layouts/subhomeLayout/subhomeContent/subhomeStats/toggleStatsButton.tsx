import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './subhomeStats.module.css';
import { useSubhome } from '../../subhomeLayout';

export const ToggleStatsButton = ({ label = 'stats' }: { label?: string }) => {
  const { showStats, toggleStats } = useSubhome();
  return (
    <div className={styles._stats_title} onClick={toggleStats}>
      <Icon name="barchart" size={16} />
      <Text size="xxs" color="bloobirds" align="center">
        {showStats ? `Hide ${label}` : `Show ${label}`}
      </Text>
    </div>
  );
};
