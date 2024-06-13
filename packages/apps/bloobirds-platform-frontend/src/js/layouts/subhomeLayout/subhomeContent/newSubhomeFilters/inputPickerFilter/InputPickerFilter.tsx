import React from 'react';
import { DoubleInput, Input, InputPicker, InputPickerOption } from '@bloobirds-it/flamingo-ui';
import { Filter, useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';
import {
  getBobjectFromLogicRole,
  getFieldIdByLogicRole,
} from '../../../../../utils/bobjects.utils';
import { useEntity } from '../../../../../hooks';

interface PropTypes {
  fieldLR: string;
  options: { [x: string]: string };
  showByDefault?: boolean;
  conditions?: { [field: string]: string };
}

const checkDisplayConditions = (
  showByDefault: boolean,
  conditions: Filter | { [x: string]: string[] },
  filterConditions: { [x: string]: string },
) => {
  const [field, value] = Object.entries(filterConditions)[0];
  if (showByDefault && !conditions[field]) return true;
  return conditions[field] === value || conditions[field]?.includes(value);
};

export const InputPickerFilter = ({
  fieldLR,
  options,
  showByDefault,
  conditions: filterConditions,
}: PropTypes) => {
  const {
    getFilterValue,
    setFilter,
    removeFilter,
    filters: { conditions },
  } = useSubhomeFilters();

  const bobjectFields = useEntity('bobjectFields');
  const shouldBeDisplayed =
    !filterConditions ||
    (conditions && checkDisplayConditions(showByDefault, conditions, filterConditions));

  const handleOnChange = (value: any) => {
    if (value?.type === '') {
      removeFilter(getFieldIdByLogicRole(bobjectFields, fieldLR));
    } else {
      setFilter(getBobjectFromLogicRole(fieldLR), fieldLR, value);
    }
  };
  let value = getFilterValue(fieldLR);
  if (Array.isArray(value)) value = { type: value[0], value: '' };

  return (
    <>
      {shouldBeDisplayed ? (
        <InputPicker variant="filters" value={value ?? {}} onChange={handleOnChange} {...options}>
          <InputPickerOption title="Is greater than" type="RANGE__SEARCH__GT">
            <Input type="number" placeholder="Is greater than..." width="90%" />
          </InputPickerOption>
          <InputPickerOption title="Is less than" type="RANGE__SEARCH__LT">
            <Input type="number" placeholder="Is less than..." width="90%" />
          </InputPickerOption>
          <InputPickerOption title="Is greater or equal than" type="RANGE__SEARCH__GTE">
            <Input type="number" placeholder="Is greater or equal than..." width="90%" />
          </InputPickerOption>
          <InputPickerOption title="Is less or equal than" type="RANGE__SEARCH__LTE">
            <Input type="number" placeholder="Is less or equal than..." width="90%" />
          </InputPickerOption>
          <InputPickerOption title="Between" type="RANGE__SEARCH__BETWEEN">
            <DoubleInput type="number" />
          </InputPickerOption>
          <InputPickerOption title="Contains exactly" type="EXACT__SEARCH">
            <Input type="number" placeholder="Contains exactly..." width="90%" />
          </InputPickerOption>
          <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
          <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
        </InputPicker>
      ) : (
        <></>
      )}
    </>
  );
};
