import React from 'react';

import { DiscoveryTooltip, IconButton } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import companyLeadDivision from '../../../../assets/tooltipImages/companyLeadDivision.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './prospectingTooltips.module.css';

export const CompanyLeadDivisionTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const isTour = !useHasQueryParam('fromGuide');

  return (
    <span className={styles._companies_leads_tooltip}>
      {!has(UserHelperTooltipsKeys.COMPANIES_AND_LEADS_TOOLTIP) && isTour && (
        <DiscoveryTooltip
          title="Choose between Companies or Leads"
          anchor={
            !defaultTooltipVisible && (
              <IconButton name="infoFilled" color="darkBloobirds" size={16} />
            )
          }
          isPersistent
          visible={defaultTooltipVisible}
        >
          <DiscoveryTooltip.TooltipImage className={styles.image}>
            <img src={companyLeadDivision} width={230} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="In some tabs, information will be organized separately between Companies, Leads and Opportunities so you can keep focused on what's most important at that moment. ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              isMainButton={true}
              size="small"
              onClick={() => save(UserHelperTooltipsKeys.COMPANIES_AND_LEADS_TOOLTIP)}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </span>
  );
};
