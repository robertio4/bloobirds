import { changeLogicRolesToIds, getQueryValue } from './bobjectTable.utils';

const fields = [
  {
    id: 'vAF4YBjLDECWsRpU',
    creationDatetime: '2019-04-23T20:44:46',
    updateDatetime: '2020-06-10T00:23:39.029907',
    createdBy: null,
    updatedBy: null,
    name: 'Type',
    reportingName: 'Type',
    upstreamMirror: false,
    description: '',
    typeField: true,
    inboundField: false,
    enabled: true,
    segmentation: false,
    duplicateValidation: false,
    prioritisation: false,
    characterisation: false,
    qualifyingQuestion: false,
    required: true,
    managedBySystem: true,
    ordering: 0,
    defaultValue: '',
    searchType: null,
    layoutFormPicklistType: 'DROPDOWN',
    layoutIcon: 'BriefcasePrimary',
    layoutReadOnly: false,
    layoutFormColumns: '95%',
    layoutFormWidth: '100%',
    layoutMultiline: false,
    layoutMultilineLines: 1,
    layoutMultilineMaxLines: 3,
    tableLayoutDefault: true,
    layoutDateFormatAbsolute: null,
    layoutDateFormatType: null,
    layoutNumberFormat: null,
    layoutNumberPrefix: null,
    layoutNumberSuffix: null,
    logicRole: 'ACTIVITY__TYPE',
    requiredColumnInList: false,
    listsOrdering: 100,
    templateVariable: false,
    account: 'ITLCIOpIV8bs0STg',
    bobjectFieldGroup: 'xFh4LbzmUbkii9GV',
    bobjectGlobalPicklist: null,
    bobjectType: 'CWQ0JUQnaH6xVPXB',
    defaultBobjectPicklistFieldValue: null,
    fieldType: '8ad73c4db01b0886',
    parentBobjectField: null,
    referencedBobjectType: null,
  },
  {
    id: 'gq8Xiv3BERlraWFp',
    creationDatetime: '2019-04-23T20:44:46',
    updateDatetime: '2020-06-10T00:23:39.029907',
    createdBy: null,
    updatedBy: 'Marc Gassó',
    name: 'Call Result',
    reportingName: 'Call Result',
    upstreamMirror: false,
    description: '',
    typeField: false,
    inboundField: false,
    enabled: true,
    segmentation: false,
    duplicateValidation: false,
    prioritisation: false,
    characterisation: false,
    qualifyingQuestion: false,
    required: true,
    managedBySystem: true,
    ordering: 400,
    defaultValue: '',
    searchType: null,
    layoutFormPicklistType: 'DROPDOWN',
    layoutIcon: 'BriefcasePrimary',
    layoutReadOnly: false,
    layoutFormColumns: '90%',
    layoutFormWidth: '50%',
    layoutMultiline: false,
    layoutMultilineLines: 1,
    layoutMultilineMaxLines: 3,
    tableLayoutDefault: false,
    layoutDateFormatAbsolute: null,
    layoutDateFormatType: null,
    layoutNumberFormat: null,
    layoutNumberPrefix: null,
    layoutNumberSuffix: null,
    logicRole: 'ACTIVITY__CALL_RESULT',
    requiredColumnInList: false,
    listsOrdering: 0,
    templateVariable: false,
    account: 'ITLCIOpIV8bs0STg',
    bobjectFieldGroup: 'mrmF2p7fEqKlwykJ',
    bobjectGlobalPicklist: null,
    bobjectType: 'CWQ0JUQnaH6xVPXB',
    defaultBobjectPicklistFieldValue: null,
    fieldType: '8ad73c4db01b0886',
    parentBobjectField: null,
    referencedBobjectType: null,
  },
];

