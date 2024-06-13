import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, useHover } from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { Bobject, BobjectId } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { motion } from 'framer-motion';
import startCase from 'lodash/startCase';
import spacetime from 'spacetime';

import { useExtensionContext } from '../../../../../../../context';
import { useTaskFeedContext } from '../../../hooks/useTasksTab';
import { TaskFeedTask } from '../../../types';
import styles from '../../taskTabsList.module.css';
import { TaskIcons, ExtraFields, BobjectNames, TaskAsignee, TaskDate } from './components';
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
  backgroundTask?: TaskFeedTask & { cadenceName: string };
}) {
  //TODO completion management
  const [banished, setBanished] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ref, isHovering] = useHover();
  const isB2CAccount = useIsB2CAccount();
  const {
    setContactViewBobjectId,
    closeExtendedScreen,
    setCurrentTask,
    setTaskId,
  } = useExtensionContext();
  const { useGetConfiguration } = useTaskFeedContext();
  const configuration = useGetConfiguration?.();
  const { t } = useTranslation();

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

  const onCardClick = async () => {
    const bobjectId = task?.id;

    const leadId = task?.lead?.id;
    const companyId = task?.company?.id;
    const opportunityId = task?.opportunity?.id;

    const b2bOrder = companyId || opportunityId;
    const b2cOrder = opportunityId || companyId;

    const taskForm = await api.get(`/bobjects/${bobjectId}/form`);

    if (!leadId && !companyId && !opportunityId) {
      setCurrentTask(taskForm?.data as Bobject);
      setTaskId(bobjectId);
    } else {
      const contactViewId = (leadId
        ? leadId
        : isB2CAccount
        ? b2cOrder
        : b2bOrder) as BobjectId['value'];
      setContactViewBobjectId(contactViewId);
    }

    //TODO: Check what needs to be done to add the task as the main one in the contact view and handle the tasks without a lead or company
    closeExtendedScreen();
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
        onClick={onCardClick}
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
        <div className={styles.taskCardFooter}>
          <BobjectNames task={task} />
          <div className={styles.taskCardFooterRight}>
            <TaskAsignee value={task.owner} />
          </div>
        </div>
        {(isHovering || isProcessing) && (
          <TaskButtons
            parentRef={ref}
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
          onClick={onCardClick}
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
          <div className={styles.taskCardFooter}>
            <BobjectNames task={backgroundTask} />
            <div className={styles.taskCardFooterRight}>
              <TaskAsignee value={backgroundTask.owner} />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
