import spacetime from 'spacetime';
import {
  getCurrentTime,
  getCurrentTimeBeautiful,
  privateTimeZoneFunctions,
} from './timezones.utils';

describe('getCountryTimezones function', () => {
  const { getCountryTimezones } = privateTimeZoneFunctions();
  const expectedCanadaTimezones = [
    'canada/atlantic',
    'canada/central',
    'canada/east-saskatchewan',
    'canada/eastern',
    'canada/mountain',
    'canada/pacific',
    'canada/saskatchewan',
    'canada/yukon',
  ];

  test('returns timezone in list when passed a timezone', () => {
    const canadaYukon = getCountryTimezones('canada/yukon');
    expect(canadaYukon).toEqual(['canada/yukon']);
  });

  test('returns timezones OK when passed a country in uppercase', () => {
    const canadaTimeZones = getCountryTimezones('CANADA');
    expect(canadaTimeZones).toEqual(expectedCanadaTimezones);
  });

  test('returns timezones OK when passed a country in ISO2', () => {
    const canadaTimeZones = getCountryTimezones('CA');
    expect(canadaTimeZones).toEqual(expectedCanadaTimezones);
  });

  test('returns timezones OK when passed a country in ISO3', () => {
    const canadaTimeZones = getCountryTimezones('CAN');
    expect(canadaTimeZones).toEqual(expectedCanadaTimezones);
  });

  test('returns timezones OK when passed a country in ISO3 in lower case', () => {
    const canadaTimeZones = getCountryTimezones('can');
    expect(canadaTimeZones).toEqual(expectedCanadaTimezones);
  });

  test('returns timezones OK when passed a country in lowercase', () => {
    const lowerCase = getCountryTimezones('canada');
    expect(lowerCase).toEqual(expectedCanadaTimezones);
  });

  test('returns timezones OK when passed a country in sentence case', () => {
    const SentenceCase = getCountryTimezones('Canada');
    expect(SentenceCase).toEqual(expectedCanadaTimezones);
  });

  test('returns undefined when passed an invalid country', () => {
    const invalidCountry = getCountryTimezones('invalidCountry');
    expect(invalidCountry).toEqual(undefined);
  });
});

describe('parseTimezoneToNowList function', () => {
  const { parseTimezoneToNowList } = privateTimeZoneFunctions();

  test('returns list of now times for each timezone', () => {
    const canadaNow = parseTimezoneToNowList(['canada/yukon', 'canada/eastern']);
    const expectedCanadaNow = [spacetime.now('canada/yukon'), spacetime.now('canada/eastern')];
    expect(canadaNow.map(x => x.time())).toEqual(expectedCanadaNow.map(x => x.time()));
  });

  test('returns list of now time for one timezone when only passed one timezone', () => {
    const canadaNow = parseTimezoneToNowList(['canada/yukon']);
    const expectedCanadaNow = [spacetime.now('canada/yukon')];
    expect(canadaNow.map(x => x.time())).toEqual(expectedCanadaNow.map(x => x.time()));
  });

  test('returns undefined when only passed an invalid timezone', () => {
    const canadaNow = parseTimezoneToNowList(['canada/yukon']);
    const expectedCanadaNow = [spacetime.now('canada/yukon')];
    expect(canadaNow.map(x => x.time())).toEqual(expectedCanadaNow.map(x => x.time()));
  });

  test('returns a list of now times only for valid timezones', () => {
    const canadaNow = parseTimezoneToNowList(['canada/yukon', 'canada/eastern', 'nckjdwn']);
    const expectedCanadaNow = [spacetime.now('canada/yukon'), spacetime.now('canada/eastern')];
    expect(canadaNow.map(x => x.time())).toEqual(expectedCanadaNow.map(x => x.time()));
  });
});

describe('getFirstAndLastSpaceTime function', () => {
  const { getFirstAndLastSpaceTime } = privateTimeZoneFunctions();

  test('returns list of first and last hour time for a list of timezones', () => {
    const canadaNow = getFirstAndLastSpaceTime([
      'canada/yukon',
      'canada/eastern',
      'canada/central',
      'canada/mountain',
    ]);
    const expectedCanadaNow = [
      spacetime.now('canada/yukon').time(),
      spacetime.now('canada/eastern').time(),
    ];
    expect(canadaNow).toEqual(expectedCanadaNow);
  });

  test('returns list of just one hour time when passed different timezones', () => {
    const now = getFirstAndLastSpaceTime(['europe/madrid', 'europe/paris']);
    const expectedNow = [spacetime.now('europe/madrid').time()];
    expect(now).toEqual(expectedNow);
  });

  test('returns list of just one hour time when passed two timezones with the same hour', () => {
    const canadaYukonNow = getFirstAndLastSpaceTime(['canada/yukon']);
    const expectedCanadaYukonNow = [spacetime.now('canada/yukon').time()];
    expect(canadaYukonNow).toEqual(expectedCanadaYukonNow);
  });
});

describe('getCurrentTime function', () => {
  test('returns list of now time for each timezone', () => {
    const now = getCurrentTime('Albania');
    const expectedNow = [spacetime.now('europe/tirane').time()];
    expect(now).toEqual(expectedNow);
  });
  test('returns same current time for timezone and corresponding country', () => {
    const now = getCurrentTime('Chile');
    const expectedNow = getCurrentTime('america/santiago');
    expect(now).toEqual(expectedNow);
  });
  test('returns list of now time for each timezone', () => {
    const now = getCurrentTimeBeautiful('Albania');
    const expectedNow = `It's ${spacetime.now('europe/tirane').time()} for`;
    expect(now).toEqual(expectedNow);
  });
});
