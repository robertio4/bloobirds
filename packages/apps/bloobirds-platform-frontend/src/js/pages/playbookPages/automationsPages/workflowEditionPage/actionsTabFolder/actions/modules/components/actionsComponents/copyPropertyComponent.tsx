import React, { useEffect, useMemo } from 'react';

import { BOBJECT_TYPES } from '@bloobirds-it/types';

import { useBobjectFields } from '../../../../../../../../../hooks/useBobjectFields';
import { useWorkflow } from '../../../../../context/workflowsContext';
import { WORKFLOWS_ACTIONS_TYPES_KEYS } from '../../actions.constants';
import FieldToFieldSelect from '../modules/fieldToFieldSelect';

interface moduleActions {
  records: object[];
}

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

const CopyPropertyModule = ({
  blockIndex,
  action,
}: {
  blockIndex: number;
  action: moduleActions;
}) => {
  const {
    updateAction,
    isMissingInfo,
    state: { trigger },
  } = useWorkflow();

  const handleAddPosition = () => {
    action.records.push({
      originField: undefined,
      targetField: undefined,
    });
    updateAction(blockIndex, action);
  };

  const handleUpdateOrigin = (index: number, id: string) => {
    action.records[index].originFieldId = id;
    updateAction(blockIndex, action);
  };
  const handleUpdateTarget = (index: number, id: string) => {
    action.records[index].targetFieldId = id;
    updateAction(blockIndex, action);
  };

  const handleDeletePosition = (valueIndex: number) => {
    action?.records.splice(valueIndex, 1);
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
    action.type === WORKFLOWS_ACTIONS_TYPES_KEYS.COPY_PROPERTY_FOR_ALL_LEADS
      ? [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD]
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
          .filter(([id]) => !action?.records.includes(id))
          .map(([, field]) => field);
      });
      return filteredFields;
    }
    return [];
  }, [bobjectFields, action?.properties, trigger]);

  const findField = valueObject => {
    let allFields = {};
    const populatedObject = {};
    Object.keys(bobjectFields).forEach(bobjectType => {
      const relativeFields = bobjectFields[bobjectType];
      allFields = { ...allFields, ...relativeFields };
    });
    populatedObject.originFieldId = allFields[valueObject.originFieldId];
    populatedObject.targetFieldId = allFields[valueObject.targetFieldId];
    return populatedObject;
  };

  useEffect(() => {
    if (action?.records[0]?.targetFieldId) isMissingInfo(false);
  }, [action]);

  return (
    <>
      {action?.records.map((field, index) => (
        <FieldToFieldSelect
          key={`field-to-field-select-${field}`}
          index={index}
          onFieldArrayExtension={handleAddPosition}
          onFieldOriginUpdate={handleUpdateOrigin}
          onFieldTargetUpdate={handleUpdateTarget}
          onFieldDelete={handleDeletePosition}
          value={findField(field)}
          availableFields={availableBobjectFields}
          disableAddButton={
            !action?.records[index].targetFieldId || action?.records.length !== index + 1
          }
        />
      ))}
    </>
  );
};

export default CopyPropertyModule;
