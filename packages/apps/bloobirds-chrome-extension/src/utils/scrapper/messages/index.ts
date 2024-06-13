import { PortName, SyncSource, SyncThreadBackgroundMessage } from '../../../types/messages';
import { clearIntervalAsync } from '../../setIntervalAsync/clear-interval-async';
import { setIntervalAsync } from '../../setIntervalAsync/dynamic/set-interval-async';
import { isLinkedInMessagesPage, isSalesNavigatorMessagesPage } from '../../url';
import scrapLinkedInMessages from './linkedin/syncMessages';
import scrapLinkedInMiniMessages from './linkedinMini/syncMessages';
import scrapSalesNavigatorMessages from './sales/syncMessages';
import screpSalesNavigatorMiniMessages from './salesMini/syncMessages';

export const getMiniWindows = () => {
  return Array.from(
    document.querySelectorAll(
      '#msg-overlay .msg-overlay-conversation-bubble:not(.msg-overlay-conversation-bubble--is-minimized)',
    ),
  );
};

const port = chrome.runtime.connect({ name: PortName.SyncThread });

const syncThread = ({ messages, source, leadId }: SyncThreadBackgroundMessage) => {
  port?.postMessage({ messages, source, leadId });
};

export default async function startLinkedInMessageSyncing(
  countRef: any,
  setCount: (a: any) => void,
  leadId: string,
) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const node = mutation.addedNodes.item(0) as HTMLElement;
      if (node?.className?.includes) {
        const isMiniWindow = node?.className?.includes(
          'msg-overlay-conversation-bubble msg-overlay-conversation-bubble--default-inactive',
        );
        if (isMiniWindow) {
          setTimeout(async () => {
            const messages = await scrapLinkedInMiniMessages(node);
            syncThread({ messages, source: SyncSource.LinkedInMini, leadId });
          }, 1000);
        }
      }
      const salesNavNode = mutation.addedNodes.item(0) as HTMLElement;
      if (node?.className?.includes) {
        const isSalesNavMiniWindow =
          node?.className?.includes('message-overlay') && salesNavNode.nodeName === 'SECTION';
        if (isSalesNavMiniWindow) {
          setTimeout(async () => {
            const messages = await screpSalesNavigatorMiniMessages();
            syncThread({ messages, source: SyncSource.LinkedInMini, leadId });
          }, 1000);
        }
      }
    });
  });

  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  });

  /*chrome.runtime.onMessage.addListener(async message => {
    if (message.type === Actions.HistoryUpdate) {
      /!*if (isLinkedInMessagesPage(window.location.href)) {
        const messages = await scrapLinkedInMessages();
        syncThread({ messages, source: SyncSource.LinkedIn });
      }
      if (isSalesNavigatorMessagesPage(window.location.href)) {
        const messages = await scrapSalesNavigatorMessages();
        syncThread({ messages, source: SyncSource.SalesNavigator });
      }*!/
    }
  });*/

  /* if (isLinkedInMessagesPage(window.location.href)) {
    const messages = await scrapLinkedInMessages();
    syncThread({ messages, source: SyncSource.LinkedIn });
  }

  if (isSalesNavigatorMessagesPage(window.location.href)) {
    const messages = await scrapSalesNavigatorMessages();
    syncThread({ messages, source: SyncSource.SalesNavigator });
  }*/

  const timer = setIntervalAsync(async () => {
    if (countRef.current <= 50) {
      for (const miniWindow of getMiniWindows()) {
        const messages = await scrapLinkedInMiniMessages(miniWindow);
        syncThread({ messages, source: SyncSource.LinkedInMini, leadId });
      }

      if (isLinkedInMessagesPage(window.location.href)) {
        const messages = await scrapLinkedInMessages();
        syncThread({ messages, source: SyncSource.LinkedIn, leadId });
      }

      if (isSalesNavigatorMessagesPage(window.location.href)) {
        const messages = await scrapSalesNavigatorMessages();
        syncThread({ messages, source: SyncSource.SalesNavigator, leadId });
      }
      setCount((prevCountr: number) => prevCountr + 1);
    } else {
      clearIntervalAsync(timer);
    }
  }, 10000);
}
