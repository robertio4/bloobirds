import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

// @ts-ignore
import calendarImg from '../../../../assets/tooltipImages/generalSettingsImages/calendar.png';
// @ts-ignore
import MeetingsDiscovery from '../../../../assets/tooltipImages/generalSettingsImages/meetingsDiscovery.png';
// @ts-ignore
import outlookImg from '../../../../assets/tooltipImages/generalSettingsImages/outlook.png';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './generalSettingsTooltips.module.css';

export const MeetingsTooltip = ({ defaultTooltipVisible }: { defaultTooltipVisible: boolean }) => {
  const { save, has } = useUserHelpers();
  const shouldBeVisible =
    has(UserHelperTooltipsKeys.GENERAL_SETTINGS_ASSIGNMENTS) &&
    !has(UserHelperTooltipsKeys.GENERAL_SETTINGS_MEETINGS) &&
    useHasQueryParam('tour') === 'true';
  return (
    <div className={styles._discovery_wrapper}>
      {shouldBeVisible && (
        <DiscoveryTooltip
          title="Meeting Configuration"
          visible={defaultTooltipVisible}
          isPersistent
        >
          <DiscoveryTooltip.TooltipImage className={styles._image}>
            <div className={styles._image_collage}>
              <img src={calendarImg} width={48} alt="General settings meetings calendar DT" />
              <img src={MeetingsDiscovery} width={250} alt="General settings meetings DT" />
              <img src={outlookImg} width={48} alt="General settings meetings outlook DT" />
            </div>
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="Choose your meeting settings. Required information, contact before meeting tasks and also calendar synchornization. Customize it to suit your needs ✨">
            <DiscoveryTooltip.TooltipButton
              variant="secondary"
              className={styles._primary_button}
              isMainButton
              size="small"
              onClick={() => {
                save(UserHelperTooltipsKeys.GENERAL_SETTINGS_MEETINGS);
                document.getElementById('leadsGeneralSettings').scrollIntoView({
                  behavior: 'smooth',
                });
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
