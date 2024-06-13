import { normalizeUrl } from "/src/utils/url.ts.js";
import { backfillTimes } from "/src/utils/scrapper/messages/utils.ts.js";
const elementToMessageObject = (message, meta) => {
  const body = message.querySelector("p")?.innerText?.trim();
  const name = message.querySelector("address")?.innerText?.trim();
  const time = message.querySelector("time")?.innerText?.trim();
  const date = message.closest("li")?.querySelector(".message-item__date-boundary time")?.innerText?.trim();
  const lead = meta.messageTo ? normalizeUrl(meta?.messageTo) : null;
  const profile = meta.nameTo === name ? normalizeUrl(lead) : "self";
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
