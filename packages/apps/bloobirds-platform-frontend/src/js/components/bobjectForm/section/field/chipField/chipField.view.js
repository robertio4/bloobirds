import React from 'react';

import { Text, Chip, ChipGroup } from '@bloobirds-it/flamingo-ui';

import usePicklistFormField from '../../../../../hooks/usePicklistFormField';
import { BaseField } from '../baseField/baseField.view';
import styles from './chipField.module.css';

const BaseChipField = ({ name, value, error, dataTest, placeholder, onChange, fieldValues }) => {
  const { options } = usePicklistFormField({ name, fieldValues });

  return (
    <div className={styles._container}>
      <Text color="peanut" size="m">
        {placeholder}
      </Text>
      <ChipGroup dataTest={dataTest} value={value} onChange={onChange}>
        {options.map(props => (
          <Chip dataTest={props.logicRole || props.label} key={props.value} value={props.value}>
            {props.label}
          </Chip>
        ))}
      </ChipGroup>
      {error && (
        <Text color="tomato" size="s">
          {error}
        </Text>
      )}
    </div>
  );
};

const ChipField = props => (
  <BaseField {...props} as={<BaseChipField fieldValues={props.fieldValues} />} />
);

export default ChipField;
