import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardHoverButtons,
  CardRight,
  Text,
  Tooltip,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { QuickLogModalData, useIsNoStatusPlanAccount } from "@bloobirds-it/hooks";
import {
  BobjectWithDate,
  CustomTask,
  FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  convertHtmlToString,
  getFieldByLogicRole,
  getReferencedBobject,
  getTaskReferenceBobject,
  getTaskText,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isCadenceTask,
  isEmailTask,
  isScheduledTask,
  isSkippableTask,
} from '@bloobirds-it/utils';
import clsx from 'clsx';

import { MiniSkipTaskButton } from '../../../card/component/miniSkipTaskButton';
import { CadenceName, PriorityLabel } from '../../../card/fieldTypeComponent';
import { TaskIconDisplay } from '../../../taskIconDisplay/taskIconDisplay';
import { MiniCardTaskButtons } from './cardButtons/miniCardTaskButtons';
import { BobjectName } from './components/bobjectName';
import { ScheduledDateTime } from './components/cardDates';
import styles from './miniCard.module.css';

export const TaskMiniCard = ({
  task,
  isOverdue,
  hasNextCard,
  sidePeekEnabled,
  isTaskFeed,
  updateIndexOnSave,
  minimized,
  customTasks,
  logCustomActivity,
}: {
  task: BobjectWithDate;
  isOverdue?: boolean;
  hasNextCard?: boolean;
  sidePeekEnabled?: boolean;
  isTaskFeed?: boolean;
  updateIndexOnSave?: () => void;
  minimized?: boolean;
  customTasks?: CustomTask[];
  logCustomActivity?: (data: QuickLogModalData) => void;
}) => {
  const [ref, isHovering] = useHover();
  const { t } = useTranslation();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [markAsDoneClicked, setMarkAsDoneClicked] = useState(false);
  const buttonsExtraProps = {
    isLoading,
    setIsLoading,
    markAsDoneClicked,
    setMarkAsDoneClicked,
  };
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const referencedBobject = getReferencedBobject(task);

  const scheduledDatetime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);

  const priorityBobjectValue = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY);

  const assignee = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);

  const isCadence = isCadenceTask(task);
  const isSkippable = isSkippableTask(task);
  const isScheduled = isScheduledTask(task);

  const stage = getTextFromLogicRole(
    referencedBobject,
    FIELDS_LOGIC_ROLE[referencedBobject?.id?.typeName]['STAGE'],
  );

  const containerClasses = clsx(styles.container, {
    [styles.containerTaskFeed]: isTaskFeed,
    [styles.containerSidePeek]: sidePeekEnabled,
    [styles.borderGreen]: stage === 'Prospecting',
    [styles.borderGray]: stage === 'Sales' || !!opportunity,
    [styles.border]: isNoStatusPlanAccount,
    [styles.borderRed]: isOverdue,
    [styles.containerMinimized]: minimized,
  });

  const cardButtonsClasses = clsx(styles.cardButtons, {
    [styles.cardButtonsSidePeekMinimized]: sidePeekEnabled && minimized,
    [styles.cardButtonsSidePeek]: sidePeekEnabled,
    [styles.cardButtonsBubble]: !sidePeekEnabled,
  });

  const isSidePeekInTaskFeed = sidePeekEnabled && isTaskFeed;

  const customTaskId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);

  const title = getTaskText(task, 'Title', customTasks, !isScheduled, t);
  const description = getTaskText(task, 'Description', customTasks, !isScheduled, t);
  const hasTemplate = !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TEMPLATE);

  let cadenceName = null;
  if (isCadence) {
    const relatedBobject = getTaskReferenceBobject(task);
    cadenceName = getTextFromLogicRole(
      relatedBobject,
      FIELDS_LOGIC_ROLE[relatedBobject?.id?.typeName]?.CADENCE,
    );
  }

  useEffect(() => {
    setMarkAsDoneClicked(false);
  }, [task?.id?.objectId]);

  return (
    <div className={containerClasses} ref={ref}>
      <Card size="small" expand>
        <CardHeader>
          <CardBody>
            <TaskIconDisplay bobject={task} size={sidePeekEnabled ? 20 : 18} />
            <Text
              className={clsx(styles.taskTitle, {
                [styles.taskTitleGrown]:
                  isSidePeekInTaskFeed && !(isEmailTask(task) && hasTemplate) && !isCadence,
                [styles.taskTitleEllipsis]: !isSidePeekInTaskFeed,
              })}
              size="xs"
              weight="medium"
            >
              {title}
            </Text>
            {isCadence && <CadenceName cadenceName={cadenceName} />}
            {isEmailTask(task) && hasTemplate && (
              <div className={styles.label}>Template suggested</div>
            )}
            <div className={styles.rightSide}>
              {priorityBobjectValue && (
                <div className={styles.priorityLabelWrapper}>
                  <PriorityLabel
                    priority={priorityBobjectValue}
                    showOnlyImportant
                    onlyFlag={!sidePeekEnabled}
                  />
                </div>
              )}
            </div>
          </CardBody>
          <div className={cardButtonsClasses}>
            <CardHoverButtons size="small" customBackgroundColor="white">
              {isHovering && isSkippable && <MiniSkipTaskButton task={task} />}
              {(isHovering || markAsDoneClicked) && (
                <MiniCardTaskButtons
                  task={task}
                  updateIndexOnSave={updateIndexOnSave}
                  customTask={customTask}
                  logCustomActivity={logCustomActivity}
                  {...buttonsExtraProps}
                />
              )}
            </CardHoverButtons>
          </div>
        </CardHeader>
        {!minimized ? (
          <>
            <CardContent>
              {description ? (
                <Tooltip
                  title={description?.length > 540 && !isTaskFeed && description}
                  position="top"
                >
                  <Text
                    className={clsx({ [styles.verticalEllipsis]: !isTaskFeed })}
                    color="peanut"
                    size="xs"
                  >
                    {convertHtmlToString(description)}
                  </Text>
                </Tooltip>
              ) : (
                <BobjectName bobject={opportunity || lead} style={{ marginLeft: '0px' }} isBold />
              )}
              {!description && (
                <CardRight>
                  <div className={styles.bottomLeftContainer}>
                    <ScheduledDateTime
                      isOverdue={isOverdue}
                      scheduledDateTime={scheduledDatetime}
                      isCadence={isCadence}
                    />
                    <AssigneeComponent value={assignee} />
                  </div>
                </CardRight>
              )}
            </CardContent>
            {description ? (
              <CardContent>
                <BobjectName
                  bobject={opportunity || lead}
                  style={{ marginLeft: '0px' }}
                  isBold={true}
                />
                <CardRight>
                  <div className={styles.bottomLeftContainer}>
                    <ScheduledDateTime
                      isOverdue={isOverdue}
                      scheduledDateTime={scheduledDatetime}
                      isCadence={isCadence}
                    />
                    <AssigneeComponent value={assignee} />
                  </div>
                </CardRight>
              </CardContent>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Card>
      {hasNextCard && <div className={styles._dashed_line} />}
    </div>
  );
};
