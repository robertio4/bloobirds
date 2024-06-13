import React from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import { TasksTooltip } from '../../../../../components/discoveryTooltips/welcomeTooltips/tasksTooltip';
import { getValueFromLogicRole } from '../../../../../utils/bobjects.utils';
import styles from '../../../homePage.module.css';
import { ConfigType, UserHomeConfig } from '../../../typings/home';

// General

export type Stage = 'PROSPECT' | 'SALES';
export type Stages = Stage | 'ALL';
export type Filters = Record<'PROSPECT' | 'SALES', UserHomeConfig[]>;
export const defaultFilters: Filters = { PROSPECT: [], SALES: [] };

export const isStatus = (filter: string): boolean => {
  return ['COMPLETED', 'OVERDUE', 'COMPLETED_SALES', 'OVERDUE_SALES'].includes(filter);
};

// Filter Dropdown utils

export const CONFIG_TYPE_BY_STAGE: Record<Stage, ConfigType> = {
  PROSPECT: ConfigType.TASKS_SECTION_FILTERS,
  SALES: ConfigType.TASKS_SECTION_FILTERS_SALES,
};

// Task List Subcomponents and utils

export const DateGroupHeader = ({ text }: { text: string }) => (
  <header>
    <Text color="softPeanut" weight="medium" size="xs" inline className={styles.heading_text}>
      {text}
    </Text>
  </header>
);

export const NoFilterSelected = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.noTasks}>
      <Text size="m" color="softPeanut" align="center">
        {t('home.leftContent.taskList.noTypeSelected')}
      </Text>
    </div>
  );
};

export const LoadingSpinner = () => (
  <div className={styles.spinner}>
    <Spinner size={24} name={'loadingCircle'} />
  </div>
);

export const EmptyTaskList = () => {
  const { t } = useTranslation();
  return (
    <div style={{ height: '100%' }}>
      <TasksTooltip defaultTooltipVisible />
      <div className={styles.noTasks}>
        <Text size="l" align="center">
          {t('home.leftContent.taskList.allClear')}
        </Text>
        <Text size="m" align="center" color="softPeanut">
          {t('home.leftContent.taskList.everythingDone')}
        </Text>
      </div>
    </div>
  );
};

export const getTimeMarkerPosition = (tasks: any[]) => {
  const shouldHaveMarker = tasks?.map((task: any) => {
    const currentDateTime = new Date();
    const scheduledDatetime = getValueFromLogicRole(
      task,
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    );
    return scheduledDatetime && new Date(scheduledDatetime) < currentDateTime;
  });
  return shouldHaveMarker?.lastIndexOf(true);
};
