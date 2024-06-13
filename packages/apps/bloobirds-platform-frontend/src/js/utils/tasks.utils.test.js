import { canBeMarkedAsDone, getButtonMarkAsDone, isBeforeToday, isToday } from './tasks.utils';
import { addDays } from './dates.utils';
import spacetime from 'spacetime';

if (!Date.prototype.toISODate) {
  // eslint-disable-next-line no-extend-native,func-names
  Date.prototype.toISODate = function () {
    return `${this.getFullYear()}-${`0${this.getMonth() + 1}`.slice(
      -2,
    )}-${`0${this.getDate()}`.slice(-2)}`;
  };
}

describe('call getButtonMarkAsDone', () => {
  it('disable false when task is overdue but last attempt is after', () => {
    const values = {
      taskType: 'PROSPECT_CADENCE',
      taskStatus: 'TASK__STATUS__OVERDUE',
      bobjectLastAttemptDate: '2021-11-09T00:00:00Z',
      taskDateField: '2021-11-05',
      taskIsAutomated: 'TASK__IS_AUTOMATED__YES',
    };

    const result = getButtonMarkAsDone(values);

    const expected = {
      disabled: false,
      tooltip: 'When you complete this task it will be marked as Completed Overdue',
    };

    expect(result).toEqual(expected);
  });

  it('disabled true when task is overdue and last attempt is after ', () => {
    const values = {
      taskType: 'PROSPECT_CADENCE',
      taskStatus: 'TASK__STATUS__OVERDUE',
      bobjectLastAttemptDate: '2021-11-04T00:00:00Z',
      taskDateField: '2021-11-08',
      taskIsAutomated: 'TASK__IS_AUTOMATED__YES',
    };

    const result = getButtonMarkAsDone(values);

    const expected = {
      disabled: true,
      tooltip: 'Make at least one attempt to mark as done',
    };

    expect(result).toEqual(expected);
  });

  it('disabled true when task is to do and last attempt is not today', () => {
    const values = {
      taskType: 'PROSPECT_CADENCE',
      taskStatus: 'TASK__STATUS__TODO',
      bobjectLastAttemptDate: addDays(new Date(), -1).toISOString(),
      taskDateField: new Date().toISODate(),
      taskIsAutomated: 'TASK__IS_AUTOMATED__YES',
    };

    const result = getButtonMarkAsDone(values);

    const expected = {
      disabled: true,
      tooltip: 'Make at least one attempt to mark as done',
    };

    expect(result).toEqual(expected);
  });

  it('disabled true when task is for future', () => {
    const values = {
      taskType: 'PROSPECT_CADENCE',
      taskStatus: 'TASK__STATUS__TODO',
      bobjectLastAttemptDate: '2021-11-04T00:00:00Z',
      taskDateField: '2221-11-10',
      taskIsAutomated: 'TASK__IS_AUTOMATED__YES',
    };

    const result = getButtonMarkAsDone(values);

    const expected = {
      disabled: true,
      tooltip: 'This is a task for the future. You cannot mark it as done.',
    };

    expect(result).toEqual(expected);
  });

  it('disabled false when task is not automated', () => {
    const values = {
      taskType: 'PROSPECT_CADENCE',
      taskStatus: 'TASK__STATUS__OVERDUE',
      bobjectLastAttemptDate: '2021-11-04T00:00:00Z',
      taskDateField: '2021-11-08',
      taskIsAutomated: 'TASK__IS_AUTOMATED__NO',
    };
    const values2 = {
      taskType: 'PROSPECT_CADENCE',
      taskStatus: 'TASK__STATUS__TODO',
      bobjectLastAttemptDate: addDays(new Date(), -1).toISOString(),
      taskDateField: new Date().toISODate(),
      taskIsAutomated: 'TASK__IS_AUTOMATED__NO',
    };

    const result = getButtonMarkAsDone(values);
    const result2 = getButtonMarkAsDone(values2);

    const expected = {
      disabled: false,
      tooltip: 'When you complete this task it will be marked as Completed Overdue',
    };

    const expected2 = {
      disabled: false,
      tooltip: 'Mark as done',
    };

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected2);
  });
});

