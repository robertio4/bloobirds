import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';

import createCompany from '../../../assets/tooltipImages/createCompany.png';
import createLead from '../../../assets/tooltipImages/createLead.png';
import { useHasQueryParam } from '../../hooks/useHasQueryParam';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import styles from './meetingForm.modules.css';

export const CreateBobjectTooltip = ({
  defaultTooltipVisible,
  section,
  children,
}: {
  children: React.ReactElement;
  section: string;
  defaultTooltipVisible: boolean;
}) => {
  const hasQSGEnabled = useQuickStartEnabled();
  const bobjectType = section === 'leads' ? BobjectTypes.Lead : BobjectTypes.Company;
  const shouldBeShown = hasQSGEnabled && useHasQueryParam('fromGuide') === bobjectType;

  return (
    <span>
      {shouldBeShown ? (
        <DiscoveryTooltip
          title={`Create your first ${bobjectType.toLowerCase()} by clicking here`}
          isPersistent
          visible={defaultTooltipVisible}
          anchor={children}
          height="220px"
          position="top-end"
          anchorShouldNotOpen
        >
          <DiscoveryTooltip.TooltipImage className={styles._home_filters_image}>
            <img
              src={bobjectType === BobjectTypes.Company ? createCompany : createLead}
              width={bobjectType === BobjectTypes.Company ? 166 : 133}
              alt={'calendar'}
            />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="" className={styles._lone_button}>
            <DiscoveryTooltip.TooltipButton isMainButton onClick={() => {}}>
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
