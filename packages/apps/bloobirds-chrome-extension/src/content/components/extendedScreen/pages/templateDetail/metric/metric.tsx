import { useTranslation } from 'react-i18next';

import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './metric.module.css';

const METRIC_INFO = {
  OPENED_RATE: {
    icon: 'eye',
    key: 'playbook.templateFormHeader.metrics.openRate',
  },
  CLICKED_RATE: {
    icon: 'cursorClickOutline',
    key: 'playbook.templateFormHeader.metrics.clickRate',
  },
  REPLIED_RATE: {
    icon: 'reply',
    key: 'playbook.templateFormHeader.metrics.replyRate',
  },
  USED_COUNT: {
    icon: 'mailCompleted',
    key: 'playbook.templateFormHeader.metrics.timesDelivered',
  },
};

const Metric = ({ name, value }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t(METRIC_INFO[name].key)} position="bottom">
      <div className={styles._statistics_item}>
        <Icon name={METRIC_INFO[name].icon} size={16} color="purple" />
        <Text size="xs" color="purple">
          {name.includes('RATE') ? Math.min(parseInt(String(value * 100), 10), 100) + '%' : value}
        </Text>
      </div>
    </Tooltip>
  );
};

export default Metric;
