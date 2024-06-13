import { isObject } from 'lodash';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import { transformQueryValues } from '../../../utils/queries.utils';
import { addQueryParamsFromTypes } from '../../../components/bobjectTable/context/bobjectTable.utils';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { parseMoreFilterValue, replaceIdByLogicRole } from '../prospectingPage/moreFilters.utils';
import { BobjectTypes, TASK_ACTION, TASK_FIELDS_LOGIC_ROLE } from "@bloobirds-it/types";

const FILTERS_KEYS_BY_LOGIC_ROLE = {
  [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: 'assignedTo',
  [COMPANY_FIELDS_LOGIC_ROLE.MR_RATING]: 'mrRating',
  [LEAD_FIELDS_LOGIC_ROLE.MR_RATING]: 'mrRating',
  [COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET]: 'targetMarket',
  [COMPANY_FIELDS_LOGIC_ROLE.SOURCE]: 'source',
  [LEAD_FIELDS_LOGIC_ROLE.SOURCE]: 'source',
  [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: 'stage',
  [LEAD_FIELDS_LOGIC_ROLE.STAGE]: 'stage',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: 'stage',
  [LEAD_FIELDS_LOGIC_ROLE.STATUS]: 'status',
  [COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS]: 'nurturingReason',
  [COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS]: 'discardedReason',
  [LEAD_FIELDS_LOGIC_ROLE.ICP]: 'buyerPersonas',
  [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: 'status',
  [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: 'salesStatus',
  [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: 'salesStatus',
  [TASK_FIELDS_LOGIC_ROLE.TITLE]: 'meetingType',
  [TASK_FIELDS_LOGIC_ROLE.COMPANY]: 'bobjectType',
  [TASK_FIELDS_LOGIC_ROLE.LEAD]: 'bobjectType',
  [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: 'dateFilter',
  [TASK_FIELDS_LOGIC_ROLE.DATA_SOURCE]: 'dataSource',
};

export interface useParamsReturn {
  slug: string;
  section: string;
}

export interface useLocationReturn {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: string;
}

export const getMixpanelKey = ({ slug, section }: useParamsReturn, pathname: string) => {
  const isSales = pathname.includes('/sales/');
  const page = isSales ? 'SALES' : 'PROSPECTING';

  switch (slug) {
    case 'allOpportunities':
      return 'ALL_MY_OPPS';
    case 'followUp':
      return 'FOLLOW_UP';
    case 'companiesAndLeads':
      if (section === 'leads') return `MY_COMPANIES_LEAD_${page}`;
      return `MY_COMPANIES_${page}`;
    case 'inactive':
      if (section === 'leads') return `INACTIVE_LEADS_${page}`;
      if (section === 'opportunities') return `INACTIVE_OPPORTUNITIES_${page}`;
      return `INACTIVE_${page}`;
  }
};

export const getRangeQuery = (data: { value?: any; type?: any }) => {
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

const generateQueryByBoject = (
  bobjectTypes: { findBy: (arg0: string) => { (arg0: any): any; new (): any } },
  bobjectTypeName: string,
  bobjectFields: { get: (arg0: any) => { (): any; new (): any; bobjectType: any } },
  moreFilters: any[],
) => {
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

export const buildSubhomeFilters = ({
  filtersToApply = [],
  subhomeFilters = [],
  bobjectFields,
  bobjectPicklistFieldValues,
}: {
  filtersToApply: any;
  subhomeFilters: any;
  bobjectFields: any;
  bobjectPicklistFieldValues: any;
}) => {
  if (!Array.isArray(filtersToApply) || !Array.isArray(subhomeFilters)) {
    throw new Error('Invalid params');
  }

  let filters = {};

  filtersToApply
    .filter(filter => {
      const filterLogicRole = bobjectFields?.get(filter.bobjectFieldId)?.logicRole;
      return subhomeFilters.some(logicRole => logicRole === filterLogicRole);
    })
    .forEach(filter => {
      const filterLogicRole = bobjectFields?.get(filter.bobjectFieldId)?.logicRole;
      const values = filter.values;

      switch (filterLogicRole) {
        case COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
        case COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET:
        case COMPANY_FIELDS_LOGIC_ROLE.SOURCE:
        case COMPANY_FIELDS_LOGIC_ROLE.STAGE:
        case COMPANY_FIELDS_LOGIC_ROLE.MR_RATING:
        case COMPANY_FIELDS_LOGIC_ROLE.STATUS:
        case COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS:
        case COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS:
        case COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS:
        case LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
        case LEAD_FIELDS_LOGIC_ROLE.ICP:
        case LEAD_FIELDS_LOGIC_ROLE.MR_RATING:
        case LEAD_FIELDS_LOGIC_ROLE.SOURCE:
        case LEAD_FIELDS_LOGIC_ROLE.STATUS:
        case LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS:
        case LEAD_FIELDS_LOGIC_ROLE.STAGE:
        case OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS:
        case TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
        case TASK_FIELDS_LOGIC_ROLE.TASK_TYPE:
        case TASK_FIELDS_LOGIC_ROLE.DATA_SOURCE:
        case TASK_FIELDS_LOGIC_ROLE.TITLE:
        case OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
          filters = {
            ...filters,
            [FILTERS_KEYS_BY_LOGIC_ROLE[filterLogicRole]]: values?.map(
              (filterValue: { textValue: string; bobjectPicklistValue: any }) => {
                return filterLogicRole === TASK_FIELDS_LOGIC_ROLE.TITLE
                  ? filterValue?.textValue
                  : filterValue?.bobjectPicklistValue;
              },
            ),
          };
          break;
        case OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT:
          filters = {
            ...filters,
            amount: { value: values[0].textValue, type: values[0].searchType },
          };
          break;
        case TASK_ACTION.LINKEDIN_MESSAGE:
        case TASK_ACTION.CALL:
        case TASK_ACTION.EMAIL:
          filters = {
            ...filters,
            type: [
              ...(filters?.type ? filters.type : []),
              ...values.map((filterValue: { bobjectPicklistValue: any }) => {
                const bpfvLogicRole = bobjectPicklistFieldValues?.get(
                  filterValue.bobjectPicklistValue,
                )?.logicRole;
                if (bpfvLogicRole.includes('CALL')) {
                  return 'CALL';
                }
                if (bpfvLogicRole.includes('EMAIL')) {
                  return 'EMAIL';
                }
                if (bpfvLogicRole.includes('LINKEDIN')) {
                  return 'LINKEDIN_MESSAGE';
                }

                return filterValue.bobjectPicklistValue;
              }),
            ],
          };
          break;
      }
    });

  return filters;
};

export const buildMoreFilters = ({
  filtersToApply = [],
  subhomeFilters = [],
  bobjectFields,
  bobjectTypes,
  moreFiltersApplied,
}: {
  filtersToApply: any;
  subhomeFilters: any;
  bobjectFields: any;
  bobjectTypes: any;
  moreFiltersApplied: any;
}) => {
  if (
    !Array.isArray(filtersToApply) ||
    !Array.isArray(subhomeFilters) ||
    (moreFiltersApplied && !isObject(moreFiltersApplied))
  ) {
    throw new Error('Invalid params');
  }

  const more = filtersToApply?.filter(filter => {
    const filterLogicRole = bobjectFields?.get(filter.bobjectFieldId)?.logicRole;
    return !subhomeFilters.some(logicRole => logicRole === filterLogicRole);
  });
  if (more && more.length > 0) {
    const queryCompany = generateQueryByBoject(
      bobjectTypes,
      BobjectTypes.Company,
      bobjectFields,
      more,
    );
    const queryLead = generateQueryByBoject(bobjectTypes, BobjectTypes.Lead, bobjectFields, more);
    const queryTask = generateQueryByBoject(bobjectTypes, BobjectTypes.Task, bobjectFields, more);
    const queryOpportunity = generateQueryByBoject(
      bobjectTypes,
      BobjectTypes.Opportunity,
      bobjectFields,
      more,
    );

    const queryMoreFilters = {
      ...moreFiltersApplied,
      ...queryCompany,
      ...queryLead,
      ...queryTask,
      ...queryOpportunity,
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
