import React from 'react';
import { CheckItem, Item, MultiSelect, Select } from '@bloobirds-it/flamingo-ui';
import { sortBy } from 'lodash';
import {
  Filter,
  FiltersBobjectTypes,
  useSubhomeFilters,
} from '../../../../../hooks/useSubhomeFilters';
import { BobjectField } from '../../../../../typings/bobjects';
import { getBobjectFromLogicRole } from '../../../../../utils/bobjects.utils';
import SessionManagerFactory from '../../../../../misc/session';
import { BobjectPicklistValueEntity } from '../../../../../typings/entities.js';

interface FilterOptions {
  styles?: Partial<CSSStyleDeclaration>;
  autocomplete?: boolean;
}

/**
 *   **fieldLR**: string; <br>
 *   **placeholder**: string; <br>
 *   **values**: BobjectField[] | Partial<BobjectField>[]; <br>
 *   **hasInputPickerChildren**?: boolean; <br>
 *   **conditions**?: { [field: string]: string }; <br>
 *   **isCondition**?: boolean; <br>
 *   **isMultiselect**?: boolean; <br>
 *   **showByDefault**?: boolean; <br>
 */
interface FilterProps {
  fieldLR: string;
  placeholder: string;
  values?: BobjectField[] | BobjectPicklistValueEntity[] | Omit<BobjectField, 'name' | 'type'>[];
  hasInputPickerChildren?: boolean;
  conditions?: { [field: string]: string };
  //TODO shouldn't be needed
  strictConditions?: boolean;
  isCondition?: boolean;
  isMultiselect?: boolean;
  showByDefault?: boolean;
  options?: FilterOptions;
}

const SessionManager = SessionManagerFactory();

const getItemProps = (
  fieldLR: string,
  value: string | string[],
  isMultiselect: boolean,
  isAssignedTo: boolean,
) => {
  let placeholder;
  if (Array.isArray(value) && isMultiselect) {
    value = value.filter((item: string) => item !== undefined);
  }
  const userId = SessionManager.getUser()?.id;
  if (isAssignedTo && (!value || value === userId || value?.[0] === userId)) {
    placeholder = 'Me';
    value = [];
  }
  return { ...(placeholder ? { placeholder } : {}), value: value ?? (isMultiselect ? [] : '') };
};

const checkDisplayConditions = (
  showByDefault: boolean,
  conditions: Filter | { [x: string]: string[] },
  strictConditions: boolean,
  filterConditions: { [x: string]: string },
) => {
  const [field, value] = Object.entries(filterConditions)[0];
  if (showByDefault && !conditions[field]) return true;
  if (strictConditions) {
    const selectedConditions = conditions[field];
    return selectedConditions?.length === 1 ? selectedConditions[0] === value : false;
  } else {
    return conditions[field] === value || conditions[field]?.includes(value);
  }
};

/**
 * NewFilter Component: renders select / multiselect with the values passed, and
 * sets the filter depending on the passed field logic role.
 *
 * param **fieldLR** <br>
 * param **placeholder** <br>
 * param **values** <br>
 * param **conditions**: only necessary if this depends on another filter <br>
 * param **isCondition**: true if other fields should display depending on this value <br>
 * param **isMultiselect**: if missing, component will be a select <br>
 * param **showByDefault**: only necessary if it is conditioned field
 */
const NewFilter = ({
  fieldLR,
  placeholder,
  values,
  conditions: filterConditions,
  isCondition,
  strictConditions = false,
  isMultiselect = false,
  showByDefault = false,
  options,
}: FilterProps) => {
  const {
    setFilter,
    getFilterValue,
    filters: { conditions },
  } = useSubhomeFilters();
  const bobjectType: FiltersBobjectTypes = getBobjectFromLogicRole(fieldLR);
  const value = getFilterValue(fieldLR);
  const isAssignedTo = fieldLR.includes('ASSIGNED') || fieldLR.includes('USER');
  const itemComponentsCreated = React.isValidElement(Array.isArray(values) && values[0]);
  const shouldBeDisplayed =
    !filterConditions ||
    (conditions &&
      checkDisplayConditions(showByDefault, conditions, strictConditions, filterConditions));
  const itemProps = getItemProps(fieldLR, value, isMultiselect, isAssignedTo);

  const handleOnChange = (value: string[]) => {
    setFilter(bobjectType, fieldLR, value);
    //TODO field conditioned filters
    // if (isCondition) setFilterConditions();
    // and set condition
  };

  return (
    <>
      {shouldBeDisplayed ? (
        isMultiselect ? (
          <MultiSelect
            placeholder={placeholder}
            value={value ?? []}
            onChange={handleOnChange}
            size="small"
            variant="filters"
            selectAllOption
            autocomplete={values?.length > 8}
            {...itemProps}
            {...options}
          >
            {sortBy(values, 'value')?.map(item => (
              <CheckItem key={item.id} value={item.id}>
                {item?.name ? item?.name : item?.value}
              </CheckItem>
            ))}
          </MultiSelect>
        ) : (
          <Select
            size="small"
            variant="filters"
            placeholder={placeholder}
            value={value ?? ''}
            onChange={handleOnChange}
            autocomplete={values?.length > 8}
            {...options}
          >
            {itemComponentsCreated
              ? values
              : sortBy(values, 'value')?.map(item => (
                  <Item key={item.id} value={item.id}>
                    {item.value || item?.name}
                  </Item>
                ))}
          </Select>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default NewFilter;
