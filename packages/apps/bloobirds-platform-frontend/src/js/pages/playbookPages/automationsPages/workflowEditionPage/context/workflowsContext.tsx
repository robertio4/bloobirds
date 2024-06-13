import React from 'react';

import { BobjectTypes } from '@bloobirds-it/types';
import { clone } from 'lodash';

import { WORKFLOWS_ACTIONS_TYPES_KEYS } from '../actionsTabFolder/actions/modules/actions.constants';
import { BloobirdsAction, Monitor, Workflow, WorkflowType } from '../workflows.types';
import { workflowsContextActions } from './workflowsContextActions';

export interface Condition {
  bobjectFieldId: string;
  value: Monitor;
}

interface WorkflowState {
  runOnlyOnce: boolean;
  anyoneCanEdit: boolean;
  authorName?: string;
  filters: any;
  isEnabled: boolean;
  id: string | undefined;
  name: string | undefined;
  trigger: WorkflowType | undefined;
  conditions: Array<Array<Condition>>;
  actions: BloobirdsAction[];
  listFilters: any;
  isLocked: boolean;
  isMissingInfo: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  logsFilters: any;
}

interface WorkflowReducerPayload {
  block?: number;
  fieldIndex?: number;
  value?: any;
  fieldId?: string;
  trigger?: WorkflowType | undefined;
  conditions?: Array<Array<Condition>>;
  action?: BloobirdsAction;
  anyoneCanEdit?: boolean;
  runOnlyOnce?: boolean;
  objectKey?: string;
  type?: string;
  valueInitializer?: any;
  key?: string;
}

const initialState: WorkflowState = {
  filters: {},
  id: undefined,
  isEnabled: false,
  name: 'New Workflow',
  trigger: undefined,
  conditions: [],
  actions: [{ type: undefined, id: '' }],
  listFilters: undefined,
  anyoneCanEdit: false,
  runOnlyOnce: false,
  isLocked: false,
  isMissingInfo: true,
  isSubmitting: false,
  isDirty: false,
  logsFilters: {},
};

const WorkflowsContext = React.createContext<{
  state: WorkflowState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: undefined,
});
WorkflowsContext.displayName = 'WorkflowsContext';

