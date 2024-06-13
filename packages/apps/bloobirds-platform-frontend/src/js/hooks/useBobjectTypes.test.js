import { useBobjectTypes, EXCLUDE_BOBJECT_TYPES, BOBJECT_TYPES } from './useBobjectTypes';
import { renderHook } from '@testing-library/react-hooks';
import * as useUserSettings from '../components/userPermissions/hooks';
import * as useFeatureFlags from './useFeatureFlags';
import * as useEntity from './entities/useEntity';
import keyBy from 'lodash/keyBy';

const userSettings = {
  user: {
    email: 'patricia@bloobirds.com',
    name: 'Patricia',
    id: 'jGXoGW77ibB2t50E',
    shortname: 'PA',
    color: '#484848',
    timeZone: 'Europe/Madrid',
    dialerDefaultView: 'webDialer',
    dialerType: 'BLOOBIRDS_DIALER',
    enableLogCall: true,
    active: true,
    remindersEnabled: false,
    remindersSoundEnabled: false,
    assignLinkedinLeads: true,
    remindersBeforeMinutes: 0,
    employeeRole: 'Account Executive',
    permissions: [
      'VIEW_ADD_QC_TAB',
      'VIEW_OUTBOX_TAB',
      'VIEW_CADENCES',
      'VIEW_INBOUND_TAB',
      'DOWNLOAD_LIST',
      'VIEW_SALES_TAB',
      'VIEW_PROSPECT_TAB',
      'VIEW_DASHBOARDS_TAB',
      'VIEW_INBOX',
    ],
    type: 'LICENSE_USER',
    lastPasswordChangeDate: null,
    incomingCallsForwarding: false,
  },
};

const activityBobjectType = {
  id: 'awQZK2maSA8QTT6U',
  creationDatetime: '2021-03-25T09:48:36.33821',
  updateDatetime: '2021-03-25T09:48:36.33821',
  createdBy: 'Mario',
  updatedBy: 'Mario',
  name: 'Activity',
  account: '7VA3TbSzLkrOE3Ud',
  bobjectTypeModel: '0e0e201e04d95e2b',
};

const bobjectTypes = [
  activityBobjectType,
  {
    id: 'eNRm2oPI3VjTko5e',
    creationDatetime: '2021-03-25T09:48:36.33821',
    updateDatetime: '2021-03-25T09:48:36.33821',
    createdBy: 'Mario',
    updatedBy: 'Mario',
    name: 'Lead',
    account: '7VA3TbSzLkrOE3Ud',
    bobjectTypeModel: '35f96d5209e6f413',
  },
  {
    id: 'QNhRcSuzSCmkcRLM',
    creationDatetime: '2021-03-25T09:48:36.33821',
    updateDatetime: '2021-03-25T09:48:36.33821',
    createdBy: 'Mario',
    updatedBy: 'Mario',
    name: 'Company',
    account: '7VA3TbSzLkrOE3Ud',
    bobjectTypeModel: '7c7a47e5ad019fb1',
  },
  {
    id: 'uvyjz6tHU9xfkne3',
    creationDatetime: '2021-03-25T09:48:36.33821',
    updateDatetime: '2021-03-25T09:48:36.33821',
    createdBy: 'Mario',
    updatedBy: 'Mario',
    name: 'Task',
    account: '7VA3TbSzLkrOE3Ud',
    bobjectTypeModel: 'd113dc9261e864da',
  },
  {
    id: 'wmAwEmHrso7FwrKn',
    creationDatetime: '2021-03-25T09:48:36.33821',
    updateDatetime: '2021-03-25T09:48:36.33821',
    createdBy: 'Mario',
    updatedBy: 'Mario',
    name: 'Opportunity',
    account: '7VA3TbSzLkrOE3Ud',
    bobjectTypeModel: 'b5a2b9e15a067469',
  },
  {
    id: 'wmAwEmHrso7FwrKj',
    creationDatetime: '2021-03-25T09:48:36.33821',
    updateDatetime: '2021-03-25T09:48:36.33821',
    createdBy: 'Mario',
    updatedBy: 'Mario',
    name: 'Products',
    account: '7VA3TbSzLkrOE3Ud',
    bobjectTypeModel: 'b5a2b9e15a067470',
  },
  {
    id: 'wmAwEmHrso7FwrKf',
    creationDatetime: '2021-03-25T09:48:36.33821',
    updateDatetime: '2021-03-25T09:48:36.33821',
    createdBy: 'Mario',
    updatedBy: 'Mario',
    name: 'OpportunityProduct',
    account: '7VA3TbSzLkrOE3Ud',
    bobjectTypeModel: 'b5a2b9e15a067471',
  },
];

