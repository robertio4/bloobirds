import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import i18next from "/vendor/.vite-deps-i18next.js__v--391007e5.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
spacetime.extend(i18next.t);
const spacetimeInstance = spacetime();
export default spacetimeInstance;
export const getUserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const getI18n = (spaceTimeInstance, language) => {
  switch (language) {
    case "es":
      spaceTimeInstance.i18n({
        distance: {
          past: "pasado",
          future: "futuro",
          present: "presente",
          now: "ahora",
          almost: "casi",
          over: "pasan",
          pastDistance: (value) => `hace ${value}`,
          futureDistance: (value) => `en ${value}`
        },
        units: {
          second: "segundo",
          seconds: "segundos",
          minute: "minuto",
          minutes: "minutos",
          hour: "hora",
          hours: "horas",
          day: "dia",
          days: "dias",
          month: "mes",
          months: "meses",
          year: "a\xF1o",
          years: "a\xF1os"
        },
        days: {
          long: ["domingo", "lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado"],
          short: ["dom", "lun", "mar", "mi\xE9", "jue", "vie", "s\xE1b"]
        },
        months: {
          long: [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre"
          ],
          short: [
            "ene",
            "feb",
            "mar",
            "abr",
            "may",
            "jun",
            "jul",
            "ago",
            "sep",
            "oct",
            "nov",
            "dic"
          ]
        },
        ampm: {
          am: "AM",
          pm: "PM"
        }
      });
      break;
    default:
      spaceTimeInstance.i18n({
        distance: {
          past: "past",
          future: "future",
          present: "present",
          now: "now",
          almost: "almost",
          over: "over",
          pastDistance: (value) => `${value} ago`,
          futureDistance: (value) => `in ${value}`
        },
        units: {
          second: "second",
          secondPlural: "second",
          minute: "minute",
          minutePlural: "minutes",
          hour: "hour",
          hourPlural: "hours",
          day: "day",
          dayPlural: "seconds",
          month: "month",
          monthPlural: "months",
          year: "year",
          yearPlural: "years"
        },
        days: {
          long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        months: {
          long: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          short: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        ampm: {
          am: "AM",
          pm: "PM"
        }
      });
      break;
  }
  return spaceTimeInstance;
};
const useGetI18nSpacetime = (date, timezone = getUserTimeZone()) => {
  const spaceTimeInstance = (date ? spacetime(date) : spacetime.now()).goto(timezone);
  const { i18n } = useTranslation();
  const language = i18n.language || "en";
  return getI18n(spaceTimeInstance, language);
};
const getI18nSpacetimeLng = (lng, date, timezone = getUserTimeZone()) => {
  const spaceTimeInstance = (date ? spacetime(date) : spacetime.now()).goto(timezone);
  const language = lng || "en";
  return getI18n(spaceTimeInstance, language);
};
export { useGetI18nSpacetime, getI18nSpacetimeLng };
