import { LocalStorageKeys, TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getValueFromLogicRole, startOfDay, subDays, isElementLoaded, waitForElement } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import normalizeUrl from "/vendor/.vite-deps-normalize-url.js__v--91e5723a.js";
import { isSalesforcePage } from "/src/utils/url.ts.js";
export var TypeSearch = /* @__PURE__ */ ((TypeSearch2) => {
  TypeSearch2["SEARCH"] = "search";
  TypeSearch2["AGGREGATION"] = "aggregation";
  return TypeSearch2;
})(TypeSearch || {});
export var ExtensionLocationIdentifiers = /* @__PURE__ */ ((ExtensionLocationIdentifiers2) => {
  ExtensionLocationIdentifiers2["SALESFORCE"] = "salesforce";
  ExtensionLocationIdentifiers2["SALESFORCE_CONSOLE"] = "salesforce_console";
  ExtensionLocationIdentifiers2["LINKEDIN"] = "linkedin";
  ExtensionLocationIdentifiers2["LINKEDIN_SALES_NAVIGATOR"] = "linkedin_sales";
  ExtensionLocationIdentifiers2["LINKEDIN_SALES_NAVIGATOR_HOME"] = "linkedin_sales_navigator";
  ExtensionLocationIdentifiers2["LINKEDIN_SALES_NAVIGATOR_ACCOUNTS"] = "linkedin_sales_navigator_accounts";
  ExtensionLocationIdentifiers2["LINKEDIN_SALES_NAVIGATOR_LEADS"] = "linkedin_sales_navigator_leads";
  ExtensionLocationIdentifiers2["LINKEDIN_SALES_NAVIGATOR_LINKS"] = "linkedin_sales_navigator_links";
  ExtensionLocationIdentifiers2["LINKEDIN_SALES_NAVIGATOR_MESSAGING"] = "linkedin_sales_navigator_messaging";
  ExtensionLocationIdentifiers2["WHATSAPP_WEB"] = "whatsapp_web";
  ExtensionLocationIdentifiers2["DYNAMICS_365"] = "dynamics_365";
  return ExtensionLocationIdentifiers2;
})(ExtensionLocationIdentifiers || {});
const salesforceSelectorBodyTab = "body > div > span";
const salesforceConsoleHeader = "span.slds-truncate";
const salesforceConsoleSelectorBodyTab = "div.split-right";
const linkedInSelectorBodyTab = "body > div.application-outlet > div.authentication-outlet";
const linkedInSalesNavigatorHomeSelectorBodyTab = "div[class^=homepage]";
const linkedInSalesNavigatorSelectorAccountsTab = "div[class^=hue-web]";
const linkedInSalesNavigatorSelectorLeadTab = "main[id=content-main]";
const linkedInSalesNavigatorSelectorLinksTab = "section[class^=bundles]";
const linkedInSalesNavigatorSelectorMessagingTab = "article[class^=inbox]";
const linkedInSalesNavigatorSelector = "main[id=content-main]";
const whatsAppWebSelectorBodyTab = "body div#app";
const dynamics365SelectorBodyTab = '#ApplicationShell > div.flexbox[role="presentation"]';
const getLocationIdentifier = (externalUrl) => {
  const url2 = normalizeUrl(window.location.href);
  const url = externalUrl || url2;
  const isSalesforce = isSalesforcePage(url);
  if (isSalesforce) {
    const isSalesConsole = document.querySelector(salesforceConsoleHeader)?.getAttribute("title") === "Sales Console";
    if (isSalesConsole) {
      return "salesforce_console" /* SALESFORCE_CONSOLE */;
    }
    return "salesforce" /* SALESFORCE */;
  } else if (url.includes("linkedin.com/sales/home")) {
    return "linkedin_sales_navigator" /* LINKEDIN_SALES_NAVIGATOR_HOME */;
  } else if (url.includes("linkedin.com/sales/buyers")) {
    return "linkedin_sales_navigator_accounts" /* LINKEDIN_SALES_NAVIGATOR_ACCOUNTS */;
  } else if (url.includes("linkedin.com/sales/lists")) {
    return "linkedin_sales_navigator_leads" /* LINKEDIN_SALES_NAVIGATOR_LEADS */;
  } else if (url.includes("linkedin.com/sales/smart-links")) {
    return "linkedin_sales_navigator_links" /* LINKEDIN_SALES_NAVIGATOR_LINKS */;
  } else if (url.includes("linkedin.com/sales/inbox")) {
    return "linkedin_sales_navigator_messaging" /* LINKEDIN_SALES_NAVIGATOR_MESSAGING */;
  } else if (url.includes("linkedin.com/sales")) {
    return "linkedin_sales" /* LINKEDIN_SALES_NAVIGATOR */;
  } else if (url.includes("linkedin.com") && !url.includes("/sales/")) {
    return "linkedin" /* LINKEDIN */;
  } else if (url.includes("web.whatsapp.com")) {
    return "whatsapp_web" /* WHATSAPP_WEB */;
  } else if (url.includes("crm4.dynamics.com")) {
    return "dynamics_365" /* DYNAMICS_365 */;
  }
  return null;
};
export const getSalesNavSelector = () => {
  switch (locationIdentifier) {
    case "linkedin_sales_navigator_accounts" /* LINKEDIN_SALES_NAVIGATOR_ACCOUNTS */:
      return "div[class^=_subnav]";
    case "linkedin_sales_navigator_leads" /* LINKEDIN_SALES_NAVIGATOR_LEADS */:
      return "div[class^=lists-nav]";
    case "linkedin_sales_navigator_messaging" /* LINKEDIN_SALES_NAVIGATOR_MESSAGING */:
      return linkedInSalesNavigatorSelectorMessagingTab;
    default:
      return null;
  }
};
const locationIdentifier = getLocationIdentifier();
export const getSelector = (url) => {
  const locationIdentifier2 = getLocationIdentifier(url);
  switch (locationIdentifier2) {
    case "salesforce" /* SALESFORCE */:
      return salesforceSelectorBodyTab;
    case "salesforce_console" /* SALESFORCE_CONSOLE */:
      return salesforceConsoleSelectorBodyTab;
    case "linkedin" /* LINKEDIN */:
      return linkedInSelectorBodyTab;
    case "linkedin_sales_navigator" /* LINKEDIN_SALES_NAVIGATOR_HOME */:
      return linkedInSalesNavigatorHomeSelectorBodyTab;
    case "linkedin_sales_navigator_accounts" /* LINKEDIN_SALES_NAVIGATOR_ACCOUNTS */:
      return linkedInSalesNavigatorSelectorAccountsTab;
    case "linkedin_sales_navigator_leads" /* LINKEDIN_SALES_NAVIGATOR_LEADS */:
      return linkedInSalesNavigatorSelectorLeadTab;
    case "linkedin_sales_navigator_links" /* LINKEDIN_SALES_NAVIGATOR_LINKS */:
      return linkedInSalesNavigatorSelectorLinksTab;
    case "linkedin_sales_navigator_messaging" /* LINKEDIN_SALES_NAVIGATOR_MESSAGING */:
      return linkedInSalesNavigatorSelectorMessagingTab;
    case "linkedin_sales" /* LINKEDIN_SALES_NAVIGATOR */:
      return linkedInSalesNavigatorSelector;
    case "whatsapp_web" /* WHATSAPP_WEB */:
      return whatsAppWebSelectorBodyTab;
    case "dynamics_365" /* DYNAMICS_365 */:
      return dynamics365SelectorBodyTab;
    default:
      return null;
  }
};
export const getBellSelector = () => {
  switch (locationIdentifier) {
    case "salesforce" /* SALESFORCE */:
    case "salesforce_console" /* SALESFORCE_CONSOLE */:
      return "li.slds-global-actions__item slds-grid";
    case "linkedin" /* LINKEDIN */:
      return "li.global-nav__primary-item";
    case "dynamics_365" /* DYNAMICS_365 */:
      return '#topBar ul[data-id="CommandBar"] > li';
    default:
      return null;
  }
};
export const setPadding = (open, url) => {
  const locationIdentifier2 = getLocationIdentifier(url);
  switch (locationIdentifier2) {
    case "salesforce" /* SALESFORCE */: {
      const bodyElement = document.querySelector("body > div > div > section > div > div.fullheight") || document.querySelector("body > div > div > section > div.navexWorkspaceManager > div > div.tabsetBody");
      bodyElement?.setAttribute("style", `padding-left: ${open ? "56px" : "16px"} !important`);
      moveMinimizableModals(open);
      break;
    }
    case "salesforce_console" /* SALESFORCE_CONSOLE */:
      document.querySelector(salesforceConsoleSelectorBodyTab)?.setAttribute("style", `padding-left: ${open ? "56px" : "16px"} !important`);
      moveMinimizableModals(open);
      break;
    case "linkedin_sales_navigator" /* LINKEDIN_SALES_NAVIGATOR_HOME */:
      document.querySelector(linkedInSalesNavigatorHomeSelectorBodyTab)?.setAttribute("style", `padding-left: ${open ? "67px" : "16px"} !important`);
      break;
    case "linkedin_sales_navigator_accounts" /* LINKEDIN_SALES_NAVIGATOR_ACCOUNTS */:
      document.getElementById("content-main")?.setAttribute("style", `padding-left: ${open ? "56px" : "16px"} !important`);
      document.querySelector("div[class^=_subnav]")?.setAttribute("style", `left: ${open ? "53px" : "16px"} !important; z-index: 1 !important`);
      break;
    case "linkedin_sales_navigator_leads" /* LINKEDIN_SALES_NAVIGATOR_LEADS */:
    case "linkedin_sales" /* LINKEDIN_SALES_NAVIGATOR */: {
      const content = document.getElementById("content-main");
      content?.setAttribute("style", `padding-left: ${open ? "67px" : "16px"} !important`);
      const navBar = content?.querySelector("div[class^=lists-nav]");
      navBar?.setAttribute("style", `left: ${open ? "56px" : "16px"} !important; z-index: 1 !important`);
      navBar?.querySelector("nav")?.setAttribute("style", `width: auto !important`);
      break;
    }
    case "linkedin_sales_navigator_links" /* LINKEDIN_SALES_NAVIGATOR_LINKS */: {
      const content = document.getElementById("content-main");
      content?.setAttribute("style", `padding-left: ${open ? "56px" : "16px"} !important`);
      content?.querySelector("header")?.setAttribute("style", `z-index: 1 !important`);
      break;
    }
    case "linkedin_sales_navigator_messaging" /* LINKEDIN_SALES_NAVIGATOR_MESSAGING */:
      document.getElementById("content-main")?.setAttribute("style", `padding-left: ${open ? "56px" : "16px"} !important`);
      break;
    case "whatsapp_web" /* WHATSAPP_WEB */:
      break;
    case "dynamics_365" /* DYNAMICS_365 */:
      document.querySelector("#ApplicationShell > div.flexbox[role='presentation']")?.setAttribute("style", `padding-left: ${open ? "56px" : "16px"} !important`);
      break;
  }
};
export const checkIsOverdue = (item) => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));
  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};
