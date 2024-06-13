import React from 'react';

import styles from '../aiAnalysisPage.module.css';

const LeftSideAnalysis = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.leftSide}>{children}</div>;
};

export default LeftSideAnalysis;
