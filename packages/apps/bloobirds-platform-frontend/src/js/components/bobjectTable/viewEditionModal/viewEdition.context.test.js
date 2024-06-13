import keyBy from 'lodash/keyBy';

import React from 'react';
import { getTextFilterValues } from './viewEdition.context';

const fTypes = [
  {
    id: '1615ff06e940e17e',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'DOUBLE',
    name: 'Decimal',
  },
  {
    id: '38e941159889a150',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'REFERENCE',
    name: 'Reference',
  },
  {
    id: '3f410c158ba5f6ed',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'DATE',
    name: 'Date',
  },
  {
    id: '4a18599c32f67846',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'URL',
    name: 'URL',
  },
  {
    id: '729e9be738deee98',
    creationDatetime: '2019-03-13T09:17:56',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'GLOBAL_PICKLIST',
    name: 'Global Picklist',
  },
  {
    id: '8ad73c4db01b0886',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'PICKLIST',
    name: 'Picklist',
  },
  {
    id: '9d55d19aba424f09',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'DATETIME',
    name: 'DateTime',
  },
  {
    id: 'b1322a0c5b9a2b57',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'PHONE',
    name: 'Phone',
  },
  {
    id: 'bc57748b432569e6',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'EMAIL',
    name: 'Email',
  },
  {
    id: 'd8b3c4c40d7b8f13',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'NUMBER',
    name: 'Number',
  },
  {
    id: 'd9ab78650c2d0531',
    creationDatetime: '2019-01-21T09:24:31',
    updateDatetime: '2019-05-18T14:59:30',
    createdBy: null,
    updatedBy: null,
    enumName: 'TEXT',
    name: 'Text',
  },
  {
    id: '8249fc47bdcb3c35',
    creationDatetime: '2021-10-02T06:59:10.047993',
    updateDatetime: '2021-10-02T06:59:10.047993',
    createdBy: null,
    updatedBy: null,
    enumName: 'REFERENCE_ENTITY',
    name: 'Reference entity',
  },
];

