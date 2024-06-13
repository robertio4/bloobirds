import React from 'react';
import { bobjectModel } from '../../../misc/model/bobjectFieldsModel';
import { makeUrl } from '../../../misc/utils';
import { format, formatDistance, isBefore } from 'date-fns';
import Numeral from 'numeral';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import classNames from 'clsx';
import { getTimezone } from '../../../constants/countryToTimeZone';
import { Icon, Tooltip } from '@bloobirds-it/flamingo-ui';
import styles from './field.module.css';

const dateFormated = date => {
  if (date.indexOf('T') > 0) {
    return `${date
      .split('T')[0]
      .split('-')
      .map(x => {
        if (x.length <= 1) {
          return (x = `0${x}`);
        }
        return x;
      })
      .join('-')}T${date
      .split('T')[1]
      .split(':')
      .map(x => {
        if (x.length <= 1) {
          return (x = `0${x}`);
        }
        return x;
      })
      .join(':')}`;
  }
  return date
    .split('-')
    .map(x => {
      if (x.length <= 1) {
        return (x = `0${x}`);
      }
      return x;
    })
    .join('-');
};

const Field = props => {
  const { content, icon, tooltip, isUrl = false, isMultiline = false } = { ...props };
  const hasContent = content !== undefined && content !== null && content !== '';
  return (
    <Tooltip title={tooltip} position="top">
      <div
        className={classNames({
          [styles.field]: true,
          [styles.fixedHeightField]: !isMultiline,
        })}
      >
        <Icon name={icon} color="softPeanut" />
        {!hasContent && <div className={styles.fieldContent}>-</div>}
        {!isUrl && hasContent && (
          <div
            className={classNames({
              [styles.fieldContent]: true,
              [styles.fieldContentEllipsis]: !isMultiline,
            })}
          >
            {content}
          </div>
        )}
        {isUrl && hasContent && (
          <a
            href={makeUrl(content)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fieldContent}
          >
            <p className={styles.fieldContentUrl}>{content}</p>
          </a>
        )}
      </div>
    </Tooltip>
  );
};

const DateText = props => {
  const { absoluteFormat, relative, date } = { ...props };
  if (date === null || date === undefined || date === '') {
    return '';
  }

  const absoluteDate = format(new Date(dateFormated(date)), absoluteFormat || 'PPP');
  let dateText;
  if (date !== undefined) {
    if (isBefore(new Date(dateFormated(date)), new Date())) {
      dateText = `${formatDistance(new Date(dateFormated(date)), new Date())} ago`;
    } else {
      dateText = `${formatDistance(new Date(dateFormated(date)), new Date())} from now`;
    }
  }
  const content = relative ? dateText : absoluteDate;
  return (
    <Tooltip title={dateText} position="top">
      <span>{content}</span>
    </Tooltip>
  );
};

export const DateTextField = ({ field }) => (
  <DateText
    date={field.text}
    absoluteFormat={field.dateFormatAbsolute}
    relative={field.dateFormatType === 'RELATIVE'}
  />
);

const addPrefixOrSuffix = (isPrefix, ext) => {
  if (isPrefix) {
    return ext ? `${ext} ` : '';
  }
  return ext ? ` ${ext}` : '';
};

const formatNumber = (number, desiredFormat) => Numeral(number).format(desiredFormat || '0,0');

export const NumberTextField = ({ field }) => (
  <span>
    {`${addPrefixOrSuffix(true, field.numberPrefix)}
      ${formatNumber(field.text, field.numberFormat)}
      ${addPrefixOrSuffix(false, field.numberSuffix)}`}
  </span>
);

export const PhoneTextField = ({ field }) => {
  if (field.text !== undefined && field.text !== null) {
    let value = field.text;
    const phoneNumber = parsePhoneNumberFromString(field.text);
    if (phoneNumber !== undefined) {
      value = phoneNumber.formatInternational();
    }
    return <span>{value}</span>;
  }
  return '';
};

export const BobjectField = props => {
  const { bobject, fieldDescriptor, field, textProcessor, multiline = false } = { ...props };
  const resolvedField = field !== undefined ? field : bobjectModel(bobject).find(fieldDescriptor);
  let content = resolvedField.text;
  let tooltipContent;
  if (textProcessor) {
    content = textProcessor(content);
  } else {
    if (resolvedField.type === 'DATETIME' || resolvedField.type === 'DATE') {
      content = <DateTextField field={resolvedField} />;
    }
    if (resolvedField.type === 'NUMBER') {
      content = <NumberTextField field={field} />;
    }
    if (resolvedField.type === 'PHONE') {
      content = <PhoneTextField field={field} />;
    }
    if (resolvedField.logicRole === 'COMPANY__COUNTRY') {
      const timezone = getTimezone(resolvedField.text);
      if (timezone) {
        tooltipContent = `${content} (${timezone})`;
      }
    }
  }
  const icon = resolvedField.icon;
  const tooltip = `${resolvedField.label}: ${tooltipContent || content || '-'}`;
  const isUrl = resolvedField.type === 'URL';
  return (
    <Field content={content} tooltip={tooltip} icon={icon} isUrl={isUrl} isMultiline={multiline} />
  );
};
