import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import SomethingWentWrong from '../../../assets/somethingWentWrong.png';
import { useRouter } from '../../hooks';
import styles from './somethingWentWrongPage.module.css';

const SomethingWentWrongPage = () => {
  const { history } = useRouter();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img height="200px" src={SomethingWentWrong} alt="svg" />
        <Text size="xxl" color="darkGray" weight="bold">
          {t('common.somethingWentWrong')}
        </Text>
        <Text size="xl" color="darkGray">
          {t('common.somethingWentWrongDescription')}
        </Text>
        <Button iconLeft="arrowLeft" onClick={() => history.goBack()}>
          {t('common.goSafety')}
        </Button>
      </div>
    </div>
  );
};

export default SomethingWentWrongPage;
