import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAggregationSubscription, useSearchSubscription } from '@bloobirds-it/plover';
import {
  BOBJECT_TYPES,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  formatDate,
  formatDateAsText,
  getUserTimeZone,
  parseUTCDateTimeToLocal,
  parseUTCDateToLocal,
} from '@bloobirds-it/utils';
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';
import { isEmpty } from 'lodash';
import {
  atom,
  DefaultValue,
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useEntity } from '.';
import { isDaily, isWeekly } from '../components/timetable/timetable.utils';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  IS_AUTOMATED_EMAIL_VALUES,
  TYPES_STATUS_VALUES_LOGIC_ROLE,
} from '../constants/activity';
import {
  getFieldByLogicRole,
  getOpportunityLeadsIds,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
} from '../utils/bobjects.utils';
import { useActiveActivitiesFilters } from './useActiveActivities';
import { useFullSalesEnabled } from './useFeatureFlags';

const LOGIC_ROLE_NAMES = {
  [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN]: 'LINKEDIN_MESSAGE',
  [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL]: 'EMAIL',
  [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL]: 'PHONE_CALL',
  [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND]: 'INBOUND',
  ACTIVITY__TYPE__STATUS: 'STATUS',
  [TYPES_STATUS_VALUES_LOGIC_ROLE.COMPANY_STATUS_CHANGED]: 'COMPANY_STATUS',
  [TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_STATUS_CHANGED]: 'OPPORTUNITY_STATUS',
};

// TODO: add unit test
const generateActivitiesData = async (activities, timeWindow) => {
  const activityData = {};
  activities.forEach(activity => {
    const activityTime = activity?.fieldDataList
      ?.find(f => f?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.TIME)
      ?.text?.substr(0, 23);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const activityDateUTC = parseUTCDateTimeToLocal(activityTime, timeZone);
    const activityDate = format(activityDateUTC, 'yyyy-MM-dd');

    const activityTypeLogicRole = activity?.fieldDataList.find(
      f => f?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
    )?.valueLogicRole;

    let activityName = LOGIC_ROLE_NAMES[activityTypeLogicRole];
    if (activityName === 'EMAIL') {
      const isBouncedEmail =
        activity?.fieldDataList?.find(
          f => f?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL,
        )?.text === 'Yes';
      const isAutoEmail =
        activity?.fieldDataList?.find(
          f => f?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
        )?.text === 'Yes';
      const getEmailStatus = () => {
        if (isAutoEmail) {
          return isBouncedEmail ? 'BOUNCED_AUTOMATED_EMAIL' : 'AUTOMATED_EMAIL';
        } else {
          return isBouncedEmail ? 'BOUNCED_EMAIL' : 'EMAIL';
        }
      };
      activityName = getEmailStatus();
    }
    if (activityName && activity?.value && activity?.fieldDataList?.length > 0) {
      if (isDaily(timeWindow)) {
        activityData[activityDate] = {
          ...activityData[activityDate],
          ...{ [activityName]: activity?.value },
        };
      } else {
        const start = isWeekly(timeWindow)
          ? startOfWeek(new Date(activityDate), { weekStartsOn: 1 })
          : startOfMonth(new Date(activityDate));
        const end = isWeekly(timeWindow)
          ? endOfWeek(new Date(activityDate), { weekStartsOn: 1 })
          : endOfMonth(new Date(activityDate));
        const dateRange = `${formatDate(start, 'yyyy-MM-dd')}/${formatDate(end, 'yyyy-MM-dd')}`;

        const totalValue =
          activityData[dateRange] && activityData[dateRange][activityName]
            ? parseInt(activity?.value, 10) + parseInt(activityData[dateRange][activityName], 10)
            : activity?.value;

        activityData[dateRange] = {
          ...activityData[dateRange],
          ...{ [activityName]: totalValue },
        };
      }
    }
  });

  return activityData;
};

