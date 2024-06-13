import React from 'react';

import { Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './tagMetric.module.css';

export const TagMetric = ({
  value,
  color,
  title,
}: {
  value: number;
  color: string;
  title?: string | null;
}) => {
  const backgroundColor = color;
  const valueLength = value.toString().length;
  const getSize = () => {
    switch (true) {
      case valueLength <= 3:
        return 'xxl';
      case valueLength === 4:
        return 'xl';
      case valueLength >= 5:
        return 'm';
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.metric} style={{ backgroundColor: backgroundColor }}>
        <Text htmlTag="span" size={getSize()} align="center" color="white" weight="bold">
          {value}
        </Text>
      </div>
      {title && (
        <Tooltip title={title} position="bottom">
          <Text color="softPeanut" size="xs" className={styles.title}>
            {title}
          </Text>
        </Tooltip>
      )}
    </div>
  );
};
