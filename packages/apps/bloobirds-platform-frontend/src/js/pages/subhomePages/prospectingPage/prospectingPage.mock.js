import { TASK_ACTION } from '@bloobirds-it/types';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';

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
  {
    id: 'fCX8CNDh7e6bd39W',
    logicRole: 'LEAD__ICP',
  },
  {
    id: 'FIIMuuFOJ9YS6WJT',
    logicRole: 'TASK__IS_ACTION_CALL',
  },
  {
    id: 'TUDI8pdZ7ILvPb9Q',
    logicRole: 'TASK__IS_ACTION_EMAIL',
  },
  {
    id: 'iacmNPJ2h9ShP4ok',
    logicRole: 'COMPANY__NAME',
    bobjectType: 'CydrnqmmGQavCAAA',
  },
  {
    id: 'qioUuIlFMTe9DELV',
    logicRole: 'COMPANY__COUNTRY',
    bobjectType: 'CydrnqmmGQavCAAA',
  },
  {
    id: 'R05GSAHghoIHt97i',
    logicRole: 'COMPANY__STATUS__CHANGED_DATE_DELIVERED',
    bobjectType: 'CydrnqmmGQavCAAA',
  },
];

export const bobjectFieldsMock = {
  findByLogicRole: value => {
    let val = undefined;
    fields.forEach(entity => {
      if (entity && entity.logicRole === value) {
        val = entity;
      }
    });
    return val;
  },
  get: value => {
    let val = undefined;
    fields.forEach(entity => {
      if (entity && entity.id === value) {
        val = entity;
      }
    });
    return val;
  },
};

export const picklistValuesMock = [
  {
    id: 'XBHzvmQVkNDUp150',
    logicRole: 'TASK__IS_ACTION_CALL__YES',
  },
  {
    id: 'aailtOTmS0BDSPaF',
    logicRole: 'TASK__IS_ACTION_EMAIL__YES',
  },
  {
    id: 'CydrnqmmGQavCSEt',
    logicRole: 'TASK__IS_ACTION_LINKEDIN_MESSAGE__YES',
  },
];

export const bobjectPicklistFieldValuesMock = {
  findByLogicRole: value => {
    let val = undefined;
    picklistValuesMock.forEach(entity => {
      if (entity && entity.logicRole === value) {
        val = entity;
      }
    });
    return val;
  },
  get: value => {
    let val = undefined;
    picklistValuesMock.forEach(entity => {
      if (entity && entity.id === value) {
        val = entity;
      }
    });
    return val;
  },
};

export const types = [
  {
    name: 'Company',
    id: 'CydrnqmmGQavCAAA',
  },
  {
    name: 'Lead',
    id: 'CydrnqmmGQavCAAB',
  },
  {
    name: 'Task',
    id: 'CydrnqmmGQavCAAC',
  },
  {
    name: 'Opportunity',
    id: 'CydrnqmmGQavCAAD',
  },
];

export const bobjectTypesMock = {
  findBy: name => value => {
    let val = undefined;
    types.forEach(entity => {
      if (entity && entity[name] === value) {
        val = entity;
      }
    });
    return val;
  },
  get: value => {
    let val = undefined;
    types.forEach(entity => {
      if (entity && entity.id === value) {
        val = entity;
      }
    });
    return val;
  },
};

export const filtersToApplyMock = [
  {
    bobjectFieldId: 'Ee9vfOrp1upv5eS1',
    values: [
      {
        bobjectPicklistValue: 'Spg2nsBZo7f6GiV8',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },
  {
    bobjectFieldId: 'SxslZr93E6w41Rs2',
    values: [
      {
        bobjectPicklistValue: 'ru3XI6NqbD9fMaiv',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },
  {
    bobjectFieldId: 'CydrnqmmGQavCSEt',
    values: [
      {
        bobjectPicklistValue: 'KAE4YqrX2e3GAPGw',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },
  {
    bobjectFieldId: '5wRCb3bB5mHSNKUK',
    values: [
      {
        bobjectPicklistValue: '1',
        textValue: '2',
        searchType: 'RANGE__SEARCH__GT',
      },
    ],
  },
  {
    bobjectFieldId: 'fCX8CNDh7e6bd39W',
    values: [
      {
        bobjectPicklistValue: 'hobCTjWQyYHqQaVC',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },
  {
    bobjectFieldId: 'FIIMuuFOJ9YS6WJT',
    values: [
      {
        bobjectPicklistValue: 'XBHzvmQVkNDUp150',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },
  {
    bobjectFieldId: 'TUDI8pdZ7ILvPb9Q',
    values: [
      {
        bobjectPicklistValue: 'aailtOTmS0BDSPaF',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },

  {
    bobjectFieldId: 'iacmNPJ2h9ShP4ok',
    values: [
      {
        bobjectPicklistValue: 'The cure',
        textValue: 'The cure',
        searchType: 'AUTOCOMPLETE__SEARCH',
      },
    ],
  },
  {
    bobjectFieldId: 'qioUuIlFMTe9DELV',
    values: [
      {
        bobjectPicklistValue: 'Ky2TqulJ0z5eXt4c',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },
];

export const expectedResultMock = {
  targetMarket: ['Spg2nsBZo7f6GiV8'],
  source: ['ru3XI6NqbD9fMaiv'],
  mrRating: ['KAE4YqrX2e3GAPGw'],
  numberLeads: {
    value: '2',
    type: 'RANGE__SEARCH__GT',
  },
  buyerPersonas: ['hobCTjWQyYHqQaVC'],
  type: ['CALL', 'EMAIL'],
};

export const expectedResultMoreMock = {
  COMPANY__NAME: {
    query: 'The cure',
    searchMode: 'AUTOCOMPLETE__SEARCH',
    isParsed: true,
  },
  COMPANY__COUNTRY: {
    query: ['Ky2TqulJ0z5eXt4c'],
    searchMode: 'EXACT__SEARCH',
    isParsed: true,
  },
};

export const subhomeFiltersMock = [
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
  COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS,
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
];
