import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

import styles from '../bulkActionsPanel.module.css';

const TotalResultsBanner = ({ totalMatching }: { totalMatching: number }) => {
  const { t } = useTranslation();

  return (
    <>
      {typeof totalMatching === 'number' && (
        <div className={styles.totalMatching}>
          <div className={styles.totalCounter}>
            <Text size="xs" align="center" color="softPeanut">
              {t('leftBar.bulk.results', { count: totalMatching })}
            </Text>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalResultsBanner;
