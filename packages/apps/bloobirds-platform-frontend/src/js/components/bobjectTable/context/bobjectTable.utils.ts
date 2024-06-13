import { useCallback } from 'react';

import {
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  SALESFORCE_LOGIC_ROLES,
  STAGE_VALUES_LOGIC_ROLES,
} from '@bloobirds-it/types';
import {
  addDays,
  addYears,
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  endOfYesterday,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  startOfYesterday,
} from 'date-fns';
import { isEmpty } from 'lodash';

import { EntityInterface } from '../../../hooks/entities/useEntity';
import SessionManagerFactory from '../../../misc/session';
import { BobjectField } from '../../../typings/bobjects';
import { MatchRows } from '../../../typings/moreFilters';
import { getBobjectFromLogicRole } from '../../../utils/bobjects.utils';
import {
  NON_VALUE_SEARCH_MODES,
  RANGE_SEARCH_MODES,
  RELATIVE_DATES_OPTIONS,
  SEARCH_MODES,
  VALUE_SEARCH_MODES,
} from './bobjectTable.constants';

const SessionManager = SessionManagerFactory();

const getRelationField = (bobjectFields, bobjectTypeFromId, bobjectTypeToId) =>
  bobjectFields
    ?.all()
    .find(
      bobjectField =>
        bobjectField?.bobjectType === bobjectTypeFromId &&
        bobjectField?.referencedBobjectType === bobjectTypeToId,
    );

const isRangeNumberOrDateFilter = query => RANGE_SEARCH_MODES.includes(query[0]?.type);
const isValueFilter = query =>
  VALUE_SEARCH_MODES.includes(query[0]?.type) || NON_VALUE_SEARCH_MODES.includes(query[0]?.type);

const relativeToQuery = query => {
  if (Array.isArray(query) && query[0] === '__me__') {
    return SessionManager.getUser()?.id;
  }
  return query;
};

const textToQuery = query => {
  let textQuery;
  if (VALUE_SEARCH_MODES.includes(query[0].type)) {
    textQuery = {
      query: query[0].value,
      searchMode: query[0].type,
    };
  }
  if (NON_VALUE_SEARCH_MODES.includes(query[0].type)) {
    textQuery = {
      query: query[0].type,
      searchMode: null,
    };
  }
  if (
    Array.isArray(query) &&
    Array.isArray(query[0]?.value) &&
    query[0]?.value?.some(value => value === '__me__')
  ) {
    const newQ = query[0]?.value?.filter(value => value !== '__me__');
    newQ.push(SessionManager.getUser()?.id);
    textQuery = {
      query: newQ,
      searchMode: query[0].type,
    };
  }
  return textQuery;
};

const dateRangeToQuery = dateRange => {
  let range;
  const TODAY = new Date();
  const START_OF_TIME = new Date('Thu Jan 01 1970 01:00:43 GMT+0100');
  const WEEK_STARTS_ON_MONDAY = { weekStartsOn: 1 };
  const quarter = Math.floor(new Date().getMonth() / 3);
  switch (dateRange) {
    case RELATIVE_DATES_OPTIONS.TODAY:
      range = {
        start: startOfDay(TODAY),
        end: endOfDay(TODAY),
      };
      break;
    case RELATIVE_DATES_OPTIONS.YESTERDAY:
      range = {
        start: startOfYesterday(),
        end: endOfYesterday(),
      };
      break;
    case RELATIVE_DATES_OPTIONS.THIS_WEEK:
      range = {
        start: startOfWeek(TODAY, WEEK_STARTS_ON_MONDAY),
        end: endOfWeek(TODAY, WEEK_STARTS_ON_MONDAY),
      };
      break;
    case RELATIVE_DATES_OPTIONS.LAST_WEEK:
      range = {
        start: startOfWeek(addDays(new Date(), -7), WEEK_STARTS_ON_MONDAY),
        end: endOfWeek(addDays(new Date(), -7), WEEK_STARTS_ON_MONDAY),
      };
      break;
    case RELATIVE_DATES_OPTIONS.THIS_MONTH:
      range = {
        start: startOfMonth(TODAY, WEEK_STARTS_ON_MONDAY),
        end: endOfMonth(TODAY, WEEK_STARTS_ON_MONDAY),
      };
      break;
    case RELATIVE_DATES_OPTIONS.LAST_MONTH:
      range = {
        start: startOfMonth(new Date().setMonth(new Date().getMonth() - 1)),
        end: endOfMonth(new Date().setMonth(new Date().getMonth() - 1)),
      };
      break;
    case RELATIVE_DATES_OPTIONS.THIS_QUARTER:
      range = {
        start: startOfQuarter(TODAY),
        end: endOfQuarter(TODAY),
      };
      break;
    case RELATIVE_DATES_OPTIONS.LAST_QUARTER:
      range = {
        start: startOfQuarter(new Date(new Date().getFullYear(), quarter * 3 - 3, 1)),
        end: endOfQuarter(new Date(new Date().getFullYear(), quarter * 3 - 3, 1)),
      };
      break;
    case RELATIVE_DATES_OPTIONS.THIS_YEAR:
      range = {
        start: startOfYear(TODAY),
        end: endOfYear(TODAY),
      };
      break;
    case RELATIVE_DATES_OPTIONS.LAST_YEAR:
      range = {
        start: startOfYear(new Date().setFullYear(new Date().getFullYear() - 1)),
        end: endOfYear(new Date().setFullYear(new Date().getFullYear() - 1)),
      };
      break;
    case RELATIVE_DATES_OPTIONS.ALL_TIME:
      range = {
        start: START_OF_TIME,
        end: addYears(TODAY, 5),
      };
      break;
    default:
      range = {
        start: null,
        end: null,
      };
  }
  return range;
};

