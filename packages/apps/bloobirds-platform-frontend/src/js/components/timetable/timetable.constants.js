export const ACTIONS_ICONS = {
  AUTOMATED_EMAIL: {
    name: 'autoMail',
    color: 'tangerine',
  },
  PHONE_CALL: {
    name: 'phone',
    color: 'melon',
  },
  EMAIL: {
    name: 'mail',
    color: 'tangerine',
  },
  LINKEDIN_MESSAGE: {
    name: 'linkedin',
    color: 'darkBloobirds',
  },
  INBOUND: {
    name: 'arrowDownRight',
    color: 'banana',
  },
  STATUS: {
    name: 'company',
    color: 'softPeanut',
  },
  TASKS: {
    name: 'taskAction',
    color: 'bloobirds',
  },
  CUSTOM_TASK: {
    name: 'Custom task',
    color: 'bloobirds',
  },
};

export const ACTIONS_ORDERING = [
  'PHONE_CALL',
  'EMAIL',
  'AUTOMATED_EMAIL',
  'LINKEDIN_MESSAGE',
  'TASKS',
  'INBOUND',
  'STATUS',
];

export const ACTIONS_NAME = {
  EMAIL: 'Email',
  INBOUND: 'Inbound',
  LINKEDIN_MESSAGE: 'Linkedin',
  PHONE_CALL: 'Call',
  STATUS: 'Qc. Status',
  TASKS: 'Tasks',
  AUTOMATED_EMAIL: 'Auto-mail',
};

export const ACTIONS_TYPES = Object.freeze({
  STATUS: 'STATUS',
  TASKS_COMPLETED: 'TASKS_COMPLETED',
  TASKS: 'TASKS',
});

export const DEFAULT_NUMBER_ITEMS = 10;

export const TIME_WINDOW = Object.freeze({
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
});
