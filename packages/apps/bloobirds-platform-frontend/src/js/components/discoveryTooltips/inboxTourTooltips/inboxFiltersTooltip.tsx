import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import FiltersDiscovery from '../../../../assets/tooltipImages/inboxDiscovery/FiltersDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './inboxTooltips.module.css';

export const InboxFiltersTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide');

  const shouldBeVisible =
    has(UserHelperTooltipsKeys.INBOX_LEFT_SIDE_NAVIGATION) &&
    !has(UserHelperTooltipsKeys.INBOX_FILTERS) &&
    isTour;

  return (
    <div className={styles._filters_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Find anything and everything with filters."
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={FiltersDiscovery} width={280} alt="Inbox filters DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Find what you need on each tab and save the most frequently used ones  as quick filters for easier access ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton
              className={styles._primary_button}
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.INBOX_FILTERS);
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
