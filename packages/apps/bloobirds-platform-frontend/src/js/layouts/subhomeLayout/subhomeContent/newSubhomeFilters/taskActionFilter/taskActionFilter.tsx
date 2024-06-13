import React, { useEffect, useState } from 'react';
import { CheckItem, MultiSelect } from '@bloobirds-it/flamingo-ui';
import { useEntity } from '../../../../../hooks';
import { useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getFieldIdByLogicRole } from '../../../../../utils/bobjects.utils';

const TaskActionFilter = () => {
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectFields = useEntity('bobjectFields');
  const { setFilter, removeFilter, filters } = useSubhomeFilters();
  const [filterValueLR, setFilterValueLR] = useState<string[]>([]);
  const TASKS_TYPES = [
    {
      taskFieldLR: TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL,
      id: getFieldIdByLogicRole(bobjectFields, TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL),
      name: 'Call',
    },
    {
      taskFieldLR: TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL,
      id: getFieldIdByLogicRole(bobjectFields, TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL),
      name: 'Email',
    },
    {
      taskFieldLR: TASK_FIELDS_LOGIC_ROLE.IS_ACTION_LINKEDIN,
      id: getFieldIdByLogicRole(bobjectFields, TASK_FIELDS_LOGIC_ROLE.IS_ACTION_LINKEDIN),
      name: 'Linkedin',
    },
  ];

  //Clear button clears the actionType filter
  useEffect(() => {
    const taskTypeIds = TASKS_TYPES.map(taskType => taskType.id);
    const activeTaskFilters = Object.keys(filters.Task);
    if (!activeTaskFilters.some(taskFilterId => taskTypeIds.includes(taskFilterId))) {
      setFilterValueLR([]);
    }
  }, [filters]);

  const handleOnChange = (actionTypeLRs: string[]) => {
    saveFilter(actionTypeLRs);
    if (filterValueLR.length > actionTypeLRs.length) {
      const removedFilter = filterValueLR.filter(f => !actionTypeLRs.includes(f))[0];
      removeFilter(getFieldIdByLogicRole(bobjectFields, removedFilter));
    }
    setFilterValueLR(actionTypeLRs);
  };

  const saveFilter = (actionTypeLRs: string[]) => {
    actionTypeLRs.forEach(actionTypeLR => {
      const filterValue = `${actionTypeLR}__YES`;
      setFilter('Task', actionTypeLR, bobjectPicklistFieldValues?.findByLogicRole(filterValue)?.id);
    });
  };

  return (
    <MultiSelect
      placeholder="Types"
      size="small"
      variant="filters"
      selectAllOption
      onChange={handleOnChange}
      value={filterValueLR}
    >
      {TASKS_TYPES.map(item => (
        <CheckItem key={item.name} value={item.taskFieldLR}>
          {item.name}
        </CheckItem>
      ))}
    </MultiSelect>
  );
};

export default TaskActionFilter;
