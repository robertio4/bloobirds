import { paramsToQuery } from '../../../misc/urlQueryUtils';
import {
  APP_CL,
  APP_CL_ACTIVITIES,
  APP_CL_COMPANIES,
  APP_CL_LEADS,
  APP_CL_MEETINGS,
  APP_CL_OPPORTUNITIES,
  APP_CL_TASKS,
} from '../../../app/_constants/routes';

export const getViewUrl = element => {
  const query = paramsToQuery({ viewId: element?.bobjectView?.id });

  let path;
  switch (element?.bobjectView?.viewType) {
    case 'COMPANY':
      path = APP_CL_COMPANIES;
      break;
    case 'LEAD':
      path = APP_CL_LEADS;
      break;
    case 'ACTIVITY':
      path = APP_CL_ACTIVITIES;
      break;
    case 'TASK':
      path = APP_CL_TASKS;
      break;
    case 'OPPORTUNITY':
      path = APP_CL_OPPORTUNITIES;
      break;
    case 'MEETING':
      path = APP_CL_MEETINGS;
      break;
    default:
      path = APP_CL;
  }
  return `${path}?${query}`;
};
