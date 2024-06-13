import {
  isCompanyPage,
  isLeadPage,
  isLeadWithoutCompanyPage,
  isOpportunityPage,
} from './pages.utils';

export const constructMixpanelCustomRoute = path => {
  if (isLeadPage(path)) {
    return 'LEAD_PAGE';
  }
  if (isCompanyPage(path)) {
    return 'COMPANY_PAGE';
  }
  if (isLeadWithoutCompanyPage(path)) {
    return 'LEAD_WITHOUT_COMPANY_PAGE';
  }
  if (isOpportunityPage(path)) {
    return 'OPP_PAGE';
  }
  return path;
};
