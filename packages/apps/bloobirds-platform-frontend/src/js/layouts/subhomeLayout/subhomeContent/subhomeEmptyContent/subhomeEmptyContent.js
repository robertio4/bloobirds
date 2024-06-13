import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import { SearchData } from '../../../../../assets/svg';
import styles from './subhomeEmptyContent.module.css';

const SubhomeEmptyContent = () => (
  <div className={styles._container}>
    <SearchData className={styles._icon} />
    <div className={styles._text}>
      <Text color="peanut" size="l">
        No results were found to the current filters
      </Text>
      <Text color="verySoftPeanut" size="m">
        Try modifying your filter criteria
      </Text>
    </div>
  </div>
);

export default SubhomeEmptyContent;
