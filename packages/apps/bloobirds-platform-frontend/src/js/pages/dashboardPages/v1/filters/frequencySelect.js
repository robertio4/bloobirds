import React from 'react';
import { Icon, Item, Select } from '@bloobirds-it/flamingo-ui';

export const FrequencySelect = ({ isIntervalDisabled, value, onChange }) => (
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
