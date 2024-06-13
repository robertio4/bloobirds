import React from 'react';
import { Checkbox, Switch, Text } from '@bloobirds-it/flamingo-ui';
import styles from './messagingVisibilitySwitch.module.css';
import { useActiveMessagingVisibilityFilter } from '../../../hooks/useActiveMessagingFilters';

const MessagingVisibilitySwitch = () => {
  const [visibility, setVisibility] = useActiveMessagingVisibilityFilter();
  return (
    <div className={styles.container}>
      <Checkbox
        size="small"
        checked={visibility === 'PRIVATE'}
        onClick={v => setVisibility(v ? 'PRIVATE' : null)}
        color="purple"
      >
        Show only private
      </Checkbox>
    </div>
  );
};

export default MessagingVisibilitySwitch;
