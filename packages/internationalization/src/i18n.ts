import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';

import { en, es } from '@bloobirds-it/locales';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';

import settingsDetector from './settingsDetector';

const bundledResources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const init = (languageDetector, language = null) => {
  const isDevelopment = !process.env.ENV || process.env.ENV === 'development';

  const backends = isDevelopment
    ? [resourcesToBackend(bundledResources), HttpBackend]
    : [HttpBackend, resourcesToBackend(bundledResources)];

  // @ts-ignore
  i18n
    .use(initReactI18next)
    .use(ChainedBackend)
    .use(languageDetector)
    .init({
      detection: {
        order: [
          'settingsDetector',
          'querystring',
          'cookie',
          'localStorage',
          'sessionStorage',
          'navigator',
          'htmlTag',
          'path',
          'subdomain',
        ],
        lookupSettings: language,
      },
      fallbackLng: 'en',
      debug: isDevelopment,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        backends: backends,
        backendOptions: [
          {
            loadPath:
              'https://delivery.localazy.com/_a7714004326121177803f2a33b98/_e0/7684805d1d0d77475387cb607c3d31032d89424d/{{lng}}/{{ns}}.json',
          },
        ],
      },
      load: 'currentOnly',
    });
};

const useInternationalizationSettings = (language?: string) => {
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
