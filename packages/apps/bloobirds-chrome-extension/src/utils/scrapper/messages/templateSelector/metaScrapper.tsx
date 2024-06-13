import { isElementLoaded } from '@bloobirds-it/utils';

import { PortName, SyncSource, SyncThreadBackgroundMessage } from '../../../../types/messages';
import { TemplateSelectorPlaces } from '../../../../types/messagingTemplates';
import { searchLeadByQuery } from '../../../leads';
import { isIdLinkedinUrl, normalizeUrl } from '../../../url';
import scrapLinkedInMessages, { getLinkedInMessagesMetaObject } from '../linkedin/syncMessages';
import scrapLinkedInMiniMessages, {
  getLinkedInMiniWindowMetaObject,
} from '../linkedinMini/syncMessages';
import scrapSalesNavigatorMessages, {
  getSalesNavMessagingSenderMetaObject,
} from '../sales/syncMessages';
import scrapSalesNavigatorChatMessages from '../salesMini/syncMessages';

const port = chrome.runtime.connect({ name: PortName.SyncThread });

const syncThread = ({ messages, source }: SyncThreadBackgroundMessage) => {
  port?.postMessage({ messages, source });
};

export const scrapAndSync = async (
  url: string,
  bubbleEl: Element,
  place: string,
  id: string,
  currentRef?: any,
) => {
  if (place === TemplateSelectorPlaces.LinkedinChat) {
    const messages = await scrapLinkedInMiniMessages(bubbleEl, id);
    syncThread({ messages, source: SyncSource.LinkedInMini });
  } else if (place === TemplateSelectorPlaces.Linkedin) {
    const messages = await scrapLinkedInMessages(id, url, currentRef);
    syncThread({ messages, source: SyncSource.LinkedIn });
  } else if (place === TemplateSelectorPlaces.SalesNavigator) {
    const messages = await scrapSalesNavigatorMessages(id, url, currentRef);
    syncThread({ messages, source: SyncSource.SalesNavigator });
  } else if (place === TemplateSelectorPlaces.SalesNavigatorChat) {
    const messages = await scrapSalesNavigatorChatMessages(id);
    syncThread({ messages, source: SyncSource.SalesNavigatorChat });
  }
};

export const fetchLead = async (
  place: string,
  bubbleEl: Element,
  setLead: any,
  setLoading: any,
  url: string,
  currentTemplateRef: any,
) => {
  const searchLead = (data: any, fieldToSearch: 'linkedInUrl' | 'salesNavigatorUrl') => {
    searchLeadByQuery({
      [fieldToSearch]: isIdLinkedinUrl(data?.meta?.messageTo)
        ? null
        : data?.meta?.messageTo || null,
      leadFullName: data?.meta?.nameTo,
      linkedInId: data?.meta?.leadId,
      autoMatching:
        place === TemplateSelectorPlaces.Linkedin || place === TemplateSelectorPlaces.LinkedinChat,
    })
      .then(d => {
        if (currentTemplateRef.current === false) return;
        if (d?.leads?.[0] && d?.leads?.length === 1 && d?.exactMatch === true) {
          setLead({
            ...d?.leads[0],
            nameTo: data?.meta?.nameTo,
            jobTitle: d?.leads[0]?.jobTitle || data?.meta?.jobTitle,
            companyName: d?.leads[0]?.companyName || data?.meta?.companyName,
          });
          if (currentTemplateRef.current === false) return;
          scrapAndSync(url, bubbleEl, place, d?.leads?.[0]?.id?.value, currentTemplateRef);
          setLoading(false);
        } else {
          setLead({
            nameTo: data?.meta?.nameTo,
            jobTitle: data?.meta?.jobTitle,
            companyName: data?.meta?.companyName,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        if (currentTemplateRef?.current === false) return;
        setLead({
          nameTo: data?.meta?.nameTo,
          jobTitle: data?.meta?.jobTitle,
          companyName: data?.meta?.companyName,
        });
        setLoading(false);
      });
  };
  if (place === TemplateSelectorPlaces.LinkedinChat) {
    if (currentTemplateRef?.current === false) return;
    setLead(null);
    setLoading(true);
    const data = await getLinkedInMiniWindowMetaObject(bubbleEl, true);
    if (currentTemplateRef?.current === false) return;
    if (data?.meta) {
      searchLead(data, 'linkedInUrl');
    }
  }

  if (place === TemplateSelectorPlaces.Linkedin) {
    if (currentTemplateRef?.current === false) return;
    setLead(null);
    setLoading(true);
    const data = await getLinkedInMessagesMetaObject();
    if (currentTemplateRef?.current === false) return;
    if (data?.meta) {
      searchLead(data, 'linkedInUrl');
    }
  }

  if (
    place === TemplateSelectorPlaces.SalesNavigator ||
    place === TemplateSelectorPlaces.SalesNavigatorChat
  ) {
    if (currentTemplateRef.current === false) return;
    setLead(null);
    setLoading(true);
    isElementLoaded('a[data-control-name="view_profile"]').then(async () => {
      if (url !== normalizeUrl(window.location.href)) return;
      if (currentTemplateRef?.current === false) return;
      const data = await getSalesNavMessagingSenderMetaObject();
      if (currentTemplateRef?.current === false) return;
      if (data?.meta) {
        searchLead(data, 'salesNavigatorUrl');
      }
    });
  }
};

export async function getData(place: string, bubbleEl: Element, url?: string) {
  if (place === TemplateSelectorPlaces.LinkedinChat) {
    return await getLinkedInMiniWindowMetaObject(bubbleEl, true);
  }

  if (place === TemplateSelectorPlaces.Linkedin) {
    return await getLinkedInMessagesMetaObject();
  }

  if (place === TemplateSelectorPlaces.SalesNavigator) {
    await isElementLoaded('a[data-control-name="view_profile"]');
    if (url !== normalizeUrl(window.location.href)) return;
    return await getSalesNavMessagingSenderMetaObject();
  }
}
