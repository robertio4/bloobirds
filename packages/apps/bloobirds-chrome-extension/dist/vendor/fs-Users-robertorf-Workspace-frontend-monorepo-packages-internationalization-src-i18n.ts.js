import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { initReactI18next } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { en, es } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-locales-dist-index.js.js";
import i18n from "/vendor/.vite-deps-i18next.js__v--391007e5.js";
import LanguageDetector from "/vendor/.vite-deps-i18next-browser-languagedetector.js__v--9eb55e5b.js";
import ChainedBackend from "/vendor/.vite-deps-i18next-chained-backend.js__v--240555a0.js";
import HttpBackend from "/vendor/.vite-deps-i18next-http-backend.js__v--d0fee1d4.js";
import resourcesToBackend from "/vendor/.vite-deps-i18next-resources-to-backend.js__v--bb92c1f3.js";
import settingsDetector from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-settingsDetector.tsx.js";
const bundledResources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};
const init = (languageDetector, language = null) => {
  const isDevelopment = process.env.FORCE_DEVELOPMENT || !process.env.ENV || process.env.ENV === "development";
  const backends = isDevelopment ? [resourcesToBackend(bundledResources), HttpBackend] : [HttpBackend, resourcesToBackend(bundledResources)];
  i18n.use(initReactI18next).use(ChainedBackend).use(languageDetector).init({
    detection: {
      order: [
        "settingsDetector",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain"
      ],
      lookupSettings: language
    },
    fallbackLng: "en",
    debug: isDevelopment,
    interpolation: {
      escapeValue: false
    },
    backend: {
      backends,
      backendOptions: [
        {
          loadPath: "https://delivery.localazy.com/_a7714004326121177803f2a33b98/_e0/7684805d1d0d77475387cb607c3d31032d89424d/{{lng}}/{{ns}}.json"
        }
      ]
    },
    load: "currentOnly"
  });
};
const useInternationalizationSettings = (language) => {
  const languageDetector = new LanguageDetector();
  languageDetector.addDetector(settingsDetector);
  useEffect(() => {
    init(languageDetector, language);
  }, [language]);
};
const initInternationalizationSettings = () => {
  const languageDetector = new LanguageDetector();
  languageDetector.addDetector(settingsDetector);
  init(languageDetector);
};
export { useInternationalizationSettings, initInternationalizationSettings };
