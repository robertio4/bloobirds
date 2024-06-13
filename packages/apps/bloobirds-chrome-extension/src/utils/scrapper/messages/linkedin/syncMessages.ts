import { MessagesEvents } from '@bloobirds-it/types';
import { isElementLoaded } from '@bloobirds-it/utils';

import { getLinedinIdFromUrl, normalizeUrl } from '../../../url';
import { LinkedInMessage } from '../types';
import { transformToNewMessageType } from '../utils';
import extractAuto from './extractAuto';
import { transform } from './transform';

// create meta object containing info about sender
export const getLinkedInMessagesMetaObject = async (): Promise<any> => {
  const anchorElement = document.querySelector('div.msg-thread a') as HTMLAnchorElement;
  const anchorElementTitle = document.querySelector('div.msg-thread a h2') as HTMLElement;
  const image = document.querySelector(
    '.msg-conversation-listitem__link.active img.presence-entity__image',
  ) as HTMLImageElement;

  const messageTo = anchorElement !== null ? normalizeUrl(anchorElement.href) : null;

  if (messageTo) {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.UrlFound, {
        detail: { linkedInUrl: messageTo, fullName: anchorElementTitle?.innerText?.trim() },
      }),
    );
  }

  const titleSelector = '[class*="lockup__subtitle"] div';
  const titlePremiumSelector = '.artdeco-entity-lockup__subtitle';
  await isElementLoaded(titleSelector);
  const anchorElementJobTitle =
    document.querySelector(titleSelector) || document.querySelector(titlePremiumSelector);

  return {
    meta: {
      messageTo,
      leadId: messageTo && getLinedinIdFromUrl(normalizeUrl(messageTo)),
      nameTo: anchorElementTitle !== null ? anchorElementTitle.innerText : null,
      image: image !== null ? image.src : null,
      pathName: window.location.pathname,
      timestamp: new Date().getTime(),
      jobTitle: anchorElementJobTitle
        ? anchorElementJobTitle?.innerText?.replace(/ (at|en) (.*)$/i, '')?.trim()
        : null,
      companyName: anchorElementJobTitle
        ? anchorElementJobTitle?.innerText?.replace(/.*(at|en)/, '')?.trim()
        : null,
    },
  };
};

export default async function syncLinkedInMessages(
  leadId?: string,
  url?: string,
  currentRef?: any,
): Promise<Array<LinkedInMessage>> {
  if ((url && url !== normalizeUrl(window.location.href)) || currentRef.current === false) {
    return [];
  }
  const response = await extractAuto();

  if ((url && url !== normalizeUrl(window.location.href)) || currentRef.current === false) {
    return [];
  }

  const object = await getLinkedInMessagesMetaObject();

  if (object.meta.pathName?.includes('/new')) {
    return [];
  }

  const oldLinkedInMessages = transform(response);

  if ((url && url !== normalizeUrl(window.location.href)) || currentRef.current === false) {
    return [];
  }

  if (url && new URL(url) && !new URL(url)?.pathname.startsWith(window.location.pathname)) {
    console.log(
      `discarded because different criteria ${window.location.pathname} ${new URL(url)?.pathname}`,
    );
    return [];
  }

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
    pathName: object.meta.pathName,
    leadName: object.meta.nameTo,
  });
}
