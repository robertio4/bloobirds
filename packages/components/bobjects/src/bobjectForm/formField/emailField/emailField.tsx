import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { FormFieldProps, Input } from '../baseInput/baseInput';

export const EmailField = ({
  control,
  required,
  name,
  id,
  size = 'small',
  requiredMessage,
}: FormFieldProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.bobjectForm' });

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    control,
    name: `fields.${id}`,
    rules: {
      pattern: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: t('emailNotValid'),
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
        size={size}
        error={error?.message}
        placeholder={size === 'small' ? undefined : `${name}${required ? ' *' : ''}`}
      />
    </FormGroup>
  );
};
