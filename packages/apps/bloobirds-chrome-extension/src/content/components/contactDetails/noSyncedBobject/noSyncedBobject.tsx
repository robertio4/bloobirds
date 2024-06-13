import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

import styles from './noSyncedBobject.module.css';

export const NoSyncedBobject = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.message}>
        <Text size="s" color="peanut" weight="bold">
          {t('sidePeek.overview.fields.noSfdcFields')}
        </Text>
      </div>
    </>
  );
};
