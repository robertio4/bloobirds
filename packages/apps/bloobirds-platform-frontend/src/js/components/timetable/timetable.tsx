import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  ColorType,
  Dropdown,
  Icon,
  IconButton,
  IconType,
  Item,
  Skeleton,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { usePausePeriods } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes, TASK_TYPE } from '@bloobirds-it/types';
import { parseUTCDateToLocal } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isWeekend } from 'date-fns';
import { snakeCase } from 'lodash';

import { useContactView, useEntity, usePicklistValues } from '../../hooks';
import { useActiveActivitiesFilters } from '../../hooks/useActiveActivities';
import { useCadenceTable } from '../../hooks/useCadenceTable';
import { useGlobalPicklistValues } from '../../hooks/usePicklistValues';
import { usePreviewEmailModal } from '../../hooks/usePreviewEmailModal';
import {
  useTimetable,
  useTimetableActivitiesAggregation,
  useTimetableAutoemailActivities,
  useTimetableBouncedEmailActivities,
  useTimetableProspectTasks,
  useTimetableStatusActivities,
  useTimetableTasksAggregation,
} from '../../hooks/useTimetable';
import { getValueFromLogicRole } from '../../utils/bobjects.utils';
import WithTooltip from '../withTooltip/withTooltip';
import ColumnHeader from './columnHeader/columnHeader';
import {
  ACTIONS_ICONS,
  ACTIONS_NAME,
  ACTIONS_ORDERING,
  ACTIONS_TYPES,
  TIME_WINDOW,
} from './timetable.constants';
import styles from './timetable.module.css';
import {
  checkIsPausedDay,
  getFirstElementDate,
  getLastElementDate,
  getProspectTooltipText,
  getStatusActivities,
  getStatusColors,
  getStatusTooltipText,
  getTaskTooltipText,
  isDaily,
  mergeObjects,
} from './timetable.utils';

interface TimetableProps {
  offsetDays: number;
  bobject: Bobject;
  onScrollTo: (x: Date) => void;
  timeWindow: typeof TIME_WINDOW;
  timeTableItems: string[];
  columnVirtualizer: any;
  isLoaded: (isTimetableLoaded: boolean) => boolean;
}

interface DailyInterface {
  type: string;
  timeWindowFilter: typeof TIME_WINDOW.DAILY;
  dateItem: string;
}

interface PeriodInterface {
  type: string;
  timeWindowFilter: typeof TIME_WINDOW.WEEKLY | typeof TIME_WINDOW.MONTHLY;
  dateItem: string;
}

type TimeWindowInterface = DailyInterface | PeriodInterface;

