import { useEffect, useMemo, useState } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { sortBy } from 'lodash';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useBobjectFields } from '../../../hooks/useBobjectFields';
import { api } from '../../../utils/api';
import { keepPreviousResponse } from '../../../utils/swr.utils';
import { useWorkflow } from './workflowEditionPage/context/workflowsContext';
import {
  CreateWorkflowRequest,
  Workflow,
  WorkflowType,
} from './workflowEditionPage/workflows.types';

const fetcher = (url: string) => api.get(url, {});

export interface UseWorkflows {
  workflows: Workflow[];
  bobjectFields: object;
  availableActions: WorkflowType[];
  handleDeleteWorkflow: (id: string) => void;
  handleUpdateWorkflow: (id: string, data: CreateWorkflowRequest) => void;
  handleCloneWorkflow: (id: string, newName: string) => Promise<void>;
  handleEnableWorkflow: (id: string, isEdit: boolean) => Promise<void>;
  handleDisableWorkflow: (id: string, data: CreateWorkflowRequest) => void;
  handleCreateWorkflow: ({
    body,
    setIsEditing,
    enable,
    setIsEnabled,
  }: {
    body: CreateWorkflowRequest;
    setIsEditing: (value: boolean) => void;
    setIsEnabled: (value: boolean) => void;
    enable: boolean;
  }) => void;
  handleResetWorkflowRuns: (id: string) => void;
  getWorkflowsBobjectFields: (id: string) => void;
}

const bobjectTypes = [
  BOBJECT_TYPES.COMPANY,
  BOBJECT_TYPES.LEAD,
  BOBJECT_TYPES.OPPORTUNITY,
  BOBJECT_TYPES.TASK,
  BOBJECT_TYPES.ACTIVITY,
];

