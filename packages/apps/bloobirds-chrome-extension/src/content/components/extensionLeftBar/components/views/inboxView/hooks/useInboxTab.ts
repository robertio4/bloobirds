import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDidMountEffect } from '@bloobirds-it/hooks';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectPicklistValueEntity,
  BobjectTypes,
  CUSTOM_TASK_TYPES,
  DATA_SOURCES,
  DIRECTION_VALUES_LOGIC_ROLE,
  MessagesEvents,
  REPORTED_VALUES_LOGIC_ROLE,
  UserPermission,
} from '@bloobirds-it/types';
import {
  api,
  endOfDay,
  generateDatePrefix,
  getDateTimestampString,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  injectReferencesSearchProcess,
  startOfDay,
  subDays,
  formatDate,
} from '@bloobirds-it/utils';
import { isSameDay, isValid, parse } from 'date-fns';
import { TFunction } from 'i18next';
import useSWR from 'swr';

import { SearchMode } from '../../../../../../../types/moreFilters';
import { useSubscribeListeners } from '../../../../../contactView/hooks/useSubscribeListeners';
import { useExtensionContext } from '../../../../../context';
import { TypeSearch } from '../../../../extensionLeftBar.utils';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { BASE_SEARCH_REQUEST } from '../../view.utils';
import { addActivityDateGrouping, addDateGrouping } from '../utils';

const PAGE_SIZE = 1000;

const getActivitiesByType = (activities: Bobject[], type: string) => {
  return activities?.filter(activity => {
    const activityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
      ?.valueLogicRole;
    return activityType === type;
  });
};

const addConversationGrouping = (conversations: any, t: TFunction, language: string) =>
  Object.keys(conversations).map((leadId, index) => {
    const lastMessage = conversations[leadId]?.lastMessage;
    const lastMessageDate = new Date(
      getValueFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.TIME),
    );

    const previousLeadId = Object.keys(conversations)[index - 1];
    const previous = conversations[previousLeadId];
    const previousLastMessage = previous?.lastMessage;
    const previousItemDate =
      previousLastMessage &&
      new Date(getValueFromLogicRole(previousLastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));

    const formatStr =
      language === 'en' ? '{month} {date-ordinal}, {year}' : '{date} {month} {year}';
    const formattedDay = isValid(lastMessageDate)
      ? getI18nSpacetimeLng(language, lastMessageDate).format(formatStr)
      : '';
    const dateDay = isValid(lastMessageDate)
      ? parse(formatDate(lastMessageDate, 'MMMM do, yyyy'), 'MMMM do, yyyy', new Date())
      : '';
    const hashDate = getDateTimestampString(lastMessageDate);

    return {
      ...conversations[leadId],
      activityDate: {
        date: lastMessageDate,
        isFirstOfDay: !previousItemDate || !isSameDay(lastMessageDate, previousItemDate),
        day: dateDay,
        formattedDate: formattedDay,
        prefix: generateDatePrefix(lastMessageDate, false, t),
        hashDate,
      },
    };
  });

const getLinkedinActivitiesGrupedByLead = (
  data: any,
  type: any,
  allowActivitiesWithoutObject: boolean,
) => {
  if (data?.length > 0) {
    const activitiesByLead = {};
    data?.forEach(activity => {
      const activityLeadField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
      const activityCompanyField = getFieldByLogicRole(
        activity,
        ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
      );
      const phone = getFieldByLogicRole(
        activity,
        ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER,
      );
      let activityLead = activityLeadField?.value ? activityLeadField : activityCompanyField;
      if (!activityLead.value && phone?.value && allowActivitiesWithoutObject) {
        activityLead = phone;
      }

      const values = activitiesByLead[activityLead?.value]?.messages || [];
      const itemDirection = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)
        ?.valueLogicRole;
      const reportedStatus = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
        ?.valueLogicRole;
      const isReported = (value, direction) =>
        value === REPORTED_VALUES_LOGIC_ROLE.YES ||
        direction === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
      const message = {
        ...activity,
        messageStatus: {
          isReported: isReported(reportedStatus, itemDirection),
        },
      };
      activitiesByLead[activityLead?.value] = {
        id: activityLead?.value,
        messages: [...values, message],
        lastMessage: activity,
        type: type,
      };
    });

    const sortedLeadsId = Object.keys(activitiesByLead).sort((leadA, leadB) => {
      const lastMessageLeadA = activitiesByLead[leadA].lastMessage;
      const lastMessageLeadB = activitiesByLead[leadB].lastMessage;
      const lastMessageLeadADate =
        lastMessageLeadA && getTextFromLogicRole(lastMessageLeadA, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
      const lastMessageLeadBDate =
        lastMessageLeadB && getTextFromLogicRole(lastMessageLeadB, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);

      return lastMessageLeadADate > lastMessageLeadBDate ? -1 : 1;
    });

    const sortedActivitiesByLead = {};

    sortedLeadsId?.forEach(leadId => (sortedActivitiesByLead[leadId] = activitiesByLead[leadId]));

    return sortedActivitiesByLead;
  } else {
    return [];
  }
};

