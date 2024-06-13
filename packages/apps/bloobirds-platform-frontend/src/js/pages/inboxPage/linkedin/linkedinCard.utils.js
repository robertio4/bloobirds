import { APP_CL_COMPANIES } from '../../../app/_constants/routes';
import { getObjectIdFromId } from '../../../utils/bobjects.utils';

export const getActivityUrl = ({ lead, company, opportunity }) => {
  if (lead) {
    return company?.value
      ? `${APP_CL_COMPANIES}/${getObjectIdFromId(company.value)}?leadId=${getObjectIdFromId(
          lead.value,
        )}`
      : `/app/cl/leads/${getObjectIdFromId(lead.value)}`;
  }
  if (opportunity && company) {
    return `/app/cl/companies/${getObjectIdFromId(company.value)}/opportunities/${getObjectIdFromId(
      opportunity.value,
    )}`;
  }
  if (company) {
    return `/app/cl/companies/${getObjectIdFromId(company.value)}`;
  }
  return '';
};