// TODO: generate unit test
const generateStatusActivitiesData = async (activities, timeWindow) => {
  const activityData = {};

  activities.forEach(activity => {
    const activityTime = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const activityDateUTC = parseUTCDateTimeToLocal(activityTime, timeZone);
    const activityDate = format(activityDateUTC, 'yyyy-MM-dd');
    const activityStatusType = getFieldByLogicRole(
      activity,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS,
    )?.valueLogicRole;
    const activityName = activityStatusType && activityStatusType.split('__')[2];
    const activityStatusChangeFrom = getFieldByLogicRole(
      activity,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_FROM,
    )?.value;
    const activityStatusChangeTo = getFieldByLogicRole(
      activity,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_TO,
    )?.value;

    if (activityDate) {
      let dayData = [];
      if (isDaily(timeWindow)) {
        dayData = activityData[activityDate] || [];
        dayData.push({
          from: activityStatusChangeFrom,
          to: activityStatusChangeTo,
          name: activityName,
        });

        activityData[activityDate] = dayData;
      } else {
        const start = isWeekly(timeWindow)
          ? startOfWeek(new Date(activityDate), { weekStartsOn: 1 })
          : startOfMonth(new Date(activityDate));
        const end = isWeekly(timeWindow)
          ? endOfWeek(new Date(activityDate), { weekStartsOn: 1 })
          : endOfMonth(new Date(activityDate));
        const dateRange = `${formatDate(start, 'yyyy-MM-dd')}/${formatDate(end, 'yyyy-MM-dd')}`;

        dayData = activityData[dateRange] || [];
        dayData.push({
          from: activityStatusChangeFrom,
          to: activityStatusChangeTo,
          name: activityName,
        });

        activityData[dateRange] = dayData;
      }
    }
  });

  return activityData;
};

// TODO: generate unit test
const generateTasksData = async (tasks, timeWindow) => {
  const taskData = {};

  tasks.forEach(task => {
    const taskTime = task?.fieldDataList
      ?.find(f => f.logicRole === TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)
      ?.text.substr(0, 23);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const taskDateUTC = parseUTCDateToLocal(taskTime, timeZone);
    const taskDate = format(taskDateUTC, 'yyyy-MM-dd');
    const taskStatus = task?.fieldDataList?.find(
      field => field?.logicRole === TASK_FIELDS_LOGIC_ROLE.STATUS,
    )?.valueLogicRole;

    if (task?.value) {
      if (isDaily(timeWindow)) {
        taskData[taskDate] = {
          ...taskData[taskDate],
          ...(taskStatus !== TASK_STATUS_VALUE_LOGIC_ROLE.TODO
            ? { TASKS_COMPLETED: task?.value }
            : { TASKS: task?.value }),
        };
      } else {
        const start = isWeekly(timeWindow)
          ? startOfWeek(new Date(taskDate), { weekStartsOn: 1 })
          : startOfMonth(new Date(taskDate));
        const end = isWeekly(timeWindow)
          ? endOfWeek(new Date(taskDate), { weekStartsOn: 1 })
          : endOfMonth(new Date(taskDate));
        const dateRange = `${formatDate(start, 'yyyy-MM-dd')}/${formatDate(end, 'yyyy-MM-dd')}`;
        const totalValueCompleted =
          taskData[dateRange] && taskData[dateRange]?.TASKS_COMPLETED
            ? parseInt(task?.value, 10) + parseInt(taskData[dateRange]?.TASKS_COMPLETED, 10)
            : task?.value;
        const totalValueTodo =
          taskData[dateRange] && taskData[dateRange]?.TASKS
            ? parseInt(task?.value, 10) + parseInt(taskData[dateRange]?.TASKS, 10)
            : task?.value;

        taskData[dateRange] = {
          ...taskData[dateRange],
          ...(taskStatus !== TASK_STATUS_VALUE_LOGIC_ROLE.TODO
            ? { TASKS_COMPLETED: totalValueCompleted }
            : { TASKS: totalValueTodo }),
        };
      }
    }
  });

  return taskData;
};

