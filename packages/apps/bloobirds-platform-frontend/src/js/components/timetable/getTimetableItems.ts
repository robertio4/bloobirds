import spacetime from 'spacetime';

const beginningOfBloobirds = spacetime([2018, 1, 1]);
const threeYearsLater = spacetime.now().add(5, 'year');

const timeTableDays = beginningOfBloobirds
  .every('day', threeYearsLater)
  .map(date => date.format('iso-short'));

const timeTableWeeks = beginningOfBloobirds.every('week', threeYearsLater).map(date => {
  return `${date.format('iso-short')}/${date.add(6, 'day').format('iso-short')}`;
});

const timeTableMonths = beginningOfBloobirds.every('month', threeYearsLater).map(date => {
  return `${date.format('iso-short')}/${date
    .add(1, 'month')
    .subtract(1, 'day')
    .format('iso-short')}`;
});

export type TimeWindow = 'daily' | 'weekly' | 'monthly';

export const getTimetableItems = (timeWindow: TimeWindow) => {
  switch (timeWindow) {
    case 'daily':
      return timeTableDays;
    case 'weekly':
      return timeTableWeeks;
    case 'monthly':
      return timeTableMonths;
    default:
      throw new Error(`Unknown time window: ${timeWindow}`);
  }
};
