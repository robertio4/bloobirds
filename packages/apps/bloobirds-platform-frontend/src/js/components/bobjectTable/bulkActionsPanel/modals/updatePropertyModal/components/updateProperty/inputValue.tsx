import React, { useState } from 'react';

import {
  CheckItem,
  DateTimePicker,
  Input,
  Item,
  MultiSelect,
  Select,
} from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { isValidPhone as isPhone } from '../../../../../../../../../../../utils/src/phone.utils';
import { isEmail, isUrl } from '../../../../../../../misc/utils';
import styles from './updatePropertyValue.module.css';
import { useInternalUpdateProperty } from './useInternalUpdateProperty';
import { defaultFieldType, fieldType, isFieldValueType, manageDateValue } from './utils';

const INPUT_HEIGHT = '24px';

/**
 * Input Value Component: used to choose a value to update, for the selected property.
 * It shows differently depending on the type of the property.
 *
 * @constructor
 */
export const InputValue = ({
  id = 0,
  field = defaultFieldType,
  setShowErrorOrWarning,
}: {
  id: number;
  field: fieldType;
  setShowErrorOrWarning: (showErrorOrWarning: boolean) => void;
}) => {
  const [search, setSearch] = useState('');
  const [showDisplayValue, setShowDisplayValue] = useState(true);
  const [displayValue, setDisplayValue] = useState<{ label: string; value: string }>();
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
  const { addedFields, changeSelectedValue, getFieldInfo } = useInternalUpdateProperty();

  // get field
  const fieldInfo = getFieldInfo(field);
  const fieldType = fieldInfo && isFieldValueType(fieldInfo.type) ? fieldInfo.type : undefined;

  // get value
  const value =
    !!addedFields &&
    Object.keys(addedFields).includes(field.type) &&
    addedFields[field.type][field.name];

  const showError = (v: string | string[] = value) => {
    if (fieldType === 'Email' && v && !isEmail(v)) {
      return 'The email format is not valid';
    } else if (fieldType === 'Phone' && v && !isPhone(v)) {
      return 'The phone format is not valid';
    } else if (fieldType === 'URL' && v && !isUrl(v)) {
      return 'The URL format is not valid';
    } else return undefined;
  };

  const showWarning = (v: string | string[] = value) => {
    if (fieldInfo.required && v === '' && hasBeenChanged) {
      return 'This field is required';
    } else return undefined;
  };

  switch (fieldType) {
    case undefined:
      return (
        <div>
          <Input
            placeholder="Property value"
            size="small"
            width="260px"
            height={INPUT_HEIGHT}
            disabled={true}
          />
        </div>
      );
    case 'Picklist':
    case 'Global Picklist':
      return (
        <Select
          placeholder="Select type"
          width="260px"
          borderless={false}
          defaultValue=""
          size="small"
          onChange={newValue => {
            if (showDisplayValue) {
              changeSelectedValue(id, newValue.value === 'none' ? '' : newValue.value);
              setSearch('');
              setDisplayValue(newValue);
            }
          }}
          value={showDisplayValue ? displayValue : search}
          autocomplete
          onSearch={picklistSearchValue => {
            if (showDisplayValue) {
              setSearch('');
              setShowDisplayValue(false);
            } else {
              setSearch(picklistSearchValue);
            }
          }}
          renderDisplayValue={v => {
            return !showDisplayValue ? search : v.label;
          }}
          dropdownProps={{
            onClose: () => {
              setShowDisplayValue(true);
            },
          }}
        >
          {!field.required && !field.blocked && (
            <Item
              value={{ label: 'None', value: 'none' }}
              key={'none'}
              onClick={() => {
                if (!showDisplayValue) {
                  setShowDisplayValue(true);
                  changeSelectedValue(id, '');
                  setSearch('');
                  setDisplayValue({ label: 'None', value: 'none' });
                }
              }}
            >
              None
            </Item>
          )}
          {fieldInfo?.fieldValues.map(fieldValue => {
            if (fieldValue.label.toLowerCase().includes(search.toLowerCase()))
              return (
                <Item
                  value={fieldValue}
                  key={fieldValue?.value}
                  onClick={() => {
                    if (!showDisplayValue) {
                      setShowDisplayValue(true);
                      changeSelectedValue(id, fieldValue?.value);
                      setSearch('');
                      setDisplayValue(fieldValue);
                    }
                  }}
                >
                  {fieldValue?.label}
                </Item>
              );
          })}
        </Select>
      );
    case 'Multi picklist':
    case 'Multi global picklist':
      if (!value) changeSelectedValue(id, []);
      // TODO add search
      return (
        <MultiSelect
          placeholder="None"
          width="260px"
          borderless={false}
          defaultValue=""
          size="small"
          selectAllOption
          onChange={newValue => changeSelectedValue(id, newValue)}
        >
          {fieldInfo?.fieldValues.map(fieldValue => {
            return (
              <CheckItem value={fieldValue.value} key={fieldValue?.value} label={fieldValue?.label}>
                {fieldValue?.label}
              </CheckItem>
            );
          })}
        </MultiSelect>
      );
    case 'DateTime':
      return (
        <DateTimePicker
          size="small"
          placeholder="Select date"
          width="260px"
          height={INPUT_HEIGHT}
          onChange={pickerValue =>
            changeSelectedValue(id, manageDateValue({ type: 'date', value: pickerValue }))
          }
        />
      );
    case 'Date':
      return (
        <DateTimePicker
          size="small"
          placeholder="Select date"
          width="260px"
          height={INPUT_HEIGHT}
          onChange={pickerValue =>
            changeSelectedValue(id, manageDateValue({ type: 'date', value: pickerValue }))
          }
          withTimePicker={false}
        />
      );
    default:
      return (
        <div className={clsx(styles._update_property_text_field_wrapper)}>
          <Input
            placeholder="Property value"
            size="small"
            width="260px"
            height={INPUT_HEIGHT}
            type={
              fieldType === 'Phone' ? 'text' : (fieldType?.toLowerCase() as any) /*controlled any*/
            }
            error={hasBeenBlurred ? showError() : undefined}
            warning={hasBeenBlurred ? showWarning() : undefined}
            onChange={newValue => {
              if (!hasBeenChanged) setHasBeenChanged(true);
              // to control valid inputs: we transform #deletevalue to '', and '' to undefined
              if (newValue === '#deletevalue') {
                changeSelectedValue(id, '', field.required);
              } else {
                const error = !!showError(newValue) || !!showWarning(newValue);
                setShowErrorOrWarning(hasBeenBlurred && error);
                const value = newValue === '' ? undefined : newValue;
                changeSelectedValue(id, value, error);
              }
            }}
            onBlur={() => {
              if (!hasBeenBlurred) {
                setHasBeenBlurred(true);
                const error = !!showError() || !!showWarning();
                setShowErrorOrWarning(error);
              }
            }}
          />
        </div>
      );
  }
};
