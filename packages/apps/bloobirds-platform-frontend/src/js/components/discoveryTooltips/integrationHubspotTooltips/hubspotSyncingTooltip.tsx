import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import HubspotSyncing from '../../../../assets/tooltipImages/integrationsDiscovery/hubspotDiscovery/HubspotSyncing.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './hubspotTooltips.module.css';

export const HubspotSyncingTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible = !has(UserHelperTooltipsKeys.HUBSPOT_SYNCING);
  return (
    <div className={styles._syncing_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Syncing with Hubspot" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={HubspotSyncing} height={95} alt="Hubspot syncing DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Check your most  recent actions and their sync status between Bloobirds and Hubspot. Find what you need by filtering objects, statuses or syncing directions. ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.HUBSPOT_SYNCING);
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
