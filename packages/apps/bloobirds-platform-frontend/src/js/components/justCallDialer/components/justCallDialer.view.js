import React from 'react';

import crossJustCall from '../../../../assets/crossJustCall.svg';
import justCall from '../../../../assets/logoJustCall.svg';
import { useJustCallVisibility } from '../hooks/useJustCall';
import styles from '../styles/justCallDialer.module.css';

export const JustCallDialer = () => {
  const { justCallVisible, toggleVisibility, justCallNumber } = useJustCallVisibility();
  const url = `https://justcall.io/dialer?numbers=${justCallNumber || ''}`;

  return (
    <div>
      <div className={styles.justCall_icon} onClick={toggleVisibility}>
        <img
          src={justCallVisible ? crossJustCall : justCall}
          alt="justcall-logo"
          className={styles.justCall_icon_img}
        />
        <div
          className={styles.justCall_dialer_container}
          style={{ display: !justCallVisible && 'none' }}
        >
          <div className={styles.justCall_dialer}>
            <iframe
              src={url}
              title="Just Call Dialer"
              referrerPolicy="no-referrer"
              allow="microphone"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
