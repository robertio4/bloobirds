import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, useHover } from '@bloobirds-it/flamingo-ui';
import { motion } from 'framer-motion';
import startCase from 'lodash/startCase';
import spacetime from 'spacetime';

import { useTaskManagementContext } from '../../../../hooks/useTaskManagement';
import { TaskFeedTask } from '../../../../types/taskManagement.types';
import styles from '../../taskTabsList.module.css';
import { TaskIcons, ExtraFields, TaskDate } from './components';
import { TaskPriorityButton } from './components/taskButtons/components/priorityButton';
import { TaskButtons } from './components/taskButtons/taskButtons';

const vartiants = {
  active: {
    x: 0,
    opacity: 1,
  },
  banished: {
    x: 400,
    opacity: 0,
    display: ['', '', 'none'],
  },
};

const backgroundVartiants = {
  active: {
    x: 0,
    opacity: 1,
  },
  banished: {
    x: -400,
    opacity: 0,
    display: ['', '', 'none'],
  },
};

export function TaskCard({
  task,
  className,
  backgroundTask,
}: {
  task: TaskFeedTask & { cadenceName: string };
  className: string;
  backgroundTask?: TaskFeedTask & { cadenceName?: string };
}) {
  //TODO completion management
  const [banished, setBanished] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ref, isHovering] = useHover();
  const { t } = useTranslation();
  const { currentTasksProps } = useTaskManagementContext();
  const { configuration } = currentTasksProps || {};

  const getCadenceStep = () => {
    if (task.step === '1') {
      return t('tasksTitles.cadenceStep.1');
    }
    if (task.step === '2') {
      return t('tasksTitles.cadenceStep.2');
    }
    if (task.step === '3') {
      return t('tasksTitles.cadenceStep.3');
    }
    return t('tasksTitles.cadenceStep.other', { number: task.step });
  };

  const getTaskCardTitle = () => {
    if (task.cadenceName) {
      return task.cadenceName;
    } else if (task.actionCall) {
      return t('tasksTitles.call');
    } else if (task.actionEmail) {
      return t('tasksTitles.email');
    } else if (task.actionLinkedin) {
      return t('tasksTitles.linkedin');
    } else {
      return task.title;
    }
  };

  const getTimezoneHour = (timezone: string) => {
    let location = timezone;
    try {
      location = startCase(timezone.replace(/[_/]/g, ' ')).replace(' ', ', ');
    } catch (e) {
      console.warn('Error parsing timezone', e);
    }
    try {
      return t('tasksTitles.timezone', {
        hour: spacetime(new Date(), timezone).format('time-24'),
        location,
      });
    } catch (error) {
      return t('tasksTitles.timezoneError', {
        location,
      });
    }
  };

  if (!task) {
    return null;
  }

  return (
    <>
      <motion.div
        animate={banished ? 'banished' : 'active'}
        variants={vartiants}
        transition={{ duration: 0.3 }}
        style={{ zIndex: '10', height: 'auto', overflow: 'hidden' }}
        className={className}
        ref={ref}
      >
        <div className={styles.taskCardHeader}>
          <div className={styles.taskCardHeaderLeft}>
            <TaskIcons task={task} />
            {!task.customTaskId && (
              <span className={styles.taskCardTitle}>{getTaskCardTitle()}</span>
            )}
          </div>
          <div className={styles.taskCardHeaderRight}>
            <TaskDate task={task} />
            {!!configuration?.canSeeImportance && <TaskPriorityButton task={task} displayOnly />}
          </div>
        </div>
        <div className={styles.taskCardContent}>
          <div className={styles.taskCardRow}>
            {task.step && task.cadenceId && (
              <span className={styles.taskCardTitle}>{getCadenceStep()}</span>
            )}
            {task.cadenceId && task.timezone && <div className={styles.bobjectNamesSeparator} />}
            {task.timezone && (
              <span className={styles.taskCardRowTimezone}>
                <Icon name="clock" color="darkBloobirds" size={12} />
                {getTimezoneHour(task.timezone)}
              </span>
            )}
          </div>
          {task?.description && (
            <div
              className={styles.taskCardBodyText}
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
          )}
          {!!task.extraFields?.length && <ExtraFields extraFields={task.extraFields} />}
        </div>
        {(isHovering || isProcessing) && (
          <TaskButtons
            task={task}
            setBanished={() => setBanished(true)}
            setIsProcessing={setIsProcessing}
          />
        )}
      </motion.div>
      {backgroundTask && (
        <motion.div
          animate={banished ? 'active' : 'banished'}
          variants={backgroundVartiants}
          transition={{ duration: 0.2 }}
          style={{
            zIndex: '10',
            height: 'auto',
            overflow: 'hidden',
            display: banished ? 'flex' : 'none',
            position: 'absolute',
            width: 'calc(100% - 4px)',
          }}
          className={className}
        >
          <div className={styles.taskCardHeader}>
            <div className={styles.taskCardHeaderLeft}>
              <TaskIcons task={backgroundTask} />
              {!backgroundTask.customTaskId && (
                <span className={styles.taskCardTitle}>
                  {backgroundTask.cadenceName ? backgroundTask.cadenceName : backgroundTask.title}
                </span>
              )}
            </div>
            <div className={styles.taskCardHeaderRight}>
              <TaskDate task={backgroundTask} />
              {!!configuration?.canSeeImportance && (
                <TaskPriorityButton task={backgroundTask} displayOnly />
              )}
            </div>
          </div>
          <div className={styles.taskCardContent}>
            <div className={styles.taskCardRow}>
              {backgroundTask.step && backgroundTask.cadenceId && (
                <span className={styles.taskCardTitle}>{getCadenceStep()}</span>
              )}
              {backgroundTask.cadenceId && backgroundTask.timezone && (
                <div className={styles.bobjectNamesSeparator} />
              )}
              {backgroundTask.timezone && (
                <span className={styles.taskCardRowTimezone}>
                  {getTimezoneHour(backgroundTask.timezone)}
                </span>
              )}
            </div>
            {backgroundTask?.description && (
              <div
                className={styles.taskCardBodyText}
                dangerouslySetInnerHTML={{ __html: backgroundTask.description }}
              />
            )}
            {!!backgroundTask.extraFields?.length && (
              <ExtraFields extraFields={backgroundTask.extraFields} />
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
