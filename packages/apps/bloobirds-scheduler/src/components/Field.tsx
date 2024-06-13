import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input, TextArea } from '@bloobirds-it/flamingo-ui';

interface EmailFieldProps {
  id: string;
  control: any;
  required?: boolean;
  name: string;
  isEmail?: boolean;
  isTextArea?: boolean;
}

export const Field = ({
  id,
  control,
  required = false,
  name,
  isEmail = false,
  isTextArea = false,
}: EmailFieldProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler.guests' });

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    control,
    name: id,
    rules: {
      ...(isEmail && {
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: t('invalidEmailError'),
        },
      }),
      required: {
        value: required,
        message: t('fieldRequired'),
      },
    },
  });

  return (
    <>
      {isTextArea ? (
        <TextArea
          value={value}
          minRows={3}
          placeholder={`${name}${required ? ' *' : ''}`}
          width="100%"
          onChange={onChange}
          autoScroll
        />
      ) : (
        <Input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error?.message}
          placeholder={`${name}${required ? ' *' : ''}`}
          width="100%"
        />
      )}
    </>
  );
};
