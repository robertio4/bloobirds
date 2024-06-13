import React from 'react';
import { Radio, RadioGroup } from '@bloobirds-it/flamingo-ui';
import { useImportForm } from '../../hooks/useImportForm';
import { ImportAction } from '../../types/imports';

export const ImportOptionsSection = () => {
  const { action, setAction } = useImportForm();
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RadioGroup
          defaultValue={action}
          onChange={act => setAction((act as unknown) as ImportAction)}
          dataTest="radio-group-element"
        >
          <Radio value={ImportAction.CREATE} dataTest="radio-create">
            Create new objects
          </Radio>
          <Radio value={ImportAction.UPDATE} dataTest="radio-update">
            Update existing objects
          </Radio>
          <Radio value={ImportAction.DELETE} dataTest="radio-delete">
            Delete existing objects
          </Radio>
        </RadioGroup>
      </div>
    </>
  );
};
