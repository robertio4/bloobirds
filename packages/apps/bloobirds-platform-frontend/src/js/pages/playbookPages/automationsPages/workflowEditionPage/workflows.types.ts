import { BobjectTypes } from '@bloobirds-it/types';

export type MonitorType =
  | 'Range'
  | 'Empty'
  | 'Change'
  | 'Equal'
  | 'NotEqual'
  | 'NotEmpty'
  | 'DateComparator';
export type WildCard = 'ANY' | 'EMPTY';
export type Operator = 'LTE' | 'LT' | 'GTE' | 'GT';
export type Duration = 'days' | 'years' | 'months' | 'hours' | 'minutes' | 'seconds';
export type ActionType =
  | 'CLEAR_PROPERTY'
  | 'COPY_PROPERTY'
  | 'CREATE_NOTIFICATION'
  | 'CREATE_TASK'
  | 'START_CADENCE'
  | 'REASSIGN'
  | 'STOP_CADENCE'
  | 'UPDATE_PROPERTY';

export interface BloobirdsAction {
  type: ActionType;
  id?: string;

  [key: string]: any;
}

export interface Record {
  originFieldId: string;
  targetFieldId: string;
}

export interface CopyProperty extends BloobirdsAction {
  records: Record[];
}

export interface Property {
  [key: string]: string;
}

export interface UpdateProperty extends BloobirdsAction {
  properties: {
    [key: string]: any;
  };
}

export interface ClearProperty extends BloobirdsAction {
  bobjectFieldIds: string[];
}

export interface RelativeDate {
  days: number;
  time: string;
  fixedDate: string;
}

export interface StartCadence extends BloobirdsAction {
  bobjectType: string;
  cadenceId: string | undefined;
  startDate: RelativeDate;
}

export interface StopCadence extends BloobirdsAction {
  bobjectType: string;
}

export interface CreateTask extends BloobirdsAction {
  targetBobjectType: string;
  assignedTo: string | undefined;
  title: string;
  relativeDate: RelativeDate;
}

export interface CreateNotification extends BloobirdsAction {
  bobjectType: string;
  title: string;
  assignedTo: string | undefined;
}

export type Reassign = BloobirdsAction;

export interface Entry {
  value: string;
  operator: Operator;
}

export interface Range extends Monitor {
  entries: Entry[];
}

export interface Equal extends Monitor {
  value: string;
}

export type Empty = Monitor;

export interface Change extends Monitor {
  fromValue: string | WildCard;
  toValue: string | WildCard;
}

export interface NotEqual extends Monitor {
  value: string;
}

export type NotEmpty = Monitor;

export interface DateComparator extends Monitor {
  operator: Operator;
  value: string;
  duration: Duration;
}

export interface Monitor {
  type: MonitorType;

  [key: string]: any;
}

export interface MonitoredField {
  fieldId: string;
  monitors: Monitor[];
}

export interface MonitoredFields {
  fields: MonitoredField[];
}

export interface CreateWorkflowRequest {
  name: string;
  type: string;
  filters: MonitoredFields[];
  actions: BloobirdsAction[];
  runOnlyOnce: boolean;
  anyoneCanEdit: boolean;
}

export interface WorkflowType {
  name: string;
  bobjectType: BobjectTypes;
  event: string;
  icon: string;
  label: string;
}

export interface Workflow {
  accountId: string;
  id: string;
  name: string;
  author: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  type: WorkflowType;
  filters: MonitoredFields[];
  defaultFilters: MonitoredFields[];
  actions: BloobirdsAction[];
  runOnlyOnce: boolean;
  anyoneCanEdit: boolean;
  isEnabled: boolean;
}

export interface ReturnedWorkflow {
  accountId: string;
  id: string;
  name: string;
  author: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  filters: MonitoredFields[];
  defaultFilters: MonitoredFields[];
  actions: BloobirdsAction[];
  runOnlyOnce: boolean;
  trigger: WorkflowType;
  anyoneCanEdit: boolean;
  isEnabled: boolean;
}

export interface WorkflowWithRuns extends Workflow {
  runs: number;
}
