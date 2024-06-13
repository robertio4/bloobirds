import Numeral from 'numeral';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {
  formatDate,
  getDateFormatted,
  isBeforeToday,
  formatDistance,
} from '@bloobirds-it/utils';
import { getFieldsByIds } from '../../../utils/bobjects.utils';

const addPrefixOrSuffix = (isPrefix, ext) => {
  if (!ext) {
    return '';
  }

  return isPrefix ? `${ext} ` : ` ${ext}`;
};

const formatNumber = (number, desiredFormat) => Numeral(number).format(desiredFormat || '0,0');

export const parseNumber = field =>
  `${addPrefixOrSuffix(true, field?.numberPrefix)}
    ${formatNumber(field.text, field?.numberFormat)}
    ${addPrefixOrSuffix(false, field?.numberSuffix)}`;

export const parseDate = field => {
  const { text: date, dateFormatAbsolute: absoluteFormat, dateFormatType } = field;

  if (!date || date === '') {
    return '';
  }

  const formattedDate = date && new Date(getDateFormatted(date));
  const todayDate = new Date();
  const isRelativeDate = dateFormatType === 'RELATIVE';
  let dateText;

  if (isRelativeDate) {
    dateText = `${formatDistance(formattedDate, todayDate)} ${
      isBeforeToday(formattedDate) ? ' ago' : ' from now'
    }`;
  } else {
    dateText = formatDate(new Date(formattedDate), absoluteFormat || 'PPP');
  }

  return dateText;
};

export const parsePhone = field =>
  field?.text ? parsePhoneNumberFromString(field?.text)?.formatInternational() : '';

export const getOtherFields = ({ bobjectType, bobjectFields, bobjectTypes, bobject }) => {
  const bobjectTypeId = bobjectTypes?.findBy('name')(bobjectType)?.id;
  const companyBobjectFields =
    bobjectFields?.filterBy('bobjectType', bobjectTypeId)?.filter(field => field.enabled) || [];
  const visibleBobjectFields = companyBobjectFields
    .filter(field => field?.infoCardShow)
    .sort((a, b) => a.infoCardOrder - b.infoCardOrder);
  const visibleFieldsIds = visibleBobjectFields.map(field => field.id);
  return (
    bobject &&
    getFieldsByIds(bobject, visibleFieldsIds)
      .filter(field => !!field?.value)
      .map(field => ({ ...field, ordering: visibleFieldsIds?.indexOf(field.name) }))
      .sort((a, b) => a.ordering - b.ordering)
  );
};
