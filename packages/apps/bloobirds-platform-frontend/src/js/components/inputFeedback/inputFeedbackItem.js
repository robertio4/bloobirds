import React from 'react';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import styles from './inputFeedback.module.css';

export const InputFeedbackItem = ({ valid, children }) => (
  <li className={styles.item}>
    <Icon size={16} name="statusCircle" color={valid ? 'melon' : 'verySoftPeanut'} />
    <Text size="xs" color="softPeanut">
      {children}
    </Text>
  </li>
);
