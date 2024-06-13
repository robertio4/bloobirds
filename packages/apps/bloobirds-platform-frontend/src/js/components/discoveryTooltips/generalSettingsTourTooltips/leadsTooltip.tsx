import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import LeadsDiscovery from '../../../../assets/tooltipImages/generalSettingsImages/leadsDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './generalSettingsTooltips.module.css';

export const LeadsTooltip = ({ defaultTooltipVisible }: { defaultTooltipVisible: boolean }) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.GENERAL_SETTINGS_MEETINGS) &&
    !has(UserHelperTooltipsKeys.GENERAL_SETTINGS_LEADS) &&
    useHasQueryParam('tour') === 'true';
  return (
    <div className={styles._discovery_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Lead matching" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={LeadsDiscovery} width={225} alt="General settings leads DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="If a lead has an email domain that matches an existing company domain, they’ll be automatically related ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.GENERAL_SETTINGS_LEADS);
                save(UserHelperKeys.TAKE_TOUR_ON_GENERAL_SETTINGS);
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
