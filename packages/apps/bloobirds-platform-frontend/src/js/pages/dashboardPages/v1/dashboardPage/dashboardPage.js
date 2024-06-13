import React, { useEffect } from 'react';
import { Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { DashboardPanel } from '../dashboardPanel/dashboardPanel.js';
import { DashboardPageContent } from '../dashboardPageContent/dashboardPageContent.js';
import { Section } from '../Section/Section.js';
import {
  useDashboard,
  useDocumentTitle,
  useDrillDownModal,
  useReportingDelay,
} from '../../../../hooks';
import styles from './dashboardPage.module.css';
import classnames from 'clsx';
import ErrorPage from '../../../errorPage';
import { useUserPermissions } from '../../../../components/userPermissions/hooks.ts';
import DrillDownModal from '../drillDownModal';
import SideBar from '../sideBar';
import { ServiceApi } from '../../../../misc/api/service';
import ReportingDelay from '../reportingDelay';

const DashboardPage = () => {
  const { dashboards: canSeeDashboards } = useUserPermissions();

  const {
    definition,
    clearFilters,
    filters,
    dashboardData,
    fetchDashboardData,
    dateRangeTypeFilter,
    dateRangeEndFilter,
    dateRangeStartFilter,
    groupBy,
  } = useDashboard();
  const { drillDownData, openDrillDown } = useDrillDownModal();
  const { reportingDelay, fetchReportingDelay } = useReportingDelay();

  useDocumentTitle('Dashboards');

  useEffect(() => {
    const scroll = document.getElementById('scroll_top_dashboard');
    if (scroll) scroll.scrollTop = 0;
  }, [definition]);

  useEffect(() => {
    fetchReportingDelay(ServiceApi, ['Company', 'Lead', 'Activity']);
  }, []);

  useEffect(() => {
    fetchDashboardData({ initialLoad: false });
  }, [definition]);

  useEffect(() => {
    if (dashboardData.isFetchingForTheFirstTime) {
      return;
    }

    fetchDashboardData({ initialLoad: false });
  }, [dateRangeTypeFilter, dateRangeEndFilter, dateRangeStartFilter, filters, groupBy]);

  if (dashboardData.isFetchingForTheFirstTime) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          marginTop: 250,
          justifyContent: 'center',
        }}
      >
        <Spinner name="loadingCircle" />
      </div>
    );
  }

  if (dashboardData.hasErrors || canSeeDashboards === false || drillDownData.hasErrors) {
    return (
      <div className={classnames(styles.root, styles.root_withErrors)}>
        <ErrorPage
          action={{
            name: 'Refresh',
            handleClick: () => {
              clearFilters();
              if (drillDownData.hasErrors) window.location.reload();
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

  return (
    <div className={styles.root}>
      <SideBar />
      <div className={styles.content}>
        {reportingDelay?.needsToNotify && <ReportingDelay />}
        <DashboardPageContent title={definition.title}>
          {openDrillDown && <DrillDownModal />}
          {definition.sections.map(section => (
            <Section
              key={section.title}
              title={section.title}
              isNew={section.new}
              isBeta={section.beta}
            >
              {section.panels.map(panelDefinition => (
                <DashboardPanel key={panelDefinition.title} panelDefinition={panelDefinition} />
              ))}
            </Section>
          ))}
        </DashboardPageContent>
      </div>
    </div>
  );
};

export default DashboardPage;
