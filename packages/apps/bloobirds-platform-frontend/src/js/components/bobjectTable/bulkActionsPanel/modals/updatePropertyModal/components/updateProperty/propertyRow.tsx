import React, { useState } from 'react';
import { IconButton } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import { useInternalUpdateProperty } from './useInternalUpdateProperty';
import styles from './updatePropertyValue.module.css';
import { SelectProperty } from './selectProperty';
import { InputValue } from './inputValue';
import { availableFieldType } from './utils';

export const PropertyRow = ({ id, field }: { id: number; field: availableFieldType }) => {
  const { deleteRow, disableDeleteRowButton } = useInternalUpdateProperty();
  const [showErrorOrWarning, setShowErrorOrWarning] = useState(false);

  const updateShowErrorOrWarning = (isErrorOrWarning: boolean) => {
    if (showErrorOrWarning !== isErrorOrWarning) {
      setShowErrorOrWarning(isErrorOrWarning);
    }
  };

  return (
    <div key={`row-property-${id}`} className={styles._update_property_row_wrapper}>
      <div
        className={clsx(styles._update_property_column_wrapper, {
          [styles._update_property_warning_input_wrapper]: showErrorOrWarning,
        })}
      >
        <SelectProperty id={Number(id)} field={field} />
        <InputValue
          id={Number(id)}
          field={field}
          setShowErrorOrWarning={updateShowErrorOrWarning}
        />
      </div>
      <div className={styles._update_property_delete_row_wrapper}>
        {!disableDeleteRowButton() && (
          <IconButton
            name={'cross'}
            onClick={() => deleteRow(Number(id))}
            disabled={field.blocked}
          />
        )}
      </div>
    </div>
  );
};
