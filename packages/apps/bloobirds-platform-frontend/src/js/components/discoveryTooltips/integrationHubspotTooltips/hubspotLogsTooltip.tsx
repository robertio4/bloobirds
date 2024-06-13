import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import LogsDiscovery from '../../../../assets/tooltipImages/integrationsDiscovery/LogsDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './hubspotTooltips.module.css';

export const HubspotLogsTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.HUBSPOT_SYNCING) && !has(UserHelperTooltipsKeys.HUBSPOT_LOGS);
  return (
    <div className={styles._logs_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Check the logs" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={LogsDiscovery} width={225} alt="Syncing logs DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="See what went wrong when synchronizing between Hubspot and Bloobirds. Clicking on a row will display a detailed explanation for each log ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.HUBSPOT_LOGS);
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
