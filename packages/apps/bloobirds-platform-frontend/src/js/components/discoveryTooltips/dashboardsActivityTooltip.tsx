import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import GeneralDiscovery from '../../../assets/tooltipImages/dashboardsDiscovery/GeneralDiscovery.png';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import styles from './dashboardsTourTooltips/dashboardsTooltips.module.css';

export const DashboardsActivityTooltip = () => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible = !has(UserHelperTooltipsKeys.DASHBOARDS_ACTIVITY);

  return (
    <div className={styles._activity_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Useful data for you" visible={false}>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={GeneralDiscovery} width={180} alt="Dashboards activity DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="✨ Check out our new activity performance page. Now you can see the volume and the quality of each activity, and evaluate the use of every tool individually.">
            <DiscoveryTooltip.TooltipButton
              variant="clear"
              className={styles._clear_button}
              size="small"
              onClick={() => {
                window.open('https://www.youtube.com/watch?v=gwb4mzV7pmU', '_blank');
              }}
            >
              Tell me more ✨
            </DiscoveryTooltip.TooltipButton>
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.DASHBOARDS_ACTIVITY);
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