export function getStyle(url, withFooter = true, open = true) {
  const locationIdentifier2 = getLocationIdentifier(url);
  switch (locationIdentifier2) {
    case "salesforce" /* SALESFORCE */: {
      const heightHeader = document.querySelector("header.oneHeader")?.clientHeight || 0;
      const heightNav = document.querySelector("one-appnav")?.clientHeight || 0;
      const heightFooter = withFooter ? document.querySelector("ul.utilitybar")?.clientHeight || 0 : 0;
      const header = heightHeader + heightNav;
      const height = window.innerHeight - heightHeader - heightNav - heightFooter;
      return {
        height,
        top: header
      };
    }
    case "salesforce_console" /* SALESFORCE_CONSOLE */: {
      const heightHeader = document.querySelector("header.oneHeader")?.clientHeight || 0;
      const heightNav = document.querySelector("div.tabsetHeader")?.clientHeight || 0;
      const heightFooter = document.querySelector("ul.utilitybar")?.clientHeight || 0;
      const header = heightHeader + heightNav;
      const height = window.innerHeight - heightHeader - heightNav - heightFooter;
      return {
        height,
        top: header
      };
    }
    case "linkedin" /* LINKEDIN */: {
      const heightHeader = document.querySelector("#global-nav")?.clientHeight || 0;
      const header = heightHeader;
      const height = window.innerHeight - heightHeader;
      return {
        height,
        top: header,
        zIndex: 2
      };
    }
    case "linkedin_sales_navigator" /* LINKEDIN_SALES_NAVIGATOR_HOME */: {
      const heightHeader = document.querySelector("body > header")?.clientHeight || 0;
      const header = heightHeader;
      const height = window.innerHeight - heightHeader;
      return {
        height,
        top: header
      };
    }
    case "linkedin_sales" /* LINKEDIN_SALES_NAVIGATOR */:
    case "linkedin_sales_navigator_leads" /* LINKEDIN_SALES_NAVIGATOR_LEADS */: {
      const heightHeader = document.querySelector("body > header")?.clientHeight || 0;
      const header = heightHeader;
      const height = window.innerHeight - heightHeader;
      return {
        height,
        top: header
      };
    }
    case "linkedin_sales_navigator_accounts" /* LINKEDIN_SALES_NAVIGATOR_ACCOUNTS */: {
      const heightHeader = document.querySelector("body > header")?.clientHeight || 0;
      const header = heightHeader;
      const height = window.innerHeight - heightHeader;
      return {
        height,
        top: header
      };
    }
    case "linkedin_sales_navigator_links" /* LINKEDIN_SALES_NAVIGATOR_LINKS */: {
      const heightHeader = document.querySelector("body > header")?.clientHeight || 0;
      const header = heightHeader;
      const height = window.innerHeight - heightHeader;
      return {
        height,
        top: header
      };
    }
    case "linkedin_sales_navigator_messaging" /* LINKEDIN_SALES_NAVIGATOR_MESSAGING */: {
      const heightHeader = document.querySelector("body > header")?.clientHeight || 0;
      const header = heightHeader;
      const height = window.innerHeight - heightHeader;
      return {
        height,
        top: header
      };
    }
    case "whatsapp_web" /* WHATSAPP_WEB */: {
      const height = document.body.clientHeight;
      const width = document.body.clientWidth;
      const app = document?.querySelector("div#app");
      if (app)
        app.style.paddingLeft = open ? width <= 1640 && width > 1440 ? "28px" : "56px" : "16px";
      isElementLoaded("div#app > div > div.two").then((el) => {
        if (el) {
          if (width <= 1440 || !open) {
            el.style.width = "100%";
          } else {
            el.style.width = "calc(100% - 88px)";
          }
        }
      });
      return {
        height,
        top: 0,
        zIndex: 102
      };
    }
    case "dynamics_365" /* DYNAMICS_365 */: {
      const heightHeader = document.querySelector("#ApplicationShell > div")?.clientHeight || 0;
      const height = document.body.clientHeight - heightHeader;
      const width = document.body.clientWidth;
      const widthNav = document.querySelector("#floating-menu")?.clientWidth || 0;
      const moveDynamicsElement = (el) => {
        const sidepeekClose = localStorage.getItem("SIDEPEEK_DISABLED") === "true";
        const open2 = localStorage.getItem("isMenuOpen") === "true";
        if (el?.closest("[role='dialog']")) {
          if (!open2 || sidepeekClose) {
            el.closest("[role='dialog']").style.right = "0px";
          } else {
            el.closest("[role='dialog']").style.right = `${widthNav}px`;
          }
        }
      };
      waitForElement("[data-id='quickCreateRoot'", moveDynamicsElement);
      isElementLoaded("[id='panels'").then((el) => {
        const sidepeekClose = localStorage.getItem("SIDEPEEK_DISABLED") === "true";
        const open2 = localStorage.getItem(LocalStorageKeys.IsMenuOpen) === "true";
        if (el) {
          if (!open2 || sidepeekClose) {
            el.style.width = "100%";
          } else {
            el.style.width = `calc(100% - ${(width - 50) * 0.33}px)`;
          }
        }
      });
      return {
        height,
        top: heightHeader
      };
    }
  }
}
export const moveMinimizableModals = (isMenuOpen) => {
  const minimizableSFDCModals = Array.from(document.querySelectorAll("div.DOCKED"));
  if (minimizableSFDCModals?.length > 0) {
    minimizableSFDCModals.forEach((element) => {
      if (element?.getBoundingClientRect()?.left < 70) {
        element.style.marginLeft = isMenuOpen ? "68px" : "26px";
      }
    });
  }
};
