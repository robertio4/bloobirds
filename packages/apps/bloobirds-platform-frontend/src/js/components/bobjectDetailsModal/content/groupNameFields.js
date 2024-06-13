import React from 'react';
import clsx from 'clsx';
import {
  BobjectField,
  DateTextField,
  NumberTextField,
  PhoneTextField,
} from '../../filter/field/field';
import { makeUrl } from '../../../misc/utils';
import styles from './content.module.css';

const getContent = field => {
  if (field.type === 'DATE' || field.type === 'DATETIME') {
    return <DateTextField field={field} />;
  }
  if (field.type === 'PHONE') {
    return <PhoneTextField field={field} />;
  }
  if (field.type === 'NUMBER') {
    return <NumberTextField field={field} />;
  }
  return field.text;
};

export const FieldLabelText = ({ field }) => {
  const hasContent = field.text !== undefined && field.text !== null && field.text !== '';
  const text = getContent(field);
  return (
    <div className={styles.fieldLinkContainer}>
      <span className={styles.fieldLinkTitle}>{field.label}</span>
      {hasContent && field.type === 'URL' && (
        <a target="_blank" rel="noopener noreferrer" href={makeUrl(field.text)}>
          {text}
        </a>
      )}
      {hasContent && field.type !== 'URL' && (
        <div className={clsx({ [styles.emailText]: field.type === 'EMAIL' })}>{text}</div>
      )}
      {!hasContent && <span>-</span>}
    </div>
  );
};

export const FieldTextLabel = ({ field }) => {
  const hasContent = field.text !== undefined && field.text !== null && field.text !== '';
  const text = getContent(field);
  return (
    <div>
      <div
        className={styles.hexagon}
        style={{ color: field.valueTextColor, backgroundColor: field.valueBackgroundColor }}
      >
        {hasContent && <span>{text}</span>}
        {!hasContent && <span>-</span>}
      </div>
      <div className={styles.labelValue}>{field.label}</div>
    </div>
  );
};

export const FieldIconText = ({ field }) => (
  <div>
    <BobjectField className={styles.fieldText} field={field} multiline />
  </div>
);
