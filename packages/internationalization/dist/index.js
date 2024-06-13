import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { en, es } from '@bloobirds-it/locales';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import spacetime from 'spacetime';

var settingsDetector = {
  name: 'settingsDetector',
  lookup: function lookup(options) {
    if (options.lookupSettings) {
      return options.lookupSettings;
    }
    return undefined;
  }
};

var bundledResources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};
var init = function init(languageDetector) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var isDevelopment = process.env.FORCE_DEVELOPMENT || !process.env.ENV || process.env.ENV === 'development';
  var backends = isDevelopment ? [resourcesToBackend(bundledResources), HttpBackend] : [HttpBackend, resourcesToBackend(bundledResources)];

  // @ts-ignore
  i18n.use(initReactI18next).use(ChainedBackend).use(languageDetector).init({
    detection: {
      order: ['settingsDetector', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupSettings: language
    },
    fallbackLng: 'en',
    debug: isDevelopment,
    interpolation: {
      escapeValue: false
    },
    backend: {
      backends: backends,
      backendOptions: [{
        loadPath: 'https://delivery.localazy.com/_a7714004326121177803f2a33b98/_e0/7684805d1d0d77475387cb607c3d31032d89424d/{{lng}}/{{ns}}.json'
      }]
    },
    load: 'currentOnly'
  });
};
var useInternationalizationSettings = function useInternationalizationSettings(language) {
  var languageDetector = new LanguageDetector();
  languageDetector.addDetector(settingsDetector);
  useEffect(function () {
    init(languageDetector, language);
  }, [language]);
};
var initInternationalizationSettings = function initInternationalizationSettings() {
  var languageDetector = new LanguageDetector();
  languageDetector.addDetector(settingsDetector);
  init(languageDetector);
};

spacetime.extend(i18n.t);
spacetime();
var getUserTimeZone = function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
var getI18n = function getI18n(spaceTimeInstance, language) {
  switch (language) {
    //FIX: Temporal approach
    case 'es':
      spaceTimeInstance.i18n({
        distance: {
          past: 'pasado',
          future: 'futuro',
          present: 'presente',
          now: 'ahora',
          almost: 'casi',
          over: 'pasan',
          pastDistance: function pastDistance(value) {
            return "hace ".concat(value);
          },
          futureDistance: function futureDistance(value) {
            return "en ".concat(value);
          }
        },
        units: {
          second: 'segundo',
          seconds: 'segundos',
          minute: 'minuto',
          minutes: 'minutos',
          hour: 'hora',
          hours: 'horas',
          day: 'dia',
          days: 'dias',
          month: 'mes',
          months: 'meses',
          year: 'año',
          years: 'años'
        },
        days: {
          "long": ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
          "short": ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
        },
        months: {
          "long": ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
          "short": ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
        },
        ampm: {
          am: 'AM',
          pm: 'PM'
        }
      });
      break;
    default:
      spaceTimeInstance.i18n({
        distance: {
          past: 'past',
          future: 'future',
          present: 'present',
          now: 'now',
          almost: 'almost',
          over: 'over',
          pastDistance: function pastDistance(value) {
            return "".concat(value, " ago");
          },
          futureDistance: function futureDistance(value) {
            return "in ".concat(value);
          }
        },
        units: {
          second: 'second',
          secondPlural: 'second',
          minute: 'minute',
          minutePlural: 'minutes',
          hour: 'hour',
          hourPlural: 'hours',
          day: 'day',
          dayPlural: 'seconds',
          month: 'month',
          monthPlural: 'months',
          year: 'year',
          yearPlural: 'years'
        },
        days: {
          "long": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          "short": ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        months: {
          "long": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          "short": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        ampm: {
          am: 'AM',
          pm: 'PM'
        }
      });
      break;
  }
  return spaceTimeInstance;
};
var useGetI18nSpacetime = function useGetI18nSpacetime(date) {
  var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getUserTimeZone();
  var spaceTimeInstance = (date ? spacetime(date) : spacetime.now())["goto"](timezone);
  var _useTranslation = useTranslation(),
    i18n = _useTranslation.i18n;
  var language = i18n.language || 'en';
  return getI18n(spaceTimeInstance, language);
};
var getI18nSpacetimeLng = function getI18nSpacetimeLng(lng, date) {
  var timezone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getUserTimeZone();
  var spaceTimeInstance = (date ? spacetime(date) : spacetime.now())["goto"](timezone);
  var language = lng || 'en';
  return getI18n(spaceTimeInstance, language);
};

export { getI18nSpacetimeLng, getUserTimeZone, initInternationalizationSettings, useGetI18nSpacetime, useInternationalizationSettings };
//# sourceMappingURL=index.js.map
