import { TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE } from '@bloobirds-it/types';

import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
} from '../../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../../../constants/lead';
import { TASK_TYPE_EQUIVALENCE, TaskTypeLogicRoles } from './constants';
import { Filters, Stage, Stages, isStatus } from './utils';

const filterToTaskTypeLR = (filter: string): TaskTypeLogicRoles[] => {
  return TASK_TYPE_EQUIVALENCE[filter] ?? undefined;
};
const getLogicRoleListByIsStatus = (stage: Stage, filters: Filters, isToBeStatus: boolean) => {
  let logicRoles: string[] = [];
  filters[stage]
    .filter(f => isToBeStatus === isStatus(f.enumName) && f.enabled)
    .forEach(f => {
      const lrList = filterToTaskTypeLR(f.enumName);
      if (lrList) {
        lrList.forEach(lr => (logicRoles = logicRoles.concat(lr)));
      }
    });
  return logicRoles;
};

const getLogicRoleList = (stage: Stage, filters: Filters) => {
  const taskTypes = getLogicRoleListByIsStatus(stage, filters, false);
  let taskStatuses = getLogicRoleListByIsStatus(stage, filters, true);
  if (!taskStatuses.includes('COMPLETED')) {
    taskStatuses = taskStatuses.concat(TASK_STATUS_VALUE_LOGIC_ROLE.TODO);
  }
  return { taskTypes, taskStatuses };
};

export const getHomeTasksQueriesAll = (
  stage: Stages,
  filters: Filters,
  overdue: boolean,
): any[] => {
  let filteredFilters = filters;
  if (!overdue) {
    filteredFilters = {
      SALES: filters.SALES.filter(f => !f.enumName.includes('OVERDUE')),
      PROSPECT: filters.PROSPECT.filter(f => !f.enumName.includes('OVERDUE')),
    };
  }
  const isProspectOverdueSelected = filters.PROSPECT.find(f => f.enumName.includes('OVERDUE'))
    ?.enabled;
  const isSalesOverdueSelected = filters.SALES.find(f => f.enumName.includes('OVERDUE'))?.enabled;
  switch (stage) {
    case 'SALES': {
      if (overdue && !isSalesOverdueSelected) {
        return undefined;
      }
      const { taskTypes, taskStatuses } = getLogicRoleList(stage, filteredFilters);
      return getHomeTasksQueriesSales(taskTypes, taskStatuses);
    }
    case 'PROSPECT': {
      if (overdue && !isProspectOverdueSelected) {
        return undefined;
      }
      const { taskTypes, taskStatuses } = getLogicRoleList(stage, filteredFilters);
      return getHomeTasksQueriesProspect(taskTypes, taskStatuses);
    }
    case 'ALL': {
      // if (overdue && !isSalesOverdueSelected && !isProspectOverdueSelected) {
      //   return undefined;
      // }
      const isAnyProspectFilterSelected = filteredFilters.PROSPECT.find(
        f => !isStatus(f.enumName) && f.enabled,
      );
      const isAnySalesFilterSelected = filteredFilters.SALES.find(
        f => !isStatus(f.enumName) && f.enabled,
      );
      let queries: { [x: string]: any }[] = [];
      if ((!overdue || (overdue && isProspectOverdueSelected)) && isAnyProspectFilterSelected) {
        const { taskTypes, taskStatuses } = getLogicRoleList('PROSPECT', filteredFilters);
        queries = queries.concat(getHomeTasksQueriesProspect(taskTypes, taskStatuses));
      }
      if ((!overdue || (overdue && isSalesOverdueSelected)) && isAnySalesFilterSelected) {
        const { taskTypes, taskStatuses } = getLogicRoleList('SALES', filteredFilters);
        queries = queries.concat(getHomeTasksQueriesSales(taskTypes, taskStatuses));
      }
      return queries;
    }
    default:
      return undefined;
  }
};

const getHomeTasksQueriesSales = (taskTypes: string[] = [], taskStatuses: string[] = []) => {
  return [
    {
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: taskStatuses,
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
        query: {
          [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [COMPANY_STAGE_LOGIC_ROLE.SALES],
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: ['__MATCH_EMPTY_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: taskStatuses,
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
        query: {
          LEAD__STAGE: [LEAD_STAGE_LOGIC_ROLE.SALES],
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: taskStatuses,
    },
  ];
};

const getHomeTasksQueriesProspect = (taskTypes: string[], taskStatuses: string[]) => {
  return [
    {
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
        query: {
          [LEAD_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'],
          [LEAD_FIELDS_LOGIC_ROLE.STAGE]: ['__MATCH_EMPTY_ROWS__', LEAD_STAGE_LOGIC_ROLE.PROSPECT],
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: taskStatuses,
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
        query: {
          [COMPANY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'],
          [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
            '__MATCH_EMPTY_ROWS__',
            COMPANY_STAGE_LOGIC_ROLE.PROSPECT,
          ],
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: ['__MATCH_EMPTY_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: taskStatuses,
    },
  ];
};
