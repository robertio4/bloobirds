import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

import {
  APP_ACCOUNT_DIALERS,
  APP_ACCOUNT_FIELDS,
  APP_ACCOUNT_GENERAL_SETTINGS,
  APP_CADENCES_MANAGE,
  APP_CL_LISTS,
  APP_DASHBOARD_PROSPECTING,
  APP_MANAGEMENT_USER,
  APP_PLAYBOOK_BUYER_PERSONAS,
  APP_PLAYBOOK_CADENCES,
  APP_PLAYBOOK_MESSAGING_EMAIL,
  APP_PLAYBOOK_MESSAGING_QQ,
  APP_PLAYBOOK_SCENARIOS,
  APP_PLAYBOOK_TARGET_MARKET,
  APP_TASKS_INBOX,
  APP_TASKS_PROSPECTING,
} from './routes';
import { UserHelperKeys } from './userHelperKeys';

interface QuickStartGoalsInterface {
  label: string;
  key: UserHelperKeys;
  i18nKey: string;
  linkNavigation?: string;
  linkYoutube?: string;
  linkHowTo?: string;
  linkTour?: string;
  skippable?: boolean;
}

export type QuickStartBlockInterface = {
  title: string;
  key: string;
  icon: IconType;
  iconColor: ColorType;
  goals: Array<QuickStartGoalsInterface>;
};

type AdminQuickStartGuideBlocksType = Array<QuickStartBlockInterface>;

