import { BobjectTypes } from '@bloobirds-it/types';
import { today } from '@bloobirds-it/utils';
import { addDays } from 'date-fns';

import {
  getStatusColors,
  getStatusActivities,
  isDaily,
  isWeekly,
  isMonthly,
  addTimeTo,
  getFirstElementDate,
  getLastElementDate,
  mergeObjects,
  getStatusTooltipText,
  getTaskTooltipText,
  getProspectTooltipText,
  checkIsPausedDay,
} from './timetable.utils';

describe('Get status colors', () => {
  it('PickFields parameter is empty', () => {
    expect(getStatusColors).toThrowError(new Error('picklistFields parameter is required'));
  });

  it('PickFields parameter is an Object', () => {
    function getStatusColorsFn() {
      getStatusColors({});
    }

    expect(getStatusColorsFn).toThrowError(new Error('picklistFields parameter must be an array'));
  });

  it('PickFields parameter is an empty array', () => {
    expect(getStatusColors([])).toEqual({});
  });

  it('PickFields parameter is a correct object', () => {
    const mock = [
      {
        id: 'yXuSU1tx5lhUZthF',
        value: 'Engaged',
        logicRole: 'COMPANY__STATUS__ENGAGED',
        textColor: '#FFFFFF',
        backgroundColor: '#63BA00',
        outlineColor: '#63BA00',
      },
      {
        id: 'lFgwQayEZowH32iG',
        value: 'Nurturing',
        logicRole: 'COMPANY__STATUS__NURTURING',
        textColor: '#484848',
        backgroundColor: '#B8B8B8',
        outlineColor: '#B8B8B8',
      },
      {
        id: 'ed5wCZMcyM6vIT04',
        value: 'Ready to prospect',
        logicRole: 'COMPANY__STATUS__READY_TO_PROSPECT',
        textColor: '#464F57',
        backgroundColor: '#DEECF7',
        outlineColor: '#DEECF7',
      },
    ];
    expect(getStatusColors(mock)).toEqual({
      COMPANY__STATUS__ENGAGED: {
        backgroundColor: '#63BA00',
        textColor: '#FFFFFF',
      },
      COMPANY__STATUS__NURTURING: {
        backgroundColor: '#B8B8B8',
        textColor: '#484848',
      },
      COMPANY__STATUS__READY_TO_PROSPECT: {
        backgroundColor: '#DEECF7',
        textColor: '#464F57',
      },
    });
  });
});

describe('Get status activities', () => {
  it('Both params are empty', () => {
    expect(getStatusActivities).toThrowError(new Error('Both parameters are required'));
  });
  it('First parameter is null', () => {
    function getStatusActivitiesFn() {
      getStatusActivities(null, BobjectTypes.Company);
    }

    expect(getStatusActivitiesFn).toThrowError(new Error('Both parameters are required'));
  });
  it('First parameter is null', () => {
    function getStatusActivitiesFn() {
      getStatusActivities(undefined, BobjectTypes.Company);
    }

    expect(getStatusActivitiesFn).toThrowError(new Error('Both parameters are required'));
  });

  it('First parameter is an empty object', () => {
    expect(getStatusActivities({}, BobjectTypes.Company)).toEqual({});
  });

  it('Second parameter is null', () => {
    function getStatusActivitiesFn() {
      getStatusActivities({ key: 'value' }, null);
    }

    expect(getStatusActivitiesFn).toThrowError(new Error('Both parameters are required'));
  });

  it('Second parameter is undefined', () => {
    function getStatusActivitiesFn() {
      getStatusActivities({ key: 'value' }, undefined);
    }

    expect(getStatusActivitiesFn).toThrowError(new Error('Both parameters are required'));
  });

  it('Second parameter is an empty string', () => {
    function getStatusActivitiesFn() {
      getStatusActivities({ key: 'value' }, '');
    }

    expect(getStatusActivitiesFn).toThrowError(new Error('Both parameters are required'));
  });

  it('The activities object is correct BUT is NOT the same type that the second parameter', () => {
    const mock = {
      '2021-10-21': [
        {
          from: 'On Prospection',
          to: 'Contacted',
          name: 'COMPANY_STATUS_CHANGED',
        },
      ],
    };

    expect(getStatusActivities(mock, 'LEAD')).toEqual({});
  });

  it('The activities object is correct and is the same type that the second parameter', () => {
    const mock = {
      '2021-10-21': [
        {
          from: 'On Prospection',
          to: 'Contacted',
          name: 'COMPANY_STATUS_CHANGED',
        },
      ],
    };

    const mockResult = {
      '2021-10-21': {
        COMPANY_STATUS_CHANGED: [
          {
            from: 'On Prospection',
            to: 'Contacted',
            name: 'COMPANY_STATUS_CHANGED',
          },
        ],
      },
    };

    expect(getStatusActivities(mock, 'COMPANY')).toEqual(mockResult);
  });
});

