export enum TaskTypeName {
  ProspectCadence = 'Prospect Cadence',
  NextStep = 'Next Step',
  ContactBeforeMeeting = 'Contact before meeting',
}

export enum TasksHookFamilies {
  Calendar = 'Calendar',
  Home = 'Home',
}

export interface TaskDate {
  hashDate: string;
  prefix: string;
  formattedDate: string;
  isFirstOfDay: boolean;
}
