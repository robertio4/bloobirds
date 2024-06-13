import * as Sentry from "/vendor/.vite-deps-@sentry_react.js__v--dfb3495e.js";
import pkg from "/package.json__import.js";
import { inject } from "/src/injectors/appInjector.tsx.js";
import "/src/content/index.css.js";
inject();
Sentry.init({
  dsn: "https://c8e8ff8ea17f4e9b947b4846e5c64179@o328732.ingest.sentry.io/4504802112634880",
  environment: process.env.ENV,
  replaysSessionSampleRate: process.env.ENV === "production" ? 0.1 : 0.5,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true
    }),
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration()
  ],
  release: process.env.ENV === "production" ? `bloobirds@${pkg.version}` : "dev",
  tracesSampleRate: 1,
  ignoreErrors: [
    "top.GLOBALS",
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "http://tt.epicplay.com",
    "Can't find variable: ZiteReader",
    "jigsaw is not defined",
    "ComboSearch is not defined",
    "http://loading.retry.widdit.com/",
    "atomicFindClose",
    "fb_xd_fragment",
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    "conduitPage",
    "ResizeObserver loop limit exceeded",
    "Extension context invalidated"
  ],
  denyUrls: [
    /graph\.facebook\.com/i,
    /connect\.facebook\.net\/en_US\/all\.js/i,
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    /extensions\//i,
    /^chrome:\/\//i,
    /127\.0\.0\.1:4001\/isrunning/i,
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
  ]
});
