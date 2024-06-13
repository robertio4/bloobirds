import { TASK_ACTION, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';

const fields = [
  {
    id: 'Ee9vfOrp1upv5eS1',
    logicRole: 'TASK__ASSIGNED_TO',
  },
  {
    id: 'SxslZr93E6w41Rs2',
    logicRole: 'TASK__TASK_TYPE',
  },
  {
    id: 'CydrnqmmGQavCSEt',
    logicRole: 'OPPORTUNITY__ASSIGNED_TO',
  },
  {
    id: 'zF6IP4klFWppbCrl',
    logicRole: 'OPPORTUNITY__STATUS',
  },
  {
    id: 'WbjIAA5vwh1LQqWt',
    logicRole: 'OPPORTUNITY__AMOUNT',
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
    id: 'CP7I2j4ARgJ0znqU',
    logicRole: 'TASK__TITLE',
    bobjectType: 'CydrnqmmGQavCAAC',
  },
  {
    id: 'c3dCisihnHs0anwb',
    logicRole: 'TASK__DATA_SOURCE',
    bobjectType: 'CydrnqmmGQavCAAC',
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

const picklistValues = [
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
    picklistValues.forEach(entity => {
      if (entity && entity.logicRole === value) {
        val = entity;
      }
    });
    return val;
  },
  get: value => {
    let val = undefined;
    picklistValues.forEach(entity => {
      if (entity && entity.id === value) {
        val = entity;
      }
    });
    return val;
  },
};

const types = [
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
    bobjectFieldId: 'WbjIAA5vwh1LQqWt',
    values: [
      {
        bobjectPicklistValue: '1',
        textValue: '1',
        searchType: 'RANGE__SEARCH__GT',
      },
    ],
  },
  {
    bobjectFieldId: 'zF6IP4klFWppbCrl',
    values: [
      {
        bobjectPicklistValue: 'KYoVHXiuhztBSPoa',
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
    bobjectFieldId: 'c3dCisihnHs0anwb',
    values: [
      {
        bobjectPicklistValue: 'aff16f9043855c0f',
        textValue: '',
        searchType: 'EXACT__SEARCH',
      },
    ],
  },
  {
    bobjectFieldId: 'CP7I2j4ARgJ0znqU',
    values: [
      {
        bobjectPicklistValue: 'attempt',
        textValue: 'attempt',
        searchType: 'AUTOCOMPLETE__SEARCH',
      },
    ],
  },
];

export const expectedResultMock = {
  amount: {
    value: '1',
    type: 'RANGE__SEARCH__GT',
  },
  stage: ['KYoVHXiuhztBSPoa'],
  type: ['CALL', 'EMAIL'],
};

export const expectedResultMoreMock = {
  TASK__DATA_SOURCE: {
    query: ['aff16f9043855c0f'],
    searchMode: 'EXACT__SEARCH',
    isParsed: true,
  },
  TASK__TITLE: {
    query: 'attempt',
    searchMode: 'AUTOCOMPLETE__SEARCH',
    isParsed: true,
  },
};

export const subhomeFiltersMock = [
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
];
