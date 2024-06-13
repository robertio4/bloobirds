import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { formatDate, today } from '@bloobirds-it/utils';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameWeek,
  isValid,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { toTitleCase } from '../../utils/strings.utils';
import { TIME_WINDOW } from './timetable.constants';

export const getStatusColors = picklistFields => {
  if (!picklistFields) {
    throw new Error('picklistFields parameter is required');
  }
  if (!Array.isArray(picklistFields)) {
    throw new Error('picklistFields parameter must be an array');
  }
  const colors = {};

  picklistFields.forEach(pick => {
    const key = pick?.logicRole;

    if (key) {
      colors[key] = {
        backgroundColor: pick?.backgroundColor,
        textColor: pick?.textColor,
      };
    }
  });
  return colors;
};

export const getStatusActivities = (statusActivities, bobjectType) => {
  if (!statusActivities || !bobjectType) {
    throw new Error('Both parameters are required');
  }

  const activities = {};
  if (statusActivities) {
    Object.keys(statusActivities).forEach(activityDate => {
      const statusActivitiesForDay = statusActivities[activityDate];

      const bobjectStatusActivities = (statusActivitiesForDay || [])?.filter(
        activity => activity?.name === `${bobjectType}_STATUS_CHANGED`,
      );
      if (bobjectStatusActivities.length) {
        activities[activityDate] = {
          [`${bobjectType}_STATUS_CHANGED`]: bobjectStatusActivities,
        };
      }
    });
  }
  return activities;
};

export const isDaily = timeWindow => {
  if (!timeWindow) {
    throw new Error('Time window parameters is required');
  }
  if (typeof timeWindow !== 'string') {
    throw new Error('Time window parameters must be a string');
  }
  return timeWindow === TIME_WINDOW.DAILY;
};

export const isWeekly = timeWindow => {
  if (!timeWindow) {
    throw new Error('Time window parameters is required');
  }
  if (typeof timeWindow !== 'string') {
    throw new Error('Time window parameters must be a string');
  }

  return timeWindow === TIME_WINDOW.WEEKLY;
};

export const isMonthly = timeWindow => {
  if (!timeWindow) {
    throw new Error('Time window parameters is required');
  }
  if (typeof timeWindow !== 'string') {
    throw new Error('Time window parameters must be a string');
  }
  return timeWindow === TIME_WINDOW.MONTHLY;
};

export const addTimeTo = (arrayDate, timeType, timeNumber) => {
  if (!arrayDate || !timeType || timeNumber === 'undefined') {
    throw new Error('All parameters are required');
  }
  if (!Array.isArray(arrayDate)) {
    throw new Error('The dates variable must be an array');
  }
  if (typeof timeType !== 'string' || !['weeks', 'months'].includes(timeType)) {
    throw new Error('The time type variable must be a string or its value "weeks" or "months');
  }
  if (typeof timeNumber !== 'number') {
    throw new Error('The time number variable must be a number');
  }
  const timeArray = arrayDate;
  const lastTime = arrayDate[arrayDate?.length - 1];
  const endDate = lastTime?.split('/')[1];
  const parsedDate = new Date(endDate);

  if (!isValid(parsedDate)) {
    throw new Error('The dates are not valid');
  }

  Array.from(Array(timeNumber), (x, index) => index + 1).forEach(value => {
    const date = timeType === 'weeks' ? addWeeks(parsedDate, value) : addMonths(parsedDate, value);
    const start =
      timeType === 'weeks' ? startOfWeek(date, { weekStartsOn: 1 }) : startOfMonth(date);
    const end = timeType === 'weeks' ? endOfWeek(date, { weekStartsOn: 1 }) : endOfMonth(date);
    timeArray.push(`${formatDate(start, 'yyyy-MM-dd')}/${formatDate(end, 'yyyy-MM-dd')}`);
  });

  return timeArray;
};

