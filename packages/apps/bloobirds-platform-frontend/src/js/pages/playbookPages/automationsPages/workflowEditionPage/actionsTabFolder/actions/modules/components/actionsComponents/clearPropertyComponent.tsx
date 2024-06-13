import React, { useEffect, useMemo } from 'react';
import ClearPropertySelect from '../modules/clearPropertySelect';
import { ClearProperty } from '../../../../../workflows.types';
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

const ClearPropertyModule = ({
  blockIndex,
  action,
}: {
  blockIndex: number;
  action: ClearProperty;
}) => {
  const {
    updateAction,
    isMissingInfo,
    state: { trigger },
  } = useWorkflow();

  const handleAddPosition = () => {
    action.bobjectFieldIds.push('');
    updateAction(blockIndex, action);
  };

  const handleUpdatePosition = (index: number, id: string) => {
    action.bobjectFieldIds[index] = id;
    updateAction(blockIndex, action);
  };

  const handleDeletePosition = (valueIndex: number) => {
    action?.bobjectFieldIds.splice(valueIndex, 1);
    updateAction(blockIndex, action);
  };

  const totalBobjectFields = (relatedBobjectFields: string[]) => {
    const fields: any = {};
    relatedBobjectFields?.forEach(bobjectType => {
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
    action.type === WORKFLOWS_ACTIONS_TYPES_KEYS.CLEAR_PROPERTY_FOR_ALL_LEADS
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
          .filter(([id]) => !action?.bobjectFieldIds?.includes(id))
          .map(([, field]) => field);
      });
      return filteredFields;
    }
    return [];
  }, [bobjectFields, action?.properties, trigger]);

  const findField = fieldId => {
    let allfields = {};
    Object.keys(bobjectFields).forEach(bobjectType => {
      const realiveFields = bobjectFields[bobjectType];
      allfields = { ...allfields, ...realiveFields };
    });
    return allfields[fieldId];
  };

  useEffect(() => {
    if (action?.bobjectFieldIds[0]) isMissingInfo(false);
  }, [action]);

  return (
    <>
      {action?.bobjectFieldIds?.map((field, index) => (
        <ClearPropertySelect
          key={`clear-property-select-${field}`}
          block={blockIndex}
          onFieldArrayExtension={handleAddPosition}
          onFieldUpdate={handleUpdatePosition}
          onFieldDelete={handleDeletePosition}
          value={findField(field)}
          index={index}
          availableFields={availableBobjectFields}
          disableAddButton={
            !action?.bobjectFieldIds[index] || action?.bobjectFieldIds.length !== index + 1
          }
        />
      ))}
    </>
  );
};

export default ClearPropertyModule;
