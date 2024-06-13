import React, { useRef } from 'react';
import { useDashboard, useEntity } from '../../../../hooks';
import { CheckItem, Item, MultiSelect } from '@bloobirds-it/flamingo-ui';
import { sortBy } from 'lodash';

export const LogicRoleFilter = ({ logicRole, placeholder, onChange, filterName }) => {
  const clickOutsideRef = useRef(null);
  const bobjectFields = useEntity('bobjectFields');
  const { filters = {} } = useDashboard();
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const bobjectField = bobjectFields?.findByLogicRole(logicRole);

  if (!bobjectField || !bobjectPicklistFieldValues) {
    return null;
  }

  const value = filters[bobjectField.id] || [];

  const items = bobjectField.bobjectGlobalPicklist
    ? bobjectPicklistFieldValues.filterBy(
        'bobjectGlobalPicklist',
        bobjectField.bobjectGlobalPicklist,
      )
    : bobjectPicklistFieldValues.filterBy('bobjectField', bobjectField.id);

  return (
    <>
      {/* this is hack to make <Select /> component to close after setting its value to undefined */}
      <div ref={clickOutsideRef} style={{ display: 'none' }} />
      <MultiSelect
        autocomplete
        value={value}
        onChange={newValue => {
          const unselectAll = newValue.includes('all');
          const shouldUnsetFilter = unselectAll || newValue.length === 0;

          if (unselectAll) {
            clickOutsideRef.current.click();
          }

          if (unselectAll && value.length === 0) {
            return;
          }

          onChange({
            [bobjectField.id]: shouldUnsetFilter ? undefined : newValue,
          });
        }}
        size="small"
        borderless={false}
        placeholder={placeholder}
      >
        <Item value="all">All</Item>
        {sortBy(items, 'value').map(item => (
          <CheckItem key={item.id} value={item.id}>
            {item.value}
          </CheckItem>
        ))}
      </MultiSelect>
    </>
  );
};
