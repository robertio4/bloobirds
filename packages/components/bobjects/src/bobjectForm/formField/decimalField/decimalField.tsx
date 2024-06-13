import { useController } from 'react-hook-form';
import { FormFieldProps, Input } from '../baseInput/baseInput';
import { FormGroup, FormLabel } from '../../formGroup/formGroup';

export const DecimalField = ({ required, control, name, id, size = 'small', requiredMessage }: FormFieldProps) => {
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
        size={size}
        value={value}
        placeholder={size === 'small' ? undefined : `${name}${required ? ' *' : ''}`}
        onChange={onChange}
        onBlur={onBlur}
        error={error?.message}
        type="number"
      />
    </FormGroup>
  );
};
