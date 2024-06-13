import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './brandedButtons.module.css';

export const GoogleSignIn = ({ onClick }: { onClick: any }) => {
  const { t } = useTranslation();

  return (
    <div className={styles._google__button} onClick={onClick}>
      <div className={styles._icon}>{/*<GoogleSvg />*/}</div>
      <span className={styles._text}>{t('calendar.signWithGoogle')}</span>
    </div>
  );
};
