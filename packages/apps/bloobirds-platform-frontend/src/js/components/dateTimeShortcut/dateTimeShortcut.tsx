import { Text } from '@bloobirds-it/flamingo-ui';
import * as React from 'react';
import spacetime from 'spacetime';
import styles from './dateTimeShortcut.module.css';

interface DateTimeShortcutProps {
  text: string;
  date: Date;
  timezone: string;
  onClick: (date: Date) => void | Promise<void>;
  format?: string;
}

export const DateTimeShortcut = ({
  text,
  timezone,
  date,
  onClick,
  format = '{date-ordinal} {month-short}, {time-24}',
}: DateTimeShortcutProps) => {
  return (
    <div role="button" className={styles.button} onClick={() => onClick(date)}>
      <Text color="peanut" size="s">
        {text}
      </Text>
      <Text color="bloobirds" size="s">
        {spacetime(date).goto(timezone).format(format)}
      </Text>
    </div>
  );
};