const picklists = [
  {
    id: 'MkAALanxL11fU73D',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2021-07-15T09:49:01.178366',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Ready to prospect',
    description: '',
    logicRole: 'COMPANY__STATUS__READY_TO_PROSPECT',
    score: 0,
    enabled: true,
    ordering: 400,
    textColor: '#464F57',
    backgroundColor: '#DEECF7',
    outlineColor: '#DEECF7',
    deprecated: true,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: '9R8lgeniiIoGNuyj',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2021-07-15T09:49:01.178366',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Finding leads',
    description: '',
    logicRole: 'COMPANY__STATUS__FINDING_LEADS',
    score: 0,
    enabled: true,
    ordering: 300,
    textColor: '#464F57',
    backgroundColor: '#FFE8B3',
    outlineColor: '#FFE8B3',
    deprecated: true,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'zytJ7yinEu9iEP24',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Delivered',
    description: '',
    logicRole: 'COMPANY__STATUS__DELIVERED',
    score: 2,
    enabled: true,
    ordering: 200,
    textColor: '#464F57',
    backgroundColor: '#FFD1B3',
    outlineColor: '#FFD1B3',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'YGD3RY0FFEl4CxHh',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Backlog',
    description: '',
    logicRole: 'COMPANY__STATUS__BACKLOG',
    score: 1,
    enabled: true,
    ordering: 100,
    textColor: '#464F57',
    backgroundColor: '#C5D1DD',
    outlineColor: '#C5D1DD',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: '1OSoVCXbC3K9a9Cv',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Client',
    description: '',
    logicRole: 'COMPANY__STATUS__CLIENT',
    score: 0,
    enabled: true,
    ordering: 950,
    textColor: '#ffffff',
    backgroundColor: '#464F57',
    outlineColor: '#464F57',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'P6kq1XzpxvLMO06I',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'New',
    description: '',
    logicRole: 'COMPANY__STATUS__NEW',
    score: 0,
    enabled: true,
    ordering: 0,
    textColor: '#464f57',
    backgroundColor: '#E5EBEF',
    outlineColor: '#E5EBEF',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'H1uYxYBKsCFkGwYm',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Contacted',
    description: '',
    logicRole: 'COMPANY__STATUS__CONTACTED',
    score: 0,
    enabled: true,
    ordering: 600,
    textColor: '#464F57',
    backgroundColor: '#D9F0C0',
    outlineColor: '#D9F0C0',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'WUsRRp1pNKsTddnu',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Nurturing',
    description: '',
    logicRole: 'COMPANY__STATUS__NURTURING',
    score: 0,
    enabled: true,
    ordering: 1000,
    textColor: '#484848',
    backgroundColor: '#B8B8B8',
    outlineColor: '#B8B8B8',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'FfKRDX4OFEQTPO55',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Discarded',
    description: '',
    logicRole: 'COMPANY__STATUS__DISCARDED',
    score: 0,
    enabled: true,
    ordering: 1100,
    textColor: '#484848',
    backgroundColor: '#DEDEDE',
    outlineColor: '#DEDEDE',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'zh58qouwzNXnvEuN',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'On Prospection',
    description: '',
    logicRole: 'COMPANY__STATUS__ON_PROSPECTION',
    score: 0,
    enabled: true,
    ordering: 500,
    textColor: '#464F57',
    backgroundColor: '#BCFEE3',
    outlineColor: '#BCFEE3',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: '5fUq6lPMKo99E7wh',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Engaged',
    description: '',
    logicRole: 'COMPANY__STATUS__ENGAGED',
    score: 0,
    enabled: true,
    ordering: 700,
    textColor: '#FFFFFF',
    backgroundColor: '#63BA00',
    outlineColor: '#63BA00',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'Hoy21UTZ1TYNfq4w',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2020-11-04T08:31:12.926274',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Meeting',
    description: '',
    logicRole: 'COMPANY__STATUS__MEETING',
    score: 0,
    enabled: true,
    ordering: 800,
    textColor: '#464F57',
    backgroundColor: '#FFB3C2',
    outlineColor: '#FFB3C2',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
  {
    id: 'lRZuH0FHnSgdc9B5',
    creationDatetime: '2020-11-04T08:31:12.926274',
    updateDatetime: '2021-04-30T10:18:25.935298',
    createdBy: 'Alfonso Trocoli',
    updatedBy: 'Alfonso Trocoli',
    value: 'Account',
    description: '',
    logicRole: 'COMPANY__STATUS__ACCOUNT',
    score: 0,
    enabled: true,
    ordering: 900,
    textColor: '#FFFFFF',
    backgroundColor: '#464F57',
    outlineColor: '#464F57',
    deprecated: false,
    account: 'E493solY8aDLTGyA',
    bobjectField: 'Vlzxpl7iAVRphHlT',
    bobjectGlobalPicklist: null,
    parentBobjectPicklistFieldValue: null,
  },
];

const fieldTypes = {
  get: id => {
    const parseToKeys = keyBy(fTypes, 'id');
    return parseToKeys[id];
  },
};

const bobjectPicklistFieldValues = {
  get: id => {
    const parseToKeys = keyBy(picklists, 'id');
    return parseToKeys[id];
  },
  all: () => {
    return keyBy(picklists, 'id');
  },
};

const statusField = {
  id: 'Vlzxpl7iAVRphHlT',
  name: 'Status',
  bobjectType: 'XTMM9DtuufDBKb0n',
  fieldType: '8ad73c4db01b0886',
};

const numberField = {
  id: 'ILIi8NiZ09tfRFHE',
  name: 'Nº of leads',
  bobjectType: 'XTMM9DtuufDBKb0n',
  fieldType: 'd8b3c4c40d7b8f13',
};

describe('renderCategoriesStepFiltersList', () => {
  it('get query parse filters for picklist field', () => {
    const values = {
      type: 'EXACT__SEARCH',
      value: ['YGD3RY0FFEl4CxHh'],
    };
    const values2 = {
      type: 'EXACT__SEARCH',
      value: ['YGD3RY0FFEl4CxHh', 'Hoy21UTZ1TYNfq4w'],
    };

    const result = getTextFilterValues({
      values,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: statusField,
      fieldTypes,
    });
    const result2 = getTextFilterValues({
      values: values2,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: statusField,
      fieldTypes,
    });

    const expected2 = 'Is any of  Backlog, Meeting';
    const expected = 'Is any of  Backlog';

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected2);
  });

  it('get query parse filters for its empty option', () => {
    // We test it as an array because is how it is used when entering back to the filters
    const values = [
      {
        type: '__MATCH_FULL_ROWS__',
        value: '',
      },
    ];
    const values2 = {
      type: '__MATCH_EMPTY_ROWS__',
      value: '',
    };

    const result = getTextFilterValues({
      values,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: statusField,
      fieldTypes,
    });
    const result2 = getTextFilterValues({
      values: values2,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: statusField,
      fieldTypes,
    });

    const expected = "It's not empty ";
    const expected2 = "It's empty ";

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected2);
  });

  it('get query parse filters for number option', () => {
    const values = {
      type: 'RANGE__SEARCH__GTE',
      value: '3',
    };
    const values2 = {
      type: 'RANGE__SEARCH__LTE',
      value: '3',
    };
    // We test it as an array because is how it is used when entering back to the filters
    const values3 = [
      {
        type: 'RANGE__SEARCH__GT',
        value: '3',
      },
    ];

    const result = getTextFilterValues({
      values,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: numberField,
      fieldTypes,
    });
    const result2 = getTextFilterValues({
      values: values2,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: numberField,
      fieldTypes,
    });
    const result3 = getTextFilterValues({
      values: values3,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: numberField,
      fieldTypes,
    });

    const expected = 'Is greater or equal than 3';
    const expected2 = 'Is less or equal than 3';
    const expected3 = 'Is greater than 3';

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected2);
    expect(result3).toEqual(expected3);
  });

  it('get query parse filters for date option', () => {
    const values = {
      type: 'RANGE__SEARCH__BETWEEN__DATES',
      value: {
        type: 'custom',
        start: '2021-11-14T17:00:00.000Z',
        end: '2021-11-20T22:59:59.999Z',
      },
    };
    const values2 = {
      type: 'RANGE__SEARCH__BETWEEN__DATES',
      value: {
        type: 'this_week',
        start: '2021-11-06T23:00:00.000Z',
        end: '2021-11-13T22:59:59.999Z',
      },
    };

    const result = getTextFilterValues({
      values,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: numberField,
      fieldTypes,
    });
    const result2 = getTextFilterValues({
      values: values2,
      picklistFieldValues: bobjectPicklistFieldValues,
      field: numberField,
      fieldTypes,
    });

    const expected = 'Between November 14th, 2021 and November 20th, 2021';
    const expected2 = 'This week';

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected2);
  });
});
