import { ColorType } from '@bloobirds-it/flamingo-ui';
import { Spacetime } from 'spacetime';

import { TDateISO, TDateISODate } from './date';

export type EventsType = 'nylas' | 'bloobirds' | 'placeholder' | 'dragging' | 'pendingConfirmation';

export interface CalendarsWithColors {
  calendarId: string;
  color: ColorType;
  barColor: ColorType;
}

export type EventsPerDay = {
  [key: string]: Event[];
};

export interface Invitee {
  email?: string;
  name?: string | null;
  type?: 'Lead' | 'AE' | 'Organizer' | 'Company' | 'User' | undefined;
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
  minuteSpan?: number;
  collisionNumber: number;
  day: TDateISODate;
  type: EventsType;
  participants: Invitee[];
  calendarId: string;
  backgroundColor?: ColorType;
  barColor?: ColorType;
  owner?: string;
  paddingTop?: number;
};

export interface LiveEvent
  extends Pick<
    Event,
    | 'minuteSpan'
    | 'id'
    | 'collisions'
    | 'day'
    | 'type'
    | 'duration'
    | 'collisionNumber'
    | 'paddingTop'
  > {
  startTime: Spacetime;
  endTime: Spacetime;
}
