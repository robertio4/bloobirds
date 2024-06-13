import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import NoCardsDiscovery from '../../../../assets/tooltipImages/inboxDiscovery/NoCardsDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './inboxTooltips.module.css';

export const NoInboxCardsTooltip = ({
  defaultTooltipVisible = false,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.INBOX_FILTERS) &&
    !(
      has(UserHelperTooltipsKeys.INBOX_NO_TASKS) ||
      has(UserHelperTooltipsKeys.INBOX_INDIVIDUAL_ACTIONS)
    );

  return (
    <div className={styles._no_cards_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Keep up with your contacts"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={NoCardsDiscovery} width={245} alt="Inbox no cards actions DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Once you start contacting your companies and leads, you’ll see those activities here. Filter, order and perform actions on them to keep the conversation going! ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.INBOX_NO_TASKS);
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
