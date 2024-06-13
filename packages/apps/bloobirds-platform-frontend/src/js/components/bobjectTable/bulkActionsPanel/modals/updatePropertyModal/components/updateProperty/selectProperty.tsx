import React, { useState } from 'react';
import { Input, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import { availableFieldType, fieldType } from './utils';
import { useInternalUpdateProperty } from './useInternalUpdateProperty';

/**
 * Select Property Component: used to select a property to update.
 * It shows the available properties (not the ones already selected),
 * and sets the selected property as selected.
 *
 * @constructor
 */
export const SelectProperty = ({ id, field }: { id: number; field: availableFieldType }) => {
  const { availableFields, changeSelectedProperty } = useInternalUpdateProperty();
  const [search, setSearch] = useState('');
  const [displayValue, setDisplayValue] = useState(true);

  if (field && field.blocked) {
    return (
      <Input
        width="260px"
        height="22px"
        borderless={false}
        size="small"
        value={`${field.label} from ${field.type}`}
        disabled
      />
    );
  } else
    return (
      <Select
        placeholder="Select property"
        width="260px"
        borderless={false}
        size="small"
        onChange={newField => {
          if (displayValue) {
            changeSelectedProperty(id, newField);
            setSearch('');
          }
        }}
        value={displayValue ? field : search}
        autocomplete
        onSearch={picklistSearchValue => {
          if (displayValue) {
            setSearch('');
            setDisplayValue(false);
          } else {
            setSearch(picklistSearchValue);
          }
        }}
        renderDisplayValue={v =>
          !displayValue ? search : v.label ? `${v.label} from ${v.type}` : ''
        }
        dropdownProps={{ onClose: () => setDisplayValue(true) }}
      >
        {availableFields.map(availableField => {
          if (
            availableField.available &&
            availableField.label.toLowerCase().includes(search.toLowerCase())
          ) {
            return (
              <Item
                value={availableField as fieldType}
                key={`${id}-${availableField.name}-${availableField.type}`}
                onClick={() => {
                  if (!displayValue) {
                    setDisplayValue(true);
                    changeSelectedProperty(id, availableField);
                    setSearch('');
                  }
                }}
              >
                <Text size={'s'}>
                  <b>{availableField.label}</b> from {availableField.type}
                </Text>
              </Item>
            );
          }
        })}
      </Select>
    );
};
