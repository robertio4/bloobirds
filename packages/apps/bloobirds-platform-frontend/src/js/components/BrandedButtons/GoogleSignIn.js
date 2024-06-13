import React from 'react';
import { useTranslation } from 'react-i18next';

import { GoogleSvg } from '../../../assets/svg';
import styles from './brandedButtons.module.css';

const GoogleSignIn = ({ onClick }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'brandedButtons' });

  return (
    <div className={styles._google__button} onClick={onClick}>
      <div className={styles._icon}>
        <GoogleSvg />
      </div>
      <span className={styles._text}>{t('googleSignIn')}</span>
    </div>
  );
};
export default GoogleSignIn;
