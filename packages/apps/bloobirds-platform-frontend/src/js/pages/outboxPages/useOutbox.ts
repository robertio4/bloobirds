import { useEffect, useMemo } from 'react';

import { useAggregationSubscription, useSearchSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  SearchSort,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { keepPreviousResponse, endOfDay, injectReferencesSearchProcess } from '@bloobirds-it/utils';
import {
  atom,
  RecoilValue,
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useEntity } from '../../hooks';
import SessionManagerFactory from '../../misc/session';
import {
  COMPANY_COLUMNS,
  LEAD_COLUMNS,
  LEAD_REFERENCED_COLUMNS,
  TASK_COLUMNS,
  TASK_REFERENCED_COLUMNS,
} from './outbox.constants';

const SessionManager = SessionManagerFactory();

const PAGE_SIZE = 20;

const COLUMNS_BY_BOBJECT_TYPE = {
  [BobjectTypes.Company]: COMPANY_COLUMNS,
  [BobjectTypes.Lead]: LEAD_COLUMNS,
  [BobjectTypes.Task]: TASK_COLUMNS,
};

const COLUMNS_REFERENCED_BY_BOBJECT_TYPE = {
  [BobjectTypes.Company]: null as any,
  [BobjectTypes.Lead]: LEAD_REFERENCED_COLUMNS,
  [BobjectTypes.Task]: TASK_REFERENCED_COLUMNS,
};

export const getTaskAggregationQuery = (taskTypeLR: any, customQuery: any) => ({
  query: {
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
    [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: Array.isArray(taskTypeLR) ? taskTypeLR : [taskTypeLR],
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
    ],
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        lte: endOfDay(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
    ...(customQuery || {}),
  },
  formFields: false,
});

const BASE_OUTBOX_SEARCH_REQUEST = {
  formFields: true,
  pageSize: 1000,
  injectReferences: true,
};

const itemsAtom = atom({
  key: 'outboxItemsAtom',
  default: [],
});

const responseAtom = selector({
  key: 'outboxResponse',
  get: () => null,
  set: ({ set }, response) => {
    set(itemsAtom, response.contents);
  },
});

type OutboxBobjectTypes = BobjectTypes.Company | BobjectTypes.Lead | BobjectTypes.Task;

export const useOutboxItems = (
  tabQuery: any,
  tabSort: SearchSort[],
  tabPageAtom: RecoilValue<number>,
  queries: any,
  bobjectType = BobjectTypes.Task,
) => {
  const page = tabPageAtom ? useRecoilValue(tabPageAtom) : null;
  const setResponse = useSetRecoilState(responseAtom);
  const items = useRecoilValue(itemsAtom);
  const resetItems = useResetRecoilState(itemsAtom);
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType as OutboxBobjectTypes];
  const bobjectFields = useEntity('bobjectFields');
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType as OutboxBobjectTypes];
  const referencedColumnsVariables = [
    ...referencedColumns,
    // eslint-disable-next-line no-unsafe-optional-chaining
    ...bobjectFields
      ?.all()
      ?.filter(bf => bf?.templateVariable)
      ?.map(bf => bf?.logicRole || bf?.id),
  ];

  const { data, error, isLoading } = useSearchSubscription(
    {
      query: tabQuery,
      // @ts-ignore
      queries,
      columns,
      referencedColumns: referencedColumnsVariables,
      sort: tabSort,
      ...BASE_OUTBOX_SEARCH_REQUEST,
      pageSize: page ? (page as number) * PAGE_SIZE : 1000,
      page: 0,
    },
    bobjectType,
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  return { items, isLoading, totalMatching, resetItems };
};

export const useOutboxGlobalAggregation = () => {
  const { data: scheduledData } = useAggregationSubscription(
    getTaskAggregationQuery([TASK_TYPE.SCHEDULED_EMAIL], {
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
      ],
    }),
    BobjectTypes.Task,
  );
  const scheduledCounter = scheduledData?.data?.contents[0]?.value;

  const { data: automatedData } = useAggregationSubscription(
    getTaskAggregationQuery([TASK_TYPE.PROSPECT_CADENCE], {
      [TASK_ACTION.AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES],
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
      ],
    }),
    BobjectTypes.Task,
    [keepPreviousResponse],
  );
  const automatedCounterData = automatedData?.data?.contents;
  const automatedCounter =
    automatedCounterData && automatedCounterData.length ? automatedCounterData[0]?.value : 0;

  return (scheduledCounter || 0) + automatedCounter;
};
