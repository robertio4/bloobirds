import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoveryTooltip, IconButton } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';

// @ts-ignore
import InviteesImage from '../assets/calendarInviteesDiscovery.png';
import styles from './inviteesDiscoveryTooltip.module.css';

export const InviteesDiscoveryTooltip = ({
  defaultTooltipVisible,
  parentRef,
}: {
  defaultTooltipVisible: boolean;
  parentRef: React.RefObject<HTMLElement>;
}) => {
  const { save } = useUserHelpers();
  const { t } = useTranslation('translation', { keyPrefix: 'tooltips' });
  const [launchTooltip, setLaunchTooltip] = useState<boolean>();
  useEffect(() => {
    if (parentRef.current.clientHeight) {
      setLaunchTooltip(true);
    }
  }, [parentRef]);

  return (
    <span className={styles.discovery_tooltip}>
      <DiscoveryTooltip
        title={t('inviteesDT.title')}
        anchor={
          !defaultTooltipVisible ? (
            <IconButton name="infoFilled" color="darkBloobirds" size={16} />
          ) : (
            <></>
          )
        }
        visible={launchTooltip}
      >
        <DiscoveryTooltip.TooltipImage className={styles.image}>
          <img src={InviteesImage} width={230} alt={'calendar'} />
        </DiscoveryTooltip.TooltipImage>
        <DiscoveryTooltip.TooltipFooter description={t('inviteesDT.description')}>
          <DiscoveryTooltip.TooltipButton
            variant="secondary"
            isMainButton={true}
            size="small"
            onClick={() => save(UserHelperKeys.NEW_INVITEES_SYNC)}
          >
            {t('ok')}
          </DiscoveryTooltip.TooltipButton>
        </DiscoveryTooltip.TooltipFooter>
      </DiscoveryTooltip>
    </span>
  );
};
