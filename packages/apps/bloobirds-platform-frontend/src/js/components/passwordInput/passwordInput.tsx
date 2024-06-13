import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Input, InputProps } from '@bloobirds-it/flamingo-ui';

const PasswordInput = (props: InputProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      icon={visible ? 'eyeOff' : 'eye'}
      onSubmit={() => setVisible(!visible)}
    />
  );
};

export default PasswordInput;
