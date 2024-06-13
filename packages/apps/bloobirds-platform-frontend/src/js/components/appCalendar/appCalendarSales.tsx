import React, { useEffect, useMemo, useState } from 'react';

import { injectReferencesSearchProcess } from '@bloobirds-it/utils';

import { useUserHomepageSettings } from '../../pages/homePage/hooks/useUserHomepageSettings';
import {
  useCalendarTasks,
  useHomeTasks,
} from '../../pages/homePage/pages/leftContent/utils/useHomeTasks';
import {
  defaultFilters,
  Filters,
  Stages,
} from '../../pages/homePage/pages/leftContent/utils/utils';
import { ConfigType } from '../../pages/homePage/typings/home';
import {
  getAvailableUserConfig,
  getUserSettingConfigType,
} from '../../pages/homePage/utils/homepage';
import AppCalendarView from './appCalendar.view';

const AppCalendarSales = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedStage, setSelectedStage] = useState<Stages>('ALL');
  const [selectedFilters, setSelectedFilters] = useState(defaultFilters);
  const [importantSelected, setImportantSelected] = useState(false);
  const { availableSettings, userSettings } = useUserHomepageSettings();
  const [userFilter, setUserFilter] = useState();
  const [tasks, setTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [showOverdue, setShowOverdue] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const availableFilters = useMemo(() => {
    return {
      prospect: getAvailableUserConfig(availableSettings, ConfigType.TASKS_SECTION_FILTERS),
      sales: getAvailableUserConfig(availableSettings, ConfigType.TASKS_SECTION_FILTERS_SALES),
    };
  }, [availableSettings]);

  const userFilters = useMemo(() => {
    return {
      prospect: getUserSettingConfigType(userSettings, ConfigType.TASKS_SECTION_FILTERS),
      sales: getUserSettingConfigType(userSettings, ConfigType.TASKS_SECTION_FILTERS_SALES),
    };
  }, [userSettings]);

  useEffect(() => {
    const PROSPECT = userFilters.prospect ?? availableFilters.prospect;
    const SALES = userFilters.sales ?? availableFilters.sales;
    if (PROSPECT && SALES) {
      const initFilters: Filters = { PROSPECT, SALES };
      updateFilters(initFilters);
    }
  }, [availableSettings, userSettings]);

  const { data: tasksData, isLoading: isLoadingTodayTasks } = useHomeTasks({
    stage: selectedStage,
    taskFilters: selectedFilters,
    page: 100,
    overdue: false,
    dateFilter: selectedDay,
    usersFilter: userFilter,
    importantSelected,
  });

  const { data: overdueTasksData, isLoading: isLoadingOverdue } = useHomeTasks({
    stage: selectedStage,
    taskFilters: selectedFilters,
    page: 100,
    overdue: true,
    dateFilter: selectedDay,
    usersFilter: userFilter,
    importantSelected,
  });

  const { data: calendarData } = useCalendarTasks(
    selectedStage,
    selectedFilters,
    userFilter,
    selectedDay,
    showCompleted,
    showOverdue,
  );

  useEffect(() => {
    if (tasksData?.data) {
      const newTasks = injectReferencesSearchProcess(tasksData?.data).contents;
      setTasks(newTasks);
    }
  }, [tasksData]);

  useEffect(() => {
    if (overdueTasksData?.data) {
      const newTasks = injectReferencesSearchProcess(overdueTasksData?.data).contents;
      setOverdueTasks(newTasks);
    }
  }, [overdueTasksData]);

  useEffect(() => {
    if (selectedStage === 'ALL') {
      setShowOverdue(
        selectedFilters.PROSPECT.find(f => f.enumName.includes('OVERDUE'))?.enabled ||
          selectedFilters.SALES.find(f => f.enumName.includes('OVERDUE'))?.enabled,
      );
      setShowCompleted(
        selectedFilters.PROSPECT.find(f => f.enumName.includes('COMPLETED'))?.enabled ||
          selectedFilters.SALES.find(f => f.enumName.includes('COMPLETED'))?.enabled,
      );
    } else {
      setShowOverdue(
        selectedFilters[selectedStage].find(f => f.enumName.includes('OVERDUE'))?.enabled,
      );
      setShowCompleted(
        selectedFilters[selectedStage].find(f => f.enumName.includes('COMPLETED'))?.enabled,
      );
    }
  }, [selectedStage, selectedFilters, overdueTasks]);

  //const showOverdue = filters.includes('OVERDUE') || filters.length === 0;
  const updateStage = (stage: Stages) => {
    setSelectedStage(stage);
  };

  const updateFilters = (filters: Filters) => {
    setSelectedFilters(filters);
  };

  const setDateFilter = (date: Date) => {
    setSelectedDay(date);
  };

  return (
    <AppCalendarView
      tasks={tasks}
      overdueTasks={overdueTasks}
      isLoading={isLoadingTodayTasks || isLoadingOverdue}
      userFilter={userFilter}
      stage={selectedStage}
      filters={selectedFilters}
      importantSelected={importantSelected}
      showOverdue={showOverdue}
      selectedDay={selectedDay}
      updateStage={updateStage}
      updateFilters={updateFilters}
      setUserFilter={setUserFilter}
      setDateFilter={setDateFilter}
      setSelectedDay={setSelectedDay}
      setImportantSelected={setImportantSelected}
      calendarData={calendarData}
    />
  );
};

export default AppCalendarSales;
