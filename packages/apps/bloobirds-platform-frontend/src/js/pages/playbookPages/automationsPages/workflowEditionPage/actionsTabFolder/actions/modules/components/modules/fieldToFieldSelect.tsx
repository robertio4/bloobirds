import { Button, IconButton, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';

import styles from '../../modules.module.css';
import { useWorkflow } from '../../../../../context/workflowsContext';

const fieldRelations = {
  Text: ['Picklist', 'Global Picklist', 'Text'],
  Picklist: ['Picklist', 'Global Picklist', 'Text'],
  'Global Picklist': ['Picklist', 'Global Picklist', 'Text'],
  DateTime: ['DateTime', 'Text'],
  Number: ['Number', 'Text'],
  Phone: ['Phone', 'Text'],
  Email: ['Email', 'Text'],
  URL: ['URL', 'Text'],
};
const FieldToFieldSelect = ({
  index,
  onFieldOriginUpdate,
  onFieldArrayExtension,
  onFieldTargetUpdate,
  onFieldDelete,
  value,
  availableFields,
  disableAddButton,
}: {
  index: number;
  onFieldArrayExtension: () => void;
  onFieldOriginUpdate: (index: number, value: string) => void;
  onFieldTargetUpdate: (index: number, value: string) => void;
  onFieldDelete: (index: number) => void;
  value: any;
  availableFields: any;
  disableAddButton: boolean;
}) => {
  const {
    state: { isEnabled, isSubmitting, isLocked },
  } = useWorkflow();
  const getRenderValue = (value: { label: string; bobjectType: string }) =>
    `${value?.bobjectType} - ${value?.label}`;
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  return (
    <>
      <div className={styles._select_container}>
        <Select
          placeholder="From"
          width="260px"
          borderless={false}
          defaultValue=""
          size="small"
          autocomplete
          disabled={isEnabled || isLocked}
          warning={!value?.originFieldId && isSubmitting ? 'Missing required information' : ''}
          value={value.originFieldId}
          renderDisplayValue={() => getRenderValue(value.originFieldId)}
          onSearch={value => setSearchFrom(value)}
          onChange={fieldId => {
            onFieldOriginUpdate(index, fieldId);
          }}
          dropdownProps={{ width: '260px' }}
        >
          {Object.keys(availableFields).map(bobjectType => {
            return availableFields[bobjectType]?.map((field: Record<string, string>) => {
              if (field.label.toLowerCase().includes(searchFrom.toLowerCase()))
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
        <Select
          placeholder="To"
          width="260px"
          borderless={false}
          defaultValue=""
          size="small"
          autocomplete
          disabled={isEnabled || isLocked}
          warning={!value?.targetFieldId && isSubmitting ? 'Missing required information' : ''}
          value={value.targetFieldId}
          renderDisplayValue={() => getRenderValue(value.targetFieldId)}
          onChange={value => {
            onFieldTargetUpdate(index, value);
          }}
          onSearch={searchValue => setSearchTo(searchValue)}
        >
          {Object.keys(availableFields).map(bobjectType => {
            return availableFields[bobjectType]
              ?.filter(availableField =>
                fieldRelations[value?.originFieldId?.type]?.includes(availableField?.type),
              )
              .filter((field: Record<string, string>) => field.name !== value.originFieldId.name)
              .map((field: Record<string, string>) => {
                if (field?.label?.toLowerCase().includes(searchTo.toLowerCase()))
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
        {value && index !== 0 && (
          <IconButton
            name="cross"
            color="purple"
            disabled={isEnabled || isLocked}
            onClick={() => {
              onFieldDelete(index);
            }}
          />
        )}
      </div>
      {!disableAddButton && (
        <div className={styles._button_container}>
          <Button
            variant="clear"
            color="purple"
            disabled={isEnabled || isLocked}
            onClick={() => {
              onFieldArrayExtension();
            }}
          >
            + Property
          </Button>
        </div>
      )}
    </>
  );
};

export default FieldToFieldSelect;
