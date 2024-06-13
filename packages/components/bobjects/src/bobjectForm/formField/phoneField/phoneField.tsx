import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { isValidPhone } from '@bloobirds-it/utils';

import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { FormFieldProps, Input } from '../baseInput/baseInput';

export const PhoneField = ({
  control,
  required,
  name,
  id,
  size = 'small',
  requiredMessage,
}: FormFieldProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.bobjectForm' });

  const isPhoneValid = value => {
    if (!value || value == '') {
      return true;
    }

    if (!isValidPhone(value)) {
      return t('phoneNotValid');
    }

    return true;
  };

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    control,
    name: `fields.${id}`,
    rules: {
      validate: { isPhoneValid },
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