const fetchInbox = (
  query: { [x: string]: any },
  queries: { [x: string]: any },
  accountId: string,
  page: number,
  type: TypeSearch = TypeSearch.SEARCH,
  setIsLoading: (value: boolean) => void,
) => {
  return api
    .post(`/bobjects/${accountId}/Activity/${type}`, {
      query,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: 'ASC',
        },
      ],
      queries:
        queries && Object.keys(queries).length > 0
          ? [queries]
          : [
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL],
              },
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL],
                [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: [DIRECTION_VALUES_LOGIC_ROLE.INCOMING],
              },
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN],
                [ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE]: [DATA_SOURCES.CHROME_EXTENSION],
              },
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK],
                [ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK_TYPE]: {
                  query: [CUSTOM_TASK_TYPES.WHATSAPP_BUSINESS],
                  searchMode: SearchMode.EXACT,
                },
                [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: [DIRECTION_VALUES_LOGIC_ROLE.INCOMING],
              },
            ],
    })
    .then(response => {
      setIsLoading?.(false);
      return response;
    });
};

const getData = (key: string, page: number) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const { query, subquery, setIsLoading } = useSubhomeContext();

  const { data, mutate, isValidating } = useSWR(key, () =>
    fetchInbox(query, subquery, accountId, page, TypeSearch.SEARCH, setIsLoading),
  );

  useDidMountEffect(() => {
    setIsLoading?.(true);
    mutate();
  }, [query]);

  useSubscribeListeners(BobjectTypes.Activity, mutate);

  return { data, mutate, isValidating };
};

export const useInboxTab = () => {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const { selectedQuickFilter } = useSubhomeContext();
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const isWhatsappAdmin = settings?.user?.permissions?.includes(
    UserPermission.WHATSAPP_BUSINESS_ADMIN,
  );
  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const { data, mutate, isValidating } = getData(
    `/bobjects/inbox/query/${selectedQuickFilter?.id || 'all'}/${page}`,
    page,
  );

  const filteredActivities = useMemo(
    () => data && injectReferencesSearchProcess(data?.data)?.contents,
    [data],
  );

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  const {
    filteredCallActivities,
    filteredEmailActivities,
    nonReportedLinkedinActivities,
    linkedinActivitiesByLead,
    filteredWhatsAppActivites,
  } = useMemo(() => {
    const callActivities = getActivitiesByType(
      filteredActivities,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
    );
    const callTypeActivities =
      callActivities?.map(activity => {
        return { ...activity, type: ACTIVITY_TYPES.CALL };
      }) || [];
    const filteredCallActivities = addActivityDateGrouping(
      callTypeActivities,
      ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      t,
      i18n.language,
    );

    const emailActivities = getActivitiesByType(
      filteredActivities,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
    );
    const emailTypeActivities =
      emailActivities?.map(activity => {
        return { ...activity, type: ACTIVITY_TYPES.EMAIL };
      }) || [];
    const filteredEmailActivities = addActivityDateGrouping(
      emailTypeActivities,
      ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      t,
      i18n.language,
    );

    const linkedinActivitiesByLead = getLinkedinActivitiesGrupedByLead(
      getActivitiesByType(filteredActivities, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN),
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
      false,
    );
    const filteredLinkedinActivities = Object.values(
      addConversationGrouping(linkedinActivitiesByLead, t, i18n.language),
    );
    const nonReportedLinkedinActivities = filteredLinkedinActivities.filter(
      ({ messages }) =>
        messages.filter(({ messageStatus }) => !messageStatus?.isReported).length > 0,
    );

    const whatsAppActivitiesByObject = getLinkedinActivitiesGrupedByLead(
      getActivitiesByType(filteredActivities, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK),
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK,
      isWhatsappAdmin,
    );
    const filteredWhatsAppActivites = Object.values(
      addConversationGrouping(whatsAppActivitiesByObject, t, i18n.language),
    );

    return {
      filteredCallActivities,
      filteredEmailActivities,
      nonReportedLinkedinActivities,
      linkedinActivitiesByLead,
      filteredWhatsAppActivites,
    };
  }, [data, i18n.language]);

  const inboxActivities = [
    ...filteredCallActivities,
    ...filteredEmailActivities,
    ...nonReportedLinkedinActivities,
    ...filteredWhatsAppActivites,
  ];

  inboxActivities.sort((a, b) => b.activityDate.date - a.activityDate.date);

  return {
    items: addDateGrouping(inboxActivities),
    calls: filteredCallActivities,
    emails: filteredEmailActivities,
    linkedin: linkedinActivitiesByLead,
    whatsapp: filteredWhatsAppActivites,
    isLoading: isValidating,
    totalMatching,
    mutate,
    fetchNextPage,
  };
};

