import React from 'react';

import { DiscoveryTooltip, IconButton } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

// @ts-ignore
import InviteesImage from '../../../assets/calendarInviteesDiscovery.png';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import styles from './meetingForm.modules.css';

export const InviteesDiscoveryTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save } = useUserHelpers();
  return (
    <span className={styles.discovery_tooltip}>
      <DiscoveryTooltip
        title="You can sync your invitees!"
        anchor={
          !defaultTooltipVisible && <IconButton name="infoFilled" color="darkBloobirds" size={16} />
        }
        visible={defaultTooltipVisible}
      >
        <DiscoveryTooltip.TooltipImage className={styles.image}>
          <img src={InviteesImage} width={230} alt={'calendar'} />
        </DiscoveryTooltip.TooltipImage>
        <DiscoveryTooltip.TooltipFooter description="Now you can remove yourself from being an invitee of the meeting, also add more internal and external invitees and all this synchronised in your calendar account. ✨">
          <DiscoveryTooltip.TooltipButton
            variant="secondary"
            isMainButton={true}
            size="small"
            onClick={() => save(UserHelperKeys.NEW_INVITEES_SYNC)}
          >
            Ok
          </DiscoveryTooltip.TooltipButton>
        </DiscoveryTooltip.TooltipFooter>
      </DiscoveryTooltip>
    </span>
  );
};
