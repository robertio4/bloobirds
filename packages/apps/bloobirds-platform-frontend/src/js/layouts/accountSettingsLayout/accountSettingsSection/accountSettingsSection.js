import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

import styles from './accountSettingsSection.module.css';

export const AccountSettingsSection = ({ children }) => <section>{children}</section>;

export const AccountSettingsSectionContent = ({ children }) => (
  <main className={styles.content}>{children}</main>
);

export const AccountSettingsSectionFooter = ({ children }) => (
  <footer className={styles.footer}>{children}</footer>
);

export const AccountSettingsSectionTitle = ({ children }) => (
  <Text size="m" weight="bold">
    {children}
  </Text>
);

export const AccountSettingsSectionSubtitle = ({ children }) => (
  <Text className={styles.subtitle} size="s" color="softPeanut">
    {children}
  </Text>
);
