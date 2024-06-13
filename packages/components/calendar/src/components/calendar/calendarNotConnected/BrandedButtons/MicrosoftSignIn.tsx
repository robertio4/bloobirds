import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './brandedButtons.module.css';

export const MicrosoftSignIn = ({ onClick }: { onClick: any }) => {
  const { t } = useTranslation();
  return (
    <div className={styles._ms__button} onClick={onClick}>
      <div className={styles._icon}>{/*<MicrosoftSvg />*/}</div>
      <span className={styles._text}>{t('calendar.signWithOutlook')}</span>
    </div>
  );
};
