import {
  APP_ACCOUNT_CHROME_EXTENSION,
  APP_ACCOUNT_DIALERS,
  APP_ACCOUNT_EMAILS,
  APP_ACCOUNT_GENERAL_SETTINGS,
  APP_ACCOUNT_NOTIFICATIONS,
  APP_ACCOUNT_SALES_TEAM,
  APP_CADENCES_MANAGE,
  APP_CL,
  APP_DASHBOARD,
  APP_MANAGEMENT_USER
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
export const helpButton = (userEmail) => {
  if (!userEmail) {
    return {
      iconName: "questionCircle",
      label: "leftBar.footer.help",
      externalUrl: {
        es: "https://support.bloobirds.com/hc/es-es/requests/new",
        en: "https://support.bloobirds.com/hc/en-us/requests/new"
      }
    };
  }
  return {
    iconName: "questionCircle",
    label: "leftBar.footer.help",
    externalUrl: {
      es: `https://support.bloobirds.com/hc/es-es/requests/new?tf_anonymous_requester_email=${encodeURIComponent(
        userEmail
      )}`,
      en: `https://support.bloobirds.com/hc/en-us/requests/new?tf_anonymous_requester_email=${encodeURIComponent(
        userEmail
      )}`
    }
  };
};
const reportButton = {
  iconName: "list1",
  label: "leftBar.footer.report",
  url: APP_CL
};
const cadenceButton = {
  iconName: "deliver",
  label: "leftBar.footer.cadence",
  url: APP_CADENCES_MANAGE
};
const dashboardButton = {
  iconName: "barchart",
  label: "leftBar.footer.dashboard",
  url: APP_DASHBOARD
};
export const redirectButtonsLeftBar = (userEmail) => [
  helpButton(userEmail),
  reportButton,
  cadenceButton,
  dashboardButton
];
export const redirectButtonsDropdown = (userEmail) => [
  reportButton,
  cadenceButton,
  dashboardButton,
  helpButton(userEmail)
];
export const userDropdownItems = [
  {
    iconName: "settings",
    label: "common.generalSettings",
    url: APP_MANAGEMENT_USER
  },
  {
    iconName: "mail",
    label: "common.email",
    url: `${APP_MANAGEMENT_USER}?tab=EMAIL`
  },
  {
    iconName: "phone",
    label: "common.phone",
    url: `${APP_MANAGEMENT_USER}?tab=CALLS`
  },
  {
    iconName: "calendar",
    label: "leftBar.footer.meetingLinks",
    url: `${APP_MANAGEMENT_USER}?tab=MEETINGS`
  },
  {
    iconName: "taskAction",
    label: "leftBar.footer.task&Reminders",
    url: `${APP_MANAGEMENT_USER}?tab=REMINDERS`
  }
];
export const accountDropdownItems = [
  {
    iconName: "settings",
    label: "common.generalSettings",
    url: APP_ACCOUNT_GENERAL_SETTINGS
  },
  {
    iconName: "person",
    label: "leftBar.footer.salesTeam",
    url: APP_ACCOUNT_SALES_TEAM
  },
  { iconName: "mail", label: "common.email", url: APP_ACCOUNT_EMAILS },
  { iconName: "phone", label: "leftBar.footer.dialers", url: APP_ACCOUNT_DIALERS },
  {
    iconName: "bell",
    label: "leftBar.footer.notifications",
    url: APP_ACCOUNT_NOTIFICATIONS
  },
  {
    iconName: "chrome",
    label: "leftBar.footer.chromeExtension",
    url: APP_ACCOUNT_CHROME_EXTENSION
  }
];
