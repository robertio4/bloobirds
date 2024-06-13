import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityTimelineItem, BobjectName } from '@bloobirds-it/activity-timeline-item';
import {
  Button,
  ColorType,
  Icon,
  IconType,
  Text,
  TimelineItem,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useDataModel, useQuickLogActivity } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getReferencedBobjectFromLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  injectReferenceFields,
  isDifferentYearThanCurrent,
} from '@bloobirds-it/utils';
import { isToday } from 'date-fns';

import { CadenceTableContext, CadenceTableImmutableContext } from '../../../CadenceTable';
import { CadenceTimeTask, CadenceType } from '../../../cadenceTable.type';
import styles from '../../timeTable.module.css';

interface BadgeDropdownContentProps {
  dayTasks: CadenceTimeTask;
  cadenceAction: CadenceType;
  closeDropdown: () => void;
  date: string;
}

interface ScheduledTask {
  id: string;
  icon: IconType;
  color: ColorType;
  taskName: string;
  taskDescription: string;
  lead?: Bobject;
  date: Date;
}

const scheduledTaskFromNormalTask = (task: Bobject, action: CadenceType): ScheduledTask => {
  let iconColor: { icon: IconType; color: ColorType };
  switch (action) {
    case CadenceType.call:
      iconColor = { icon: 'phone', color: 'extraCall' };
      break;
    case CadenceType.email:
      iconColor = { icon: 'mail', color: 'tangerine' };
      break;
    case CadenceType.autoEmail:
      iconColor = { icon: 'autoMail', color: 'tangerine' };
      break;
    case CadenceType.linkedIn:
      iconColor = { icon: 'linkedin', color: 'darkBloobirds' };
      break;
    case CadenceType.customTask:
      iconColor = { icon: 'checkDouble', color: 'bloobirds' };
      break;
    default:
      iconColor = {
        icon: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_ICON).value as IconType,
        color: 'peanut',
      };
      break;
  }
  const scheduledDate = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE)?.value;

  return {
    id: task.id.value,
    icon: iconColor.icon,
    color: iconColor.color,
    taskName: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE)?.value,
    taskDescription: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)?.value,
    lead: getReferencedBobjectFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD),
    date: new Date(scheduledDate),
  };
};

const scheduledTaskFromCustomTask = (task: Bobject<BobjectTypes.Task>): ScheduledTask => {
  const { customTasks } = useCustomTasks({ disabled: true });
  const customTask = customTasks?.find(
    ct => ct.id === getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)?.value,
  );

  if (!customTask) {
    // For load a task that was created with a manual task but is not a custom task
    return scheduledTaskFromNormalTask(task, CadenceType.customTask);
  }
  const description = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)?.value;

  const scheduledDate = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE)?.value;
  const lead = task.referencedBobjects[TASK_FIELDS_LOGIC_ROLE.LEAD];

  return {
    id: task.id.value,
    icon: customTask.icon,
    color: customTask.iconColor,
    taskName: customTask.name,
    taskDescription: description || customTask?.description,
    lead,
    date: new Date(scheduledDate),
  };
};

const ScheduledTaskItem = (scheduledTask: ScheduledTask) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceTable.timetable.column',
  });
  const { t: datesT } = useTranslation('translation', {
    keyPrefix: 'dates',
  });
  const isDifferentYear = isDifferentYearThanCurrent(scheduledTask.date);
  const isThisDay = isToday(scheduledTask.date);
  const nonTranslatedTime = useGetI18nSpacetime(new Date(scheduledTask.date)).format(
    isDifferentYear ? datesT('shortYear') : datesT('shortMonth'),
  );
  const timeToShow = isThisDay ? t('today') : nonTranslatedTime;
  return (
    <div className={styles.scheduledTaskItemWrapper}>
      <TimelineItem
        size="small"
        backgroundColor="lightestBloobirds"
        data={{
          icon: <Icon name={scheduledTask.icon} color={scheduledTask.color} size={14} />,
          color: scheduledTask.color,
          // @ts-ignore
          description: (
            <div className={styles.descriptionContainer}>
              {scheduledTask.lead && (
                <BobjectName
                  activityBobjectName={getTextFromLogicRole(
                    scheduledTask.lead,
                    LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
                  )}
                  ellipsis="80%"
                />
              )}
              <Text size="xxs" color="softPeanut" inline>
                {scheduledTask.taskDescription}
              </Text>
            </div>
          ),
          iconColor: scheduledTask.color,
          date: timeToShow,
          dashedBorder: true,
        }}
        activeHover={true}
      >
        <div className={styles.scheduledTask_header}>
          <Text size="xs">{scheduledTask?.taskName}</Text>
        </div>
      </TimelineItem>
    </div>
  );
};

