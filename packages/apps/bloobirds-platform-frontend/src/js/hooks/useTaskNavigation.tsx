import { useMemo } from 'react';
import { useParams } from 'react-router';

import { Bobject, BobjectId, TASK_FIELDS_LOGIC_ROLE, UserHelperKeys } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { companyUrl, leadUrl, opportunityUrl } from '../app/_constants/routes';
import { useUserSettings } from '../components/userPermissions/hooks';
import { MIXPANEL_EVENTS } from '../constants/mixpanel';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../utils/bobjects.utils';
import { isOpportunityPage } from '../utils/pages.utils';
import { useActiveCompany } from './useActiveCompany';
import { useActiveOpportunities } from './useActiveOpportunities';
import { useFullSalesEnabled } from './useFeatureFlags';
import { useRouter } from './useRouter';
import { useUserHelpers } from './useUserHelpers';

const { persistAtom } = recoilPersist();

const tasksToNavigateAtom = atom({
  key: 'tasksToNavigate',
  default: [] as Bobject[],
  effects: [persistAtom],
});

const placeholderTasksToNavigateAtom = atom({
  key: 'placeholderTasksToNavigateAtom',
  default: [] as NavigableTaskType[],
});

const taskNavigationEnabledAtom = atom({
  key: 'isNavigationEnabled',
  default: false,
  effects: [persistAtom],
});

const completedTasksAtom = atom<string[]>({
  key: 'completedTasks',
  default: [],
  effects: [persistAtom],
});

const taskNavigationIndexAtom = atom({
  key: 'taskNavigationIndex',
  default: 0,
  effects: [persistAtom],
});

const isSalesNavigationSettingsAtom = atom({
  key: 'isSalesNavigationSettings',
  default: false,
});

interface NavigableTaskType {
  task: {
    id: Partial<BobjectId>;
    status: string;
    type: string;
    automated: string;
    date: string;
    title: string;
  };
  referencedBobjectsUrls: {
    company?: { id: BobjectId };
    lead?: { id: BobjectId };
    opportunity?: { id: BobjectId };
  };
}

function parseNavigableTasks(tasks: Bobject[]): NavigableTaskType[] {
  return tasks.map((task: Bobject) => {
    const companyId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject
      ?.id;
    const leadId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject?.id;
    const opportunityId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
      ?.referencedBobject?.id;
    return {
      task: {
        id: { value: task.id.value, objectId: task.id.objectId },
        title: getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE),
        status: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole,
        type: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole,
        date: getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME),
        automated: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)?.valueLogicRole,
      },
      referencedBobjectsUrls: {
        ...(companyId ? { company: { id: companyId } } : {}),
        ...(leadId ? { lead: { id: leadId } } : {}),
        ...(opportunityId ? { opportunity: { id: opportunityId } } : {}),
      },
    };
  });
}

