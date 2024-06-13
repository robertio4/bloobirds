import { clone, isEqual } from 'lodash';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../constants/company';
import { isObject } from 'lodash/lang';
import { LEAD_FIELDS_LOGIC_ROLE } from '../constants/lead';
import { TASK_ACTION, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../constants/opportunity';

export const FILTER_GROUP_TYPE = {
  ARRAY: 'ARRAY',
  NUMBER: 'NUMBER',
  OBJECT: 'OBJECT',
  ACTION: 'ACTION',
  STRING: 'STRING',
  DATE: 'DATE',
};

const FILTERS_KEYS_BY_LOGIC_ROLE = {
  [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [COMPANY_FIELDS_LOGIC_ROLE.MR_RATING]: 'mrRating',
  [COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET]: 'targetMarket',
  [COMPANY_FIELDS_LOGIC_ROLE.SOURCE]: 'source',
  [COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS]: 'nurturingReason',
  [COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS]: 'discardedReason',
  [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: 'status',
  [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: 'salesStatus',
  [COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS]: 'numberLeads',
  [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [LEAD_FIELDS_LOGIC_ROLE.ICP]: 'buyerPersonas',
  [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: 'salesStatus',
  [LEAD_FIELDS_LOGIC_ROLE.SOURCE]: 'source',
  [TASK_FIELDS_LOGIC_ROLE.TITLE]: 'meetingType',
  [TASK_ACTION.CALL]: 'type',
  [TASK_ACTION.EMAIL]: 'type',
  [TASK_ACTION.LINKEDIN_MESSAGE]: 'type',
  [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: 'type',
  [TASK_FIELDS_LOGIC_ROLE.COMPANY]: 'bobjectType',
  [TASK_FIELDS_LOGIC_ROLE.LEAD]: 'bobjectType',
  [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: 'date',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: 'stage',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: 'amount',
};

export const resetFilterGroup = ({
  filtersToReset,
  defaultFilters = [],
  filtersData = {},
  bobjectFields,
  bobjectPicklistFieldValues,
  setFilters,
}) => {
  if (
    !filtersToReset ||
    !Array.isArray(filtersToReset) ||
    typeof setFilters !== 'function' ||
    !isObject(filtersData) ||
    !Array.isArray(defaultFilters)
  ) {
    throw new Error('Invalid params');
  }

  filtersToReset.forEach(filter => {
    const { bobjectFieldId, values = [] } = filter || {};
    if (!bobjectFieldId && typeof bobjectFieldId !== 'string') {
      return;
    }
    const filterLogicRole = bobjectFields?.get(bobjectFieldId)?.logicRole;
    let filtersValues = [];
    let keepElements = [];

    if (defaultFilters?.includes(filterLogicRole)) {
      const filterKey = FILTERS_KEYS_BY_LOGIC_ROLE[filterLogicRole];
      const filterData = filtersData[filterKey || ''];
      switch (filterData?.type) {
        case FILTER_GROUP_TYPE.ARRAY:
          filtersValues = values?.map(filterValue => filterValue?.bobjectPicklistValue);
          keepElements = filterData?.data?.filter(
            filterValue => !filtersValues?.includes(filterValue),
          );
          if (!isEqual(keepElements, filterData)) {
            if (keepElements?.length > 0) {
              setFilters({ [filterKey]: keepElements });
            }
            filterData.reset();
          }
          break;
        case FILTER_GROUP_TYPE.NUMBER:
        case FILTER_GROUP_TYPE.STRING:
        case FILTER_GROUP_TYPE.DATE:
          filterData?.reset();
          break;
        case FILTER_GROUP_TYPE.ACTION:
          filtersValues = filtersValues?.map(picklistValue => {
            const bpfvLogicRole = bobjectPicklistFieldValues.get(picklistValue)?.logicRole;
            if (bpfvLogicRole.includes('CALL')) {
              return 'CALL';
            }
            if (bpfvLogicRole.includes('EMAIL')) {
              return 'EMAIL';
            }
            if (bpfvLogicRole.includes('LINKEDIN')) {
              return 'LINKEDIN_MESSAGE';
            }

            return picklistValue;
          });
          keepElements = filterData?.data?.filter(
            filterValue => !filtersValues?.includes(filterValue),
          );
          if (!isEqual(keepElements, filterData)) {
            if (keepElements?.length > 0) {
              setFilters({ [filterKey]: keepElements });
            }
            filterData.reset();
          }
          break;
      }
    }
  });

  const more = filtersToReset.filter(filter => {
    const filterLogicRole = bobjectFields?.get(filter?.bobjectFieldId)?.logicRole;
    return !defaultFilters.some(logicRole => logicRole === filterLogicRole);
  });
  const moreCopyToClean = clone(filtersData.moreFilters?.data);
  const moreCopy = {};
  Object.keys(moreCopyToClean || {})?.forEach(filterKey => {
    const logicRoleRegex = /[A-Z]*__/g;
    const isLogicRole = logicRoleRegex.test(filterKey);
    if (isLogicRole) {
      moreCopy[filterKey] = moreCopyToClean[filterKey];
    } else {
      const key = filterKey.replace(/_[A-Z][a-z]*_/g, '');
      moreCopy[key] = moreCopyToClean[filterKey];
    }
  });
  more?.forEach(filter => {
    const bobjectFieldId = filter?.bobjectFieldId;
    if (bobjectFieldId && typeof bobjectFieldId === 'string') {
      delete moreCopy[bobjectFieldId];
      delete moreCopy[bobjectFields?.get(bobjectFieldId)?.logicRole];
    }
  });
  setFilters({ moreFilters: moreCopy });
};

export const configureFilterGroups = filtersGroups => {
  if (!filtersGroups || !isObject(filtersGroups)) {
    throw new Error('Invalid params');
  }
  return Object.keys(filtersGroups)
    .map(key => ({
      [key]: { ...filtersGroups[key], selected: false },
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

export const isOneSelected = filtersGroups => {
  if (!filtersGroups || !isObject(filtersGroups)) {
    throw new Error('Invalid params');
  }
  return Object.keys(filtersGroups).filter(key => filtersGroups[key].selected).length === 1;
};
