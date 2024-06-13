import { ColorType } from '@bloobirds-it/flamingo-ui';
import { TDateISO, TDateISODate } from '@bloobirds-it/types';

export enum SearchType {
  leads,
  coworkers,
}

export interface Coworker {
  type: string;
  email: string;
  name: string;
  id: string;
}

export type EventsType = 'nylas' | 'bloobirds' | 'placeholder' | 'dragging' | 'pendingConfirmation';

/*const randomColors: ColorType[] = [
  'bloobirds',
  'softPeanut',
  'verySoftTangerine',
  'softTangerine',
  'verySoftTomato',
  'softTomato',
  'softBanana',
  'verySoftBanana',
  'verySoftMelon',
  'softMelon',
  'lightBloobirds',
  'verySoftBloobirds',
  'verySoftPurple',
  'lightPurple',
  'verySoftPeanut',
  'lightPeanut',
  'lighterGray',
  'gray',
];*/

export interface Invitee {
  email?: string;
  name?: string | null;
  type?: 'Lead' | 'AE' | 'Organizer' | 'Company' | 'User';
  comment?: string;
  status?: 'yes' | 'no' | 'noreply';
  leadId?: string;
}

export type Event = {
  duration: number;
  collisions: number;
  startTime: TDateISO;
  endTime: TDateISO;
  startTimeTimestamp: number;
  endTimeTimestamp: number;
  id: string;
  title: string;
  collisionNumber: number;
  day: TDateISODate;
  type: EventsType;
  participants: Invitee[];
  calendarId: string;
  backgroundColor?: ColorType;
  barColor?: ColorType;
  owner?: string;
};

export type EventsPerDay = {
  [key: string]: Event[];
};

export interface CalendarsWithColors {
  calendarId: string;
  color: ColorType;
  barColor: ColorType;
}
