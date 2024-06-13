import { Icon, Item, Select } from '@bloobirds-it/flamingo-ui';
import React from 'react';

interface FrequencySelect {
  isIntervalDisabled: (value: string) => boolean;
  value: string;
  onChange: (value: string) => void;
}
export const FrequencySelect = ({ isIntervalDisabled, value, onChange }: FrequencySelect) => {
  return (
    <Select
      adornment={<Icon name="clock" size={12} color="softPeanut" />}
      value={value}
      onChange={onChange}
      size="small"
      borderless={false}
    >
      <Item disabled={isIntervalDisabled('day')} value="day">
        Daily
      </Item>
      <Item disabled={isIntervalDisabled('week')} value="week">
        Weekly
      </Item>
      <Item disabled={isIntervalDisabled('month')} value="month">
        Monthly
      </Item>
      <Item disabled={isIntervalDisabled('quarter')} value="quarter">
        Quarterly
      </Item>
      <Item disabled={isIntervalDisabled('year')} value="year">
        Yearly
      </Item>
    </Select>
  );
};
