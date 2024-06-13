import { getSobjectTypeFromId, isSyncableSobject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport1_chillout from "/vendor/.vite-deps-chillout.js__v--b721a5eb.js"; const chillout = __vite__cjsImport1_chillout.__esModule ? __vite__cjsImport1_chillout.default : __vite__cjsImport1_chillout;
export const NON_PARSABLE_ELEMENTS = [
  "SCRIPT",
  "NOSCRIPT",
  "STYLE",
  "svg",
  "path",
  "PRE",
  "VIDEO",
  "IMG",
  "IFRAME"
];
export const HREF_REGEX = /\/r\/([a-zA-Z0-9]{18})\/view/;
export const HREF_REGEX_WITH_TYPE = /\/r\/([a-zA-Z0-9]*)\/([a-zA-Z0-9]{18})\/view/;
const isDynamics = !!document.location.href.match("^.*://.*.crm4.dynamics.com.*");
export const DYNAMICS_ID_FOCUS_REGEXP = /Slot([0-9]{1,4})-([a-fA-F0-9]{8})-([a-fA-F0-9]{4})-([a-fA-F0-9]{4})-([a-fA-F0-9]{4})-([a-fA-F0-9]{12})/;
function isRecordIdElement(element) {
  return !!element.dataset.recordId;
}
function isRecordHrefElement(element) {
  return !!element.dataset.href && element.dataset.href.includes("/lightning/r/");
}
function isRecordIdDynamicsElement(element) {
  return !!element.dataset.rowId;
}
function isRecordIdDynamicsFocusElement(element) {
  return element.id?.match(DYNAMICS_ID_FOCUS_REGEXP);
}
function shouldRenderAccountLink(recordId, shouldShowAccounts) {
  const sobjectType = getSobjectTypeFromId(recordId);
  return shouldShowAccounts || sobjectType !== "Account";
}
export function salesforce15o18IdConverter(id) {
  if (!id)
    throw new TypeError("No id given.");
  if (typeof id !== "string")
    throw new TypeError("The given id isn't a string");
  if (id.length === 18)
    return id;
  if (id.length !== 15)
    throw new RangeError("The given id isn't 15 characters long.");
  for (let i = 0; i < 3; i++) {
    let f = 0;
    for (let j = 0; j < 5; j++) {
      const c = id.charAt(i * 5 + j);
      if (c >= "A" && c <= "Z") {
        f += 1 << j;
      }
    }
    id += "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345".charAt(f);
  }
  return id;
}
export const isActivityId = (element) => {
  return element.tagName === "SPAN" && (element?.innerText.startsWith("00T") || element?.innerText.startsWith("00U")) && element?.innerText.length === 15;
};
export function extractRecordIdElements(element, insertElement, shouldShowAccounts = true, insertActivityElement) {
  element = element || document.body;
  if (element.nodeType !== 1) {
    return;
  }
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden" && !isDynamics || style.opacity === "0") {
    return;
  }
  if (NON_PARSABLE_ELEMENTS.includes(element.tagName)) {
    return;
  }
  if (element.childNodes.length > 0) {
    chillout.forEach(element.childNodes, (child) => {
      extractRecordIdElements(child, insertElement, shouldShowAccounts, insertActivityElement);
    });
  }
  const isDynamicsElement = element.hasAttribute("href") && !!element.getAttribute("href").match("^.*://.*.crm4.dynamics.com.*");
  if (isDynamicsElement) {
    const url = new URLSearchParams(element.getAttribute("href"));
    const recordId = url.get("id");
    const entity = url.get("etn");
    if (entity === "opportunity" || entity === "lead" || entity === "contact" || entity === "account") {
      insertElement(recordId, element);
    }
  }
  const isDynamicsElementFocusView = isDynamics && element.tagName === "SPAN" && element.className?.startsWith("TextCellStyle") && element.id.match(DYNAMICS_ID_FOCUS_REGEXP);
  if (isDynamicsElementFocusView) {
    const idArray = element.id?.split("-");
    idArray?.shift();
    const id = idArray.join("-");
    insertElement(id, element);
  }
  const isHrefElement = element.hasAttribute("href") && (element.getAttribute("href").match(HREF_REGEX) || element.getAttribute("href").match(HREF_REGEX_WITH_TYPE));
  const isRecordIdDocument = element.hasAttribute("data-recordid");
  if (isRecordIdDocument || isHrefElement || isActivityId(element)) {
    if (element?.innerText === "-") {
      return;
    }
    if (isRecordIdDocument) {
      const recordId = element.getAttribute("data-recordid");
      if (isSyncableSobject(recordId) && shouldRenderAccountLink(recordId, shouldShowAccounts)) {
        insertElement(recordId, element);
      }
    }
    if (isActivityId(element)) {
      insertActivityElement(salesforce15o18IdConverter(element.innerText), element);
    }
    if (isHrefElement) {
      const href = element.getAttribute("href");
      let recordId = null;
      if (href.match(HREF_REGEX)) {
        recordId = href.match(HREF_REGEX)[1];
      }
      if (href.match(HREF_REGEX_WITH_TYPE)) {
        recordId = href.match(HREF_REGEX_WITH_TYPE)[2];
      }
      if (!recordId || !isSyncableSobject(recordId) || !shouldRenderAccountLink(recordId, shouldShowAccounts)) {
        return;
      }
      insertElement(recordId, element);
    }
  }
}
export function generateCurrentPage(recordId, recordType) {
  return `https://internal.lightning.force.com/lightning/r/${recordType}/${recordId}/view`;
}
export async function getShouldProcessMutations(mutationsList) {
  return mutationsList.some((mutation) => {
    const addedNodes = Array.from(mutation.addedNodes);
    return [...addedNodes, mutation.target].some((node) => {
      if (node instanceof Element) {
        const element = node.querySelector('[data-recordid], [href*="/lightning/r/"], [row-id]');
        if (element) {
          return true;
        }
        const isRecordElement = isRecordIdElement(node) || isRecordHrefElement(node) || isRecordIdDynamicsElement(node);
        return isRecordElement;
      }
      return false;
    });
  });
}
export const generateBBLink = (recordId, element) => {
  const parent = element.parentNode;
  if (parent instanceof Element && (parent.classList.contains("slds-breadcrumb__item") || parent.classList.contains("slds-dropdown__item") || parent.classList.contains("oneConsoleTabItem"))) {
    return;
  }
  const child = parent.querySelector(`[id^=bb-link]`);
  if (child && child.id !== `bb-link-${recordId}`) {
    child.remove();
  }
  let bbLink;
  if (element.hasAttribute("data-bloobirds-link") && child) {
    if (child.childNodes.length > 0) {
      return;
    }
    bbLink = child;
  } else {
    bbLink = document.createElement("div");
    bbLink.setAttribute("id", `bb-link-${recordId}`);
  }
  element.parentNode.insertBefore(bbLink, element);
  const parentElement = element.parentNode;
  parentElement.style.justifyContent = "unset";
  parentElement.style.gap = "4px";
  parentElement.style.display = "flex";
  parentElement.style.alignItems = "center";
  element.setAttribute("data-bloobirds-link", "true");
  return bbLink;
};
