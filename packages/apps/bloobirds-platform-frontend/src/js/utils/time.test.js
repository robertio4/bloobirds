import { segToTime } from './time.utils';

test('call the segToTime function without params', () => {
  expect(segToTime).toThrow('duration parameter is required');
});

test('properly sets 10s as integer', () => {
  expect(segToTime(10)).toBe('00:10');
});

test('properly sets 10s as integer', () => {
  expect(segToTime('10')).toBe('00:10');
});

test('properly sets 1 minute as integer', () => {
  expect(segToTime(60)).toBe('01:00');
});

test('properly sets 10 minutes', () => {
  expect(segToTime(600)).toBe('10:00');
});

test('properly sets 1 hour', () => {
  expect(segToTime(3600)).toBe('01:00:00');
});

test('properly sets 10 hour', () => {
  expect(segToTime(36000)).toBe('10:00:00');
});

test('properly sets 1s as integer', () => {
  expect(segToTime(1, 'hhh mmm sss')).toBe('1s');
});

test('properly sets 10s as integer', () => {
  expect(segToTime(10, 'hhh mmm sss')).toBe('10s');
});

test('properly sets 10s as integer', () => {
  expect(segToTime('10', 'hhh mmm sss')).toBe('10s');
});

test('properly sets 1 minute as integer', () => {
  expect(segToTime(60, 'hhh mmm sss')).toBe('1m');
});

test('properly sets 1 minute and 1 second as integer', () => {
  expect(segToTime(61, 'hhh mmm sss')).toBe('1m 1s');
});

test('properly sets 10 minutes', () => {
  expect(segToTime(600, 'hhh mmm sss')).toBe('10m');
});

test('properly sets 1 hour', () => {
  expect(segToTime(3600, 'hhh mmm sss')).toBe('1h');
});

test('properly sets 10 hour', () => {
  expect(segToTime(36000, 'hhh mmm sss')).toBe('10h');
});

test('properly sets more than 24 hours', () => {
  expect(() => {
    segToTime(86500);
  }).toThrow('duration should be less than one day');
});
