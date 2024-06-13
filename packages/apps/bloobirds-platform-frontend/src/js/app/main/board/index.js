import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { useActiveAccountSettings, useIsOTOAccount } from '@bloobirds-it/hooks';
import classNames from 'clsx';

import AccountAlerts from '../../../components/accountAlerts';
import AppSidebar from '../../../components/appSidebar/appSidebar';
import DayLimitAlert from '../../../components/dayLimitBanner/dayLimitBanner';
import { useRouter } from '../../../hooks';
import { useSidebarTasksVisibility } from '../../../hooks/useSidebarTasksVisibility';
import ContactPages from '../../../pages/contactPages/contactPages';
import {
  APP_CL,
  APP_CL_COMPANIES,
  APP_CL_COMPANIES_COMPANY_TASK,
  APP_TASKS,
  APP_TASKS_ASSIGN_QC,
} from '../../_constants/routes';
import styles from './board.module.css';
import List from './list';
import TaskBoardPage from './task/TaskBoardPage';
import SidebarTasks from './task/feed/sidebarTasks/sidebarTasks';

const Board = () => {
  const { isVisible: isVisibleSidebarTasks, closeSidebarTasks } = useSidebarTasksVisibility();
  const { location } = useRouter();
  const isOTOAccount = useIsOTOAccount();
  const { isLoading } = useActiveAccountSettings();
  const { pathname } = location;

  const isNotTasksOrCompaniesWithinTasks = !(
    pathname.startsWith(APP_TASKS) ||
    (pathname.startsWith(APP_CL_COMPANIES) && pathname.includes('/tasks/'))
  );

  useEffect(() => {
    closeSidebarTasks();
  }, [pathname]);

  if (isNotTasksOrCompaniesWithinTasks && !pathname.startsWith(APP_CL)) {
    return null;
  }

  const isAssignCompany = window.location.pathname === APP_TASKS_ASSIGN_QC;

  return (
    <div className={styles.container}>
      <div className={styles.feedWrapper}>
        {!isLoading && !isOTOAccount && <AppSidebar />}
        <SidebarTasks show={isVisibleSidebarTasks} />
      </div>
      <div
        id="content"
        className={classNames(styles.contentTabs, {
          [styles.contentTabsAllocateQC]: isAssignCompany,
        })}
      >
        <AccountAlerts />
        <DayLimitAlert />
        <Route path={[APP_TASKS, APP_CL_COMPANIES_COMPANY_TASK]} component={TaskBoardPage} />
        <Route path={APP_CL} component={List} />
        <ContactPages />
      </div>
    </div>
  );
};

export default Board;