const CompletedActivityItem = ({
  activity,
  dataModel,
  closeDropdown,
  date,
}: {
  activity: Bobject;
  dataModel: DataModelResponse;
  closeDropdown: () => void;
  date: string;
}) => {
  const [ref, hovering] = useHover();
  const {
    onClickActivityExternal,
    onClickActivityView,
    onClickActivityEdit,
    hideActivityHover,
  } = useContext(CadenceTableImmutableContext);

  const { timeWindow } = useContext(CadenceTableContext);
  const { customTasks } = useCustomTasks({ disabled: false });
  const { openQuickLogModal } = useQuickLogActivity();

  const isStatusActivity =
    getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE).text === 'Status';
  const activityCustomTask = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  );
  const customTask = customTasks?.find(ct => ct.id === activityCustomTask);
  const activityCompany = getReferencedBobjectFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
  ) as Bobject<BobjectTypes.Company>;

  return (
    <div
      ref={ref}
      style={{ maxHeight: 48, cursor: 'pointer' }}
      onClick={() => onClickActivityView(activity, timeWindow, date)}
    >
      <div
        className={styles.dropdown_item_actions}
        style={{ visibility: hovering && !hideActivityHover ? 'visible' : 'hidden' }}
      >
        {onClickActivityEdit && !isStatusActivity && (
          <Button
            iconLeft="edit"
            size="small"
            variant="secondary"
            onClick={() => {
              closeDropdown();
              if (customTask) {
                //TODO check this
                openQuickLogModal({
                  customTask,
                  leads: [],
                  selectedBobject: getReferencedBobject(activity),
                  companyId: activityCompany?.id.value,
                  onSubmit: () => {
                    window.dispatchEvent(
                      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                        detail: { type: BobjectTypes.Activity },
                      }),
                    );
                  },
                  isEdition: true,
                  activity,
                });
              } else {
                onClickActivityEdit(activity);
              }
            }}
          />
        )}
        {onClickActivityExternal && (
          <Button
            iconLeft="externalLink"
            size="small"
            variant="secondary"
            onClick={() => {
              closeDropdown();
              onClickActivityExternal(activity);
            }}
          />
        )}
        {onClickActivityView && (
          <Button
            iconLeft="eye"
            size="small"
            variant="secondary"
            onClick={() => {
              closeDropdown();
              onClickActivityView(activity, timeWindow, date);
            }}
          />
        )}
      </div>
      <ActivityTimelineItem
        activity={activity}
        startDisplayDivider={false}
        endDisplayDivider={false}
        dataModel={dataModel}
        disableButtons={true}
        hovering={hovering}
        customTasks={customTasks}
      />
    </div>
  );
};
export const BadgeDropdownContent = ({
  dayTasks,
  cadenceAction,
  closeDropdown,
  date,
}: BadgeDropdownContentProps) => {
  const actions = dayTasks[cadenceAction];
  const isCustomTask = cadenceAction === 'customTask';
  const dataModel = useDataModel();
  return (
    <div className={styles.dropdown}>
      {isCustomTask
        ? actions.tasks
            .filter(task => {
              const customTask = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)
                ?.value;
              const hasActivity = actions.activities.find(activity => {
                return (
                  getFieldByLogicRole(activity.formBobject, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK)
                    ?.value === customTask
                );
              });
              return !hasActivity;
            })
            .map(task => (
              <ScheduledTaskItem
                key={task.id.value}
                {...scheduledTaskFromCustomTask(
                  injectReferenceFields(task) as Bobject<BobjectTypes.Task>,
                )}
              />
            ))
        : actions.tasks
            .slice(0, actions.tasks.length - actions.activities.length)
            .map(task => (
              <ScheduledTaskItem
                key={task.id.value}
                {...scheduledTaskFromNormalTask(injectReferenceFields(task), cadenceAction)}
              />
            ))}
      {dataModel &&
        actions.activities.map(activity => (
          <CompletedActivityItem
            key={activity.id.value}
            activity={injectReferenceFields(activity.formBobject)}
            dataModel={dataModel}
            closeDropdown={closeDropdown}
            date={date}
          />
        ))}
    </div>
  );
};
