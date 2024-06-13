import {
  MULTIPICKLIST_FILTERS,
  RELATIVE_DATES_OPTIONS,
  USER_GLOBAL_PICKLIST,
} from './viewEdition.constants';

export const wrapValues = value => {
  if (value === undefined || value === null || value === '') {
    return [];
  }
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
};

const getMultiPicklistValue = (value, field) => {
  const values = wrapValues(value.value);
  const length = value.value.length;
  const totalCount = USER_GLOBAL_PICKLIST.includes(field.logicRole)
    ? field.fieldValues.length + 1
    : field.fieldValues.length;
  const texts = values.map(v =>
    v === '__me__'
      ? 'Me'
      : field.fieldValues?.find(picklistValue => picklistValue.value === v)?.label,
  );
  if (length === 0) return '';
  if (length === 1) return texts[0];
  if (length === totalCount) return 'All selected';
  return `${texts[length - 1]} and ${length - 1} other`;
};

export const renderDisplayValue = (value, field) => {
  if (!value || !value.type) {
    return '';
  }
  if (value.type && !value.value) {
    return MULTIPICKLIST_FILTERS[value.type];
  }
  if (value.type === 'EXACT__SEARCH') {
    return `${MULTIPICKLIST_FILTERS[value?.type]} ${getMultiPicklistValue(value, field)}`;
  }
  if (value.type === 'RANGE__SEARCH__BETWEEN__DATES') {
    if (value.value.type === 'custom') {
      return `From ${value.value.start} to ${value.value.end}`;
    }
    return RELATIVE_DATES_OPTIONS[value.value.type];
  }
  return `${MULTIPICKLIST_FILTERS[value?.type]} ${
    value?.value === '__me__'
      ? 'Me'
      : field.fieldValues?.find(picklistValue => picklistValue.value === value.value)?.label
  }`;
};
