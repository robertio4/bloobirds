import React from 'react';

import styles from './brandedButtons.module.css';

export const MicrosoftSignIn = ({ onClick }: { onClick: any }) => (
  <div className={styles._ms__button} onClick={onClick}>
    <div className={styles._icon}>{/*<MicrosoftSvg />*/}</div>
    <span className={styles._text}>Sign in with Outlook</span>
  </div>
);
