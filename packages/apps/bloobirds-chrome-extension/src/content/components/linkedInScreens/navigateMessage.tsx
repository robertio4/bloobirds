import { useTranslation } from 'react-i18next';

import { Text, Button } from '@bloobirds-it/flamingo-ui';

import { isSalesNavigatorPage } from '../../../utils/url';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const currentPage = window.location.href;
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.navigateToProfileScreen' });

  const onClick = () => {
    if (isSalesNavigatorPage(currentPage)) {
      window.location.href =
        'https://www.linkedin.com/sales/people/ACoAAAAXlqkB5KpvOFPAIdD7o-AsA3KQzzACplU,name,Uqkq';
    } else {
      window.location.href = 'https://linkedin.com/in/tonipereznavarro';
    }
  };

  return (
    <BubbleWindow>
      <BubbleWindowHeader color="bloobirds" backgroundColor="lightBloobirds" name="person" />
      <BubbleWindowContent className={styles._textWrapper}>
        <Text align="center" dataTest="navigate-profile" className={styles.title}>
          👉 {t('tryProfile')}
        </Text>
        <Text align="center" color="gray" size="m">
          {t('captureInfo')}
        </Text>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button onClick={onClick} expand>
          {t('viewExample')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
};
