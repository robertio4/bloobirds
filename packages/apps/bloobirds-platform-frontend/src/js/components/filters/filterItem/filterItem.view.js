import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import styles from './filterItem.module.css';

const FilterItem = ({ title, children }) => (
  <li className={styles._item}>
    {title && (
      <Text size="m" htmlTag="h3" color="softPeanut">
        {title}
      </Text>
    )}
    {children}
  </li>
);

export default FilterItem;
