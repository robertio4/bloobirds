import { buildMoreFilters, buildSubhomeFilters } from './prospectingPage.utils';
import {
  bobjectFieldsMock,
  bobjectPicklistFieldValuesMock,
  subhomeFiltersMock,
  filtersToApplyMock,
  expectedResultMock,
  expectedResultMoreMock,
  bobjectTypesMock,
} from './prospectingPage.mock';

test('apply a quick filter in a subhome', () => {
  const result = buildSubhomeFilters({
    filtersToApply: filtersToApplyMock,
    subhomeFilters: subhomeFiltersMock,
    bobjectFields: bobjectFieldsMock,
    bobjectPicklistFieldValues: bobjectPicklistFieldValuesMock,
  });
  expect(result).toEqual(expectedResultMock);
  const resultMore = buildMoreFilters({
    filtersToApply: filtersToApplyMock,
    subhomeFilters: subhomeFiltersMock,
    bobjectFields: bobjectFieldsMock,
    bobjectPicklistFieldValues: bobjectPicklistFieldValuesMock,
    bobjectTypes: bobjectTypesMock,
  });

  const empty = buildSubhomeFilters({});
  const emptyMore = buildMoreFilters({});

  expect(empty).toEqual({});
  expect(emptyMore).toEqual({});
  expect(() =>
    buildSubhomeFilters({
      filtersToApply: '',
      subhomeFilters: '',
    }),
  ).toThrowError(new Error('Invalid params'));
  expect(() =>
    buildMoreFilters({
      filtersToApply: '',
      subhomeFilters: '',
    }),
  ).toThrowError(new Error('Invalid params'));

  expect(resultMore).toEqual(expectedResultMoreMock);
});
