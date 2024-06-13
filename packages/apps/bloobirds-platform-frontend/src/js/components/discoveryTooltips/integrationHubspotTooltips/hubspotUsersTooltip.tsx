import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import UsersDiscovery from '../../../../assets/tooltipImages/integrationsDiscovery/UsersDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './hubspotTooltips.module.css';

export const HubspotUsersTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.HUBSPOT_OBJECTS_SYNCING) &&
    !has(UserHelperTooltipsKeys.HUBSPOT_USERS);
  return (
    <div className={styles._user_syncing_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Users" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={UsersDiscovery} width={225} alt="Hubspot syncing users DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Link your Hubspot users with the Bloobirds users. Use the resync button to check for deleted users and new additions ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.HUBSPOT_USERS);
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
