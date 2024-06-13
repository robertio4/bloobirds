import classNames from 'clsx';
import styles from '../dashboardPageContent/dashboardPageContent.module.css';
import React from 'react';

export const FilterItem = ({ children, className }) => (
  <div className={classNames(styles.filters_item, className)}>{children}</div>
);
