import { configureFilterGroups, isOneSelected, resetFilterGroup } from './filterGroups.utils';
import {
  bobjectFieldsMock,
  defaultFiltersMock,
  filterGroupConfiguredMock,
  filterGroupsMock,
  filterGroupsTwoSelectedMock,
  filtersToResetMock,
} from './filterGroups.mock';

test('reset filter a group', () => {
  let filtersApply = {
    assignedTo: [],
    mrRating: ['KAE4YqrX2e3GAPGw'],
    targetMarket: ['Spg2nsBZo7f6GiV8'],
    source: ['ru3XI6NqbD9fMaiv'],
    type: [],
    moreFilters: {},
  };

  const setFilters = filters => {
    if (filters.order) filtersApply = { ...filtersApply, order: filters.order };
    if (filters.assignedTo) filtersApply = { ...filtersApply, assignedTo: filters.assignedTo };
    if (filters.targetMarket)
      filtersApply = { ...filtersApply, targetMarket: filters.targetMarket };
    if (filters.source) filtersApply = { ...filtersApply, source: filters.source };
    if (filters.mrRating) filtersApply = { ...filtersApply, mrRating: filters.mrRating };
    if (filters.status) filtersApply = { ...filtersApply, status: filters.status };
    if (filters.moreFilters) filtersApply = { ...filtersApply, moreFilters: filters.moreFilters };
  };

  const filterDataMock = {
    assignedTo: {
      data: null,
      type: 'ARRAY',
      reset: () => setFilters({ ...filtersApply, assignedTo: [] }),
    },
    mrRating: {
      data: ['KAE4YqrX2e3GAPGw'],
      type: 'ARRAY',
      reset: () => setFilters({ ...filtersApply, mrRating: [] }),
    },
    targetMarket: {
      data: ['Spg2nsBZo7f6GiV8'],
      type: 'ARRAY',
      reset: () => setFilters({ ...filtersApply, targetMarket: [] }),
    },
    source: {
      data: ['ru3XI6NqbD9fMaiv'],
      type: 'ARRAY',
      reset: () => setFilters({ ...filtersApply, source: [] }),
    },
    type: {
      data: [],
      type: 'ACTION',
      reset: () => setFilters({ ...filtersApply, type: [] }),
    },
    moreFilters: {
      data: null,
      type: 'OBJECT',
      reset: () => setFilters({ ...filtersApply, moreFilters: {} }),
    },
  };

  const filtersResult = {
    assignedTo: [],
    mrRating: [],
    targetMarket: [],
    source: [],
    type: [],
    moreFilters: {},
  };

  expect(() => resetFilterGroup({})).toThrow(new Error('Invalid params'));
  expect(() =>
    resetFilterGroup({
      filtersToReset: '',
      defaultFilters: '',
      filtersData: '',
      bobjectFields: '',
      setFilters: '',
    }),
  ).toThrowError(new Error('Invalid params'));

  resetFilterGroup({
    filtersToReset: filtersToResetMock,
    defaultFilters: defaultFiltersMock,
    filtersData: filterDataMock,
    bobjectFields: bobjectFieldsMock,
    setFilters,
  });

  expect(filtersApply).toEqual(filtersResult);
});

test('configure filterGroups', () => {
  expect(() => configureFilterGroups()).toThrowError(new Error('Invalid params'));
  expect(() => configureFilterGroups('')).toThrowError(new Error('Invalid params'));

  const resultEmpty = configureFilterGroups({});
  expect(resultEmpty).toEqual({});

  const result = configureFilterGroups(filterGroupsMock);
  expect(result).toEqual(filterGroupConfiguredMock);
});

test('Is one filter group selected', () => {
  expect(() => isOneSelected()).toThrowError(new Error('Invalid params'));
  expect(() => isOneSelected('')).toThrowError(new Error('Invalid params'));

  const resultEmpty = isOneSelected({});
  expect(resultEmpty).toEqual(false);

  const result = isOneSelected(filterGroupsMock);
  expect(result).toEqual(true);

  const resultTwoSelected = isOneSelected(filterGroupsTwoSelectedMock);
  expect(resultTwoSelected).toEqual(false);
});
