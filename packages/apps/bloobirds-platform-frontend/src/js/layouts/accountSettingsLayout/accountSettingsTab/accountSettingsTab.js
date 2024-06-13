import React from 'react';

import { Icon, TableContainer, Text } from '@bloobirds-it/flamingo-ui';

import { SearchLogs } from '../../../../assets/svg';
import styles from './accountSettingsContent.module.css';

export const AccountSettingsTab = ({ children }) => (
  <div className={styles._wrapper}>{children}</div>
);

export const AccountSettingsTabHeader = ({ children }) => (
  <header className={styles._header__container}>{children}</header>
);

export const AccountSettingsTabHeaderLeft = ({ children }) => (
  <div className={styles._left__header__container}>{children}</div>
);

export const AccountSettingsTabHeaderRight = ({ children }) => (
  <div className={styles._right__header__container}>{children}</div>
);

export const AccountSettingsTabTitle = ({ children, icon, color = 'bloobirds' }) => (
  <div className={styles._title}>
    <Icon name={icon} color={color} />
    <Text htmlTag="h4" size="l" color="peanut">
      {children}
    </Text>
  </div>
);

export const AccountSettingsTabSubtitle = ({ children }) => (
  <div className={styles._subtitle}>
    <Text htmlTag="h5" size="xs" color="softPeanut">
      {children}
    </Text>
  </div>
);

export const AccountSettingsTabContent = ({ children }) => (
  <main className={styles._content}>{children}</main>
);

export const AccountSettingsTableContainer = ({ children }) => (
  <div className={styles.table}>
    <TableContainer>{children}</TableContainer>
  </div>
);

export const AccountSettingsTabEmptyContent = ({ children }) => (
  <div className={styles._no_results__contents}>
    <SearchLogs className={styles._no_results__img} />
    <Text size="xl" weight="bold" align="center" color="softPeanut">
      {children}
    </Text>
  </div>
);

export default AccountSettingsTab;
