import React from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoveryTooltip, Icon, Text } from '@bloobirds-it/flamingo-ui';
import {
  useEmailConnections,
  useGetInfoDisplayBlockByKey,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { getDifferenceInMinutes } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { BubbleTooltipWrapper } from '../bubbleTooltipWrapper/bubbleTooltipWrapper';
import { TooltipContentHTML } from '../components/infoDisplayBlocks/infoDisplayBlocks';
import styles from './contactViewTooltips.module.css';

export const EmailActionTooltip = () => {
  const { save, get, has } = useUserHelpers();
  const hasBeenSaved = has(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP);
  const { tooltipContent } = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP);
  const leftBarTooltipSaved =
    getDifferenceInMinutes({
      startDate: new Date(get(ExtensionHelperKeys.LEFT_BAR_TOOLTIP) || ''),
      endDate: new Date(),
    }) > 30;
  const { connections } = useEmailConnections();
  const shouldBeShown =
    leftBarTooltipSaved && !hasBeenSaved && tooltipContent && connections?.list?.length > 0;
  const { t } = useTranslation();

  return (
    <BubbleTooltipWrapper>
      {shouldBeShown ? (
        <div className={styles.actionWrapper}>
          <DiscoveryTooltip isPersistent height="310px" position="bottom" visible={!hasBeenSaved}>
            <Text size="m" color="white" align="center" weight="medium" className={styles.title}>
              <TooltipContentHTML str={tooltipContent?.title} />
            </Text>
            <DiscoveryTooltip.TooltipImage className={styles.image}>
              <img src={tooltipContent?.image} alt="see-preview-image" />
            </DiscoveryTooltip.TooltipImage>
            <DiscoveryTooltip.TooltipFooter>
              <div>
                <Text size="xs" color="white" className={styles.footer}>
                  <TooltipContentHTML str={tooltipContent?.footer} />
                </Text>
                <div className={clsx(styles.buttonsWrapper, styles.buttonsWrapper_email)}>
                  <DiscoveryTooltip.TooltipButton
                    isMainButton
                    onClick={() => {
                      if (!hasBeenSaved) {
                        save(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP);
                      }
                      mixpanel.track(MIXPANEL_EVENTS.EXTENSION_EMAIL_ACTION_TOOLTIP_CLOSE_CLICK);
                    }}
                    variant="secondary"
                    color="white"
                    className={clsx(styles.footerButton, styles.secondaryButton)}
                    uppercase={false}
                  >
                    {t('tooltips.ok')}
                  </DiscoveryTooltip.TooltipButton>
                  <DiscoveryTooltip.TooltipButton
                    isMainButton
                    color="purple"
                    variant="tertiary"
                    className={clsx(styles.footerButton, styles.mainButton)}
                    uppercase={false}
                    onClick={() => {
                      window.open(tooltipContent?.buttonUrl, '_blank');
                      mixpanel.track(MIXPANEL_EVENTS.EXTENSION_EMAIL_ACTION_TOOLTIP_INFO_CLICK);
                      if (!hasBeenSaved) {
                        save(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP);
                      }
                    }}
                  >
                    <>
                      <Icon name="book" color="purple" size={16} /> {tooltipContent?.buttonText}
                    </>
                  </DiscoveryTooltip.TooltipButton>
                </div>
              </div>
            </DiscoveryTooltip.TooltipFooter>
          </DiscoveryTooltip>
        </div>
      ) : (
        <></>
      )}
    </BubbleTooltipWrapper>
  );
};
