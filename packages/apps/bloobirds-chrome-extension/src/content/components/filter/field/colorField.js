import React from 'react';

import { Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './colorField.module.css';

//TODO extract and eliminate duplicate
export const ColorField = ({ content, color, tooltip }) => {
  if (content !== undefined && content !== null && content !== '') {
    return (
      <Tooltip title={tooltip || content} position="top">
        <div className={styles.field}>
          <span className={styles.fieldCircle} style={{ backgroundColor: color }} />
          <div className={styles.fieldContent}>{content}</div>
        </div>
      </Tooltip>
    );
  }
  return <span />;
};

export const BobjectFieldColorField = props => {
  const { field } = { ...props };
  const content = field.text ? field.text : field.value;
  const color = field.valueBackgroundColor ? field.valueBackgroundColor : field.backgroundColor;
  const tooltip = field.label ? `${field.label}: ${field.text}` : field.valueWithField;

  return <ColorField content={content} tooltip={tooltip} color={color} />;
};