const values = [
  {
    id: 'wyHmAPTrzrE5okze',
    creationDatetime: '2019-04-23T20:44:46',
    updateDatetime: '2020-03-21T00:58:31.252878',
    createdBy: null,
    updatedBy: null,
    value: 'Call',
    description: '',
    logicRole: 'ACTIVITY__TYPE__CALL',
    score: 0,
    enabled: true,
    ordering: 0,
    textColor: '#FFFFFF',
    backgroundColor: '#63BA00',
    outlineColor: '#63BA00',
    account: 'ITLCIOpIV8bs0STg',
    bobjectField: 'vAF4YBjLDECWsRpU',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: '9k7yscFP1kveuyf3',
    creationDatetime: '2019-04-23T20:44:46',
    updateDatetime: '2020-03-21T00:58:31.252878',
    createdBy: null,
    updatedBy: null,
    value: 'Email',
    description: '',
    logicRole: 'ACTIVITY__TYPE__EMAIL',
    score: 0,
    enabled: true,
    ordering: 100,
    textColor: '#FFFFFF',
    backgroundColor: '#FF8433',
    outlineColor: '#FF8433',
    account: 'ITLCIOpIV8bs0STg',
    bobjectField: 'vAF4YBjLDECWsRpU',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'W6oyUfzEjC2IfJup',
    creationDatetime: '2019-04-23T20:44:46',
    updateDatetime: '2019-05-18T14:59:23',
    createdBy: null,
    updatedBy: null,
    value: 'Correct Contact',
    description: '',
    logicRole: 'ACTIVITY__CALL_RESULT__CORRECT_CONTACT',
    score: 1,
    enabled: true,
    ordering: 0,
    textColor: '#94a5b4',
    backgroundColor: null,
    outlineColor: '#c5d1dd',
    account: 'ITLCIOpIV8bs0STg',
    bobjectField: 'gq8Xiv3BERlraWFp',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
];

const bobjectFields = {
  findBy: field => value => {
    let val = undefined;
    fields.forEach(entity => {
      if (entity && entity[field] === value) {
        val = entity;
      }
    });
    return val;
  },
};

const bobjectPicklistFieldValues = {
  findBy: field => value => {
    let val = undefined;
    values.forEach(entity => {
      if (entity && entity[field] === value) {
        val = entity;
      }
    });
    return val;
  },
};

const query = {
  ACTIVITY__TYPE: ['ACTIVITY__TYPE__CALL', 'ACTIVITY__TYPE__EMAIL'],
  ACTIVITY__CALL_RESULT: ['ACTIVITY__CALL_RESULT__CORRECT_CONTACT'],
};

test("given a query with field: [values] as logic roles, it translates their logic roles into id's", () => {
  expect(changeLogicRolesToIds({ bobjectFields, bobjectPicklistFieldValues, query })).toStrictEqual(
    {
      vAF4YBjLDECWsRpU: ['wyHmAPTrzrE5okze', '9k7yscFP1kveuyf3'],
      gq8Xiv3BERlraWFp: ['W6oyUfzEjC2IfJup'],
    },
  );
});

const newQuery = {
  XVjjuJj6L31ShojO: [
    {
      type: 'EXACT__SEARCH',
      value: ['HRUfOy7dtzEw3SUp'],
    },
  ],
  Nki4IAGkh1R5UaU9: [
    {
      type: 'NOT__SEARCH',
      value: 'OX7miEmn19MjQfzH',
    },
  ],
  IeQ5lmDLwrdTreIU: [
    {
      type: '__MATCH_FULL_ROWS__',
      value: '',
    },
  ],
  '1htTFC6K9C94XuSW': [
    {
      type: 'RANGE__SEARCH__BETWEEN__DATES',
      value: {
        type: 'this_month',
        start: '2021-10-31T23:00:00.000Z',
        end: '2021-11-30T22:59:59.999Z',
      },
    },
  ],
  UlERFdPpzy9TIdbP: [
    {
      type: 'RANGE__SEARCH__BETWEEN__DATES',
      value: {
        type: 'custom',
        start: '2021-11-15T23:00:00.000Z',
        end: '2021-11-20T22:59:59.999Z',
      },
    },
  ],
};

describe('getQueryValue', () => {
  it('get query parse filters for picklist field', () => {
    const result = getQueryValue({ newQuery, fieldReference: 'XVjjuJj6L31ShojO' });
    const expected = {
      query: ['HRUfOy7dtzEw3SUp'],
      searchMode: 'EXACT__SEARCH',
    };

    expect(result).toEqual(expected);
  });
  it('get query parse filters for picklist field not search', () => {
    const result = getQueryValue({ newQuery, fieldReference: 'Nki4IAGkh1R5UaU9' });
    const expected = {
      query: 'OX7miEmn19MjQfzH',
      searchMode: 'NOT__SEARCH',
    };

    expect(result).toEqual(expected);
  });
  it('get query parse filters for not empty filter', () => {
    const result = getQueryValue({ newQuery, fieldReference: 'IeQ5lmDLwrdTreIU' });
    const expected = {
      query: '__MATCH_FULL_ROWS__',
      searchMode: null,
    };

    expect(result).toEqual(expected);
  });
  it('get query parse filters for date filter', () => {
    const result = getQueryValue({ newQuery, fieldReference: '1htTFC6K9C94XuSW' });
    const expected = {
      query: {
        gte: '2021-10-31T23:00:00.000Z',
        lte: '2021-11-30T22:59:59.999Z',
      },
      searchMode: 'RANGE__SEARCH',
      searchType: 'RANGE__SEARCH__BETWEEN__DATES',
      type: 'custom',
    };

    expect(result).toEqual(expected);
  });
  it('get query parse filters for date reference filter', () => {
    const result = getQueryValue({ newQuery, fieldReference: 'UlERFdPpzy9TIdbP' });
    const expected = {
      query: {
        gte: '2021-11-15T23:00:00.000Z',
        lte: '2021-11-20T22:59:59.999Z',
      },
      searchMode: 'RANGE__SEARCH',
      searchType: 'RANGE__SEARCH__BETWEEN__DATES',
      type: 'custom',
    };

    expect(result).toEqual(expected);
  });
});
