import React from 'react';

import styles from '../aiAnalysisPage.module.css';

const RightSideAiAnalysis = ({ children }: { children: JSX.Element }) => {
  return (
    <div id="rightSide" className={styles.rightSide}>
      {children}
    </div>
  );
};

export default RightSideAiAnalysis;
