import { renderValue, manageDateValue } from './fieldValueSelect';
import { format as formatDate } from 'date-fns';

const firstDate = { type: 'date', value: undefined };
const secondDate = { type: 'exactDate', value: new Date() };
const thirdDate = { type: 'relativeDate', value: { days: 3, time: 7 } };

describe('getTimeRangeDisplayValue', () => {
  it('returns the expected result when given an immediate date', () => {
    expect(renderValue(firstDate)).toStrictEqual('Immediately');
  });

  it('returns the expected result when given an exact date', () => {
    expect(renderValue(secondDate)).toContain('At an exact date');
  });

  it('returns the expected result when given a relative date', () => {
    expect(renderValue(thirdDate)).toStrictEqual('3 days from trigger, at 07:00');
  });
});

describe('getTimeRangeValues', () => {
  it('returns the expected result when given an immediate date', () => {
    expect(manageDateValue(firstDate)).toStrictEqual({
      days: 0,
      time: 'DAYS',
      fixedDate: undefined,
    });
  });

  it('returns the expected result when given an exact date', () => {
    expect(manageDateValue(secondDate)).toStrictEqual({
      fixedDate: formatDate(secondDate.value, "yyyy-MM-dd'T'HH:mm:ss"),
    });
  });

  it('returns the expected result when given a relative date', () => {
    expect(manageDateValue(thirdDate)).toStrictEqual({ days: 3, time: 7 });
  });
});
