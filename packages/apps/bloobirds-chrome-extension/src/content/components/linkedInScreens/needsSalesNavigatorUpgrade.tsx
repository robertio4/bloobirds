import { useTranslation } from 'react-i18next';

import { Text, Button } from '@bloobirds-it/flamingo-ui';

import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.salesNavUpgrade' });
  const openSalesNavigatorAccountUpgrade = () => {
    window.open('https://www.linkedin.com/premium/switcher/sales/', '_blank');
  };

  return (
    <BubbleWindow>
      <BubbleWindowHeader name="alertTriangle" color="banana" backgroundColor="verySoftBanana" />
      <BubbleWindowContent className={styles._textWrapper}>
        <Text align="center" className={styles.title}>
          {t('title')}
        </Text>
        <Text align="center" color="gray" size="m">
          {t('needToUpgrade')}
        </Text>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button onClick={openSalesNavigatorAccountUpgrade} expand>
          {t('title')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
};
