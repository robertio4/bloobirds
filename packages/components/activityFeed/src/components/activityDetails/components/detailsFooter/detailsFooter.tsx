import React from 'react';

import { ColorType } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from './detailsFooter.module.css';

export const DetailsFooter = ({
  children,
  color,
  withPadding = true,
}: {
  children: JSX.Element;
  color?: ColorType;
  withPadding?: boolean;
}) => {
  const multipleButtons = React.Children.count(children) > 1;
  const forcedBackgroundColor = color ? `var(--${color})` : '';
  return (
    <div
      className={clsx(styles.footerContainer, {
        [styles.multipleButtons]: multipleButtons,
        [styles.withPadding]: withPadding,
      })}
      style={{ background: forcedBackgroundColor }}
    >
      {children}
    </div>
  );
};
