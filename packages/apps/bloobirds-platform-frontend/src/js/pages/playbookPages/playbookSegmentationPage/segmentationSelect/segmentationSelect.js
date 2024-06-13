import React from 'react';
import { Icon, Select, Text } from '@bloobirds-it/flamingo-ui';
import styles from './segmentationSelect.module.css';

const SegmentationSelect = ({
  title,
  value,
  disabled,
  children,
  onChange,
  autocomplete = false,
}) => (
  <div className={styles._select_wrapper}>
    <div className={styles._select_text}>
      <Text color="softPeanut" size="m" weight="bold">
        {title}
      </Text>
    </div>
    <Icon name="arrowRight" color="softPeanut" />
    <Select
      width={315}
      disabled={disabled}
      autocomplete={autocomplete}
      value={value}
      placeholder="Select a picklist from your data model"
      removePlaceholder={!!value}
      onChange={onChange}
    >
      {children}
    </Select>
  </div>
);

export default SegmentationSelect;
