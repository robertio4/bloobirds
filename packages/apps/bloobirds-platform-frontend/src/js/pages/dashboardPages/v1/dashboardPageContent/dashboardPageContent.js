import React from 'react';
import styles from './dashboardPageContent.module.css';
import { Text } from '@bloobirds-it/flamingo-ui';
import { useDashboard, useMediaQuery } from '../../../../hooks';
import classNames from 'clsx';
import ProspectingFilterBar from '../filters/prospectingFilterBar';
import SalesFilterBar from '../filters/salesFilterBar';
import { useInSalesDashboards } from '../../../../hooks/useInSalesDashboards';

export const DashboardPageContent = ({ children, title }) => {
  const { dashboardData } = useDashboard();
  const { windowDimensions } = useMediaQuery();
  const inSalesDashboard = useInSalesDashboards();

  const responsiveClass = classNames(styles.content, {
    [styles.content__with_sideBar_open]:
      dashboardData.isSideBarOpen && windowDimensions.width < 1500,
  });

  return (
    <div className={styles.root} id="scroll_top_dashboard">
      <div className={styles.title}>
        <Text weight="medium" color="peanut" size="xl">
          {title}
        </Text>
      </div>
      {inSalesDashboard ? <SalesFilterBar /> : <ProspectingFilterBar />}
      <div className={responsiveClass}>{children}</div>
    </div>
  );
};
