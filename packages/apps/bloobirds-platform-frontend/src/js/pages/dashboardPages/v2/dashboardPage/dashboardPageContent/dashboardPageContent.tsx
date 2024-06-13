import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import styles from '../../../v1/dashboardPageContent/dashboardPageContent.module.css';
import { useMediaQuery, useNewDashboard } from '../../../../../hooks';
import { useInSalesDashboards } from '../../../../../hooks/useInSalesDashboards';
import { useInActivityPerformanceDashboards } from '../../../../../hooks/useInActivityPerformanceDashboards';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/opportunity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/activity';
import { FilterBar } from '../../filters/filterBar';

export interface DashboardPageContentProps {
  children: any;
  title: string;
}

const SALES_VISIBLE_FILTERS = [
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
];

const PROSPECTING_VISIBLE_FILTERS = [
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  COMPANY_FIELDS_LOGIC_ROLE.SCENARIO,
];

const ACTIVITY_PERFORMANCE_VISIBLE_FILTERS = [
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  ACTIVITY_FIELDS_LOGIC_ROLE.USER,
];

export const DashboardPageContent = ({ children, title }: DashboardPageContentProps) => {
  const { dashboardData } = useNewDashboard();

  const { windowDimensions } = useMediaQuery();
  const inSalesDashboard = useInSalesDashboards();
  const inActivityPerformance = useInActivityPerformanceDashboards();

  const responsiveClass = classNames(styles.content, {
    [styles.content__with_sideBar_open]:
      dashboardData.isSideBarOpen && windowDimensions.width < 1500,
  });

  const filterBarToRender = () => {
    if (inSalesDashboard) return <FilterBar visibleFilters={SALES_VISIBLE_FILTERS} />;
    if (inActivityPerformance)
      return <FilterBar visibleFilters={ACTIVITY_PERFORMANCE_VISIBLE_FILTERS} />;
    return <FilterBar visibleFilters={PROSPECTING_VISIBLE_FILTERS} />;
  };
  return (
    <div className={styles.root} id="scroll_top_dashboard">
      <div className={styles.title}>
        <Text weight="medium" color="peanut" size="xl">
          {title}
        </Text>
      </div>
      {filterBarToRender()}
      <div className={responsiveClass}>{children}</div>
    </div>
  );
};
