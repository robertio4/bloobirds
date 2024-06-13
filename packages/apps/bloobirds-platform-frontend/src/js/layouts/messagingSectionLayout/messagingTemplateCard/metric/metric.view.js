import React from 'react';
import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import styles from './metric.module.css';

const METRIC_INFO = {
  OPENED_RATE: {
    icon: 'eye',
    tooltip: 'Open rate',
  },
  CLICKED_RATE: {
    icon: 'cursorClickOutline',
    tooltip: 'Click rate',
  },
  REPLIED_RATE: {
    icon: 'reply',
    tooltip: 'Reply rate',
  },
  USED_COUNT: {
    icon: 'mailCompleted',
    tooltip: 'Times delivered',
  },
};

const Metric = ({ name, value }) => (
  <Tooltip title={METRIC_INFO[name].tooltip}>
    <div className={styles._statistics_item}>
      <Icon name={METRIC_INFO[name].icon} size={16} color="purple" />
      <Text size="xs" color="purple">
        {name.includes('RATE') ? Math.min(parseInt(value * 100, 10), 100) + '%' : value}
      </Text>
    </div>
  </Tooltip>
);

export default Metric;
