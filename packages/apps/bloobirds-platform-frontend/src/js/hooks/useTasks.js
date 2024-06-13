import { useEffect, useMemo } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  BOBJECT_TYPES,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { addDays, startOfDay, subDays, injectReferencesSearchProcess } from '@bloobirds-it/utils';
import * as Sentry from '@sentry/react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useUserSettings } from '../components/userPermissions/hooks';

const BASE_TASK_SEARCH_REQUEST = {
  injectReferences: true,
  formFields: true,
  pageSize: 1000,
};

const PAGE_SIZE = 15;

const itemsAtom = atom({
  key: 'taskItemsAtom',
  default: [],
});

const responseAtom = selector({
  key: 'tasksResponse',
  get: () => null,
  set: ({ set }, response) => {
    set(itemsAtom, response.contents);
  },
});

const pageAtom = atom({
  key: 'tasksPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'tasksHasNextPage',
  default: true,
});

export const useTasksPage = () => {
  const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return {
    hasNextPage,
    loadNextPage,
    setHasNextPage,
  };
};

export const useTasks = taskTypeLR => {
  const settings = useUserSettings();
  const setResponse = useSetRecoilState(responseAtom);
  const page = useRecoilValue(pageAtom);
  const items = useRecoilValue(itemsAtom);
  const resetItems = useResetRecoilState(itemsAtom);
  const taskRequest = useMemo(
    () => ({
      query: {
        [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: [settings?.user.id],
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
          query: {
            gte: startOfDay(subDays(new Date(), 90)),
            lte: startOfDay(addDays(new Date(), 5)),
          },
          searchMode: 'RANGE__SEARCH',
        },
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: Array.isArray(taskTypeLR) ? taskTypeLR : [taskTypeLR],
      },
      ...BASE_TASK_SEARCH_REQUEST,
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: 'ASC',
        },
        {
          field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
          direction: 'ASC',
        },
      ],
      pageSize: page ? page * PAGE_SIZE : 1000,
      page: 0,
    }),
    [settings, taskTypeLR, page],
  );
  const { data, error, isLoading } = useSearchSubscription(taskRequest, BOBJECT_TYPES.TASK);

  useEffect(() => {
    if (error) {
      console.error(error);
      Sentry.captureException(error, {
        tags: {
          module: 'useTasks',
        },
        extra: {
          origin: 'Error on the task subscription',
        },
      });
    }
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { tasks: items, isLoading, totalMatching, resetItems };
};
