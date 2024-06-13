import React from 'react';
import { useTranslation } from 'react-i18next';

import { MicrosoftSvg } from '../../../assets/svg';
import styles from './brandedButtons.module.css';

const MicrosoftSignIn = ({ onClick }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'brandedButtons' });

  return (
    <div className={styles._ms__button} onClick={onClick}>
      <div className={styles._icon}>
        <MicrosoftSvg />
      </div>
      <span className={styles._text}>{t('outlookSignIn')}</span>
    </div>
  );
};
export default MicrosoftSignIn;
