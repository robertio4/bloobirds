import styles from '../../modules.module.css';
import { Input, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';

const RelativeDateModule = props => {
  const { value: elementValue, onChange, dropdownProps } = props;
  const timeFrames = Array.from(Array(24).keys());

  return (
    <div className={styles._input_picker_range_wrapper}>
      <Input
        type="number"
        size="small"
        defaultValue={0}
        value={elementValue?.days}
        width="47px"
        onChange={value => onChange({ ...elementValue, days: value })}
      />
      <Text className={styles._input_picker_text_wrapper} size="xs" color="softPeanut">
        day(s) from triggers , at
      </Text>
      <Select
        size="small"
        borderless={false}
        placeholder="time"
        width="68px"
        dropdownProps={dropdownProps}
        value={elementValue?.time}
        onChange={hour => onChange({ ...elementValue, time: hour })}
        renderDisplayValue={time => `0${time ? time : '0'}:00`}
      >
        {timeFrames.map(time => (
          <Item value={time} key={`menu-item-${time}:00`}>
            {`${('0' + time).slice(-2)}:00`}
          </Item>
        ))}
      </Select>
    </div>
  );
};

export default RelativeDateModule;
