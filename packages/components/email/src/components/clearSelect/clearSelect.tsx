import React from 'react';

import { Dropdown, Icon, Item, Text, useVisible } from '@bloobirds-it/flamingo-ui';

import styles from './clearSelect.module.css';

interface ClearSelectProps {
  value: string;
  options: Array<{ value: string; label: string | JSX.Element }>;
  onChange: (value: string) => void;
  emptyMessage?: string;
}

const ClearSelect = ({ value, options, onChange, emptyMessage }: ClearSelectProps) => {
  const { ref, visible, setVisible } = useVisible(false);

  if (options?.length === 0) {
    return (
      <Text color="softPeanut" size="m">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      anchor={
        <div
          tabIndex={0}
          role="button"
          className={styles.select}
          onClick={() => setVisible(!visible)}
        >
          <Text color="softPeanut" size="m">
            {options.find(option => option.value === value)?.label}
          </Text>
          <Icon name="chevronDown" color="verySoftPeanut" size={16} />
        </div>
      }
    >
      {options.map(option => (
        <Item
          value={option}
          key={option.value}
          onClick={() => {
            onChange(option.value);
            setVisible(false);
          }}
        >
          {option.label}
        </Item>
      ))}
    </Dropdown>
  );
};

export default ClearSelect;
