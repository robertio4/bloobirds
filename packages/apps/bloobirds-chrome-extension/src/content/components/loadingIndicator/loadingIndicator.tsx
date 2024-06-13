import { Spinner } from '@bloobirds-it/flamingo-ui';

import { BubbleWindow, BubbleWindowContent } from '../bubbleWindow/bubbleWindow';
import styles from './loadingIndicator.module.css';

const LoadingIndicator = () => (
  <BubbleWindow>
    <BubbleWindowContent className={styles.wrapper}>
      <Spinner color="darkBloobirds" name="loadingCircle" size={24} />
    </BubbleWindowContent>
  </BubbleWindow>
);

export default LoadingIndicator;
