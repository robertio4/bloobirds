import React from 'react';

import { Input } from '@bloobirds-it/flamingo-ui';

import { BaseField } from '../baseField/baseField.view';

const BaseNumberField = ({ value, onChange, ...props }) => {
  function handleChange(newValue) {
    if (newValue === '' || newValue === '-' || newValue.match(/^-?[0-9,.]+$/)) {
      // Remove thousands separator
      newValue = newValue.replace(/,/g, '');
      newValue = newValue.replace(/\./g, '');
      // If the number is valid add the thousand separator
      newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      onChange(newValue);
    } else {
      onChange(newValue);
    }
  }
  return (
    <Input
      type={'text'}
      value={value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      onChange={handleChange}
      {...props}
    />
  );
};

const NumberField = props => (
  <BaseField
    {...props}
    as={<BaseNumberField />}
    validate={value => {
      const numValidRegex = /^-?[\d|,]+$/;
      if (!numValidRegex.test(value)) {
        return 'The field expects a valid number';
      }
      return true;
    }}
  />
);

export default NumberField;
