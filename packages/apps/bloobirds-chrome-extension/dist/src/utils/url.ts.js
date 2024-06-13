import {
  BobjectTypes,
  SALESFORCE_LOGIC_ROLES
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { baseUrls, isCompany, isLead, isOpportunity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import normalize from "/vendor/.vite-deps-normalize-url.js__v--91e5723a.js";
import { getFieldByLogicRole } from "/src/utils/bobjects.utils.ts.js";
function getLinkedinPathname(currentPage) {
  const match = currentPage?.split("linkedin.com");
  if (match && match.length > 1) {
    return match[1];
  } else {
    return "";
  }
}
function getSalesforcePathname(currentPage) {
  const match = currentPage.split("lightning.force.com");
  if (match && match.length > 1) {
    return match[1];
  } else {
    return "";
  }
}
export function isLinkedInMessagesPage(currentPage) {
  return !!getLinkedinPathname(currentPage).match("^/messaging/");
}
export function isSalesNavigatorMessagesPage(currentPage) {
  return !!getLinkedinPathname(currentPage).match("^/sales/inbox");
}
export function isLinkedInProfilePage(currentPage) {
  return !!getLinkedinPathname(currentPage).match("^/in/");
}
export function isLinkedInExamplePage(currentPage) {
  return !!getLinkedinPathname(currentPage).match("^/in/tonipereznavarro");
}
export function isSalesNavigatorPage(currentPage) {
  return !!getLinkedinPathname(currentPage).match("^/sales");
}
export function isSalesNavigatorProfile(currentPage) {
  return !!getLinkedinPathname(currentPage).match("^/sales/people/") || !!getLinkedinPathname(currentPage).match("^/sales/lead/");
}
export function isSalesforcePage(currentPage) {
  return !!currentPage.match("^.*://.*.lightning.force.com.*");
}
export function shouldInjectSalesforce(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  return !pathname.includes("/lightning/setup");
}
export function isLinkedinOrSalesNav(currentPage) {
  return currentPage.includes("linkedin");
}
export function isLinkedinSettingsPage(currentPage) {
  return currentPage.includes("mypreferences");
}
export function isSalesforceListPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  return isSalesforcePage(currentPage) && (!!pathname.match("/list.*") || !!pathname.match("/home"));
}
export function isListOrSetupPage(path) {
  return !!path.match("/home") || !!path.match("/list") || !!path.match("/setup");
}
export function isSalesforceLeadPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  return pathSplit.indexOf("Lead") !== -1 && !isListOrSetupPage(pathname);
}
export function isSalesforceTaskPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  return pathSplit.indexOf("Task") !== -1 && !isListOrSetupPage(pathname);
}
export function isSalesforceEventPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  return pathSplit.indexOf("Event") !== -1 && !isListOrSetupPage(pathname);
}
export function isSalesforceContactPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  return pathSplit.indexOf("Contact") !== -1 && !isListOrSetupPage(pathname);
}
export function isSalesforceAccountPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  return pathSplit.indexOf("Account") !== -1 && !isListOrSetupPage(pathname);
}
export function isSalesforceOpportunityPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  return pathSplit.indexOf("Opportunity") !== -1 && !isListOrSetupPage(pathname);
}
export function getSalesforceSobjectFromPage(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  return pathSplit?.[3];
}
export function isTaskOrEventSalesforcePage(currentPage) {
  return isSalesforceTaskPage(currentPage) || isSalesforceEventPage(currentPage);
}
export function isLeadOrContactSalesforcePage(currentPage) {
  return isSalesforceLeadPage(currentPage) || isSalesforceContactPage(currentPage);
}
const SALESFORCE_OBJECT_TYPES = [
  "Lead",
  "Contact",
  "Opportunity",
  "Account",
  "Task",
  "Event",
  "Case"
];
export function getSalesforceIdFromPath(currentPage) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  const idIndex = pathSplit.findIndex((v) => SALESFORCE_OBJECT_TYPES.includes(v));
  if (idIndex === -1) {
    return null;
  }
  return pathSplit?.[idIndex + 1] ?? null;
}
export function getSalesforceIdFromPathOtherObjects(currentPage, sobjectType) {
  const pathname = getSalesforcePathname(currentPage);
  const pathSplit = pathname.split("/");
  const idIndex = pathSplit.findIndex((v) => v == sobjectType);
  if (idIndex === -1) {
    return null;
  }
  return pathSplit?.[idIndex + 1] ?? null;
}
export function removeQueryParams() {
  const urlWithoutQueryParam = window.location.href.split("?")[0];
  history.pushState(null, null, urlWithoutQueryParam);
}
export function removeQueryParam(param) {
  const url = new URL(window.location.href);
  url.searchParams.delete(param);
  history.pushState(null, null, url.toString());
}
export function normalizeUrl(raw) {
  if (typeof raw === "string") {
    const validRaw = raw?.replace("?bb-open", "");
    const validRaw2 = validRaw?.replace("?bb-messaging-tab-open", "");
    const url = normalize(validRaw2, {
      forceHttps: true,
      stripWWW: false,
      removeTrailingSlash: false,
      removeQueryParameters: true
    });
    if (isSalesNavigatorPage(url)) {
      const originalUrl = url.split(",")[0];
      return originalUrl + ",bb";
    }
    if (!url.endsWith("/")) {
      return url + "/";
    }
    return url;
  } else
    return null;
}
export function createBloobirdsUrlByIdAndType(id, type) {
  const baseUrl = baseUrls[process.env.ENV];
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
export function createBloobirdsUrl(bobjectId) {
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
export const getSalesforceId = (bobject) => {
  const type = bobject?.id.typeName;
  switch (type) {
    case BobjectTypes.Lead:
      return getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.CONTACT_ID_FIELD)?.text || getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.LEAD_ID_FIELD)?.text;
    case BobjectTypes.Company:
      return getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.ACCOUNT_ID_FIELD)?.text;
    case BobjectTypes.Opportunity:
      return getFieldByLogicRole(bobject, SALESFORCE_LOGIC_ROLES.OPPORTUNITY_ID_FIELD)?.text;
    default:
      return null;
  }
};
export const addHttpIfNeeded = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};
export function isIdLinkedinUrl(currentPage) {
  return isLinkedInProfilePage(currentPage) && getLinkedinPathname(currentPage).match(/(?<=\/in\/).*(?=\/)/)?.[0]?.length === 39;
}
export function getLinedinIdFromUrl(currentPage) {
  return isIdLinkedinUrl(currentPage) ? getLinkedinPathname(currentPage).match(/(?<=\/in\/).*(?=\/)/)?.[0] : null;
}
