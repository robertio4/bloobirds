import {
  Bobject,
  BobjectId,
  BobjectTypes,
  MainBobjectTypes,
  SALESFORCE_LOGIC_ROLES,
} from '@bloobirds-it/types';
import { baseUrls, isCompany, isLead, isOpportunity } from '@bloobirds-it/utils';
import normalize from 'normalize-url';

import { getFieldByLogicRole } from './bobjects.utils';

function getLinkedinPathname(currentPage: string): string {
  const match = currentPage?.split('linkedin.com');

  if (match && match.length > 1) {
    return match[1];
  } else {
    return '';
  }
}

function getSalesforcePathname(currentPage: string): string {
  const match = currentPage.split('lightning.force.com');

  if (match && match.length > 1) {
    return match[1];
  } else {
    return '';
  }
}

export function isLinkedInMessagesPage(currentPage: string): boolean {
  return !!getLinkedinPathname(currentPage).match('^/messaging/');
}

export function isSalesNavigatorMessagesPage(currentPage: string): boolean {
  return !!getLinkedinPathname(currentPage).match('^/sales/inbox');
}

export function isLinkedInProfilePage(currentPage: string): boolean {
  return !!getLinkedinPathname(currentPage).match('^/in/');
}

export function isLinkedInExamplePage(currentPage: string): boolean {
  return !!getLinkedinPathname(currentPage).match('^/in/tonipereznavarro');
}

export function isSalesNavigatorPage(currentPage: string): boolean {
  return !!getLinkedinPathname(currentPage).match('^/sales');
}

export function isSalesNavigatorProfile(currentPage: string): boolean {
  return (
    !!getLinkedinPathname(currentPage).match('^/sales/people/') ||
    !!getLinkedinPathname(currentPage).match('^/sales/lead/')
  );
}

export function isSalesforcePage(currentPage: string): boolean {
  return !!currentPage.match('^.*://.*.lightning.force.com.*');
}

export function shouldInjectSalesforce(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  return !pathname.includes('/lightning/setup');
}

export function isLinkedinOrSalesNav(currentPage: string): boolean {
  return currentPage.includes('linkedin');
}

export function isLinkedinSettingsPage(currentPage: string): boolean {
  return currentPage.includes('mypreferences');
}

export function isSalesforceListPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  return (
    isSalesforcePage(currentPage) && (!!pathname.match('/list.*') || !!pathname.match('/home'))
  );
}

export function isListOrSetupPage(path: string): boolean {
  return !!path.match('/home') || !!path.match('/list') || !!path.match('/setup');
}

export function isSalesforceLeadPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Lead') !== -1 && !isListOrSetupPage(pathname);
}

export function isSalesforceTaskPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Task') !== -1 && !isListOrSetupPage(pathname);
}

export function isSalesforceEventPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Event') !== -1 && !isListOrSetupPage(pathname);
}

export function isSalesforceContactPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Contact') !== -1 && !isListOrSetupPage(pathname);
}

export function isSalesforceAccountPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Account') !== -1 && !isListOrSetupPage(pathname);
}

export function isSalesforceOpportunityPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Opportunity') !== -1 && !isListOrSetupPage(pathname);
}

export function getSalesforceSobjectFromPage(currentPage: string): string {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit?.[3];
}

export function isTaskOrEventSalesforcePage(currentPage: string): boolean {
  return isSalesforceTaskPage(currentPage) || isSalesforceEventPage(currentPage);
}

export function isLeadOrContactSalesforcePage(currentPage: string): boolean {
  return isSalesforceLeadPage(currentPage) || isSalesforceContactPage(currentPage);
}

const SALESFORCE_OBJECT_TYPES = [
  'Lead',
  'Contact',
  'Opportunity',
  'Account',
  'Task',
  'Event',
  'Case',
];

