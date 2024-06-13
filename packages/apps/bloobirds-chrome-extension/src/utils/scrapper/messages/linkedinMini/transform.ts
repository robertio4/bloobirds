import { normalizeUrl } from '../../../url';
import { OldLinkedInMessage } from '../types';
import { backfillTimes } from '../utils';

const elementToMessageObject = (message: any, meta: any) => {
  // In order to prevent duplication, the body have to be exactly the same when parsing from the
  // mini-windows or parsing from the messages tab. For some reason, when parsing from the messages
  // tab, the `transform` function adds a blank space at the beginning, so we do the same here :(
  const body = ' ' + message.querySelector('.msg-s-event-listitem__body')?.innerText;
  const name = message.querySelector('.msg-s-message-group__name')?.innerText?.trim();
  const time = message.querySelector('.msg-s-message-group__meta time')?.innerText?.trim();
  const date = message.querySelector('.msg-s-message-list__time-heading')?.innerText?.trim();
  const profileHref = message.querySelector('.msg-s-event-listitem__link')?.href;
  const profile = profileHref ? normalizeUrl(profileHref) : '';
  const lead = normalizeUrl(meta.messageTo);

  return {
    body,
    name,
    profile,
    lead,
    time: time || null,
    date: date || null,
    leadId: meta?.leadId,
  };
};

export const transform = (messages: any, meta: any): Array<OldLinkedInMessage> =>
  backfillTimes(Array.from(messages).map(m => elementToMessageObject(m, meta)));
