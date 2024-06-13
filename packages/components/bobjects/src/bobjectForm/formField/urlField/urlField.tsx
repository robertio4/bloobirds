import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { FormFieldProps, Input } from '../baseInput/baseInput';

export const URLField = ({ control, required, name, id, size = 'small', requiredMessage }: FormFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    control,
    name: `fields.${id}`,
    rules: {
      pattern: {
        value: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        message: 'Invalid URL',
      },
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
