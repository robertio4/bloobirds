import React from 'react';

import { Input } from '@bloobirds-it/flamingo-ui';

import { BaseField } from '../baseField/baseField.view';

const TextField = props => <BaseField {...props} as={<Input />} />;

export default TextField;
