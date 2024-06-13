import React from 'react';

import styles from './emailModalRow.module.css';

interface EmailModalRowProps {
  children: any;
  callback?: () => void;
  isDisabled?: boolean;
}

function EmailModalRow({ children, callback, isDisabled = false }: EmailModalRowProps) {
  return (
    <div className={styles.container} onClick={callback}>
      {children}
      {isDisabled && <div className={styles.disabledOverlay} />}
    </div>
  );
}

export default EmailModalRow;
