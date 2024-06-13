import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import { SearchData } from '../../../../../../../assets/svg';
import styles from './emptyFieldsList.module.css';

const EmptyFieldsList = () => (
  <div className={styles._container}>
    <SearchData className={styles._empty_data__icon} />
    <div>
      <Text weight="bold" size="xl" align="center" color="softPeanut">
        No fields added
      </Text>
      <Text size="m" align="center" color="softPeanut">
        Start by searching for a field and select it to preview it on the card.
      </Text>
    </div>
  </div>
);

export default EmptyFieldsList;
