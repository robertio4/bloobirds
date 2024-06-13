import { getAvailableUserConfig, getDefaultHomeConfig, getUserSettingConfigType } from './homepage';
import { ConfigType, Config } from '../typings/home';

const configTypes = {
  configTypes: [
    {
      configType: 'TASKS_SECTION_FILTERS',
      configs: [
        {
          id: '0a71ac40a5c4988e',
          name: 'On Cadence',
          enumName: 'ON_CADENCE',
          enabled: true,
          ordering: 0,
        },
        {
          id: '82d6c707ad068a8a',
          name: 'Scheduled',
          enumName: 'SCHEDULED',
          enabled: true,
          ordering: 1,
        },
        {
          id: '6c86e6deb57fe16a',
          name: 'Meeting task',
          enumName: 'MEETING_TASKS',
          enabled: true,
          ordering: 2,
        },
        {
          id: '650b4b1a054dd860',
          name: 'Overdue',
          enumName: 'OVERDUE',
          enabled: false,
          ordering: 3,
        },
        {
          id: 'dd3bbbf0b7467d9d',
          name: 'Completed',
          enumName: 'COMPLETED',
          enabled: false,
          ordering: 4,
        },
      ],
    },
    {
      configType: 'ACTIVITY_SECTION_LIVE_FEED_FILTERS',
      configs: [
        {
          id: '8f2d71866e889efe',
          name: 'Outgoing calls',
          enumName: 'OUTGOING_CALLS',
          enabled: true,
          ordering: 1,
        },
        {
          id: 'ded561d64da3ae2a',
          name: 'Incoming calls',
          enumName: 'INCOMING_CALLS',
          enabled: true,
          ordering: 2,
        },
        {
          id: '65fbbfc82b554baa',
          name: 'Sent emails',
          enumName: 'SENT_EMAILS',
          enabled: true,
          ordering: 3,
        },
        {
          id: 'a0bd90ea3b57ef6b',
          name: 'Received emails',
          enumName: 'RECEIVED_EMAILS',
          enabled: true,
          ordering: 4,
        },
        {
          id: '4a0885acd6177f2d',
          name: 'Emails opened',
          enumName: 'EMAILS_OPENED',
          enabled: true,
          ordering: 5,
        },
        {
          id: '2fc3bcbcc3ccbed3',
          name: 'Emails clicked',
          enumName: 'EMAILS_CLICKED',
          enabled: true,
          ordering: 6,
        },
        {
          id: 'cc5cb39ef75680fa',
          name: 'Sent LinkedIn Messages',
          enumName: 'SENT_LINKEDIN',
          enabled: true,
          ordering: 7,
        },
        {
          id: '1f103ef4d94a0803',
          name: 'Received LinkedIn Messages',
          enumName: 'RECEIVED_LINKEDIN',
          enabled: true,
          ordering: 8,
        },
        {
          id: '8e9e1d4279ce1e39',
          name: 'Inbound activities',
          enumName: 'INBOUND_ACTIVITIES',
          enabled: true,
          ordering: 9,
        },
        {
          id: '5e311f304ea157bd',
          name: 'Inbound leads',
          enumName: 'INBOUND_LEADS',
          enabled: true,
          ordering: 10,
        },
        {
          id: 'd7996979e32f8e7b',
          name: 'Cadence end',
          enumName: 'CADENCE_END',
          enabled: true,
          ordering: 11,
        },
        {
          id: 'cd681d4689f85e9f',
          name: 'Cadence started',
          enumName: 'CADENCE_STARTED',
          enabled: true,
          ordering: 12,
        },
        {
          id: 'bd5e1093056b1ee0',
          name: 'Meeting done',
          enumName: 'MEETING_DONE',
          enabled: true,
          ordering: 13,
        },
      ],
    },
    {
      configType: 'KPI_SECTION_FILTERS',
      configs: [
        {
          id: 'ba105c5ca284e991',
          name: 'Meetings',
          enumName: 'MEETINGS',
          enabled: true,
          ordering: 0,
        },
        {
          id: '49bb97216ab1b292',
          name: 'Emails',
          enumName: 'EMAIL',
          enabled: true,
          ordering: 1,
        },
        {
          id: 'e9570f7d885935bd',
          name: 'My activity',
          enumName: 'MY_ACTIVITY',
          enabled: true,
          ordering: 2,
        },
        {
          id: 'b6f8c156c1040273',
          name: 'Calls',
          enumName: 'CALLS',
          enabled: true,
          ordering: 3,
        },
        {
          id: '1f2994175ba7266b',
          name: 'LinkedIn',
          enumName: 'LINKEDIN',
          enabled: true,
          ordering: 4,
        },
        {
          id: 'd85baebf4d2462f7',
          name: 'My pipeline',
          enumName: 'MY_PIPELINE',
          enabled: true,
          ordering: 5,
        },
        {
          id: '2ffca77aa543a12a',
          name: 'Tasks',
          enumName: 'TASKS',
          enabled: true,
          ordering: 6,
        },
      ],
    },
  ],
};

