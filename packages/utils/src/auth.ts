import { api, appHostnames } from './api';
import { MessagesEvents } from './types/events';

export async function isLoggedIn() {
  return new Promise(resolve => {
    chrome?.storage?.sync?.get({ token: '' }, items => {
      resolve(!!items.token);
    });
  });
}

export async function login({ email, password }) {
  const {
    data: { token },
  } = await api.post<{ token: string }>('/auth/service/jwt', {
    email,
    password,
    claimerSystem: 'linkedin_ce',
  });
  chrome?.storage?.sync?.set({ token });
}

export function logout() {
  return new Promise(resolve => {
    if (chrome && chrome.storage && chrome.storage.sync) {
      chrome?.storage?.sync?.set({ token: '' }, () => {
        // @ts-ignore
        resolve();
        window.dispatchEvent(new CustomEvent(MessagesEvents.UserLoggedOut));
      });
    } else {
      resolve(null);
    }
  });
}

export function getToken() {
  return new Promise(resolve => {
    if (chrome && chrome.storage && chrome.storage.sync) {
      chrome?.storage?.sync?.get({ token: '' }, ({ token }) => {
        if (token) {
          const contents = JSON.parse(atob(token.split('.')[1]));
          resolve(contents);
        } else {
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
}

export async function getTokenEncoded() {
  return await new Promise(resolve => {
    if (chrome && chrome.storage && chrome.storage.sync) {
      chrome?.storage?.sync?.get({ token: '' }, ({ token }) => {
        if (token) {
          resolve(token);
        } else {
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
}

export async function getAccountId() {
  if (
    appHostnames.includes(window.location.hostname) ||
    window.location.hostname.includes('bloobirds-platform-frontend.pages.dev')
  ) {
    const session = localStorage.getItem('bb-app-session');
    if (session) {
      return JSON.parse(session)?.context?.account?.id || null;
    }
    return null;
  }
  const token = await getToken();
  // @ts-ignore
  return token?.account;
}

export async function getUserId() {
  if (
    appHostnames.includes(window.location.hostname) ||
    window.location.hostname.includes('bloobirds-platform-frontend.pages.dev')
  ) {
    const session = localStorage.getItem('bb-app-session');
    if (session) {
      return JSON.parse(session)?.context?.user?.id || null;
    }
    return null;
  } else {
    const token = await getToken();
    // @ts-ignore
    return token?.sub;
  }
}

export async function getUserName() {
  const token = await getToken();
  // @ts-ignore
  return token.userName;
}

export function getAuthUrl(): string {
  //Check the env
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return 'http://localhost:5173';
  } else {
    const envL = process.env.ENV;
    return envL === 'development' ? 'https://auth.dev-bloobirds.com' : 'https://auth.bloobirds.com';
  }
}
