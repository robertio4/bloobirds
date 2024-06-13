import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import styles from './styles.module.css';

interface UpdatedLeadWindowProps {
  leadUrl: string;
}

export default function UpdatedLeadWindow({ leadUrl }: UpdatedLeadWindowProps) {
  const { t } = useTranslation();
  const onClick = () => {
    window.open(leadUrl, '_blank');
  };

  return (
    <BubbleWindow>
      <BubbleWindowHeader color="bloobirds" backgroundColor="lightBloobirds" name="person" />
      <BubbleWindowContent className={styles._textWrapper}>
        <Text align="center" className={styles.title}>
          {t('sidePeek.updateLeadWindow.title')}
        </Text>
        <Text align="center" color="gray" size="m">
          {t('sidePeek.updateLeadWindow.viewInBloobirdsQuestion')}
        </Text>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button onClick={onClick} expand>
          {t('sidePeek.updateLeadWindow.viewInBloobirds')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
}
