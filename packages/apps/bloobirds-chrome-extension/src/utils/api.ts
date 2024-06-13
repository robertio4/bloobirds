import { createApi } from '@bloobirds-it/plover';

export const api = createApi({
  getToken: () => {
    return new Promise(resolve => {
      chrome.storage?.sync?.get({ token: '' }, ({ token }) => {
        resolve(token);
      });
    });
  },
  getEnvironment: () => process.env.NODE_ENV,
});
