import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import dialerTooltip from '../../../assets/tooltipImages/dialerTooltip.png';
// @ts-ignore
import EmailImage from '../../../assets/tooltipImages/emailTooltip.png';
import { useHasQueryParam } from '../../hooks/useHasQueryParam';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import styles from './contactEmail.module.css';

const getTooltipProps = (queryParam: UserHelperKeys) => {
  switch (queryParam) {
    default:
      return {
        title: 'What is the next best move?',
        image: EmailImage,
        description:
          'Bloobirds provides guided assistance to quickly email companies and leads. Also, make sure to get the best out of the built-in Playbook with variables and custom templates.',
      };
    case UserHelperKeys.CALL_AND_REPORT_RESULT:
      return {
        title: 'Call and report activity quick and easy',
        image: dialerTooltip,
        description:
          'Bloobirds provides guided assistance to quickly call businesses and potential customers. In addition, it reports the outcome through a simple guided flow.',
      };
  }
};

export const LeadTableActionsTooltip = ({
  children,
  helperKey,
}: {
  children: any;
  helperKey: UserHelperKeys;
}) => {
  const hasQSGuidesEnabled = useQuickStartEnabled();
  const queryParam = useHasQueryParam('fromGuide');
  const { title, description, image } = getTooltipProps(queryParam as UserHelperKeys);
  const visible = helperKey === queryParam && hasQSGuidesEnabled;

  return (
    <DiscoveryTooltip title={title} anchor={children} visible={visible} anchorShouldNotOpen>
      <DiscoveryTooltip.TooltipImage className={styles.emailImage}>
        <img src={image} alt="Email" />
      </DiscoveryTooltip.TooltipImage>
      <DiscoveryTooltip.TooltipFooter description={description}>
        <DiscoveryTooltip.TooltipButton isMainButton>Ok</DiscoveryTooltip.TooltipButton>
      </DiscoveryTooltip.TooltipFooter>
    </DiscoveryTooltip>
  );
};