function workflowManagementReducer(
  state: WorkflowState,
  action: { type: string; payload: any },
): WorkflowState {
  const { block, fieldIndex } = action?.payload || {};
  if (action?.payload?.isDirty) state.isDirty = action?.payload?.isDirty;
  switch (action?.type) {
    case workflowsContextActions.SET_TRIGGER: {
      const { trigger } = action?.payload || {};

      return {
        ...state,
        trigger,
        //reset the fields if the bobject type of the trigger is changed
        conditions: state.trigger === trigger ? state.conditions : [],
        actions:
          state.trigger?.bobjectType === trigger?.bobjectType
            ? state.actions
            : [{ type: undefined }],
      };
    }
    case workflowsContextActions.ADD_OR_CONDITION: {
      return {
        ...state,
        conditions: [
          ...state.conditions,
          [{ bobjectFieldId: undefined, value: { type: undefined } }],
        ],
      };
    }
    case workflowsContextActions.MISSING_INFO: {
      return {
        ...state,
        isMissingInfo: action.payload.value,
      };
    }
    case workflowsContextActions.SUBMITTING: {
      return {
        ...state,
        isSubmitting: action.payload.value,
      };
    }
    case workflowsContextActions.UPDATE_LOGS_FILTERS: {
      const { key, value } = action?.payload || {};
      return {
        ...state,
        logsFilters: { ...state?.logsFilters, [key]: value },
      };
    }
    case workflowsContextActions.ADD_AND_CONDITION: {
      state.conditions[block] = [
        ...state.conditions[block],
        { bobjectFieldId: undefined, value: { type: undefined } },
      ];

      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_AND_CONDITION_FIELD: {
      const field = action?.payload?.fieldId;
      state.conditions[block][fieldIndex] = { bobjectFieldId: field, value: { type: undefined } };
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_AND_CONDITION_VALUE: {
      const { value } = action?.payload || {};
      const pair = state.conditions[block][fieldIndex];
      state.conditions[block][fieldIndex] = { ...pair, value };

      return {
        ...state,
      };
    }

    case workflowsContextActions.REMOVE_CONDITIONS_VALUE_PAIR: {
      state.conditions[block] = [
        ...state.conditions[block].filter((pair: any, index: number) => index !== fieldIndex),
      ];

      return {
        ...state,
      };
    }
    case workflowsContextActions.REMOVE_CONDITIONS_BLOCK: {
      state.conditions = [
        ...state.conditions.filter((pair: any, index: number) => index !== action?.payload?.block),
      ];

      return {
        ...state,
      };
    }

    case workflowsContextActions.CLONE_CONDITIONS_BLOCK: {
      const clonedBlock = clone(state?.conditions[block]);
      state.conditions.splice(block, 0, clonedBlock);
      return {
        ...state,
      };
    }
    case workflowsContextActions.ADD_ACTIONS_BLOCK: {
      return {
        ...state,
        actions: [...state.actions, { type: undefined }],
      };
    }
    case workflowsContextActions.REMOVE_ACTIONS_BLOCK: {
      state.actions = state.actions.filter((a, index) => index !== block);
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_ACTION: {
      state.actions[block] = { ...action?.payload?.action };
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_STATUS: {
      state.isEnabled = action?.payload?.status;
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_CAN_OTHERS_EDIT: {
      state.anyoneCanEdit = action?.payload?.anyoneCanEdit;
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_RUN_ONCE: {
      state.runOnlyOnce = action?.payload?.runOnlyOnce;
      return {
        ...state,
      };
    }

    case workflowsContextActions.UPDATE_IS_LOCKED: {
      state.isLocked = action?.payload?.isLocked;
      return {
        ...state,
      };
    }

    case workflowsContextActions.UPDATE_IS_DIRTY: {
      state.isDirty = action?.payload?.isDirty;
      return {
        ...state,
      };
    }

    case workflowsContextActions.UPDATE_WORKFLOW_ID: {
      state.id = action?.payload?.id;
      return {
        ...state,
      };
    }

    case workflowsContextActions.ADD_ACTIONS_VALUE_PAIR: {
      const { objectKey } = action?.payload || {};
      state.actions[block][objectKey].push(objectKey === 'records' ? {} : '');
      return {
        ...state,
      };
    }
    case workflowsContextActions.ADD_ACTIONS_CLEAR_ARRAY: {
      state.actions[block].bobjectFieldIds.push('');
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_ACTION_TYPE: {
      const { valueInitializer } = action?.payload || {};
      let { type } = action?.payload || {};
      if (!type.includes('_FOR_ALL_LEADS')) {
        if (type.includes('START_CADENCE')) type = 'START_CADENCE';
        if (type.includes('STOP_CADENCE')) type = 'STOP_CADENCE';
        if (type.includes('TASK')) type = 'CREATE_TASK';
        if (type.includes('NOTIFICATION')) type = 'CREATE_NOTIFICATION';
        if (type.includes('REASSIGN') && type !== 'REASSIGN_FOR_ALL_LEADS') type = 'REASSIGN';
      }
      state.actions[block] = { type, ...valueInitializer };
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_ACTION_FIELD_UPDATE_FIELD: {
      const field = action?.payload?.fieldId;
      state.actions[block].properties[field] = undefined;
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_ACTION_ARRAY_FIELD: {
      const { fieldId } = action?.payload || {};
      state.actions[block].bobjectFieldIds[fieldIndex] = fieldId;
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_ACTION_VALUE_UPDATE_FIELD: {
      const { fieldId, value } = action?.payload || {};
      state.actions[block].properties[fieldId] = value;
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_ACTION_ORIGIN_COPY_FIELD: {
      const { fieldId } = action?.payload || {};
      state.actions[block].records?.push({ originFieldId: fieldId });
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_ACTION_TARGET_COPY_FIELD: {
      const { fieldId } = action?.payload || {};
      state.actions[block].records[fieldIndex].targetFieldId = fieldId;
      return {
        ...state,
      };
    }
    case workflowsContextActions.REMOVE_ACTION_ARRAY_VALUE: {
      const { key } = action?.payload || {};
      state.actions[block][key] = [
        ...state.actions[block][key].filter((pair: any, index: number) => index !== fieldIndex),
      ];
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_NOTIFICATION_TITLE: {
      state.actions[block].title = action?.payload?.value;
      return {
        ...state,
      };
    }
    case workflowsContextActions.UPDATE_NOTIFICATION_ASSIGNED_TO: {
      state.actions[block].assignedTo = action?.payload?.value;
      return {
        ...state,
      };
    }
    case workflowsContextActions.LOAD_WORKFLOW: {
      const workflow: Workflow = action?.payload?.workflow;
      return {
        ...state,
        id: workflow?.id,
        isEnabled: workflow?.isEnabled,
        isDirty: false,
        name: workflow?.name,
        authorName: workflow?.authorName,
        trigger: workflow.type,
        anyoneCanEdit: workflow?.anyoneCanEdit,
        runOnlyOnce: workflow?.runOnlyOnce,
        conditions: workflow?.filters?.map(monitoredFields => {
          return monitoredFields?.fields?.reduce((acc: Array<Condition>, curr) => {
            curr.monitors.forEach(monitor => {
              const { value, arrayValues, type } = monitor;
              if (!value && arrayValues) monitor = { type, value: arrayValues };
              return acc.push({ bobjectFieldId: curr?.fieldId, value: monitor });
            });
            return acc;
          }, []);
        }),

        actions: workflow.actions,
      };
    }
    case workflowsContextActions.UPDATE_FILTERS: {
      return {
        ...state,
        listFilters: action.payload.filters,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action?.type}`);
    }
  }
}

export function WorkflowsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(workflowManagementReducer, initialState);
  return (
    <WorkflowsContext.Provider value={{ state, dispatch }}>{children}</WorkflowsContext.Provider>
  );
}

export function useWorkflow() {
  const context = React.useContext<{ state: WorkflowState; dispatch: React.Dispatch<any> }>(
    WorkflowsContext,
  );
  if (context === undefined) {
    throw new Error(`useWorkflow must be used within a WorkflowProvider`);
  }
  const { state, dispatch } = context;

  const addOrBlock = () => {
    dispatchDirty({ type: workflowsContextActions.ADD_OR_CONDITION });
  };

  const removeOrBlock = (block: number) => {
    dispatchDirty({ type: workflowsContextActions.REMOVE_CONDITIONS_BLOCK, payload: { block } });
  };

  const cloneOrBlock = (block: number) => {
    dispatchDirty({ type: workflowsContextActions.CLONE_CONDITIONS_BLOCK, payload: { block } });
  };

  const addAndCondition = (block: number) => {
    dispatchDirty({ type: workflowsContextActions.ADD_AND_CONDITION, payload: { block } });
  };

  const removeAndCondition = (block: number, fieldIndex: number) => {
    dispatchDirty({
      type: workflowsContextActions.REMOVE_CONDITIONS_VALUE_PAIR,
      payload: { block, fieldIndex },
    });
  };
  const updateLogFilter = (key: string, value: any) => {
    dispatch({
      type: workflowsContextActions.UPDATE_LOGS_FILTERS,
      payload: { key, value },
    });
  };
  const updateFieldId = (block: number, fieldIndex: number, fieldId: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_AND_CONDITION_FIELD,
      payload: { block, fieldIndex, fieldId },
    });
  };
  const updateFieldValue = (block: number, fieldIndex: number, value: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_AND_CONDITION_VALUE,
      payload: { block, fieldIndex, value },
    });
  };
  const addActionBlock = () => {
    dispatchDirty({ type: workflowsContextActions.ADD_ACTIONS_BLOCK });
  };
  const removeActionBlock = (block: number) => {
    dispatchDirty({ type: workflowsContextActions.REMOVE_ACTIONS_BLOCK, payload: { block } });
  };

  const updateAction = (block: number, action: BloobirdsAction) => {
    dispatchDirty({ type: workflowsContextActions.UPDATE_ACTION, payload: { block, action } });
  };

  const updateStatus = (status: boolean) => {
    dispatch({ type: workflowsContextActions.UPDATE_STATUS, payload: { status } });
  };

  const updateIsLocked = (isLocked: boolean) => {
    dispatch({ type: workflowsContextActions.UPDATE_IS_LOCKED, payload: { isLocked } });
  };

  const updateIsDirty = (isDirty: boolean) => {
    dispatch({ type: workflowsContextActions.UPDATE_IS_DIRTY, payload: { isDirty } });
  };
  const updateWorkflowId = (id: string) => {
    dispatch({ type: workflowsContextActions.UPDATE_WORKFLOW_ID, payload: { id } });
  };

  const updateAnyoneCanEdit = (anyoneCanEdit: boolean) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_CAN_OTHERS_EDIT,
      payload: { anyoneCanEdit },
    });
  };
  const updateRunOnlyOnce = (runOnlyOnce: boolean) => {
    dispatchDirty({ type: workflowsContextActions.UPDATE_RUN_ONCE, payload: { runOnlyOnce } });
  };
  const addActionValuePair = (block: number, objectKey: string) => {
    dispatchDirty({
      type: workflowsContextActions.ADD_ACTIONS_VALUE_PAIR,
      payload: { block, objectKey },
    });
  };
  const addActionClearArray = (block: number) => {
    dispatchDirty({ type: workflowsContextActions.ADD_ACTIONS_CLEAR_ARRAY, payload: { block } });
  };
  const updateActionType = (block: number, type: string) => {
    let valueInitializer: any = {};

    isSubmitting(false);
    const getRelatedBobject = (type: string) => {
      const bobjectType = type.split('_').at(-1);
      return bobjectType.charAt(0) + bobjectType.slice(1).toLowerCase();
    };
    if (
      [
        WORKFLOWS_ACTIONS_TYPES_KEYS.CLEAR_PROPERTY,
        WORKFLOWS_ACTIONS_TYPES_KEYS.CLEAR_PROPERTY_FOR_ALL_LEADS,
      ].includes(type)
    ) {
      valueInitializer.bobjectFieldIds = [''];
    }
    if (
      [
        WORKFLOWS_ACTIONS_TYPES_KEYS.UPDATE_PROPERTY,
        WORKFLOWS_ACTIONS_TYPES_KEYS.UPDATE_PROPERTY_FOR_ALL_LEADS,
      ].includes(type)
    ) {
      isMissingInfo(true);
      valueInitializer.properties = {
        '': undefined,
      };
    }
    if (
      [
        WORKFLOWS_ACTIONS_TYPES_KEYS.COPY_PROPERTY,
        WORKFLOWS_ACTIONS_TYPES_KEYS.COPY_PROPERTY_FOR_ALL_LEADS,
      ].includes(type)
    )
      valueInitializer.records = [
        {
          originFieldId: undefined,
          targetFieldId: undefined,
        },
      ];
    if (type === WORKFLOWS_ACTIONS_TYPES_KEYS.CREATE_NOTIFICATION) {
      valueInitializer.bobjectType = state.trigger?.bobjectType;
    }
    if (
      type.includes(WORKFLOWS_ACTIONS_TYPES_KEYS.START_CADENCE) ||
      WORKFLOWS_ACTIONS_TYPES_KEYS.START_CADENCE_FOR_ALL_LEADS === type
    ) {
      isMissingInfo(false);
      valueInitializer = {
        bobjectType:
          getRelatedBobject(type) === 'Leads' ? BobjectTypes.Lead : getRelatedBobject(type),
        startDate: {
          days: 0,
          time: 0,
        },
      };
    }
    if (type.includes(WORKFLOWS_ACTIONS_TYPES_KEYS.CREATE_NOTIFICATION))
      valueInitializer = { bobjectType: getRelatedBobject(type) };
    if (type.includes(WORKFLOWS_ACTIONS_TYPES_KEYS.CREATE_TASK))
      valueInitializer = {
        targetBobjectType: getRelatedBobject(type),
        relativeDate: { days: 0, time: 0 },
      };
    if (type.includes(WORKFLOWS_ACTIONS_TYPES_KEYS.REASSIGN))
      valueInitializer = {
        bobjectType:
          getRelatedBobject(type) === 'Leads' ? BobjectTypes.Lead : getRelatedBobject(type),
        users: [],
      };
    if (
      type.includes(WORKFLOWS_ACTIONS_TYPES_KEYS.STOP_CADENCE) ||
      WORKFLOWS_ACTIONS_TYPES_KEYS.STOP_CADENCE_FOR_ALL_LEADS === type
    ) {
      isMissingInfo(false);
      valueInitializer = {
        bobjectType:
          getRelatedBobject(type) === 'Leads' ? BobjectTypes.Lead : getRelatedBobject(type),
      };
    }
    dispatchDirty({
      type: workflowsContextActions.UPDATE_ACTION_TYPE,
      payload: { block, type, valueInitializer },
    });
  };

  const isMissingInfo = (value: boolean) => {
    dispatch({
      type: workflowsContextActions.MISSING_INFO,
      payload: { value },
    });
  };
  const isSubmitting = (value: boolean) => {
    dispatch({
      type: workflowsContextActions.SUBMITTING,
      payload: { value },
    });
  };
  const updateActionFieldUpdateField = (block: number, fieldIndex: number, fieldId: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_ACTION_FIELD_UPDATE_FIELD,
      payload: { block, fieldIndex, fieldId },
    });
  };
  const updateActionValueUpdateField = (
    block: number,
    fieldIndex: number,
    fieldId: string,
    value: string,
  ) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_ACTION_VALUE_UPDATE_FIELD,
      payload: { block, fieldIndex, fieldId, value },
    });
  };
  const updateActionArrayField = (block: number, fieldIndex: number, fieldId: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_ACTION_ARRAY_FIELD,
      payload: { block, fieldIndex, fieldId },
    });
  };
  const updateActionOriginFieldCopyField = (block: number, fieldIndex: number, fieldId: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_ACTION_ORIGIN_COPY_FIELD,
      payload: { block, fieldIndex, fieldId },
    });
  };
  const updateNotificationTitle = (block: number, value: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_NOTIFICATION_TITLE,
      payload: { block, value },
    });
  };
  const updateNotificationAssignedUser = (block: number, value: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_NOTIFICATION_ASSIGNED_TO,
      payload: { block, value },
    });
  };
  const updateActionTargetFieldCopyField = (block: number, fieldIndex: number, fieldId: string) => {
    dispatchDirty({
      type: workflowsContextActions.UPDATE_ACTION_TARGET_COPY_FIELD,
      payload: { block, fieldIndex, fieldId },
    });
  };
  const removeActionArrayValue = (
    block: number,
    fieldIndex: number,
    key: WorkflowReducerPayload['key'],
  ) => {
    dispatchDirty({
      type: workflowsContextActions.REMOVE_ACTION_ARRAY_VALUE,
      payload: { block, fieldIndex, key },
    });
  };

  const dispatchDirty = ({ type, payload }: { type: string; payload?: WorkflowReducerPayload }) => {
    isSubmitting(false);
    return dispatch({ type, payload: { ...payload, isDirty: true } });
  };

  const loadWorkflow = (workflow: Workflow) => {
    isMissingInfo(false);
    dispatch({
      type: workflowsContextActions.LOAD_WORKFLOW,
      payload: { workflow },
    });
  };

  const updateFilters = (filters: any) => {
    dispatch({
      type: workflowsContextActions.UPDATE_FILTERS,
      payload: { filters },
    });
  };

  return {
    state,
    dispatch,
    addOrBlock,
    removeOrBlock,
    cloneOrBlock,
    addAndCondition,
    updateFieldId,
    updateFieldValue,
    removeAndCondition,
    addActionBlock,
    removeActionBlock,
    updateAction,
    addActionClearArray,
    updateStatus,
    addActionValuePair,
    removeActionArrayValue,
    updateActionType,
    updateActionFieldUpdateField,
    updateActionValueUpdateField,
    updateActionOriginFieldCopyField,
    updateActionTargetFieldCopyField,
    updateActionArrayField,
    updateNotificationTitle,
    updateNotificationAssignedUser,
    loadWorkflow,
    updateFilters,
    updateRunOnlyOnce,
    updateAnyoneCanEdit,
    updateIsLocked,
    isMissingInfo,
    isSubmitting,
    updateIsDirty,
    updateLogFilter,
    updateWorkflowId,
  };
}
