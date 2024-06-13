import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { useConfetti, useUserHelpers } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';

import styles from './otoSlides.module.css';

export const LastScreenOTO = () => {
  const { save } = useUserHelpers();
  const { throwConfetti } = useConfetti();
  const { t } = useTranslation('translation', { keyPrefix: 'welcomeScreens.otoSlides.lastScreen' });

  useEffect(() => {
    const timeout = setTimeout(() => {
      save(UserHelperKeys.COMPLETE_WELCOME_SCREEN);
    }, 15000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div key="lastScreen" className={styles.backgroundWhite}>
      <div className={styles.lastScreenWrapper}>
        <Text size="xxxl" align="center" weight="bold" color="peanut">
          <Trans
            i18nKey="welcomeScreens.otoSlides.lastScreen.title"
            components={[
              <Text key="0" size="xxxl" weight="heavy" inline color="bloobirds">
                {''}
              </Text>,
            ]}
          />
          <span
            style={{ cursor: 'default' }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              throwConfetti({ bloobirdsShape: true });
            }}
          >
            {' '}
            🎉
          </span>
        </Text>
        <div className={styles.lastScreenButtons}>
          <Button
            size="medium"
            iconRight="bloobirds"
            onClick={() => {
              save(UserHelperKeys.COMPLETE_WELCOME_SCREEN);
            }}
          >
            {t('startBloobirds')}
          </Button>
        </div>
      </div>
    </div>
  );
};
