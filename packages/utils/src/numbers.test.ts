import { getHoursMinutesSeconds } from './numbers.utils';

describe('getHoursMinutesSeconds', () => {
  // Tests that input of 0 returns { hours: 0, minutes: 0, seconds: 0 }
  it('should return { hours: 0, minutes: 0, seconds: 0 } when input is 0', () => {
    expect(getHoursMinutesSeconds(0)).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  // Tests that input of 3600 returns { hours: 1, minutes: 0, seconds: 0 }
  it('should return { hours: 1, minutes: 0, seconds: 0 } when input is 3600', () => {
    expect(getHoursMinutesSeconds(3600)).toEqual({ hours: 1, minutes: 0, seconds: 0 });
  });

  // Tests that input of 3661 returns { hours: 1, minutes: 1, seconds: 1 }
  it('should return { hours: 1, minutes: 1, seconds: 1 } when input is 3661', () => {
    expect(getHoursMinutesSeconds(3661)).toEqual({ hours: 1, minutes: 1, seconds: 1 });
  });

  // Tests that input of 60 returns { hours: 0, minutes: 1, seconds: 0 }
  it('should return { hours: 0, minutes: 1, seconds: 0 } when input is 60', () => {
    expect(getHoursMinutesSeconds(60)).toEqual({ hours: 0, minutes: 1, seconds: 0 });
  });
});