jest.spyOn(useUserSettings, 'useUserSettings').mockReturnValue(userSettings);
jest.spyOn(useEntity, 'useEntity').mockReturnValue({
  all: () => bobjectTypes,
  filterBy: (field, value) => bobjectTypes.filter(bobjectType => bobjectType[field] === value),
  find: filterFn => bobjectTypes.find(filterFn),
  findBy: field => value => bobjectTypes.find(bobjectType => bobjectType[field] === value),
  get: id => {
    const entities = keyBy(bobjectTypes, 'id');
    return entities[id];
  },
  ids: () => {
    const entities = keyBy(bobjectTypes, 'id');
    return Object.keys(entities);
  },
});

describe('useBobjectTypes', () => {
  it('List bobject types with the FF enabled', () => {
    jest.spyOn(useFeatureFlags, 'useProductsEnabled').mockReturnValue(true);
    const { result } = renderHook(() => useBobjectTypes());
    const allBobjectTypes = result.current.all();
    const finalBobjectTypes = allBobjectTypes.filter(
      bobjectType => !Object.values(EXCLUDE_BOBJECT_TYPES).includes(bobjectType.name),
    );

    expect(allBobjectTypes).toStrictEqual(finalBobjectTypes);
  });

  it('List bobject types with the FF disabled', () => {
    jest.spyOn(useFeatureFlags, 'useProductsEnabled').mockReturnValue(false);
    const { result } = renderHook(() => useBobjectTypes());
    const allBobjectTypes = result.current.all();
    const finalBobjectTypes = allBobjectTypes.filter(
      bobjectType =>
        ![...Object.values(EXCLUDE_BOBJECT_TYPES), BOBJECT_TYPES.Products].includes(
          bobjectType.name,
        ),
    );

    expect(allBobjectTypes).toStrictEqual(finalBobjectTypes);
  });

  it('Filter the boject types by id', () => {
    const { result } = renderHook(() => useBobjectTypes());
    const bobjectType = result.current.filterBy('id', 'awQZK2maSA8QTT6U');

    expect(bobjectType).toStrictEqual([activityBobjectType]);
  });

  it('Filter the boject types by logic role', () => {
    const { result } = renderHook(() => useBobjectTypes());

    expect(() => {
      result.current.filterByLogicRole('LOGIC_ROLE');
    }).toThrowError(new Error("Bobject types doesn't have logic role"));
  });

  it('Find a bobject type', () => {
    const { result } = renderHook(() => useBobjectTypes());
    const bobjectType = result.current.find(type => type.id == 'awQZK2maSA8QTT6U');

    expect(bobjectType).toStrictEqual(activityBobjectType);
  });

  it('Find a bobject type by a property', () => {
    const { result } = renderHook(() => useBobjectTypes());
    const bobjectType = result.current.findBy('id')('awQZK2maSA8QTT6U');

    expect(bobjectType).toStrictEqual(activityBobjectType);
  });

  it('Find the boject types by logic role', () => {
    const { result } = renderHook(() => useBobjectTypes());

    expect(() => {
      result.current.findByLogicRole('LOGIC_ROLE');
    }).toThrowError(new Error("Bobject types doesn't have logic role"));
  });

  it('Get a bobject type', () => {
    const { result } = renderHook(() => useBobjectTypes());
    const bobjectType = result.current.get('awQZK2maSA8QTT6U');

    expect(bobjectType).toStrictEqual(activityBobjectType);
  });

  it('Get all bobject type ids', () => {
    const { result } = renderHook(() => useBobjectTypes());
    const ids = result.current.ids();

    expect(ids).toEqual([
      'awQZK2maSA8QTT6U',
      'eNRm2oPI3VjTko5e',
      'QNhRcSuzSCmkcRLM',
      'uvyjz6tHU9xfkne3',
      'wmAwEmHrso7FwrKn',
      'wmAwEmHrso7FwrKj',
      'wmAwEmHrso7FwrKf',
    ]);
  });
});
