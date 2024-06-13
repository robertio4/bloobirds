import lookup from 'country-code-lookup';
import spacetime, { Spacetime } from 'spacetime';

import { toTitleCase } from './strings.utils';
import rawJson from './timezonesByCountry.json';

const data: { [key: string]: string[] } = rawJson;
const map = Object.keys(data)
  .map(x => ({ [x.toUpperCase()]: data[x] }))
  .reduce((a, b) => ({ ...a, ...b }), {});

/**
 * Private functions. Meant only for testing
 */
export const privateTimeZoneFunctions = () => {
  const formatCountryToName = (country: string): string => {
    if (lookup.byCountry(toTitleCase(country))) {
      return country.toUpperCase();
    } else {
      const c = lookup.byIso(country);
      if (c != undefined) return c.country.toUpperCase();
      else throw new Error('invalid country');
    }
  };

  /**
   * Returns a list containing the corresponding timezones for the input
   * @param country string can be a timezone (sth/sth) or a country name
   */
  const getCountryTimezones = (country: string): string[] => {
    if (!country) return undefined;
    else if (country.includes('/')) {
      const split = country.split(' ');
      return [split[split.length - 1].toLowerCase()];
    } else {
      try {
        return map[formatCountryToName(country)];
      } catch (e) {
        return undefined;
      }
    }
  };

  const getNow = (timezone: string) => {
    try {
      return spacetime.now(timezone);
    } catch (e) {
      return undefined;
    }
  };

  const parseTimezoneToNowList = (timezones: string[]): Spacetime[] => {
    return timezones.map(x => getNow(x)).filter(x => x != undefined);
  };

  const getFirstAndLastTimezone = (spaceTimes: Spacetime[]) => {
    if (!spaceTimes || spaceTimes.length === 0) {
      return undefined;
    }
    if (spaceTimes.length === 1) {
      return [`${spaceTimes[0].time()}`];
    }
    spaceTimes.sort((a, b) => a.timezone().current.offset - b.timezone().current.offset);
    const sameFirstAndLast = spaceTimes[0].time() === spaceTimes[spaceTimes.length - 1].time();
    return sameFirstAndLast
      ? [`${spaceTimes[0].time()}`]
      : [`${spaceTimes[0].time()}`, `${spaceTimes[spaceTimes.length - 1].time()}`];
  };

  const getFirstAndLastSpaceTime = (timezones: string[]): string[] => {
    const nows = parseTimezoneToNowList(timezones);
    return (getFirstAndLastTimezone(nows) as unknown) as string[];
  };
  return {
    getCountryTimezones,
    parseTimezoneToNowList,
    getFirstAndLastTimezone,
    getFirstAndLastSpaceTime,
  };
};

const { getCountryTimezones, getFirstAndLastSpaceTime } = privateTimeZoneFunctions();

/**
 * Get current time on the specified territory
 * @param countryOrTimeZone timezone (spacetime library (iana code)) or country (name, ISO2, ISO3, ISOno)
 * @returns list of length 1 for timezone and list of 2 now times for the country (earliest & latest) , in format hh:mm{am,pm} (ex: [11:09am, 01:09pm])
 */
export const getCurrentTime = (countryOrTimeZone: string): string[] => {
  const timezones = getCountryTimezones(countryOrTimeZone);
  if (timezones === undefined) return undefined;
  return getFirstAndLastSpaceTime(timezones);
};

export const getCurrentTimeBeautiful = (countryOrTimeZone: string): string => {
  const nows = getCurrentTime(countryOrTimeZone);
  if (nows == undefined) return undefined;
  if (nows.length === 1) {
    return `It's ${nows[0]} for`;
  } else if (nows.length === 2) {
    return `It's between ${nows[0]} and ${nows[1]} for`;
  }
};

export const getCurrentTimeSimple = (countryOrTimeZone: string): string => {
  const nows = getCurrentTime(countryOrTimeZone);
  if (nows == undefined) return undefined;
  if (nows.length === 1) {
    return ` ${nows[0]} for`;
  } else if (nows.length === 2) {
    return ` ${nows[0]} to ${nows[1]} for`;
  }
};
