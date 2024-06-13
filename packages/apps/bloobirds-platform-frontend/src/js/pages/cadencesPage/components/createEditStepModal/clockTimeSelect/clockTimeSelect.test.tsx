import { dateToTimestamp, isAfter, isBefore, timestampToDate } from './clockTimeSelect';

describe('clock time select utilities', () => {
  test('timestampToDate', () => {
    const date = timestampToDate('18:00');
    expect(date).toEqual(new Date(0, 0, 0, 18, 0));
  });

  test('dateToTimestamp', () => {
    const date = dateToTimestamp(new Date(0, 0, 0, 18, 0));
    expect(date).toEqual('18:00');
  });

  test('isBefore', () => {
    expect(isBefore('16:00', '18:00')).toBe(true);
    expect(isBefore('18:00', '14:00')).toBe(false);
  });

  test('isAfter', () => {
    expect(isAfter('18:00', '16:00')).toBe(true);
    expect(isAfter('11:00', '14:00')).toBe(false);
  });
});
