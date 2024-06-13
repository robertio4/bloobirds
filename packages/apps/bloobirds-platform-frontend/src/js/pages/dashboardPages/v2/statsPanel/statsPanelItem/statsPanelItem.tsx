import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './statsPanelItem.module.css';

type StatItemProps = {
  name: string;
  value: number;
  percentage: number;
  shouldHavePercentage?: boolean;
  valueIsPercentage?: boolean;
};

const StatsPanelItem = ({
  name,
  value,
  valueIsPercentage,
  shouldHavePercentage = true,
  percentage,
}: StatItemProps) => {
  const parsePercentage =
    percentage &&
    Math.abs(percentage)
      .toFixed(1)
      .replace(/(\.0+|0+)$/, '');
  const isPositivePercentage = percentage > 0;
  const isNegativePercentage = percentage < 0;
  const getColorName = () => {
    if (!parsePercentage) {
      return 'softPeanut';
    }
    return isPositivePercentage ? 'grape' : isNegativePercentage ? 'tomato' : 'softPeanut';
  };
  const getIconName = () => {
    if (!parsePercentage) {
      return 'minus';
    }
    return isPositivePercentage ? 'chevronUp' : 'chevronDown';
  };

  return (
    <div className={styles._stat_item}>
      <Text color="softPeanut" size="xs" uppercase className={styles._stat_title}>
        {name}
      </Text>
      <div className={styles._stat_content}>
        <Text size="xxxl">
          {value}
          {valueIsPercentage && '%'}
        </Text>
        <div>
          <div className={styles._stat_percentage}>
            {shouldHavePercentage && <Icon name={getIconName()} size={16} color={getColorName()} />}
            {!!parsePercentage && (
              <Text size="s" color={getColorName()}>
                {parsePercentage}%
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanelItem;
