import { getFilters } from './saveEditModal.utils';

describe('getFilters', () => {
  it('get filters parse filters as expected for all situations', () => {
    const a = {
      Vlzxpl7iAVRphHlT: [
        {
          value: ['YGD3RY0FFEl4CxHh', 'zytJ7yinEu9iEP24'],
          type: 'EXACT__SEARCH',
        },
      ],
      qtbfQmwpZIyZkqUY: [
        {
          value: 'mah9cNYYd4q8i0zz',
          type: 'NOT__SEARCH',
        },
      ],
      RtJ8bNUrGzQiuQw1: [
        {
          value: ['testt'],
          type: 'EXACT__SEARCH',
        },
      ],
      VkGKnSy3dqmMt57D: [
        {
          value: '__MATCH_FULL_ROWS__',
          type: '__MATCH_FULL_ROWS__',
        },
      ],
      cLS3PjJuwYBcnmE2: [
        {
          value: 'last_month',
          type: 'RANGE__SEARCH__BETWEEN__DATES',
        },
      ],
      UlERFdPpzy9TIdbP: [
        {
          value: 'last_month',
          type: 'RANGE__SEARCH__BETWEEN__DATES',
        },
      ],
      UlARFdPpzy9TIdbP: [
        {
          value: '2022-04-10T18:25:42.606Z,2022-05-10T18:25:42.606Z',
          type: 'RANGE__SEARCH__BETWEEN__DATES',
        },
      ],
    };

    const result = getFilters(a);
    const expected = [
      {
        bobjectFieldId: 'Vlzxpl7iAVRphHlT',
        values: ['YGD3RY0FFEl4CxHh', 'zytJ7yinEu9iEP24'],
        searchType: 'EXACT__SEARCH',
      },
      {
        bobjectFieldId: 'qtbfQmwpZIyZkqUY',
        values: ['mah9cNYYd4q8i0zz'],
        searchType: 'NOT__SEARCH',
      },
      {
        bobjectFieldId: 'RtJ8bNUrGzQiuQw1',
        values: ['testt'],
        searchType: 'EXACT__SEARCH',
      },
      {
        bobjectFieldId: 'VkGKnSy3dqmMt57D',
        values: ['__MATCH_FULL_ROWS__'],
        searchType: '__MATCH_FULL_ROWS__',
      },
      {
        bobjectFieldId: 'cLS3PjJuwYBcnmE2',
        values: ['last_month'],
        searchType: 'RANGE__SEARCH__BETWEEN__DATES',
      },
      {
        bobjectFieldId: 'UlERFdPpzy9TIdbP',
        values: ['last_month'],
        searchType: 'RANGE__SEARCH__BETWEEN__DATES',
      },
      {
        bobjectFieldId: 'UlARFdPpzy9TIdbP',
        values: ['2022-04-10T18:25:42.606Z', '2022-05-10T18:25:42.606Z'],
        searchType: 'RANGE__SEARCH__BETWEEN__DATES',
      },
    ];

    expect(result).toEqual(expected);
  });
});
