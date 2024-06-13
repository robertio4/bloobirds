import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import BulkAutomated from '../../../../assets/tooltipImages/outboxDiscovery/bulkAutomated.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './outboxTooltips.module.css';

export const AutomatedBulkActionsTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide');
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.OUTBOX_AUTOMATED_EMAILS) &&
    !has(UserHelperTooltipsKeys.OUTBOX_AUTOMATED_BULK) &&
    isTour;
  return (
    <div className={styles._automated_bulk_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Speed up your work" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={BulkAutomated} width={280} alt="Outbox automated bulk actions DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="With bulk actions you can work on more than one email at the time. Select as many as you need and reschedule, send or delete them simultaneously ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.OUTBOX_AUTOMATED_BULK);
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
