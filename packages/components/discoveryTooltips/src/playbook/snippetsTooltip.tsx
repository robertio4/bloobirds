import React from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoveryTooltip, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useGetInfoDisplayBlockByKey, useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, MIXPANEL_EVENTS, UserHelperTooltipsKeys } from '@bloobirds-it/types';
import { getDifferenceInHours } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { TooltipContentHTML } from '../components/infoDisplayBlocks/infoDisplayBlocks';
import styles from './playbookTooltips.module.css';

export const SnippetsTooltip = () => {
  const { has, save, get } = useUserHelpers();
  const hasBeenSaved = has(ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP);
  const { t } = useTranslation();
  const { tooltipContent } = useGetInfoDisplayBlockByKey(
    ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP,
  );
  const templatesTooltipSaved =
    getDifferenceInHours({
      startDate: new Date(get(UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP) || ''),
      endDate: new Date(),
    }) > 48;

  const shouldBeShown =
    !hasBeenSaved &&
    templatesTooltipSaved &&
    has(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP) &&
    tooltipContent;

  return shouldBeShown ? (
    <div className={styles.wrapper}>
      <DiscoveryTooltip
        isPersistent
        height="310px"
        position="bottom"
        visible={!hasBeenSaved}
        anchor={
          <div
            className={styles.anchor_container}
            style={{ background: 'var(--lightestPurple)' }}
            role="button"
          >
            <div className={styles.dot} style={{ background: 'var(--softPurple)' }} />
          </div>
        }
      >
        <Text size="m" color="white" align="center" weight="medium" className={styles.title}>
          <TooltipContentHTML str={tooltipContent?.title} />
        </Text>
        <DiscoveryTooltip.TooltipImage className={styles.image}>
          <img src={tooltipContent?.image} alt="snippets-image" />
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
                  mixpanel.track(MIXPANEL_EVENTS.EXTENSION_PLAYBOOK_SNIPPETS_TOOLTIP_CLOSE_CLICK);
                  if (!hasBeenSaved) {
                    save(ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP);
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
                  mixpanel.track(MIXPANEL_EVENTS.EXTENSION_PLAYBOOK_SNIPPETS_TOOLTIP_INFO_CLICK);
                  if (!hasBeenSaved) {
                    save(ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP);
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
  );
};
