import React from 'react';
import { useTranslation } from 'react-i18next';

import { CommandBox, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { BobjectType } from '@bloobirds-it/types';

// @ts-ignore
import SearchData from '../assets/searchdata.svg';
import styles from '../generalSearchBar.module.css';

export function NoResults({ bobjectType }: { bobjectType: BobjectType }) {
  const { t } = useTranslation('translation', { keyPrefix: 'generalSearchBar.noResults' });
  const { t: bobjectTypeT } = useTranslation('translation', {
    keyPrefix: 'bobjectTypes',
  });
  const renderMessage = bobjectType
    ? bobjectTypeT(bobjectType.toLowerCase(), { count: 0 })
    : t('results');

  return (
    <div className={styles.emptyBox}>
      <div className={styles.emptyResultsContainer}>
        <img className={styles.emptyResultsIcon} src={SearchData} />
        <Text color="softPeanut" size={'xl'} weight={'bold'}>
          {t('title', { bobjectType: renderMessage })}
        </Text>
        <Text color="softPeanut" size={'m'}>
          {t('subtitle')}{' '}
        </Text>
      </div>
    </div>
  );
}

export function SearchHistoryList({ searchHistory }: { searchHistory: string[] }) {
  const store = CommandBox.useCommandBoxStore();
  return (
    <div className={styles.historyList}>
      {searchHistory.map(searchItem => (
        <div
          className={styles.historyListItem}
          key={`search-item-${searchItem}`}
          onClick={() => store.setState('search', searchItem)}
        >
          <Icon name="search" color="softPeanut" />
          <Text size="s" inline color="peanut">
            {searchItem}
          </Text>
        </div>
      ))}
    </div>
  );
}
