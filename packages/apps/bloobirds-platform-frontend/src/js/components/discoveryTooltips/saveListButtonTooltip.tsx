import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import saveListTooltip from '../../../assets/tooltipImages/saveListTooltip.png';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import styles from './meetingForm.modules.css';

export const SaveListButtonTooltip = ({
  defaultTooltipVisible,
  children,
}: {
  children: React.ReactElement;
  defaultTooltipVisible: boolean;
}) => {
  const { has, save } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const shouldBeShown = hasQSGEnabled && !has(UserHelperTooltipsKeys.SAVE_LIST);

  return (
    <span>
      {shouldBeShown ? (
        <DiscoveryTooltip
          title="Save the list here"
          isPersistent
          visible={defaultTooltipVisible}
          anchor={children}
          height="220px"
          position="top-end"
          anchorShouldNotOpen
        >
          <DiscoveryTooltip.TooltipImage className={styles._home_filters_image}>
            <img src={saveListTooltip} width={133} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter
            description="Save the list from here, tag it and access it whenever you want. "
            className={styles._lone_button}
          >
            <DiscoveryTooltip.TooltipButton
              isMainButton
              onClick={() => {
                save(UserHelperTooltipsKeys.SAVE_LIST);
              }}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      ) : (
        children
      )}
    </span>
  );
};
