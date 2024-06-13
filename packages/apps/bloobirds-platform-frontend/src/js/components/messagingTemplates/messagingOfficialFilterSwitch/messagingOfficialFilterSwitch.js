import React from 'react';
import { Checkbox, Switch, Text } from '@bloobirds-it/flamingo-ui';
import styles from './messagingOfficialFilterSwitch.module.css';
import { useActiveMessagingOfficialFilter } from '../../../hooks/useActiveMessagingFilters';

const MessagingOfficialFilterSwitch = () => {
  const [showOfficial, setShowOfficial] = useActiveMessagingOfficialFilter();
  return (
    <div className={styles.container}>
      <Checkbox size="small" checked={showOfficial} onClick={setShowOfficial} color="purple">
        Show only Official templates
      </Checkbox>
    </div>
  );
};

export default MessagingOfficialFilterSwitch;
