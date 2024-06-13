// TODO: Move this out of here and directly into the parser
export enum MessagesEvents {
  UrlNotFound = 'MESSAGES_EVENTS_URL_NOT_FOUND',
  UrlFound = 'MESSAGES_EVENTS_URL_FOUND',
  ForceOpenExtension = 'FORCE_OPEN_EXTENSION',
  UserLoggedIn = 'USER_LOGGED_IN',
  UserLoggedOut = 'USER_LOGGED_OUT',
  ActiveBobjectUpdated = 'ACTIVE_BOBJECT_UPDATED',
  TaskCompleted = 'TASK_COMPLETED',
  PlaybookFeed = 'PLAYBOOK_FEED',
  TaskPriorityUpdated = 'TASK_PRIORITY_UPDATED',
  SubTabUpdated = 'SUB_TAB_UPDATED',
  OpenLeftBarTab = 'OPEN_LEFT_BAR_TAB',
  MinimizeDialer = 'MINIMIZE_DIALER',
}
