import React, { useMemo } from 'react';

import { Input, countries, Flag } from '@bloobirds-it/flamingo-ui';
import { isValidPhone } from '@bloobirds-it/utils';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { BaseField } from '../baseField/baseField.view';

const BasePhoneField = ({ value, onChange, ...props }) => {
  const countryCode = useMemo(() => {
    if (value) {
      const phoneNumber = parsePhoneNumberFromString(value);
      if (phoneNumber?.isValid()) {
        return countries.find(x => x.code === phoneNumber.country)?.code;
      }
    }
    return null;
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={v => {
        onChange(v?.replace(/([a-zA-Z ])/g, ''));
      }}
      adornment={countryCode && <Flag code={countryCode} />}
    />
  );
};

const PhoneField = props => (
  <BaseField
    {...props}
    as={<BasePhoneField />}
    validate={value => {
      if (!isValidPhone(value)) {
        return 'The phone number is not valid.';
      }

      return true;
    }}
  />
);

export default PhoneField;
