import React from 'react';
import PropTypes from 'prop-types';
import styles from './subhomeFilter.module.css';

export const SubhomeFilterGroup = ({ children }) => (
  <div className={styles._group__container}>{children}</div>
);

SubhomeFilterGroup.propTypes = {
  children: PropTypes.any.isRequired,
};

export const SubhomeFilters = ({ children }) => <div className={styles._container}>{children}</div>;

SubhomeFilters.propTypes = {
  children: PropTypes.any.isRequired,
};
