import { Text, Button } from '@bloobirds-it/flamingo-ui';

import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import styles from './styles.module.css';

interface AlreadySavedMessageProps {
  leadUrl: string;
}

/**
 * @deprecated no longer in use
 */
export default (props: AlreadySavedMessageProps): JSX.Element => {
  const { leadUrl } = props;

  const onClick = () => {
    window.open(leadUrl, '_blank');
  };

  return (
    <BubbleWindow>
      <BubbleWindowHeader color="bloobirds" backgroundColor="lightBloobirds" name="person" />
      <BubbleWindowContent className={styles._textWrapper}>
        <Text align="center" className={styles.title}>
          A lead with this LinkedIn URL already exists
        </Text>
        <Text align="center" color="gray" size="m">
          Do you want to view the lead in Bloobirds?
        </Text>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button onClick={onClick} expand>
          View lead in bloobirds
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
};
