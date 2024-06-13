import React from 'react';

import { ColorType, Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import classnames from 'clsx';
import PropTypes from 'prop-types';

import { useHover } from '../../hooks';
import styles from './entityList.module.css';

export const EntityList = ({
  className,
  children,
}: {
  className?: any;
  children: JSX.Element | JSX.Element[];
}) => <table className={classnames(className, styles._cards__table__container)}>{children}</table>;

export const EntityListHeader = ({
  className,
  children,
  lastItemSticky = false,
}: {
  className?: any;
  children: JSX.Element | JSX.Element[];
  lastItemSticky?: boolean;
}) => (
  <thead
    className={classnames(className, styles._header__row, {
      [styles._header__last_sticky]: lastItemSticky,
    })}
  >
    <tr>{children}</tr>
  </thead>
);

export const EntityHeaderItem = ({
  className,
  label,
  canBeSorted = false,
  order,
  onClick,
  align = 'left',
  icon,
  color,
  tooltip,
}: {
  className?: any;
  label?: string;
  canBeSorted?: boolean;
  order?: string;
  onClick?: (x: any) => void;
  align?: 'left' | 'center' | 'right';
  icon?: IconType;
  color?: ColorType;
  tooltip?: string;
}) => {
  // @ts-ignore
  const [ref, isHovered] = useHover();

  return (
    <td
      className={classnames(className, styles._header__cell, {
        [styles._header__clickable]: !!onClick && canBeSorted,
        [styles.header__cell_flexEnd]: align === 'right',
        [styles.header__cell_center]: align === 'center',
      })}
      onClick={canBeSorted ? onClick : () => {}}
      // @ts-ignore
      ref={ref}
    >
      <div className={styles._header__cell_content}>
        {label && (
          <Text inline color="softPeanut" size="s" uppercase>
            {label}{' '}
            {canBeSorted && (
              <Icon
                className={classnames(styles.sort__icon, {
                  [styles._sort_icon_hidden]: !isHovered && !order,
                })}
                name={order === 'DESC' ? 'arrowDown' : 'arrowUp'}
                color="softBloobirds"
                size={16}
              />
            )}
          </Text>
        )}

        {icon && (
          <Tooltip title={tooltip} position="top">
            <Icon name={icon} color={color ?? 'darkBloobirds'} />
          </Tooltip>
        )}
      </div>
    </td>
  );
};

EntityHeaderItem.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};
