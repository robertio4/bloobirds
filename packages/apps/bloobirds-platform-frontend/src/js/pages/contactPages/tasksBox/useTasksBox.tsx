import { useEffect, useMemo } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
  TASK_ACTION,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  BOBJECT_TYPES,
} from '@bloobirds-it/types';
import { injectReferencesSearchProcess } from '@bloobirds-it/utils';
import { endOfDay } from 'date-fns';
import { atom, selector, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useEntity } from '../../../hooks';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';

type QuerySelectorParams = {
  companyId: string | undefined;
  leadId: string | undefined;
  opportunityId: string | undefined;
  shouldRefetch?: boolean;
};

const TASKS_STATUSES = [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE];

export const TASK_COLUMNS = [
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  TASK_FIELDS_LOGIC_ROLE.STATUS,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  TASK_FIELDS_LOGIC_ROLE.COMPLETED_DATE,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  TASK_FIELDS_LOGIC_ROLE.DESCRIPTION,
  TASK_FIELDS_LOGIC_ROLE.CADENCE,
  TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
  TASK_FIELDS_LOGIC_ROLE.AUTOMATION_ERROR,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
  TASK_ACTION.AUTOMATED_EMAIL,
  TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY,
  TASK_FIELDS_LOGIC_ROLE.STEP_ID,
  TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_MODE,
  TASK_FIELDS_LOGIC_ROLE.PRIORITY,
];

export const ACTIVITY_COLUMNS = [
  ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
  ACTIVITY_FIELDS_LOGIC_ROLE.TITLE,
  ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
  ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
  ACTIVITY_FIELDS_LOGIC_ROLE.USER,
  ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
];

export const REFERENCED_COLUMNS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE,
  COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  LEAD_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.STATUS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
  LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  LEAD_FIELDS_LOGIC_ROLE.TIME_ZONE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT,
  ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
];

const itemsAtom = atom({
  key: 'tasksBoxItemsAtom',
  default: [],
});

const activityItemsAtom = atom({
  key: 'tasksBoxActivityItemsAtom',
  default: [],
});

const responseAtom = selector({
  key: 'tasksBoxResponse',
  get: () => null,
  set: ({ set }, response) => {
    const { contents }: any = response;
    set(itemsAtom, contents);
  },
});

const activityResponseAtom = selector({
  key: 'activityTaskBoxResponse',
  get: () => null,
  set: ({ set }, response) => {
    const { contents }: any = response;
    set(activityItemsAtom, contents);
  },
});

export const useTasksBox = ({
  companyId,
  leadId,
  opportunityId,
  shouldRefetch,
}: QuerySelectorParams) => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const taskQuery = useMemo(() => {
    return {
      ...(companyId ? { [TASK_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] } : {}),
      ...(isFullSalesEnabled
        ? { [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunityId ? [opportunityId] : undefined }
        : { [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'] }),
      ...(leadId ? { [TASK_FIELDS_LOGIC_ROLE.LEAD]: [leadId] } : {}),
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASKS_STATUSES,
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [
        TASK_TYPE.PROSPECT_CADENCE,
        TASK_TYPE.CONTACT_BEFORE_MEETING,
        TASK_TYPE.NEXT_STEP,
      ],
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
        query: {
          lte: endOfDay(new Date()),
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
  }, [companyId, leadId, opportunityId, isFullSalesEnabled]);
  const activityQuery = useMemo(() => {
    return {
      ...(companyId ? { [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] } : {}),
      ...(isFullSalesEnabled
        ? { [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunityId ? [opportunityId] : undefined }
        : { [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'] }),
      ...(leadId ? { [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [leadId] } : {}),
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: [
        REPORTED_VALUES_LOGIC_ROLE.NO,
        '__MATCH_EMPTY_ROWS__',
      ],
      [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: '__MATCH_FULL_ROWS__',
      [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
        query: {
          lte: endOfDay(new Date()),
        },
        searchMode: 'RANGE__SEARCH',
      },
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
    };
  }, [companyId, leadId, opportunityId, isFullSalesEnabled]);
  const setResponse = useSetRecoilState(responseAtom);
  const setActivityRespone = useSetRecoilState(activityResponseAtom);
  const items = useRecoilValue(itemsAtom);
  const resetItems = useResetRecoilState(itemsAtom);
  const activityItems = useRecoilValue(activityItemsAtom);
  const resetActivityItems = useResetRecoilState(activityItemsAtom);
  const noteFieldId = useEntity('bobjectFields')
    ?.filterBy('name', 'Note')
    ?.find((field: any) => !field?.logicRole)?.id;

  const { data: tasksData, error: tasksError, mutate: tasksMutate } = useSearchSubscription(
    !companyId && !leadId && !opportunityId
      ? null
      : {
          query: taskQuery,
          columns: [...TASK_COLUMNS, noteFieldId],
          referencedColumns: REFERENCED_COLUMNS,
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
          formFields: true,
          injectReferences: true,
          pageSize: 1000,
          page: 0,
        },
    BOBJECT_TYPES.TASK,
  );

  const {
    data: meetingsData,
    error: meetingsError,
    mutate: meetingsMutate,
  } = useSearchSubscription(
    !companyId && !leadId && !opportunityId
      ? null
      : {
          query: activityQuery,
          columns: [...ACTIVITY_COLUMNS, noteFieldId],
          referencedColumns: REFERENCED_COLUMNS,
          sort: [
            {
              field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
              direction: 'ASC',
            },
          ],
          formFields: true,
          injectReferences: true,
          pageSize: 1000,
          page: 0,
        },
    BOBJECT_TYPES.ACTIVITY,
  );

  useEffect(() => {
    if (shouldRefetch) {
      tasksMutate();
      meetingsMutate();
    }
  }, [shouldRefetch]);

  useEffect(() => {
    if (tasksError) {
      console.error(tasksError);
    }
  }, [tasksError]);

  useEffect(() => {
    if (meetingsError) {
      console.error(meetingsError);
    }
  }, [meetingsError]);

  useEffect(() => {
    if (tasksData?.data) {
      const extendedResponse = injectReferencesSearchProcess(tasksData?.data);
      setResponse(extendedResponse);
    }
  }, [tasksData]);

  useEffect(() => {
    if (meetingsData?.data) {
      const extendedResponse = injectReferencesSearchProcess(meetingsData?.data);
      setActivityRespone(extendedResponse);
    }
  }, [meetingsData]);

  const totalMatching = useMemo(
    () => tasksData?.data.totalMatching + meetingsData?.data?.totalMatching,
    [tasksData, meetingsData],
  );
  return {
    items: [...activityItems, ...items],
    isLoading: !tasksData || !meetingsData,
    totalMatching,
    resetItems: () => {
      resetItems();
      resetActivityItems();
    },
  };
};
