import React from 'react';

import { ColorType, Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './kpiPanelItem.module.css';

type StatItemProps = {
  value: number;
  tooltip: string;
  valueIsPercentage?: boolean;
  icon: string;
  iconColor: string;
};

const KpiPanelItem = ({ icon, iconColor, tooltip, value, valueIsPercentage }: StatItemProps) => {
  return (
    <div className={styles._stat_item}>
      <div className={styles._stat_content}></div>
      <Tooltip title={tooltip} position="bottom">
        <Icon name={icon as IconType} color={iconColor as ColorType} />
        <Text size="l" color="peanut">
          {value}
          {valueIsPercentage && '%'}
        </Text>
      </Tooltip>
    </div>
  );
};

export default KpiPanelItem;
