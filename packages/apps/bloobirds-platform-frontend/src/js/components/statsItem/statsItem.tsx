import React from 'react';
import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import styles from './statsItem.module.css';
import { parseAmount, shortenAmount } from '../../utils/amount.utils';
import { useEntity } from '../../hooks';

export const StatsItem = ({
  name,
  value,
  type = 'NUMBER',
  shouldHavePercentage,
  // This is used when less data is positive
  isNegativeAsPositive,
  percentage,
  size,
  options = {
    centered: false,
  },
}: {
  name: string;
  value: number;
  type?: 'CURRENCY' | 'NUMBER';
  percentage?: number;
  shouldHavePercentage?: boolean;
  isNegativeAsPositive?: boolean;
  options?: {
    centered: boolean;
  };
  size?: 'small' | 'medium';
}) => {
  const bobjectFields = useEntity('bobjectFields');
  const isTypeCurrency = type === 'CURRENCY';
  const amountFieldPrefix = bobjectFields?.findByLogicRole('OPPORTUNITY__AMOUNT')
    ?.layoutNumberPrefix;
  const parsePercentage =
    percentage &&
    Math.abs(percentage)
      .toFixed(1)
      .replace(/(\.0+|0+)$/, '');
  const isSmall = size === 'small';
  const isPositivePercentage = isNegativeAsPositive ? percentage < 0 : percentage > 0;
  const getColorName = () => {
    if (!parsePercentage) {
      return 'softPeanut';
    }

    return isPositivePercentage ? 'grape' : 'tomato';
  };
  const getIconName = () => {
    if (!parsePercentage) {
      return 'minus';
    }
    if (isNegativeAsPositive) {
      return !isPositivePercentage ? 'chevronUp' : 'chevronDown';
    }
    return isPositivePercentage ? 'chevronUp' : 'chevronDown';
  };

  return (
    <div
      className={classNames({
        [styles._stat_item]: size === 'medium',
        [styles.centered_item]: options?.centered,
        [styles._stat_small]: isSmall,
      })}
    >
      <Text color="softPeanut" size="xs" uppercase className={styles._stat_title}>
        {name}
      </Text>
      <div
        className={classNames({
          [styles._stat_content]: size === 'medium',
          [styles._stat_content_small]: isSmall,
        })}
      >
        <div className={styles._stat_currency_symbol}>
          <Text size="xxl">{isTypeCurrency ? `${amountFieldPrefix} ` : ''}</Text>
        </div>
        <Text size="xxxl">
          {isTypeCurrency ? ` ${shortenAmount(value, 2)}` : parseAmount(value, 0)}
        </Text>
        <div>
          <div className={styles._stat_percentage}>
            {shouldHavePercentage && <Icon name={getIconName()} size={16} color={getColorName()} />}
            {!!parsePercentage && (
              <Tooltip title={isSmall && 'vs previous period'} position="top">
                <Text size="xs" color={getColorName()}>
                  {parsePercentage}%
                </Text>
              </Tooltip>
            )}
          </div>
          {!!parsePercentage && !isSmall && (
            <div className={styles._stat_text}>
              <Text size="xxs" color="softPeanut">
                vs previous period{' '}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StatsItem.defaultProps = {
  size: 'medium',
  shouldHavePercentage: true,
  isNegativeAsPositive: false,
};
