import styles from './textSelect.module.css';
import { Icon, Select, Text } from '@bloobirds-it/flamingo-ui';
import * as PropTypes from 'prop-types';
import React from 'react';

const TextSelect = ({ text, onChange, value, items, weight, size, disabled }) => (
  <div className={styles._children_multiselect}>
    <Text color={disabled ? 'softPeanut' : 'peanut'} size={size || 'm'} weight={weight || 'bold'}>
      {text}
    </Text>
    <Icon name="arrowRight" color="softPeanut" size="24" />
    <Select disabled={disabled} onChange={onChange} value={value} autocomplete>
      {items}
    </Select>
  </div>
);

export default TextSelect;

TextSelect.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.any,
};
