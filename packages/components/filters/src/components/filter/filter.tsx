import React from 'react';
import { useTranslation } from 'react-i18next';

import { CheckItem, Item, MultiSelect, Select } from '@bloobirds-it/flamingo-ui';
import { useActiveUserId } from '@bloobirds-it/hooks';
import {
  BobjectField,
  BobjectPicklistValueEntity,
  Filter as FilerType,
  FiltersBobjectTypes,
} from '@bloobirds-it/types';
import { getBobjectFromLogicRole } from '@bloobirds-it/utils';
import { TFunction } from 'i18next';
import sortBy from 'lodash/sortBy';

import { useFilters } from '../../hooks';
import styles from '../filter.module.css';

interface FilterOptions {
  styles?: Partial<CSSStyleDeclaration>;
  autocomplete?: boolean;
  renderDisplayValue: (value: string | string[]) => string;
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
  fieldBySort?: string;
  sortDisabled?: boolean;
}

const getItemProps = (
  fieldLR: string,
  value: string | string[],
  isMultiselect: boolean,
  isAssignedTo: boolean,
  t: TFunction,
) => {
  let placeholder;
  if (Array.isArray(value) && isMultiselect) {
    value = value.filter((item: string) => item !== undefined);
  }
  const userId = useActiveUserId();
  if (isAssignedTo && (!value || value === userId || value?.[0] === userId)) {
    placeholder = t('leftBar.filters.me');
    value = [];
  }
  return { ...(placeholder ? { placeholder } : {}), value: value ?? (isMultiselect ? [] : '') };
};

const checkDisplayConditions = (
  showByDefault: boolean,
  conditions: FilerType | { [x: string]: string[] },
  strictConditions: boolean,
  filterConditions: { [x: string]: string },
) => {
  const [field, value] = Object.entries(filterConditions)[0];
  if (showByDefault && !conditions[field]) return true;
  if (strictConditions) {
    const selectedConditions = conditions[field];
    // @ts-ignore
    return selectedConditions?.length === 1 ? selectedConditions[0] === value : false;
  } else {
    // @ts-ignore
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
const Filter = ({
  fieldLR,
  placeholder,
  values,
  conditions: filterConditions,
  strictConditions = false,
  isMultiselect = false,
  showByDefault = false,
  options,
  fieldBySort = 'value',
  sortDisabled = false,
}: FilterProps) => {
  const {
    setFilter,
    getFilterValue,
    filters: { conditions },
  } = useFilters();
  const { t } = useTranslation();
  const bobjectType: FiltersBobjectTypes = getBobjectFromLogicRole(fieldLR);
  const value = getFilterValue(fieldLR);
  const isAssignedTo = fieldLR.includes('ASSIGNED') || fieldLR.includes('USER');
  const itemComponentsCreated = React.isValidElement(Array.isArray(values) && values[0]);
  const shouldBeDisplayed =
    !filterConditions ||
    (conditions &&
      checkDisplayConditions(showByDefault, conditions, strictConditions, filterConditions));
  const itemProps = getItemProps(fieldLR, value, isMultiselect, isAssignedTo, t);

  const handleOnChange = (value: string[]) => {
    setFilter(bobjectType, fieldLR, value);
  };

  const getItems = () => {
    if (sortDisabled) {
      return values;
    }
    return sortBy(values, fieldBySort);
  };

  return (
    <div className={styles.filter_wrapper}>
      {shouldBeDisplayed ? (
        isMultiselect ? (
          <MultiSelect
            placeholder={placeholder}
            value={value ?? []}
            onChange={handleOnChange}
            size="small"
            variant="filters"
            selectAllOption
            allOptionLabel={t('common.all')}
            autocomplete={values?.length > 8}
            {...itemProps}
            {...options}
          >
            {itemComponentsCreated
              ? ((values as unknown) as JSX.Element[])
              : sortBy(values, fieldBySort)?.map((item: BobjectField) => (
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
              : getItems()?.map((item: BobjectField) => (
                  <Item key={item.id} value={item.id}>
                    {item.value || item?.name}
                  </Item>
                ))}
          </Select>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Filter;
