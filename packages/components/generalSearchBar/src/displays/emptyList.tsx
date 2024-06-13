import React from 'react';
import { useTranslation } from 'react-i18next';

import { BobjectItemCompressed } from '@bloobirds-it/bobjects';
import { Text } from '@bloobirds-it/flamingo-ui';
import {
  BobjectType,
  ClickElementFunctionCompanyType,
  ClickElementFunctionType,
} from '@bloobirds-it/types';

import { useGeneralSearch } from '../generalSearchBar';
import styles from '../generalSearchBar.module.css';
import { NoResults, SearchHistoryList } from './emptyListDisplays';
import { FirstTimeSearch, FirstTimeSearchCompressed } from './firstTimeSearch';

interface EmptyListProps {
  bobjectType: BobjectType;
  handleBobjectCompressedClick: ClickElementFunctionType;
  handleCompanyClicked: ClickElementFunctionCompanyType;
}

/**
 * Component used for when there are no results in the search
 * @param bobjectType - BobjectType for the no results component
 * @param handleBobjectCompressedClick - function to handle the click on an item in the last visited history
 * @param handleCompanyClicked - function to close the search bar after redirecting from the list
 * @constructor
 */
function EmptyList({
  bobjectType,
  handleBobjectCompressedClick,
  handleCompanyClicked,
}: EmptyListProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'generalSearchBar' });
  const { searchQuery, lastVisited, searchHistory } = useGeneralSearch();

  if (searchQuery && searchQuery.length > 1) {
    return <NoResults bobjectType={bobjectType} />;
  }
  if (
    (!lastVisited || lastVisited.length === 0) &&
    (!searchHistory || searchHistory.length === 0)
  ) {
    return <FirstTimeSearch />;
  }

  return (
    <div className={styles.emptyBox}>
      <div className={styles.emptyBoxLeft}>
        {searchHistory.length > 0 ? (
          <SearchHistoryList searchHistory={searchHistory} />
        ) : (
          <FirstTimeSearchCompressed />
        )}
      </div>
      <div className={styles.emptyBoxCenter}></div>
      <div className={styles.emptyBoxRight}>
        {
          <div className={styles.historyList}>
            {lastVisited && lastVisited.length !== 0 ? (
              lastVisited.map(lastVisited => (
                <BobjectItemCompressed
                  key={lastVisited.rawBobject?.id}
                  bobject={lastVisited}
                  handleClick={handleBobjectCompressedClick}
                  handleCompanyClicked={handleCompanyClicked}
                />
              ))
            ) : (
              <div className={styles.noRecentActivityRow}>
                <div className={styles.noRecentActivityColumn}>
                  <Text size="s" color="softPeanut">
                    {t('noRecentActivity')}
                  </Text>
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default React.memo(EmptyList);
