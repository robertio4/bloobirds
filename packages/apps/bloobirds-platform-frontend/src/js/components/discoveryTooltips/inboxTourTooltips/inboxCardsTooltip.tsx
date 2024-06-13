import React from 'react';
import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import styles from './inboxTooltips.module.css';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
// @ts-ignore
import IndividualDiscovery from '../../../../assets/tooltipImages/inboxDiscovery/IndividualDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

export const InboxCardsTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide');

  const shouldBeVisible =
    has(UserHelperTooltipsKeys.INBOX_BULK_ACTIONS) &&
    !has(UserHelperTooltipsKeys.INBOX_INDIVIDUAL_ACTIONS) &&
    isTour;

  return (
    <div className={styles._card_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Actions one click away"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={IndividualDiscovery} width={245} alt="Inbox bulk actions DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="When hovering over a card, some actions will become available. Report an activity or send an email with just one click ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.INBOX_INDIVIDUAL_ACTIONS);
                save(UserHelperKeys.TAKE_TOUR_ON_INBOX);
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