const availableConfigs = {
  availableConfigs: [
    {
      configType: 'ACTIVITY_SECTION_NOTIFICATIONS_FILTERS',
      availableConfigs: [
        {
          id: '72860579559ed921',
          name: 'Email received',
          enumName: 'RECEIVED_EMAILS_NOTIF',
          ordering: 0,
          enabled: true,
        },
        {
          id: '899fa6f5b72255cd',
          name: 'Linkedin message received',
          enumName: 'RECEIVED_LINKEDIN_NOTIF',
          ordering: 1,
          enabled: true,
        },
        {
          id: '1a999de21910d65e',
          name: 'Cadence ended',
          enumName: 'CADENCE_END_NOTIF',
          ordering: 2,
          enabled: true,
        },
        {
          id: 'fd0fa8b8acd1aff8',
          name: 'Report meeting result',
          enumName: 'REPORT_MEETING_RESULT',
          ordering: 3,
          enabled: true,
        },
        {
          id: '7391a43dbc10f300',
          name: 'New leads delivered',
          enumName: 'NEW_LEADS_DELIVERED',
          ordering: 4,
          enabled: true,
        },
        {
          id: 'f1bf87970088f402',
          name: 'New companies delivered',
          enumName: 'NEW_COMPANIES_DELIVERED',
          ordering: 5,
          enabled: true,
        },
        {
          id: '412cd7f14324e8b2',
          name: 'Import completed',
          enumName: 'IMPORT_COMPLETED',
          ordering: 6,
          enabled: false,
        },
        {
          id: 'f35bd681a9a50f98',
          name: 'Import completed with issues',
          enumName: 'IMPORT_COMPLETED_ISSUES',
          ordering: 7,
          enabled: false,
        },
        {
          id: '98fd77981d9be4e8',
          name: 'Import failed',
          enumName: 'IMPORT_FAILED',
          ordering: 8,
          enabled: false,
        },
        {
          id: '5e07b9ea42e8b982',
          name: 'New inbound leads',
          enumName: 'NEW_INBOUND_LEADS',
          ordering: 9,
          enabled: true,
        },
        {
          id: 'e9d11578f28c21fb',
          name: 'New inbound activity',
          enumName: 'NEW_INBOUND_ACTIVITY',
          ordering: 10,
          enabled: true,
        },
        {
          id: '777587aba256a3d8',
          name: 'Missed calls from leads',
          enumName: 'MISSED_CALLS_FROM_LEADS',
          ordering: 11,
          enabled: true,
        },
        {
          id: 'a5899bf3c9375fa1',
          name: 'Missed calls from unknown contacts',
          enumName: 'MISSED_CALLS_FROM_UNKNOWN',
          ordering: 12,
          enabled: true,
        },
        {
          id: '6556df4637a3e77a',
          name: 'Incoming calls from unknown contacts',
          enumName: 'INCOMING_CALLS_FROM_UNKNOWN',
          ordering: 13,
          enabled: true,
        },
        {
          id: '947110ca3caed005',
          name: 'Report call result',
          enumName: 'REPORT_CALL_RESULT',
          ordering: 14,
          enabled: true,
        },
        {
          id: '47c74626e006a199',
          name: 'Email opened',
          enumName: 'EMAIL_OPENED',
          ordering: 15,
          enabled: true,
        },
        {
          id: 'e7fc19383bdcfd11',
          name: 'Email clicked',
          enumName: 'EMAIL_CLICKED',
          ordering: 16,
          enabled: true,
        },
      ],
    },
    {
      configType: 'ACTIVITY_SECTION_SELECTOR',
      availableConfigs: [
        {
          id: 'c0ae6d09db6a27c6',
          name: 'Live feed',
          enumName: 'LIVE_FEED',
          ordering: 0,
          enabled: true,
        },
        {
          id: 'c87e88dc2a1eca18',
          name: 'Notifications',
          enumName: 'NOTIFICATIONS',
          ordering: 1,
          enabled: true,
        },
      ],
    },
    {
      configType: 'KPI_SECTION_SELECTOR',
      availableConfigs: [
        {
          id: '7a823f7eb20a0053',
          name: 'Today',
          enumName: 'TODAY',
          ordering: 0,
          enabled: true,
        },
        {
          id: 'f7e7f81f249c117a',
          name: 'This week',
          enumName: 'THIS_WEEK',
          ordering: 1,
          enabled: true,
        },
        {
          id: 'b65d9ff6fa9cf7cb',
          name: 'This month',
          enumName: 'THIS_MONTH',
          ordering: 2,
          enabled: true,
        },
        {
          id: '1bb40d7237c6cc25',
          name: 'This year',
          enumName: 'THIS_YEAR',
          ordering: 3,
          enabled: true,
        },
        {
          id: '9e4a7ba334e781b8',
          name: 'Last 7 days',
          enumName: 'LAST_7_DAYS',
          ordering: 4,
          enabled: true,
        },
        {
          id: 'a13969a39bcfb6cf',
          name: 'Last 30 days',
          enumName: 'LAST_30_DAYS',
          ordering: 5,
          enabled: true,
        },
        {
          id: '0f6a912c5c828935',
          name: 'Last 90 days',
          enumName: 'LAST_90_DAYS',
          ordering: 6,
          enabled: true,
        },
      ],
    },
    {
      configType: 'TASKS_SECTION_FILTERS_SALES',
      availableConfigs: [
        {
          id: '22d77bc70b664781',
          name: 'Appointments',
          enumName: 'APPOINTMENTS',
          ordering: 0,
          enabled: true,
        },
        {
          id: 'c00e67955917c6b4',
          name: 'Follow ups',
          enumName: 'FOLLOW_UPS',
          ordering: 1,
          enabled: true,
        },
        {
          id: '1f6fb051e02983e3',
          name: 'Overdue',
          enumName: 'OVERDUE_SALES',
          ordering: 2,
          enabled: false,
        },
        {
          id: '6a5a527c2ca22ba6',
          name: 'Completed',
          enumName: 'COMPLETED_SALES',
          ordering: 3,
          enabled: false,
        },
      ],
    },
    {
      configType: 'TASKS_SECTION_FILTERS',
      availableConfigs: [
        {
          id: '0a71ac40a5c4988e',
          name: 'On Cadence',
          enumName: 'ON_CADENCE',
          ordering: 0,
          enabled: true,
        },
        {
          id: '82d6c707ad068a8a',
          name: 'Scheduled',
          enumName: 'SCHEDULED',
          ordering: 1,
          enabled: true,
        },
        {
          id: '6c86e6deb57fe16a',
          name: 'Meeting task',
          enumName: 'MEETING_TASKS',
          ordering: 2,
          enabled: true,
        },
        {
          id: '650b4b1a054dd860',
          name: 'Overdue',
          enumName: 'OVERDUE',
          ordering: 3,
          enabled: false,
        },
        {
          id: 'dd3bbbf0b7467d9d',
          name: 'Completed',
          enumName: 'COMPLETED',
          ordering: 4,
          enabled: false,
        },
      ],
    },
    {
      configType: 'ACTIVITY_SECTION_LIVE_FEED_FILTERS',
      availableConfigs: [
        {
          id: '8f2d71866e889efe',
          name: 'Outgoing calls',
          enumName: 'OUTGOING_CALLS',
          ordering: 1,
          enabled: true,
        },
        {
          id: 'ded561d64da3ae2a',
          name: 'Incoming calls',
          enumName: 'INCOMING_CALLS',
          ordering: 2,
          enabled: true,
        },
        {
          id: '65fbbfc82b554baa',
          name: 'Sent emails',
          enumName: 'SENT_EMAILS',
          ordering: 3,
          enabled: true,
        },
        {
          id: 'a0bd90ea3b57ef6b',
          name: 'Received emails',
          enumName: 'RECEIVED_EMAILS',
          ordering: 4,
          enabled: true,
        },
        {
          id: '4a0885acd6177f2d',
          name: 'Emails opened',
          enumName: 'EMAILS_OPENED',
          ordering: 5,
          enabled: true,
        },
        {
          id: '2fc3bcbcc3ccbed3',
          name: 'Emails clicked',
          enumName: 'EMAILS_CLICKED',
          ordering: 6,
          enabled: true,
        },
        {
          id: 'cc5cb39ef75680fa',
          name: 'Sent LinkedIn Messages',
          enumName: 'SENT_LINKEDIN',
          ordering: 7,
          enabled: true,
        },
        {
          id: '1f103ef4d94a0803',
          name: 'Received LinkedIn Messages',
          enumName: 'RECEIVED_LINKEDIN',
          ordering: 8,
          enabled: true,
        },
        {
          id: '8e9e1d4279ce1e39',
          name: 'Inbound activities',
          enumName: 'INBOUND_ACTIVITIES',
          ordering: 9,
          enabled: true,
        },
        {
          id: '5e311f304ea157bd',
          name: 'Inbound leads',
          enumName: 'INBOUND_LEADS',
          ordering: 10,
          enabled: true,
        },
        {
          id: 'd7996979e32f8e7b',
          name: 'Cadence end',
          enumName: 'CADENCE_END',
          ordering: 11,
          enabled: true,
        },
        {
          id: 'cd681d4689f85e9f',
          name: 'Cadence started',
          enumName: 'CADENCE_STARTED',
          ordering: 12,
          enabled: true,
        },
        {
          id: 'bd5e1093056b1ee0',
          name: 'Meeting done',
          enumName: 'MEETING_DONE',
          ordering: 13,
          enabled: true,
        },
      ],
    },
    {
      configType: 'TASKS_SECTION_SELECTOR',
      availableConfigs: [
        {
          id: 'e42b4ac2213af685',
          name: 'Sales',
          enumName: 'SALES',
          ordering: 0,
          enabled: true,
        },
        {
          id: '3ca1322d11a8a33d',
          name: 'Prospecting',
          enumName: 'PROSPECTING',
          ordering: 1,
          enabled: true,
        },
      ],
    },
    {
      configType: 'KPI_SECTION_FILTERS',
      availableConfigs: [
        {
          id: 'e9570f7d885935bd',
          name: 'My activity',
          enumName: 'MY_ACTIVITY',
          ordering: 0,
          enabled: true,
        },
        {
          id: 'ba105c5ca284e991',
          name: 'Meetings',
          enumName: 'MEETINGS',
          ordering: 0,
          enabled: true,
        },
        {
          id: '49bb97216ab1b292',
          name: 'Emails',
          enumName: 'EMAIL',
          ordering: 1,
          enabled: true,
        },
        {
          id: 'b6f8c156c1040273',
          name: 'Calls',
          enumName: 'CALLS',
          ordering: 2,
          enabled: true,
        },
        {
          id: '1f2994175ba7266b',
          name: 'LinkedIn',
          enumName: 'LINKEDIN',
          ordering: 3,
          enabled: true,
        },
        {
          id: 'd85baebf4d2462f7',
          name: 'My pipeline',
          enumName: 'MY_PIPELINE',
          ordering: 4,
          enabled: true,
        },
        {
          id: '2ffca77aa543a12a',
          name: 'Tasks',
          enumName: 'TASKS',
          ordering: 5,
          enabled: true,
        },
      ],
    },
  ],
};

