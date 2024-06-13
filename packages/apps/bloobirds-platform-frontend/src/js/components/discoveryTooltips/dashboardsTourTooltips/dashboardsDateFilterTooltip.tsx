import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import DateFilterDiscovery from '../../../../assets/tooltipImages/dashboardsDiscovery/DateFilterDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './dashboardsTooltips.module.css';

export const DashboardsDateFilterTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.DASHBOARDS_GENERAL) &&
    !has(UserHelperTooltipsKeys.DASHBOARDS_DATE_FILTER);
  return (
    <div className={styles._date_filter_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Any time you’ll need" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={DateFilterDiscovery} width={225} alt="Dashboards date filter DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Precisely select a time frame. From predefined values to custom dates, any change will update your dashboards dynamically ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.DASHBOARDS_DATE_FILTER);
              }}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </div>
  );
};
