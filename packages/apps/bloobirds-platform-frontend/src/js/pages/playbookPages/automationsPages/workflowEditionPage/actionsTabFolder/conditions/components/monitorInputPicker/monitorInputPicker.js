import {
  CheckItem,
  Input,
  InputPicker,
  InputPickerOption,
  Item,
  MultiSelect,
  Select,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import { useWorkflow } from '../../../../context/workflowsContext';
import * as PropTypes from 'prop-types';
import styles from './monitorInputPicker.module.css';
import { toTitleCase as capitalizeFirstLetter } from '../../../../../../../../utils/strings.utils';

const inputTypesOptions = {
  Equal: '= is equal to',
  Empty: 'is empty',
  NotEqual: '≠ is not equal to',
  NotEmpty: 'is not empty',
  LessThan: '< is less than',
  LessThanEqual: '≤ is less than or equal to',
  GreaterThan: '> is greather than',
  GreaterThanEqual: '≥ is greather than or equal to',
  Change: 'has changed',
  Contains: 'contains',
  Between: '- is between',
};

const BetweenInput = ({ value, onChange }) => {
  return (
    <div className={styles._is_between_select}>
      <Input
        value={value?.fromValue}
        onChange={v => onChange({ ...value, fromValue: v })}
        width="124px"
        placeholder="Select"
        type="number"
        size="small"
      />
      <Input
        value={value?.toValue}
        onChange={v => onChange({ ...value, toValue: v })}
        width="124px"
        placeholder="Select"
        type="number"
        size="small"
      />
    </div>
  );
};

function ChangeValueSelect(props) {
  let { value, onChange, dropdownProps, fields, monitor } = props;
  if (!value) value = { fromValue: monitor?.fromValue, toValue: monitor?.toValue };

  return (
    <div className={styles._has_changed_select}>
      <Select
        placeholder="From"
        width="95px"
        borderless={false}
        defaultValue=""
        value={value?.fromValue}
        autocomplete={fields?.length > 8}
        size="small"
        onChange={fromValue => onChange({ ...value, fromValue })}
        dropdownProps={dropdownProps}
      >
        <Item value="EMPTY" key="empty">
          EMPTY
        </Item>
        <Item value="ANY" key="allValues">
          ANY
        </Item>
        {fields?.map(f => (
          <Item value={f.value} key={f.value}>
            {f.label}
          </Item>
        ))}
      </Select>
      <Select
        placeholder="To"
        width="95px"
        borderless={false}
        defaultValue=""
        value={value?.toValue}
        autocomplete={fields?.length > 8}
        size="small"
        onChange={toValue => onChange({ ...value, toValue })}
        dropdownProps={dropdownProps}
      >
        <Item value="EMPTY" key="empty">
          EMPTY
        </Item>
        <Item value="ANY" key="allValues">
          ANY
        </Item>
        {fields?.map(f => {
          if (f.value !== value?.fromValue) {
            return (
              <Item value={f.value} key={f.value}>
                {f.label}
              </Item>
            );
          }
        })}
      </Select>
    </div>
  );
}

const inputRenderOption = (type, value) => {
  if (value) {
    if (type === 'Between')
      return (
        <span>
          <b>{inputTypesOptions[type]}</b> {value?.fromValue} and {value?.toValue}
        </span>
      );
    return (
      <span>
        {typeof value === 'string' ? (
          <>
            <b>{inputTypesOptions[type]} </b>
            {value}
          </>
        ) : (
          <>
            <b>{inputTypesOptions[type]} From: </b>
            {value?.fromValue} <b>To: </b>
            {value?.toValue}
          </>
        )}
      </span>
    );
  } else {
    return (
      <span>
        <b>{inputTypesOptions[type]}</b>
      </span>
    );
  }
};

const textInputPickerOptions = field => {
  return [
    <InputPickerOption
      key={`${field?.id}-contains-option`}
      title={inputTypesOptions['Contains']}
      type="Contains"
    >
      <Input width="240px" placeholder="Contains something like..." />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-equal-option`}
      title={inputTypesOptions['Equal']}
      type="Equal"
    >
      <Input type="text" placeholder="Contains exactly..." width="90%" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-notequal-option`}
      title={inputTypesOptions['NotEqual']}
      type="NotEqual"
    >
      <Input type="text" placeholder="Contains exactly..." width="90%" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-empty-option`}
      title={inputTypesOptions['Empty']}
      type="Empty"
    />,
    <InputPickerOption
      key={`${field?.id}-notempty-option`}
      title={inputTypesOptions['NotEmpty']}
      type="NotEmpty"
    />,
  ];
};

const numberInputPickerOptions = (field, event, monitor) => {
  const [value, setValue] = useState({ fromValue: monitor?.fromValue, toValue: monitor?.toValue });

  return [
    <InputPickerOption
      key={`${field?.id}-contains-option`}
      title={inputTypesOptions['Between']}
      type="Between"
    >
      <BetweenInput value={value} onChange={setValue} />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-equal-option`}
      title={inputTypesOptions['Equal']}
      type="Equal"
    >
      <Input width="124px" placeholder="Select" type="number" size="small" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-notequal-option`}
      title={inputTypesOptions['NotEqual']}
      type="NotEqual"
    >
      <Input width="124px" placeholder="Select" type="number" size="small" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-lessThan-option`}
      title={inputTypesOptions['LessThan']}
      type="LessThan"
    >
      <Input width="124px" placeholder="Select" type="number" size="small" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-lessThanEqual-option`}
      title={inputTypesOptions['LessThanEqual']}
      type="LessThanEqual"
    >
      <Input width="124px" placeholder="Select" type="number" size="small" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-greaterThan-option`}
      title={inputTypesOptions['GreaterThan']}
      type="GreaterThan"
    >
      <Input width="124px" placeholder="Select" type="number" size="small" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-greaterThanEqual-option`}
      title={inputTypesOptions['GreaterThanEqual']}
      type="GreaterThanEqual"
    >
      <Input width="124px" placeholder="Select" type="number" size="small" />
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-empty-option`}
      title={inputTypesOptions['Empty']}
      type="Empty"
    />,
    <InputPickerOption
      key={`${field?.id}-notempty-option`}
      title={inputTypesOptions['NotEmpty']}
      type="NotEmpty"
    />,
    <InputPickerOption
      key={`${field?.id}-hasChanged-option`}
      title={inputTypesOptions['Change']}
      type="Change"
    >
      <ChangeValueSelect monitor={monitor} onChange={value => setValue({ ...value })} />
    </InputPickerOption>,
  ];
};

