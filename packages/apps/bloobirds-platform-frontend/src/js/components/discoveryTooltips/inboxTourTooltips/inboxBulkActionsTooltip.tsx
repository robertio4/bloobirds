import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import BulkDiscovery from '../../../../assets/tooltipImages/inboxDiscovery/BulkDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './inboxTooltips.module.css';

export const InboxBulkActionsTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide');
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.INBOX_FILTERS) &&
    !has(UserHelperTooltipsKeys.INBOX_BULK_ACTIONS) &&
    isTour;
  return (
    <div className={styles._bulk_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Work faster and smarter"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={BulkDiscovery} width={265} alt="Inbox bulk actions DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Boost productivity with bulk actions, and mark more than one activity as reported at the time✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.INBOX_BULK_ACTIONS);
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
