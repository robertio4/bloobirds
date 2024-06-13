import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'extension.salesforcePages.navigateMessageSalesforce',
  });

  return (
    <BubbleWindow>
      <BubbleWindowHeader color="bloobirds" backgroundColor="lightBloobirds" name="person" />
      <BubbleWindowContent className={styles._textWrapper}>
        <Text align="center" dataTest="navigate-profile" className={styles.title}>
          {t('tryNavigating')}
        </Text>
        <Text align="center" color="gray" size="m">
          {t('extraInfo')}
        </Text>
      </BubbleWindowContent>
    </BubbleWindow>
  );
};
