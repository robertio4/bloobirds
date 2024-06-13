import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from './noResultsFound.module.css';

export const NoResultsFound = ({ searchTerm }: { searchTerm: string }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'bobjectSelector.noResultsFound' });
        
  return (
    <div className={styles.noResultFound}>
      <Icon name="searchNone" size={32} color="softPeanut" />
      <div className={styles.text}>
        <Text color="softPeanut" size="s" align="center">
          {t('title', { searchTerm })}
        </Text>
        <Text color="softPeanut" size="s" align="center">
          {t('subtitle')}
        </Text>
      </div>
    </div>
  );
};