describe("The time window is 'daily'", () => {
  it('The param is empty', () => {
    expect(isDaily).toThrowError(new Error('Time window parameters is required'));
  });

  it('The param is a empty string', () => {
    function isDailyFn() {
      isDaily('');
    }

    expect(isDailyFn).toThrowError(new Error('Time window parameters is required'));
  });

  it('The param is an empty object', () => {
    function isDailyFn() {
      isDaily({});
    }

    expect(isDailyFn).toThrowError(new Error('Time window parameters must be a string'));
  });

  it("The param is 'Daily'", () => {
    expect(isDaily('Daily')).toBe(false);
  });

  it("The param is 'daily'", () => {
    expect(isDaily('daily')).toBe(true);
  });

  it("The param is 'weekly'", () => {
    expect(isDaily('weekly')).toBe(false);
  });
});

describe("The time window is 'weekly'", () => {
  it('The param is empty', () => {
    expect(isWeekly).toThrowError(new Error('Time window parameters is required'));
  });

  it('The param is a empty string', () => {
    function isWeeklyFn() {
      isWeekly('');
    }

    expect(isWeeklyFn).toThrowError(new Error('Time window parameters is required'));
  });

  it('The param is an empty object', () => {
    function isWeeklyFn() {
      isWeekly({});
    }

    expect(isWeeklyFn).toThrowError(new Error('Time window parameters must be a string'));
  });

  it("The param is 'Weekly'", () => {
    expect(isWeekly('Weekly')).toBe(false);
  });

  it("The param is 'weekly'", () => {
    expect(isWeekly('weekly')).toBe(true);
  });

  it("The param is 'daily'", () => {
    expect(isWeekly('daily')).toBe(false);
  });
});

describe("The time window is 'monthly'", () => {
  it('The param is empty', () => {
    expect(isMonthly).toThrowError(new Error('Time window parameters is required'));
  });

  it('The param is a empty string', () => {
    function isMonthlyFn() {
      isMonthly('');
    }

    expect(isMonthlyFn).toThrowError(new Error('Time window parameters is required'));
  });

  it('The param is an empty object', () => {
    function isMonthlyFn() {
      isMonthly({});
    }

    expect(isMonthlyFn).toThrowError(new Error('Time window parameters must be a string'));
  });

  it("The param is 'Monthly'", () => {
    expect(isMonthly('Monthly')).toBe(false);
  });

  it("The param is 'monthly'", () => {
    expect(isMonthly('monthly')).toBe(true);
  });

  it("The param is 'daily'", () => {
    expect(isMonthly('daily')).toBe(false);
  });
});

describe('Add time to', () => {
  it('All parameters are empty', () => {
    expect(addTimeTo).toThrowError(new Error('All parameters are required'));
  });

  it('The parameters are not the correct type', () => {
    expect(() => addTimeTo(20, 'weeks', 1)).toThrowError(
      new Error('The dates variable must be an array'),
    );
    expect(() => addTimeTo(['element'], 20, 1)).toThrowError(
      new Error('The time type variable must be a string or its value "weeks" or "months'),
    );
    expect(() => addTimeTo(['element'], 'days', 1)).toThrowError(
      new Error('The time type variable must be a string or its value "weeks" or "months'),
    );
    expect(() => addTimeTo(['element'], 'weeks', 'days')).toThrowError(
      new Error('The time number variable must be a number'),
    );
  });

  it('The array of dates is not a correct date', () => {
    expect(() => addTimeTo(['element'], 'weeks', 2)).toThrowError(
      new Error('The dates are not valid'),
    );
  });

  it('Correct behaviour', () => {
    const mockDates = ['2021-10-11/2021-10-17'];

    const mockResult = [
      '2021-10-11/2021-10-17',
      '2021-10-18/2021-10-24',
      '2021-10-25/2021-10-31',
      '2021-11-01/2021-11-07',
      '2021-11-08/2021-11-14',
    ];

    expect(addTimeTo(mockDates, 'weeks', 4)).toEqual(mockResult);
  });
});

