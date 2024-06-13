import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

import {
  APP_CADENCES_MANAGE,
  APP_CL_LISTS,
  APP_MANAGEMENT_USER,
  APP_PLAYBOOK_CADENCES,
  APP_PLAYBOOK_MESSAGING_EMAIL,
  APP_PLAYBOOK_MESSAGING_PITCH,
  APP_TASKS_INBOX,
  APP_TASKS_OUTBOX,
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
}

type BlockKeys =
  | 'PREPARE_PIPELINE'
  | 'START_PROSPECTING'
  | 'SEND_EMAILS'
  | 'READY_TO_CALL'
  | 'LINKEDIN_SALES'
  | 'MESSAGE_PROGRESS';

interface QuickStartBlockInterface {
  title: string;
  key: BlockKeys;
  icon: IconType;
  iconColor: ColorType;
  goals: Array<QuickStartGoalsInterface>;
}

type QuickStartGuideBlocksType = Array<QuickStartBlockInterface>;

export const getQuickStartGuideBlocks = (
  hasCadencePermission: boolean,
  cadencesV2Enabled: boolean,
  params?: Record<'LINKEDIN_SALES', { [x: string]: boolean }>,
): QuickStartGuideBlocksType => [
  {
    title: 'Prepare your pipeline',
    key: 'PREPARE_PIPELINE',
    icon: 'personAdd',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'createFirstCompany',
        label: 'Add your first Company',
        key: UserHelperKeys.CREATE_FIRST_COMPANY,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered?fromGuide=Company`,
      },
      {
        i18nKey: 'createFirstLead',
        label: 'Add your first Lead',
        key: UserHelperKeys.CREATE_FIRST_LEAD,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered/leads?fromGuide=Lead`,
      },
      {
        i18nKey: 'checkYourTargetMarkets',
        label: 'Check your Target Markets',
        key: UserHelperKeys.CHECK_OUT_YOUR_TARGET_MARKETS,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered?fromGuide=TargetMarket`,
        linkYoutube: 'https://www.youtube.com/watch?v=_nbPstSdVhw',
      },
      {
        i18nKey: 'checkYourBuyerPersonas',
        label: 'Check your Buyer Personas',
        key: UserHelperKeys.CHECK_OUT_YOUR_BUYER_PERSONAS,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered/leads?fromGuide=BuyerPersona`,
        linkYoutube: 'https://www.youtube.com/watch?v=_nbPstSdVhw',
      },
    ],
  },
  {
    title: 'Set up to start prospecting',
    key: 'START_PROSPECTING',
    icon: 'play',
    iconColor: 'bloobirds',
    goals: [
      ...(hasCadencePermission
        ? [
            {
              i18nKey: 'createYourFirstCadence',
              label: 'Create your first cadence',
              key: UserHelperKeys.CREATE_YOUR_FIRST_CADENCE,
              linkYoutube: 'https://www.youtube.com/watch?v=PBJP5hg3HPs',
              linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence',
              linkNavigation: `${cadencesV2Enabled ? APP_CADENCES_MANAGE : APP_PLAYBOOK_CADENCES}`,
            },
            {
              i18nKey: 'addYourFirstCadenceStep',
              label: 'Add your first cadence step',
              key: UserHelperKeys.CREATE_YOUR_FIRST_CADENCE_STEP,
              linkYoutube: 'https://www.youtube.com/watch?v=PBJP5hg3HPs',
              linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence',
              linkNavigation: `${cadencesV2Enabled ? APP_CADENCES_MANAGE : APP_PLAYBOOK_CADENCES}`,
            },
          ]
        : []),
      {
        i18nKey: 'takeTourProspectTab',
        label: 'Take a tour on your prospect tab',
        key: UserHelperKeys.TAKE_TOUR_PROSPECT_TAB,
        linkTour: `${APP_TASKS_PROSPECTING}/delivered?tour=true`,
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered?tour=true`,
      },
      {
        i18nKey: 'launchYourFirstCadence',
        label: 'Launch your first cadence',
        key: UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE,
        linkYoutube: 'https://www.youtube.com/watch?v=TsrIpdqPBpA',
        linkNavigation: `${APP_TASKS_PROSPECTING}/delivered?fromGuide=LaunchCadence`,
      },
      {
        i18nKey: 'startTasksFromCadence',
        label: 'Start tasks from your “On Cadence” page',
        key: UserHelperKeys.START_TASK_FROM_CADENCE,
        linkYoutube: 'https://www.youtube.com/watch?v=JjBAmFFwg2c',
        linkNavigation: `${APP_TASKS_PROSPECTING}/onCadence?fromGuide=StartTasks`,
      },
      {
        i18nKey: 'markAsDoneAttempt',
        label: 'Mark as done your first attempt',
        key: UserHelperKeys.MARK_AS_DONE_ATTEMPT,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/5699779759772-Mark-as-done',
        linkNavigation: `${APP_TASKS_PROSPECTING}/onCadence?fromGuide=MarkAsDone`,
      },
      {
        i18nKey: 'setUpReminders',
        label: 'Set up your taskReminders',
        key: UserHelperKeys.SET_UP_REMINDERS,
        linkNavigation: `${APP_MANAGEMENT_USER}?tab=REMINDERS`,
      },
    ],
  },
  {
    title: 'Start sending emails',
    key: 'SEND_EMAILS',
    icon: 'mail',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'connectEmailAccount',
        label: 'Connect your email account',
        key: UserHelperKeys.CONNECT_EMAIL_ACCOUNT,
        linkNavigation: `${APP_MANAGEMENT_USER}?tab=EMAIL`,
      },
      {
        i18nKey: 'createFirstEmailTemplate',
        label: 'Create your first email template',
        key: UserHelperKeys.CREATE_FIRST_EMAIL_TEMPLATE,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4838268707868-Templates',
        linkNavigation: `${APP_PLAYBOOK_MESSAGING_EMAIL}`,
      },
      {
        i18nKey: 'setYourEmailSignature',
        label: 'Set up your signature',
        key: UserHelperKeys.SET_YOUR_EMAIL_SIGNATURE,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/360017107580-Email-signature',
        linkNavigation: `${APP_MANAGEMENT_USER}?tab=EMAIL`,
      },
      {
        i18nKey: 'sendYourFirstEmail',
        label: 'Send your first email',
        key: UserHelperKeys.SEND_YOUR_FIRST_EMAIL,
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/360012893040-Connect-and-test-your-Gmail-account',
      },
      {
        i18nKey: 'sendFirstAutoEmail',
        label: 'Create an automatic cadence',
        key: UserHelperKeys.SEND_FIRST_AUTO_EMAIL,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/5007917208348-Email-Automation',
        linkNavigation: cadencesV2Enabled ? APP_CADENCES_MANAGE : APP_PLAYBOOK_CADENCES,
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
        i18nKey: 'createYourFirstPitch',
        label: 'Create your first pitch',
        key: UserHelperKeys.CREATE_YOUR_FIRST_PITCH,
        linkHowTo:
          'https://support.bloobirds.com/hc/en-us/articles/5592273342364-Create-your-first-pitch-for-calls',
        linkNavigation: `${APP_PLAYBOOK_MESSAGING_PITCH}`,
      },
      {
        i18nKey: 'saveNumberSettings',
        label: 'Save your phone number settings',
        key: UserHelperKeys.SAVE_NUMBER_SETTINGS,
        linkNavigation: `${APP_MANAGEMENT_USER}?tab=CALLS`,
      },
      {
        i18nKey: 'callAndReportResult',
        label: 'Call and report the result',
        key: UserHelperKeys.CALL_AND_REPORT_RESULT,
        linkYoutube: 'https://www.youtube.com/watch?v=r5-vQtD2WE0',
      },
    ],
  },
  {
    title: 'Sync your LinkedIn and Sales Navigator activity',
    key: 'LINKEDIN_SALES',
    icon: 'linkedin',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'downloadChromeExtension',
        label: 'Download the Chrome Extension',
        key: UserHelperKeys.DOWNLOAD_CHROME_EXTENSION,
        linkNavigation: `https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh`,
      },
      {
        i18nKey: 'createLeadFromLinkedIn',
        label: 'Capture your first lead from LinkedIn',
        key: UserHelperKeys.CREATE_LEAD_FROM_LINKEDIN,
        linkHowTo: 'https://support.bloobirds.com/hc/en-us/articles/4894165417500-Chrome-extension',
        linkYoutube: 'https://www.youtube.com/watch?v=vOd9YOCVj6I',
        linkNavigation: params?.LINKEDIN_SALES?.hasExtension
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
        linkNavigation: params?.LINKEDIN_SALES?.hasExtension
          ? `${APP_TASKS_INBOX}/linkedin`
          : 'https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh',
      },
    ],
  },
  {
    title: 'Track your message and progress',
    key: 'MESSAGE_PROGRESS',
    icon: 'activity',
    iconColor: 'bloobirds',
    goals: [
      {
        i18nKey: 'takeTourOnInbox',
        label: 'Take the Bloobirds Inbox tour',
        key: UserHelperKeys.TAKE_TOUR_ON_INBOX,
        linkTour: `${APP_TASKS_INBOX}?tour=true`,
        linkNavigation: `${APP_TASKS_INBOX}?tour=true`,
      },
      {
        i18nKey: 'takeTourOnOutbox',
        label: 'Take the Bloobirds Outbox tour',
        key: UserHelperKeys.TAKE_TOUR_ON_OUTBOX,
        linkTour: `${APP_TASKS_OUTBOX}?tour=true`,
        linkNavigation: `${APP_TASKS_OUTBOX}?tour=true`,
      },
      {
        i18nKey: 'createFirstList',
        label: 'Create your first list',
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
];