export const getAdminQuickStartGuideBlocks = (
  hasCadencePermission: boolean,
  cadencesV2Enabled: boolean,
  params?: Record<'READY_TO_LINKEDIN', { [x: string]: boolean }>,
): AdminQuickStartGuideBlocksType => [
  {
    title: 'Define your playbook data model',
    key: 'DEFINE_PLAYBOOK',
    icon: 'book',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'createFirstTargetMarket',
        label: 'Add your first Target Market',
        key: UserHelperKeys.CREATE_FIRST_TARGET_MARKET,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/360011337920-Target-markets',
        linkYoutube: 'https://www.youtube.com/watch?v=hYfvqkKMG84',
        linkNavigation: `${APP_PLAYBOOK_TARGET_MARKET}`,
      },
      {
        i18nKey: 'customizeCompanyFields',
        label: 'Customize your company fields',
        key: UserHelperKeys.SET_COMPANY_FIELDS_TOUR,
        linkNavigation: `${APP_ACCOUNT_FIELDS}?tour=true`,
        linkTour: `${APP_ACCOUNT_FIELDS}?tour=true`,
        linkYoutube: 'https://www.youtube.com/watch?v=07MkgZ9abwo',
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/4917275864348-Fields-System-and-custom-fields',
      },
      {
        i18nKey: 'createFirstCompany',
        label: 'Add your first Company',
        key: UserHelperKeys.CREATE_FIRST_COMPANY,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered?fromGuide=Company`,
      },
      {
        i18nKey: 'addFirstBuyerPersona',
        label: 'Add your first Buyer Persona (ICP)',
        key: UserHelperKeys.ADD_FIRST_BUYER_PERSONA,
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/4821072507420-Buyer-Persona-ICP-',
        linkYoutube: 'https://www.youtube.com/watch?v=ZvHUhtLvQSo',
        linkNavigation: `${APP_PLAYBOOK_BUYER_PERSONAS}`,
      },
      {
        i18nKey: 'customizeLeadFields',
        label: 'Customize your lead fields',
        key: UserHelperKeys.SET_LEAD_FIELDS_TOUR,
        linkNavigation: `${APP_ACCOUNT_FIELDS}?tour=true`,
        linkTour: `${APP_ACCOUNT_FIELDS}?tour=true`,
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/4917275864348-Fields-System-and-custom-fields',
        linkYoutube: 'https://www.youtube.com/watch?v=07MkgZ9abwo',
      },
      {
        i18nKey: 'createFirstLead',
        label: 'Add your first Lead',
        key: UserHelperKeys.CREATE_FIRST_LEAD,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered/leads?fromGuide=Lead`,
      },
      {
        i18nKey: 'defineFirstScenario',
        label: 'Define your Scenario',
        key: UserHelperKeys.DEFINE_FIRST_SCENARIO,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4821141316892-Scenarios',
        linkNavigation: `${APP_PLAYBOOK_SCENARIOS}`,
      },
      {
        i18nKey: 'takeTourOnGeneralSettings',
        label: 'Take the General Settings Tour',
        key: UserHelperKeys.TAKE_TOUR_ON_GENERAL_SETTINGS,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4862184280476-General-settings',
        linkNavigation: `${APP_ACCOUNT_GENERAL_SETTINGS}?tour=true`,
        linkTour: `${APP_ACCOUNT_GENERAL_SETTINGS}?tour=true`,
      },
    ],
  },
  {
    title: 'Prepare your playbook messaging',
    key: 'PREPARE_PLAYBOOK_MESSAGING',
    icon: 'book',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'createFirstEmailTemplate',
        label: 'Create your templates',
        key: UserHelperKeys.CREATE_FIRST_EMAIL_TEMPLATE,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4838268707868-Templates',
        linkNavigation: APP_PLAYBOOK_MESSAGING_EMAIL,
      },
      {
        i18nKey: 'defineQualifyingQuestions',
        label: 'Define your Qualifying Questions',
        key: UserHelperKeys.DEFINE_QQ,
        linkYoutube: 'https://www.youtube.com/watch?v=aoR5_mLrHXM',
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/4838746882460-Qualifying-Questions',
        linkNavigation: APP_PLAYBOOK_MESSAGING_QQ,
      },
      ...(hasCadencePermission
        ? [
          {
            i18nKey: 'createYourFirstCadence',
            label: 'Create your first cadence',
            key: UserHelperKeys.CREATE_YOUR_FIRST_CADENCE,
            linkYoutube: 'https://www.youtube.com/watch?v=PBJP5hg3HPs',
            linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence',
            linkNavigation: cadencesV2Enabled ? APP_CADENCES_MANAGE : APP_PLAYBOOK_CADENCES,
          },
        ]
        : []),
      {
        i18nKey: 'launchYourFirstCadence',
        label: 'Launch your first cadence',
        key: UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE,
        linkYoutube: 'https://www.youtube.com/watch?v=TsrIpdqPBpA',
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered?fromGuide=LaunchCadence`,
      },
      {
        i18nKey: 'takeTourProspectTab',
        label: 'Take a tour on your prospect Tab',
        key: UserHelperKeys.TAKE_TOUR_PROSPECT_TAB,
        linkTour: `${APP_TASKS_PROSPECTING}/delivered?tour=true`,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered?tour=true`,
      },
    ],
  },
  {
    title: 'Get ready to call',
    key: 'READY_TO_CALL',
    icon: 'phone',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'chooseDialer',
        label: 'Set up your dialer',
        key: UserHelperKeys.CHOOSE_DIALER,
        linkYoutube: 'https://youtube.com/playlist?list=PLUEmsJXX4pOoENHH25f-jgrqdc1XgzbKN',
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4916094035996-Dialers',
        linkNavigation: APP_ACCOUNT_DIALERS,
      },
      {
        i18nKey: 'callAndReportResult',
        label: 'Make your first call',
        key: UserHelperKeys.CALL_AND_REPORT_RESULT,
        linkYoutube: 'https://www.youtube.com/watch?v=r5-vQtD2WE0',
      },
    ],
  },
  {
    title: 'Get ready to send emails',
    key: 'READY_TO_SEND_EMAIL',
    icon: 'mail',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'connectEmailAccount',
        label: 'Connect your email account',
        key: UserHelperKeys.CONNECT_EMAIL_ACCOUNT,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4860937296284-Email',
        linkNavigation: `${APP_MANAGEMENT_USER}?tab=EMAIL`,
      },
      {
        i18nKey: 'sendYourFirstEmail',
        label: 'Send your first email',
        key: UserHelperKeys.SEND_YOUR_FIRST_EMAIL,
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/360012893040-Connect-and-test-your-Gmail-account',
      },
    ],
  },
  {
    title: 'Get ready to sync LinkedIn',
    key: 'READY_TO_LINKEDIN',
    icon: 'linkedin',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'downloadChromeExtension',
        label: 'Install our Chrome Extension',
        key: UserHelperKeys.DOWNLOAD_CHROME_EXTENSION,
        linkNavigation:
          'https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh',
        linkYoutube: 'https://www.youtube.com/watch?v=iizyQXAI-mk',
      },
      {
        i18nKey: 'createLeadFromLinkedIn',
        label: 'Create your first lead from LinkedIn',
        key: UserHelperKeys.CREATE_LEAD_FROM_LINKEDIN,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4894165417500-Chrome-extension',
        linkYoutube: 'https://www.youtube.com/watch?v=vOd9YOCVj6I',
        linkNavigation: params?.READY_TO_LINKEDIN?.hasExtension
          ? 'https://www.linkedin.com/in/tonipereznavarro/'
          : 'https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh',
      },
      {
        i18nKey: 'linkFirstMessageLinkedIn',
        label: 'Sync and check your first conversation in the inbox',
        key: UserHelperKeys.LINK_FIRST_MESSAGE_LINKEDIN,
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/360011435079-How-are-LinkedIn-messages-synchronised',
        linkYoutube: 'https://www.youtube.com/watch?v=buPWAn3w3v8',
        linkNavigation: params?.READY_TO_LINKEDIN?.hasExtension
          ? `${APP_TASKS_INBOX}/linkedin`
          : 'https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh',
      },
      {
        i18nKey: 'takeTourOnInbox',
        label: 'Take the Bloobirds Inbox tour',
        key: UserHelperKeys.TAKE_TOUR_ON_INBOX,
        linkTour: `${APP_TASKS_INBOX}?tour=true`,
        linkNavigation: `${APP_TASKS_INBOX}?tour=true`,
      },
    ],
  },
  {
    title: 'Integrate your CRM with Bloobirds',
    key: 'INTEGRATE_TOOLS',
    icon: 'settings',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'connectCrmTour',
        label: 'Connect your CRM',
        key: UserHelperKeys.CONNECT_CRM_TOUR,
      },
    ],
  },
  {
    title: 'Track and measure your progress',
    key: 'TRACK_AND_MEASURE_PROGRESS',
    icon: 'activity',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'setUpDashboardsTour',
        label: 'Set up your dashboards view',
        key: UserHelperKeys.SET_UP_DASHBOARDS_TOUR,
        linkNavigation: `${APP_DASHBOARD_PROSPECTING}/overview`,
        linkTour: `${APP_DASHBOARD_PROSPECTING}/overview`,
      },
      {
        i18nKey: 'createFirstList',
        label: 'Create your first custom list',
        key: UserHelperKeys.CREATE_FIRST_LIST,
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/360011351999-Create-custom-lists',
        linkNavigation: `${APP_CL_LISTS}?fromGuide=createList`,
      },
      {
        i18nKey: 'enableKpiMetrics',
        label: 'Enable your metric KPI metrics and activity',
        key: UserHelperKeys.ENABLE_KPI_METRICS,
      },
    ],
  },
  {
    title: 'Invite your team',
    key: 'INVITE_TEAM',
    icon: 'emailOutgoing',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'inviteTeam',
        label: 'Start with the first invitation',
        key: UserHelperKeys.INVITE_TEAM,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4837383989916-Sales-Team',
        linkYoutube: 'https://www.youtube.com/watch?v=StU7bJPvPxs',
      },
    ],
  },
];
