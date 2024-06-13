import React from 'react';

import { ColorType, Label, Text } from '@bloobirds-it/flamingo-ui';
import { colors } from '@bloobirds-it/utils';

import styles from './statusLabel.module.css';

type StatusLabelProps = {
  backgroundColor?: ColorType | string;
  textColor?: ColorType | string;
  maxWidth?: string;
  logicRole?: string;
  key?: string;
  name?: string;
  showColor?: boolean;
  onClick?: () => void;
};

export const StatusLabel = ({
  backgroundColor = colors.peanut,
  textColor = 'white',
  maxWidth = 'auto',
  logicRole = '',
  key = '',
  name = 'unknown',
  showColor = true,
  onClick,
}: StatusLabelProps) => {
  const style = {
    backgroundColor: backgroundColor,
    borderColor: backgroundColor,
    color: textColor,
    maxWidth: maxWidth,
  };
  return (
    <div className={styles._status_wrapper} key={`status-${name}`}>
      <Label
        value={logicRole}
        dataTest={logicRole ?? 'status'}
        align="center"
        inline={false}
        key={`status-${key ? key : name}`}
        onClick={onClick}
        selected={showColor}
        hoverStyle={style}
        overrideStyle={{ width: '100%', boxSizing: 'border-box' }}
        {...(showColor ? { selectedStyle: style } : {})}
      >
        <Text
          htmlTag="span"
          color={textColor as ColorType}
          size="s"
          className={styles._status_text}
        >
          {name}
        </Text>
      </Label>
    </div>
  );
};
