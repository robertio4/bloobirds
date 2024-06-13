import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  CheckItem,
  DateTimePicker,
  Input,
  Item,
  MultiSelect,
  Select,
  Text,
  TextArea,
} from '@bloobirds-it/flamingo-ui';
import { CustomObjectField } from '@bloobirds-it/wizard-modal-context';

export const CustomObjectForm = ({
  label,
  name,
  type,
  picklistValues,
  defaultValue,
  control,
  required,
  styleProps,
}: CustomObjectField) => {
  let formField = null;
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.customObject' });

  useEffect(() => {
    onChangeController(type != 'boolean' ? defaultValue : !!defaultValue);
  }, [defaultValue]);

  const {
    field: { value, onChange: onChangeController },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: type != 'boolean' ? defaultValue : !!defaultValue,
    rules: {
      required: {
        value: type != 'boolean' ? required : false,
        message: t('requiredMessage'),
      },
    },
  });

  switch (type) {
    case 'phone':
    case 'email':
    case 'string':
    case 'url':
    case 'currency':
    case 'double':
    case 'percent':
    case 'encryptedstring':
      formField = (
        <Input
          width="100%"
          name={name}
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChangeController}
          type={type === 'email' ? 'email' : type === 'url' ? 'url' : 'text'}
          error={error?.message}
          defaultValue={defaultValue}
          value={value}
          {...styleProps}
          {...(styleProps.height && { height: undefined })}
        />
      );
      break;
    case 'picklist':
      formField = (
        <Select
          width="100%"
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChangeController}
          defaultValue={defaultValue}
          value={value}
          error={error?.message}
          autocomplete={picklistValues.length > 6}
          {...styleProps}
        >
          <Item value="none">{t('none')}</Item>
          {picklistValues.map(answer => (
            <Item
              key={answer.value}
              hidden={!answer.active}
              value={answer.value}
              label={answer.label}
            >
              {answer.label}
            </Item>
          ))}
        </Select>
      );
      break;
    case 'boolean':
      formField = (
        <Checkbox
          size={'small'}
          disableHoverStyle
          onClick={onChangeController}
          defaultChecked={!!defaultValue}
          {...styleProps}
        >
          <Text size="m">{label}</Text>
        </Checkbox>
      );
      break;
    case 'multipicklist':
      formField = (
        <MultiSelect
          autocomplete={picklistValues.length > 6}
          size="medium"
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChangeController}
          error={error?.message}
          value={value}
          width="100%"
          {...styleProps}
        >
          {picklistValues.map(answer => (
            <CheckItem key={answer.value} value={answer.value} label={answer.label}>
              {answer.value}
            </CheckItem>
          ))}
        </MultiSelect>
      );
      break;
    case 'date':
    case 'datetime':
      formField = (
        <DateTimePicker
          width="100%"
          withTimePicker={type == 'datetime'}
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChangeController}
          defaultValue={defaultValue ? new Date(defaultValue) : null}
          error={error?.message}
          value={value ? new Date(value) : null}
          {...styleProps}
        />
      );
      break;
    case 'textarea':
      formField = (
        <TextArea
          onChange={onChangeController}
          defaultValue={defaultValue}
          placeholder={`${label}${required ? ' *' : ''}`}
          width="100%"
          minRows={3}
          maxRows={3}
          error={error?.message}
          value={value}
          {...styleProps}
        />
      );
      break;
  }
  return formField;
};
