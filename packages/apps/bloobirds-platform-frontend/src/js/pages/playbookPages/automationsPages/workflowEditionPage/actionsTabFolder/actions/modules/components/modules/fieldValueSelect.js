import React, { useState } from 'react';

import {
  Button,
  DateTimePicker,
  IconButton,
  Input,
  InputPicker,
  InputPickerOption,
  Item,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { isValidPhone as isPhone } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { format as formatDate, parseISO } from 'date-fns';

import { isEmail } from '../../../../../../../../../misc/utils';
import { useWorkflow } from '../../../../../context/workflowsContext';
import styles from '../../modules.module.css';
import RelativeDateModule from './relativeDateModule';

export const renderValue = dateValue => {
  const { type, value } = dateValue;
  if (type === 'date') {
    return 'Immediately';
  } else if (type === 'exactDate') {
    if (value)
      return `At an exact date: ${
        value?.fixedDate ? parseISO(value.fixedDate) : formatDate(value, 'MMMM do HH:mm')
      }`;
    return '';
  } else {
    const hasMissingValues = !(value?.days && value?.time);
    return hasMissingValues
      ? ''
      : `${value?.days} days from trigger, at ${('0' + value?.time).slice(-2)}:00`;
  }
};

export const manageDateValue = selectValue => {
  const { type, value } = selectValue;
  switch (type) {
    default:
      return { days: 0, time: 'DAYS', fixedDate: undefined };
    case 'exactDate':
      return { fixedDate: formatDate(value, "yyyy-MM-dd'T'HH:mm:ss") };
    case 'relativeDate':
      return value;
  }
};

const FieldValueSelect = ({
  fieldId,
  value,
  onValueChange,
  onFieldIdChange,
  onFieldDeleted,
  index,
  disableAddButton,
  showAddButton,
  selectedField,
  availableFields,
  isEnabled,
}) => {
  const {
    state: { isMissingInfo, isSubmitting, isLocked },
  } = useWorkflow();
  const parseTextFields = (type, valueToParse) => {
    switch (type) {
      case 'Phone':
        return valueToParse?.replace(/([a-zA-Z ])/g, '');
      default:
        return valueToParse;
    }
  };
  const [search, setSearch] = useState('');

  const isValidField = field => {
    const availableFieldTypes = ['Picklist', 'Text', 'Global Picklist'];
    if (field?.bobjectType === 'Activity' && field?.label === 'Lead associated') return true;
    if (availableFieldTypes.some(type => type.includes(field?.type))) return true;
  };
  const isFieldIncomplete = isSubmitting && isMissingInfo;

  const updateFieldValueSelector = type => {
    const isValidFormatField = () => {
      if (type === 'Email' && !isEmail(value)) {
        return (
          <Text color="tomato" size="xs" className={styles._wrong_field_alert}>
            The email format is not valid
          </Text>
        );
      }
      if (type === 'Phone' && !isPhone(value)) {
        return (
          <Text color="tomato" size="xs" className={styles._wrong_field_alert}>
            The phone format is not valid
          </Text>
        );
      }
    };

    switch (type) {
      case 'Picklist':
      case 'Global Picklist':
        return (
          <Select
            placeholder="Select type"
            width="260px"
            borderless={false}
            defaultValue=""
            size="small"
            autocomplete
            disabled={isEnabled || isLocked}
            warning={isMissingInfo && isSubmitting && !value ? 'Missing required information' : ''}
            value={value}
            onChange={newValue => {
              onValueChange(fieldId, newValue);
            }}
            onSearch={picklistSearchValue => setSearch(picklistSearchValue)}
          >
            {selectedField?.fieldValues?.map(field => {
              if (field.label.toLowerCase().includes(search.toLowerCase()))
                return (
                  <Item value={field?.value} key={field?.value}>
                    {field?.label}
                  </Item>
                );
            })}
          </Select>
        );
      case 'DateTime':
        return (
          <div className={styles._relative_date_picker}>
            <InputPicker
              defaultValue="Immediately"
              width="310px"
              placeholder="Select type"
              disabled={isEnabled || isLocked}
              warning={isMissingInfo && isSubmitting ? 'Missing required information' : ''}
              onChange={pickerValue => onValueChange(fieldId, manageDateValue(pickerValue))}
              renderDisplayValue={dateValue => {
                return !dateValue?.type ? '' : renderValue(dateValue);
              }}
            >
              <InputPickerOption title="Immediately" type="date" />
              <InputPickerOption title="Choose date" type="exactDate">
                <DateTimePicker
                  size="small"
                  placeholder="Select date"
                  width="160px"
                  className={styles._date_time_picker_wrapper}
                />
              </InputPickerOption>
              <InputPickerOption title="At a set date" type="relativeDate">
                <RelativeDateModule />
              </InputPickerOption>
            </InputPicker>
          </div>
        );
      // case 'Number':
      //   return (
      //     <div className={styles._relative_date_picker}>
      //       <InputPicker
      //         defaultValue="Absolute"
      //         width="310px"
      //         placeholder="Select type"
      //         onChange={numberPickerValue => onValueChange(fieldId, numberPickerValue)}
      //       >
      //         <InputPickerOption title="Absolute" type="absolute">
      //           <Input
      //             placeholder="0"
      //             size="small"
      //             width="130px"
      //             type="number"
      //             value={value}
      //             onChange={newValue => {
      //               onValueChange(fieldId, newValue);
      //             }}
      //           />
      //         </InputPickerOption>
      //         <InputPickerOption title="Relative" type="relative">
      //           <Input
      //             placeholder="0"
      //             size="small"
      //             width="130px"
      //             type="number"
      //             value={value}
      //             onChange={newValue => {
      //               onValueChange(fieldId, newValue);
      //             }}
      //           />
      //         </InputPickerOption>
      //       </InputPicker>
      //     </div>
      //   );
      default:
        return (
          <div
            className={clsx(styles._text_field_wrapper, {
              [styles._input_warning]: value && isValidFormatField(),
            })}
          >
            <Input
              disabled={isEnabled || isLocked || !selectedField}
              placeholder="Property value"
              size="small"
              warning={!value && isFieldIncomplete ? 'Missing required information' : ''}
              width="260px"
              type={type === 'Phone' ? 'text' : type?.toLowerCase()}
              value={value}
              onChange={newValue => {
                onValueChange(fieldId, parseTextFields(type, newValue));
              }}
            />
            {value && isValidFormatField()}
          </div>
        );
    }
  };
  const getRenderValue = propertyRenderValue =>
    `${propertyRenderValue?.bobjectType} - ${propertyRenderValue?.label}`;
  const fieldHasMissingInfo = isMissingInfo && isSubmitting;

  return (
    <>
      <div className={styles._select_container}>
        <Select
          placeholder="Select type"
          width="260px"
          borderless={false}
          defaultValue=""
          autocomplete
          disabled={isEnabled || isLocked}
          size="small"
          value={selectedField}
          warning={fieldHasMissingInfo && !selectedField && 'Missing required information'}
          renderDisplayValue={displayValue => getRenderValue(displayValue)}
          onChange={id => {
            onFieldIdChange(fieldId, id);
          }}
          onSearch={searchValue => setSearch(searchValue)}
        >
          {Object.keys(availableFields)?.map(bobjectType => {
            return availableFields[bobjectType]?.map(field => {
              if (isValidField(field) && field.label.toLowerCase().includes(search.toLowerCase()))
                return (
                  <Item
                    value={field?.name}
                    key={field?.name}
                    label={field?.label}
                    className={styles._conditions_selector_item}
                  >
                    {field?.label}
                    {' - '}
                    <Text htmlTag="span" size="xs" color="softPeanut">
                      {bobjectType}
                    </Text>
                  </Item>
                );
            });
          })}
        </Select>
        {updateFieldValueSelector(selectedField?.type)}
        {index !== 0 && (
          <IconButton
            className={styles._clear_button}
            name="cross"
            color="purple"
            onClick={() => {
              onFieldDeleted(fieldId);
            }}
          />
        )}
      </div>
      {showAddButton && (
        <div className={styles._button_container}>
          <Button
            variant="clear"
            color="purple"
            disabled={disableAddButton || isEnabled || isLocked}
            onClick={() => {
              onFieldIdChange('', '');
            }}
          >
            + Property
          </Button>
        </div>
      )}
    </>
  );
};

export default FieldValueSelect;
