import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import ScheduledEmails from '../../../../assets/tooltipImages/outboxDiscovery/scheduledEmails.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './outboxTooltips.module.css';

export const NoScheduledEmailsTooltip = ({
  defaultTooltipVisible = false,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_PAGE) &&
    !(
      has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_NO_EMAILS) ||
      has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_EMAILS)
    );
  return (
    <div className={styles._scheduled_no_emails_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Keep up with scheduled emails"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={ScheduledEmails} width={280} alt="Outbox scheduled emails DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Once you have manually scheduled some emails, you’ll find them here. Filter, order and perform any actions on them before they're sent ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_NO_EMAILS);
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
