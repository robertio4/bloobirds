import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import tabBar from '../../../../assets/tooltipImages/tabBar.png';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './welcomeTooltips.module.css';

export const TabBarTooltip = ({ defaultTooltipVisible }: { defaultTooltipVisible: boolean }) => {
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const shouldBeDisplayed =
    has(UserHelperTooltipsKeys.WELCOME) && !has(UserHelperTooltipsKeys.TAB_BAR) && hasQSGEnabled;

  return (
    <span className={styles._tab_bar_anchor}>
      {shouldBeDisplayed && (
        <DiscoveryTooltip
          title="Meet the tab bar, aka
your new best friend ✨"
          visible={defaultTooltipVisible}
          position="right-start"
        >
          <DiscoveryTooltip.TooltipImage className={styles._tabs_image}>
            <img src={tabBar} width={66} height={230} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="The tab bar will show you how many tasks you have at each stage of the process. Make sure you have them at zero at the end of the day 💪">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton={true}
              size="small"
              onClick={() => save(UserHelperTooltipsKeys.TAB_BAR)}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </span>
  );
};
