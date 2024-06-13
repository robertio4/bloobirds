import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

import SessionManagerFactory from '../../../../../misc/session';
import SFDCImage from './assets/SFDC.png';
import styles from './otoSlides.module.css';

const SessionManager = SessionManagerFactory();

function FirstScreenOTO() {
  const { name } = SessionManager?.getUser() || {};
  const { t } = useTranslation('translation', {
    keyPrefix: 'welcomeScreens.otoSlides.firstScreen',
  });

  return (
    <div key={'firstScreen'} className={styles.backgroundWhite}>
      <div className={styles.subtitleContent}>
        <Text
          size="m"
          align="center"
          weight="bold"
          color="softPeanut"
          className={styles.subtitleText}
        >
          <Trans
            i18nKey="welcomeScreens.otoSlides.firstScreen.subtitle"
            components={[
              <Text
                key="0"
                size="m"
                weight="bold"
                color="bloobirds"
                inline
                className={styles.subtitleText}
              >
                {''}
              </Text>,
            ]}
            values={{ name }}
          />
        </Text>
      </div>
      <div className={styles.titleContent}>
        <Trans
          i18nKey="welcomeScreens.otoSlides.firstScreen.title"
          components={[
            <Text key="0" size="xxl" align="center" weight="bold">
              {''}
            </Text>,
            <Text key="1" size="xxl" align="center" weight="heavy" color="bloobirds">
              {''}
            </Text>,
          ]}
        />
      </div>

      <div className={styles.svgContent}>
        <img height={295} src={SFDCImage} alt="svg" />
      </div>
      <div className={styles.descriptionContent}>
        <Text size="s" align="center" className={styles.descriptionText}>
          <Trans
            i18nKey="welcomeScreens.otoSlides.firstScreen.content"
            components={[<br key="0" />]}
          />
        </Text>
      </div>
    </div>
  );
}
export default FirstScreenOTO;
