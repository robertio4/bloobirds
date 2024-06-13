import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import notificationsImage from '../../../../assets/tooltipImages/notifications.png';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './welcomeTooltips.module.css';

export const NotificationsTooltip = () => {
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const isOTOAccount = useIsOTOAccount();
  const shouldBeDisplayed =
    !isOTOAccount &&
    has(UserHelperTooltipsKeys.TASKS) &&
    !has(UserHelperTooltipsKeys.NOTIFICATIONS) &&
    hasQSGEnabled;

  return (
    <span className={styles._notifications_anchor}>
      {shouldBeDisplayed ? (
        <DiscoveryTooltip
          title="Your notifications will be listed in this column"
          visible
          position="bottom"
        >
          <DiscoveryTooltip.TooltipImage className={styles._notifications_image}>
            <img src={notificationsImage} width={160} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Filter the notifications that are most important to you. Keep track of everything and mark all as read when you're done.">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton={true}
              size="small"
              onClick={() => save(UserHelperTooltipsKeys.NOTIFICATIONS)}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      ) : (
        <div className={styles._anchor_placeholder} />
      )}
    </span>
  );
};
