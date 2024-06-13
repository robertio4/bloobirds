import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { MainBobjectTypes } from '../../../../hooks/useSubhomeFilters';
import { BobjectTypes, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

export const getSortFields = (
  sortValue: SortValues,
  bobjectType: MainBobjectTypes = BobjectTypes.Company,
) => {
  switch (sortValue) {
    case 'highPriority':
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
  }
};
