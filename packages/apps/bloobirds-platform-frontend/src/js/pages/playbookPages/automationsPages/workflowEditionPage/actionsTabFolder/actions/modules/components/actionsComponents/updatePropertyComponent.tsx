import React, { useMemo } from 'react';
import FieldValueSelect from '../modules/fieldValueSelect';
import { UpdateProperty } from '../../../../../workflows.types';
import { useWorkflow } from '../../../../../context/workflowsContext';
import { useBobjectFields } from '../../../../../../../../../hooks/useBobjectFields';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { WORKFLOWS_ACTIONS_TYPES_KEYS } from '../../actions.constants';

const relatedBobjects = {
  Activity: [
    BOBJECT_TYPES.ACTIVITY,
    BOBJECT_TYPES.COMPANY,
    BOBJECT_TYPES.LEAD,
    BOBJECT_TYPES.OPPORTUNITY,
  ],
  Lead: [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD],
  Opportunity: [BOBJECT_TYPES.OPPORTUNITY, BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD],
  Task: [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.TASK, BOBJECT_TYPES.OPPORTUNITY],
  Company: [BOBJECT_TYPES.COMPANY],
};
const UpdatePropertyModule = ({
  blockIndex,
  action,
}: {
  blockIndex: number;
  action: UpdateProperty;
}) => {
  const {
    updateAction,
    isMissingInfo,
    state: { trigger, isEnabled },
  } = useWorkflow();

  const handleFieldIdChange = (prevId: string, newId: string) => {
    delete action?.properties[prevId];
    action.properties[newId] = undefined;
    updateAction(blockIndex, action);
  };

  const handleValueChange = (fieldId: string, value: any) => {
    action.properties[fieldId] = value;
    isMissingInfo(false);
    updateAction(blockIndex, action);
  };

  const handleDeletePair = (fieldId: string) => {
    delete action?.properties[fieldId];
    updateAction(blockIndex, action);
  };
  const totalBobjectFields = (relatedBobjectFields: string[]) => {
    const fields: any = {};
    relatedBobjectFields.forEach(bobjectType => {
      fields[bobjectType] = useBobjectFields(bobjectType)?.sections?.reduce(
        (acc: { [key: string]: any }, section: { fields: Array<any> }) => {
          section?.fields?.forEach(field => {
            acc = { ...acc, [field?.name]: field };
          });
          return { ...acc };
        },
        {},
      );
    });
    return fields;
  };
  const fieldTypes =
    action.type === WORKFLOWS_ACTIONS_TYPES_KEYS.UPDATE_PROPERTY_FOR_ALL_LEADS
      ? [BOBJECT_TYPES.LEAD]
      : relatedBobjects[trigger?.bobjectType];

  const bobjectFields = totalBobjectFields(fieldTypes);

  const availableBobjectFields = useMemo(() => {
    const isLoaded =
      Array.isArray(Object.keys(bobjectFields)) &&
      Object.keys(bobjectFields)
        .map(bobject => bobjectFields[bobject])
        .every(e => e, true);

    if (bobjectFields && isLoaded) {
      const filteredFields = {};
      Object.keys(bobjectFields).forEach(bobjectField => {
        filteredFields[bobjectField] = Object.entries(bobjectFields[bobjectField])
          .filter(([id]) => !Object.keys(action?.properties).includes(id))
          .map(([, field]) => field);
      });
      return filteredFields;
    }
    return [];
  }, [bobjectFields, action?.properties, trigger, action?.type]);

  const findField = fieldId => {
    let allfields = {};
    Object.keys(bobjectFields).forEach(bobjectType => {
      const realiveFields = bobjectFields[bobjectType];
      allfields = { ...allfields, ...realiveFields };
    });
    return allfields[fieldId];
  };

  return (
    <>
      {Object.entries(action?.properties).map(([fieldId, value], index) => (
        <FieldValueSelect
          key={`field-value-select-${fieldId}`}
          onFieldIdChange={handleFieldIdChange}
          onValueChange={handleValueChange}
          onFieldDeleted={handleDeletePair}
          fieldId={fieldId}
          value={value}
          index={index}
          selectedField={availableBobjectFields && findField(fieldId)}
          availableFields={availableBobjectFields}
          disableAddButton={fieldId === ''}
          isEnabled={isEnabled}
          showAddButton={index === Object.keys(action?.properties).length - 1}
        />
      ))}
    </>
  );
};

export default UpdatePropertyModule;
