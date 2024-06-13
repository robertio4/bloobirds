import React, { useEffect, useMemo, useState } from 'react';
import { IconButton, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import { useBobjectFields } from '../../../../../../../hooks/useBobjectFields';
import styles from '../conditions.module.css';
import { useWorkflow } from '../../../context/workflowsContext';
import MonitorInputPicker from './monitorInputPicker/monitorInputPicker';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

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

const ConditionSelectModule = ({ index, block, fieldPair }) => {
  const {
    state: { trigger, isEnabled, isLocked, isMissingInfo, isSubmitting },
    updateFieldId,
    removeAndCondition,
    isMissingInfo: updateMissingInfo,
  } = useWorkflow();
  const [search, setSearch] = useState('');

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

  const bobjectFields = totalBobjectFields(relatedBobjects[trigger?.bobjectType]);

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
          .filter(([id]) => !Object.keys(fieldPair)?.includes(id))
          .map(([, field]) => field);
      });
      return filteredFields;
    }
    return [];
  }, [bobjectFields, fieldPair, trigger]);

  useEffect(() => {
    if (fieldPair?.value?.type) {
      updateMissingInfo(false);
    }
  }, [fieldPair]);

  const isValidField = field => {
    const availableFieldTypes = ['Picklist', 'Text', 'Global Picklist', 'Number', 'Email'];
    if (field?.bobjectType === 'Activity' && field?.label === 'Lead associated') return true;
    if (availableFieldTypes.some(type => type?.includes(field?.type))) return true;
  };
  const getRenderValue = value => `${value?.bobjectType} - ${value?.label}`;
  const findField = fieldId => {
    let allfields = {};
    Object.keys(bobjectFields).forEach(bobjectType => {
      const realiveFields = bobjectFields[bobjectType];
      allfields = { ...allfields, ...realiveFields };
    });
    return allfields[fieldId];
  };
  const isFieldIncomplete = isSubmitting && isMissingInfo;

  return (
    <div className={styles._conditions_selector_wrapper}>
      <div className={styles._select_container}>
        <Select
          placeholder="Select property"
          width="240px"
          borderless={false}
          size="small"
          autocomplete
          disabled={isEnabled || isLocked}
          defaultValue=""
          warning={
            !fieldPair?.bobjectFieldId && isFieldIncomplete && 'Missing required information'
          }
          value={findField(fieldPair?.bobjectFieldId)}
          renderDisplayValue={value => getRenderValue(value)}
          onChange={field => {
            updateFieldId(block, index, field);
          }}
          onSearch={value => setSearch(value)}
        >
          {Object.keys(availableBobjectFields)?.map(bobjectType => {
            return [
              availableBobjectFields[bobjectType]?.map(field => {
                if (isValidField(field) && field.label.toLowerCase().includes(search.toLowerCase()))
                  return (
                    <Item
                      value={field?.name}
                      key={field?.name}
                      label={field?.label}
                      className={styles._conditions_selector_item}
                    >
                      {field?.label}
                      {' - '}
                      <Text htmlTag="span" size="xs" color="softPeanut">
                        {bobjectType}
                      </Text>
                    </Item>
                  );
              }),
            ];
          })}
        </Select>
      </div>
      <div className={styles._input_picker_container}>
        <MonitorInputPicker
          field={availableBobjectFields && findField(fieldPair?.bobjectFieldId)}
          block={block}
          index={index}
          disabled={!fieldPair?.bobjectFieldId}
          event={trigger?.event[0]}
          monitor={fieldPair?.value}
        />
      </div>
      {index !== 0 && (
        <div className={styles._remove_pair_button}>
          <IconButton
            color="purple"
            name="cross"
            disabled={isEnabled}
            onClick={() => {
              removeAndCondition(block, index);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ConditionSelectModule;
