import React from 'react';

import { ColorType, DiscoveryTooltip, Text } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './welcomeTooltips.module.css';

export const WelcomeTooltip = ({ defaultTooltipVisible }: { defaultTooltipVisible: boolean }) => {
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const textProps = {
    color: 'white',
    weight: 'bold',
    align: 'center',
  } as { color: ColorType; weight: 'bold'; align: 'center' };
  const isOTOAccount = useIsOTOAccount();

  const shouldBeDisplayed =
    !isOTOAccount &&
    !has(UserHelperTooltipsKeys.WELCOME) &&
    has(UserHelperKeys.COMPLETE_WELCOME_SCREEN) &&
    hasQSGEnabled;

  return (
    <span className={styles._welcome_tooltip} onClick={e => e.stopPropagation()}>
      {shouldBeDisplayed && (
        <DiscoveryTooltip title="" visible={defaultTooltipVisible} anchorShouldNotOpen isPersistent>
          <DiscoveryTooltip.TooltipImage className={styles._welcome_text}>
            <>
              <Text {...textProps}>
                Follow the dots <DiscoveryTooltip.DiscoveryDefaultAnchor /> and complete this quick
                start guide to become a high performance machine.
              </Text>
              <Text {...textProps} size="l">
                🚀
              </Text>
            </>
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="We’ve prepared a list of insights and tasks that will help you adopt Bloobirds as quickly as possible. By the end of the day you'll be converting more and better 🤑">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton={true}
              size="small"
              onClick={() => save(UserHelperTooltipsKeys.WELCOME)}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </span>
  );
};
