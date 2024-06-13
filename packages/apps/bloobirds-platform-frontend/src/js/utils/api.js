import { createApi } from '@bloobirds-it/plover';

export const api = createApi({
  getToken: () => {
    const session = localStorage.getItem('bb-app-session');
    if (session) {
      return JSON.parse(session)?.token || null;
    }
    return null;
  },
  getEnvironment: () => process.env.ENV || 'local',
});