export const getFirstElementDate = (object, timeWindow) => {
  if (!object || !timeWindow) {
    throw new Error('All parameters are required');
  }
  if (!(typeof object === 'object' && !Array.isArray(object))) {
    throw new Error('The first param must be an object');
  }
  if (!timeWindow || !TIME_WINDOW[timeWindow.toUpperCase()]) {
    throw new Error(
      'The second param must be an object or a valid type (daily, weekly or monthly)',
    );
  }
  if (Object.keys(object || {})?.length) {
    if (timeWindow === TIME_WINDOW.DAILY) {
      const objectDates = Object.keys(object || {}).map(objectDate => new Date(objectDate));
      return new Date(Math.min(...objectDates));
    }
    if ([TIME_WINDOW.WEEKLY, TIME_WINDOW.MONTHLY].includes(timeWindow)) {
      const firstObjectGrouping = Object.keys(object || {})[0];
      const startDate = firstObjectGrouping?.split('/')[0];
      return firstObjectGrouping ? new Date(startDate) : today();
    }
  }

  return today();
};

export const getLastElementDate = (object, timeWindow) => {
  if (!object || !timeWindow) {
    throw new Error('All parameters are required');
  }
  if (!(typeof object === 'object' && !Array.isArray(object))) {
    throw new Error('The first param must be an object');
  }
  if (!timeWindow || !TIME_WINDOW[timeWindow.toUpperCase()]) {
    throw new Error(
      'The second param must be an object or a valid type (daily, weekly or monthly)',
    );
  }
  if (Object.keys(object || {})?.length) {
    if (timeWindow === TIME_WINDOW.DAILY) {
      const objectDates = Object.keys(object || {}).map(objectDate => new Date(objectDate));
      return new Date(Math.max(...objectDates));
    }
    if ([TIME_WINDOW.WEEKLY, TIME_WINDOW.MONTHLY].includes(timeWindow)) {
      const objectKeys = Object.keys(object).sort();
      const lastObjectGrouping = objectKeys[objectKeys?.length - 1];
      const endDate = lastObjectGrouping?.split('/')[1];
      return endDate ? new Date(endDate) : today();
    }
  }

  return addDays(today(), 5);
};

export const mergeObjects = (objectA, objectB) => {
  if (!objectA || !objectB) {
    throw new Error('All parameters are required');
  }
  if (!(typeof objectA === 'object' && !Array.isArray(objectA))) {
    throw new Error('The first param must be an object');
  }
  if (!(typeof objectB === 'object' && !Array.isArray(objectB))) {
    throw new Error('The second param must be an object');
  }
  const keys = [...Object.keys(objectA || {}), ...Object.keys(objectB || {})];
  let objectsMerged = objectA;
  if (Object.keys(objectB || {})?.length > 0) {
    keys.forEach(objectDate => {
      if (objectB[objectDate] && objectsMerged[objectDate]) {
        objectsMerged = {
          ...objectsMerged,
          [objectDate]: {
            ...objectsMerged[objectDate],
            ...objectB[objectDate],
          },
        };
      } else if (objectB[objectDate] && !objectsMerged[objectDate]) {
        objectsMerged = {
          ...objectsMerged,
          [objectDate]: objectB[objectDate],
        };
      }
    });
  }

  return objectsMerged;
};

export const getStatusTooltipText = (bobjectType, statusesData) => {
  if (!bobjectType || !statusesData) {
    throw new Error('All parameters are required');
  }
  if (typeof bobjectType !== 'string' || !BOBJECT_TYPES[bobjectType]) {
    throw new Error(
      'The bobject type must be a string and its type must be Company, Lead, Activity, Task or Opportunity',
    );
  }
  if (!Array.isArray(statusesData)) {
    throw new Error('The status data param must be an array');
  }

  const status = statusesData[0];

  return status
    ? `${toTitleCase(bobjectType?.toLowerCase())} status changed ${statusesData?.length} times: ${
        status?.from ? 'from ' + status?.from : ''
      } to ${status?.to}`
    : '';
};

