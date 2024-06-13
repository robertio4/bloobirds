import { convertTo24HourFormat } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import * as Sentry from "/vendor/.vite-deps-@sentry_react.js__v--dfb3495e.js";
export const NON_PARSABLE_ELEMENTS = ["SCRIPT", "NOSCRIPT", "STYLE", "svg", "path", "PRE", "VIDEO", "IMG", "IFRAME"];
export var Status = /* @__PURE__ */ ((Status2) => {
  Status2["SUCCESS"] = "success";
  Status2["ERROR"] = "error";
  Status2["ENABLED"] = "enabled";
  Status2["LOADING"] = "loading";
  Status2["DISABLED"] = "disabled";
  return Status2;
})(Status || {});
export function getContactNumber(el = document.body) {
  const element = el.querySelector("[data-id]");
  if (!element) {
    return null;
  }
  const id = element?.dataset.id;
  if (!id || id.endsWith("@c.us")) {
    return null;
  }
  return id?.split("_")[1]?.split("@")[0];
}
export function getUTCDateFormMessageInputs(date, dateTime, seconds) {
  const [day, month, year] = date.split("/").map((str) => parseInt(str, 10));
  const [hour, minute] = dateTime.split(":").map((str) => parseInt(str, 10));
  const localDate = new Date(year, month - 1, day, hour, minute, seconds);
  const utcYear = localDate.getUTCFullYear();
  const utcMonth = localDate.getUTCMonth() + 1;
  const utcDay = localDate.getUTCDate();
  const utcHour = localDate.getUTCHours();
  const utcMinute = localDate.getUTCMinutes();
  const utcSeconds = localDate.getUTCSeconds();
  const utcDateStr = `${utcYear}-${String(utcMonth).padStart(2, "0")}-${String(utcDay).padStart(2, "0")}T${String(utcHour).padStart(2, "0")}:${String(utcMinute).padStart(2, "0")}:${String(utcSeconds).padStart(2, "0")}Z`;
  return utcDateStr;
}
export function extractWhatsappMessageElements(element, processMessage2) {
  element = element || document.body;
  if (element.nodeType !== 1 || !(element instanceof Element)) {
    return;
  }
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
    return;
  }
  if (NON_PARSABLE_ELEMENTS.includes(element.tagName)) {
    return;
  }
  if (element.children.length > 0) {
    Array.from(element.children).forEach((child) => {
      extractWhatsappMessageElements(child, processMessage2);
    });
  }
  if (element.dataset.id?.endsWith("@c.us")) {
    return;
  }
  if (element.tagName === "DIV" && element.getAttribute("data-id") && !element.getAttribute("data-bb-processed")) {
    processMessage2(element);
    element.setAttribute("data-bb-processed", "true");
  }
}
export const extractContactName = () => {
  const contactNameElement = document.querySelector("#main header span[dir=auto]");
  if (contactNameElement) {
    return contactNameElement.innerText;
  }
  return "";
};
export const processMessage = (element, whatsappLead, messageElements, messagesRef) => {
  const messageElement = element.querySelector(".selectable-text.copyable-text");
  const message = messageElement?.innerText;
  if (!message) {
    return;
  }
  const messageMetaElement = element.querySelector("[data-pre-plain-text]");
  const messageMeta = messageMetaElement?.getAttribute("data-pre-plain-text");
  if (!messageMetaElement || !messageMeta) {
    return;
  }
  const wsDate = messageMeta?.split("]")[0].split("[")[1];
  const isAmPm = wsDate?.includes("m") || wsDate?.includes("p") || wsDate?.includes("a");
  const dateTime = isAmPm ? convertTo24HourFormat(wsDate?.split(" ")[0], wsDate?.includes("p") ? "pm" : "am") : wsDate.split(",")[0];
  const date = wsDate?.split(" ")[isAmPm ? 2 : 1];
  const otherMessagesInSameMinute = messageElements.current.filter((messageElement2) => messageElement2.querySelector("[data-pre-plain-text]")?.getAttribute("data-pre-plain-text")?.split("]")[0].split("[")[1] === wsDate);
  const seconds = otherMessagesInSameMinute.indexOf(element);
  const isoDateTime = getUTCDateFormMessageInputs(date, dateTime, seconds);
  const direction = element.dataset.id.split("_")[0] === "true" ? "outgoing" : "incoming";
  const isFirstMessage = !!element?.children[0]?.children[1]?.querySelector(":scope > span");
  const insertionPoint = element?.children[0]?.children[1]?.querySelector(`:scope > div:nth-child(${isFirstMessage ? 3 : 2})`);
  if (insertionPoint?.querySelector("[data-bloobirds-button]")) {
    return;
  }
  const newDiv = document.createElement("div");
  newDiv.setAttribute("data-bloobirds-button", "true");
  if (insertionPoint && newDiv) {
    try {
      if (direction === "incoming") {
        insertionPoint?.insertBefore(newDiv, insertionPoint.firstElementChild);
      } else {
        insertionPoint?.appendChild(newDiv);
      }
    } catch (e) {
      Sentry.captureException(e, {
        extra: {
          message: "Error inserting the new div",
          element,
          insertionPoint,
          direction
        }
      });
    }
  }
  if (direction === "outgoing" && insertionPoint.querySelector('[data-icon="forward-chat"]')) {
    insertionPoint.style.width = "120px";
    insertionPoint.style.left = "-130px";
  }
  const whatsappMessage = {
    id: element.dataset.id,
    message,
    isoDateTime,
    direction,
    leadId: whatsappLead?.id,
    phoneNumber: whatsappLead?.number,
    div: newDiv,
    status: "enabled" /* ENABLED */
  };
  messagesRef.current.push(whatsappMessage);
};