const rangeToQuery = query => {
  let rangeQuery;
  if (!query || !Array.isArray(query) || query.length === 0) {
    throw new Error('query are required');
  }

  if (NON_VALUE_SEARCH_MODES.includes(query[0].type)) {
    rangeQuery = {
      query: query[0].type,
      searchMode: null,
    };
  } else {
    switch (query[0].type) {
      case 'RANGE__SEARCH__GT':
        rangeQuery = {
          query: {
            gt: query[0].value,
          },
          searchMode: 'RANGE__SEARCH',
        };
        break;
      case 'RANGE__SEARCH__GTE':
        rangeQuery = {
          query: {
            gte: query[0].value,
          },
          searchMode: 'RANGE__SEARCH',
        };
        break;

      case 'RANGE__SEARCH__LTE':
        rangeQuery = {
          query: {
            lte: query[0].value,
          },
          searchMode: 'RANGE__SEARCH',
        };
        break;
      case 'RANGE__SEARCH__LT':
        rangeQuery = {
          query: {
            lt: query[0].value,
          },
          searchMode: 'RANGE__SEARCH',
        };
        break;
      case 'RANGE__SEARCH__BETWEEN':
      case 'RANGE__SEARCH__BETWEEN__DATES':
        if (Object.values(RELATIVE_DATES_OPTIONS).includes(query[0].value)) {
          const range = dateRangeToQuery(query[0].value);
          rangeQuery = {
            query: {
              gte: range.start,
              lte: range.end,
            },
            type: query[0].value,
            searchMode: 'RANGE__SEARCH',
          };
        } else {
          rangeQuery = {
            query: {
              gte: query[0].value?.start || query[0].value.split(',')[0],
              lte: query[0].value?.end || query[0].value.split(',')[1],
            },
            type: 'custom',
            searchMode: 'RANGE__SEARCH',
          };
        }
        break;
      default:
        rangeQuery = {
          query: query[0].value,
          searchMode: query[0].type,
        };
    }
    if (!isEmpty(rangeQuery)) {
      rangeQuery.searchType = query[0].type;
    }
  }
  return rangeQuery;
};

const changeLogicRolesToIds = ({ bobjectFields, bobjectPicklistFieldValues, query }) => {
  const newQuery = {};
  const queryToParse = { ...query };
  if (bobjectPicklistFieldValues) {
    Object.keys(queryToParse).forEach(queryField => {
      const queryFieldId = bobjectFields.findBy('logicRole')(queryField)?.id;
      if (!Array.isArray(queryToParse[queryField])) {
        queryToParse[queryField] = [queryToParse[queryField]];
      }
      queryToParse[queryField].forEach(queryValue => {
        const picklistValue = bobjectPicklistFieldValues.findBy('logicRole')(queryValue);
        const field = queryFieldId || queryField;
        if (newQuery[field]) {
          return (newQuery[field] = picklistValue
            ? [...newQuery[field], picklistValue.id]
            : [...newQuery[field], queryValue]);
        }
        return (newQuery[field] = picklistValue ? [picklistValue.id] : [queryValue]);
      });
    });
    return newQuery;
  }
  return query;
};

export const getQueryValue = ({ newQuery, fieldReference }) => {
  if (isValueFilter(newQuery[fieldReference])) {
    return textToQuery(newQuery[fieldReference]);
  }
  if (isRangeNumberOrDateFilter(newQuery[fieldReference])) {
    return rangeToQuery(newQuery[fieldReference]);
  }
  return {
    query: relativeToQuery(newQuery[fieldReference]),
    searchMode: null,
  };
};

