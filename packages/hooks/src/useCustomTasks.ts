import { useState } from 'react';

import { CustomTask } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export const fetchCustomTasks = ([url, showDisabled]) => {
  return api
    .get<CustomTask[]>(`/utils/customTask`, {
      params: showDisabled ? {} : { enabled: !showDisabled },
    })
    .then(res => res.data);
};

export const useCustomTasks = (options?: { disabled?: boolean } | undefined) => {
  const [showDisabled, setShowDisabled] = useState<boolean>(options?.disabled);
  const { data: customTasks, mutate } = useSWR<CustomTask[]>(
    [`customTask${showDisabled ? '' : '?enabled=true'}`, showDisabled],
    fetchCustomTasks,
  );

  function getCustomTaskLogicRole(customTaskId: string) {
    const customTask = customTasks?.find(ct => ct.id === customTaskId);
    return customTask?.logicRole;
  }
  function getCustomTaskByLogicRole(logicRole: string) {
    return customTasks?.find(ct => ct.logicRole === logicRole);
  }

  function getCustomTaskById(customTaskId: string) {
    return customTasks?.find(ct => ct.id === customTaskId);
  }

  return {
    getCustomTaskLogicRole,
    getCustomTaskByLogicRole,
    getCustomTaskById,
    customTasks,
    mutate,
    setShowDisabled,
    showDisabled,
  };
};
