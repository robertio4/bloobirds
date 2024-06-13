import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes, LogicRoleType } from '@bloobirds-it/types';
import { getFieldById, getValueFromLogicRole } from '@bloobirds-it/utils';

import {
  CallResultBobjectType,
  FieldFromWizard,
} from '../../../../modals/contactFlowModal/hooks/useContactFlowData';
import { BobjectFormField } from '../../../bobjectForm/bobjectFormField';
import styles from '../../callResult.module.css';

export const UpdatePropertySection = ({
  fields,
  bobjects,
  handleOnChange,
  propertyUpdateRef,
}: {
  fields: FieldFromWizard[];
  bobjects: Record<CallResultBobjectType, Bobject>;
  handleOnChange: (fieldName, value, fieldBobjectType) => void;
  propertyUpdateRef: React.MutableRefObject<HTMLDivElement>;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.callResult.updateProperty',
  });

  const { control } = useForm();

  return (
    <div ref={propertyUpdateRef} className={styles._update_property_wrapper}>
      <Text size="m" weight="medium" color="peanut">
        {t('title')}
      </Text>
      <div>
        {fields
          ?.filter(field => !!bobjects?.[field?.fieldBobjectType])
          ?.map(field => {
            const defaultValue =
              getValueFromLogicRole(
                bobjects?.[field?.fieldBobjectType],
                field.name as LogicRoleType<BobjectTypes>,
              ) ||
              getFieldById(bobjects?.[field?.fieldBobjectType], field.name)?.value ||
              field?.defaultValue;

            return (
              <BobjectFormField
                key={field.name}
                name={field.name}
                label={field.label}
                required={field.required}
                fieldBobjectType={field.fieldBobjectType}
                defaultValue={defaultValue}
                control={control}
                handleOnChange={handleOnChange}
                size="small"
              />
            );
          })}
      </div>
    </div>
  );
};
