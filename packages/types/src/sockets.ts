import { BobjectTypes } from './bobjects';
import { Notification } from './notifications';

export enum EventTypes {
  Cadence = 'cadence',
  Data = 'data',
  Notification = 'notification',
}

interface CadenceEventData {
  cadence: string;
  bobjectId: string;
  cadenceId: string;
  cadenceName: string;
  operation: 'STOPPED' | 'SCHEDULED' | 'RESCHEDULED';
  userId: string;
}

interface BobjectEventData {
  bobjectType: BobjectTypes;
  changes: { [key: string]: string };
  ids: string[];
  operation: 'UPDATE' | 'CREATE' | 'DELETE';
}

interface NotificationEventData {
  notification: Notification;
}

type WebSocketEventMap = {
  [EventTypes.Cadence]: CadenceEventData;
  [EventTypes.Data]: BobjectEventData;
  [EventTypes.Notification]: NotificationEventData;
};

export type WebSocketEvent<T extends keyof WebSocketEventMap> = {
  action: T;
  data: WebSocketEventMap[T];
};
