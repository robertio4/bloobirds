import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Icon, IconButton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useDebounceEffect, useSessionStorage } from '@bloobirds-it/hooks';
import { MessagesEvents, QuickFilter, SessionStorageKeys } from '@bloobirds-it/types';
import { getTaskReferencedBobject, getTaskText } from '@bloobirds-it/utils';
import { clsx } from 'clsx';

import { useExtensionContext } from '../context';
import { useTasksAllSearch } from '../extensionLeftBar/components/views/tasksView/hooks/useTasksTab';
import { Stages } from '../extensionLeftBar/components/views/view.utils';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import styles from './navegationBar.module.css';

const NavigationBar = ({
  dragging,
  stage,
  quickFilter,
}: {
  dragging: boolean;
  stage: Stages;
  quickFilter: QuickFilter;
}) => {
  const { get, set } = useSessionStorage();
  const {
    setOpenStartTasksNavigation,
    setContactViewBobjectId,
    setTaskId,
    setCurrentTask,
    useGetCurrentTask,
    useGetSidePeekEnabled,
    useGetOpenStartTasksNavigation,
  } = useExtensionContext();
  const { setIsHome } = useFloatingMenuContext();
  const currentTask = useGetCurrentTask();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const openStartTasksNavigation = useGetOpenStartTasksNavigation();
  const { cluster } = openStartTasksNavigation;
  const { tasks, isLoading } = useTasksAllSearch(stage, quickFilter, cluster);
  const currentTaskIndex = tasks?.findIndex(task => task.id.value === currentTask?.id.value);
  const index =
    currentTaskIndex !== -1 ? currentTaskIndex : get(SessionStorageKeys.IndexSelectedTask);
  const [indexSelectedTask, setIndexSelectedTask] = useState<number>(index || 0);
  const isFirst = indexSelectedTask === 0;
  const isLast = indexSelectedTask === tasks?.length - 1;
  const { t } = useTranslation();

  const selectedTask = tasks?.[indexSelectedTask];
  const tasksCompleted = get(SessionStorageKeys.TaskCompleted);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(
    tasksCompleted?.includes(selectedTask?.id?.value),
  );

  const taskTitle = getTaskText(selectedTask, 'Title', undefined, false, t);
  const referenceBobject = getTaskReferencedBobject(selectedTask);

  function updateTaskFromIndex(index) {
    setIndexSelectedTask(index);
    const nextTask = tasks?.[index];
    const nextTaskReferenceBobject = getTaskReferencedBobject(nextTask);
    if (nextTaskReferenceBobject) setContactViewBobjectId(nextTaskReferenceBobject.bobjectId);
    setTaskId(nextTask?.id?.value);
  }

  const nextTask = () => {
    const index = indexSelectedTask + 1;
    updateTaskFromIndex(index);
  };
  const previousTask = () => {
    const index = indexSelectedTask - 1;
    updateTaskFromIndex(index);
  };
  const firstTask = () => {
    const index = 0;
    updateTaskFromIndex(index);
  };
  const lastTask = () => {
    const index = tasks?.length - 1;
    updateTaskFromIndex(index);
  };

  const allTasksCompleted = () => {
    if (!tasks?.length) return false;

    const tasksCompleted = get(SessionStorageKeys.TaskCompleted);
    if (!tasksCompleted) return false;
    return tasks.every(task => tasksCompleted.includes(task.id.value));
  };
  const areAllTasksCompleted = allTasksCompleted();

  const containerClasses = clsx(styles.container, {
    [styles.containerGradient]: !taskCompleted,
    [styles.containerGradientCompleted]: taskCompleted,
    [styles.containerSidePeek]: sidePeekEnabled,
  });

  const titleClasses = clsx(styles.taskTitle, {
    [styles.taskTitle_sidePeek]: sidePeekEnabled,
  });

  useEffect(() => {
    if (tasks?.length && !isLoading) {
      set(SessionStorageKeys.IndexSelectedTask, indexSelectedTask);
    }
  }, [indexSelectedTask]);

  useEffect(() => {
    if (tasks?.length) {
      setIndexSelectedTask(index < tasks?.length ? index : tasks?.length - 1);
    }
  }, [tasks?.length]);

  useEffect(() => {
    if (tasks?.length && currentTaskIndex !== -1) {
      setIndexSelectedTask(currentTaskIndex);
    }
  }, [currentTaskIndex]);

  useDebounceEffect(
    () => {
      if (selectedTask) {
        if (referenceBobject?.bobjectId) {
          setContactViewBobjectId(referenceBobject.bobjectId);
        } else if (
          !referenceBobject?.bobjectId &&
          selectedTask?.id.value !== currentTask?.id.value &&
          !tasksCompleted?.includes(selectedTask?.id?.value)
        ) {
          setContactViewBobjectId(null);
          setCurrentTask(selectedTask);
          setIsHome(true);
        }
      }
    },
    [selectedTask?.id?.value],
    150,
  );

  useEffect(() => {
    const saveTaskCompleted = (event: CustomEvent) => {
      const { id } = event.detail;

      const taskCompleted = get(SessionStorageKeys.TaskCompleted);
      if (!taskCompleted) {
        set(SessionStorageKeys.TaskCompleted, [id]);
      } else {
        set(SessionStorageKeys.TaskCompleted, [...taskCompleted, id]);
      }

      if (id === selectedTask?.id?.value) {
        setTaskCompleted(true);
      }
    };

    window.addEventListener(MessagesEvents.TaskCompleted, saveTaskCompleted);

    return () => {
      window.removeEventListener(MessagesEvents.TaskCompleted, saveTaskCompleted);
    };
  }, [selectedTask?.id.value]);

  useEffect(() => {
    if (tasksCompleted?.includes(selectedTask?.id?.value)) {
      setTaskCompleted(true);
      setCurrentTask(null);
    } else {
      setTaskCompleted(false);
    }
  }, [tasksCompleted?.length, selectedTask?.id.value]);

  useEffect(() => {
    updateTaskFromIndex(index || 0);
    setIsHome(false);
  }, []);

  useEffect(() => {
    setIndexSelectedTask(index);
  }, [index]);

  return (
    <div id="bb-handle" className={clsx(containerClasses, { [styles.dragging]: dragging })}>
      <svg
        className={styles.handle}
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 0.75C0.447715 0.75 0 1.19772 0 1.75V2.25C0 2.80228 0.447715 3.25 1 3.25H1.5C2.05228 3.25 2.5 2.80228 2.5 2.25V1.75C2.5 1.19772 2.05228 0.75 1.5 0.75H1ZM1 5.75C0.447715 5.75 0 6.19772 0 6.75V7.25C0 7.80228 0.447715 8.25 1 8.25H1.5C2.05228 8.25 2.5 7.80228 2.5 7.25V6.75C2.5 6.19772 2.05228 5.75 1.5 5.75H1ZM0 11.75C0 11.1977 0.447715 10.75 1 10.75H1.5C2.05228 10.75 2.5 11.1977 2.5 11.75V12.25C2.5 12.8023 2.05228 13.25 1.5 13.25H1C0.447715 13.25 0 12.8023 0 12.25V11.75ZM6 0.75C5.44772 0.75 5 1.19772 5 1.75V2.25C5 2.80228 5.44772 3.25 6 3.25H6.5C7.05228 3.25 7.5 2.80228 7.5 2.25V1.75C7.5 1.19772 7.05228 0.75 6.5 0.75H6ZM5 6.75C5 6.19772 5.44772 5.75 6 5.75H6.5C7.05228 5.75 7.5 6.19772 7.5 6.75V7.25C7.5 7.80228 7.05228 8.25 6.5 8.25H6C5.44772 8.25 5 7.80228 5 7.25V6.75ZM6 10.75C5.44772 10.75 5 11.1977 5 11.75V12.25C5 12.8023 5.44772 13.25 6 13.25H6.5C7.05228 13.25 7.5 12.8023 7.5 12.25V11.75C7.5 11.1977 7.05228 10.75 6.5 10.75H6Z"
          fill="#9ACFFF"
        />
      </svg>
      <div className={styles.leftContainer}>
        {areAllTasksCompleted ? (
          <div className={styles.text}>
            <Text size="s" color="white" weight={'heavy'}>
              <Trans
                i18nKey="extension.navigationBar"
                coponents={[<span key="0" role="img" aria-label="rocket-emoji"></span>]}
              />
            </Text>
          </div>
        ) : (
          <>
            <div className={styles.chevrons}>
              <IconButton
                className={styles.navigatorButton}
                size={16}
                color="white"
                name="chevronFirst"
                onClick={firstTask}
                disabled={isFirst}
              />
              <IconButton
                className={styles.navigatorButton}
                size={16}
                color="white"
                name="chevronLeft"
                onClick={previousTask}
                disabled={isFirst}
              />
            </div>
            <div className={styles.textPaginator}>
              {!isLoading ? (
                <Text size="s" inline color="white" weight={'heavy'}>
                  {`${indexSelectedTask + 1}/${tasks?.length}`}
                </Text>
              ) : (
                <div className={styles.spinnerContainer}>
                  <Spinner color="white" size={16} name={'loadingCircle'} />
                </div>
              )}
            </div>
            <div className={styles.chevrons}>
              <IconButton
                className={styles.navigatorButton}
                size={16}
                color="white"
                name="chevronRight"
                onClick={nextTask}
                disabled={isLast}
                dataTest="button-next-task"
              />
              <IconButton
                className={styles.navigatorButton}
                size={16}
                color="white"
                name="chevronLast"
                onClick={lastTask}
                disabled={isLast}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.rightContainer}>
        {!areAllTasksCompleted ? (
          <div className={titleClasses}>
            {!isLoading ? (
              <div className={styles.taskInfo}>
                <Text size="s" color="white" weight={'heavy'}>
                  {taskTitle}
                </Text>
                {referenceBobject.bobjectName && (
                  <div
                    className={styles.referenceBobjectInfo}
                    onClick={() => setContactViewBobjectId(referenceBobject?.bobjectId)}
                  >
                    <Text size="s" color="white" weight="heavy" className={styles.dashSeparator}>
                      {' '}
                      -
                    </Text>
                    <Icon name={referenceBobject.bobjectIcon} color="white" size={16} />
                    <Text size="s" color="white" weight="heavy">
                      {referenceBobject.bobjectName}
                    </Text>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.spinnerContainer}>
                <Spinner color="white" size={16} name={'loadingCircle'} />
              </div>
            )}
          </div>
        ) : null}
        <Button
          size="small"
          variant="clear"
          color="white"
          iconRight="cross"
          onClick={() => setOpenStartTasksNavigation({ open: false })}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
