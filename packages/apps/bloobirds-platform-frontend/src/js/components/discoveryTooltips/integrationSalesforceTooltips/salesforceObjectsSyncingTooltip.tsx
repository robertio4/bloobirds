import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import HubspotObjectSyncing from '../../../../assets/tooltipImages/integrationsDiscovery/hubspotDiscovery/HubspotObjectSyncing.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './salesforceTooltips.module.css';

export const SalesforceObjectsSyncingTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    (has(UserHelperTooltipsKeys.SALESFORCE_LOGS) ||
      has(UserHelperTooltipsKeys.NO_SALESFORCE_LOGS)) &&
    !has(UserHelperTooltipsKeys.SALESFORCE_OBJECTS_SYNCING);
  return (
    <div className={styles._syncing_objects_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Sync your objects with Salesforce"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={HubspotObjectSyncing} width={125} alt="Salesforce object syncing DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Decide and define how are you going to sync your objects between Bloobirds and Salesforce. Choose freely what and how you want to sync at any time. ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.SALESFORCE_OBJECTS_SYNCING);
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
