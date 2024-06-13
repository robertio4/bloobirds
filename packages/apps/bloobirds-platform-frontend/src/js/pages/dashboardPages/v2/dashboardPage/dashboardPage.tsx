import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Text } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import classnames from 'clsx';

import { useUserPermissions } from '../../../../components/userPermissions/hooks';
import { newInactive } from '../../../../constants/dashboardDefinitions/dataQualityProspecting';
import { SyncStatusResponse } from '../../../../constants/newDashboards';
import { useDocumentTitle, useNewDashboard } from '../../../../hooks';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';
import { useInFunnelPage } from '../../../../hooks/useInFunnelPage';
import { useInSalesDashboards } from '../../../../hooks/useInSalesDashboards';
import { useNewDrillDownModal } from '../../../../hooks/useNewDrillDownModal';
import { api } from '../../../../utils/api';
import ErrorPage from '../../../errorPage';
import NoPermissionsPage from '../../../noPermissionsPage';
import styles from '../../v1/dashboardPage/dashboardPage.module.css';
import { DrillDownModal } from '../drillDownModal/drillDownModal';
import SideBar from '../sideBar/sideBar';
import { DashboardPageContent } from './dashboardPageContent/dashboardPageContent';
import DashboardPageSection from './dashboardPageSection/dashboardPageSection';
import SyncingPage from './syncingPage/syncingPage';

const DashboardPage: FC = () => {
  const isNoStatusAccount = useIsNoStatusPlanAccount();
  const isInSalesDashboard = useInSalesDashboards();
  const isInFunnelPage = useInFunnelPage();
  const { slug } = useParams<{ slug: string }>();
  const { dashboards: canSeeDashboards } = useUserPermissions();
  const { definition } = useNewDashboard();
  const { openDrillDown } = useNewDrillDownModal();
  const [filtersReady, setFiltersReady] = useState<boolean>(false);
  const { initialLoad, dateRangeTypeFilter, intervalFilter, clearFilters } = useDashboardFilters();
  useDocumentTitle('Dashboards');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [loadSync, setLoadSync] = useState(true);
  const { customTasks } = useCustomTasks({ disabled: true });
  const viewingSalesDashboards = useLocation().pathname?.includes('sales');
  const forbiddenAccess =
    isNoStatusAccount &&
    !viewingSalesDashboards &&
    !['overview', 'activity_performance', 'data_quality'].includes(slug);
  useEffect(() => {
    api.get<SyncStatusResponse>('/analytics/admin/sync/status').then(response => {
      setIsSyncing(response?.data?.status !== 'UP_TO_DATE');
      setLoadSync(false);
    });
  }, []);

  useEffect(() => {
    const scroll = document.getElementById('scroll_top_dashboard');
    if (scroll) scroll.scrollTop = 0;
  }, [definition]);

  useEffect(() => {
    if (intervalFilter && dateRangeTypeFilter && !filtersReady) {
      setFiltersReady(true);
    }
  }, [intervalFilter, dateRangeTypeFilter]);

  useEffect(() => {
    if (isInSalesDashboard || isInFunnelPage) {
      initialLoad({ initialRange: 'this_month', initialInterval: 'month' });
    } else {
      initialLoad({ initialRange: 'this_week', initialInterval: 'week' });
    }
  }, []);

  if (isSyncing) {
    return <SyncingPage />;
  }

  if (forbiddenAccess) return <NoPermissionsPage />;

  if (canSeeDashboards === false && customTasks) {
    return (
      <div className={classnames(styles.root, styles.root_withErrors)}>
        <ErrorPage
          action={{
            name: 'Refresh',
            handleClick: () => {
              clearFilters();
              window.location.reload();
            },
            icon: 'refresh',
          }}
          showSupport={false}
        >
          <Text color="softPeanut" align="center">
            Oops! There was an error fetching the data.
          </Text>
        </ErrorPage>
      </div>
    );
  }

  if (definition.title === 'Data Quality') {
    // @ts-ignore
    definition.sections[definition.sections.length - 1] = { ...newInactive };
  }

  return (
    <>
      {!loadSync && filtersReady && !isSyncing && (
        <div className={styles.root}>
          <SideBar />
          <div className={styles.content}>
            <DashboardPageContent title={definition.title}>
              <>
                {openDrillDown && <DrillDownModal />}
                {definition.sections.map(section => {
                  //TODO give Ids to sections
                  if (
                    isNoStatusAccount &&
                    section.title ===
                      'What is you current pipeline? Do you have enough companies and leads in all stages?'
                  )
                    return null;
                  return <DashboardPageSection key={section.title} section={section} />;
                })}
              </>
            </DashboardPageContent>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