ChangeValueSelect.propTypes = { value: PropTypes.func };
const picklistInputPickerOptions = (field, event, monitor) => {
  if (monitor && !monitor?.value) monitor.value = monitor?.arrayValues;
  const options = [
    <InputPickerOption
      key={`${field?.id}-equal-option`}
      title={inputTypesOptions['Equal']}
      type="Equal"
    >
      <MultiSelect
        placeholder="Select value"
        width="240px"
        borderless={false}
        autocomplete={field?.fieldValues?.length > 8}
        defaultValue=""
        size="small"
        selectAllOption={true}
      >
        {field?.fieldValues?.map(fieldValue => (
          <CheckItem value={fieldValue?.value} key={fieldValue?.value}>
            {fieldValue?.label}
          </CheckItem>
        ))}
      </MultiSelect>
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-notequal-option`}
      title={inputTypesOptions['NotEqual']}
      type="NotEqual"
    >
      <Select
        placeholder="Select value"
        width="240px"
        borderless={false}
        autocomplete={field?.fieldValues?.length > 8}
        defaultValue=""
        size="small"
      >
        {field?.fieldValues?.map(f => (
          <Item value={f.value} key={f.value}>
            {f.label}
          </Item>
        ))}
      </Select>
    </InputPickerOption>,
    <InputPickerOption
      key={`${field?.id}-empty-option`}
      title={inputTypesOptions['Empty']}
      type="Empty"
    />,
    <InputPickerOption
      key={`${field?.id}-notempty-option`}
      title={inputTypesOptions['NotEmpty']}
      type="NotEmpty"
    />,
  ];
  if (event === 'UPDATE') {
    options.push(
      <InputPickerOption
        key={`${field?.id}-hasChanged-option`}
        title={inputTypesOptions['Change']}
        type="Change"
      >
        <ChangeValueSelect fields={field?.fieldValues} monitor={monitor} />
      </InputPickerOption>,
    );
  }
  return options;
};

function workflowValueTranslator(monitor) {
  if (monitor?.arrayValues) {
    return {
      type: monitor?.type,
      value: monitor?.arrayValues,
    };
  } else {
    //range options
    if (monitor?.entries?.length > 1) {
      return {
        type: 'Between',
        value: {
          fromValue: monitor.entries[0].value,
          toValue: monitor.entries[1].value,
        },
      };
    } else {
      if (monitor?.entries) {
        const { operator, value } = monitor?.entries[0] || {};
        switch (operator) {
          case 'LT':
            return {
              type: 'LessThan',
              value,
            };
          case 'LTE':
            return {
              type: 'LessThanEqual',
              value,
            };
          case 'GT':
            return {
              type: 'GreaterThan',
              value,
            };
          case 'GTE':
            return {
              type: 'GreaterThanEqual',
              value,
            };
        }
      }
    }
  }
  return monitor;
}

const findField = (monitorValue, field) => {
  if (!monitorValue) {
    return '';
  }
  if (monitorValue === 'EMPTY' || monitorValue === 'ANY')
    return capitalizeFirstLetter(monitorValue);
  return field?.fieldValues.find(fieldValue => fieldValue?.value === monitorValue)?.label;
};

const getValues = (monitorValues, field) => {
  const { value, type } = monitorValues;
  if (type === 'Change') {
    const { fromValue, toValue } = value || monitorValues;
    return {
      fromValue: findField(fromValue, field),
      toValue: findField(toValue, field),
    };
  } else if (type === 'Equal' && value) {
    if (Array.isArray(value) && field?.fieldValues?.length === value?.length) {
      return 'All';
    } else if (Array.isArray(value)) {
      const lastItem = findField(value[value?.length - 1], field);
      if (value?.length === 1) return findField(value[0], field);
      return `${lastItem} and ${value?.length - 1} more`;
    } else {
      return findField(value, field);
    }
  } else {
    return findField(value, field);
  }
};

const MonitorInputPicker = ({ field, block, index, event, monitor, disabled }) => {
  if ((!monitor?.value && !monitor?.fromValue) || monitor?.type === 'Range')
    monitor = workflowValueTranslator(monitor);

  const {
    updateFieldValue,
    state: { isEnabled, isLocked, isMissingInfo, isSubmitting },
  } = useWorkflow();
  const isPicklist = field?.type?.includes('Picklist');
  const isText = ['Text', 'Email'].includes(field?.type);
  const isNumber = field?.type?.includes('Number');

  const valueRequiringFields = ['Contains', 'Equal', 'NotEqual'];
  const isFieldIncomplete =
    isMissingInfo &&
    isSubmitting &&
    monitor?.type &&
    //if the field doesnt require value the type is info enough
    valueRequiringFields.includes(monitor?.type) &&
    !monitor?.value;
  const getOptionArray = () => {
    if (isPicklist) return picklistInputPickerOptions(field, event, monitor);
    if (isText) return textInputPickerOptions(field);
    if (isNumber) return numberInputPickerOptions(field, event, monitor);
  };

  return (
    <InputPicker
      width="310px"
      placeholder="Select condition"
      onChange={value => {
        if (value?.type === 'Change')
          value = {
            type: value.type,
            fromValue: value?.value?.fromValue || value?.fromValue,
            toValue: value?.value?.toValue || value?.toValue,
          };
        updateFieldValue(block, index, value);
      }}
      value={monitor}
      warning={
        (!monitor?.type && isSubmitting) || isFieldIncomplete ? 'Missing required information' : ''
      }
      disabled={isEnabled || isLocked || disabled}
      renderDisplayValue={inputPickerValue => {
        if (isPicklist && inputPickerValue && Array.isArray(field?.fieldValues)) {
          return inputRenderOption(inputPickerValue.type, getValues(inputPickerValue, field));
        } else if (isNumber && inputPickerValue?.type === 'Between') {
          return inputRenderOption(inputPickerValue.type, inputPickerValue?.value);
        } else if (isNumber && inputPickerValue?.type === 'Change') {
          return inputRenderOption(inputPickerValue.type, getValues(inputPickerValue, field));
        } else {
          return inputRenderOption(inputPickerValue?.type, inputPickerValue?.value);
        }
      }}
    >
      {getOptionArray()}
    </InputPicker>
  );
};

export default MonitorInputPicker;
