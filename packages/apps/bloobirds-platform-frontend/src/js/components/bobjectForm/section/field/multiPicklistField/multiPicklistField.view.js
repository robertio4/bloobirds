import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckItem, MultiSelect, Tooltip } from '@bloobirds-it/flamingo-ui';

import usePicklistFormField from '../../../../../hooks/usePicklistFormField';
import { useUserSettings } from '../../../../userPermissions/hooks';
import { BaseField } from '../baseField/baseField.view';

const DropdownField = props => {
  const name = props.logicRole || props.name;
  const { getValues } = useFormContext();
  const { options } = usePicklistFormField({
    fieldValues: props?.fieldValues,
    name,
    defaultValues: props?.defaultValues,
    fieldType: props?.type,
    fieldLogicRole: props?.logicRole,
  });
  const config = useUserSettings();
  const meetingFieldsRequiredEnabled = config?.settings.meetingFieldsRequiredEnabled;
  if (props.hideActivityType && props.logicRole === 'ACTIVITY__TYPE') {
    return null;
  }

  const innerComponentGenerator = useCallback(
    rest => {
      return (
        <MultiSelect
          autocomplete={options.length > 6}
          size="medium"
          {...rest}
          value={rest?.value || getValues(name) || ''}
        >
          {!props.required && <CheckItem value="">None</CheckItem>}
          {options.map(({ value, logicRole, label, missingRequiredInfo }) =>
            meetingFieldsRequiredEnabled && missingRequiredInfo ? (
              <CheckItem
                key={value}
                dataTest={logicRole || label}
                value={value}
                label={label}
                disabled
              >
                <Tooltip title="There's required information missing" position="top">
                  {label}
                </Tooltip>
              </CheckItem>
            ) : (
              <CheckItem key={value} dataTest={logicRole || label} value={value} label={label}>
                {label}
              </CheckItem>
            ),
          )}
        </MultiSelect>
      );
    },
    [props, options],
  );

  return <BaseField {...props} as={innerComponentGenerator} />;
};

export default DropdownField;
