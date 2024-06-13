import { createApi } from '@bloobirds-it/plover';
import { AxiosInstance } from 'axios';

export const appHostnames = ['app.dev-bloobirds.com', 'app.bloobirds.com', 'localhost'];

//@ts-ignore
export const api: AxiosInstance = createApi({
  getToken: () => {
    if (
      typeof window !== 'undefined' &&
      (appHostnames.includes(window.location.hostname) ||
        window.location.hostname.includes('bloobirds-platform-frontend.pages.dev'))
    ) {
      const session = localStorage.getItem('bb-app-session');
      if (session) {
        return JSON.parse(session)?.token || null;
      }
      return null;
    } else {
      if (chrome && chrome?.storage && chrome.storage?.sync) {
        return new Promise(resolve => {
          chrome.storage?.sync?.get({ token: '' }, ({ token }) => {
            resolve(token);
          });
        });
      } else {
        return null;
      }
    }
  },
  getEnvironment: () => process.env.ENV || 'local',
});
