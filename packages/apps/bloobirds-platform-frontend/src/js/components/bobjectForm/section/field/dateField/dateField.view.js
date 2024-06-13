import React from 'react';

import { DateTimePicker } from '@bloobirds-it/flamingo-ui';

import { BaseField } from '../baseField/baseField.view';

const DateField = props => (
  <BaseField
    {...props}
    as={<DateTimePicker openDefaultValue={new Date()} withTimePicker={false} />}
  />
);

export default DateField;
