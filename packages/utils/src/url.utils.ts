import { BobjectId, BOBJECT_TYPES } from '@bloobirds-it/types';
import normalize from 'normalize-url';

export const openNewTab = (page, queryParams) => {
  let url = `${window.location.protocol}//${window.location.host}${page}`;
  const queryParamsParsed =
    queryParams && Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`)[0];

  if (queryParamsParsed) {
    url = `${url}?${queryParamsParsed}`;
  }
  window.open(url, '_blank');
};

export const addHttpIfNeeded = url => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

export const addHttpsIfNeeded = url => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

export const baseUrls = {
  production: 'https://app.bloobirds.com',
  development: 'https://app.dev-bloobirds.com',
  staging: 'https://app.staging-bloobirds.com',
  local: 'http://localhost:3000',
};

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

export const SALESFORCE_OBJECT_TYPES = [
  'Lead',
  'Contact',
  'Opportunity',
  'Account',
  'Task',
  'Event',
];
export const SYNCABLE_SALESFORCE_OBJECT_TYPES = ['Lead', 'Contact', 'Opportunity', 'Account'];

export function getMainSalesforceObjectFromURL(currentPage: string): string {
  let pathname = getSalesforcePathname(currentPage);
  if (currentPage.includes('ws=')) {
    pathname = currentPage?.split('ws=')?.[0];
  }
  const pathSplit = pathname?.split('/');
  if (!pathSplit) {
    return null;
  }
  for (const s of SALESFORCE_OBJECT_TYPES) {
    if (pathSplit.indexOf(s) !== -1) {
      return s;
    }
  }
  return null;
}

// Salesforce uses WS query param on nested sobject routes
export const getSalesforceObjectFromWSParam = (currentPage: string) => {
  const url = new URL(currentPage);
  const urlParams = new URLSearchParams(url?.search);
  const ws = urlParams.get('ws');
  const wsSplit = ws?.split('/');
  if (!wsSplit) {
    return null;
  }
  for (const s of SALESFORCE_OBJECT_TYPES) {
    if (wsSplit && wsSplit?.indexOf(s) !== -1) {
      return s;
    }
  }
  return null;
};

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

export function isDynamicsPage(currentPage: string): boolean {
  return !!currentPage.match('^.*://.*.crm4.dynamics.com.*');
}

export function isDynamicsListPage(currentPage: string): boolean {
  const pageType = new URLSearchParams(window.location.search)?.get('pagetype');
  return !!currentPage.match('^.*://.*.crm4.dynamics.com.*') && pageType === 'entitylist';
}

export function getDynamicsEntityType(currentPage: string): string {
  return new URLSearchParams(window.location.search)?.get('etn');
}

export function shouldInjectSalesforce(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  return !pathname.includes('/lightning/setup');
}

export function isLinkedinOrSalesNav(currentPage: string): boolean {
  return currentPage.includes('linkedin');
}

export function isListOrSetupPage(path: string): boolean {
  return !!path.match('/home') || !!path.match('/list') || !!path.match('/setup');
}

export function isSalesforceTaskPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Task') !== -1;
}

export function isSalesforceEventPage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Event') !== -1 && !isListOrSetupPage(pathname);
}

export function isSalesforceCasePage(currentPage: string): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf('Case') !== -1 && !isListOrSetupPage(pathname);
}

export function isSalesforceLeadPage(currentPage: string): boolean {
  // happy path: /lightning/r/Lead/00Q1r00001J8Z5jEAF/view
  // complex scenario: /lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview
  return isSalesforceObjectPage(currentPage, 'Lead');
}

export function isSalesforceContactPage(currentPage: string): boolean {
  return isSalesforceObjectPage(currentPage, 'Contact');
}

export function isSalesforceAccountPage(currentPage: string): boolean {
  return isSalesforceObjectPage(currentPage, 'Account');
}

export function isSalesforceOpportunityPage(currentPage: string): boolean {
  return isSalesforceObjectPage(currentPage, 'Opportunity');
}

function isMainSalesforceObjectPage(
  currentPage: string,
  objectName: 'Lead' | 'Contact' | 'Opportunity' | 'Account',
): boolean {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  return pathSplit.indexOf(objectName) !== -1 && !isListOrSetupPage(pathname);
}

function isSalesforceObjectPage(
  currentPage: string,
  objectName: 'Lead' | 'Contact' | 'Opportunity' | 'Account',
): boolean {
  if (isSalesforceSyncableObjectPage(currentPage)) {
    return isMainSalesforceObjectPage(currentPage, objectName);
  } else {
    if (currentPage.includes('ws=')) {
      const sobjectFromWS = getSalesforceObjectFromWSParam(currentPage);
      if (sobjectFromWS) {
        return sobjectFromWS === objectName;
      }
    }
  }
}

export function isTaskOrEventSalesforcePage(currentPage: string): boolean {
  return isSalesforceTaskPage(currentPage) || isSalesforceEventPage(currentPage);
}

export function isLeadOrContactSalesforcePage(currentPage: string): boolean {
  return isSalesforceLeadPage(currentPage) || isSalesforceContactPage(currentPage);
}

function isSalesforceSyncableObjectPage(currentPage: string): boolean {
  return SYNCABLE_SALESFORCE_OBJECT_TYPES.some(
    (s: 'Lead' | 'Contact' | 'Opportunity' | 'Account') =>
      isMainSalesforceObjectPage(currentPage, s),
  );
}

export function extractSalesforceIdFromPath(currentPage: string): string {
  // happy path: /lightning/r/Lead/00Q1r00001J8Z5jEAF/view
  // complex scenario: /lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split('/');
  const idIndex = pathSplit.findIndex(v => SYNCABLE_SALESFORCE_OBJECT_TYPES.includes(v));
  if (idIndex === -1) {
    return null;
  }
  if (pathSplit?.[idIndex + 1]) {
    return pathSplit?.[idIndex + 1];
  }

  //if it's a complex scenario we need to get the id from the ws query param
  if (currentPage.includes('ws=')) {
    const url = new URL(currentPage);
    const urlParams = new URLSearchParams(url?.search);
    const ws = urlParams.get('ws');
    const wsSplit = ws.split('/');
    const idIndex = wsSplit.findIndex(v => SYNCABLE_SALESFORCE_OBJECT_TYPES.includes(v));
    if (idIndex !== -1) {
      return wsSplit?.[idIndex + 1];
    }
  }
  return null;
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

export const makeUrl = url => {
  if (url) {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      return url;
    }
    return `http://${url}`;
  }
  return url;
};

export function createBloobirdsUrlByIdAndType(id: string, type: string) {
  const baseUrl = baseUrls[process.env.NODE_ENV];
  if (type === BOBJECT_TYPES.LEAD) {
    return `${baseUrl}/app/cl/leads/${id}`;
  }
  if (type === BOBJECT_TYPES.COMPANY) {
    return `${baseUrl}/app/cl/companies/${id}`;
  }
  if (type === BOBJECT_TYPES.OPPORTUNITY) {
    return `${baseUrl}/app/cl/opportunities/${id}`;
  }
  return baseUrl;
}

export function createBloobirdsUrl(bobjectId: BobjectId) {
  return createBloobirdsUrlByIdAndType(bobjectId?.objectId, bobjectId?.typeName);
}

export function redirectToMessagingSettings(type: 'linkedin' | 'whatsapp' | 'pitch') {
  const baseUrl = baseUrls[process.env.NODE_ENV];

  return `${baseUrl}/app/playbook/messaging/${type.toLowerCase()}`;
}

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

export const addProtocolToURL = (url: string): string => {
  const regex = /^[^:]+:\/\//;

  if (!url) {
    return '';
  }

  if (!regex.test(url)) {
    return 'https://' + url;
  }

  return url;
};
