import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import onCadenceFilters from '../../../../assets/tooltipImages/onCadenceFilters.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './prospectingTooltips.module.css';

export const FiltersTooltip = ({ defaultTooltipVisible }: { defaultTooltipVisible: boolean }) => {
  const { save, has } = useUserHelpers();

  const isTour = !useHasQueryParam('fromGuide');
  const shouldBeDisplayed = !has(UserHelperTooltipsKeys.ON_CADENCE_FILTERS) && isTour;

  return (
    <span className={styles._filters_tooltip}>
      {shouldBeDisplayed && (
        <DiscoveryTooltip
          title="Find anything and everything with filters"
          isPersistent
          visible={defaultTooltipVisible}
        >
          <DiscoveryTooltip.TooltipImage className={styles._on_cadence_filters_image}>
            <img src={onCadenceFilters} width={230} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Find what you need on each tab and save the most frequently used ones  as quick filters for easier access ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton={true}
              size="small"
              onClick={() => save(UserHelperTooltipsKeys.ON_CADENCE_FILTERS)}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </span>
  );
};
