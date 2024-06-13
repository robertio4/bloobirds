import React from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoveryTooltip, Text } from '@bloobirds-it/flamingo-ui';
import { useGetInfoDisplayBlockByKey, useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { getDifferenceInHours } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { BubbleTooltipWrapper } from '../bubbleTooltipWrapper/bubbleTooltipWrapper';
import { TooltipContentHTML } from '../components/infoDisplayBlocks/infoDisplayBlocks';
import styles from './contactViewTooltips.module.css';

export const CreateTasksTooltip = () => {
  const { has, saveCustom, get } = useUserHelpers();
  const { t } = useTranslation();
  const hasBeenSaved = has(ExtensionHelperKeys.CREATE_TASKS_TOOLTIP);
  const { tooltipContent } = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.CREATE_TASKS_TOOLTIP);
  const leftBarTooltipSaved =
    getDifferenceInHours({
      startDate: new Date(get(ExtensionHelperKeys.LEFT_BAR_TOOLTIP) || ''),
      endDate: new Date(),
    }) > 120;

  const shouldDisplay =
    !hasBeenSaved &&
    tooltipContent &&
    leftBarTooltipSaved &&
    has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE);

  return (
    <BubbleTooltipWrapper>
      {shouldDisplay ? (
        <div className={styles.actionWrapper}>
          <DiscoveryTooltip isPersistent height="310px" position="bottom" visible={!hasBeenSaved}>
            <Text size="m" color="white" align="center" weight="medium" className={styles.title}>
              <TooltipContentHTML str={tooltipContent?.title} />
            </Text>
            <DiscoveryTooltip.TooltipImage className={styles.taskImage}>
              <img src={tooltipContent?.image} alt="create-tasks-tooltip" />
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
                      if (!hasBeenSaved) {
                        saveCustom({
                          key: ExtensionHelperKeys.CREATE_TASKS_TOOLTIP,
                          data: new Date().toISOString(),
                        });
                      }
                      mixpanel.track(MIXPANEL_EVENTS.EXTENSION_TASK_ACTION_TOOLTIP_CLOSE_CLICK);
                    }}
                    /*variant="secondary"
                          color="white"
                          className={clsx(styles.footerButton, styles.secondaryButton)}*/
                    color="purple"
                    variant="tertiary"
                    className={clsx(styles.footerButton, styles.mainButton)}
                    uppercase={false}
                  >
                    <>{t('tooltips.ok')}!</>
                  </DiscoveryTooltip.TooltipButton>
                  {/*<DiscoveryTooltip.TooltipButton
                    isMainButton
                    color="purple"
                    variant="tertiary"
                    className={clsx(styles.footerButton, styles.mainButton)}
                    uppercase={false}
                    onClick={() => {
                      window.open(tooltipContent?.buttonUrl, '_blank');
                      mixpanel.track(MIXPANEL_EVENTS.EXTENSION_TASK_ACTION_TOOLTIP_INFO_CLICK);
                      if (!hasBeenSaved) {
                        save(ExtensionHelperKeys.CREATE_TASKS_TOOLTIP);
                      }
                    }}
                  >
                    <>
                      <Icon name="book" color="purple" size={16} /> {tooltipContent?.buttonText}
                    </>
                  </DiscoveryTooltip.TooltipButton>*/}
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
