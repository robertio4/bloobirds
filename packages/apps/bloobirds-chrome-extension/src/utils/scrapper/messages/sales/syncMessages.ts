import { MessagesEvents } from '@bloobirds-it/types';

import { getLinkedInUrl } from '../../../salesUrlConverter';
import { normalizeUrl } from '../../../url';
import { LinkedInMessage } from '../types';
import { transformToNewMessageType } from '../utils';
import extractAuto from './extractAuto';
import { transform } from './transform';

export const getSalesNavMessagingSenderMetaObject = async (): Promise<any> => {
  const anchorElement = document.querySelector(
    'a[data-control-name="view_profile"]',
  ) as HTMLAnchorElement;
  const profileUrl = anchorElement?.href;

  const salesNavigatorUrl = profileUrl ? normalizeUrl(profileUrl) : '';
  const messageTo = salesNavigatorUrl ? await getLinkedInUrl(salesNavigatorUrl) : null;

  const anchorElementTitle = document.querySelector(
    'a[data-control-name="view_profile"] span',
  ) as HTMLElement;
  const anchorElementJobTitle =
    anchorElement !== null
      ? (anchorElement?.querySelector('span[data-anonymize="headline"]') as HTMLSpanElement)
      : null;

  const image = document.querySelector(
    'a[data-control-name="view_profile"] img',
  ) as HTMLImageElement;

  if (messageTo || salesNavigatorUrl) {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.UrlFound, {
        detail: {
          linkedInUrl: messageTo,
          salesNavigatorUrl,
          fullName: anchorElementTitle?.innerText?.trim(),
        },
      }),
    );
  } else {
    console.log(`Could not find LinkedInUrl for ${salesNavigatorUrl}`);
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.UrlNotFound, { detail: { salesNavigatorUrl } }),
    );
    return;
  }

  return {
    meta: {
      messageTo: messageTo || salesNavigatorUrl,
      salesNavigatorUrl: salesNavigatorUrl,
      nameTo: anchorElementTitle !== null ? anchorElementTitle.innerText.trim() : null,
      image: image !== null ? image.src : null,
      pathName: window.location.pathname, // Should this be Linkedin's page?
      timestamp: new Date().getTime(),
      jobTitle: anchorElementJobTitle
        ? anchorElementJobTitle.innerText?.replace(/ (at|en) (.*)$/i, '')?.trim()
        : null,
      companyName: anchorElementJobTitle
        ? anchorElementJobTitle.innerText?.replace(/^.*[at |en]/, '')?.trim()
        : null,
    },
  };
};

export default async (
  leadId?: string,
  url?: string,
  currentRef?: any,
): Promise<Array<LinkedInMessage>> => {
  if ((url && url !== normalizeUrl(window.location.href)) || currentRef.current === false) {
    return [];
  }
  const response = await extractAuto();

  if ((url && url !== normalizeUrl(window.location.href)) || currentRef.current === false) {
    return [];
  }

  const object = await getSalesNavMessagingSenderMetaObject();

  if ((url && url !== normalizeUrl(window.location.href)) || currentRef.current === false) {
    return [];
  }

  if (url && new URL(url) && !new URL(url)?.pathname.startsWith(object?.meta?.pathName)) {
    console.log(
      `discarded because different criteria ${object?.meta?.pathName} ${new URL(url)?.pathname}`,
    );
    return [];
  }

  if (!object) {
    return [];
  }

  const oldLinkedInMessages = transform(response, object.meta);
  if ((url && url !== normalizeUrl(window.location.href)) || currentRef.current === false) {
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
};
