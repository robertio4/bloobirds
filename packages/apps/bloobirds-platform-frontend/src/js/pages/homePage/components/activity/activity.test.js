import { getMetricValue } from './activity';

const metrics = {
  metrics: [
    {
      value: 2,
      previousValue: 0,
      change: null,
      label: 'MEETINGS_CREATED',
    },
    {
      value: 29,
      previousValue: 1,
      change: 2800,
      label: 'OUTGOING_EMAIL',
    },
    {
      value: 16,
      previousValue: 4,
      change: 300,
      label: 'OUTGOING_CALL',
    },
    {
      value: 0,
      previousValue: 0,
      change: null,
      label: 'OUTGOING_LINKEDIN',
    },
    {
      value: 14,
      previousValue: 4,
      change: null,
      label: 'TASKS',
    },
  ],
};

describe('getValue In activity function', () => {
  test('return metric when giving a label MEETINGS_CREATED', () => {
    const metric = 'MEETINGS_CREATED';
    const result = getMetricValue(metric, metrics);
    const expected = {
      value: 2,
      previousValue: 0,
      change: null,
      label: 'MEETINGS_CREATED',
    };
    expect(result.label).toBe(expected.label);
    expect(result.value).toBe(expected.value);
    expect(result.previousValue).toBe(expected.previousValue);
    expect(result.change).toBe(expected.change);
  });
  test('return undefined when giving a label blabla', () => {
    const metric = 'blabla';
    const result = getMetricValue(metric, metrics);
    expect(result).toBe(undefined);
  });
});
