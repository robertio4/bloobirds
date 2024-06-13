import React, { useEffect, useState } from 'react';

import {
  useUserDateOverdueTasks,
  useUserDateTasks,
  useUserTasks,
  useUserTasksFilters,
} from '../../hooks/useUserTasks';
import { TasksHookFamilies } from '../../typings/tasks';
import AppCalendarView from './appCalendar.view';

const AppCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [importantSelected, setImportantSelected] = useState(false);
  const { tasks, isLoading: isLoadingTodayTasks, resetItems: resetTasks } = useUserDateTasks({
    date: selectedDay,
    family: TasksHookFamilies.Calendar,
    importantSelected,
  });
  const {
    tasks: overdueTasks,
    isLoading: isLoadingOverdue,
    resetItems: resetOverdueTasks,
  } = useUserDateOverdueTasks({
    date: selectedDay,
    family: TasksHookFamilies.Calendar,
    importantSelected,
  });

  const {
    userFilter,
    prospectingTypesFilter,
    setUserFilter,
    setDateFilter,
    setProspectingTypesFilter,
    resetAllFilters,
  } = useUserTasksFilters(TasksHookFamilies.Calendar);

  const { data: calendarData } = useUserTasks(TasksHookFamilies.Calendar);

  const showOverdue =
    !!prospectingTypesFilter.find(f => f.enumName === 'OVERDUE' && f.enabled) ||
    prospectingTypesFilter.length === 0;

  useEffect(
    () => () => {
      resetAllFilters();
      resetTasks();
      resetOverdueTasks();
    },
    [],
  );

  return (
    <AppCalendarView
      tasks={tasks}
      overdueTasks={overdueTasks}
      isLoading={isLoadingTodayTasks || isLoadingOverdue}
      userFilter={userFilter}
      stage={'PROSPECT'}
      filters={prospectingTypesFilter}
      showOverdue={showOverdue}
      selectedDay={selectedDay}
      updateFilters={f => setProspectingTypesFilter(f?.PROSPECT)}
      setUserFilter={setUserFilter}
      setDateFilter={setDateFilter}
      setSelectedDay={setSelectedDay}
      calendarData={calendarData}
      importantSelected={importantSelected}
      setImportantSelected={setImportantSelected}
    />
  );
};

export default AppCalendar;