describe('getUserSettingConfigType', () => {
  test('get Task section filters config Type', () => {
    const result = getUserSettingConfigType(configTypes, ConfigType.TASKS_SECTION_FILTERS);
    const expected = [
      {
        id: '0a71ac40a5c4988e',
        name: 'On Cadence',
        enumName: 'ON_CADENCE',
        enabled: true,
        ordering: 0,
      },
      {
        id: '82d6c707ad068a8a',
        name: 'Scheduled',
        enumName: 'SCHEDULED',
        enabled: true,
        ordering: 1,
      },
      {
        id: '6c86e6deb57fe16a',
        name: 'Meeting task',
        enumName: 'MEETING_TASKS',
        enabled: true,
        ordering: 2,
      },
      {
        id: '650b4b1a054dd860',
        name: 'Overdue',
        enumName: 'OVERDUE',
        enabled: false,
        ordering: 3,
      },
      {
        id: 'dd3bbbf0b7467d9d',
        name: 'Completed',
        enumName: 'COMPLETED',
        enabled: false,
        ordering: 4,
      },
    ];
    expect(result).toEqual(expected);
  });
  test('Get null when config type not found', () => {
    const result = getUserSettingConfigType(configTypes, 'blabla');
    expect(result).toEqual(null);
  });
});