export const useMarkAsDone = mutate => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const updateActivities = (isBulkAction: boolean, body: any, activityId?: string) => {
    return api
      .patch(
        `/bobjects/${accountId}/Activity/${isBulkAction ? '' : `${activityId}/`}${
          isBulkAction ? 'bulk' : 'raw'
        }`,
        body,
      )
      .then(() => mutate?.());
  };

  const updateActivity = (activityId: string, data: object) =>
    updateActivities(false, data, activityId);

  const bulkUpdateActivity = (activitiesData: object) => {
    updateActivities(true, activitiesData);
  };

  const bulkReportedActivityResult = ({
    valueLogicRole,
    activitiesId,
    dataModel,
  }: {
    valueLogicRole: string;
    activitiesId: string[];
    dataModel: any;
  }) => {
    const reportedLR = ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED;
    const reportedField = dataModel?.findFieldByLogicRole(reportedLR);

    const reportedValues = reportedField.values;
    const reported = reportedValues.find(
      (status: BobjectPicklistValueEntity) => status.logicRole === valueLogicRole,
    );

    let activitiesData = {};
    activitiesId.forEach(activityId => {
      activitiesData = {
        ...activitiesData,
        [activityId]: { [reportedField?.id]: reported?.id },
      };
    });

    bulkUpdateActivity(activitiesData);
  };

  const reportedActivityResult = ({
    valueLogicRole,
    activityId,
    dataModel,
  }: {
    valueLogicRole?: string;
    activityId: string;
    dataModel: any;
  }) => {
    const reportedLR = ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED;
    const reportedField = dataModel?.findFieldByLogicRole(reportedLR);

    const reportedValues = reportedField.values;

    const reported = reportedValues.find(
      (status: BobjectPicklistValueEntity) => status.logicRole === valueLogicRole,
    );

    const updateData = {
      [reportedField?.id]: reported ? reported?.id : REPORTED_VALUES_LOGIC_ROLE.NO,
    };

    updateActivity(activityId, updateData);
  };

  const markAsDone = (dataModel: any, activities: Bobject | Bobject[]) => {
    const isBulkAction = Array.isArray(activities);

    if (isBulkAction) {
      bulkReportedActivityResult({
        valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
        activitiesId: activities?.map(activity => activity?.id.objectId),
        dataModel,
      });
    } else {
      reportedActivityResult({
        valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
        activityId: activities?.id?.objectId,
        dataModel,
      });
    }
  };

  return { markAsDone };
};