export const useWorkflows = (): UseWorkflows => {
  const { updateIsDirty, updateWorkflowId } = useWorkflow();
  const { createToast } = useToasts();
  const { data: entities, mutate } = useSWR('/workflows/workflow', fetcher);

  const { data: actions } = useSWR('/workflows/workflow/available', fetcher);
  const { updateStatus } = useWorkflow();

  const handleDeleteWorkflow = async (id: string) => {
    await api.delete(`/workflows/workflow/${id}`, {});
    await mutate();
  };

  const getWorkflowsBobjectFields = (workflowBaseBobjectType: string) => {
    return useBobjectFields(workflowBaseBobjectType)?.sections?.reduce(
      (acc: { [key: string]: any }, section: { fields: Array<any> }) => {
        section?.fields?.forEach(field => {
          if (field?.type !== 'Reference') acc = { ...acc, [field?.name]: field };
        });
        return { ...acc };
      },
      {},
    );
  };

  const bobjectFieldsByType = bobjectTypes.map((bobjectType: string) =>
    useBobjectFields(bobjectType),
  );

  const bobjectFields = useMemo(() => {
    const fields: { [key: string]: object } = {};
    bobjectTypes.forEach((bobjectType: string, index) => {
      fields[bobjectType] = bobjectFieldsByType[index]?.sections?.reduce(
        (acc: { [key: string]: any }, section: { fields: Array<any> }) => {
          section?.fields?.forEach(field => {
            if (field?.type !== 'Reference') acc = { ...acc, [field?.name]: field };
          });
          return { ...acc };
        },
        {},
      );
    });
    return fields;
  }, [bobjectFieldsByType]);

  const handleCreateWorkflow = ({
    body,
    setIsEditing,
    enable,
    setIsEnabled,
  }: {
    body: CreateWorkflowRequest;
    setIsEditing: (value: boolean) => void;
    setIsEnabled: (value: boolean) => void;
    enable: boolean;
  }) => {
    mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_CREATED, {
      runOnlyOnce: body?.runOnlyOnce,
      anyoneCanEdit: body?.anyoneCanEdit,
    });
    api
      .post(`/workflows/workflow`, body)
      .then(res => {
        createToast({ message: 'Workflow created successfully', type: 'success' });
        mutate();
        updateIsDirty(false);
        updateWorkflowId(res?.data?.id);
        if (enable) {
          mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_ENABLED);
          handleEnableWorkflow(res?.data?.id, false).then(() => {
            updateStatus(true);
            setIsEnabled(true);
          });
        }
        setIsEditing(true);
      })
      .catch(e => {
        if (e?.response?.status === 400) {
          createToast({
            message: 'Something went wrong',
            type: 'error',
          });
        } else {
          createToast({ message: e?.response?.data?.error, type: 'error' });
        }
      });
  };

  const handleUpdateWorkflow = (id: string, updates: CreateWorkflowRequest) => {
    mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_UPDATE);
    api
      .patch(`/workflows/workflow/${id}`, updates)
      .then(() => {
        createToast({ message: 'Workflow edited successfully', type: 'success' });
        mutate();
        updateIsDirty(false);
      })
      .catch(e => {
        createToast({
          message:
            e?.response?.data?.error || 'Workflow could not be saved. Pease try again later.',
          type: 'error',
        });
      });
  };

  const handleEnableWorkflow = async (id: string, isEdit: boolean) => {
    mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_ENABLED);
    const res = await api.post(`/workflows/workflow/${id}/enable`);
    if (isEdit && res) updateStatus(true);
    await mutate();
  };

  const handleDisableWorkflow = async (id: string) => {
    mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_DISABLED);
    await api.post(`/workflows/workflow/${id}/disable`);
    updateStatus(false);
    await mutate();
  };

  const handleResetWorkflowRuns = async (id: string) => {
    await api.delete(`/workflows/workflow/${id}/runs`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    });
    await mutate();
  };

  const handleCloneWorkflow = async (id: string, newName: string) => {
    mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_CLONED);
    const workflowClone = {
      name: newName,
    };
    await api.post(`workflows/workflow/${id}/clone`, workflowClone);
    await mutate();
  };

  return {
    workflows: sortBy(entities?.data, 'updatedAt').reverse() || [],
    bobjectFields,
    availableActions: actions?.data,
    handleDeleteWorkflow,
    handleUpdateWorkflow,
    handleCloneWorkflow,
    handleDisableWorkflow,
    handleEnableWorkflow,
    handleCreateWorkflow,
    getWorkflowsBobjectFields,
    handleResetWorkflowRuns,
  };
};

export const useWorkflowsLogs = ({
  id,
  dateRange,
  showEditionOnly,
  associatedBobjects,
}: {
  id: string;
  dateRange: any;
  showEditionOnly: boolean;
  associatedBobjects: any;
}) => {
  const [offset, setOffset] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const loadNextPage = () => setOffset(offset + 1);
  const getParams = () => {
    let args: {
      offset: number;
      limit: number;
      dateFrom: string;
      dateTo: string;
      lead: string;
      company: string;
    } = {
      offset: 0,
      limit: 20 * offset,
      dateFrom: undefined,
      dateTo: undefined,
      company: associatedBobjects?.Company,
      lead: associatedBobjects?.Lead,
    };
    if (dateRange?.dateTo)
      args = {
        ...args,
        ...dateRange,
      };
    return args;
  };
  const params = useMemo(() => getParams(), [id, dateRange, associatedBobjects, offset]);
  const url = showEditionOnly ? `/logging/workflow/${id}/edition` : `/logging/workflow/${id}`;

  const { data: logs, isValidating } = useSWR(
    [url, ...Object.values(params)],
    ([url, values]) =>
      api.get(url, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
        params,
      }),
    { use: [keepPreviousResponse] },
  );

  useEffect(() => {
    if (logs?.data?.length < 20 * offset) {
      setHasNextPage(false);
    }
  }, [logs]);

  return {
    workflowLogs: logs?.data,
    isValidating: isValidating && offset === 1,
    loadNextPage,
    hasNextPage,
  };
};
