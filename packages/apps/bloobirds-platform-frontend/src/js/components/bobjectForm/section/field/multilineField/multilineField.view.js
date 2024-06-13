import React from 'react';

import { TextArea } from '@bloobirds-it/flamingo-ui';

import { BaseField } from '../baseField/baseField.view';

const MultilineField = ({ multilineLines, multilineMaxLines, ...props }) => (
  <BaseField
    {...props}
    as={<TextArea minRows={multilineLines || 3} maxRows={multilineMaxLines || 7} />}
  />
);

export default MultilineField;
