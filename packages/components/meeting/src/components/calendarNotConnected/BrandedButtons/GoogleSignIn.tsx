import React from 'react';

import styles from './brandedButtons.module.css';

export const GoogleSignIn = ({ onClick }: { onClick: any }) => (
  <div className={styles._google__button} onClick={onClick}>
    <div className={styles._icon}>{/*<GoogleSvg />*/}</div>
    <span className={styles._text}>Sign in with Google</span>
  </div>
);
