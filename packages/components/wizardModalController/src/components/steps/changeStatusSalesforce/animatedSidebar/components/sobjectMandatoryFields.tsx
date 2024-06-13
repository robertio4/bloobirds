import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { Sobject } from '@bloobirds-it/utils';
import { CustomObjectField } from '@bloobirds-it/wizard-modal-context';

import { CustomObjectForm } from '../../../customObject/customObjectForm';

export const SobjectMandatoryFields = ({
  iconName,
  title,
  statuses,
  sobject,
  selectedStatus,
  width,
  error,
}: {
  title: string;
  statuses: CustomObjectField[];
  sobject: Sobject;
  selectedStatus: string;
  iconName: IconType;
  width?: string;
  error?: string;
}) => {
  const { control, watch } = useFormContext();
  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', marginRight: '-24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Icon name={iconName} color="softPeanut" size={16} />
          <Text size="xs">{title}</Text>
        </div>
        {error && (
          <Tooltip title={error} position="top">
            <Icon name="infoFilled" color="tomato" size={16} />
          </Tooltip>
        )}
      </div>
      {statuses.map(field => {
        return (
          <CustomObjectForm
            key={`${sobject}.${selectedStatus}.${field.name}`}
            control={control}
            {...field}
            name={`${sobject}.${selectedStatus}.${field.name}`}
            styleProps={{
              size: 'small',
              width: width || '180px',
              height: field.type !== 'textarea' ? '34px' : undefined,
            }}
            defaultValue={
              watch('salesforceLiveFieldsValues')?.get(sobject)?.[selectedStatus]?.[field.name]
            }
          />
        );
      })}
    </div>
  );
};
