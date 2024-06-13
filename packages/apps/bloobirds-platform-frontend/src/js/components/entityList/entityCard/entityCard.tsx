import React, { ForwardedRef, forwardRef } from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';
import { a, useTrail } from '@react-spring/web';
import classnames from 'clsx';
import PropTypes from 'prop-types';

import styles from './entityCard.module.css';

export const AnimatedCardGroup = ({
  className,
  children,
  isSuggestion,
  ...props
}: {
  className?: any;
  children: JSX.Element | JSX.Element[];
  isSuggestion?: boolean;
}) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    x: 0,
    height: 110,
    from: { opacity: 0, x: 20, height: 0 },
    leave: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <>
      {trail.map(({ height, ...style }, index) => (
        <a.tr
          key={index}
          style={style}
          className={classnames(
            className,
            styles._entity__row,
            isSuggestion ? styles._suggestion_row : undefined,
          )}
          {...props}
        >
          {items[index]}
        </a.tr>
      ))}
    </>
  );
};

export const EntityCard = React.forwardRef(
  (
    {
      className,
      children,
      isSuggestion,
      ...props
    }: {
      className?: any;
      children: JSX.Element | JSX.Element[];
      isSuggestion?: boolean;
    },
    ref: ForwardedRef<HTMLTableRowElement>,
  ) => (
    <tr
      className={classnames(
        className,
        styles._entity__row,
        isSuggestion ? styles._suggestion_row : undefined,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </tr>
  ),
);

type EntityHeaderItemProps = {
  className?: any;
  children: any;
  ellipsis?: number;
  size?: string;
  wrap?: boolean;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  error?: string;
};

export const EntityCardItem = forwardRef(
  (
    {
      className,
      children,
      ellipsis,
      size,
      wrap,
      align = 'left',
      bold,
      error,
    }: EntityHeaderItemProps,
    ref: ForwardedRef<HTMLTableCellElement>,
  ) => {
    const isString = React.Children?.toArray(children)?.every(child => typeof child === 'string');
    return (
      <td ref={ref} className={classnames(className, styles[`_card__cell_${size}`])}>
        {isString ? (
          <Text
            inline
            size="s"
            color="peanut"
            weight={bold ? 'bold' : 'regular'}
            ellipsis={ellipsis}
          >
            {children}
          </Text>
        ) : (
          <div
            className={classnames(styles._card__item, {
              [styles._card__item__wrap]: wrap,
              [styles._card__cell_end]: align === 'right',
              [styles._card__cell_center]: align === 'center',
              [styles._card__error]: error,
            })}
          >
            {children}
            {error && (
              <Text size="xxs" color="tomato">
                {error}
              </Text>
            )}
          </div>
        )}
      </td>
    );
  },
);

EntityCardItem.propTypes = {
  className: PropTypes.string,
  ellipsis: PropTypes.number,
  size: 'small' || 'medium',
  wrap: PropTypes.bool,
};

EntityCardItem.defaultProps = {
  size: 'medium',
  wrap: false,
  flexEnd: false,
};
