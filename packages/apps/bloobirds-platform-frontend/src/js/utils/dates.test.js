import {
  getSimpleDate,
  getDateRange,
  getDayOfWeekStartingFromMonday,
  getDayAndWeekNumberFromDate,
  intervalDaysOfMonth,
  lastWeekOfPrevMonth,
  firstWeekOfNextMonth,
  formatDistance,
  formatSecondToElapsedTime,
  generateDatePrefix,
  getLocationFromCompleteTimeZone,
  getUTCFromCompleteTimeZone,
  getRangeBetweenDates,
  parseUTCDateToLocal,
  getISOShortFormattedDate,
  formatDateAsText,
} from './dates.utils';

describe('date formatting', () => {
  test('given a date with time, when the timezone is Sydney time, then the date is formatted correctly', () => {
    const timezone = 'Australia/Sydney';
    const text = '2022-02-12T16:25:34.000Z';
    const expected = 'February 13th, 2022';
    jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => {
      return {
        resolvedOptions: () => {
          return {
            timeZone: timezone,
          };
        },
      };
    });
    const result = formatDateAsText(text);
    expect(result).toBe(expected);
  });
  test('given a date with time, when the timezone is Madrid time, then the date is formatted correctly', () => {
    const timezone = 'Europe/Madrid';
    const text = '2022-02-12T16:25:34.000Z';
    const expected = 'February 12th, 2022';
    jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => {
      return {
        resolvedOptions: () => {
          return {
            timeZone: timezone,
          };
        },
      };
    });
    const result = formatDateAsText(text);
    expect(result).toBe(expected);
  });
  test('given a date with time, when the timezone is California time, then the date is formatted correctly', () => {
    const timezone = 'America/Los_Angeles';
    const text = '2022-02-13T06:25:34.000Z';
    const expected = 'February 12th, 2022';
    jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => {
      return {
        resolvedOptions: () => {
          return {
            timeZone: timezone,
          };
        },
      };
    });
    const result = formatDateAsText(text);
    expect(result).toBe(expected);
  });
});

test('change date format into YYYY-mm-dd format', () => {
  expect(getSimpleDate(new Date('2022-12-10'))).toBe('2022-12-10');
});

test('create range of dates from a given date and specific past & future steps', () => {
  const outputMap = getDateRange({
    startingDate: new Date('2020-12-10'),
    pastRange: 2,
    futureRange: 2,
    includeToday: true,
  });
  const expectedMap = {
    0: '2020-12-08',
    1: '2020-12-09',
    2: '2020-12-10',
    3: '2020-12-11',
    4: '2020-12-12',
  };
  let bool = true;
  if (Object.keys(outputMap).length !== Object.keys(expectedMap).length) {
    bool = false;
  }
  for (const value of Object.values(expectedMap)) {
    if (Object.values(outputMap).includes(value) === false) {
      bool = false;
    }
  }
  expect(bool).toBe(true);
});

test('create range of dates from two given dates', () => {
  const outputMap = getRangeBetweenDates(new Date('2020-12-10'), new Date('2020-12-15'));
  const expectedMap = [
    '2020-12-10',
    '2020-12-11',
    '2020-12-12',
    '2020-12-13',
    '2020-12-14',
    '2020-12-15',
  ];

  let bool = true;
  if (outputMap.length !== expectedMap.length) {
    bool = false;
  }

  bool = !outputMap.some(value => !expectedMap.includes(value));

  expect(bool).toBe(true);
});

test('get number of day starting from Monday (Monday is 1 and Sunday is 0)', () => {
  const monday = getDayOfWeekStartingFromMonday(new Date('2020-12-08')) === 1;
  const tuesday = getDayOfWeekStartingFromMonday(new Date('2020-12-09')) === 2;
  const wednesday = getDayOfWeekStartingFromMonday(new Date('2020-12-10')) === 3;
  const thursday = getDayOfWeekStartingFromMonday(new Date('2020-12-11')) === 4;
  const friday = getDayOfWeekStartingFromMonday(new Date('2020-12-12')) === 5;
  const saturday = getDayOfWeekStartingFromMonday(new Date('2020-12-13')) === 6;
  const sunday = getDayOfWeekStartingFromMonday(new Date('2020-12-14')) === 0;
  expect(monday && tuesday && wednesday && thursday && friday && saturday && sunday).toBe(true);
});

