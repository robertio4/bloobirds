import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import EyesDiscovery from '../../../../assets/tooltipImages/fieldsDiscovery/eyesDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './fieldsTooltips.module.css';

export const PreviewFormsTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.FIELDS_CREATE) &&
    !has(UserHelperTooltipsKeys.FIELDS_PREVIEW_FORMS) &&
    useHasQueryParam('tour') === 'true';
  return (
    <div className={styles._preview_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Preview what your forms look like here"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={EyesDiscovery} width={105} alt="Preview fields form DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.FIELDS_PREVIEW_FORMS);
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