export const getTaskTooltipText = taskData => {
  if (!taskData) {
    throw new Error('The task data parameter is required');
  }
  if (!(typeof taskData === 'object' && !Array.isArray(taskData))) {
    throw new Error('The task data type must be an object');
  }
  const completedTasksForDayCount = Object.keys(taskData || {})
    ?.filter(taskType => taskType === 'TASKS_COMPLETED')
    ?.reduce((acc, taskType) => acc + taskData[taskType], 0);
  const notCompletedTasksForDayCount = Object.keys(taskData || {})
    ?.filter(taskType => taskType === 'TASKS')
    ?.reduce((acc, taskType) => acc + taskData[taskType], 0);
  let text = '';

  if (completedTasksForDayCount > 0) {
    text += `${completedTasksForDayCount} scheduled task completed`;
  }

  if (completedTasksForDayCount > 0 && notCompletedTasksForDayCount > 0) {
    text += ' and ';
  }

  if (notCompletedTasksForDayCount > 0) {
    text += `${notCompletedTasksForDayCount} scheduled task`;
  }

  return text;
};

export const getProspectTooltipText = (day, prospectTaskForDay, activitiesForDay, actionName) => {
  if (!day || prospectTaskForDay === undefined || activitiesForDay === undefined || !actionName) {
    throw new Error('All parameters are required');
  }
  if (typeof day !== 'string') {
    throw new Error('The day must be a string');
  }
  if (typeof prospectTaskForDay !== 'number') {
    throw new Error('The prospect task for the day must be a number');
  }
  if (typeof activitiesForDay !== 'number') {
    throw new Error('The activities for the day must be a number');
  }
  if (typeof actionName !== 'string') {
    throw new Error('The action must be a string');
  }

  if (prospectTaskForDay === 0 && activitiesForDay === 0) {
    return '';
  }
  const totalActivities = activitiesForDay - prospectTaskForDay;
  const actionParsedName = actionName?.replace(/_/g, ' ');
  const prospectTaskText = `${prospectTaskForDay} scheduled ${actionParsedName} ${
    activitiesForDay ? 'completed' : ''
  }`;
  const activitiesText =
    totalActivities > 0 ? ` ${totalActivities} non-scheduled ${actionParsedName} completed` : '';
  return `${prospectTaskText}${activitiesText}`;
};

export const getColumnKey = (day, timeWindow) => {
  if (timeWindow === TIME_WINDOW.DAILY) {
    return `day-${formatDate(day, 'yyyy-MM-dd')}`;
  }

  if (timeWindow === TIME_WINDOW.WEEKLY) {
    const startDate = startOfWeek(new Date(day), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(day), { weekStartsOn: 1 });
    return `day-${formatDate(startDate, 'yyyy-MM-dd')}-${formatDate(endDate, 'yyyy-MM-dd')}`;
  }

  if (timeWindow === TIME_WINDOW.MONTHLY) {
    const startDate = startOfMonth(new Date(day));
    const endDate = endOfMonth(new Date(day));
    return `day-${formatDate(startDate, 'yyyy-MM-dd')}-${formatDate(endDate, 'yyyy-MM-dd')}`;
  }
};

export const checkIsPausedDay = (date, timeWindow, pausedCadenceDays) => {
  if (!date || !timeWindow || !pausedCadenceDays) {
    throw new Error('All parameters are required');
  }

  if (!(typeof date === 'object' && !Array.isArray(date))) {
    throw new Error('The date must be an object');
  }

  if (typeof timeWindow !== 'string') {
    throw new Error('The time window must be a string');
  }

  if (![TIME_WINDOW.WEEKLY, TIME_WINDOW.MONTHLY].includes(timeWindow)) {
    throw new Error('The time window has a valid value');
  }

  if (!(typeof pausedCadenceDays === 'object' && !Array.isArray(pausedCadenceDays))) {
    throw new Error('The pause cadence data must be an object');
  }

  const action = isWeekly(timeWindow) ? isSameWeek : isSameMonth;

  return Array.from(pausedCadenceDays).some(pausedDay =>
    action(new Date(pausedDay), new Date(date?.start)),
  );
};
