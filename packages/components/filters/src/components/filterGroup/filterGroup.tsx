import React, { ReactElement } from 'react';
import styles from './filterGroup.module.css';

const FilterGroup = ({ children }: { children: ReactElement[] | ReactElement }) => (
  <div className={styles.groupContainer}>{children}</div>
);

export default FilterGroup;
