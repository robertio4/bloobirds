import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectId, BobjectTypes, TASK_TYPE } from '@bloobirds-it/types';
import { WizardsModalParams } from '@bloobirds-it/wizard-modal-context';
import { TFunction } from 'i18next';

import { useCurrentTasks } from '../hooks/useCurrentTasks';

export interface TaskManagementContextType extends WizardsModalParams {
  bobject: Bobject;
  t: TFunction;
  modalContext: ModalContextType;
  setModalContext: (modalContext: ModalContextType) => void;
  handleSaveCadence: (timeout?: number) => void;
  handleSaveModal: (timeout?: number) => void;
  handleCloseModal: (softReset?: boolean) => void;
  stepState: TaskActionStates;
  setStepState: (state: TaskActionStates) => void;
  currentTasksProps: ReturnType<typeof useCurrentTasks>;
  lastModalOpened: React.MutableRefObject<TaskManagementModals>;
}

export enum TaskActionStates {
  NoTasks,
  NextSteps,
  CadenceOnGoing,
}

export enum Actions {
  AddNextSteps,
  StartCadence,
  ChangeCadence,
  RescheduleCadence,
  StopCadence,
}

export enum TaskManagementModals {
  None,
  NextStep,
  StartCadence,
  RescheduleCadence,
  StopCadence,
  RescheduleTask,
}

export type ModalContextType = {
  modal: TaskManagementModals;
  task?: Bobject;
};

export type TaskFeedRequest = {
  filters: TaskFeedFilter[];
  sort: Sort;
  pagination: Pagination;
};

type DataQuery = {
  lte: string;
  gte: string;
};

export type TaskFeedFilter =
  | DateFilter
  | TaskTypeFilter
  | OwnerFilter
  | StageFilter
  | FieldFilter
  | RelatedFieldFilter;

interface DateFilter {
  type: 'DATE';
  dateRange: DataQuery;
}

interface TaskTypeFilter {
  type: 'TYPE';
  values: string[];
}

interface OwnerFilter {
  type: 'OWNER';
  values: string[];
}

interface StageFilter {
  type: 'STAGE';
  values: string[];
}

interface FieldFilter {
  type: 'BY_FIELD';
  field: string;
  values: string[];
}

interface RelatedFieldFilter {
  type: 'BY_REFERENCE_FIELD';
  relatedField: string;
  field: string;
  values: string[];
}

type Sort = ByFieldSort | ByRelatedFieldSort | ByStrategySort | ByBloobirdsClusteringSort;

interface ByFieldSort {
  type: 'BY_FIELD';
  // other properties...
}

interface ByRelatedFieldSort {
  type: 'BY_RELATED_FIELD';
  // other properties...
}

interface ByStrategySort {
  type: 'BY_STRATEGY';
  // other properties...
}

interface ByBloobirdsClusteringSort {
  type: 'BY_BLOOBIRDS_CLUSTERING';
  // other properties...
}

type Pagination = OnePagePagination | ClusteredPagination;

interface OnePagePagination {
  type: 'ONE_PAGE';
  pageValue: PageValue;
}

interface ClusteredPagination {
  type: 'CLUSTERED';
  scheduledTasks: PageValue;
  reminders: PageValue;
  dailyTasks: PageValue;
  overdueTasks: PageValue;
}

interface PageValue {
  page: number;
  size: number;
}

type RelatedBobject = {
  id: string;
  name: string;
};

export interface TaskFeedTask {
  actionCall: boolean;
  actionEmail: boolean;
  actionLinkedin: boolean;
  cadenceId: string;
  canBeMarkedAsDone: boolean;
  color: ColorType;
  company?: RelatedBobject;
  customTaskId: string;
  description?: string;
  extraFields: Array<ExtraField>;
  icon: IconType;
  id: BobjectId<BobjectTypes.Task>['value'];
  lead?: RelatedBobject;
  opportunity?: RelatedBobject;
  owner?: string;
  priority: string;
  scheduledDatetime?: string;
  score?: number;
  skippable: boolean;
  title: string;
  type: TASK_TYPE;
  step?: string;
  timezone?: string;
  linkedinUrl?: string;
  crmIds?: {
    crmId?: string;
    crmName?: string;
  };
}

interface ExtraField {
  id: string;
  name: string;
  icon: IconType;
  value: string;
}
export interface TaskFeedTaskList {
  type: 'onePage';
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  tasks: TaskFeedTask[];
}

type ClusterName = 'reminders' | 'scheduledTasks' | 'dailyTasks' | 'overdueTasks';

export type Clusters = Record<ClusterName, TaskFeedTaskList>;

export interface ClusteredTaskList {
  type: 'clustered';
  clusters: Clusters;
}

export interface TaskFeedState {
  configuration: {
    dateFilterEnabled: boolean;
    sortableFields: any[];
    sortingStrategies: any[];
    extraFieldsShownOnEachCard: any[];
    filtrableFields: any[];
    canSeeImportance: boolean;
  };
  filtersVisible: boolean;
  filterValues: Record<string, TaskFeedRequest['filters']>;
  defaultFilterValues: Record<string, TaskFeedRequest['filters']>;
  filterValuesTouched: boolean;
  tasks: TaskFeedTaskList | ClusteredTaskList;
  sort: TaskFeedRequest['sort'];
  pagination: TaskFeedRequest['pagination'];
  visibleClusters: string[];
  // Add other keys here as needed
}
