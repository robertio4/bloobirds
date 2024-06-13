import { useTranslation } from 'react-i18next';

import { TooltipContentBlock, TooltipContentHTML } from '@bloobirds-it/discovery-tooltips';
import { DiscoveryTooltip, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useGetInfoDisplayBlockByKey, useMediaQuery, useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, SalesforceTabs, SalesforceTabsIcon } from '@bloobirds-it/types';
import { isWhatsAppPage } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { TaskTab } from '../../../../taskSidebar/taskSidebar';
import { useExtensionLeftBarContext } from '../../../extensionLeftBarContext';
import styles from './leftBarTooltip.module.css';

export enum lBTVisibilityType {
  Hidden = 'Hidden',
  Top = 'Top',
  Bottom = 'Bottom',
}

function TooltipButton({ hasBeenSaved }: { hasBeenSaved?: boolean }) {
  const { t } = useTranslation();
  const { setDisplayLeftBarTooltip, setCurrentTab, currentTab } = useExtensionLeftBarContext();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.TOOLTIP}
      colors={{
        basic: 'lightPurple',
        iconColor: 'purple',
        bgUnselected: 'lightestPurple',
        opacity: hasBeenSaved ? 0.2 : 1,
      }}
      name={SalesforceTabs.TOOLTIP}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.TOOLTIP ? null : SalesforceTabs.TOOLTIP);
        setDisplayLeftBarTooltip(true);
      }}
      isHighlighted={currentTab === SalesforceTabs.TOOLTIP}
    >
      {t('leftBar.leftBarHints')}
    </TaskTab>
  );
}

export const LeftBarTooltip = () => {
  const { has, saveCustom } = useUserHelpers();
  const hasBeenSaved = has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP);
  const { tooltipContent } = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.LEFT_BAR_TOOLTIP);
  const shouldBeVisible =
    has(ExtensionHelperKeys.TOUR_DONE) && tooltipContent?.bodyBlocks?.length > 0;
  const isLinkedinPage = window.location.href.includes('linkedin');
  const { windowDimensions, isMediumDesktop } = useMediaQuery();
  const { t } = useTranslation();

  const xPosition = isLinkedinPage ? 62 : isWhatsAppPage() ? 10 : 100;

  return (
    <div>
      {shouldBeVisible ? (
        <DiscoveryTooltip
          anchor={<TooltipButton hasBeenSaved={hasBeenSaved} />}
          position={hasBeenSaved ? 'right-end' : 'right-start'}
          color="verySoftPurple"
          className={styles.left_bar_tooltip}
          customStyles={{
            position: hasBeenSaved ? 'fixed' : 'absolute',
            ...(hasBeenSaved ? { transform: `translate(64px, ${xPosition}px)` } : {}),
          }}
          arrowCustomStyles={{
            position: hasBeenSaved ? 'fixed' : 'absolute',
            ...(hasBeenSaved ? { transform: 'translate(0px, 350px)' } : {}),
          }}
          visible={!hasBeenSaved}
          height="fit-content"
          rounded
        >
          <>
            {!hasBeenSaved && (
              <Text size="l" color="purple" weight="heavy" align="center" className={styles.title}>
                <TooltipContentHTML str={tooltipContent?.title} />
              </Text>
            )}
            {tooltipContent?.bodyBlocks
              .sort((a, b) => a.order - b.order)
              .map(bodyBlockProps => (
                <TooltipContentBlock
                  key={bodyBlockProps.order + bodyBlockProps.icon}
                  {...bodyBlockProps}
                />
              ))}
          </>

          <DiscoveryTooltip.TooltipImage
            className={clsx(styles.image, {
              [styles.image_small]: isMediumDesktop,
            })}
          >
            {windowDimensions.height > 760 && <img src={tooltipContent?.image} alt="cards-image" />}
          </DiscoveryTooltip.TooltipImage>

          <DiscoveryTooltip.TooltipFooter footerColor="softPurple">
            <div>
              <Text size="xs" color="white" className={styles.footer}>
                <TooltipContentHTML str={tooltipContent?.footer} />
              </Text>
              <div>
                <DiscoveryTooltip.TooltipButton
                  isMainButton
                  onClick={() => {
                    if (!hasBeenSaved) {
                      saveCustom({
                        key: ExtensionHelperKeys.LEFT_BAR_TOOLTIP,
                        data: new Date().toISOString(),
                      });
                    }
                  }}
                  variant="secondary"
                  color="white"
                  className={clsx(styles.footerButton, styles.secondaryButton)}
                  uppercase={false}
                >
                  <>{t('common.ok')}!</>
                </DiscoveryTooltip.TooltipButton>
                <DiscoveryTooltip.TooltipButton
                  isMainButton
                  color="purple"
                  variant="tertiary"
                  className={clsx(styles.footerButton, styles.mainButton)}
                  uppercase={false}
                  onClick={() => {
                    window.open(tooltipContent?.buttonUrl, '_blank');
                    if (!hasBeenSaved) {
                      saveCustom({
                        key: ExtensionHelperKeys.LEFT_BAR_TOOLTIP,
                        data: new Date().toISOString(),
                      });
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
      ) : (
        <></>
      )}
    </div>
  );
};
