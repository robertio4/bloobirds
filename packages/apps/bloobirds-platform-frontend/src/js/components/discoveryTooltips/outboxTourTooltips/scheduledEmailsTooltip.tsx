import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import ScheduledEmails from '../../../../assets/tooltipImages/outboxDiscovery/scheduledEmails.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './outboxTooltips.module.css';

export const ScheduledEmailsTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide') || useHasQueryParam('tour') === 'true';

  const shouldBeVisible =
    has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_PAGE) &&
    !has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_EMAILS) &&
    isTour;
  return (
    <div className={styles._scheduled_emails_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Keep up with scheduled emails"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={ScheduledEmails} width={280} alt="Outbox scheduled emails DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Here you’ll find emails that you’ve  manually programmed. Filter, order and perform any actions on them before they're sent ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_EMAILS);
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