describe('Get first element date', () => {
  it('All parameters are empty', () => {
    expect(getFirstElementDate).toThrowError(new Error('All parameters are required'));
  });

  it('First element is not an object', () => {
    expect(() => getFirstElementDate('element', 'daily')).toThrowError(
      new Error('The first param must be an object'),
    );
  });

  it('Second element is not a valid type (daily, weekly or monthly)', () => {
    expect(() => getFirstElementDate({ key: 'value' }, 'monday')).toThrowError(
      new Error('The second param must be an object or a valid type (daily, weekly or monthly)'),
    );
  });

  it('The elements object is a empty object', () => {
    expect(getFirstElementDate({}, 'daily')).toEqual(today());
  });

  it('The elements object is not empty AND the timewindow is daily', () => {
    const mockObject = {
      '2021-10-20': {
        PROSPECT_TASKS: ['EMAIL'],
      },
      '2021-11-02': {
        PROSPECT_TASKS: ['PHONE_CALL'],
      },
      '2021-11-04': {
        PROSPECT_TASKS: ['EMAIL', 'LINKEDIN_MESSAGE', 'PHONE_CALL'],
      },
    };
    expect(getFirstElementDate(mockObject, 'daily')).toEqual(new Date('2021-10-20'));
  });

  it('The elements object is not empty and is NOT a date range AND the timewindow is NOT daily', () => {
    const mockObject = {
      '2021-10-20': {
        PROSPECT_TASKS: ['EMAIL'],
      },
      '2021-11-02': {
        PROSPECT_TASKS: ['PHONE_CALL'],
      },
      '2021-11-04': {
        PROSPECT_TASKS: ['EMAIL', 'LINKEDIN_MESSAGE', 'PHONE_CALL'],
      },
    };
    expect(getFirstElementDate(mockObject, 'weekly')).toEqual(new Date('2021-10-20'));
  });

  it('The elements object is not empty AND the timewindow is NOT daily', () => {
    const mockObject = {
      '2021-10-18/2021-10-24': {
        PROSPECT_TASKS: ['EMAIL'],
      },
      '2021-11-01/2021-11-07': {
        PROSPECT_TASKS: ['PHONE_CALL', 'EMAIL', 'LINKEDIN_MESSAGE', 'PHONE_CALL'],
      },
    };
    expect(getFirstElementDate(mockObject, 'weekly')).toEqual(new Date('2021-10-18'));
  });
});

describe('Get last element date', () => {
  it('All parameters are empty', () => {
    expect(getLastElementDate).toThrowError(new Error('All parameters are required'));
  });

  it('First element is not an object', () => {
    expect(() => getLastElementDate('element', 'daily')).toThrowError(
      new Error('The first param must be an object'),
    );
  });

  it('Second element is not a valid type (daily, weekly or monthly)', () => {
    expect(() => getLastElementDate({ key: 'value' }, 'monday')).toThrowError(
      new Error('The second param must be an object or a valid type (daily, weekly or monthly)'),
    );
  });

  it('The elements object is a empty object', () => {
    expect(getLastElementDate({}, 'daily')).toEqual(addDays(today(), 5));
  });

  it('The elements object is not empty AND the timewindow is daily', () => {
    const mockObject = {
      '2021-10-20': {
        PROSPECT_TASKS: ['EMAIL'],
      },
      '2021-11-02': {
        PROSPECT_TASKS: ['PHONE_CALL'],
      },
      '2021-11-04': {
        PROSPECT_TASKS: ['EMAIL', 'LINKEDIN_MESSAGE', 'PHONE_CALL'],
      },
    };
    expect(getLastElementDate(mockObject, 'daily')).toEqual(new Date('2021-11-04'));
  });

  it('The elements object is not empty and is NOT a date range AND the timewindow is NOT daily', () => {
    const mockObject = {
      '2021-10-20': {
        PROSPECT_TASKS: ['EMAIL'],
      },
      '2021-11-02': {
        PROSPECT_TASKS: ['PHONE_CALL'],
      },
      '2021-11-04': {
        PROSPECT_TASKS: ['EMAIL', 'LINKEDIN_MESSAGE', 'PHONE_CALL'],
      },
    };
    expect(getLastElementDate(mockObject, 'weekly')).toEqual(today());
  });

  it('The elements object is not empty AND the timewindow is NOT daily', () => {
    const mockObject = {
      '2021-10-18/2021-10-24': {
        PROSPECT_TASKS: ['EMAIL'],
      },
      '2021-11-01/2021-11-07': {
        PROSPECT_TASKS: ['PHONE_CALL', 'EMAIL', 'LINKEDIN_MESSAGE', 'PHONE_CALL'],
      },
    };
    expect(getLastElementDate(mockObject, 'weekly')).toEqual(new Date('2021-11-07'));
  });
});