export const useInboxGlobalAggregation = (key: string, queries: any) => {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const isWhatsappAdmin = settings?.user?.permissions?.includes(
    UserPermission.WHATSAPP_BUSINESS_ADMIN,
  );
  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const query = {
    [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: isWhatsappAdmin ? [userId, null] : [userId],
    [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: [REPORTED_VALUES_LOGIC_ROLE.NO],
    [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
      query: {
        gt: startOfDay(subDays(new Date(), 7)),
        lt: endOfDay(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK,
    ],
  };

  const { data, mutate, isLoading, isValidating } = useSearchSubscription(
    {
      query,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: 'ASC',
        },
      ],
      queries:
        queries && Object.keys(queries).length > 0
          ? [queries]
          : [
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL],
              },
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL],
                [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: [DIRECTION_VALUES_LOGIC_ROLE.INCOMING],
              },
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN],
                [ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE]: [DATA_SOURCES.CHROME_EXTENSION],
              },
              {
                [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK],
                [ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK_TYPE]: {
                  query: [CUSTOM_TASK_TYPES.WHATSAPP_BUSINESS],
                  searchMode: SearchMode.EXACT,
                },
                [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: [DIRECTION_VALUES_LOGIC_ROLE.INCOMING],
              },
            ],
    },
    'Activity',
  );

  const filteredActivities = useMemo(
    () => data && injectReferencesSearchProcess(data?.data)?.contents,
    [data],
  );

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  const {
    filteredCallActivities,
    filteredEmailActivities,
    nonReportedLinkedinActivities,
    linkedinActivitiesByLead,
    filteredWhatsAppActivites,
  } = useMemo(() => {
    const callActivities = getActivitiesByType(
      filteredActivities,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
    );
    const callTypeActivities =
      callActivities?.map(activity => {
        return { ...activity, type: ACTIVITY_TYPES.CALL };
      }) || [];
    const filteredCallActivities = addActivityDateGrouping(
      callTypeActivities,
      ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      t,
      i18n.language,
    );

    const emailActivities = getActivitiesByType(
      filteredActivities,
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
    );
    const emailTypeActivities =
      emailActivities?.map(activity => {
        return { ...activity, type: ACTIVITY_TYPES.EMAIL };
      }) || [];
    const filteredEmailActivities = addActivityDateGrouping(
      emailTypeActivities,
      ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      t,
      i18n.language,
    );

    const linkedinActivitiesByLead = getLinkedinActivitiesGrupedByLead(
      getActivitiesByType(filteredActivities, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN),
      ACTIVITY_TYPES.LINKEDIN,
      false,
    );
    const filteredLinkedinActivities = Object.values(
      addConversationGrouping(linkedinActivitiesByLead, t, i18n.language),
    );

    const nonReportedLinkedinActivities = filteredLinkedinActivities.filter(
      ({ messages }) =>
        messages.filter(({ messageStatus }) => !messageStatus?.isReported).length > 0,
    );

    const whatsAppActivitiesByObject = getLinkedinActivitiesGrupedByLead(
      getActivitiesByType(filteredActivities, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK),
      ACTIVITY_TYPES.CUSTOM_TASK,
      isWhatsappAdmin,
    );
    const filteredWhatsAppActivites = Object.values(
      addConversationGrouping(whatsAppActivitiesByObject, t, i18n.language),
    );

    return {
      filteredCallActivities,
      filteredEmailActivities,
      nonReportedLinkedinActivities,
      linkedinActivitiesByLead,
      filteredWhatsAppActivites,
    };
  }, [data, i18n.language]);
  const inboxActivities = [
    ...filteredCallActivities,
    ...filteredEmailActivities,
    ...nonReportedLinkedinActivities,
    ...filteredWhatsAppActivites,
  ];

  inboxActivities.sort((a, b) => b.activityDate.date - a.activityDate.date);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: BobjectTypes.Activity },
      }),
    );
  }, [isValidating]);

  return {
    items: addDateGrouping(inboxActivities),
    calls: filteredCallActivities,
    emails: filteredEmailActivities,
    linkedin: linkedinActivitiesByLead,
    isLoading,
    totalMatching,
    mutate,
    fetchNextPage,
  };
};

export const useInboxAllGlobalAggregation = () => {
  return useInboxGlobalAggregation(`/bobjects/inbox/globalAggregation`, null);
};

export const useInboxCallsGlobalAggregation = () => {
  return useInboxGlobalAggregation(`/bobjects/inbox/callGlobalAggregation`, {
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL],
  });
};

export const useInboxEmailsGlobalAggregation = () => {
  return useInboxGlobalAggregation(`/bobjects/inbox/emailGlobalAggregation`, {
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL],
    [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: [DIRECTION_VALUES_LOGIC_ROLE.INCOMING],
  });
};

export const useInboxLinkedinGlobalAggregation = () => {
  return useInboxGlobalAggregation(`/bobjects/inbox/linkedinGlobalAggregation`, {
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN],
    [ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE]: [DATA_SOURCES.CHROME_EXTENSION],
  });
};