const addQueryParamsFromTypes = (
  query: { [x: string]: any },
  bobjectType: BobjectTypes,
  bobjectFields: BobjectField[],
  stage: string,
) => {
  const newQuery = {};
  // ensure values are arrays
  Object.keys(query).forEach(k =>
    Array.isArray(query[k]) ? (newQuery[k] = [...query[k]]) : (newQuery[k] = [query[k]]),
  );
  // Cross reference and text
  Object.keys(newQuery).forEach(fieldReference => {
    const field =
      bobjectFields.get(fieldReference) || bobjectFields.findBy('logicRole')(fieldReference);
    const queryValue = getQueryValue({ newQuery, fieldReference });
    if (field?.bobjectType !== bobjectType?.id) {
      const relationField = getRelationField(bobjectFields, bobjectType.id, field?.bobjectType);
      if (!newQuery[relationField?.id]) {
        newQuery[relationField?.id] = {
          query: {},
          searchMode: SEARCH_MODES.SUBQUERY__SEARCH,
        };
      }
      newQuery[relationField?.id].query[field?.id] = queryValue;
      delete newQuery[fieldReference];
    } else {
      newQuery[field.id] = queryValue;
    }
  });
  if (stage && stage !== 'All') {
    const stageFieldId = bobjectFields?.findBy('logicRole')(
      FIELDS_LOGIC_ROLE[bobjectType?.name].STAGE,
    )?.id;

    let stageValue;
    switch (stage) {
      case 'Prospect':
        stageValue = [STAGE_VALUES_LOGIC_ROLES[bobjectType?.name]?.PROSPECT, MatchRows.EMPTY];
        break;
      case 'Sales':
        stageValue = [STAGE_VALUES_LOGIC_ROLES[bobjectType?.name]?.SALES];
        break;
    }
    newQuery[stageFieldId] = stageValue;
  }

  return newQuery;
};

const getColumnsOrderedByListOrdering = (columnsShown, bobjectFields) =>
  columnsShown &&
  bobjectFields
    ?.all()
    .filter(bobjectField => columnsShown.includes(bobjectField.id))
    .sort((a, b) => a.listsOrdering - b.listsOrdering)
    .map(column => column.id);

export const getSalesforceStatus = (bobjectFields: EntityInterface, bobjectType: BobjectTypes) => {
  switch (bobjectType) {
    case BobjectTypes.Lead:
      return bobjectFields.findByLogicRole(SALESFORCE_LOGIC_ROLES.SALESFORCE_LEAD_STATUS);
    case BobjectTypes.Company:
      return bobjectFields.findByLogicRole(SALESFORCE_LOGIC_ROLES.SALESFORCE_COMPANY_STATUS);
    case BobjectTypes.Opportunity:
      return bobjectFields.findByLogicRole(SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE);
    default:
      return null;
  }
};

