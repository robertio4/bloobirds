import React from 'react';

import { DiscoveryTooltip, Icon } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

// @ts-ignore
import inactiveImage from '../../../assets/inactive.png';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import styles from './inactiveTab.module.css';

const InactiveTabDiscoveryTooltip = () => {
  const { save, has } = useUserHelpers();
  const hasBeenOpened = has(UserHelperKeys.SEEN_INACTIVE_DISCOVERY_TOOLTIP);

  return (
    <DiscoveryTooltip
      title="Keep ‘em active"
      anchor={
        hasBeenOpened ? (
          <Icon name="infoFilled" color="darkBloobirds" size={16} className={styles._info_icon} />
        ) : (
          <DiscoveryTooltip.DiscoveryDefaultAnchor />
        )
      }
    >
      <DiscoveryTooltip.TooltipImage>
        <img src={inactiveImage} alt={inactiveImage} style={{ height: '95px' }} />
      </DiscoveryTooltip.TooltipImage>
      <DiscoveryTooltip.TooltipFooter
        description={
          'We have improved how to identify and prevent you from having inactive objects with a new logic and process that will help with upcoming steps.'
        }
      >
        <DiscoveryTooltip.TooltipButton
          isMainButton
          variant="clear"
          color="white"
          className={styles._clear_button}
          onClick={() => {
            save(UserHelperKeys.SEEN_INACTIVE_DISCOVERY_TOOLTIP);
          }}
        >
          OK
        </DiscoveryTooltip.TooltipButton>
        <DiscoveryTooltip.TooltipButton
          variant="secondary"
          onClick={() => {
            window.open('https://support.bloobirds.com/hc/en-us/articles/5856514200860', '_blank');
            save(UserHelperKeys.SEEN_INACTIVE_DISCOVERY_TOOLTIP);
          }}
        >
          TELL ME MORE ✨
        </DiscoveryTooltip.TooltipButton>
      </DiscoveryTooltip.TooltipFooter>
    </DiscoveryTooltip>
  );
};

export default InactiveTabDiscoveryTooltip;
