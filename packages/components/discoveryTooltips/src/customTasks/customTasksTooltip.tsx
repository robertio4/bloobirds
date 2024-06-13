import React from 'react';

import { DiscoveryTooltip, Icon } from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useActiveUserSettings,
  useNewCadenceTableEnabled,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { ExtensionHelperKeys } from '@bloobirds-it/types';
import { getDifferenceInHours } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { BubbleTooltipWrapper } from '../bubbleTooltipWrapper/bubbleTooltipWrapper';
//@ts-ignore
import customTasksTooltipImage from './../assets/customTasksTooltip.png';
import styles from './customTasksTooltip.module.css';
import { useTranslation } from "react-i18next";

export const CustomTasksTooltip = ({
  defaultTooltipVisible,
  children,
}: {
  children: React.ReactElement;
  defaultTooltipVisible: boolean;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'tooltips' });

  const { save, has, get } = useUserHelpers();
  const accountId = useActiveAccountId();
  const { settings } = useActiveUserSettings(true);

  const hasCustomTasksEnabled = useNewCadenceTableEnabled(accountId);

  let shouldBeShown = false;
  if (settings?.account?.accountCreationDatetime) {
    const isANewAccount =
      new Date(settings?.account?.accountCreationDatetime) > new Date('2023-07-14');
    const createTaskSaved =
      getDifferenceInHours({
        startDate: new Date(get(ExtensionHelperKeys.CREATE_TASKS_TOOLTIP) || ''),
        endDate: new Date(),
      }) > 48;

    shouldBeShown =
      hasCustomTasksEnabled &&
      createTaskSaved &&
      !has(ExtensionHelperKeys.CUSTOM_TASKS) &&
      !isANewAccount;
  }

  return (
    <BubbleTooltipWrapper>
      {shouldBeShown ? (
        <DiscoveryTooltip
          title={t('customTasksDT.title')}
          isPersistent
          visible={defaultTooltipVisible}
          anchor={children}
          height="310px"
          position="bottom-end"
          anchorShouldNotOpen
        >
          <DiscoveryTooltip.TooltipImage className={styles._home_filters_image}>
            <img src={customTasksTooltipImage} width={133} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter
            description={t('customTasksDT.description')}
            className={styles._lone_button}
          >
            <>
              <DiscoveryTooltip.TooltipButton
                onClick={() => {
                  save(ExtensionHelperKeys.CUSTOM_TASKS);
                }}
                uppercase={false}
                variant="secondary"
                color="white"
                className={clsx(styles.footerButton, styles.secondaryButton)}
              >
                {t('ok')}
              </DiscoveryTooltip.TooltipButton>
              <DiscoveryTooltip.TooltipButton
                isMainButton
                className={styles.footerButton}
                uppercase={false}
                onClick={() => {
                  window.open(
                    'https://www.youtube.com/watch?v=tVuKm9WDELM&feature=youtu.be',
                    '_blank',
                  );
                }}
              >
                <>
                  <Icon name="book" color="purple" size={16} /> {t('watchVideo')}
                </>
              </DiscoveryTooltip.TooltipButton>
            </>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      ) : (
        children
      )}
    </BubbleTooltipWrapper>
  );
};