// TODO: generate unit test
const generateProspectTasksData = async (tasks, actionsTypes, timeWindow, t) => {
  const taskData = {};

  tasks?.forEach(task => {
    const taskTime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
    const timeZone = getUserTimeZone();
    let taskDate;
    if (taskTime) {
      const templateId = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TEMPLATE);
      if (taskTime?.length > 10) {
        taskDate = formatDateAsText({ text: taskTime, patternFormat: '{iso-short}', t });
      } else {
        const taskDateUTC = parseUTCDateToLocal(taskTime, timeZone);
        taskDate = format(taskDateUTC, 'yyyy-MM-dd');
      }

      const taskActions = actionsTypes
        ?.map(action => {
          const actionKey = action?.enumName.includes('CALL') ? 'CALL' : action?.enumName;
          const actionName = action?.enumName;
          const taskIsAction =
            getFieldByLogicRole(task, TASK_ACTION[actionKey])?.valueLogicRole ===
            TASK_ACTION_VALUE[`${actionKey}_YES`];

          return taskIsAction ? actionName : undefined;
        })
        .filter(action => action !== undefined);

      if (isDaily(timeWindow)) {
        taskData[taskDate] = {
          ...taskData[taskDate],
          PROSPECT_TASKS: [
            ...new Set([...taskActions, ...(taskData[taskDate]?.PROSPECT_TASKS || [])]),
          ],
          ...(templateId && task?.id?.objectId
            ? { TEMPLATE_IDS: templateId, IDS: task?.id?.objectId }
            : {}),
        };
      } else {
        const start = isWeekly(timeWindow)
          ? startOfWeek(new Date(taskDate), { weekStartsOn: 1 })
          : startOfMonth(new Date(taskDate));
        const end = isWeekly(timeWindow)
          ? endOfWeek(new Date(taskDate), { weekStartsOn: 1 })
          : endOfMonth(new Date(taskDate));
        const dateRange = `${formatDate(start, 'yyyy-MM-dd')}/${formatDate(end, 'yyyy-MM-dd')}`;
        taskData[dateRange] = {
          ...taskData[dateRange],
          PROSPECT_TASKS: [...(taskData[dateRange]?.PROSPECT_TASKS || []), ...taskActions],
          ...(templateId && task?.id?.objectId
            ? {
                TEMPLATE_IDS: [...(taskData[dateRange]?.TEMPLATE_IDS || []), templateId],
                IDS: [...(taskData[dateRange]?.IDS || []), task?.id?.objectId],
              }
            : {}),
        };
      }
    }
  });

  return taskData;
};

const bobjectAtom = atom({
  key: 'timetableBobjectAtom',
  default: null,
});

const isFullSalesEnabledAtom = atom({
  key: 'timetableIsFullSalesEnabled',
  default: false,
});

const timeWindowFilterAtom = atom({
  key: 'timetableTimeWindowFilter',
  default: 'daily',
});

const kindFilterAtom = atom({
  key: 'timetableKindFilter',
  default: 'anyKind',
});

const leadFilterAtom = atom({
  key: 'timetableLeadFilter',
  default: 'any',
});

const clickedDateAtom = atom({
  key: 'timetableClickedDate',
  default: null,
});

const filtersAtom = selector({
  key: 'timetableFilters',
  get: ({ get }) => {
    const timeWindowFilter = get(timeWindowFilterAtom);
    const kindFilter = get(kindFilterAtom);
    const leadFilter = get(leadFilterAtom);
    const clickedDate = get(clickedDateAtom);

    return {
      timeWindow: timeWindowFilter,
      kind: kindFilter,
      lead: leadFilter,
      clickedDate,
    };
  },
  set: ({ set, reset }, value) => {
    if (value instanceof DefaultValue) {
      reset(timeWindowFilterAtom);
      reset(kindFilterAtom);
      reset(leadFilterAtom);
      reset(clickedDateAtom);
    } else {
      if (value.timeWindow) set(timeWindowFilterAtom, value.timeWindow);
      if (value.kind) set(kindFilterAtom, value.kind);
      if (value.lead) set(leadFilterAtom, value.lead);
      if (value.clickedDate) set(clickedDateAtom, value.clickedDate);
    }
  },
});

