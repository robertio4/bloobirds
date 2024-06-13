import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '@babel/polyfill';
import * as Sentry from '@sentry/react';
import { BrowserTracing, BrowserProfilingIntegration } from '@sentry/react';
import mixpanel from 'mixpanel-browser';
import { createStore } from 'redux';

import App from './js/app';
import routerHistory from './js/app/history';
import { servicesEnv } from './js/misc/api/ApiHosts';
import SessionManagerFactory from './js/misc/session';
import reducer from './js/reducers';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

let enableDevTools = true;
if (window.location.hostname === 'app.bloobirds.com') {
  enableDevTools = false;
  mixpanel.init('b2373343acb028c8d63ce064fadcada2');
} else {
  mixpanel.init('tokenFake');
}

if (!isLocalhost) {
  Sentry.init({
    dsn: 'https://bdf7227780ad49d2bdb208b40ead4b88@o328732.ingest.sentry.io/1842685',
    environment: servicesEnv,
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production

    replaysSessionSampleRate: servicesEnv === 'production' ? 0.1 : 0.5,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      new Sentry.Replay({
        // Additional SDK configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(routerHistory),
      }),
      // Add browser profiling integration to the list of integrations
      new BrowserProfilingIntegration(),
    ],
    release: `bloobirds@${process.env.REACT_APP_VERSION}`,
    tracesSampleRate: 1,
    ignoreErrors: [
      // Random plugins/extensions
      'top.GLOBALS',
      // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'http://tt.epicplay.com',
      "Can't find variable: ZiteReader",
      'jigsaw is not defined',
      'ComboSearch is not defined',
      'http://loading.retry.widdit.com/',
      'atomicFindClose',
      // Facebook borked
      'fb_xd_fragment',
      // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
      // reduce this. (thanks @acdha)
      // See http://stackoverflow.com/questions/4113268
      'bmi_SafeAddOnload',
      'EBCallBackMessageReceived',
      // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
      'conduitPage',
      'ResizeObserver loop limit exceeded',
    ],
    denyUrls: [
      // Facebook flakiness
      /graph\.facebook\.com/i,
      // Facebook blocked
      /connect\.facebook\.net\/en_US\/all\.js/i,
      // Woopra flakiness
      /eatdifferent\.com\.woopra-ns\.com/i,
      /static\.woopra\.com\/js\/woopra\.js/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Other plugins
      /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    ],
  });
}

const reduxDevTools =
  enableDevTools &&
  isLocalhost &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__({
    trace: true,
  });

console.info(`VERSION: ${process.env.REACT_APP_VERSION} - NODE ENV: ${process.env.NODE_ENV}`);

// Check if the url has a query param with the bb-token
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('bb-token');
console.log('URL', window.location.href, 'TOKEN', token);

const SessionManager = SessionManagerFactory();

function tryLoginWithUrlToken() {
  // If there is a token in the url, then we don't want to show the login page and instead we want to call the login function with the token
  console.log('Starting to save token');
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('bb-token');

  if (token) {
    SessionManager.setRootToken(token);
    console.log(SessionManager.hasEmptySession());
    //Remove the token from the url
    window.history.replaceState({}, document.title, window.location.pathname);
    console.log('Token saved');
  }
}

tryLoginWithUrlToken();

const store = reduxDevTools ? createStore(reducer, reduxDevTools) : createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
