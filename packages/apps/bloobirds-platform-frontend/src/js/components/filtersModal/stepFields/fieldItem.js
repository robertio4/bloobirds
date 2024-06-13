import React, { useState } from 'react';

import {
  CheckItem,
  DoubleInput,
  Input,
  InputPicker,
  InputPickerOption,
  Item,
  MultiSelect,
  RelativeDatePicker,
  Select,
} from '@bloobirds-it/flamingo-ui';

import {
  DATE_FIELD_TYPES,
  NON_VALUE_SEARCH_MODES,
  NUMBER_FIELD_FILTERS,
  NUMBER_FIELD_TYPES,
  PICKLIST_FIELD_TYPES,
  RELATIVE_DATES_OPTIONS,
  TEXT_FIELD_TYPES,
  USER_GLOBAL_PICKLIST,
} from '../../../constants/filtersModal';
import { useFiltersModalFilters } from '../../../hooks/useFiltersModal';
import { isAMatchValue } from '../../../pages/subhomePages/prospectingPage/moreFilters.utils';
import { SearchMode, SearchType } from '../../../typings/moreFilters';
import { renderDisplayValue } from '../../../utils/filtersModal.utils';
import { MultiSelectInput } from '../../filter/field/multiSelectInput';

const FieldItem = ({ field, value, onChange, picklistComponentType = 'InputPicker' }) => {
  const [search, setSearch] = useState('');
  const { parsedFilters } = useFiltersModalFilters();

  const isRelativeDate = date => Object.keys(RELATIVE_DATES_OPTIONS).includes(date);

  const getValue = name => {
    const element = parsedFilters?.find(filter => filter?.field.id === name);
    let newValue = null;
    if (Array.isArray(value)) {
      const firstItemValue = value[0];
      const type =
        firstItemValue?.searchType || firstItemValue?.type || firstItemValue?.searchMode || null;
      let parsedValue = firstItemValue?.query || null;
      if (type === SearchType.RANGE_BETWEEN) {
        parsedValue = {
          start: parsedValue?.gte || parsedValue?.start || null,
          end: parsedValue?.lte || parsedValue?.end || null,
        };
      }
      if (type === SearchType.RANGE_BETWEEN_DATES) {
        parsedValue = {
          type: firstItemValue?.type,
          start: parsedValue?.gte || new Date(parsedValue?.start) || null,
          end: parsedValue?.lte || new Date(parsedValue?.end) || null,
        };
      }

      if (isAMatchValue(firstItemValue)) {
        return {
          type: value[0],
          value: null,
        };
      }
      newValue = {
        type,
        value: parsedValue,
      };
    }
    return Array.isArray(value) ? newValue || element?.value : value;
  };

  const getTextFieldValue = (name, isPicklist = false) => {
    const fieldValue = getValue(name);
    const deserializeFieldValue = Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;
    let normalizedValue;
    if (deserializeFieldValue) {
      normalizedValue = { ...deserializeFieldValue };
    }
    if (normalizedValue) {
      let { type, searchValue, searchMode, query } = normalizedValue;
      type = type || searchMode || null;
      searchValue = searchValue || query || normalizedValue.value;

      if (type === SearchType.RANGE_BETWEEN_DATES) {
        if (typeof searchValue === 'string') {
          return {
            type,
            value: null,
          };
        }
        return {
          type,
          value: {
            type:
              normalizedValue?.value?.type ||
              (isRelativeDate(normalizedValue?.value) ? normalizedValue?.value : 'custom'),
            start:
              normalizedValue?.value?.start ||
              (!isRelativeDate(normalizedValue?.value)
                ? new Date(normalizedValue?.value?.split(',')[0])
                : ''),
            end:
              normalizedValue?.value?.end ||
              (!isRelativeDate(normalizedValue?.value)
                ? new Date(normalizedValue?.value?.split(',')[1])
                : ''),
          },
        };
      }
      if (type === SearchMode.EXACT) {
        return {
          type,
          value:
            Array.isArray(searchValue) && searchValue?.length <= 1 ? searchValue[0] : searchValue,
        };
      }
      if ([SearchType.RANGE_LT, SearchType.RANGE_LTE].includes(type)) {
        return {
          type,
          value: normalizedValue?.value?.end,
        };
      }
      if ([SearchType.RANGE_GT, SearchType.RANGE_GTE].includes(type)) {
        return {
          type,
          value: normalizedValue?.value?.start,
        };
      }

      if (
        searchMode === SearchMode.RANGE &&
        !!type &&
        Object.keys(NUMBER_FIELD_FILTERS).includes(type)
      ) {
        if (type === SearchType.RANGE_BETWEEN) {
          return {
            type,
            value: {
              start: searchValue[Object.keys(searchValue)[0]],
              end: searchValue[Object.keys(searchValue)[1]],
            },
          };
        }
        return {
          type,
          value: searchValue[Object.keys(searchValue)[0]],
        };
      }

      if (searchMode === SearchMode.RANGE && !!type) {
        return {
          type: SearchType.RANGE_BETWEEN_DATES,
          value: {
            type,
            start: searchValue?.gte,
            end: searchValue?.lte,
          },
        };
      }

      if (type) {
        return {
          type,
          value: searchValue,
        };
      }

      if (NON_VALUE_SEARCH_MODES.includes(normalizedValue)) {
        return {
          type: normalizedValue,
        };
      }

      return {
        type: isPicklist ? SearchMode.EXACT : SearchMode.AUTOCOMPLETE,
        value: searchValue || normalizedValue,
      };
    }

    return null;
  };
  const isAPicklist =
    PICKLIST_FIELD_TYPES.includes(field.type) && picklistComponentType === 'InputPicker';
  const fieldValue = getTextFieldValue(field.name, isAPicklist);

  return (
    <>
      {PICKLIST_FIELD_TYPES.includes(field.type) && picklistComponentType === 'InputPicker' && (
        <InputPicker
          size="medium"
          dataTest={field.logicRole}
          defaultValue={fieldValue}
          value={fieldValue}
          width={375}
          onChange={newValue => onChange(field, newValue)}
          placeholder={field.label}
          openDefaultValue={value ? {} : { type: 'EXACT__SEARCH' }}
          renderDisplayValue={newValue => renderDisplayValue(newValue, field)}
        >
          <InputPickerOption title="Is any of" type="EXACT__SEARCH">
            <MultiSelect
              sortByChecked={field?.fieldValues?.length > 8}
              width="100%"
              dataTest={`menu-category-${field.label}`}
              placeholder={field.label}
              size="medium"
              autocomplete={field?.fieldValues?.length > 8}
            >
              {USER_GLOBAL_PICKLIST.includes(field.logicRole) && (
                <CheckItem dataTest="menu-item-me" value="__me__">
                  Me
                </CheckItem>
              )}
              {field.fieldValues?.map(option => (
                <CheckItem
                  value={option.value}
                  dataTest={`menu-item-${option.label}`}
                  key={`menu-item-${option.value}`}
                >
                  {option.label}
                </CheckItem>
              ))}
            </MultiSelect>
          </InputPickerOption>
          <InputPickerOption title="Is not" type="NOT__SEARCH">
            <Select
              field={field}
              value={getValue(field.name)}
              variant="outlined"
              autocomplete={field?.fieldValues?.length > 8}
              onSearch={selectSearchValue => setSearch(selectSearchValue)}
            >
              {field.fieldValues?.map(option => {
                if (option.label.toLowerCase().includes(search.toLowerCase()))
                  return (
                    <Item key={`option-${option?.value}`} value={option?.value}>
                      {option?.label}
                    </Item>
                  );
              })}
            </Select>
          </InputPickerOption>
          <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
          <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
        </InputPicker>
      )}
      {PICKLIST_FIELD_TYPES.includes(field.type) && picklistComponentType === 'MultiSelect' && (
        <MultiSelectInput
          field={field}
          value={fieldValue}
          variant="outlined"
          onChange={newValue => onChange(field, newValue)}
        />
      )}
      {DATE_FIELD_TYPES.includes(field.type) && (
        <InputPicker
          size="medium"
          dataTest={field.logicRole}
          defaultValue={fieldValue}
          value={fieldValue}
          width={375}
          onChange={newValue => onChange(field, newValue)}
          placeholder={field.label}
          renderDisplayValue={newValue => renderDisplayValue(newValue, field)}
        >
          <InputPickerOption title="Range date" type="RANGE__SEARCH__BETWEEN__DATES">
            <RelativeDatePicker />
          </InputPickerOption>
          <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
          <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
        </InputPicker>
      )}
      {TEXT_FIELD_TYPES.includes(field.type) && (
        <InputPicker
          size="medium"
          dataTest={field.logicRole}
          defaultValue={fieldValue}
          value={fieldValue}
          width={375}
          onChange={newValue => onChange(field, newValue)}
          placeholder={field.label}
        >
          <InputPickerOption title="Contains" type="AUTOCOMPLETE__SEARCH">
            <Input placeholder="Contains..." />
          </InputPickerOption>
          <InputPickerOption title="Contains exactly" type="EXACT__SEARCH">
            <Input placeholder="Contains exactly..." />
          </InputPickerOption>
          <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
          <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
        </InputPicker>
      )}
      {NUMBER_FIELD_TYPES.includes(field.type) && (
        <InputPicker
          size="medium"
          dataTest={field.logicRole}
          defaultValue={fieldValue}
          value={fieldValue}
          width={375}
          onChange={newValue => onChange(field, newValue)}
          placeholder={field.label}
        >
          <InputPickerOption title="Is greater than" type="RANGE__SEARCH__GT">
            <Input type="number" placeholder="Is greater than..." />
          </InputPickerOption>
          <InputPickerOption title="Is less than" type="RANGE__SEARCH__LT">
            <Input type="number" placeholder="Is less than..." />
          </InputPickerOption>
          <InputPickerOption title="Is greater or equal than" type="RANGE__SEARCH__GTE">
            <Input type="number" placeholder="Is greater or equal than..." />
          </InputPickerOption>
          <InputPickerOption title="Is less or equal than" type="RANGE__SEARCH__LTE">
            <Input type="number" placeholder="Is less or equal than..." />
          </InputPickerOption>
          <InputPickerOption title="Between" type="RANGE__SEARCH__BETWEEN">
            <DoubleInput type="number" placeholder="Between..." />
          </InputPickerOption>
          <InputPickerOption title="Contains exactly" type="EXACT__SEARCH">
            <Input type="number" placeholder="Contains exactly..." />
          </InputPickerOption>
          <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
          <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
        </InputPicker>
      )}
    </>
  );
};

export default FieldItem;