describe('Merge two objects where its keys are dates or range dates', () => {
  it('All parameters are empty', () => {
    expect(mergeObjects).toThrowError(new Error('All parameters are required'));
  });

  it('First param is not an object', () => {
    expect(() => mergeObjects('element', {})).toThrowError(
      new Error('The first param must be an object'),
    );
  });

  it('Second param is not an object', () => {
    expect(() => mergeObjects({}, 'element')).toThrowError(
      new Error('The second param must be an object'),
    );
  });

  it('The first param is an empty object', () => {
    const mockObject = {
      '2021-10-15': {
        PHONE_CALL: 1,
      },
      '2021-10-20': {
        PHONE_CALL: 1,
        EMAIL: 1,
        LINKEDIN_MESSAGE: 1,
      },
      '2021-10-21': {
        PHONE_CALL: 2,
        EMAIL: 2,
        LINKEDIN_MESSAGE: 2,
        INBOUND: 1,
      },
      '2021-11-04': {
        PHONE_CALL: 4,
      },
      '2021-12-10': {
        PHONE_CALL: 1,
      },
    };
    expect(mergeObjects({}, mockObject)).toEqual(mockObject);
  });

  it('The second param is an empty object', () => {
    const mockObject = {
      '2021-10-15': {
        PHONE_CALL: 1,
      },
      '2021-10-20': {
        PHONE_CALL: 1,
        EMAIL: 1,
        LINKEDIN_MESSAGE: 1,
      },
      '2021-10-21': {
        PHONE_CALL: 2,
        EMAIL: 2,
        LINKEDIN_MESSAGE: 2,
        INBOUND: 1,
      },
      '2021-11-04': {
        PHONE_CALL: 4,
      },
      '2021-12-10': {
        PHONE_CALL: 1,
      },
    };
    expect(mergeObjects(mockObject, {})).toEqual(mockObject);
  });

  it('Correct merge', () => {
    const mockObjectA = {
      '2021-10-20': {
        TASKS_COMPLETED: 4,
      },
      '2021-10-22': {
        TASKS_COMPLETED: 1,
      },
    };
    const mockObjectB = {
      '2021-10-20': {
        PROSPECT_TASKS: ['EMAIL'],
      },
    };
    const mockResult = {
      '2021-10-20': {
        TASKS_COMPLETED: 4,
        PROSPECT_TASKS: ['EMAIL'],
      },
      '2021-10-22': {
        TASKS_COMPLETED: 1,
      },
    };
    expect(mergeObjects(mockObjectA, mockObjectB)).toEqual(mockResult);
  });
});

describe('Get status tooltip text', () => {
  it('All parameters are empty', () => {
    expect(getStatusTooltipText).toThrowError(new Error('All parameters are required'));
  });

  it('The bobject type is not a string', () => {
    expect(() => getStatusTooltipText([], [])).toThrowError(
      new Error(
        'The bobject type must be a string and its type must be Company, Lead, Activity, Task or Opportunity',
      ),
    );
  });

  it('The bobject type is not correct', () => {
    expect(() => getStatusTooltipText('bobjectType', [])).toThrowError(
      new Error(
        'The bobject type must be a string and its type must be Company, Lead, Activity, Task or Opportunity',
      ),
    );
  });

  it('The status data is not an array', () => {
    expect(() => getStatusTooltipText('COMPANY', 'element')).toThrowError(
      new Error('The status data param must be an array'),
    );
  });

  it('The status data is an empty array', () => {
    expect(getStatusTooltipText('COMPANY', [])).toEqual('');
  });

  it('Correct tooltip text', () => {
    const mock = [
      {
        from: 'On Prospection',
        to: 'Contacted',
        name: 'COMPANY_STATUS_CHANGED',
      },
    ];
    const mockResult = 'Company status changed 1 times: from On Prospection to Contacted';
    expect(getStatusTooltipText('COMPANY', mock)).toEqual(mockResult);
  });
});

describe('Get task tooltip text', () => {
  it('The parameter is empty', () => {
    expect(getTaskTooltipText).toThrowError(new Error('The task data parameter is required'));
  });

  it('The task data type is not an object', () => {
    expect(() => getTaskTooltipText('element')).toThrowError(
      new Error('The task data type must be an object'),
    );
  });

  it('The task data is an empty object', () => {
    expect(getTaskTooltipText({})).toEqual('');
  });

  it('Correct tooltip text', () => {
    const mock = {
      TASKS: 1,
      TASKS_COMPLETED: 4,
    };
    const mockResult = '4 scheduled task completed and 1 scheduled task';
    expect(getTaskTooltipText(mock)).toEqual(mockResult);
  });
});