describe('getAvailableUserConfig', () => {
  test('get Task section available filters config Type', () => {
    const result = getAvailableUserConfig(availableConfigs, ConfigType.TASKS_SECTION_FILTERS);
    const expected = [
      {
        id: '0a71ac40a5c4988e',
        name: 'On Cadence',
        enumName: 'ON_CADENCE',
        enabled: true,
        ordering: 0,
      },
      {
        id: '82d6c707ad068a8a',
        name: 'Scheduled',
        enumName: 'SCHEDULED',
        enabled: true,
        ordering: 1,
      },
      {
        id: '6c86e6deb57fe16a',
        name: 'Meeting task',
        enumName: 'MEETING_TASKS',
        enabled: true,
        ordering: 2,
      },
      {
        id: '650b4b1a054dd860',
        name: 'Overdue',
        enumName: 'OVERDUE',
        enabled: false,
        ordering: 3,
      },
      {
        id: 'dd3bbbf0b7467d9d',
        name: 'Completed',
        enumName: 'COMPLETED',
        enabled: false,
        ordering: 4,
      },
    ];
    expect(result).toEqual(expected);
  });
  test('Get null when config available type not found', () => {
    const result = getUserSettingConfigType(availableConfigs, 'blabla');
    expect(result).toEqual(null);
  });
});

describe('getDefaultHomeConfig', () => {
  test('get Task default section available filters config', () => {
    const result = getDefaultHomeConfig(availableConfigs, Config.LIVE_FEED);
    const expected = {
      id: 'c0ae6d09db6a27c6',
      name: 'Live feed',
      enumName: 'LIVE_FEED',
      ordering: 0,
      enabled: true,
    };
    expect(result).toEqual(expected);
  });
  test('Get null when default config available type not found', () => {
    const result = getDefaultHomeConfig(availableConfigs, 'blabla');
    expect(result).toEqual(null);
  });
});
