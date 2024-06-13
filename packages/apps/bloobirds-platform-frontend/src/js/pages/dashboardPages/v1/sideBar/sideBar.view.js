import React from 'react';
import { Sidebar, SidebarItem, SidebarSection } from '@bloobirds-it/flamingo-ui';
import { useDashboard, useRouter } from '../../../../hooks';
import { APP_DASHBOARD_PROSPECTING, APP_DASHBOARD_SALES } from '../../../../app/_constants/routes';
import { DashboardsGeneralTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsGeneralTooltip';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';

const prospectingRoutes = [
  { icon: 'home', slug: 'overview', name: 'Overview' },
  { icon: 'gridSquares', slug: 'conversion_rates', name: 'Conversion Rates' },
  { icon: 'checkDouble', slug: 'data_quality', name: 'Data Quality' },
];

const salesRoutes = [{ icon: 'home', slug: 'overview', name: 'Overview' }];

const SideBar = () => {
  const { history } = useRouter();
  const { dashboardData, setIsSideBarOpen } = useDashboard();
  const isSalesEnabled = useFullSalesEnabled();
  const hasQSGEnabled = useQuickStartEnabled();

  return (
    <Sidebar
      title="Dashboards"
      collapsed={!dashboardData?.isSideBarOpen}
      onCollapseChange={collapsed => setIsSideBarOpen(!collapsed)}
    >
      {hasQSGEnabled && <DashboardsGeneralTooltip />}
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
