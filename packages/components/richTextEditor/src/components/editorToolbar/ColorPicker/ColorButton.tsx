import React, { ReactNode } from 'react';

import { Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from './ColorPicker.module.css';

type ColorButtonProps = {
  name?: string;
  value: string;
  isBrightColor: boolean;
  isSelected: boolean;
  selectedIcon: ReactNode;
  updateColor: (color: string) => void;
};

export const ColorButton = ({
  name,
  value,
  isBrightColor,
  isSelected,
  selectedIcon,
  updateColor,
}: ColorButtonProps) => {
  const classes = clsx(styles.colorButton, {
    [styles.colorButtonBright]: !isBrightColor,
  });

  const content = (
    <button
      data-testid="ColorButton"
      type="button"
      aria-label={name}
      name={name}
      onClick={() => updateColor(value)}
      className={classes}
      style={{ backgroundColor: value }}
    >
      {isSelected ? selectedIcon : null}
    </button>
  );

  return name ? (
    <Tooltip title={name} position="top">
      {content}
    </Tooltip>
  ) : (
    content
  );
};
