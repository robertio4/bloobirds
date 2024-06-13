import { NavigateFunction } from 'react-router';

import axios, { AxiosResponse } from 'axios';
import { sha512 } from 'js-sha512';

import { appUrls, getApiUrl, getAppUrl, getWebApiUrl } from './urls';

function storeToken(token: string, tokenType: string) {
  localStorage.setItem('bb-token' + '-' + tokenType, token);
}

export type ClaimerSystem = 'web_App' | 'linkedin_ce';
type SLProvider = 'GOOGLE' | 'MICROSOFT' | 'SALESFORCE';

export interface RedirectOptions {
  fromExtensionInstall: boolean;
  navigate?: NavigateFunction;
  shouldRedirect?: boolean;
  queryParams: string;
}

export async function login(
  username: string,
  password: string,
  claimerSystem: ClaimerSystem,
): Promise<AxiosResponse> {
  return axios.post(getApiUrl() + '/service/jwt', {
    email: username,
    password: sha512(password),
    claimerSystem: claimerSystem,
  });
}

// not loaded from @bloobirds-it/utils because a problem with plover
export const isElementLoaded = async selector => {
  let counter = 0;
  while (document.querySelector(selector) === null && counter <= 200) {
    await new Promise(resolve => {
      requestAnimationFrame(resolve);
    });
    counter = counter + 1;
  }
  return document.querySelector(selector);
};

export async function socialLogin(
  token: string,
  provider: SLProvider,
  claimerSystem: ClaimerSystem,
) {
  return axios.post(getApiUrl() + '/service/externalAction/socialLogin', {
    token,
    provider,
    claimerSystem,
  });
}

export function successExtensionLogin(response: AxiosResponse) {
  //Send message to the chrome extension with the token
  storeToken(response?.data.token, 'extension'); // Store the token in the local storage
  window?.postMessage({ type: 'FROM_AUTH', token: response?.data.token }, '*');
}

export async function successLogin(
  response: AxiosResponse,
  refUrl = undefined,
  fromExtensionInstall = false,
) {
  // Redirect to the app with the token as a query param
  storeToken(response?.data.token, 'web'); // Store the token in the local storage
  const referrerUrl = await getReferrerUrl(refUrl, fromExtensionInstall);
  window.location.href = referrerUrl
    ? referrerUrl
    : `${getAppUrl()}?bb-token=${response?.data.token}`;
}

export function checkIfTokenExists(tokenType: string): boolean {
  return !!localStorage.getItem('bb-token' + '-' + tokenType);
}

export function getToken(tokenType: string): string | null {
  return localStorage.getItem('bb-token' + '-' + tokenType);
}

export function logout(): string {
  localStorage.removeItem('bb-token' + '-' + 'web');
  localStorage.removeItem('bb-token' + '-' + 'extension');
  return '/auth/login';
}

function addTokenToUrl(url: string, token: string) {
  const urlObject = new URL(url);
  urlObject.searchParams.append('bb-token', token);
  return urlObject.href;
}

async function getSalesforceInstanceUrl() {
  const integrationSalesforce = await axios.get(getWebApiUrl() + '/service/users/settings', {
    headers: {
      Authorization: `Bearer ${getToken('extension') || getToken('web')}`,
      'content-type': 'application/json',
    },
    data: {},
    withCredentials: true,
  });
  return integrationSalesforce?.data?.account?.salesforceInstance;
}

export async function getReferrerUrl(referrerUrl, fromExtensionInstall) {
  if (fromExtensionInstall) {
    const salesforceUrl = await getSalesforceInstanceUrl();
    if (salesforceUrl) {
      return salesforceUrl;
    }
  }
  return referrerUrl;
}

export async function redirectIfTokenIsPresentAndNotExpired(
  referrerUrl: string,
  options: RedirectOptions,
) {
  // Modify this function when the tokens expire
  let redirectUrl = referrerUrl || getAppUrl();
  const hasExtensionToken = checkIfTokenExists('extension');
  const hasWebsiteToken = checkIfTokenExists('web');

  if (options.fromExtensionInstall && (hasExtensionToken || hasWebsiteToken)) {
    redirectUrl = await getSalesforceInstanceUrl();
    console.log('requested salesforce instance url', redirectUrl);
  }

  if (hasExtensionToken) {
    await isElementLoaded('#bb-root');
    console.log('going to post FROM AUTH message');
    window?.postMessage({ type: 'FROM_AUTH', token: getToken('extension') }, '*');
    // If the referrer is not the app, redirect to the referrer, we can check all the appUrls
    let redirectToReferrer = true;
    const urls: string[] = Object.values(appUrls);
    urls.forEach((appUrl: string) => {
      if (redirectUrl?.includes(appUrl)) {
        redirectToReferrer = false;
      }
    });
    if (redirectToReferrer || options.fromExtensionInstall) {
      console.log('redirecting to referrer');
      if (!redirectUrl && !options.fromExtensionInstall) {
        console.error('redirectUrl is not defined');
        options.navigate(logout());
      }
      console.log('going to redirect');
      window.location.href = redirectUrl || getAppUrl();
      await new Promise(r => setTimeout(r, 2000));
      return;
    }
  }
  if (hasWebsiteToken) {
    console.log('redirecting to app');
    window.location.href = addTokenToUrl(redirectUrl, getToken('web'));
    await new Promise(r => setTimeout(r, 2000));
    return;
  }

  if (!hasExtensionToken && !hasWebsiteToken && options.navigate && options.shouldRedirect) {
    console.log('redirecting to login');
    options.navigate('/auth/login' + options.queryParams || '');
  }
}
