import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Item, Select, Tooltip } from '@bloobirds-it/flamingo-ui';

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
        <Select
          autocomplete={options.length > 6}
          size="medium"
          {...rest}
          value={rest?.value || getValues(name) || ''}
          renderDisplayValue={value => {
            return options?.find(option => option?.value === value)?.label;
          }}
        >
          {!props.required && (
            <Item value="">
              <em>None</em>
            </Item>
          )}
          {options.map(({ value, logicRole, label, missingRequiredInfo }) =>
            meetingFieldsRequiredEnabled && missingRequiredInfo && !value.includes('Lead') ? (
              <Item key={value} dataTest={logicRole || label} value={value} label={label} disabled>
                <Tooltip title="There's required information missing" position="top">
                  {label}
                </Tooltip>
              </Item>
            ) : (
              <Item key={value} dataTest={logicRole || label} value={value} label={label}>
                {label}
              </Item>
            ),
          )}
          )
        </Select>
      );
    },
    [props, options],
  );

  return <BaseField {...props} as={innerComponentGenerator} />;
};

export default DropdownField;