export function getSalesforceIdFromPath(currentPage: string): string {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  const idIndex = pathSplit.findIndex(v => SALESFORCE_OBJECT_TYPES.includes(v));
  if (idIndex === -1) {
    return null;
  }
  return pathSplit?.[idIndex + 1] ?? null;
}

export function getSalesforceIdFromPathOtherObjects(
  currentPage: string,
  sobjectType: string,
): string {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  const idIndex = pathSplit.findIndex(v => v == sobjectType);
  if (idIndex === -1) {
    return null;
  }
  return pathSplit?.[idIndex + 1] ?? null;
}

export function removeQueryParams() {
  // Remove a query parameter from the current URL
  const urlWithoutQueryParam = window.location.href.split('?')[0];
  history.pushState(null, null, urlWithoutQueryParam);
}

export function removeQueryParam(param: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete(param);
  history.pushState(null, null, url.toString());
}

export function normalizeUrl(raw: string): string {
  if (typeof raw === 'string') {
    const validRaw = raw?.replace('?bb-open', '');
    const validRaw2 = validRaw?.replace('?bb-messaging-tab-open', '');

    const url = normalize(validRaw2, {
      forceHttps: true,
      stripWWW: false,
      removeTrailingSlash: false,
      removeQueryParameters: true,
    });

    if (isSalesNavigatorPage(url)) {
      const originalUrl = url.split(',')[0];
      // A ',' + suffix is needed for the URL to work
      return originalUrl + ',bb';
    }

    if (!url.endsWith('/')) {
      return url + '/';
    }

    return url;
  } else return null;
}

export function createBloobirdsUrlByIdAndType(id: string, type: string) {
  const baseUrl = baseUrls[process.env.NODE_ENV];
  if (type === BobjectTypes.Lead) {
    return `${baseUrl}/app/cl/leads/${id}`;
  }
  if (type === BobjectTypes.Company) {
    return `${baseUrl}/app/cl/companies/${id}`;
  }
  if (type === BobjectTypes.Opportunity) {
    return `${baseUrl}/app/cl/opportunities/${id}`;
  }
  return baseUrl;
}

export function createBloobirdsUrl(bobjectId: BobjectId) {
  return createBloobirdsUrlByIdAndType(bobjectId?.objectId, bobjectId?.typeName);
}

export const getSalesforceUrl = (bobject, lead, company, opportunity) => {
  let id;
  const leadBobject = isLead(bobject) ? bobject : lead;
  const companyBobject = isCompany(bobject) ? bobject : company;
  const opportunityBobject = isOpportunity(bobject) ? bobject : opportunity;
  if (leadBobject) {
    id = getSalesforceId(leadBobject);
  } else if (opportunityBobject) {
    id = getSalesforceId(opportunityBobject);
  } else if (companyBobject) {
    id = getSalesforceId(companyBobject);
  }
  if (id) {
    return `/${id}`;
  } else {
    return null;
  }
};

export const getSalesforceId = (bobject: Bobject<MainBobjectTypes>): string => {
  const type = bobject?.id.typeName;
  switch (type) {
    case BobjectTypes.Lead:
      return (
        getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.CONTACT_ID_FIELD)?.text ||
        getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.LEAD_ID_FIELD)?.text
      );
    case BobjectTypes.Company:
      return getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.ACCOUNT_ID_FIELD)?.text;
    case BobjectTypes.Opportunity:
      return getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.OPPORTUNITY_ID_FIELD)?.text;
    default:
      return null;
  }
};

export const addHttpIfNeeded = url => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

export function isIdLinkedinUrl(currentPage: string): boolean {
  return (
    isLinkedInProfilePage(currentPage) &&
    getLinkedinPathname(currentPage).match(/(?<=\/in\/).*(?=\/)/)?.[0]?.length === 39
  );
}

export function getLinedinIdFromUrl(currentPage: string): string {
  return isIdLinkedinUrl(currentPage)
    ? getLinkedinPathname(currentPage).match(/(?<=\/in\/).*(?=\/)/)?.[0]
    : null;
}
