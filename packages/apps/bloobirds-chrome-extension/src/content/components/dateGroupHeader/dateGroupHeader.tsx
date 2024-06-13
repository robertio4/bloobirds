import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { BobjectWithDate } from '@bloobirds-it/types';

import styles from './dateGroupHeader.module.css';

export const DateGroupHeader = ({
  bobject,
  small,
}: {
  bobject: BobjectWithDate;
  small?: boolean;
}) => {
  const date = bobject.taskDate || bobject.activityDate || bobject.date;

  return (
    <header className={styles._header} id={date.hashDate}>
      {!small && (
        <Icon className={styles._header_icon} name={'calendar'} color={'lightPeanut'} size={16} />
      )}
      {date?.prefix && (
        <Text color="peanut" weight="medium" size="xs" inline>
          {date.prefix}
        </Text>
      )}
      {date?.formattedDate && (
        <Text color="softPeanut" size="xs" inline>
          {date.formattedDate}
        </Text>
      )}
    </header>
  );
};

export const DateGroupHeaderText = ({ text }: { text: string }) => (
  <header>
    <Text color="softPeanut" weight="medium" size="xs" inline className={styles.heading_text}>
      {text}
    </Text>
  </header>
);
