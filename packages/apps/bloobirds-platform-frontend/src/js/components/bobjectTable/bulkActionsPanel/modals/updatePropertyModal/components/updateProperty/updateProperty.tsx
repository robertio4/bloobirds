import React, { useEffect } from 'react';
import { isObject } from 'lodash';
import { AddProperty } from '../components';
import styles from './updatePropertyValue.module.css';
import { BobjectType } from '../../../../../../../typings/bobjects';
import { useBobjectFields } from '../../../../../../../hooks/useBobjectFields';
import { useInternalUpdateProperty } from './useInternalUpdateProperty';
import { PropertyRow } from './propertyRow';
import { availableFieldType, defaultAvailableFieldType } from './utils';

/**
 * Update Property Component: contains a list of properties and the add property button.
 * With help of the hook useInternalUpdatePropertyModal, it handles the selected properties and
 * whether the add button should be disabled or not.
 *
 * @constructor
 */
export const UpdateProperty = ({ bobjectType }: { bobjectType: BobjectType }) => {
  const {
    initBobjectFields,
    shouldDisableButton,
    indexedFields,
    addSelectField,
  } = useInternalUpdateProperty();

  // GET BOBJECT FIELDS AND INIT AVAILABLE FIELDS & ADDED FIELDS
  const bobjectFieldsData = useBobjectFields(bobjectType);
  const isobject = isObject(bobjectFieldsData) && Object.keys(bobjectFieldsData).length > 0;
  useEffect(() => {
    if (isobject) {
      // TODO to support related bobjects uncomment and pass bobjectTypes to initBobjectFields
      //  const relatedBobjects = relatedBobjectTypes[bobjectType];
      //  const bobjectTypes = relatedBobjects ? [bobjectType].concat(relatedBobjects) : [bobjectType];
      initBobjectFields(bobjectFieldsData, [bobjectType]);
    }
  }, [bobjectType, isobject]);

  return (
    <div className={styles._update_property_wrapper_with_button}>
      <div className={styles._update_property_wrapper}>
        {Object.keys(indexedFields).map((id: string) => {
          const field: availableFieldType = indexedFields[Number(id)]
            ? { ...defaultAvailableFieldType, ...indexedFields[Number(id)] }
            : defaultAvailableFieldType;
          return (
            <div key={`property-row-${id}`}>
              <PropertyRow id={Number(id)} field={field} />
            </div>
          );
        })}
      </div>
      <AddProperty isDisabled={shouldDisableButton} onClick={() => addSelectField()} />
    </div>
  );
};
