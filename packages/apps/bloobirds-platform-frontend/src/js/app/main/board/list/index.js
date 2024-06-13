import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import {
  ActivityTable,
  CompanyTable,
  LeadTable,
  MeetingTable,
  OpportunityTable,
  TaskTable,
} from '../../../../components/bobjectTable';
import ImportForm from '../../../../components/importForm';
import ImportHistory from '../../../../components/importHistory';
import { useUserPermissions } from '../../../../components/userPermissions/hooks';
import ViewTable from '../../../../components/viewTable';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { withWrappers } from '../../../../misc/utils';
import NoPermissionsView from '../../../../pages/noPermissionsPage';
import {
  APP_CL,
  APP_CL_ACTIVITIES,
  APP_CL_COMPANIES,
  APP_CL_LEADS,
  APP_CL_LISTS,
  APP_CL_MEETINGS,
  APP_CL_TASKS,
  APP_CL_IMPORT_HISTORY,
  APP_CL_IMPORT,
  APP_CL_OPPORTUNITIES,
} from '../../../_constants/routes';

const Index = props => {
  const salesFeatureEnabled = useFullSalesEnabled();
  const pathname = props.location.pathname;
  const { reports: canSeeReports } = useUserPermissions();
  if (pathname.includes(APP_CL) && !canSeeReports) {
    return <NoPermissionsView />;
  }

  return (
    <>
      <Route exact path={APP_CL} render={() => <Redirect to={APP_CL_COMPANIES} />} />
      <Route exact path={APP_CL_COMPANIES} render={() => <CompanyTable />} />
      <Route exact path={APP_CL_ACTIVITIES} render={() => <ActivityTable />} />
      <Route exact path={APP_CL_MEETINGS} render={() => <MeetingTable viewActions={false} />} />
      <Route exact path={APP_CL_TASKS} render={() => <TaskTable />} />
      <Route
        exact
        path={APP_CL_OPPORTUNITIES}
        render={() => (salesFeatureEnabled ? <OpportunityTable /> : <NoPermissionsView />)}
      />
      <Route exact path={APP_CL_LEADS} render={() => <LeadTable />} />
      <Route exact path={APP_CL_LISTS} render={() => <ViewTable />} />
      <Route exact path={APP_CL_IMPORT_HISTORY} render={() => <ImportHistory />} />
      <Route exact path={APP_CL_IMPORT} render={() => <ImportForm />} />
    </>
  );
};

export default withWrappers({
  router: true,
})(Index);
