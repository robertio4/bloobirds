import React from 'react';
import { Checkbox } from '@bloobirds-it/flamingo-ui';

const CheckBoxCard = ({ text, onChange, value, width, size }) => (
  <div style={{ boxSizing: 'border-box', padding: '32px', width: width }}>
    <Checkbox expand onClick={onChange} size={size} defaultChecked={value}>
      {text}
    </Checkbox>
  </div>
);

export default CheckBoxCard;

CheckBoxCard.defaultProps = {
  width: '740px',
  size: 'medium',
};
