import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  APP_TASKS_ADD_QC,
  APP_TASKS_ASSIGN_QC,
  APP_TASKS_DONE,
  APP_TASKS_INBOUND_MQL,
  APP_TASKS_INBOUND,
  APP_TASKS_INBOX_SECTION,
  APP_TASKS_INBOX,
  APP_TASKS_PROSPECTING_SECTION,
  APP_TASKS_PROSPECTING,
  APP_TASKS_SALES_SECTION,
  APP_TASKS_SALES,
  APP_TASKS_WELCOME,
  APP_TASKS,
  APP_TASKS_OUTBOX_SECTION,
  APP_TASKS_OUTBOX,
} from '../../../app/_constants/routes';
import { AddQcWorkspace, AssignQcWorkspace } from '../../../app/main/board/task/taskBoard';
import { SplashNextTask } from '../../../app/main/board/task/taskBoard/finalScreen/SplashTask';
import Inbound from '../../../app/main/board/task/taskBoard/workspace/inbound';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import { HomePage } from '../../../pages/homePage/homePage';
import InboxPage from '../../../pages/inboxPage/inboxPage';
import NoPermissionsView from '../../../pages/noPermissionsPage';
import OutboxPages from '../../../pages/outboxPages/outboxPages';
import ProspectingPage from '../../../pages/subhomePages/prospectingPage/prospectingPage';
import SalesPage from '../../../pages/subhomePages/salesPage/salesPage';
import { useUserPermissions, useUserSettingsContext } from '../hooks';

export const FilterRoutesByUserPermissions = props => {
  const { task } = { ...props };
  const { state } = useUserSettingsContext();
  const { dataFetch } = state;
  const userPermissions = useUserPermissions();
  const hasSalesEnabled = useFullSalesEnabled();

  // refactor when subhomes are done
  if (dataFetch) {
    let content = (
      <Switch>
        <Route exact path={APP_TASKS} render={() => <Redirect to={APP_TASKS_WELCOME} />} />
        <Route path={APP_TASKS_DONE} exact component={SplashNextTask} />
        <Route path={APP_TASKS_WELCOME} exact component={HomePage} />
        <Route path={APP_TASKS_ADD_QC} exact component={AddQcWorkspace} />
        <Route path={APP_TASKS_ASSIGN_QC} exact component={AssignQcWorkspace} />
        <Route path={APP_TASKS_PROSPECTING_SECTION} exact component={ProspectingPage} />
        <Route path={APP_TASKS_OUTBOX_SECTION} exact component={OutboxPages} />
        <Route path={APP_TASKS_SALES_SECTION} exact component={SalesPage} />
        <Route path={APP_TASKS_INBOUND} component={Inbound} />
        <Route path={APP_TASKS_INBOX_SECTION} component={InboxPage} />
      </Switch>
    );

    if (task.location.pathname === APP_TASKS_ADD_QC && !userPermissions.addQC) {
      content = <NoPermissionsView />;
    }
    if (task.location.pathname === APP_TASKS_ASSIGN_QC && !userPermissions.assign) {
      content = <NoPermissionsView />;
    }
    if (task.location.pathname === APP_TASKS_INBOUND_MQL && !userPermissions.inbound) {
      content = <NoPermissionsView />;
    }
    if (
      task.location.pathname.includes(APP_TASKS_SALES) &&
      (!userPermissions.sales || !hasSalesEnabled)
    ) {
      content = <NoPermissionsView />;
    }

    if (task.location.pathname.includes(`${APP_TASKS_SALES}/followUp`) && !hasSalesEnabled) {
      content = <NoPermissionsView />;
    }

    if (task.location.pathname.includes(`${APP_TASKS_SALES}/meetings`) && !hasSalesEnabled) {
      content = <NoPermissionsView />;
    }

    if (
      task.location.pathname.includes(`${APP_TASKS_SALES}/companiesAndLeads`) &&
      !hasSalesEnabled
    ) {
      content = <NoPermissionsView />;
    }
    if (
      (task.location.pathname === `${APP_TASKS_SALES}/inactive` ||
        task.location.pathname.includes(`${APP_TASKS_SALES}/inactive/`)) &&
      !hasSalesEnabled
    ) {
      content = <NoPermissionsView />;
    }
    if (task.location.pathname === `${APP_TASKS_SALES}/inactive` && !hasSalesEnabled) {
      content = <NoPermissionsView />;
    }

    if (task?.location?.pathname.includes(APP_TASKS_OUTBOX) && !userPermissions?.outbox) {
      content = <NoPermissionsView />;
    }

    if (task.location.pathname === APP_TASKS_INBOX && !userPermissions.inbox) {
      content = <NoPermissionsView />;
    }

    if (task.location.pathname.includes(APP_TASKS_PROSPECTING) && !userPermissions.prospect) {
      content = <NoPermissionsView />;
    }

    return content;
  }
  return <React.Fragment />;
};
