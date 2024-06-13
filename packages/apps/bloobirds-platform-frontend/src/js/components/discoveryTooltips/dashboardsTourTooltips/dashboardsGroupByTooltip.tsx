import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import GroupByDiscovery from '../../../../assets/tooltipImages/dashboardsDiscovery/GroupByDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './dashboardsTooltips.module.css';

export const DashboardsGroupByTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.DASHBOARDS_DATE_FILTER) &&
    !has(UserHelperTooltipsKeys.DASHBOARDS_GROUP_BY);

  return (
    <div className={styles._group_by_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Properties that matter"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={GroupByDiscovery} width={235} alt="Dashboards group by DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="One of the most relevant features. Define the property that will be used to define every chart. Although there are some charts that cannot be changed with it. ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton
              className={styles._primary_button}
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.DASHBOARDS_GROUP_BY);
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
