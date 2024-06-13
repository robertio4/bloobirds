import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import SalesforceSyncing from '../../../../assets/tooltipImages/integrationsDiscovery/salesforceDiscovery/SalesforceSyncing.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './salesforceTooltips.module.css';

export const SalesforceSyncingTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible = !has(UserHelperTooltipsKeys.SALESFORCE_SYNCING);
  return (
    <div className={styles._syncing_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Syncing with Salesforce"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={SalesforceSyncing} height={95} alt="Salesforce syncing DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Check your most  recent actions and their sync status between Bloobirds and Hubspot. Find what you need by filtering objects, statuses or syncing directions. ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.SALESFORCE_SYNCING);
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
