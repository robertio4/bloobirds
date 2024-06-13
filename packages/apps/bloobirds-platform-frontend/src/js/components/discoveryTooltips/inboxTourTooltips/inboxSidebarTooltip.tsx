import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import LeftSideDiscovery from '../../../../assets/tooltipImages/inboxDiscovery/LeftSideDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './inboxTooltips.module.css';

export const InboxSidebarTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide');
  const shouldBeVisible = !has(UserHelperTooltipsKeys.INBOX_LEFT_SIDE_NAVIGATION) && isTour;

  return (
    <div className={styles._sidebar_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip title="Incoming hub" visible={defaultTooltipVisible} isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={LeftSideDiscovery} height={150} alt="Inbox left side DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Here you’ll find tabs thar organize all your incoming activities. From calls to emails, don’t miss out on anything! ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.INBOX_LEFT_SIDE_NAVIGATION);
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