export const useTaskNavigationStorage = () => {
  const { save } = useUserHelpers();
  const { slug } = useParams<any>();
  const hasSalesEnabled = useFullSalesEnabled();
  const { resetActiveOpportunities } = useActiveOpportunities();
  const { resetActiveCompany } = useActiveCompany();
  const settings = useUserSettings();
  const { history, pathname } = useRouter();

  const [index, setTaskIndex] = useRecoilState(taskNavigationIndexAtom);
  const [isBarEnabled, setIsBarEnabled] = useRecoilState(taskNavigationEnabledAtom);
  const [navigableTasks, setNavigableTasks] = useRecoilState<NavigableTaskType[]>(
    tasksToNavigateAtom,
  );
  const resetNavigableTasks = useResetRecoilState(tasksToNavigateAtom);
  const [placeholderNavigableTasks, setPlaceholderNavigableTasks] = useRecoilState(
    placeholderTasksToNavigateAtom,
  );
  const [completedTasks, setCompletedTasks] = useRecoilState(completedTasksAtom);
  const [isSalesNav, setSalesNav] = useRecoilState(isSalesNavigationSettingsAtom);
  const isFirstTask = index === 0;
  const isLastTask = index === navigableTasks.length - 1;

  const getTaskURL = (selectedTask: NavigableTaskType) => {
    if (!selectedTask?.referencedBobjectsUrls) {
      return undefined;
    }
    const taskCompany = selectedTask.referencedBobjectsUrls.company;
    const taskLead = selectedTask.referencedBobjectsUrls.lead;
    const taskOpportunity = selectedTask.referencedBobjectsUrls.opportunity;
    let url = companyUrl(taskCompany);
    const taskNavigationMode = isSalesNav
      ? settings?.user?.salesTaskNavigationMode
      : settings?.user?.prospectionTaskNavigationMode;

    switch (taskNavigationMode) {
      case 'TASK_COMPANY':
        if (!taskCompany) {
          if (taskOpportunity) {
            url = opportunityUrl(
              hasSalesEnabled ? undefined : taskCompany?.id.objectId,
              taskOpportunity?.id.objectId,
            );
          } else if (taskLead) {
            url = leadUrl(taskLead, undefined);
          }
        }
        break;
      case 'TASK_LEAD':
        if (taskLead) {
          url = leadUrl(taskLead, undefined);
        } else if (taskOpportunity) {
          url = opportunityUrl(
            hasSalesEnabled ? undefined : taskCompany?.id.objectId,
            taskOpportunity?.id.objectId,
          );
        }
        break;
      default:
        if (taskOpportunity) {
          url = opportunityUrl(
            hasSalesEnabled ? undefined : taskCompany?.id.objectId,
            taskOpportunity?.id.objectId,
          );
        } else if (taskLead) {
          url = leadUrl(taskLead, undefined);
        }
    }
    return url;
  };

  function startNavigation(tasksToNavigate?: Bobject[]) {
    save(UserHelperKeys.START_TASK_FROM_CADENCE);
    const parsedTasks = tasksToNavigate
      ? parseNavigableTasks(tasksToNavigate)
      : placeholderNavigableTasks;
    setNavigableTasks(parsedTasks);
    const url = getTaskURL(parsedTasks[0]);
    mixpanel.track(`${MIXPANEL_EVENTS.TASK_STARTED_IN_ + slug || 'appointments'}_TAB`, {
      'Number of tasks': navigableTasks.length,
    });
    setIsBarEnabled(true);
    setTaskIndex(0);
    if (url) history.push(url);
  }

  function finishNavigation() {
    resetNavigableTasks();
    setCompletedTasks([]);
    setIsBarEnabled(false);
    setTaskIndex(0);
  }

  const changeIndex = async (newIndex: number) => {
    if (newIndex !== index) {
      setTaskIndex(newIndex);
      const url = getTaskURL(navigableTasks[newIndex]);
      if (isOpportunityPage(pathname)) {
        resetActiveOpportunities();
        await resetActiveCompany();
      }
      if (url) history.replace(url);
    }
  };

  const areAllTasksCompleted = useMemo(() => {
    if (
      !navigableTasks ||
      navigableTasks.length === 0 ||
      !completedTasks ||
      completedTasks?.length === 0
    )
      return false;
    return navigableTasks.every(({ task }) => completedTasks.includes(task?.id?.objectId));
  }, [completedTasks, navigableTasks]);

  function goToFirstTask() {
    changeIndex(0);
  }

  function goToLastTask() {
    changeIndex(navigableTasks.length - 1);
  }

  function goToNextTask() {
    if (!isLastTask) {
      changeIndex(index + 1);
    }
  }
  function goToPreviousTask() {
    changeIndex(index - 1);
  }

  function setTaskAsCompleted(taskId: string) {
    setCompletedTasks([...completedTasks, taskId]);
  }

  function addTasksToNavigation(tasksToNavigate: Bobject[]) {
    const parsedTasks = parseNavigableTasks(tasksToNavigate);
    setPlaceholderNavigableTasks(parsedTasks);
  }

  return {
    startNavigation,
    areAllTasksCompleted,
    isTaskCompleted: () =>
      completedTasks &&
      completedTasks.includes((navigableTasks[index] as NavigableTaskType)?.task.id?.objectId),
    isFirstTask,
    isLastTask,
    goToFirstTask,
    goToLastTask,
    goToPreviousTask,
    goToNextTask,
    index,
    shouldShowNavigation: isBarEnabled,
    selectedTask: (navigableTasks[index] as NavigableTaskType)?.task,
    tasks: navigableTasks,
    finishNavigation,
    setTaskAsCompleted,
    placeholderNavigableTasks,
    addTasksToNavigation,
    setSalesNavigation: setSalesNav,
    referencedBobjectsUrls: (navigableTasks[index] as NavigableTaskType)?.referencedBobjectsUrls,
  };
};
