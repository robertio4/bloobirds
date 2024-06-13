import React, { useEffect } from 'react';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import spacetime from 'spacetime';

type Timestamp = string;

interface ClockTimeSelectProps {
  value: Timestamp;
  onChange: (value: Timestamp) => void;
  max?: Timestamp;
  min?: Timestamp;
}

export const timestampToDate = (value: Timestamp) => {
  const [hours, minutes] = value.split(':');
  return new Date(0, 0, 0, Number(hours), Number(minutes));
};

export const dateToTimestamp = (date: Date | string): Timestamp => {
  return new Date(date).toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');
};

export function isBefore(a: Timestamp, b: Timestamp) {
  return timestampToDate(a).getTime() <= timestampToDate(b).getTime();
}

export function isAfter(a: Timestamp, b: Timestamp) {
  return timestampToDate(a).getTime() > timestampToDate(b).getTime();
}

export default function ClockTimeSelect({ value, onChange, max, min }: ClockTimeSelectProps) {
  const options = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const date = new Date(2020, 0, 1, hour, minute);

      if (min && isBefore(dateToTimestamp(date), min)) {
        continue;
      }

      if (max && isAfter(dateToTimestamp(date), max)) {
        break;
      }

      options.push(spacetime(date).format('{hour-24-pad}:{minute-pad}'));
    }
  }

  useEffect(() => {
    if (value && min && isBefore(value, min)) {
      onChange(dateToTimestamp(spacetime(timestampToDate(min)).add(15, 'minute').toNativeDate()));
    }
  }, [value, min, options]);

  return (
    <Select width="100px" value={value} onChange={onChange}>
      {options.map(option => (
        <Item key={option} value={option}>
          {option}
        </Item>
      ))}
    </Select>
  );
}
