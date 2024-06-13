import classNames from 'clsx';
import React from 'react';
import styles from '../../v1/dashboardPageContent/dashboardPageContent.module.css';

interface FilterItem {
  children: any;
  className?: string;
}
export const FilterItem = ({ children, className }: FilterItem) => (
  <div className={classNames(styles.filters_item, className)}>{children}</div>
);
