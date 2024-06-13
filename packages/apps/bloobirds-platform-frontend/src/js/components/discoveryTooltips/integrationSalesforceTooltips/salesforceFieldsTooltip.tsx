import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import FieldsDiscovery from '../../../../assets/tooltipImages/integrationsDiscovery/FieldsDiscovery.png';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './salesforceTooltips.module.css';

export const SalesforceFieldsTooltip = ({
  defaultTooltipVisible = true,
}: {
  defaultTooltipVisible?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.SALESFORCE_USERS) && !has(UserHelperTooltipsKeys.SALESFORCE_FIELDS);
  return (
    <div className={styles._fields_syncing_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Keep your fields updated"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <img src={FieldsDiscovery} width={155} alt="Salesforce syncing fields DT" />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Map your fields between Salesforce and Bloobirds, so no information is ever lost. Check out our in depth guide on how to do this easily and flawlessly ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.SALESFORCE_FIELDS);
                save(UserHelperKeys.CONNECT_CRM_TOUR);
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
