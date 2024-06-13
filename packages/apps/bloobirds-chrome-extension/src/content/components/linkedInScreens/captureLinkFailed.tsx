import { useTranslation } from 'react-i18next';

import { Text, Button } from '@bloobirds-it/flamingo-ui';

import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import styles from './styles.module.css';

interface CaptureLinkFailed {
  onRefresh: () => void;
}

export default (props: CaptureLinkFailed): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.captureLinkFailed' });
  const { onRefresh } = props;

  return (
    <BubbleWindow>
      <BubbleWindowHeader name="alertTriangle" color="banana" backgroundColor="verySoftBanana" />
      <BubbleWindowContent className={styles._textWrapper}>
        <Text align="center" className={styles.title}>
          {t('title')}
        </Text>
        <Text align="center" color="gray" size="m">
          {t('errorDescription')}
        </Text>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button onClick={onRefresh} expand>
          {t('retryAutomatically')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
};
