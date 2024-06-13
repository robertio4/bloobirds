import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import CreateNewFieldDiscovery from '../../../../assets/tooltipImages/fieldsDiscovery/createNewFieldDiscovery.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './fieldsTooltips.module.css';

export const CreateFieldTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.FIELDS_CHOOSE_BOBJECT) &&
    !has(UserHelperTooltipsKeys.FIELDS_CREATE) &&
    useHasQueryParam('tour') === 'true';
  return (
    <div className={styles._create_field_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Click here to create a new field"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={CreateNewFieldDiscovery} width={200} alt="Create new fields DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.FIELDS_CREATE);
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
