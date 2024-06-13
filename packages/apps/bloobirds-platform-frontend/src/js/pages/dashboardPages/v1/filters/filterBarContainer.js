import { useReportingDelay } from '../../../../hooks';
import styles from '../dashboardPageContent/dashboardPageContent.module.css';
import React from 'react';

export const FilterBarContainer = ({ children }) => {
  const { reportingDelay } = useReportingDelay();
  return (
    <div
      className={styles.filters}
      style={{
        top: reportingDelay?.needsToNotify && reportingDelay?.warningVisible ? '-10px' : '-40px',
      }}
    >
      {children}
    </div>
  );
};
