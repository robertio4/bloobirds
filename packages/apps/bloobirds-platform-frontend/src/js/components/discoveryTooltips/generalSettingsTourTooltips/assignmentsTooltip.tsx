import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import AssignmentsDiscovery from '../../../../assets/tooltipImages/generalSettingsImages/assignmentsDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './generalSettingsTooltips.module.css';

export const AssignmentsTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    !has(UserHelperTooltipsKeys.GENERAL_SETTINGS_ASSIGNMENTS) &&
    useHasQueryParam('tour') === 'true';
  return (
    <div className={styles._discovery_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Propagating Assignations"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={AssignmentsDiscovery} width={116} alt="General settings assignments DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="You can decide whether or not propagate your assignations. Assign a lead and its company or vice versa. You can also choose not to use any of this options. ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.GENERAL_SETTINGS_ASSIGNMENTS);
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
