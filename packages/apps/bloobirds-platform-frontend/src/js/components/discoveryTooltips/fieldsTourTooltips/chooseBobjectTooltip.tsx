import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import ChooseBobjectDiscovery from '../../../../assets/tooltipImages/fieldsDiscovery/chooseBobjectDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './fieldsTooltips.module.css';

export const ChooseBobjectTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    !has(UserHelperTooltipsKeys.FIELDS_CHOOSE_BOBJECT) && useHasQueryParam('tour') === 'true';
  return (
    <div className={styles._choose_bobject_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Select in which form you want to add fields"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={ChooseBobjectDiscovery} width={150} alt="Choose bobject DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.FIELDS_CHOOSE_BOBJECT);
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
