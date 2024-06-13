import React from 'react';

import { Label } from '@bloobirds-it/flamingo-ui';

import { bobjectModel } from '../../../misc/model/bobjectFieldsModel';
import styles from './pill.module.css';

export const Pill = props => {
  const { content, textColor, backgroundColor, fontWeight } = { ...props };
  const borderColor = props.borderColor === undefined ? backgroundColor : props.borderColor;
  if (content === undefined || content === '' || content === null) {
    return <React.Fragment />;
  }
  return (
    <div
      className={styles.pill}
      style={{
        backgroundColor,
        color: textColor,
        borderColor,
        fontWeight,
      }}
    >
      {content}
    </div>
  );
};

export const BobjectFieldPill = ({ field }) => {
  const content = field.text;
  const backgroundColor = field.valueBackgroundColor;
  const color = field.valueTextColor;
  const borderColor = field.valueOutlineColor;
  if (content) {
    return (
      <Label
        dataTest={`${field.text}`}
        overrideStyle={{
          backgroundColor,
          color,
          borderColor,
        }}
      >
        {content}
      </Label>
    );
  }
  return <></>;
};

export const BobjectPill = props => {
  const { bobject, fieldDescriptor } = { ...props };
  const model = bobjectModel(bobject);
  const field = model.find(fieldDescriptor);
  return field.text ? <BobjectFieldPill field={field} /> : <></>;
};
