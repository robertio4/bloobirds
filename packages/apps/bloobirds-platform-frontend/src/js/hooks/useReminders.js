import { useEffect } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import {
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  getRoundedDateTime,
  getDifferenceInMinutes,
  injectReferencesSearchProcess,
} from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';

import { companyUrl } from '../app/_constants/routes';
import { useUserSettings } from '../components/userPermissions/hooks';
import { BobjectApi } from '../misc/api/bobject';
import SessionManagerFactory from '../misc/session';
import {
  getValueFromLogicRole,
  getFieldByLogicRole,
  getTextFromLogicRole,
} from '../utils/bobjects.utils';
import { useRouter } from './useRouter';

const REMINDERS_KEY = `bb-app-${SessionManagerFactory().getAccount()?.id}-reminders`;

const storagedReminders = JSON.parse(localStorage.getItem(REMINDERS_KEY));

const updateReminders = reminderIds => {
  try {
    return localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminderIds));
  } catch (e) {
    return null;
  }
};

const remindersStateAtom = atom({
  key: 'remindersNotNotified',
  default: storagedReminders,
});

export const useReminders = () => {
  const { createToast } = useToasts();
  const user = SessionManagerFactory().getUser();
  const settings = useUserSettings();
  const userSettings = { ...settings?.user };
  const [remindersState, setRemindersState] = useRecoilState(remindersStateAtom);
  const history = useRouter();

  const setSeenReminder = (taskId, scheduledDateTime) => {
    const alreadyStored = { ...remindersState } || {};
    const alreadyShownReminder = !!alreadyStored && alreadyStored[taskId];
    if (!alreadyShownReminder) {
      alreadyStored[taskId] = scheduledDateTime;
      setRemindersState(alreadyStored);
      updateReminders(alreadyStored);
    }
  };

  const removeOldTasksFromLocalStorage = () => {
    const alreadyStored = { ...storagedReminders };
    if (Object.keys(alreadyStored).length > 0) {
      Object.keys(alreadyStored).forEach(taskId => {
        const taskScheduledDateTime = new Date(alreadyStored[taskId]).getTime();
        const currentDateTime = new Date().getTime();
        if (taskScheduledDateTime < currentDateTime) {
          delete alreadyStored[taskId];
        }
      });
      updateReminders(alreadyStored);
    }
  };

  const fetchTasks = () =>
    BobjectApi.request()
      .Task()
      .search({
        injectReferences: true,
        query: {
          TASK__TASK_TYPE: [TASK_TYPE.NEXT_STEP, TASK_TYPE.PROSPECT_CADENCE],
          [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
            '__MATCH_EMPTY_ROWS__',
            TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO,
          ],
          TASK__SCHEDULED_DATETIME: {
            query: {
              gte: getRoundedDateTime(1),
              lte: getRoundedDateTime(
                1,
                new Date(new Date().getTime() + userSettings.remindersBeforeMinutes * 60000),
              ),
            },
            searchMode: 'RANGE__SEARCH',
          },
          TASK__STATUS: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
          TASK__ASSIGNED_TO: [user.id],
        },
        formFields: true,
        pageSize: 10,
      });

  const { data } = useSWR(
    user && userSettings.remindersBeforeMinutes ? '/tasks/reminders' : null,
    fetchTasks,
    {
      refreshInterval: 60000,
    },
  );

  useEffect(() => {
    if (data && userSettings?.remindersEnabled) {
      const referencedData = injectReferencesSearchProcess(data);
      const notNotifiedTasks = referencedData.contents.filter(task =>
        remindersState ? !Object.keys(remindersState).includes(task.id.value) : true,
      );
      notNotifiedTasks.forEach(task => {
        const company = getFieldByLogicRole(task, 'TASK__COMPANY').referencedBobject;
        const scheduledDateTime = getValueFromLogicRole(task, 'TASK__SCHEDULED_DATETIME');
        const minutesOfDifference = getDifferenceInMinutes({
          endDate: scheduledDateTime,
        });
        createToast({
          message: `Task due in ${minutesOfDifference} minutes: ${getTextFromLogicRole(
            task,
            'TASK__TITLE',
          )}`,
          subtitle: getValueFromLogicRole(company, 'COMPANY__NAME'),
          duration: 50000,
          type: 'reminder',
          onClick: () => {
            const path = companyUrl(company);
            history.push(path);
          },
          sound: userSettings?.remindersSoundEnabled
            ? 'https://d38iwn7uw3305n.cloudfront.net/notification.mp3'
            : null,
        });
        setSeenReminder(task.id.value, scheduledDateTime);
      });
      removeOldTasksFromLocalStorage();
    }
  }, [data]);
};
