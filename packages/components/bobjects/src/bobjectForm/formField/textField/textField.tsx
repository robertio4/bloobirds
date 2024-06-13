import { useController } from 'react-hook-form';

import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { FormFieldProps, Input } from '../baseInput/baseInput';

export const TextField = ({
  control,
  required,
  name,
  id,
  size = 'small',
  requiredMessage,
}: FormFieldProps) => {
  const {
    field: { value, onChange, onBlur },
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

  return (
    <FormGroup size={size}>
      {size === 'small' && <FormLabel required={required}>{name}</FormLabel>}
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error?.message}
        size={size}
        placeholder={size === 'small' ? undefined : `${name}${required ? ' *' : ''}`}
      />
    </FormGroup>
  );
};
