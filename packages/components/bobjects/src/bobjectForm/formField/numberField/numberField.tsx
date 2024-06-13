import { useController } from 'react-hook-form';

import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { FormFieldProps, Input } from '../baseInput/baseInput';

export const NumberField = ({
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

  const handleChange = newValue => {
    if (newValue === '' || newValue === '-' || newValue.match(/^-?[0-9,.]+$/)) {
      // Remove thousands separator
      newValue = newValue.replace(/,/g, '');
      newValue = newValue.replace(/\./g, '');
      // If the number is valid add the thousand separator
      newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      onChange(newValue);
    }
  };

  return (
    <FormGroup size={size}>
      {size === 'small' && <FormLabel required={required}>{name}</FormLabel>}
      <Input
        size={size}
        placeholder={size === 'small' ? undefined : `${name}${required ? ' *' : ''}`}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        error={error?.message}
        type="text"
      />
    </FormGroup>
  );
};