const Timetable = React.forwardRef<React.MutableRefObject<HTMLDivElement>, TimetableProps>(
  (
    {
      offsetDays = 0,
      bobject,
      onScrollTo,
      timeWindow = TIME_WINDOW.DAILY,
      timeTableItems,
      columnVirtualizer,
      isLoaded = () => {},
    },
    sliderRef,
  ) => {
    const [clickedDayInfo, setClickedDayInfo] = useState<string>();
    const bobjectType = bobject?.id.typeName.toUpperCase() as Uppercase<BobjectTypes>;
    const bobjectAssignedTo = getValueFromLogicRole(bobject, `${bobjectType}__ASSIGNED_TO`);
    const { setDateFilter, resetTypeFilter } = useActiveActivitiesFilters();
    const { setTab } = useContactView();
    const [isTimetableLoaded, setTimetableLoaded] = useState(false);
    const { cadence: bobjectCadence, defaultCadence } = useCadenceTable(bobject);
    const cadence = bobjectCadence || defaultCadence;
    const {
      handleOpenModal: handleOpenTemplateModal,
      isOpen: isTemplateModalOpen,
    } = usePreviewEmailModal();
    const emailTemplatesEntity = useGlobalPicklistValues({ logicRole: 'EMAIL' });

    function getEmailTemplateName(templateId: string) {
      return emailTemplatesEntity.find(template => template.id === templateId)?.value;
    }

    useTimetable({ bobject });

    const {
      data: cadenceActivities,
      isLoading: isLoadingCadenceActivities,
    } = useTimetableActivitiesAggregation();
    const {
      data: completedTasks,
      isLoading: isLoadingCompletedTasks,
    } = useTimetableTasksAggregation();
    const {
      data: statusActivitiesData,
      isLoading: isLoadingStatusActivities,
    } = useTimetableStatusActivities();

    const {
      data: autoemailActivitiesData,
      isLoading: isLoadingAutoemailActivities,
    } = useTimetableAutoemailActivities();

    const {
      data: bouncedEmailActivitiesData,
      isLoading: isLoadingBouncedEmailActivities,
    } = useTimetableBouncedEmailActivities();

    const { data: prospectTasks, isLoading: isLoadingProspectTasks } = useTimetableProspectTasks();

    const { periods } = usePausePeriods({
      userId: bobjectAssignedTo,
    });
    const [activities, setActivities] = useState({});
    const [tasks, setTasks] = useState({});

    const statusActivities = useMemo(
      () =>
        statusActivitiesData &&
        bobjectType &&
        getStatusActivities(statusActivitiesData, bobjectType),
      [statusActivitiesData, bobjectType],
    );
    const bobjectPicklistFieldValues = usePicklistValues({
      picklistLogicRole: `${bobjectType}__STATUS`,
    });
    const bubbleRef = useRef();
    const { ref, visible, setVisible } = useVisible(false, bubbleRef);
    const statusColors = getStatusColors(bobjectPicklistFieldValues);
    const cadenceActionTypesEntity = useEntity('cadenceActionTypes');
    const pausedCadenceDays = periods?.uniqueDates;
    const [mouseDown, setMouseDown] = useState(false);
    const cadenceActionTypes = cadenceActionTypesEntity?.all()?.sort((a, b) => {
      const aNamePosition = ACTIONS_ORDERING.indexOf(a?.enumName);
      const bNamePosition = ACTIONS_ORDERING.indexOf(b?.enumName);
      return aNamePosition > bNamePosition ? 1 : -1;
    });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cadenceTypes = [
      ...(cadenceActionTypes || []),
      { enumName: 'TASKS' },
      { enumName: 'INBOUND' },
      { enumName: 'STATUS' },
    ];

    const firstActivityDate = useMemo(() => getFirstElementDate(activities || {}, timeWindow), [
      activities,
    ]);
    const lastActivityDate = useMemo(() => getLastElementDate(activities || {}, timeWindow), [
      activities,
    ]);
    const firstProspectTaskDate = useMemo(
      () => getFirstElementDate(prospectTasks || {}, timeWindow),
      [prospectTasks],
    );
    const lastProspectTaskDate = useMemo(
      () => getLastElementDate(prospectTasks || {}, timeWindow),
      [prospectTasks],
    );

    const startDragging = (e: MouseEvent) => {
      setMouseDown(true);
      sliderRef.current.startX = e.pageX - sliderRef.current.offsetLeft;
      sliderRef.current.currentScrollLeft = sliderRef.current.scrollLeft;
    };

    const dragging = e => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }
      const x = e.pageX - sliderRef.current.offsetLeft;
      const scroll = x - sliderRef.current.startX;
      sliderRef.current.scrollLeft = sliderRef.current.currentScrollLeft - scroll;
    };

    const stopDragging = () => {
      setMouseDown(false);
    };

    useEffect(() => {
      if (
        !isLoadingCadenceActivities &&
        !isLoadingAutoemailActivities &&
        !isLoadingBouncedEmailActivities &&
        !isLoadingCompletedTasks &&
        !isLoadingStatusActivities &&
        !isLoadingProspectTasks
      ) {
        setTimetableLoaded(true);
      }
    }, [
      isLoadingCadenceActivities,
      isLoadingBouncedEmailActivities,
      isLoadingAutoemailActivities,
      isLoadingCompletedTasks,
      isLoadingStatusActivities,
      isLoadingProspectTasks,
    ]);

    useEffect(() => {
      if (sliderRef?.current && isTimetableLoaded) {
        isLoaded(isTimetableLoaded);
      }
    }, [sliderRef?.current, isTimetableLoaded]);

    useEffect(() => {
      if (
        cadenceActivities &&
        statusActivities &&
        autoemailActivitiesData &&
        bouncedEmailActivitiesData &&
        Object.keys(statusActivities || {}).length > 0
      ) {
        const mergedActivities = mergeObjects(
          mergeObjects(cadenceActivities, statusActivities),
          mergeObjects(autoemailActivitiesData, bouncedEmailActivitiesData),
        );
        if (mergedActivities) {
          setActivities(mergedActivities);
        }
      } else if (cadenceActivities) {
        setActivities(cadenceActivities);
      } else {
        setActivities(statusActivities);
      }
    }, [cadenceActivities, statusActivities, autoemailActivitiesData, bouncedEmailActivitiesData]);

    useEffect(() => {
      if (completedTasks && prospectTasks) {
        const mergedTasks = mergeObjects(completedTasks, prospectTasks);
        if (mergedTasks) {
          setTasks(mergedTasks);
        }
      }
    }, [completedTasks, prospectTasks]);

    const getScheduledTasksForDay = (activitiesForDay: number, scheduledTasksForDay: number) => {
      let total = 0;

      if (activitiesForDay === 0) {
        total = activitiesForDay;
      } else if (activitiesForDay < scheduledTasksForDay) {
        total = activitiesForDay;
      } else {
        total = scheduledTasksForDay;
      }

      return total;
    };

    const getNonScheduledTasksForDay = (activitiesForDay: number, scheduledTasksForDay: number) => {
      let total = 0;

      if (activitiesForDay > scheduledTasksForDay) {
        total = activitiesForDay - scheduledTasksForDay;
      }

      return total;
    };

    const handleClickItem = ({ type, timeWindowFilter, dateItem }: TimeWindowInterface) => {
      if (type === TASK_TYPE.NEXT_STEP) {
        setTab('Tasks');
        setTimeout(() => (window.location.hash = '#taskTab'), 300);
        setTimeout(() => (window.location.hash = ''), 2300);
        return;
      }

      if (timeWindowFilter === TIME_WINDOW.DAILY) {
        setDateFilter({ startDate: new Date(dateItem), endDate: new Date(dateItem) });
      } else if ([TIME_WINDOW.WEEKLY, TIME_WINDOW.MONTHLY].includes(timeWindowFilter)) {
        setDateFilter({ startDate: new Date(dateItem.start), endDate: new Date(dateItem.end) });
      }
      resetTypeFilter();
      setTab('Activity');
      setTimeout(() => {
        document.querySelector('#activity-tab').scrollIntoView({ behavior: 'smooth' });
      }, 250);
    };

    return isTimetableLoaded ? (
      <div className={styles._container} data-test="Timetable-Container">
        <div className={clsx(styles._column, styles._first_column)}>
          <div className={styles._row} />
          {cadenceTypes?.map(cadenceAction => {
            const cadenceActionName = cadenceAction?.enumName as keyof typeof ACTIONS_ICONS;
            const actionConfig = ACTIONS_ICONS[cadenceActionName];
            if (cadenceActionName === 'CUSTOM_TASK') {
              return null;
            }
            return (
              <div className={styles._row} key={cadenceActionName}>
                <Icon
                  name={(actionConfig?.name || 'noteAction') as IconType}
                  color={actionConfig?.color as ColorType}
                />
                <Text size="xs" color="softPeanut" uppercase>
                  {ACTIONS_NAME[cadenceActionName] || cadenceAction?.name}
                </Text>
              </div>
            );
          })}
        </div>
        <div className={styles._column}>
          <div className={styles._row}>
            <Tooltip position="top" title="First activity">
              <IconButton
                name="chevronFirst"
                color="darkBloobirds"
                size={16}
                onClick={() => onScrollTo(firstActivityDate)}
                disabled={!firstActivityDate}
              />
            </Tooltip>
            <Tooltip position="top" title="First cadence day">
              <IconButton
                name="flag"
                size={16}
                color="darkBloobirds"
                onClick={() => onScrollTo(firstProspectTaskDate)}
                disabled={!firstProspectTaskDate}
              />
            </Tooltip>
          </div>
          {cadenceTypes
            ?.filter(t => t?.enumName !== 'CUSTOM_TASK')
            .map(cadenceAction => (
              <div className={styles._row} key={`empty-row-${cadenceAction?.enumName}`} />
            ))}
        </div>
        <div
          className={styles._scrollable}
          ref={sliderRef}
          id="cadence-timetable"
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={dragging}
        >
          <div
            style={{
              width: `${columnVirtualizer.totalSize}px`,
              height: '100%',
              position: 'relative',
            }}
          >
            {timeWindow &&
              columnVirtualizer.virtualItems.map(
                (virtualColumn: { index: React.Key; size: any; start: any }) => {
                  const day = timeTableItems[virtualColumn.index];
                  const isDailyTimeWindow = isDaily(timeWindow);
                  const date = isDailyTimeWindow
                    ? day
                    : { start: day?.split('/')[0], end: day?.split('/')[1] };
                  const activitiesForDay = activities && activities[day];
                  const tasksForDay = tasks && tasks[day];
                  const prospectTasksForDay = tasksForDay?.PROSPECT_TASKS;
                  const scheduledTasksForDay = Object.keys(tasksForDay || {})
                    ?.filter(taskType => !['TEMPLATE_IDS', 'PROSPECT_TASKS'].includes(taskType))
                    ?.sort((taskA, taskB) => (taskA > taskB ? 1 : -1))
                    ?.reduce((res, key) => ({ ...res, [key]: tasksForDay[key] }), {});
                  const totalProspectTasksForDay = prospectTasksForDay?.reduce((prev, cur) => {
                    prev[cur] = (prev[cur] || 0) + 1;
                    return prev;
                  }, {});
                  const isDayPaused =
                    !isDailyTimeWindow &&
                    pausedCadenceDays &&
                    checkIsPausedDay(date, timeWindow, pausedCadenceDays);
                  const columnKey =
                    timeWindow === TIME_WINDOW.DAILY
                      ? `day-${date}`
                      : `day-${date?.start}-${date?.end}`;

                  return (
                    <div
                      key={virtualColumn.index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${virtualColumn.size}px`,
                        transform: `translateX(${virtualColumn.start}px)`,
                      }}
                      className={styles._column}
                      id={columnKey}
                    >
                      <ColumnHeader
                        date={date}
                        timeWindow={timeWindow}
                        isPausedDay={!isDailyTimeWindow && isDayPaused}
                        startCadenceDate={firstProspectTaskDate}
                        endCadenceDate={lastProspectTaskDate}
                      />
                      {cadenceTypes?.map(action => {
                        if (action?.enumName === 'CUSTOM_TASK') {
                          return null;
                        }
                        const actionName = action?.enumName.toLowerCase();
                        const actionEnum = action?.enumName;
                        const activitiesForAction =
                          Object.keys(activitiesForDay || {}).filter(activityType => {
                            return (
                              activityType === actionEnum ||
                              (actionEnum !== 'AUTOMATED_EMAIL' &&
                                actionEnum !== 'EMAIL' &&
                                activityType.includes(actionEnum))
                            );
                          }) || [];
                        const hasActivitiesForAction = !!activitiesForAction?.length;
                        const hasBouncedEmails =
                          activitiesForDay && activitiesForDay['BOUNCED_EMAIL'];
                        const hasBouncedAutomatedEmails =
                          activitiesForDay && activitiesForDay['BOUNCED_AUTOMATED_EMAIL'];
                        const activitiesForDayAction = hasActivitiesForAction
                          ? activitiesForDay[actionEnum]
                          : 0;
                        const hasProspectTaskForDay = prospectTasksForDay?.length
                          ? prospectTasksForDay.includes(actionEnum)
                          : false;
                        const scheduledTasksActionForDay = hasProspectTaskForDay
                          ? getScheduledTasksForDay(
                              hasActivitiesForAction ? activitiesForDay[actionEnum] : 0,
                              totalProspectTasksForDay[actionEnum],
                            )
                          : 0;
                        let nonScheduledTasksActionForDay = hasActivitiesForAction
                          ? getNonScheduledTasksForDay(
                              activitiesForDay[actionEnum],
                              scheduledTasksActionForDay,
                            )
                          : 0;
                        const hasScheduledActivities = scheduledTasksActionForDay > 0;

                        if (timeWindow === TIME_WINDOW.DAILY && hasActivitiesForAction) {
                          nonScheduledTasksActionForDay = activitiesForDay[actionEnum];
                        }
                        const hasProspectTasksForDay =
                          prospectTasksForDay?.length > 0 &&
                          prospectTasksForDay.includes(actionEnum);
                        const tooltipText =
                          hasProspectTasksForDay &&
                          getProspectTooltipText(
                            day,
                            hasProspectTaskForDay
                              ? totalProspectTasksForDay[actionEnum] || activitiesForDayAction
                              : null,
                            activitiesForDayAction,
                            actionName,
                          );
                        const emailHasBouncedOccurrences =
                          (actionEnum === 'EMAIL' && hasBouncedEmails) ||
                          (actionEnum === 'AUTOMATED_EMAIL' && hasBouncedAutomatedEmails);

                        return (
                          <div
                            className={clsx(styles._row, {
                              [styles._weekendDay]: isWeekend(parseUTCDateToLocal(day, timeZone)),
                              [styles._pausedDay]: isDailyTimeWindow && pausedCadenceDays?.has(day),
                            })}
                            key={`${day}-${actionEnum}`}
                          >
                            {hasProspectTasksForDay && (
                              <WithTooltip
                                isDisabled={!isTemplateModalOpen}
                                title={`${tooltipText}${
                                  emailHasBouncedOccurrences
                                    ? `. ${emailHasBouncedOccurrences} of them bounced`
                                    : ''
                                }`}
                              >
                                {((!isDailyTimeWindow && hasScheduledActivities) ||
                                  isDailyTimeWindow) && (
                                  <span
                                    data-test={`Item-CadenceCircle-${cadence?.name}`}
                                    className={clsx(
                                      styles._marker,
                                      styles[`_marker_${actionName}`],
                                    )}
                                    onClick={() => {
                                      if (actionEnum === 'AUTOMATED_EMAIL')
                                        handleOpenTemplateModal({
                                          taskId: tasksForDay.IDS,
                                        });
                                    }}
                                  />
                                )}
                                {!isDailyTimeWindow && (
                                  <>
                                    {((actionEnum === 'EMAIL' && hasBouncedEmails) ||
                                      (actionEnum === 'AUTOMATED_EMAIL' &&
                                        hasBouncedAutomatedEmails)) && (
                                      <div
                                        className={clsx({
                                          [styles._bounced_daily_warning]:
                                            hasBouncedEmails && timeWindow === TIME_WINDOW.DAILY,
                                          [styles._bounced_macro_warning]:
                                            hasBouncedEmails && timeWindow !== TIME_WINDOW.DAILY,
                                          [styles._automated_bounced_daily_warning]:
                                            hasBouncedAutomatedEmails &&
                                            timeWindow === TIME_WINDOW.DAILY,
                                          [styles._automated_bounced_macro_warning]:
                                            hasBouncedAutomatedEmails &&
                                            timeWindow !== TIME_WINDOW.DAILY,
                                        })}
                                      />
                                    )}
                                    <Dropdown
                                      ref={ref}
                                      visible={
                                        visible &&
                                        day === clickedDayInfo &&
                                        actionEnum === 'AUTOMATED_EMAIL'
                                      }
                                      anchor={
                                        <span
                                          ref={bubbleRef}
                                          data-test={`Item-CadenceCircle-${cadence?.name}`}
                                          onClick={() => {
                                            if (hasScheduledActivities) {
                                              handleClickItem({
                                                timeWindowFilter: timeWindow,
                                                dateItem: date,
                                              });
                                            }
                                            if (actionEnum === 'AUTOMATED_EMAIL') {
                                              setClickedDayInfo(day);
                                              setVisible(!visible);
                                            }
                                          }}
                                          className={clsx(
                                            styles._marker_range,
                                            styles[`_marker_${actionName}`],
                                            {
                                              [styles._marker_selected]: hasScheduledActivities,
                                              [styles._marker_completed]: hasScheduledActivities,
                                            },
                                          )}
                                        >
                                          {hasProspectTaskForDay &&
                                            `${scheduledTasksActionForDay} / ${totalProspectTasksForDay[actionEnum]}`}
                                        </span>
                                      }
                                    >
                                      {actionEnum === 'AUTOMATED_EMAIL' &&
                                        tasksForDay.IDS?.map((taskId: string, index: number) => {
                                          return (
                                            <Item
                                              key={index}
                                              onClick={() => {
                                                setVisible(false);
                                                handleOpenTemplateModal({
                                                  taskId,
                                                });
                                              }}
                                            >
                                              <Icon
                                                className={styles._auto_email_dropdown_item}
                                                name="autoMail"
                                                color="banana"
                                              />
                                              {getEmailTemplateName(
                                                tasksForDay.TEMPLATE_IDS?.[index],
                                              )}
                                            </Item>
                                          );
                                        })}
                                    </Dropdown>
                                  </>
                                )}
                                {hasActivitiesForAction && nonScheduledTasksActionForDay > 0 && (
                                  <>
                                    {hasBouncedEmails && (
                                      <div
                                        className={clsx({
                                          [styles._bounced_daily_warning]:
                                            hasBouncedEmails && timeWindow === TIME_WINDOW.DAILY,
                                          [styles._bounced_compound_warning]:
                                            hasBouncedEmails && timeWindow !== TIME_WINDOW.DAILY,
                                        })}
                                      />
                                    )}
                                    {hasBouncedAutomatedEmails && (
                                      <div
                                        className={clsx({
                                          [styles._automated_bounced_daily_warning]:
                                            timeWindow === TIME_WINDOW.DAILY,
                                          [styles._automated_bounced_macro_warning]:
                                            timeWindow !== TIME_WINDOW.DAILY,
                                        })}
                                      />
                                    )}
                                    <span
                                      onClick={() =>
                                        handleClickItem({
                                          timeWindowFilter: timeWindow,
                                          dateItem: date,
                                        })
                                      }
                                      data-test={`Item-CadenceCircle-${cadence?.name}`}
                                      className={clsx(
                                        styles._marker,
                                        styles._marker_selected,
                                        styles._marker_completed,
                                        styles[`_marker_${actionName}`],
                                      )}
                                    >
                                      {scheduledTasksActionForDay
                                        ? nonScheduledTasksActionForDay
                                        : activitiesForDay[actionEnum]}
                                    </span>
                                  </>
                                )}
                              </WithTooltip>
                            )}
                            {!hasProspectTaskForDay &&
                              hasActivitiesForAction &&
                              actionEnum !== ACTIONS_TYPES.STATUS && (
                                <Tooltip
                                  position="top"
                                  title={
                                    emailHasBouncedOccurrences
                                      ? `${
                                          activitiesForDay[actionEnum]
                                        } non-scheduled ${actionName.replaceAll(
                                          '_',
                                          ' ',
                                        )} completed. ${emailHasBouncedOccurrences} of them bounced`
                                      : `${
                                          activitiesForDay[actionEnum]
                                        } non-scheduled ${actionName.replaceAll(
                                          '_',
                                          ' ',
                                        )} completed.`
                                  }
                                >
                                  {hasBouncedEmails && (
                                    <div
                                      className={clsx({
                                        [styles._bounced_daily_warning]: hasBouncedEmails,
                                      })}
                                    />
                                  )}
                                  {hasBouncedAutomatedEmails && (
                                    <div
                                      className={clsx({
                                        [styles._bounced_daily_warning]: hasBouncedEmails,
                                      })}
                                    />
                                  )}
                                  <span
                                    onClick={() =>
                                      handleClickItem({
                                        timeWindowFilter: timeWindow,
                                        dateItem: date,
                                      })
                                    }
                                    data-test={`Item-CadenceCircle-${cadence?.name}`}
                                    className={clsx(
                                      styles._marker,
                                      styles._marker_selected,
                                      styles[`_marker_${actionName}`],
                                    )}
                                  >
                                    {activitiesForDay[actionEnum]}
                                  </span>
                                </Tooltip>
                              )}
                            {hasActivitiesForAction && actionEnum === ACTIONS_TYPES.STATUS && (
                              <Tooltip
                                position="top"
                                title={() =>
                                  getStatusTooltipText(
                                    bobjectType,
                                    activitiesForDay[activitiesForAction[0]],
                                  )
                                }
                              >
                                {activitiesForAction.map(activityType => {
                                  const statusType = activitiesForDay[activityType][0]?.to;
                                  const statusTypeLogicRole = `${bobjectType}__STATUS__${snakeCase(
                                    statusType,
                                  )?.toUpperCase()}`;
                                  const color = statusColors[statusTypeLogicRole];

                                  return (
                                    <span
                                      onClick={() =>
                                        handleClickItem({
                                          timeWindowFilter: timeWindow,
                                          dateItem: date,
                                        })
                                      }
                                      data-test={`Item-CadenceCircle-${cadence?.name}`}
                                      key={`activity-bullet-${cadence?.name}`}
                                      style={{
                                        color: color?.textColor,
                                        backgroundColor: color?.backgroundColor,
                                        borderColor: color?.backgroundColor,
                                      }}
                                      className={clsx(
                                        styles._marker,
                                        styles._marker_selected,
                                        styles[`_marker_${actionName}`],
                                      )}
                                    >
                                      {activitiesForDay[activityType]?.length}
                                    </span>
                                  );
                                })}
                              </Tooltip>
                            )}
                            {scheduledTasksForDay && actionEnum === ACTIONS_TYPES.TASKS && (
                              <Tooltip
                                position="top"
                                title={() => getTaskTooltipText(scheduledTasksForDay)}
                              >
                                {Object.keys(scheduledTasksForDay).map(task => {
                                  const hasScheduledTask = Object.keys(
                                    scheduledTasksForDay,
                                  )?.includes(ACTIONS_TYPES.TASKS);
                                  const hasCompletedScheduledTask = Object.keys(
                                    scheduledTasksForDay,
                                  )?.includes(ACTIONS_TYPES.TASKS_COMPLETED);
                                  const isCompleted = task === ACTIONS_TYPES.TASKS_COMPLETED;
                                  return (
                                    <React.Fragment key={task}>
                                      {isDailyTimeWindow ? (
                                        <span
                                          onClick={() =>
                                            handleClickItem({
                                              type: TASK_TYPE.NEXT_STEP,
                                              timeWindowFilter: timeWindow,
                                              dateItem: date,
                                            })
                                          }
                                          data-test={`Item-CadenceCircle-${cadence?.name}`}
                                          className={clsx(styles._marker, styles._marker_task, {
                                            [styles._marker_selected]: isCompleted,
                                            [styles._marker_completed]:
                                              isCompleted && hasScheduledTask,
                                          })}
                                        >
                                          {isCompleted ? tasksForDay[task] : ''}
                                        </span>
                                      ) : (
                                        <>
                                          {((!hasCompletedScheduledTask &&
                                            task === ACTIONS_TYPES.TASKS) ||
                                            isCompleted) && (
                                            <span
                                              onClick={() => {
                                                if (isCompleted && hasScheduledTask) {
                                                  handleClickItem({
                                                    type: TASK_TYPE.NEXT_STEP,
                                                    timeWindowFilter: timeWindow,
                                                    dateItem: date,
                                                  });
                                                }
                                              }}
                                              data-test={`Item-CadenceCircle-${cadence?.name}`}
                                              className={clsx(styles._marker, styles._marker_task, {
                                                [styles._marker_range]: true,
                                                [styles._marker_selected]: isCompleted,
                                                [styles._marker_completed]:
                                                  isCompleted && hasScheduledTask,
                                              })}
                                            >
                                              {`${
                                                tasksForDay[ACTIONS_TYPES.TASKS_COMPLETED] || 0
                                              } / ${tasksForDay[task]}`}
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </Tooltip>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                },
              )}
          </div>
        </div>
        <div className={styles._column}>
          <div className={styles._row}>
            <Tooltip position="top" title="Last cadence day">
              <IconButton
                name="flagFilled"
                size={16}
                color="darkBloobirds"
                onClick={() => {
                  onScrollTo(lastProspectTaskDate);
                }}
                disabled={!lastProspectTaskDate}
              />
            </Tooltip>
            <Tooltip position="top" title="Last activity">
              <IconButton
                name="chevronLast"
                color="darkBloobirds"
                size={16}
                onClick={() => onScrollTo(lastActivityDate)}
                disabled={!lastActivityDate}
              />
            </Tooltip>
          </div>
          {cadenceTypes
            ?.filter(t => t?.enumName !== 'CUSTOM_TASK')
            .map((type, index) => (
              <div key={`row-column-${index}`} className={styles._row} />
            ))}
        </div>
      </div>
    ) : (
      <Skeleton width="100%" height={230} variant="rect" />
    );
  },
);

export default Timetable;
