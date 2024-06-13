import {
  BobjectPicklistValueDataModel,
  CustomUserHelperKeys,
  FieldValue, UserHelperKeys, UserHelperTooltipsKeys
} from "@bloobirds-it/types";

import { APP_TASKS_SALES } from '../../app/_constants/routes';
import { useParamsReturn } from './salesPage/salesPage.utils';
import { PROSPECTING_SLUGS, SALES_SLUGS } from './subhomes.constants';
import { string } from "prop-types";

export const getMixpanelKey = ({ slug, section }: useParamsReturn, pathname: string) => {
  const isSales = pathname?.includes('/sales/');
  const page = isSales ? 'SALES' : 'PROSPECTING';

  switch (slug) {
    case SALES_SLUGS.ALL_MY_OPPS:
      return 'ALL_MY_OPPS';
    case PROSPECTING_SLUGS.DELIVERED:
      return 'DELIVERED';
    case PROSPECTING_SLUGS.ON_CADENCE:
      return 'CADENCE';
    case SALES_SLUGS.FOLLOW_UP:
      return 'FOLLOW_UP';
    case PROSPECTING_SLUGS.SCHEDULED:
      return 'SCHEDULED';
    case PROSPECTING_SLUGS.MEETING:
      return 'MEETING';
    case PROSPECTING_SLUGS.NURTURING:
      return 'NURTURING_PROSPECTING';
    case SALES_SLUGS.NURTURING:
      return 'NURTURING_SALES';
    case 'companiesAndLeads':
      if (section === 'leads') return `MY_COMPANIES_LEAD_${page}`;
      return `MY_COMPANIES_${page}`;
    case 'inactive':
      if (section === 'leads') return `INACTIVE_LEADS_${page}`;
      if (section === 'opportunities') return `INACTIVE_OPPORTUNITIES_${page}`;
      return `INACTIVE_${page}`;
  }
};

export type MixpanelKeyType = ReturnType<typeof getMixpanelKey>;

enum bobjectTabDictionary {
  Company = 'companies',
  Lead = 'leads',
  Opportunity = 'opportunities',
}

export function getBobjectType(value) {
  return Object.keys(bobjectTabDictionary).find(key => bobjectTabDictionary[key] === value);
}

export function getTabKey(slug, location) {
  if (slug === 'inactive') {
    return location.pathname.includes(APP_TASKS_SALES)
      ? CustomUserHelperKeys.INACTIVE_SALES_DEFAULT_TAB
      : CustomUserHelperKeys.INACTIVE_DEFAULT_TAB;
  } else if (slug === 'companiesAndLeads') {
    return 'COMPANIESANDLEADS_DEFAULT_TAB';
  } else {
    return `${slug.toUpperCase()}_DEFAULT_TAB`;
  }
}

export function parseNonImportantQuery(
  value: { [key: string]: any },
  priorityField: FieldValue,
  noPriorityField: BobjectPicklistValueDataModel,
) {
  const noPriorityQuery: { [id: string]: any } = {};
  if (value) {
    Object.keys(value).forEach(key => {
      if (key === priorityField?.id) {
        const v = value[key]?.find((value: string) => value === noPriorityField?.id);
        if (v) {
          noPriorityQuery[key] = [...value[key], '__MATCH_EMPTY_ROWS__'];
        }
      }
    });
  }
  return noPriorityQuery;
}
