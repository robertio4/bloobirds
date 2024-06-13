import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './metric.module.css';

const METRIC_INFO = {
  OPENED_RATE: {
    icon: 'eye',
    key: 'metrics.openRate',
  },
  CLICKED_RATE: {
    icon: 'cursorClickOutline',
    key: 'metrics.clickRate',
  },
  REPLIED_RATE: {
    icon: 'reply',
    key: 'metrics.replyRate',
  },
  USED_COUNT: {
    icon: 'mailCompleted',
    key: 'metrics.timesDelivered',
  },
};

interface MetricProps {
  name: string;
  value: number;
}

const Metric = ({ name, value }: MetricProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'extendedScreen.templateDetail' });

  return (
    <Tooltip title={t(METRIC_INFO[name].key)} position="bottom">
      <div className={styles._statistics_item}>
        <Icon name={METRIC_INFO[name].icon} size={18} color="purple" />
        <Text size="s" color="purple">
          {name.includes('RATE')
            ? Math.min(parseInt((value * 10).toString(), 10), 100) + '%'
            : value}
        </Text>
      </div>
    </Tooltip>
  );
};

export default Metric;
