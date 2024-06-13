import React from 'react';
import { Checkbox, Switch, Text } from '@bloobirds-it/flamingo-ui';
import styles from './messagingMineSwitch.module.css';
import { useActiveMessagingMineFilter } from '../../../hooks/useActiveMessagingFilters';

const MessagingMineSwitch = () => {
  const [showMine, setShowMine] = useActiveMessagingMineFilter();
  return (
    <div className={styles.container}>
      <Checkbox size="small" checked={showMine} onClick={setShowMine} color="purple">
        Show only mine
      </Checkbox>
    </div>
  );
};

export default MessagingMineSwitch;
