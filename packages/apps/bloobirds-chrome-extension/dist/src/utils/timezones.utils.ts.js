import __vite__cjsImport0_countryCodeLookup from "/vendor/.vite-deps-country-code-lookup.js__v--ae4cc6e7.js"; const lookup = __vite__cjsImport0_countryCodeLookup.__esModule ? __vite__cjsImport0_countryCodeLookup.default : __vite__cjsImport0_countryCodeLookup;
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import * as rawJson from "/src/constants/timezonesByCountry.json__import.js";
import { toTitleCase } from "/src/utils/strings.utils.ts.js";
const data = rawJson;
const map = Object.keys(data).map((x) => ({ [x.toUpperCase()]: data[x] })).reduce((a, b) => ({ ...a, ...b }), {});
export const privateTimeZoneFunctions = () => {
  const formatCountryToName = (country) => {
    if (lookup.byCountry(toTitleCase(country))) {
      return country.toUpperCase();
    } else {
      const c = lookup.byIso(country);
      if (c != void 0)
        return c.country.toUpperCase();
      else
        throw new Error("invalid country");
    }
  };
  const getCountryTimezones2 = (country) => {
    if (!country)
      return void 0;
    else if (country.includes("/")) {
      const split = country.split(" ");
      return [split[split.length - 1].toLowerCase()];
    } else {
      try {
        return map[formatCountryToName(country)];
      } catch (e) {
        return void 0;
      }
    }
  };
  const getNow = (timezone) => {
    try {
      return spacetime.now(timezone);
    } catch (e) {
      return void 0;
    }
  };
  const parseTimezoneToNowList = (timezones) => {
    return timezones.map((x) => getNow(x)).filter((x) => x != void 0);
  };
  const getFirstAndLastTimezone = (spaceTimes) => {
    if (!spaceTimes || spaceTimes.length === 0) {
      return void 0;
    }
    if (spaceTimes.length === 1) {
      return [spaceTimes[0].time()];
    }
    spaceTimes.sort((a, b) => a.timezone().current.offset - b.timezone().current.offset);
    const sameFirstAndLast = spaceTimes[0].time() === spaceTimes[spaceTimes.length - 1].time();
    return sameFirstAndLast ? [spaceTimes[0].time()] : [spaceTimes[0].time(), spaceTimes[spaceTimes.length - 1].time()];
  };
  const getFirstAndLastSpaceTime2 = (timezones) => {
    const nows = parseTimezoneToNowList(timezones);
    return getFirstAndLastTimezone(nows);
  };
  return {
    getCountryTimezones: getCountryTimezones2,
    parseTimezoneToNowList,
    getFirstAndLastTimezone,
    getFirstAndLastSpaceTime: getFirstAndLastSpaceTime2
  };
};
const { getCountryTimezones, getFirstAndLastSpaceTime } = privateTimeZoneFunctions();
export const getCurrentTime = (countryOrTimeZone) => {
  const timezones = getCountryTimezones(countryOrTimeZone);
  if (timezones === void 0)
    return void 0;
  return getFirstAndLastSpaceTime(timezones);
};
export const getCurrentTimeBeautiful = (countryOrTimeZone) => {
  const nows = getCurrentTime(countryOrTimeZone);
  if (nows == void 0)
    return void 0;
  if (nows.length === 1) {
    return `It's ${nows[0]} for`;
  } else if (nows.length === 2) {
    return `It's between ${nows[0]} and ${nows[1]} for`;
  }
};
export const getCurrentTimeSimple = (countryOrTimeZone) => {
  const nows = getCurrentTime(countryOrTimeZone);
  if (nows == void 0)
    return void 0;
  if (nows.length === 1) {
    return ` ${nows[0]} for`;
  } else if (nows.length === 2) {
    return ` ${nows[0]} to ${nows[1]} for`;
  }
};
