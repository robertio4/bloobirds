import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import buyerPersonas from '../../../assets/tooltipImages/buyerPersonas.png';
import targetMarkets from '../../../assets/tooltipImages/targetMarkets.png';
import { useHasQueryParam } from '../../hooks/useHasQueryParam';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import styles from './meetingForm.modules.css';

const entitiesDictionary = {
  TargetMarket: {
    title: 'Check your Target Markets here',
    description:
      'A target market is a group of individuals sharing similar needs or characteristics that your solution can add value to. Identifying a target market helps your company develop effective sales and marketing strategies!',
    image: targetMarkets,
    className: styles._target_markets_img,
  },
  BuyerPersona: {
    title: 'Check your Buyer Personas here',
    description:
      'A buyer persona is a fictional representation of your ideal client or target audience! There are multiple Buyer personas within a target company.',
    image: buyerPersonas,
    className: styles._buyer_personas_img,
  },
};
export const EntityInfoTooltip = ({
  defaultTooltipVisible,
  children,
}: {
  children: React.ReactElement;
  defaultTooltipVisible: boolean;
}) => {
  const { has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const entityName = useHasQueryParam('fromGuide');

  const shouldBeShown =
    hasQSGEnabled &&
    !has(
      UserHelperKeys[
        `CHECK_OUT_YOUR_${entityName?.toUpperCase() as 'TARGET_MARKETS' | 'BUYER_PERSONAS'}`
      ],
    ) &&
    Object.keys(entitiesDictionary).includes(entityName);
  const { title, description, image, className } =
    (entityName && entitiesDictionary[entityName]) || {};
  return shouldBeShown ? (
    <DiscoveryTooltip
      title={title}
      isPersistent
      visible={defaultTooltipVisible}
      anchor={<div className={styles._info_anchor}>{children}</div>}
      height="220px"
      position="top-end"
      anchorShouldNotOpen
    >
      <DiscoveryTooltip.TooltipImage className={className}>
        <img src={image} width={200} alt={'calendar'} />
      </DiscoveryTooltip.TooltipImage>
      <DiscoveryTooltip.TooltipFooter description={description} className={styles._lone_button}>
        <DiscoveryTooltip.TooltipButton isMainButton onClick={() => {}}>
          Ok
        </DiscoveryTooltip.TooltipButton>
      </DiscoveryTooltip.TooltipFooter>
    </DiscoveryTooltip>
  ) : (
    children
  );
};