// We only check the week number since the week day is checked on the previous test
test('get day of week and number of week in that month', () => {
  const week0 = getDayAndWeekNumberFromDate({ date: new Date('2020-12-02') }).weekNumber === 0;
  const week1 = getDayAndWeekNumberFromDate({ date: new Date('2020-12-08') }).weekNumber === 1;
  const week2 = getDayAndWeekNumberFromDate({ date: new Date('2020-12-15') }).weekNumber === 2;
  const week3 = getDayAndWeekNumberFromDate({ date: new Date('2020-12-22') }).weekNumber === 3;
  const week4 = getDayAndWeekNumberFromDate({ date: new Date('2020-12-29') }).weekNumber === 4;
  expect(week0 && week1 && week2 && week3 && week4).toBe(true);
});

test('gives an interval of each day of the month provided through the date', () => {
  const january = intervalDaysOfMonth({ date: new Date('2020-01-02') }).length === 31;
  const february = intervalDaysOfMonth({ date: new Date('2020-02-02') }).length === 29;
  const march = intervalDaysOfMonth({ date: new Date('2020-03-02') }).length === 31;
  const april = intervalDaysOfMonth({ date: new Date('2020-04-02') }).length === 30;
  const may = intervalDaysOfMonth({ date: new Date('2020-05-02') }).length === 31;
  const june = intervalDaysOfMonth({ date: new Date('2020-06-02') }).length === 30;
  const july = intervalDaysOfMonth({ date: new Date('2020-07-02') }).length === 31;
  const august = intervalDaysOfMonth({ date: new Date('2020-08-02') }).length === 31;
  const september = intervalDaysOfMonth({ date: new Date('2020-09-02') }).length === 30;
  const october = intervalDaysOfMonth({ date: new Date('2020-10-02') }).length === 31;
  const november = intervalDaysOfMonth({ date: new Date('2020-11-02') }).length === 30;
  const december = intervalDaysOfMonth({ date: new Date('2020-12-02') }).length === 31;
  expect(
    january &&
      february &&
      march &&
      april &&
      may &&
      june &&
      july &&
      august &&
      september &&
      october &&
      november &&
      december,
  ).toBe(true);
});

test('gives an interval of the days from the last week of the previous month given', () => {
  const decemberLastWeek = Object.values(lastWeekOfPrevMonth({ date: new Date('2020-01-02') }));
  const octoberLastWeek = Object.values(lastWeekOfPrevMonth({ date: new Date('2020-11-02') }));
  expect(decemberLastWeek.length === 2 && octoberLastWeek.length === 6).toBe(true);
});

test('gives an interval of the days from the first week of the following month given', () => {
  const februaryFirstWeek = Object.values(firstWeekOfNextMonth({ date: new Date('2020-01-02') }));
  const novemberFirstWeek = Object.values(firstWeekOfNextMonth({ date: new Date('2020-10-02') }));
  const aprilFirstWeek = Object.values(firstWeekOfNextMonth({ date: new Date('2020-03-02') }));
  expect(
    februaryFirstWeek.length === 2 && novemberFirstWeek.length === 1 && aprilFirstWeek.length === 5,
  ).toBe(true);
});

test('gives the amount of days between two dates or an approximation of months if it is more than 1 month', () => {
  const elevenDays = formatDistance(new Date('2020-11-12'), new Date('2020-11-23'));
  const twentyDays = formatDistance(new Date('2020-11-12'), new Date('2020-12-02'));
  expect(elevenDays === '11 days' && twentyDays === '20 days').toBe(true);
});

