import { useController } from 'react-hook-form';
import { FormFieldProps, Input } from '../baseInput/baseInput';
import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { TextArea } from '@bloobirds-it/flamingo-ui';
import { useTranslation } from "react-i18next";

interface TextAreaFieldProps extends FormFieldProps {
  minRows: number;
  maxRows: number;
  width: string;
  className: string;
}

export const TextAreaField = ({
  control,
  required,
  name,
  id,
  size = 'small',
  maxRows,
  minRows,
  className,
  width,
  requiredMessage
}: TextAreaFieldProps) => {

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
      <TextArea
        value={value}
        onChange={onChange}
        error={error?.message}
        minRows={minRows}
        maxRows={maxRows}
        width={width}
        className={className}
        placeholder={size === 'small' ? undefined : name}
      />
    </FormGroup>
  );
};
