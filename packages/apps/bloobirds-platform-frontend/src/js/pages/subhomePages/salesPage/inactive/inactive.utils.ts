import { BobjectTypes, BobjectType, MainBobjectTypes, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { AllSortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';

const SessionManager = SessionManagerFactory();

export const getBaseQuery = (bobjectType: BobjectType, statuses: Array<string>) => {
  const userId = SessionManager?.getUser()?.id;
  switch (bobjectType) {
    case 'Company':
      return {
        [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
        [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [COMPANY_STAGE_LOGIC_ROLE.SALES],
        [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: statuses,
        [COMPANY_FIELDS_LOGIC_ROLE.IS_INACTIVE]: COMPANY_FIELDS_LOGIC_ROLE.IS_INACTIVE + '__YES',
      };
    case 'Lead':
      return {
        [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
        [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [LEAD_STAGE_LOGIC_ROLE.SALES],
        [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: statuses,
        [LEAD_FIELDS_LOGIC_ROLE.IS_INACTIVE]: LEAD_FIELDS_LOGIC_ROLE.IS_INACTIVE + '__YES',
      };
    case 'Opportunity': {
      return {
        [OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
        [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: statuses,
        [OPPORTUNITY_FIELDS_LOGIC_ROLE.IS_INACTIVE]:
          OPPORTUNITY_FIELDS_LOGIC_ROLE.IS_INACTIVE + '__YES',
      };
    }
    default:
      return undefined;
  }
};

export const getSortFields = (
  sortValue: AllSortValues,
  bobjectType = BobjectTypes.Company as MainBobjectTypes,
) => {
  switch (sortValue) {
    case 'highPriority':
      if (bobjectType === BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].HIGH_PRIORITY,
          direction: 'DESC',
        },
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'DESC',
        },
      ];
    case 'timeZone':
      if (bobjectType === BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].TIME_ZONE,
          direction: 'DESC',
        },
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'DESC',
        },
      ];
    case 'country':
      if (bobjectType === BobjectTypes.Opportunity || bobjectType === BobjectTypes.Lead) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].COUNTRY,
          direction: 'ASC',
        },
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'DESC',
        },
      ];
    case 'name':
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].NAME,
          direction: 'ASC',
        },
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'DESC',
        },
      ];
    case 'source':
      if (bobjectType === BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].SOURCE,
          direction: 'ASC',
        },
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'DESC',
        },
      ];
    case 'mrRating':
      if (bobjectType === BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].MR_RATING,
          direction: 'ASC',
        },
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'DESC',
        },
      ];
    case 'assignedDateRecent':
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'DESC',
        },
      ];
    case 'assignedDateOldest':
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE,
          direction: 'ASC',
        },
      ];
    case 'lastAttemptRecent':
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ATTEMPTS_LAST_DAY,
          direction: 'DESC',
        },
      ];
    case 'lastAttemptOldest':
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].ATTEMPTS_LAST_DAY,
          direction: 'ASC',
        },
      ];
    case 'lastUpdateRecent':
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].UPDATE_DATETIME,
          direction: 'DESC',
        },
      ];
    case 'lastUpdateOldest':
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].UPDATE_DATETIME,
          direction: 'ASC',
        },
      ];
    case 'closeDateOldest':
      if (bobjectType !== BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].CLOSE_DATE,
          direction: 'ASC',
        },
      ];
    case 'closeDateMostRecent':
      if (bobjectType !== BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].CLOSE_DATE,
          direction: 'DESC',
        },
      ];
    case 'state':
      if (bobjectType !== BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].STATUS,
          direction: 'ASC',
        },
      ];
    case 'amount':
      if (bobjectType !== BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].AMOUNT,
          direction: 'DESC',
        },
      ];
    case 'creationDateOldest':
      if (bobjectType !== BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].CREATION_DATETIME,
          direction: 'ASC',
        },
      ];
    case 'creationDateRecent':
      if (bobjectType !== BobjectTypes.Opportunity) return;
      return [
        {
          field: FIELDS_LOGIC_ROLE[bobjectType].CREATION_DATETIME,
          direction: 'DESC',
        },
      ];
  }
};
