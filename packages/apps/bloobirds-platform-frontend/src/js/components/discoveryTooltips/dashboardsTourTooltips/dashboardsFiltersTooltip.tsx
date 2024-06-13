import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import FiltersDiscovery from '../../../../assets/tooltipImages/dashboardsDiscovery/FiltersDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './dashboardsTooltips.module.css';

export const DashboardsFiltersTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.DASHBOARDS_GROUP_BY) &&
    !has(UserHelperTooltipsKeys.DASHBOARDS_FILTERS);

  return (
    <div className={styles._filters_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Find it with filters" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={FiltersDiscovery} width={265} alt="Dashboards filters DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Filters provide a more in-depth form of customization. Find information or dive deep into a detail view for each property ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.DASHBOARDS_FILTERS);
                save(UserHelperKeys.SET_UP_DASHBOARDS_TOUR);
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
