import { filtersToRequest, getModalTitle, parseQuickFilterKeys } from './quickFilterModal.utils';

const fields = [
  {
    id: 'Ee9vfOrp1upv5eS1',
    logicRole: 'COMPANY__TARGET_MARKET',
  },
  {
    id: 'SxslZr93E6w41Rs2',
    logicRole: 'COMPANY__SOURCE',
  },
  {
    id: 'CydrnqmmGQavCSEt',
    logicRole: 'COMPANY__MR_RATING',
  },
  {
    id: '5wRCb3bB5mHSNKUK',
    logicRole: 'COMPANY__LEADS_COUNT',
  },
  {
    id: 'E7qmRffpJskoiyd6',
    logicRole: 'COMPANY__CREATION_DATETIME',
  },
];

const bobjectFields = {
  findByLogicRole: value => {
    let val = undefined;
    fields.forEach(entity => {
      if (entity && entity.logicRole === value) {
        val = entity;
      }
    });
    return val;
  },
};

const filters = {
  COMPANY__TARGET_MARKET: ['Spg2nsBZo7f6GiV8'],
  COMPANY__SOURCE: ['ru3XI6NqbD9fMaiv', 'MNAJ2tpSbKn80Je3'],
  COMPANY__MR_RATING: ['KAE4YqrX2e3GAPGw'],
  COMPANY__LEADS_COUNT: [
    {
      type: 'RANGE__SEARCH__GT',
      value: '2',
    },
  ],
  COMPANY__CREATION_DATETIME: {
    query: {
      gte: '2021-11-06T23:00:00.000Z',
      lte: '2021-11-13T22:59:59.999Z',
    },
    searchMode: 'RANGE__SEARCH',
    type: 'this_week',
    searchType: 'RANGE__SEARCH__BETWEEN__DATES',
  },
};

const expectedResult = [
  {
    bobjectFieldId: 'Ee9vfOrp1upv5eS1',
    values: ['Spg2nsBZo7f6GiV8'],
    searchType: 'EXACT__SEARCH',
  },
  {
    bobjectFieldId: 'SxslZr93E6w41Rs2',
    values: ['ru3XI6NqbD9fMaiv', 'MNAJ2tpSbKn80Je3'],
    searchType: 'EXACT__SEARCH',
  },
  {
    bobjectFieldId: 'CydrnqmmGQavCSEt',
    values: ['KAE4YqrX2e3GAPGw'],
    searchType: 'EXACT__SEARCH',
  },
  {
    bobjectFieldId: '5wRCb3bB5mHSNKUK',
    values: ['2'],
    searchType: 'RANGE__SEARCH__GT',
  },
  {
    bobjectFieldId: 'E7qmRffpJskoiyd6',
    values: ['this_week'],
    searchType: 'RANGE__SEARCH__BETWEEN__DATES',
  },
];

test('given some filters from subhomes parse it for a request ', () => {
  const result = filtersToRequest({ filters, bobjectFields });
  expect(result).toEqual(expectedResult);
});

test('given some modes of edit, create, delete, calcule name of modal', () => {
  const resultCreate = getModalTitle({ isCreation: true });
  expect(resultCreate).toEqual('Save as new quick filter');
  const resultEdit = getModalTitle({ isEdit: true });
  expect(resultEdit).toEqual('Update quick filter');
  const resultEditName = getModalTitle({ isEditName: true });
  expect(resultEditName).toEqual('Edit quick filter name');
});

describe('Quick filters query parsing', () => {
  it('given a quick filter with a range lt search it generates the proper query', () => {
    const dirtyFilter = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          end: '2',
        },
        type: 'RANGE__SEARCH__LT',
        isParsed: true,
      },
    };
    const expectedResult = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          lt: '2',
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
    expect(parseQuickFilterKeys(dirtyFilter)).toEqual(expectedResult);
  });
  it('given a quick filter with a range gt search it generates the proper query', () => {
    const dirtyFilter = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          start: '2',
        },
        type: 'RANGE__SEARCH__GT',
        isParsed: true,
      },
    };
    const expectedResult = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          gt: '2',
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
    expect(parseQuickFilterKeys(dirtyFilter)).toEqual(expectedResult);
  });
  it('given a quick filter with a range lte search it generates the proper query', () => {
    const dirtyFilter = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          end: '2',
        },
        type: 'RANGE__SEARCH__LTE',
        isParsed: true,
      },
    };
    const expectedResult = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          lte: '2',
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
    expect(parseQuickFilterKeys(dirtyFilter)).toEqual(expectedResult);
  });
  it('given a quick filter with a range gte search it generates the proper query', () => {
    const dirtyFilter = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          start: '2',
        },
        type: 'RANGE__SEARCH__GTE',
        isParsed: true,
      },
    };
    const expectedResult = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          gte: '2',
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
    expect(parseQuickFilterKeys(dirtyFilter)).toEqual(expectedResult);
  });
  it('given a quick filter with a range between it generates the proper query', () => {
    const dirtyFilter = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          start: '2',
          end: '3',
        },
        type: 'RANGE__SEARCH__BETWEEN',
        isParsed: true,
      },
    };
    const expectedResult = {
      _Task_qUBDRt0H1cfAMxjW: {
        query: {
          gte: '2',
          lte: '3',
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
    expect(parseQuickFilterKeys(dirtyFilter)).toEqual(expectedResult);
  });
});
