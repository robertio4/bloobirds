import React from 'react';

import { IconType, Sidebar, SidebarItem, SidebarSection } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';

import { APP_DASHBOARD_PROSPECTING, APP_DASHBOARD_SALES } from '../../../../app/_constants/routes';
import { DashboardsActivityTooltip } from '../../../../components/discoveryTooltips/dashboardsActivityTooltip';
import { DashboardsGeneralTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsGeneralTooltip';
import { useNewDashboard, useRouter } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';

interface DashboardRoute {
  icon: IconType;
  slug: string;
  name: string;
}

const getProspectionRoutes = (isNoStatusPlan: boolean): DashboardRoute[] => [
  { icon: 'home', slug: 'overview', name: 'Overview' },
  { icon: 'barchart', slug: 'activity_performance', name: 'Activity Performance' },
  ...(!isNoStatusPlan
    ? ([
        { icon: 'gridSquares', slug: 'conversion_rates', name: 'Conversion Rates' },
        {
          icon: 'gridSquares',
          slug: 'historic_conversion_rates',
          name: 'Historic Conversion Rates',
        },
        { icon: 'checkDouble', slug: 'data_quality', name: 'Data Quality' },
        { icon: 'sankey', slug: 'funnel', name: 'Prospecting motion' },
      ] as DashboardRoute[])
    : [{ icon: 'checkDouble' as IconType, slug: 'data_quality', name: 'Data Quality' }]),
];

const salesRoutes: DashboardRoute[] = [
  { icon: 'home', slug: 'overview', name: 'Overview' },
  { icon: 'sankey', slug: 'funnel', name: 'Sales motion' },
];

const SideBar = () => {
  const isNoStatusAccount = useIsNoStatusPlanAccount();
  const { history } = useRouter();
  const { dashboardData, setIsSideBarOpen } = useNewDashboard();
  const isSalesEnabled = useFullSalesEnabled();
  const hasQSGEnabled = useQuickStartEnabled();
  const prospectingRoutes = getProspectionRoutes(isNoStatusAccount);

  return (
    <Sidebar
      title="Dashboards"
      collapsed={!dashboardData?.isSideBarOpen}
      onCollapseChange={collapsed => setIsSideBarOpen(!collapsed)}
    >
      {hasQSGEnabled && <DashboardsGeneralTooltip />}
      {hasQSGEnabled && <DashboardsActivityTooltip />}
      <SidebarSection title="Prospecting">
        {prospectingRoutes.map(({ icon, slug, name }) => {
          const sectionUrl = `${APP_DASHBOARD_PROSPECTING}/${slug}`;
          return (
            <SidebarItem
              key={`item-${name}`}
              icon={icon}
              selected={history.location.pathname.includes(sectionUrl)}
              onClick={() =>
                history.push({
                  pathname: sectionUrl,
                  search: history.location.pathname.includes(APP_DASHBOARD_PROSPECTING)
                    ? slug === 'funnel'
                      ? history.location.search
                          .replace('this_week', 'this_month')
                          .replace('week', 'month')
                      : history.location.search
                          .replace('this_month', 'this_week')
                          .replace('month', 'week')
                    : '',
                })
              }
            >
              {name}
            </SidebarItem>
          );
        })}
      </SidebarSection>
      {isSalesEnabled && (
        <SidebarSection title="Sales">
          {salesRoutes.map(({ icon, slug, name }) => {
            const sectionUrl = `${APP_DASHBOARD_SALES}/${slug}`;
            return (
              <SidebarItem
                key={`item-${slug}`}
                icon={icon}
                selected={history.location.pathname.includes(sectionUrl)}
                onClick={() =>
                  history.push({
                    pathname: sectionUrl,
                    search: history.location.pathname.includes(APP_DASHBOARD_SALES)
                      ? history.location.search
                      : '',
                  })
                }
              >
                {name}
              </SidebarItem>
            );
          })}
        </SidebarSection>
      )}
    </Sidebar>
  );
};

export default SideBar;
