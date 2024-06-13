import { useController } from 'react-hook-form';
import { DateTimePicker } from '@bloobirds-it/flamingo-ui';
import { FormFieldProps } from '../baseInput/baseInput';
import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import styles from './dateField.module.css';

export const DateField = ({ control, required, name, id, size = 'small',requiredMessage }: FormFieldProps) => {
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

  return (
    <FormGroup size={size}>
      {size === 'small' && <FormLabel required={required}>{name}</FormLabel>}
      <div className={styles.datepicker}>
        <DateTimePicker
          value={value}
          placeholder={size === 'small' ? undefined : `${name}${required ? ' *' : ''}`}
          onChange={onChange}
          error={error?.message}
          width="100%"
          size={size}
        />
      </div>
    </FormGroup>
  );
};