test('converts seconds to format time HH:mm:ss. It is module 86400, i.e, each 24 hours it gets reset', () => {
  expect(
    formatSecondToElapsedTime(86399) === '23:59:59' &&
      formatSecondToElapsedTime(86400) === '00:00:00',
  ).toBe(true);
});

test("given an undefined date returns '-'", () => {
  expect(generateDatePrefix(undefined)).toBe('-');
});

test('given a date returns Today if it is today', () => {
  expect(generateDatePrefix(new Date())).toBe('Today ');
});

test('given a date returns empty string if it is neither today nor yesterday', () => {
  expect(generateDatePrefix(new Date('2020-11-02'))).toBe('');
});

test('given a date returns Yesterday if it is yesterday', () => {
  const date = new Date();
  expect(generateDatePrefix(new Date(date.setDate(date.getDate() - 1)))).toBe('Yesterday ');
});

test('given a string with a complete timezone description we get the location', () => {
  const timeZoneLocation = getLocationFromCompleteTimeZone('UTC + 06:00 America/Los Angeles');
  expect(timeZoneLocation).toBe('America/Los_Angeles');
});

test('given a string with a complete timezone description we get the UTC info', () => {
  const timeZoneLocation = getUTCFromCompleteTimeZone('UTC + 06:00 America/Los Angeles');
  expect(timeZoneLocation).toBe('UTC + 06:00');
});

describe('Timezone parsing', () => {
  it('Parse date without time (YYYY-MM-DD) time to timezone', () => {
    expect(parseUTCDateToLocal('2021-11-18', 'America/Guayaquil')).toEqual(
      new Date('2021-11-18T05:00:00.000Z'),
    );
    expect(parseUTCDateToLocal('2021-11-18', 'Pacific/Fiji')).toEqual(
      new Date('2021-11-17T11:00:00.000Z'),
    );
  });

  it('Parse date(YYYY-MM-DDTHH:MM:SS.MMMZ) time to timezone', () => {
    expect(parseUTCDateToLocal('2021-11-18T00:00:00.000z', 'America/Guayaquil')).toEqual(
      new Date('2021-11-18T05:00:00.000Z'),
    );
    expect(parseUTCDateToLocal('2021-11-18T00:00:00.000z', 'Pacific/Fiji')).toEqual(
      new Date('2021-11-17T11:00:00.000Z'),
    );
  });

  it('Parse date(YYYY-MM-DDTHH:MM:SSZ) time to timezone', () => {
    expect(parseUTCDateToLocal('2021-11-18T00:00:00Z', 'America/Guayaquil')).toEqual(
      new Date('2021-11-18T05:00:00.000Z'),
    );
    expect(parseUTCDateToLocal('2021-11-18T00:00:00Z', 'Pacific/Fiji')).toEqual(
      new Date('2021-11-17T11:00:00.000Z'),
    );
    expect(parseUTCDateToLocal('2021-11-18T00:00:00z', 'Pacific/Fiji')).toEqual(
      new Date('2021-11-17T11:00:00.000Z'),
    );
  });

  it('Formats the date without time (YYYY-MM-DD) time to timezone', () => {
    expect(getISOShortFormattedDate('2021-11-18', 'America/Guayaquil')).toEqual('2021-11-18');
    expect(getISOShortFormattedDate('2021-11-18', 'Pacific/Fiji')).toEqual('2021-11-18');
    expect(getISOShortFormattedDate('2021-11-18', 'Pacific/Pago_Pago')).toEqual('2021-11-18');
  });

  it('Formats the date (YYYY-MM-DDTHH:MM:SS.MMMZ) time to timezone ISO Short string', () => {
    expect(getISOShortFormattedDate('2021-11-18T00:00:00.000z', 'America/Guayaquil')).toEqual(
      '2021-11-18',
    );
    expect(getISOShortFormattedDate('2021-11-18T00:00:00.000z', 'Pacific/Fiji')).toEqual(
      '2021-11-18',
    );
  });
});
