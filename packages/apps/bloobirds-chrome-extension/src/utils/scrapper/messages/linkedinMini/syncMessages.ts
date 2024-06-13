import { isElementLoaded } from '@bloobirds-it/utils';

import { getLinedinIdFromUrl, normalizeUrl } from '../../../url';
import { LinkedInMessage } from '../types';
import { transformToNewMessageType } from '../utils';
import extractAuto from './extractAuto';
import { transform } from './transform';

// create meta object containing info about sender
export const getLinkedInMiniWindowMetaObject = async (
  miniWindow: any,
  skipMissing = false,
): Promise<any> => {
  const item = miniWindow.querySelector('.msg-s-event-listitem');
  let threadIdMatch;
  if (item) {
    threadIdMatch = item && item.dataset.eventUrn.match(/\(2-([A-Za-z0-9])+==,/);

    if (!threadIdMatch) {
      threadIdMatch = item.dataset.eventUrn.match(/(?<=fsd_profile:).*(?=,)/g);
    }
  }
  if (!threadIdMatch && !skipMissing) {
    console.log('Could not find threadId');
    return;
  }

  const threadId = threadIdMatch?.[0].slice(1, -1);
  const pathName = `/messaging/thread/${threadId}/`;
  let nameTo = miniWindow.querySelector('.msg-overlay-bubble-header__title')?.innerText;
  if (nameTo === 'New message' || nameTo === 'Nuevo mensaje') {
    const selector = '*[class*="profile-card-one-to-one__profile-link"]';
    await isElementLoaded(selector);
    nameTo =
      miniWindow.querySelector(selector)?.innerText ||
      // Premium selector
      miniWindow.querySelector('.artdeco-entity-lockup__title a')?.innerText;
  }
  const image = miniWindow.querySelector('header img')?.src;

  // This is available if there are few messages
  let messageTo =
    miniWindow.querySelector('.msg-s-profile-card-one-to-one a')?.href ||
    miniWindow.querySelector('.msg-overlay-bubble-header a')?.href ||
    // Premium selector
    miniWindow.querySelector('.artdeco-entity-lockup__title a')?.href;

  // if not available, we get the link from the messages, matching the name
  if (!messageTo) {
    const messages: Array<HTMLAnchorElement> = miniWindow.querySelectorAll(
      '.msg-s-message-list-container .msg-s-message-group__profile-link',
    );

    const nameLink = Array.from(messages).find((message: HTMLAnchorElement) => {
      const name = message.innerText.trim();

      return nameTo === name;
    });

    // Added this OR as the UI has changed
    messageTo = nameLink?.href || nameLink?.closest('a')?.href;
  }

  if (!messageTo && !skipMissing) {
    console.log('Could not find messageTo');
    return;
  }
  const titleSelector = '[class*="lockup__subtitle"] div';
  const titlePremiumSelector = '.artdeco-entity-lockup__subtitle';
  await isElementLoaded(titleSelector);
  const anchorElementJobTitle =
    miniWindow.querySelector(titleSelector) || miniWindow.querySelector(titlePremiumSelector);

  return {
    meta: {
      messageTo: messageTo && normalizeUrl(messageTo),
      leadId: messageTo && getLinedinIdFromUrl(normalizeUrl(messageTo)),
      nameTo,
      image,
      pathName,
      timestamp: new Date().getTime(),
      jobTitle: anchorElementJobTitle
        ? anchorElementJobTitle.innerText?.replace(/ (at|en) (.*)$/i, '')?.trim()
        : null,
      companyName: anchorElementJobTitle
        ? anchorElementJobTitle.innerText?.replace(/.*(at|en)/, '')?.trim()
        : null,
    },
  };
};

export default async (miniWindow: any, leadId?: string): Promise<Array<LinkedInMessage>> => {
  const object = await getLinkedInMiniWindowMetaObject(miniWindow);

  if (!object) {
    return [];
  }

  const response = await extractAuto(miniWindow);
  const oldLinkedInMessages = transform(response, object.meta);

  console.log(
    'Found ' + oldLinkedInMessages?.length + ' messages for ' + leadId ||
      object?.meta?.nameTo + ' ' + object?.meta?.messageTo + ', going to sync',
  );

  const messagesToSend = leadId
    ? oldLinkedInMessages?.map(message => ({
        ...message,
        bloobirdsId: leadId,
      }))
    : oldLinkedInMessages;

  return transformToNewMessageType({
    messages: messagesToSend,
    pathName: object?.meta?.pathName,
    leadName: object?.meta?.nameTo,
  });
};
