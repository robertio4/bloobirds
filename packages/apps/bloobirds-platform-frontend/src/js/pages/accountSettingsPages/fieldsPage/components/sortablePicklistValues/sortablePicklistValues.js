import React, { useState } from 'react';
import { SortableList, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import styles from '../../styles/fieldsPage.module.css';
import { PicklistValue } from '../picklistValue/picklistValue';
import classNames from 'clsx';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

const NOT_CREABLE_VALUES_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  LEAD_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
];

export const SortablePicklistValues = ({
  values,
  setValues,
  filteredValues,
  setFilteredValues,
  fieldOrGlobal,
}) => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const { createToast } = useToasts();

  const editValuePicklist = value => {
    const newValues = values;
    const newFilteredValues = filteredValues;
    const posOnValues = newValues
      ?.map(v => {
        return v?.id;
      })
      .indexOf(value?.id);
    const posOnFilteredValues = newFilteredValues
      ?.map(v => {
        return v?.id;
      })
      .indexOf(value?.id);
    newValues[posOnValues] = value;
    newFilteredValues[posOnFilteredValues] = value;
    setValues(newValues);
    setFilteredValues(setFilteredValues);
    setForceRefresh(!forceRefresh);
  };

  const removeValueFromPicklist = value => {
    const newValues = values.filter((v, i) => i !== value.index);
    setValues(newValues);
    setForceRefresh(!forceRefresh);
  };

  const addValueToPicklist = value => {
    const existingValue = values?.find(v => v.value === value.value);
    if (existingValue !== undefined && value) {
      createToast({ message: 'You cannot create two values with the same name', type: 'error' });
    } else if (!values || values.length === 0 || existingValue === undefined) {
      const newValues = [...values, value];
      setValues(newValues);
      setForceRefresh(!forceRefresh);
    }
  };

  return (
    <>
      <div className={styles._sortable_picklist_values_header}>
        <div className={styles._sortable_picklist_header_space} />
        <div className={styles._sortable_picklist_header_name}>
          <Text size={14} color="softPeanut">
            Name
          </Text>
        </div>
        <div className={styles._sortable_picklist_header_score}>
          <Text size={14} color="softPeanut">
            Score (Optional)
          </Text>
        </div>
      </div>
      <div
        className={classNames(styles._picklist_sortable_container, {
          [styles._picklist_sortable_list]: filteredValues.length === 0,
        })}
      >
        <SortableList
          data={filteredValues?.map((v, i) => ({ ...v, index: i }))}
          keyExtractor={value => value?.index.toString()}
          disabled={values.length !== filteredValues.length}
          onReorder={v => {
            const newValues = v.map((val, i) => ({ ...val, order: i }));
            setValues(newValues);
          }}
          renderItem={({
            item: picklistValue,
            innerRef,
            containerProps,
            handleProps,
            isDragging,
          }) => (
            <PicklistValue
              innerRef={innerRef}
              value={picklistValue}
              handleProps={handleProps}
              containerProps={containerProps}
              editValuePicklist={editValuePicklist}
              isCreation={false}
              removeValueFromPicklist={removeValueFromPicklist}
              addValueToPicklist={addValueToPicklist}
              isDragging={isDragging}
              fieldOrGlobal={fieldOrGlobal}
            />
          )}
        />
      </div>
      {!NOT_CREABLE_VALUES_FIELDS.includes(fieldOrGlobal?.logicRole) && (
        <PicklistValue isCreation addValueToPicklist={addValueToPicklist} />
      )}
    </>
  );
};