const tasksQueryAtom = selector({
  key: 'timetableTasksQuery',
  get: ({ get }) => {
    const bobject = get(bobjectAtom);
    const filters = get(filtersAtom);

    const query = {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.START_CADENCE],
      ...(isCompany(bobject) && bobject?.id.value
        ? { [TASK_FIELDS_LOGIC_ROLE.COMPANY]: bobject?.id.value }
        : {}),
      ...(isLead(bobject) && bobject?.id.value
        ? { [TASK_FIELDS_LOGIC_ROLE.LEAD]: bobject?.id.value }
        : {}),
      ...(isOpportunity(bobject) && bobject?.id.value
        ? { [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: bobject?.id.value }
        : {}),
    };

    if (filters?.lead !== 'any') {
      query[TASK_FIELDS_LOGIC_ROLE.LEAD] = [filters?.lead];
    }

    return bobject ? query : {};
  },
});

const activitiesQueryAtom = selector({
  key: 'timetableActivitiesQuery',
  get: ({ get }) => {
    const bobject = get(bobjectAtom);
    const filters = get(filtersAtom);

    const query = {
      ...(isCompany(bobject) ? { [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [bobject?.id.value] } : {}),
      ...(isLead(bobject) ? { [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [bobject?.id.value] } : {}),
      ...(isOpportunity(bobject)
        ? {
            [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [bobject?.id.value, '__MATCH_EMPTY_ROWS__'],
          }
        : {}),
    };

    if (filters?.lead !== 'any') {
      query[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = [filters?.lead];
    }

    if (isOpportunity(bobject)) {
      const leads = getOpportunityLeadsIds(bobject);
      query[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = leads?.length > 0 ? leads : null;
    }

    if (filters?.kind === 'attempts') {
      query[ACTIVITY_FIELDS_LOGIC_ROLE.IS_ATTEMPT] = ['ACTIVITY__IS_ATTEMPT__YES'];
    }
    if (filters?.kind === 'touches') {
      query[ACTIVITY_FIELDS_LOGIC_ROLE.IS_TOUCH] = ['Yes'];
    }
    if (filters?.kind === 'incoming') {
      query[ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION] = [ACTIVITY_DIRECTION.INCOMING];
    }
    if (filters?.kind === 'outgoing') {
      query[ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION] = [ACTIVITY_DIRECTION.OUTGOING];
    }

    return bobject ? query : {};
  },
});

export const useTimetableFilters = () => {
  const timeWindowFilter = useRecoilValue(timeWindowFilterAtom);
  const kindFilter = useRecoilValue(kindFilterAtom);
  const leadFilter = useRecoilValue(leadFilterAtom);
  const clickedDate = useRecoilValue(clickedDateAtom);
  const { setLeadFilter } = useActiveActivitiesFilters();

  const resetTimeWindowFilter = useResetRecoilState(timeWindowFilterAtom);
  const resetKindFilter = useResetRecoilState(kindFilterAtom);
  const resetLeadFilter = useResetRecoilState(leadFilterAtom);

  const resetAllFilters = useResetRecoilState(filtersAtom);
  const setFilters = useSetRecoilState(filtersAtom);

  return {
    timeWindowFilter,
    kindFilter,
    leadFilter,
    clickedDate,
    resetTimeWindowFilter,
    resetKindFilter,
    resetLeadFilter,
    resetAllFilters,
    setTimeWindowFilter: (timeWindow, clickedDateFilter) => {
      setFilters({ timeWindow, clickedDate: clickedDateFilter });
    },
    setKindFilter: value => {
      setFilters({ kind: value });
    },
    setLeadFilter: value => {
      setFilters({ lead: value });
      setLeadFilter(value);
    },
  };
};

export const useTimetableActivitiesAggregation = () => {
  const [activities, setActivities] = useState(null);
  const activitiesQuery = useRecoilValue(activitiesQueryAtom);
  const filters = useRecoilValue(filtersAtom);

  const { data, isValidating, error } = useAggregationSubscription(
    !isEmpty(activitiesQuery)
      ? {
          query: {
            [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [
              ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
              ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
              ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
              ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND,
            ],
            [ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
              IS_AUTOMATED_EMAIL_VALUES.NO,
              '__MATCH_EMPTY_ROWS__',
            ],
            ...activitiesQuery,
          },
          formFields: true,
          aggregations: [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE, ACTIVITY_FIELDS_LOGIC_ROLE.TIME],
        }
      : {},
    BOBJECT_TYPES.ACTIVITY,
  );
  const { data: { contents } = {} } = data || {};

  useEffect(async () => {
    if (contents) {
      const activityData = await generateActivitiesData(contents, filters?.timeWindow);
      setActivities(activityData);
    }
  }, [contents, filters?.timeWindow, filters?.lead]);

  return {
    data: activities,
    isLoading: !error && !data,
    isValidating,
  };
};

export const useTimetableAutoemailActivities = () => {
  const [activities, setActivities] = useState(null);
  const activitiesQuery = useRecoilValue(activitiesQueryAtom);
  const filters = useRecoilValue(filtersAtom);

  const { data, isValidating, error } = useAggregationSubscription(
    !isEmpty(activitiesQuery)
      ? {
          query: {
            [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL],
            [ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [IS_AUTOMATED_EMAIL_VALUES.YES],
            ...activitiesQuery,
          },
          formFields: true,
          aggregations: [
            ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
            ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
            ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
          ],
        }
      : {},
    BOBJECT_TYPES.ACTIVITY,
  );
  const { data: { contents } = {} } = data || {};
  useEffect(async () => {
    if (contents) {
      const activityData = await generateActivitiesData(contents, filters?.timeWindow);
      setActivities(activityData);
    }
  }, [contents, filters?.timeWindow, filters?.lead]);

  return {
    data: activities,
    isLoading: !error && !data,
    isValidating,
  };
};

export const useTimetableBouncedEmailActivities = () => {
  const [activities, setActivities] = useState(null);
  const activitiesQuery = useRecoilValue(activitiesQueryAtom);
  const filters = useRecoilValue(filtersAtom);

  const { data, isValidating, error } = useAggregationSubscription(
    !isEmpty(activitiesQuery)
      ? {
          query: {
            [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL],
            [ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
              '__MATCH_FULL_ROWS__',
              '__MATCH_EMPTY_ROWS__',
            ],
            [ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL]: [
              '__MATCH_FULL_ROWS__',
              '__MATCH_EMPTY_ROWS__',
            ],
            ...activitiesQuery,
          },
          formFields: true,
          aggregations: [
            ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
            ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
            ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
            ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL,
          ],
        }
      : {},
    BOBJECT_TYPES.ACTIVITY,
  );
  const { data: { contents } = {} } = data || {};

  useEffect(async () => {
    if (contents) {
      const activityData = await generateActivitiesData(contents, filters?.timeWindow);
      setActivities(activityData);
    }
  }, [contents, filters?.timeWindow, filters?.lead]);

  return {
    data: activities,
    isLoading: !error && !data,
    isValidating,
  };
};

export const useTimetableStatusActivities = () => {
  const [statusActivities, setStatusActivities] = useState(null);
  const timetableBobject = useRecoilValue(bobjectAtom);
  const filters = useRecoilValue(filtersAtom);

  const activityQuery = {
    query: {
      [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS]: [
        `ACTIVITY__TYPE_STATUS__${timetableBobject?.id.typeName.toUpperCase()}_STATUS_CHANGED`,
      ],
      ...(isCompany(timetableBobject)
        ? { [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: [timetableBobject?.id.value] }
        : {}),
      ...(isLead(timetableBobject)
        ? { [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [timetableBobject?.id.value] }
        : {}),
      ...(isOpportunity(timetableBobject)
        ? { [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [timetableBobject?.id.value] }
        : {}),
    },
    columns: [
      ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
      ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_FROM,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_TO,
    ],
    formFields: true,
    injectReferences: true,
    page: 0,
    pageSize: 5000,
    sort: [{ field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME, direction: 'DESC' }],
  };
  const { data, isValidating, error } = useSearchSubscription(
    activityQuery,
    BOBJECT_TYPES.ACTIVITY,
  );

  const { data: { contents } = {} } = data || {};

  useEffect(async () => {
    if (contents) {
      const activitiesData = await generateStatusActivitiesData(contents, filters?.timeWindow);
      setStatusActivities(activitiesData);
    }
  }, [contents, filters?.timeWindow]);

  return {
    data: statusActivities,
    isValidating,
    isLoading: !error && !data,
  };
};

export const useTimetableTasksAggregation = () => {
  const [tasks, setTasks] = useState(null);
  const queryTasks = useRecoilValue(tasksQueryAtom);
  const filters = useRecoilValue(filtersAtom);

  const { error, data, isValidating } = useAggregationSubscription(
    !isEmpty(queryTasks)
      ? {
          query: {
            ...queryTasks,
            [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.NEXT_STEP],
          },
          formFields: true,
          aggregations: [TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME],
        }
      : {},
    BOBJECT_TYPES.TASK,
  );
  const { data: { contents } = {} } = data || {};

  useEffect(async () => {
    if (contents) {
      const taskData = await generateTasksData(contents, filters?.timeWindow);
      setTasks(taskData);
    }
  }, [contents, filters?.timeWindow]);

  return {
    data: tasks,
    isValidating,
    isLoading: !error && !data,
  };
};

export const useTimetableProspectTasks = () => {
  const cadenceActionTypesEntity = useEntity('cadenceActionTypes');
  const cadenceActionTypes = cadenceActionTypesEntity?.all();
  const [prospectTasks, setProspectTasks] = useState(null);
  const queryTasks = useRecoilValue(tasksQueryAtom);
  const filters = useRecoilValue(filtersAtom);
  const { t } = useTranslation();

  const { data, isValidating, error } = useSearchSubscription(
    !isEmpty(queryTasks)
      ? {
          query: queryTasks,
          columns: [
            TASK_FIELDS_LOGIC_ROLE.TITLE,
            TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
            TASK_FIELDS_LOGIC_ROLE.TEMPLATE,
            TASK_ACTION.CALL,
            TASK_ACTION.EMAIL,
            TASK_ACTION.LINKEDIN_MESSAGE,
            TASK_ACTION.AUTOMATED_EMAIL,
          ],
          formFields: true,
          injectReferences: false,
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
          pageSize: 1000,
        }
      : {},
    BOBJECT_TYPES.TASK,
  );
  const { data: { contents } = {} } = data || {};

  useEffect(async () => {
    if (contents && cadenceActionTypes) {
      const taskData = await generateProspectTasksData(
        contents,
        cadenceActionTypes,
        filters?.timeWindow,
        t,
      );
      setProspectTasks(taskData);
    }
  }, [contents, filters?.timeWindow]);

  return {
    data: prospectTasks,
    isValidating,
    isLoading: !error && !data,
  };
};

export const useTimetable = ({ bobject }) => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const setTimetableBobject = useSetRecoilState(bobjectAtom);
  const setIsFullSalesEnabled = useSetRecoilState(isFullSalesEnabledAtom);

  useEffect(() => {
    setIsFullSalesEnabled(isFullSalesEnabled);
  }, [isFullSalesEnabled]);

  useEffect(() => {
    if (bobject) {
      setTimetableBobject(bobject);
    }
  }, [bobject]);
};