describe('Mark as done test suite', () => {
  describe('Prospecting tasks - Overdue', () => {
    it('should be able to be marked as done if the task is overdue, not skippable and the last attempt is after the scheduled date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__OVERDUE',
        lastAttemptDate: '2021-11-09T00:00:00Z',
        date: '2021-11-05',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe(
        'When you complete this task it will be marked as Completed Overdue',
      );
    });
    it('should be able to be marked as done if the task is overdue and use date time true, not skippable and the last attempt is after the scheduled date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__OVERDUE',
        lastAttemptDate: '2021-11-09T00:00:00Z',
        date: '2021-11-05T00:00:00Z',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe(
        'When you complete this task it will be marked as Completed Overdue',
      );
    });
    it('should be able to be marked as done if the task is overdue, not skippable and the last attempt is after the scheduled date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2022-03-25T15:08:27.986Z',
        date: '2022-03-25T06:00:00Z',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is overdue, not skippable and the last attempt is the same as the scheduled date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__OVERDUE',
        lastAttemptDate: '2021-11-09T07:00:01Z',
        date: '2021-11-09',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe(
        'When you complete this task it will be marked as Completed Overdue',
      );
    });
    it('should be not be able to be marked as done if the task is overdue, not skippable and the last attempt is before the scheduled date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__OVERDUE',
        lastAttemptDate: '2021-11-04T00:00:00Z',
        date: '2021-11-08',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(true);
      expect(result.reason).toBe('Make at least one attempt to mark as done');
    });
    it('should be able to be marked as done if the task is overdue and its skippable', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__OVERDUE',
        lastAttemptDate: '2021-11-04T00:00:00Z',
        date: '2021-11-08',
        skippable: true,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe(
        'When you complete this task it will be marked as Completed Overdue',
      );
    });
  });
  describe('Prospecting tasks - ToDo', () => {
    it('should not be able to be marked as done if the task is Todo and the date is in the future', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-04T00:00:00Z',
        date: '2054-11-08',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(true);
      expect(result.reason).toBe('This is a task for the future. You cannot mark it as done.');
    });
    it('should not be able to be marked as done if the task is Todo, scheduled for today and without a last attempt date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: undefined,
        date: new Date().toISODate(),
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(true);
      expect(result.reason).toBe('Make at least one attempt to mark as done');
    });
    it('should not be able to be marked as done if the task is Todo, scheduled for the future with datetime and without a last attempt date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: undefined,
        date: '2030-03-27T06:00:00Z',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.reason).toBe('This is a task for the future. You cannot mark it as done.');
      expect(result.disabled).toBe(true);
    });
    it('should not be able to be marked as done if the task is Todo, scheduled for today with datetime and without a last attempt date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: undefined,
        date: new Date().toISOString(),
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.reason).toBe('Make at least one attempt to mark as done');
      expect(result.disabled).toBe(true);
    });
    it('should be able to be marked as done if the task is ToDo, the datetime is from the past, not skippable and the last attempt date is after the scheduled date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-09T00:00:00Z',
        date: '2021-11-05T23:59:59Z',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is ToDo, the date is from the past, not skippable and the last attempt date is after the scheduled date', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-09T00:00:00Z',
        date: '2021-11-05',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is ToDo, is scheduled for today, not skippable and the last attempt date is today', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: new Date().toISOString(),
        date: new Date().toISODate(),
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should not be able to be marked as done if the task is ToDo, scheduled for today, not skippable and the last attempt date is before today', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-04T00:00:00Z',
        date: new Date().toISODate(),
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(true);
      expect(result.reason).toBe('Make at least one attempt to mark as done');
    });
    it('should be able to be marked as done if the task is ToDo, scheduled for today, skippable and the last attempt date is today', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: new Date().toISOString(),
        date: new Date().toISODate(),
        skippable: true,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is ToDo, scheduled for today, skippable and the last attempt date is before today', () => {
      const task = {
        type: 'PROSPECT_CADENCE',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-04T00:00:00Z',
        date: new Date().toISODate(),
        skippable: true,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
  });
  describe('Scheduled tasks', () => {
    it('should be able to be marked as done if the task is scheduled and the last attempt date is after the scheduled date', () => {
      const task = {
        type: 'NEXT_STEP',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-09T00:00:00Z',
        date: '2021-11-05',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is scheduled and the last attempt date is before the scheduled date', () => {
      const task = {
        type: 'NEXT_STEP',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-04T00:00:00Z',
        date: '2021-11-05',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is scheduled and the last attempt date is today', () => {
      const task = {
        type: 'NEXT_STEP',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: new Date().toISOString(),
        date: new Date().toISODate(),
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
  });
  describe('Meeting tasks', () => {
    it('should be able to be marked as done if the task is a meeting and the last attempt date is after the scheduled date', () => {
      const task = {
        type: 'MEETING',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-09T00:00:00Z',
        date: '2021-11-05',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is a meeting and the last attempt date is before the scheduled date', () => {
      const task = {
        type: 'MEETING',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: '2021-11-04T00:00:00Z',
        date: '2021-11-05',
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
    it('should be able to be marked as done if the task is a meeting and the last attempt date is today', () => {
      const task = {
        type: 'MEETING',
        status: 'TASK__STATUS__TODO',
        lastAttemptDate: new Date().toISOString(),
        date: new Date().toISODate(),
        skippable: false,
      };
      const result = canBeMarkedAsDone(task);
      expect(result.disabled).toBe(false);
      expect(result.reason).toBe('Mark as done');
    });
  });
  describe('Check relative dates with timezones', () => {
    it('a task scheduled at 2022-03-29T22:00:00Z should be classified as a today task if today is 2022-03-30T00:00:00Z', () => {
      const s = spacetime.today().startOf('day').goto('UTC').format('{iso}');
      expect(isToday(s, 'Europe/Madrid')).toBe(true);
    });
    it('a task scheduled at XXXX-XX-XXT05:00:00Z should be classified as a today task if today is XXXX-XX-XXT00:00:00Z', () => {
      const s = spacetime.today('America/Guayaquil').startOf('day').goto('UTC').format('{iso}');
      expect(isToday(s, 'America/Guayaquil')).toBe(true);
    });
    it('DST changes', () => {
      const s = spacetime('2022-04-04T05:00:00Z').goto('America/Mexico_City');
      expect(s.format('{iso-short}')).toBe('2022-04-04');
    });
  });
});
