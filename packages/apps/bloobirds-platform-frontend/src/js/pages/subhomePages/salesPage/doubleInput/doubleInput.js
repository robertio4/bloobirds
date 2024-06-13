import React from 'react';
import { Input, Text } from '@bloobirds-it/flamingo-ui';
import styles from './doubleInput.module.css';

const DoubleInput = ({ defaultValue, value, type, onChange }) => (
  <div className={styles._container}>
    <div className={styles._input_wrapper}>
      <Input
        type={type}
        width="100%"
        defaultValue={defaultValue.start}
        value={value.start}
        onChange={startValue => onChange({ ...value, start: startValue })}
      />
    </div>
    <div className={styles._text_wrapper}>
      <Text size="m">and</Text>
    </div>
    <Input
      type={type}
      width="40%"
      defaultValue={defaultValue.end}
      value={value.end}
      onChange={startValue => onChange({ ...value, end: startValue })}
    />
  </div>
);

DoubleInput.defaultProps = {
  type: 'text',
  size: 'medium',
  borderless: false,
  defaultValue: {
    start: null,
    end: null,
  },
};

export default DoubleInput;
