import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import startToFinishProcess from '../../../../assets/tooltipImages/startToFinishProcess.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './prospectingTooltips.module.css';

export const StartToFinishTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const isTour = !useHasQueryParam('fromGuide') || useHasQueryParam('tour') === 'true';

  const shouldBeVisible =
    has(UserHelperTooltipsKeys.COMPANIES_AND_LEADS_TOOLTIP) &&
    hasQSGEnabled &&
    !has(UserHelperTooltipsKeys.START_TO_FINISH) &&
    isTour;

  return (
    <span className={styles._start_to_finsih_tooltip}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="From start to finish in one streamlined process"
          visible={defaultTooltipVisible}
          position="right-start"
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._start_finish_image}>
            <img src={startToFinishProcess} width={85} height={200} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Follow your daily process here. The blue circles indicate the number of tasks for each day. Let's get them to 0! ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton={true}
              size="small"
              onClick={() => save(UserHelperTooltipsKeys.START_TO_FINISH)}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </span>
  );
};
