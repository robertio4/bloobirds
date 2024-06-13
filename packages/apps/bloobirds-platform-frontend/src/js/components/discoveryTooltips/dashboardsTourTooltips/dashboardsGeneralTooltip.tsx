import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import GeneralDiscovery from '../../../../assets/tooltipImages/dashboardsDiscovery/GeneralDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './dashboardsTooltips.module.css';

export const DashboardsGeneralTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible = !has(UserHelperTooltipsKeys.DASHBOARDS_GENERAL);

  return (
    <div className={styles._general_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Useful data for you" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={GeneralDiscovery} width={180} alt="Dashboards general DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="In dashboards you can check data related to your prospecting process, see the conversion rates from each stage to the next, and review if you’re following your cadences ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.DASHBOARDS_GENERAL);
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
