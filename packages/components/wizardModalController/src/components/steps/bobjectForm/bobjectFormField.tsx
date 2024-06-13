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
import { useDataModel } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';

export const BobjectFormField = ({
  label,
  name,
  defaultValue,
  control,
  fieldBobjectType,
  required,
  handleOnChange,
  size = 'medium',
}: {
  label: string;
  name: string;
  defaultValue: any;
  control: any;
  fieldBobjectType?: BobjectTypes;
  required?: boolean;
  handleOnChange?: (fieldName, value, fieldBobjectType) => void;
  size?: 'small' | 'medium' | 'labeled';
}) => {
  const dataModel = useDataModel();
  let dataModelField = dataModel?.findFieldByLogicRole(name);
  if (!dataModelField) {
    dataModelField = dataModel?.findFieldById(name);
  }
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.bobjectForm' });
  const type = dataModelField?.fieldType;
  const picklistValues = dataModelField?.values;
  let formField = null;

  useEffect(() => {
    onChange(type !== 'DATE' && type !== 'DATETIME' ? defaultValue : new Date(defaultValue));
  }, [defaultValue]);

  const {
    field: { value, onChange: onChangeController },
    fieldState: { error },
  } = useController({
    control,
    name: name,
    defaultValue: defaultValue,
    rules: {
      required: {
        value: type != 'boolean' ? required : false,
        message: t('requiredMessage'),
      },
    },
  });

  const onChange = value => {
    handleOnChange?.(name, value, fieldBobjectType);
    onChangeController(value);
  };

  switch (type) {
    case 'TEXT':
    case 'EMAIL':
    case 'URL':
    case 'DOUBLE':
      formField = (
        <Input
          width="100%"
          name={name}
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChange}
          type={type === 'EMAIL' ? 'email' : type === 'URL' ? 'url' : 'text'}
          error={error?.message}
          defaultValue={defaultValue}
          value={value}
          size={size}
        />
      );
      break;
    case 'PICKLIST':
      formField = (
        <Select
          width="100%"
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChange}
          value={value}
          error={error?.message}
          autocomplete={picklistValues.length > 6}
          size={size}
          defaultValue={defaultValue}
        >
          <Item value="">{t('none')}</Item>
          {picklistValues.map(answer => (
            <Item key={answer.id} value={answer.id} label={answer.name}>
              {answer.name}
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
          onClick={onChange}
          defaultChecked={!!defaultValue}
        >
          <Text size="m">{label}</Text>
        </Checkbox>
      );
      break;
    case 'MULTI_PICKLIST':
      formField = (
        <MultiSelect
          autocomplete={picklistValues.length > 6}
          size="medium"
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChange}
          error={error?.message}
          value={value}
          width="100%"
        >
          {picklistValues.map(answer => (
            <CheckItem key={answer.id} value={answer.id} label={answer.name}>
              {answer.name}
            </CheckItem>
          ))}
        </MultiSelect>
      );
      break;
    case 'DATE':
    case 'DATETIME':
      formField = (
        <DateTimePicker
          width="100%"
          withTimePicker={type == 'DATETIME'}
          placeholder={`${label}${required ? ' *' : ''}`}
          onChange={onChange}
          error={error?.message}
          {...(defaultValue !== undefined && { defaultValue: new Date(defaultValue) })}
        />
      );
      break;
    case 'textarea':
      formField = (
        <TextArea
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={`${label}${required ? ' *' : ''}`}
          width="100%"
          minRows={3}
          maxRows={3}
          error={error?.message}
          value={value}
        />
      );
      break;
  }
  return formField;
};
