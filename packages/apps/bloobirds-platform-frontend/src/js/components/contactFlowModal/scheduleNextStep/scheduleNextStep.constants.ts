export enum ScheduleShortTimes {
  tenMinutes = 'in_10_minutes',
  thirtyMinutes = 'in_30_minutes',
  oneHour = 'in_1_hour',
  twoHours = 'in_2_hours',
  fourHours = 'in_4_hours',
  oneDay = 'in_1_day',
  twoDays = 'in_2_days',
  custom = 'custom',
}

export enum Unit {
  minutes = 'minutes',
  hours = 'hours',
  days = 'days',
}

export const ScheduleShortTimesValues: {
  [x: string]: { [type: string]: Unit | string | number };
} = {
  in_10_minutes: { unit: 'minutes', amount: 10 },
  in_30_minutes: { unit: 'minutes', amount: 30 },
  in_1_hour: { unit: 'hours', amount: 1 },
  in_2_hours: { unit: 'hours', amount: 2 },
  in_4_hours: { unit: 'hours', amount: 4 },
  in_1_day: { unit: 'days', amount: 1 },
  in_2_days: { unit: 'days', amount: 2 },
};
