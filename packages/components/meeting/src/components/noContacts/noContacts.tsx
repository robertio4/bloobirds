import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from './noContacts.module.css';

export const NoContacts = ({ hasSearchTerm }: { hasSearchTerm: boolean }) => (
  <div className={styles.noContacts}>
    <Icon name={hasSearchTerm ? 'searchNone' : 'search'} color="softPeanut" size={32} />
    <Text size="s" color="softPeanut" align="center">
      {hasSearchTerm
        ? 'No results match your search criteria'
        : 'Type something to display a list of results'}
    </Text>
  </div>
);
