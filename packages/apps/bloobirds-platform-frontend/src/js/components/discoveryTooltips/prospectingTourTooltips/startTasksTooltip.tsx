import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

import startTasksTooltip from '../../../../assets/tooltipImages/startTasksTooltip.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './prospectingTooltips.module.css';

export const StartTasksTooltip = ({
  defaultTooltipVisible,
  children,
}: {
  defaultTooltipVisible: boolean;
  children: React.ReactElement;
}) => {
  const { save } = useUserHelpers();
  const isTour = useHasQueryParam('tour');
  return (
    <DiscoveryTooltip
      title="Complete those tasks!"
      isPersistent
      visible={defaultTooltipVisible}
      anchor={children}
      position="top"
      anchorShouldNotOpen
    >
      <DiscoveryTooltip.TooltipImage className={styles._on_cadence_start_tasks_image}>
        <img src={startTasksTooltip} width={230} alt={'calendar'} />
      </DiscoveryTooltip.TooltipImage>
      <DiscoveryTooltip.TooltipFooter description="Focus on daily tasks without distractions. Select to only work on the most important ones or go after all at once, just don’t leave any undone! ✨">
        <DiscoveryTooltip.TooltipButton
          variant="secondary"
          isMainButton={true}
          size="small"
          onClick={() => {
            save(UserHelperTooltipsKeys.START_TASKS);
            if (isTour) save(UserHelperKeys.TAKE_TOUR_PROSPECT_TAB);
          }}
        >
          Ok
        </DiscoveryTooltip.TooltipButton>
      </DiscoveryTooltip.TooltipFooter>
    </DiscoveryTooltip>
  );
};
