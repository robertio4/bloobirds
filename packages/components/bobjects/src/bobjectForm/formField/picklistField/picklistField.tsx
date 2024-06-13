import { useEffect } from 'react';
import { useController } from 'react-hook-form';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { getUserId } from '@bloobirds-it/utils';

import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { FormFieldProps } from '../baseInput/baseInput';

export const PicklistField = ({
  control,
  required,
  logicRole,
  values,
  name,
  id,
  size = 'small',
  requiredMessage,
}: FormFieldProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `fields.${id}`,
    rules: {
      required: {
        value: required,
        message: requiredMessage,
      },
    },
  });

  useEffect(() => {
    if (logicRole === 'LEAD__ASSIGNED_TO') {
      getUserId().then(userId => {
        onChange(userId);
      });
    }
  }, [logicRole]);

  return (
    <FormGroup size={size}>
      {size === 'small' && <FormLabel required={required}>{name}</FormLabel>}
      <Select
        autocomplete={values?.length > 8}
        value={value}
        onChange={onChange}
        error={error?.message}
        borderless={false}
        placeholder={size === 'small' ? 'Select' : `${name}${required ? ' *' : ''}`}
        width="100%"
        size={size}
      >
        {values
          ?.filter(option => option?.enabled)
          .map(option => (
            <Item key={option.id} value={option.id}>
              {option.name}
            </Item>
          ))}
      </Select>
    </FormGroup>
  );
};
