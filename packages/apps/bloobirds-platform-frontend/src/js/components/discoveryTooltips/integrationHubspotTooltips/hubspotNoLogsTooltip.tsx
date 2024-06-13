import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import LogsDiscovery from '../../../../assets/tooltipImages/integrationsDiscovery/LogsDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './hubspotTooltips.module.css';

export const HubspotNoLogsTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.HUBSPOT_SYNCING) &&
    !has(UserHelperTooltipsKeys.NO_HUBSPOT_LOGS) &&
    !has(UserHelperTooltipsKeys.HUBSPOT_OBJECTS_SYNCING);
  return (
    <div className={styles._no_logs_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Check the logs" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={LogsDiscovery} width={225} alt="No logs DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="When synchronizing logs, they’ll be displayed here as a list. Click on each one to see a detailed explanation about what has happened when integrating with Hubspot.">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.NO_HUBSPOT_LOGS);
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
