import React from 'react';
import { Redirect, Route } from 'react-router';
import {
  APP_DASHBOARD,
  APP_DASHBOARD_PROSPECTING,
  APP_DASHBOARD_PROSPECTING_SECTION,
  APP_DASHBOARD_SALES,
  APP_DASHBOARD_SALES_SECTION,
} from '../../app/_constants/routes';
import DashboardPage from './v1/dashboardPage';
import DashboardPageV2 from './v2/dashboardPage/dashboardPage';
import { useNewDashboardEnabled, useFullSalesEnabled } from '../../hooks/useFeatureFlags';

const DashboardRoutes = () => {
  const isSalesEnabled = useFullSalesEnabled();
  const isDashboardsV2Enabled = useNewDashboardEnabled();
  return (
    <>
      <Route
        exact
        path={APP_DASHBOARD}
        render={() => <Redirect to={`${APP_DASHBOARD_PROSPECTING}/overview`} />}
      />
      <Route
        path={APP_DASHBOARD_PROSPECTING_SECTION}
        component={isDashboardsV2Enabled ? DashboardPageV2 : DashboardPage}
      />
      {isSalesEnabled && (
        <>
          <Route
            exact
            path={APP_DASHBOARD_SALES}
            render={() => <Redirect to={`${APP_DASHBOARD_SALES}/overview`} />}
          />
          <Route
            path={APP_DASHBOARD_SALES_SECTION}
            component={isDashboardsV2Enabled ? DashboardPageV2 : DashboardPage}
          />
        </>
      )}
    </>
  );
};

export default DashboardRoutes;
