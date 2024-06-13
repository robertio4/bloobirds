import React, { useEffect, useState } from 'react';

import {
  CheckItem,
  InputPicker,
  InputPickerOption,
  Item,
  MultiSelect,
  Select,
} from '@bloobirds-it/flamingo-ui';

import { USER_GLOBAL_PICKLIST } from '../../../../constants/filtersModal';
import { useEntity } from '../../../../hooks';
import { RawEntity } from '../../../../hooks/entities/useEntityTypes';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';
import { useFiltersSettings } from '../../../../hooks/useFiltersModal';
import { renderDisplayValue } from '../../../../utils/filtersModal.utils';

interface LogicRoleFilterProps {
  logicRole?: string;
  globalPicklistRole?: string;
  customRole?: string;
  onChange: (value: { [key: string]: { searchMode: string; query?: any } }) => void;
}

export const LogicRoleFilter = ({
  logicRole,
  onChange,
  customRole,
  globalPicklistRole,
}: LogicRoleFilterProps) => {
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const globalPicklists = useEntity('bobjectGlobalPicklists');

  const { showHiddenValuesDashboards } = useFiltersSettings();
  let field: {
    id: string;
    logicRole: string;
    name: string;
    bobjectGlobalPicklist?: string;
  } = { id: undefined, logicRole: undefined, name: undefined };
  let picklistValues: RawEntity[] = [];
  if (!customRole && logicRole) {
    field = bobjectFields?.findByLogicRole(logicRole);
    picklistValues = bobjectPicklistFieldValues
      ?.all()
      .filter(
        entity =>
          entity.bobjectField === field?.id ||
          (field?.bobjectGlobalPicklist !== null &&
            entity.bobjectGlobalPicklist === field?.bobjectGlobalPicklist),
      );
  } else {
    const globalPicklist = globalPicklists?.findByLogicRole(globalPicklistRole);
    picklistValues =
      bobjectPicklistFieldValues && globalPicklist
        ? bobjectPicklistFieldValues.filterBy('bobjectGlobalPicklist', globalPicklist?.id)
        : [];
    field = {
      id: 'HISTORIC_ASSIGNED_TO',
      logicRole: 'HISTORIC_ASSIGNED_TO',
      name: 'Assigned To (historical)',
    };
  }

  picklistValues = picklistValues.filter(value => showHiddenValuesDashboards || value.enabled);

  const { filters } = useDashboardFilters();
  const value = filters ? filters[field?.id] : undefined;
  const finalField = {
    ...field,
    fieldValues: [...picklistValues.map(pic => ({ ...pic, label: pic.value, value: pic.id }))],
  };

  const [finalValue, setFinalValue] = useState(
    value ? { type: value.searchMode, value: value.query } : [],
  );

  const handleChange = (inputPickerValue: { type: string; value?: any }) => {
    const shouldUnsetFilter =
      !inputPickerValue.type ||
      ((inputPickerValue.type === 'NOT__SEARCH' || inputPickerValue.type === 'EXACT__SEARCH') &&
        (!inputPickerValue.value ||
          !inputPickerValue.value.length ||
          inputPickerValue.value === {})) ||
      inputPickerValue.type === '';
    if (shouldUnsetFilter) {
      onChange({ [field.id]: undefined });
      setFinalValue([]);
    } else {
      onChange({
        [field.id]: { searchMode: inputPickerValue.type, query: inputPickerValue.value },
      });
    }
  };

  useEffect(() => {
    if (!value) setFinalValue([]);
  }, [filters]);

  if (!field) return null;

  return (
    <InputPicker
      size="small"
      dataTest={field?.logicRole}
      defaultValue={finalValue}
      value={finalValue}
      onChange={handleChange}
      placeholder={field?.name}
      openDefaultValue={finalValue ? { type: undefined } : { type: 'EXACT__SEARCH' }}
      renderDisplayValue={newValue => renderDisplayValue(newValue, finalField)}
    >
      <InputPickerOption title="Is any of" type="EXACT__SEARCH">
        <MultiSelect
          width="100%"
          dataTest={`menu-category-${field?.name}`}
          autocomplete={picklistValues?.length > 8}
          placeholder={field?.name}
          size="medium"
        >
          {[
            ...(USER_GLOBAL_PICKLIST.includes(field?.logicRole)
              ? [
                  <CheckItem dataTest="menu-item-me" value="__me__" key="menu-item-me">
                    Me
                  </CheckItem>,
                ]
              : []),
            ...(picklistValues?.map(option => (
              <CheckItem
                value={option.id}
                dataTest={`menu-item-${option.id}`}
                key={`menu-item-${option.id}`}
                label={option.value}
              >
                {option.value}
              </CheckItem>
            )) || []),
          ]}
        </MultiSelect>
      </InputPickerOption>
      <InputPickerOption title="Is not" type="NOT__SEARCH">
        <Select value={null} variant="filters" autocomplete={picklistValues?.length > 8}>
          {picklistValues?.map(option => {
            return (
              <Item key={`option-${option?.id}`} value={option?.id} label={option?.value}>
                {option?.value}
              </Item>
            );
          })}
        </Select>
      </InputPickerOption>
      <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
      <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
    </InputPicker>
  );
};
