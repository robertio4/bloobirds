import React from 'react';
import { CheckItem, MultiSelect } from '@bloobirds-it/flamingo-ui';

const wrapValues = value => {
  if (value === undefined || value === null) {
    return [];
  }
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
};

export const MultiSelectInput = props => {
  const { field, value, onChange } = props;
  const values = wrapValues(value);
  return (
    <MultiSelect
      width="100%"
      value={values}
      dataTest={`menu-category-${field.label}`}
      onChange={onChange}
      placeholder={field.label}
      autocomplete={field?.fieldValues?.length > 8}
      size="medium"
    >
      {field.fieldValues.map(option => (
        <CheckItem
          value={option.value}
          dataTest={`menu-item-${option.label}`}
          key={`menu-item-${option.value}`}
        >
          {option.label}
        </CheckItem>
      ))}
    </MultiSelect>
  );
};
