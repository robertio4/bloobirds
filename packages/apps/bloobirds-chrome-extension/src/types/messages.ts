import { LinkedInMessage } from '../utils/scrapper/messages/types';

// TODO: This will become deprecated since most things will be moved to content script
export const enum Actions {
  HistoryUpdate = 'MESSAGE_ACTIONS_HISTORY_UPDATE',
  TabUpdate = 'TAB_UPDATED',
  InsertPhoneToWhatsApp = 'INSERT_PHONE_TO_WHATSAPP',
}

export const enum SyncSource {
  SalesNavigator = 'SALES_NAVIGATOR',
  SalesNavigatorChat = 'SALES_NAVIGATOR_CHAT',
  LinkedIn = 'LINKEDIN',
  LinkedInMini = 'LINKEDIN_MINI',
}

export const enum PortName {
  SyncThread = 'SyncThread',
}

export interface SyncThreadBackgroundMessage {
  source: SyncSource;
  messages: Array<LinkedInMessage>;
}
