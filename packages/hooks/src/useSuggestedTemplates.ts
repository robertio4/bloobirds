import { useEffect, useMemo, useState } from 'react';

import {
  Bobject,
  BobjectId,
  BobjectTypes,
  ExtensionBobject,
  MessagingTemplate,
  PlaybookTab,
  TASK_ACTION,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TemplateStage,
} from '@bloobirds-it/types';
import { api, getValueFromLogicRole, injectReferencesSearchProcess } from '@bloobirds-it/utils';
import { startOfDay } from 'date-fns';

import { useMessagingTemplates } from './useMessagingTemplates';
import { BASE_SEARCH_REQUEST } from './useTasksFeed';

const NEEDED_COLUMNS = [
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  TASK_FIELDS_LOGIC_ROLE.STATUS,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
  TASK_FIELDS_LOGIC_ROLE.DESCRIPTION,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
  TASK_FIELDS_LOGIC_ROLE.CADENCE,
  TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY,
  TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  TASK_FIELDS_LOGIC_ROLE.PRIORITY,
  TASK_FIELDS_LOGIC_ROLE.TEMPLATE,
  TASK_FIELDS_LOGIC_ROLE.SUGGESTED_PITCH,
  TASK_FIELDS_LOGIC_ROLE.SUGGESTED_LINKEDIN_TEMPLATE,
  TASK_FIELDS_LOGIC_ROLE.SUGGESTED_WHATSAPP_TEMPLATE,
];

const isTodayOrOverdue = task => {
  const date = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  return startOfDay(new Date(date)) <= startOfDay(new Date());
};

const taskTypes = ['PROSPECT_CADENCE', 'CUSTOM_TASK', 'SCHEDULED_EMAIL'];

const getQueryDictionary = (bobjectId: BobjectId['value']) => {
  if (!bobjectId) return;
  const isCompanyId = bobjectId.includes('Company');
  const isOpportunityId = bobjectId.includes('Opportunity');
  return {
    query: {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
        TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
        TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      ],
    },
    columns: NEEDED_COLUMNS,
    page: 0,
    pageSize: 100,
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
    queries: [
      {
        [TASK_FIELDS_LOGIC_ROLE[
          isCompanyId ? 'COMPANY' : isOpportunityId ? 'OPPORTUNITY' : 'LEAD'
        ]]: [bobjectId],
      },
    ],
    ...BASE_SEARCH_REQUEST,
  };
};

enum TypeConverter {
  Pitches = 'PITCH',
  Emails = 'EMAIL',
  LinkedIn = 'LINKEDIN_MESSAGE',
  QualifyingQuestions = 'QUALIFYING_QUESTION',
  Snippets = 'SNIPPET',
  WhatsApp = 'WHATSAPP',
}

enum LogicRoleConverter {
  Emails = TASK_FIELDS_LOGIC_ROLE.TEMPLATE,
  Pitches = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_PITCH,
  LinkedIn = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_LINKEDIN_TEMPLATE,
  WhatsApp = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_WHATSAPP_TEMPLATE,
}

function getTemplateId(task: Bobject<BobjectTypes.Task>, templateType: PlaybookTab) {
  const logicRole = LogicRoleConverter[templateType];
  return getValueFromLogicRole(task, logicRole);
}

export const useSuggestedTemplates = (
  bobject: Bobject | ExtensionBobject,
  context: any,
  templateType: PlaybookTab,
) => {
  const [tasks, setTasks] = useState<Bobject<BobjectTypes.Task>[]>([]);
  const bobjectId = bobject?.id?.value;

  useEffect(() => {
    //This was previously done with SWR but cadence management broke the functionality, we should monitor the number of requests done
    /*  const { data: { tasks, total } = { tasks: [], total: 0 } } = useSWR(
    bobjectId && `/bobjects/cadenceTasks/${bobjectId}}`,
    () => fetchCadenceTasksByBobject(bobject.id),
  );*/
    if (bobject && bobject?.id?.accountId) {
      api
        .post('/bobjects/' + bobject?.id?.accountId + '/Task/search', getQueryDictionary(bobjectId))
        .then(response => {
          if (response?.data) {
            const tasks = injectReferencesSearchProcess(response?.data)?.contents;
            setTasks(tasks);
          }
        });
    }
  }, [bobjectId]);

  const ids = useMemo(
    () =>
      tasks?.reduce((acc, t) => {
        const templateId = getTemplateId(t, templateType);
        if (templateId && isTodayOrOverdue(t)) {
          acc.push({
            id: templateId,
            taskTitle: getValueFromLogicRole(t, TASK_FIELDS_LOGIC_ROLE.TITLE),
          });
        }
        return acc;
      }, []),
    [tasks.length],
  ) as { id: string; taskTitle: string }[];

  const { messagingTemplates } = useMessagingTemplates({
    type: TypeConverter[templateType],
    size: 1000,
    page: 0,
    stage: TemplateStage.All,
    name: '',
    visibility: 'PUBLIC',
    segmentationValues: {},
    onlyMine: false,
    onlyOfficials: false,
    onlyBattlecards: false,
  });

  return useMemo(() => {
    if (!messagingTemplates?.length || !ids || Object.values(ids).length === 0) return [];
    return ids.reduce((acc, { id, taskTitle }) => {
      const matchingTemplate = messagingTemplates?.find(template => template.id === id);
      if (matchingTemplate) {
        acc.push({ ...matchingTemplate, taskTitle });
      }
      return acc;
    }, []) as MessagingTemplate[];
  }, [messagingTemplates?.length, ids?.length]);
};