describe('Get prospect tooltip text', () => {
  it('The parameter is empty', () => {
    expect(getProspectTooltipText).toThrowError(new Error('All parameters are required'));
  });

  it('The day parameter is not a string', () => {
    expect(() => getProspectTooltipText(2021, 0, 0, 'action')).toThrowError(
      new Error('The day must be a string'),
    );
  });

  it('The prospectTaskForDay parameter is not a string', () => {
    expect(() => getProspectTooltipText('2021-11-04', '', 0, 'action')).toThrowError(
      new Error('The prospect task for the day must be a number'),
    );
  });

  it('The activitiesForDay parameter is not a string', () => {
    expect(() => getProspectTooltipText('2021-11-04', 0, '', 'action')).toThrowError(
      new Error('The activities for the day must be a number'),
    );
  });

  it('The action parameter is not a string', () => {
    expect(() => getProspectTooltipText('2021-11-04', 0, 0, 10)).toThrowError(
      new Error('The action must be a string'),
    );
  });

  it('The number of task and activities is equal to 0', () => {
    expect(getProspectTooltipText('2021-11-04', 0, 0, 'linkedin_message')).toEqual('');
  });

  it('Correct tooltip text without activities', () => {
    const mockResult = '4 scheduled linkedin message ';
    expect(getProspectTooltipText('2021-11-04', 4, 0, 'linkedin_message')).toEqual(mockResult);
  });

  it('Correct tooltip text with activities', () => {
    const mockResult =
      '1 scheduled linkedin message completed 3 non-scheduled linkedin message completed';
    expect(getProspectTooltipText('2021-11-04', 1, 4, 'linkedin_message')).toEqual(mockResult);
  });
});

describe('Check is a day is a paused day', () => {
  it('The parameters are empty', () => {
    expect(checkIsPausedDay).toThrowError(new Error('All parameters are required'));
  });

  it('The date parameter is not an object', () => {
    expect(() => checkIsPausedDay(2021, 'weekly', new Set(['a', 'b', 'c']))).toThrowError(
      new Error('The date must be an object'),
    );
  });

  it('The timeWindow parameter is not a string', () => {
    expect(() =>
      checkIsPausedDay({ start: '2021-11-05', end: '2021-11-30' }, 20, new Set(['a', 'b', 'c'])),
    ).toThrowError(new Error('The time window must be a string'));
  });

  it('The time window has a not valid type', () => {
    expect(() =>
      checkIsPausedDay(
        { start: '2021-11-05', end: '2021-11-30' },
        'timeWindow',
        new Set(['a', 'b', 'c']),
      ),
    ).toThrowError(new Error('The time window has a valid value'));
  });

  it('The paused cadence days must is not an object', () => {
    expect(() =>
      checkIsPausedDay({ start: '2021-11-05', end: '2021-11-30' }, 'weekly', 'Dates'),
    ).toThrowError(new Error('The pause cadence data must be an object'));
  });

  it('Is paused day and the time window is "weekly', () => {
    const mock = new Set(['2021-10-29', '2021-10-30', '2021-10-31', '2021-11-01']);

    expect(
      checkIsPausedDay({ start: '2021-11-05', end: '2021-11-30' }, 'weekly', mock),
    ).toBeTruthy();
  });

  it('Is NOT paused day and the time window is "weekly', () => {
    const mock = new Set(['2021-10-29', '2021-10-30']);

    expect(
      checkIsPausedDay({ start: '2021-11-05', end: '2021-11-30' }, 'weekly', mock),
    ).toBeFalsy();
  });

  it('Is paused day and the time window is "monthly', () => {
    const mock = new Set(['2021-10-29', '2021-10-30', '2021-10-31', '2021-11-01']);

    expect(
      checkIsPausedDay({ start: '2021-11-05', end: '2021-11-30' }, 'monthly', mock),
    ).toBeTruthy();
  });

  it('Is NOT paused day and the time window is "monthly', () => {
    const mock = new Set(['2021-10-29', '2021-10-30']);

    expect(
      checkIsPausedDay({ start: '2021-11-05', end: '2021-11-30' }, 'monthly', mock),
    ).toBeFalsy();
  });
});
