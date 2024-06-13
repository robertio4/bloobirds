import { BobjectTypes, TASK_ACTION, TASK_FIELDS_LOGIC_ROLE, Bobject } from '@bloobirds-it/types';

import { addQueryParamsFromTypes } from '../../../components/bobjectTable/context/bobjectTable.utils';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import SessionManagerFactory from '../../../misc/session';
import { getFieldByLogicRole, getRelatedBobjectTypeName } from '../../../utils/bobjects.utils';
import { transformQueryValues } from '../../../utils/queries.utils';
import { parseMoreFilterValue, replaceIdByLogicRole } from './moreFilters.utils';

const DELIVERED_BANNER_KEY = `bb-app-${
  SessionManagerFactory().getAccount()?.id
}-sales-delivered-banner`;

export const shouldBeVisible = () => {
  const storage = JSON.parse(localStorage.getItem(DELIVERED_BANNER_KEY));
  return storage !== null ? storage : true;
};

export const hideBanner = () =>
  JSON.stringify(localStorage.setItem(DELIVERED_BANNER_KEY, JSON.stringify(false)));

export const getRangeQuery = data => {
  if (!data) return '';

  let query;
  const { type } = data;

  switch (type) {
    case 'RANGE__SEARCH__BETWEEN':
      query = {
        query: {
          gte: data.value.start,
          lte: data.value.end,
        },
        searchMode: 'RANGE__SEARCH',
      };
      break;
    case 'EXACT__SEARCH':
      query = data.value;
      break;
    case 'RANGE__SEARCH__LT':
      query = {
        query: {
          lt: data.value,
        },
        searchMode: 'RANGE__SEARCH',
      };
      break;
    case 'RANGE__SEARCH__LTE':
      query = {
        query: {
          lte: data.value,
        },
        searchMode: 'RANGE__SEARCH',
      };
      break;
    case 'RANGE__SEARCH__GT':
      query = {
        query: {
          gt: data.value,
        },
        searchMode: 'RANGE__SEARCH',
      };
      break;
    case 'RANGE__SEARCH__GTE':
      query = {
        query: {
          gte: data.value,
        },
        searchMode: 'RANGE__SEARCH',
      };
      break;
    case 'IS__NOT__EMPTY':
      query = ['__MATCH_FULL_ROWS__'];
      break;
    case 'IS__EMPTY':
      query = ['__MATCH_EMPTY_ROWS__'];
      break;
    default:
      query = '';
      break;
  }

  return query;
};

