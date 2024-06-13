import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import tasksImage from '../../../../assets/tooltipImages/tasks.png';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './welcomeTooltips.module.css';

export const TasksTooltip = ({ defaultTooltipVisible }: { defaultTooltipVisible: boolean }) => {
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const isOTOAccount = useIsOTOAccount();
  const shouldBeDisplayed =
    has(UserHelperTooltipsKeys.TAB_BAR) &&
    !has(UserHelperTooltipsKeys.TASKS) &&
    hasQSGEnabled &&
    !isOTOAccount;

  return (
    <span className={styles._tasks_anchor}>
      {shouldBeDisplayed ? (
        <DiscoveryTooltip
          title="Your tasks for the day will appear here."
          visible={defaultTooltipVisible}
        >
          <DiscoveryTooltip.TooltipImage className={styles._tasks_image}>
            <img src={tasksImage} width={200} height={140} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Use filters to choose the tasks you want to see, then press  ▶️ START TASKS, to begin working on your selected companies or leads. ">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton={true}
              size="small"
              onClick={() => save(UserHelperTooltipsKeys.TASKS)}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      ) : (
        <div className={styles._anchor_placeholder} />
      )}
    </span>
  );
};
