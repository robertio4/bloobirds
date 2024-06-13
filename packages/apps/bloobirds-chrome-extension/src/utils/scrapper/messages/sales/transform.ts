import { normalizeUrl } from '../../../url';
import { OldLinkedInMessage } from '../types';
import { backfillTimes } from '../utils';

const elementToMessageObject = (message: any, meta: any) => {
  const body = message.querySelector('p')?.innerText?.trim();
  const name = message.querySelector('address')?.innerText?.trim();
  const time = message.querySelector('time')?.innerText?.trim();
  const date = message
    .closest('li')
    ?.querySelector('.message-item__date-boundary time')
    ?.innerText?.trim();

  const lead = meta.messageTo ? normalizeUrl(meta?.messageTo) : null;
  const profile = meta.nameTo === name ? normalizeUrl(lead) : 'self';

  return {
    body,
    name,
    profile,
    lead,
    time: time || null,
    date: date || null,
  };
};

export const transform = (messages: any, meta: any): Array<OldLinkedInMessage> =>
  backfillTimes(Array.from(messages).map(m => elementToMessageObject(m, meta)));
