import React from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoveryTooltip, Icon, Text } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserSettings,
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

export const SimilarDealsTooltip = () => {
  const { has, save } = useUserHelpers();
  const { t } = useTranslation();
  const hasBeenSaved = has(ExtensionHelperKeys.SIMILAR_DEALS_TOOLTIP);
  const { tooltipContent } = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.SIMILAR_DEALS_TOOLTIP);
  const { settings } = useActiveUserSettings();
  const accountActivationDate = settings?.account?.accountCreationDatetime;
  const activatedMoraThanAMonthAgo =
    getDifferenceInMinutes({
      startDate: new Date(accountActivationDate || ''),
      endDate: new Date(),
    }) > 43200; //Result from 30 * 24 * 60;

  const shouldBeShown =
    !hasBeenSaved &&
    has(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP) &&
    tooltipContent &&
    activatedMoraThanAMonthAgo;

  return (
    <BubbleTooltipWrapper>
      {shouldBeShown ? (
        <div className={styles.dealsWrapper}>
          <DiscoveryTooltip isPersistent height="310px" position="bottom" visible={!hasBeenSaved}>
            <Text size="m" color="white" align="center" weight="medium" className={styles.title}>
              <TooltipContentHTML str={tooltipContent?.title} />
            </Text>
            <DiscoveryTooltip.TooltipImage className={styles.image}>
              <img src={tooltipContent?.image} alt="similar-deals-images" />
            </DiscoveryTooltip.TooltipImage>
            <DiscoveryTooltip.TooltipFooter>
              <div>
                <Text size="xs" color="white" className={styles.footer}>
                  <TooltipContentHTML str={tooltipContent?.footer} />
                </Text>
                <div className={styles.buttonsWrapper}>
                  <DiscoveryTooltip.TooltipButton
                    isMainButton
                    onClick={() => {
                      mixpanel.track(MIXPANEL_EVENTS.EXTENSION_SIMILAR_DEALS_TOOLTIP_CLOSE_CLICK);
                      if (!hasBeenSaved) {
                        save(ExtensionHelperKeys.SIMILAR_DEALS_TOOLTIP);
                      }
                    }}
                    variant="secondary"
                    color="white"
                    className={clsx(styles.footerButton, styles.secondaryButton)}
                    uppercase={false}
                  >
                    <>{t('tooltips.ok')}!</>
                  </DiscoveryTooltip.TooltipButton>
                  <DiscoveryTooltip.TooltipButton
                    isMainButton
                    color="purple"
                    variant="tertiary"
                    className={clsx(styles.footerButton, styles.mainButton)}
                    uppercase={false}
                    onClick={() => {
                      window.open(tooltipContent?.buttonUrl, '_blank');
                      mixpanel.track(MIXPANEL_EVENTS.EXTENSION_SIMILAR_DEALS_TOOLTIP_INFO_CLICK);
                      if (!hasBeenSaved) {
                        save(ExtensionHelperKeys.SIMILAR_DEALS_TOOLTIP);
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
