import { MutableRefObject } from 'react';

import { Bobject, BobjectId, Dictionary } from '@bloobirds-it/types';

export enum TIME_WINDOW {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export enum CadenceType {
  'call' = 'call',
  'email' = 'email',
  'autoEmail' = 'autoEmail',
  'linkedIn' = 'linkedIn',
  'customTask' = 'customTask',
  'meeting' = 'meeting',
  'inbound' = 'inbound',
  'statusChange' = 'statusChange',
}

export const cadenceTypesList = Object.values(CadenceType);

export interface CadenceBobject {
  id: BobjectId;
  assignedTo: string;
  cadenceId: string | null;
  companyId: string;
  targetMarket: string | null;
  relatedBobjectIds: string[];
}

export interface CadenceLead {
  id: BobjectId;
  fullName: string;
}

interface CadenceActivity {
  id: BobjectId;
  datetime: string;
  type: CadenceType;
  leadName: string;
  leadId: string;
  description: string;
  formBobject: Bobject;
}

type Call = CadenceActivity;
type Email = CadenceActivity & { bounced: boolean };
type AutoEmail = CadenceActivity & { bounced: boolean };
type LinkedIn = CadenceActivity;
type Meeting = CadenceActivity;
type CustomTask = CadenceActivity;
type Inbound = CadenceActivity;
type StatusChange = CadenceActivity;

interface CadenceTask<T extends CadenceActivity> {
  numOfTasks: number;
  numOfActivities: number;
  activities: T[];
  tasks: Bobject[];
}

export interface CadenceTimeTask extends Record<CadenceType, CadenceTask<CadenceActivity>> {
  call: CadenceTask<Call>;
  email: CadenceTask<Email>;
  autoEmail: CadenceTask<AutoEmail>;
  linkedIn: CadenceTask<LinkedIn>;
  meeting: CadenceTask<Meeting>;
  customTask: CadenceTask<CustomTask>;
  inbound: CadenceTask<Inbound>;
  statusChange: CadenceTask<StatusChange>;
}

export interface CadenceResponse {
  tasks: Dictionary<CadenceTimeTask>;
  timeWindow: TIME_WINDOW;
  firstTaskDate: string;
  firstActivityDate: string;
  lastTaskDate: string;
  lastActivityDate: string;
}

export const cadenceResponseDefault: CadenceResponse = {
  tasks: {},
  timeWindow: TIME_WINDOW.DAILY,
  firstTaskDate: '',
  firstActivityDate: '',
  lastTaskDate: '',
  lastActivityDate: '',
};

export interface CadenceTableGettersInterface {
  timeWindow: TIME_WINDOW;
  scrollTo: ScrollToWhereType;
  isFullFunctional: boolean;
  kindFilter: KindFilterType;
  leadFilter: LeadFilterType;
}

export interface CadenceTableImmutableInterface {
  setTimeWindow: React.Dispatch<React.SetStateAction<TIME_WINDOW>>;
  setScrollTo: React.Dispatch<React.SetStateAction<ScrollToWhereType>>;
  setIsFullFunctional: React.Dispatch<React.SetStateAction<boolean>>;
  setKindFilter: React.Dispatch<React.SetStateAction<KindFilterType>>;
  setLeadFilter: React.Dispatch<React.SetStateAction<LeadFilterType>>;
  isLeftPageDisabled: MutableRefObject<boolean>;
  isRightPageDisabled: MutableRefObject<boolean>;
  hideActivityHover: boolean;
  onClickActivityEdit?: (activity: Bobject) => void;
  onClickActivityExternal?: (activity: Bobject) => void;
  onClickActivityView?: (activity: Bobject, timeWindow: string, date: string) => void;
}

export interface CadenceTableLeadsInterface {
  bobject: Bobject;
  leads: { id: string; fullName: string }[];
}

export type ScrollToWhereType =
  | ''
  | 'today'
  | 'pageBack'
  | 'pageForward'
  | 'firstTask'
  | 'lastTask'
  | 'firstActivity'
  | 'lastActivity';

export type KindFilterType =
  | 'anyKind'
  | 'ATTEMPTS'
  | 'TOUCHES'
  | 'INCOMING'
  | 'OUTGOING'
  | 'MISSED';

export type LeadFilterType = string[] | null;
