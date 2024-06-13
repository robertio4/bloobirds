import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

import Eyes from '../assets/eyes.png';
import styles from './ExpiredLink.module.css';

export default function ExpiredLink() {
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler.expired' });

  return (
    <div id="expired-page" className={styles.container}>
      <div>
        <img src={Eyes} width={38} alt={t('title')} />
      </div>
      <div>
        <Text size="l" weight={'bold'}>
          {t('title')}
        </Text>
      </div>
      <div>
        <Text size="l">{t('subtitle')}</Text>
      </div>
    </div>
  );
}