export const addStageRelatedFieldsToColumns = ({
  columns,
  bobjectFields,
  hasSalesEnabled = false,
  stage = 'All',
  isNoStatusPlanAccount = false,
}: {
  columns: Array<string>;
  bobjectFields: EntityInterface;
  hasSalesEnabled: boolean;
  stage: string;
  isNoStatusPlanAccount: boolean;
}) => {
  if (!columns) return;
  const bobjectType = getBobjectFromLogicRole(bobjectFields.get(columns[0])?.logicRole) as
    | BobjectTypes.Company
    | BobjectTypes.Lead;
  if ([BobjectTypes.Lead, BobjectTypes.Company, BobjectTypes.Opportunity].includes(bobjectType)) {
    const statusFieldId = bobjectFields.findByLogicRole(FIELDS_LOGIC_ROLE[bobjectType].STATUS)?.id;
    const salesStatusFieldId = bobjectFields.findByLogicRole(
      FIELDS_LOGIC_ROLE[bobjectType].SALES_STATUS,
    )?.id;
    const statusColumnIndex = columns.indexOf(statusFieldId);
    const salesStatusColumnIndex = columns.indexOf(salesStatusFieldId);

    if (isNoStatusPlanAccount) {
      const statusSFDC = getSalesforceStatus(bobjectFields, bobjectType);
      if (statusFieldId && statusSFDC) {
        const statusSFDCId = statusSFDC?.id;
        columns.splice(statusColumnIndex, 1, statusSFDCId);
      } else {
        if (salesStatusColumnIndex !== -1) {
          columns.splice(salesStatusColumnIndex, 1);
        }
        if (statusColumnIndex !== -1) {
          columns.splice(statusColumnIndex, 1);
        }
      }
    } else if (hasSalesEnabled) {
      if ([BobjectTypes.Lead, BobjectTypes.Company].includes(bobjectType)) {
        if (stage === 'All') {
          if (statusFieldId === -1) {
            columns.splice(salesStatusFieldId, 0, statusFieldId);
          }
          if (salesStatusColumnIndex === -1) {
            columns.splice(statusColumnIndex + 1, 0, salesStatusFieldId);
          }
        }
      }
    }
  }
  return columns;
};
const getShownBobjectFields = (
  columns: Array<string>,
  bobjectFields: EntityInterface,
  stage = 'All',
  hasSalesEnabled = false,
  isNoStatusPlanAccount = false,
  aiAnalysisEnabled = false,
) => {
  if (!columns) return;
  const bobjectType = getBobjectFromLogicRole(bobjectFields.get(columns[0])?.logicRole) as
    | BobjectTypes.Company
    | BobjectTypes.Lead;
  if ([BobjectTypes.Lead, BobjectTypes.Company, BobjectTypes.Opportunity].includes(bobjectType)) {
    const statusFieldId = bobjectFields.findByLogicRole(FIELDS_LOGIC_ROLE[bobjectType].STATUS)?.id;
    const salesStatusFieldId = bobjectFields.findByLogicRole(
      FIELDS_LOGIC_ROLE[bobjectType].SALES_STATUS,
    )?.id;
    if (isNoStatusPlanAccount) {
      const statusColumnIndex = columns.indexOf(statusFieldId);
      const salesStatusColumnIndex = columns.indexOf(salesStatusFieldId);
      if (salesStatusColumnIndex !== -1) {
        columns.splice(salesStatusColumnIndex, 1);
      }
      if (statusColumnIndex !== -1) {
        columns.splice(statusColumnIndex, 1);
      }
    } else if (hasSalesEnabled) {
      if ([BobjectTypes.Lead, BobjectTypes.Company].includes(bobjectType)) {
        const statusColumnIndex = columns.indexOf(statusFieldId);
        const salesStatusColumnIndex = columns.indexOf(salesStatusFieldId);

        if (hasSalesEnabled && stage === 'All') {
          if (statusColumnIndex === -1) {
            columns.splice(salesStatusColumnIndex, 0, statusFieldId);
          }
          if (salesStatusColumnIndex === -1) {
            columns.splice(statusColumnIndex + 1, 0, salesStatusFieldId);
          }
        }
        if (stage === 'Sales') {
          if (salesStatusColumnIndex === -1) {
            columns.splice(statusColumnIndex, 1, salesStatusFieldId);
          } else if (statusColumnIndex !== -1) {
            columns.splice(statusColumnIndex, 1);
          }
        }
        if (stage === 'Prospect') {
          if (statusColumnIndex === -1) {
            columns.splice(salesStatusColumnIndex, 1, statusFieldId);
          } else if (salesStatusColumnIndex !== -1) {
            columns.splice(salesStatusColumnIndex, 1);
          }
        }
      }
    }
  } else if (bobjectType === BobjectTypes.Activity && aiAnalysisEnabled) {
    const activityCompanyFieldId = bobjectFields.findByLogicRole(
      FIELDS_LOGIC_ROLE[bobjectType].COMPANY,
    )?.id;
    const activityCopilotFieldId = bobjectFields.findByLogicRole(
      FIELDS_LOGIC_ROLE[bobjectType].COPILOT_ANALYSIS,
    )?.id;
    const activityCompanyColumnIndex = columns.indexOf(activityCompanyFieldId);
    const activityCopilotColumnIndex = columns.indexOf(activityCopilotFieldId);
    if (activityCopilotColumnIndex === -1) {
      columns.splice(activityCompanyColumnIndex, 0, activityCopilotFieldId);
    }
  }

  return (
    columns &&
    bobjectFields
      ?.all()
      .filter(bobjectField => columns.includes(bobjectField.id))
      .map(field => ({ ...field, ordering: columns?.indexOf(field.id) }))
      .sort((a, b) => a.ordering - b.ordering)
  );
};

const getToggleElementCallback = (selectedElements, setSelectedElements) =>
  useCallback(
    id => {
      if (selectedElements.includes(id)) {
        setSelectedElements(selectedElements.filter(x => x !== id));
      } else {
        setSelectedElements([...selectedElements, id]);
      }
    },
    [selectedElements, setSelectedElements],
  );

const excludedViewTypes = {
  MEETINGS: 'MEETINGS',
  SAL: 'SAL',
  MQL: 'MQL',
  LEAD_WITHOUT_QC: 'LEAD_WITHOUT_QC',
};

export {
  addQueryParamsFromTypes,
  changeLogicRolesToIds,
  excludedViewTypes,
  getShownBobjectFields,
  getColumnsOrderedByListOrdering,
  getToggleElementCallback,
};
