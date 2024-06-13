import React from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner, Text } from '@bloobirds-it/flamingo-ui';

import UndoToast from '../../components/undoToast/undoToast';
import { useUserSettings } from '../../components/userPermissions/hooks';
import { useDocumentTitle } from '../../hooks';
import styles from './homePage.module.css';
import { useUserHomepageSettings } from './hooks/useUserHomepageSettings';
import { CenterContent } from './pages/centerContent/centerContent';
import LeftContent from './pages/leftContent/leftContent';
import { RightContent } from './pages/rightContent/rightContent';

export const HomePage = () => {
  const settings = useUserSettings();
  const username = settings?.user?.name;
  const { availableSettings, userSettings } = useUserHomepageSettings();
  const { t } = useTranslation();
  const title = t('home.title', { userName: username });
  useDocumentTitle(title);

  return (
    <div className={styles.home__container}>
      <div className={styles.title__container}>
        <Text size="xl">{title}</Text>
      </div>
      <div className={styles.content__container}>
        {availableSettings && userSettings ? (
          <>
            <LeftContent />
            <CenterContent />
            <RightContent />
          </>
        ) : (
          <div className={styles.spinnerDots}>
            <Spinner name="dots" size={50} />
          </div>
        )}
      </div>
      <UndoToast />
    </div>
  );
};
