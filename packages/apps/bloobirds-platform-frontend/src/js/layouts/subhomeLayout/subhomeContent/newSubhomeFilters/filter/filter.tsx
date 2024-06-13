import React, { useEffect } from 'react';
import { FiltersBobjectTypes, useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';
import { BobjectField } from '../../../../../typings/bobjects';
import { MatchRows } from '../../../../../typings/subhomeFilters';
import { getBobjectFromLogicRole } from '../../../../../utils/bobjects.utils';
import { useEntity } from '../../../../../hooks';

interface FilterProps {
  children: React.ReactNode;
  fieldLR: string;
  defaultValue?: any;
  hasInputPickerChildren?: boolean;
}

const getFieldIdByLogicRole = (bobjectFields: any, fieldIdentification: string) => {
  const field = bobjectFields.find(
    (field: BobjectField) => field.logicRole === fieldIdentification,
  );
  return field?.id;
};

/**
 * @deprecated
 */
const Filter = ({
  children,
  defaultValue,
  fieldLR,
  hasInputPickerChildren = false,
}: FilterProps) => {
  if (!React.isValidElement(children)) return null;
  const bobjectFields = useEntity('bobjectFields');

  const { setFilter, getFilterValue, setHaveFiltersBeenChanged } = useSubhomeFilters();
  const bobjectType: FiltersBobjectTypes = getBobjectFromLogicRole(fieldLR);

  const isLogicRole = /[A-Z]*__[A-Z_]*/.test(fieldLR);
  const fieldId = isLogicRole ? getFieldIdByLogicRole(fieldLR, bobjectFields) : fieldLR;

  const value = getFilterValue(fieldId);

  //TODO this is a workaround for default fields that should be set in the default.
  useEffect(() => {
    if (defaultValue && !value) {
      setFilter(bobjectType, fieldId, defaultValue);
    }
  }, [defaultValue, value]);

  const handleOnChange = (value: string[]) => {
    setHaveFiltersBeenChanged(true);
    setFilter(bobjectType, fieldId, value);
  };
  const parsedValue = Array.isArray(value) && value.length === 0 ? '' : value;
  const parsedInputPickerValue = [MatchRows.EMPTY, MatchRows.FULL].includes(parsedValue)
    ? { type: parsedValue }
    : parsedValue;

  return (
    <>
      {React.cloneElement(children, {
        ...(children.props as any),
        placeholder:
          typeof children?.props?.placeholder === 'function'
            ? children.props.placeholder(parsedValue)
            : children.props.placeholder,
        value: hasInputPickerChildren ? parsedInputPickerValue : parsedValue || [],
        onChange: handleOnChange,
      })}
    </>
  );
};

export default Filter;