const FILTERS_KEYS_BY_LOGIC_ROLE = {
  [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [COMPANY_FIELDS_LOGIC_ROLE.MR_RATING]: 'mrRating',
  [LEAD_FIELDS_LOGIC_ROLE.MR_RATING]: 'mrRating',
  [COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET]: 'targetMarket',
  [COMPANY_FIELDS_LOGIC_ROLE.SOURCE]: 'source',
  [LEAD_FIELDS_LOGIC_ROLE.SOURCE]: 'source',
  [LEAD_FIELDS_LOGIC_ROLE.STATUS]: 'status',
  [COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS]: 'nurturingReason',
  [COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS]: 'discardedReason',
  [LEAD_FIELDS_LOGIC_ROLE.ICP]: 'buyerPersonas',
  [TASK_FIELDS_LOGIC_ROLE.TITLE]: 'meetingType',
  [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: 'status',
  [TASK_FIELDS_LOGIC_ROLE.COMPANY]: 'bobjectType',
  [TASK_FIELDS_LOGIC_ROLE.LEAD]: 'bobjectType',
  [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: 'dateFilter',
};

const getInputPickerValue = value => {
  let { textValue, searchType } = value;

  if (textValue === '__MATCH_EMPTY_ROWS__') {
    textValue = '';
    searchType = 'IS__EMPTY';
  }

  return { value: textValue, type: searchType };
};

const parseFilterValue = (filter, bobjectFields, bobjectPicklistFieldValues, filters) => {
  const { values, bobjectFieldId } = filter;
  const filterLogicRole = bobjectFields?.get(bobjectFieldId)?.logicRole;

  switch (filterLogicRole) {
    case COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
    case COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET:
    case COMPANY_FIELDS_LOGIC_ROLE.SOURCE:
    case COMPANY_FIELDS_LOGIC_ROLE.MR_RATING:
    case COMPANY_FIELDS_LOGIC_ROLE.STATUS:
    case COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS:
    case COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS:
    case LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
    case LEAD_FIELDS_LOGIC_ROLE.ICP:
    case LEAD_FIELDS_LOGIC_ROLE.MR_RATING:
    case LEAD_FIELDS_LOGIC_ROLE.SOURCE:
    case LEAD_FIELDS_LOGIC_ROLE.STATUS:
    case TASK_FIELDS_LOGIC_ROLE.TITLE:
    case TASK_FIELDS_LOGIC_ROLE.COMPANY:
    case TASK_FIELDS_LOGIC_ROLE.LEAD:
      return {
        [FILTERS_KEYS_BY_LOGIC_ROLE[filterLogicRole]]: values?.map(filterValue => {
          return filterLogicRole === TASK_FIELDS_LOGIC_ROLE.TITLE
            ? filterValue?.textValue
            : filterValue?.bobjectPicklistValue;
        }),
      };
    case TASK_ACTION.LINKEDIN_MESSAGE:
    case TASK_ACTION.CALL:
    case TASK_ACTION.EMAIL:
      return {
        type: [
          ...(filters?.type ? filters.type : []),
          ...values.map(filterValue => {
            const bpfvLogicRole = bobjectPicklistFieldValues?.get(filterValue?.bobjectPicklistValue)
              ?.logicRole;
            if (bpfvLogicRole.includes('CALL')) {
              return 'CALL';
            }
            if (bpfvLogicRole.includes('EMAIL')) {
              return 'EMAIL';
            }
            if (bpfvLogicRole.includes('LINKEDIN')) {
              return 'LINKEDIN_MESSAGE';
            }

            return filterValue?.bobjectPicklistValue;
          }),
        ],
      };
    case COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS: {
      return {
        numberLeads: Array.isArray(values) ? getInputPickerValue(values[0]) : 0,
      };
    }
    case TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME:
      return {
        date: values[0]?.textValue,
      };
  }
};

export const buildSubhomeFilters = ({
  filtersToApply = [],
  subhomeFilters = [],
  bobjectFields,
  bobjectPicklistFieldValues,
}) => {
  if (!Array.isArray(filtersToApply) || !Array.isArray(subhomeFilters)) {
    throw new Error('Invalid params');
  }

  let filters = {};

  filtersToApply
    .filter(filter => {
      const filterLogicRole = bobjectFields?.get(filter?.bobjectFieldId)?.logicRole;
      return subhomeFilters?.some(logicRole => logicRole === filterLogicRole);
    })
    .forEach(filter => {
      filters = {
        ...filters,
        ...parseFilterValue(filter, bobjectFields, bobjectPicklistFieldValues, filters),
      };
    });
  return filters;
};

const generateQueryByBoject = (bobjectTypes, bobjectTypeName, bobjectFields, moreFilters) => {
  const bobjectTypeData = bobjectTypes?.findBy('name')(bobjectTypeName);
  const moreFiltersByBobject = moreFilters?.filter(
    filter => bobjectFields?.get(filter?.bobjectFieldId)?.bobjectType === bobjectTypeData?.id,
  );
  const moreFiltersParsed = moreFiltersByBobject?.map(filter => ({
    [filter?.bobjectFieldId]: transformQueryValues(filter?.values),
  }));

  return addQueryParamsFromTypes(
    moreFiltersParsed?.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    bobjectTypeData,
    bobjectFields,
  );
};

export const buildMoreFilters = ({
  filtersToApply = [],
  bobjectFields,
  bobjectTypes,
  moreFiltersApplied = {},
}) => {
  if (!Array.isArray(filtersToApply)) {
    throw new Error('Invalid params');
  }

  if (filtersToApply && filtersToApply.length > 0) {
    const queryCompany = generateQueryByBoject(
      bobjectTypes,
      BobjectTypes.Company,
      bobjectFields,
      filtersToApply,
    );
    const queryLead = generateQueryByBoject(
      bobjectTypes,
      BobjectTypes.Lead,
      bobjectFields,
      filtersToApply,
    );
    const queryTask = generateQueryByBoject(
      bobjectTypes,
      BobjectTypes.Task,
      bobjectFields,
      filtersToApply,
    );

    const queryMoreFilters = {
      ...(moreFiltersApplied || {}),
      ...queryCompany,
      ...queryLead,
      ...queryTask,
    };

    const moreFilters = replaceIdByLogicRole(queryMoreFilters, bobjectFields, bobjectTypes);
    let parsedMoreFilters = {};

    Object.keys(moreFilters)?.forEach(filterKey => {
      parsedMoreFilters = {
        ...parsedMoreFilters,
        ...parseMoreFilterValue(filterKey, moreFilters[filterKey]),
      };
    });

    return parsedMoreFilters;
  }
  return {};
};

export const getMainBobjectFromSelectedItems = (selectedTaks: any[]) => {
  const relatedBobjectType = getRelatedBobjectTypeName(selectedTaks[0]);
  const mainBobjects: any[] = [];

  selectedTaks.forEach((task: Bobject) => {
    const referencedBobject = getFieldByLogicRole(
      task,
      TASK_FIELDS_LOGIC_ROLE[
        relatedBobjectType?.toUpperCase() as Uppercase<'Company' | 'Lead' | 'Opportunity'>
      ],
    )?.referencedBobject;
    if (
      mainBobjects.find(
        mainBobject => referencedBobject?.id.objectId !== mainBobject?.id.objectId,
      ) ||
      mainBobjects.length === 0
    ) {
      mainBobjects.push(referencedBobject);
    }
  });

  return mainBobjects;
};
