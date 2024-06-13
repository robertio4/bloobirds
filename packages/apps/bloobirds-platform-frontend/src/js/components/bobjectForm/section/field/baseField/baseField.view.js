import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Tooltip } from '@bloobirds-it/flamingo-ui';

import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/opportunity';
import { PRODUCT_FIELDS_LOGIC_ROLE } from '../../../../../constants/product';

const DISABLED_FIELDS_LOGIC_ROLE = [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT];

const HIDED_FIELDS_LOGIC_ROLE = [
  PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRODUCT_ID,
  PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ID,
  PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ENTRY_ID,
];

export function groupFields(fieldConditionsByField) {
  return fieldConditionsByField.reduce((acc, value) => {
    acc[value.field.logicRole || value.field.name] = value.fieldValues.map(field => field.value);
    return acc;
  }, {});
}

export function getFieldsThatAreConditioned(fieldConditionsByField, modalBobjectType) {
  return fieldConditionsByField
    .filter(({ field }) => field.bobjectType === modalBobjectType)
    .map(({ field }) => field.logicRole || field.name);
}

export const BaseField = ({
  as,
  logicRole,
  validate,
  required,
  requiredBeforeMeeting,
  numberPrefix,
  name,
  width,
  label,
  satisfiesFieldCrossCondition,
  fieldConditionsByField,
  defaultPicklistValue,
  defaultValue,
  modalBobjectType,
  bobjectType: fieldBobjectType,
  hasProducts,
  hasFullSales,
  selectedCustomTask,
}) => {
  const { control, errors, watch, setValue, getValues } = useFormContext();
  const isDisabledField = DISABLED_FIELDS_LOGIC_ROLE.includes(logicRole);

  if (HIDED_FIELDS_LOGIC_ROLE.includes(logicRole)) {
    return null;
  }

  const ctField = selectedCustomTask?.fields.find(f => f.bobjectFieldId === name);

  if (fieldConditionsByField.length > 0 && !ctField) {
    const relatedFields = getFieldsThatAreConditioned(fieldConditionsByField, modalBobjectType);
    const values = watch(relatedFields);
    const grouped = groupFields(fieldConditionsByField);
    const hasRelatedFields = relatedFields.length > 0;
    const checkAllConditions = Object.keys(values).map(key => grouped[key].includes(values[key]));
    const satisfiesFieldCondition = checkAllConditions.every(value => value === true);

    if ((hasRelatedFields && !satisfiesFieldCondition) || !satisfiesFieldCrossCondition) {
      return null;
    }
  }

  const fieldName = logicRole || name;

  useEffect(() => {
    const currentValue = getValues(fieldName);
    if (!currentValue && (defaultPicklistValue || defaultValue)) {
      setValue(fieldName, defaultPicklistValue || defaultValue);
    }
  }, [defaultPicklistValue, defaultValue]);

  const ref = useRef();

  const controlName =
    requiredBeforeMeeting && modalBobjectType === 'Activity'
      ? `${fieldName}_FROM_${fieldBobjectType?.toUpperCase()}`
      : fieldName;

  // Scroll to error
  const errorMessage =
    errors[requiredBeforeMeeting && modalBobjectType === 'Activity' ? controlName : fieldName]
      ?.message;
  const firstError = Object.keys(errors)[0];
  useEffect(() => {
    if (errorMessage && firstError === fieldName) {
      ref.current.scrollIntoView({ behaviour: 'smooth', block: 'center' });
    }
  }, [errorMessage]);

  const mustBeRequired =
    modalBobjectType === 'Activity'
      ? required || requiredBeforeMeeting || ctField?.required
      : required;
  const inputWidth = !width
    ? 'calc(50% - 8px)'
    : width === '100%'
    ? '100%'
    : `calc(${width} - 8px)`;
  const itemElement = (
    <Controller
      name={requiredBeforeMeeting && modalBobjectType === 'Activity' ? controlName : fieldName}
      control={control}
      dataTest={logicRole || label}
      as={as}
      error={errorMessage}
      width="100%"
      adornment={numberPrefix}
      placeholder={`${label}${mustBeRequired ? ' *' : ''}`}
      disabled={hasFullSales && hasProducts ? isDisabledField : false}
      rules={{
        required: mustBeRequired && 'This field is required',
        validate: value => {
          if (validate && (required || value)) {
            return validate(value);
          }
          return true;
        },
      }}
    />
  );
  const showAmountTooltip = hasFullSales && isDisabledField && hasProducts;

  return (
    <div
      ref={ref}
      // eslint-disable-next-line no-nested-ternary
      style={{
        width: inputWidth,
      }}
    >
      {showAmountTooltip ? (
        <Tooltip
          title="This opportunity has at least one product added, so the amount can only be edited by modifying its products."
          position="top"
        >
          {itemElement}
        </Tooltip>
      ) : (
        itemElement
      )}
    </div>
  );
};
