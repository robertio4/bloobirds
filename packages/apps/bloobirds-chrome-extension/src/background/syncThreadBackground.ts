import { isLoggedIn, getTokenEncoded } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import PQueue from 'p-queue';

import { PortName, SyncThreadBackgroundMessage } from '../types/messages';

const queue = new PQueue({
  concurrency: 1,
  interval: 2000,
  intervalCap: 1,
  autoStart: true,
  carryoverConcurrencyCount: true,
});

chrome?.runtime?.onConnect?.addListener(port => {
  if (port.name === PortName.SyncThread) {
    port.onMessage.addListener(({ messages, source }: SyncThreadBackgroundMessage) => {
      const messagesToSend = messages?.map(message => ({
        ...message,
        searchQuery: true,
      }));
      queue.add(() => {
        const isLogged = isLoggedIn();
        getTokenEncoded().then(token => {
          if (isLogged && token && messages.length > 0) {
            fetch(`${process.env.BASE_URL}/linkedin/sync/thread`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ messages: messagesToSend }),
            })
              .then(response => {
                if (response?.ok) {
                  return response?.json();
                }
              })
              .then(data => {
                if (data?.totalSyncedMessages > 0) {
                  mixpanel.track('LINKEDIN_MESSAGES_SYNCED', {
                    Amount: data?.totalSyncedMessages,
                    Source: source,
                  });
                }
              });
          }
        });
      });
    });
  }
});
