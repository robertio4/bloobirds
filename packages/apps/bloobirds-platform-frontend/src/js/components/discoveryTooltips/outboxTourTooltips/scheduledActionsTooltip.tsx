import React from 'react';

import { DiscoveryTooltip, Text } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import ScheduledActions from '../../../../assets/tooltipImages/outboxDiscovery/scheduledActions.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './outboxTooltips.module.css';

export const ScheduledActionsTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide') || useHasQueryParam('tour') === 'true';

  const shouldBeVisible =
    has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_EMAILS) &&
    !has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_ACTIONS) &&
    isTour;
  return (
    <div className={styles._scheduled_actions_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._scheduled_actions_image}>
            <div>
              <Text color="white" align="center" weight="medium">
                Actions & information. All in one place
              </Text>
              <img src={ScheduledActions} width={265} alt="Outbox scheduled card actions DT" />
            </div>
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Hovering over each result will display actions for each email. You can also see what happened with paused and failed emails ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_ACTIONS);
                save(UserHelperKeys.TAKE_TOUR_ON_OUTBOX);
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
