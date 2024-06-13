import React from 'react';
import { Checkbox, Switch, Text } from '@bloobirds-it/flamingo-ui';
import styles from './messagingBattlecardsFilterSwitch.module.css';
import { useActiveMessagingBattleCardsFilter } from '../../../hooks/useActiveMessagingFilters';

const MessagingBattlecardsFilterSwitch = () => {
  const [showBattlecards, setShowBattlecards] = useActiveMessagingBattleCardsFilter();
  return (
    <div className={styles.container}>
      <Checkbox size="small" checked={showBattlecards} onClick={setShowBattlecards} color="purple">
        Show only Battlecards
      </Checkbox>
    </div>
  );
};

export default MessagingBattlecardsFilterSwitch;
