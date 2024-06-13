import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { OPPORTUNITY_LEADS_LOGIC_ROLES } from '../constants/opportunity';

const OPPORTUNITY_LEADS_FIELDS = Object.values(OPPORTUNITY_LEADS_LOGIC_ROLES);

const usePicklistFormField = ({
  fieldValues: getFieldValues = () => undefined,
  name,
  defaultValues,
  fieldType,
  fieldLogicRole,
}) => {
  const { watch, setValue, getValues } = useFormContext();
  const values = getFieldValues();
  const filteredFieldValues = values?.filter(field => !field.deprecated);
  const sameObjectValues = filteredFieldValues?.map(value => ({
    ...value,
    conditions: value.conditions.filter(condition => !condition.isCrossBobject),
  }));
  const hasFieldConditions = sameObjectValues?.some(fieldValue => fieldValue.conditions.length > 0);
  const dependantFields = useMemo(
    () =>
      Array.from(
        new Set(
          sameObjectValues?.flatMap(value =>
            value.conditions.flatMap(
              condition => condition.requiredFieldLogicRole || condition.requiredFieldId,
            ),
          ),
        ),
      ),
    [sameObjectValues],
  );

  const getOptions = () => {
    if (!sameObjectValues) {
      return [];
    }
    if (hasFieldConditions) {
      const filteredValues = sameObjectValues.filter(fieldValue => {
        if (fieldValue.conditions.length > 0) {
          return fieldValue.conditions.some(
            ({ requiredFieldId, requiredFieldLogicRole, requiredValueId }) =>
              !watch(requiredFieldLogicRole || requiredFieldId) ||
              watch(requiredFieldLogicRole || requiredFieldId) === requiredValueId,
          );
        }
        if (defaultValues && fieldValue.value === defaultValues[name]) {
          return true;
        }
        return (
          fieldValue.logicRole !== 'ACTIVITY__TYPE__CADENCE' &&
          !Object.values(watch(dependantFields)).some(value => !!value)
        );
      });
      return filteredValues.length === 0 && sameObjectValues.length > 0
        ? sameObjectValues
        : filteredValues;
    }
    if (fieldType === 'Reference') {
      const filteredValues = OPPORTUNITY_LEADS_FIELDS.includes(name)
        ? sameObjectValues.filter(fieldValue => fieldValue?.stage === 'Sales')
        : sameObjectValues;
      return filteredValues.filter(fieldValue => {
        const currentValue = watch(fieldLogicRole);
        return currentValue === fieldValue?.value
          ? true
          : !Object.values(getValues())?.includes(fieldValue?.value);
      });
    }
    return sameObjectValues;
  };
  const options = getOptions();

  // If only 1 field conditions is meet the dropdown should select it by default
  useEffect(() => {
    if (hasFieldConditions && options?.length === 1) {
      setValue(name, options[0]?.value);
    }
  }, [getOptions()[0]?.value]);

  return {
    options,
  };
};

export default usePicklistFormField;
