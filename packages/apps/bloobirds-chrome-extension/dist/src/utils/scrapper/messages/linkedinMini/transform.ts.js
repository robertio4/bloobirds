import { normalizeUrl } from "/src/utils/url.ts.js";
import { backfillTimes } from "/src/utils/scrapper/messages/utils.ts.js";
const elementToMessageObject = (message, meta) => {
  const body = " " + message.querySelector(".msg-s-event-listitem__body")?.innerText;
  const name = message.querySelector(".msg-s-message-group__name")?.innerText?.trim();
  const time = message.querySelector(".msg-s-message-group__meta time")?.innerText?.trim();
  const date = message.querySelector(".msg-s-message-list__time-heading")?.innerText?.trim();
  const profileHref = message.querySelector(".msg-s-event-listitem__link")?.href;
  const profile = profileHref ? normalizeUrl(profileHref) : "";
  const lead = normalizeUrl(meta.messageTo);
  return {
    body,
    name,
    profile,
    lead,
    time: time || null,
    date: date || null,
    leadId: meta?.leadId
  };
};
export const transform = (messages, meta) => backfillTimes(Array.from(messages).map((m) => elementToMessageObject(m, meta)));
