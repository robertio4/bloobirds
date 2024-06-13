import styles from '../outbound/syncSettingsTabOutbound.module.css';
import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';

const SyncSettingsCard = ({ icon, title, subtitle, isDisabled, children }) => (
  <div className={styles._sync_settings_card}>
    <div className={styles._sync_settings_card_title}>
      <Icon name={icon} size="24" />
      <div className={styles._sync_settings_card_text_container}>
        <Text size="l" weight="medium" color="peanut">
          {title}
        </Text>
        {subtitle && (
          <Text size="s" color="softPeanut">
            {subtitle}
          </Text>
        )}
      </div>
    </div>
    <div className={styles._sync_settings_card_children}>{children}</div>
    <div className={styles._sync_settings_card_button}></div>
  </div>
);
export default SyncSettingsCard;
