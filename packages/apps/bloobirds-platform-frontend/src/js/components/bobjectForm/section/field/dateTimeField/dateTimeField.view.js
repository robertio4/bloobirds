import React from 'react';

import { DateTimePicker } from '@bloobirds-it/flamingo-ui';

import { BaseField } from '../baseField/baseField.view';

const DateTimeField = props => (
  <BaseField {...props} as={<DateTimePicker openDefaultValue={new Date()} />} />
);

export default DateTimeField;
