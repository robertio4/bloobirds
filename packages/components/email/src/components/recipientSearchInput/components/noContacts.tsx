import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../recipientSearchInput.module.css';

const NoContacts = ({ hasSearchTerm }: { hasSearchTerm: boolean }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.recipientSearchInput',
  });

  return (
    <div className={styles.noContacts}>
      <Icon name={hasSearchTerm ? 'searchNone' : 'search'} color="softPeanut" size={32} />
      <Text size="s" color="softPeanut" align="center">
        {hasSearchTerm ? t('noContactsWithSearchTerm') : t('noContactsWithoutSearchTerm')}
      </Text>
    </div>
  );
};

export default NoContacts;
