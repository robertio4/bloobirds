import { normalizeUrl } from "/src/utils/url.ts.js";
import { backfillTimes } from "/src/utils/scrapper/messages/utils.ts.js";
const textContainerSelector = (element) => element.querySelector("div.msg-s-event-listitem__message-bubble");
const refSelector = (element) => element.querySelector("a");
const dateSelector = (element) => element.querySelector("time.msg-s-message-list__time-heading");
const nameSelector = (element) => element.querySelector("span.msg-s-message-group__name");
const timeSelector = (element) => element.querySelector("time.msg-s-message-group__timestamp");
const getHeaderTextIfExist = (element) => {
  const container = textContainerSelector(element);
  if (container != null) {
    const header = container.querySelector(".t-bold");
    return header != null ? header.textContent : "";
  }
  return "";
};
const extractText = (message) => {
  const textHeader = getHeaderTextIfExist(message);
  const container = textContainerSelector(message);
  const paragraph = container && container.querySelector("p");
  let textParagraph;
  if (paragraph) {
    textParagraph = paragraph.textContent;
  } else {
    textParagraph = "Info: Message could not be parsed into Bloobirds";
  }
  return `${textHeader} ${textParagraph}`;
};
const extractDataFactory = (extract) => (element) => (selector) => selector(element) != null ? selector(element)[extract].trim() : null;
const extractDataRefFactory = extractDataFactory("href");
const extractDataTextFactory = extractDataFactory("innerText");
const elementToMessageObject = (message, meta) => {
  const extractDataText = extractDataTextFactory(message);
  const extractDataRef = extractDataRefFactory(message);
  const date = extractDataText(dateSelector);
  const name = extractDataText(nameSelector);
  const time = extractDataText(timeSelector);
  const profile = extractDataRef(refSelector);
  const anchorElement = document.querySelector("div.msg-thread a");
  const messageTo = anchorElement !== null ? normalizeUrl(anchorElement.href) : null;
  return {
    body: extractText(message),
    profile: profile ? normalizeUrl(profile) : null,
    lead: messageTo,
    time,
    name,
    date,
    leadId: meta?.leadId
  };
};
export const transform = (messages, meta) => backfillTimes(Array.from(messages).map((m) => elementToMessageObject(m, meta)));
