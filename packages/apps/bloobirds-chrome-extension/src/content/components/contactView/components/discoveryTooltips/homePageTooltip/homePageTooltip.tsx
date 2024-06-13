import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { BubbleTooltipWrapper } from '@bloobirds-it/discovery-tooltips';
import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys } from '@bloobirds-it/types';

import HomePageImage from '../../../../../../assets/discoveryTooltips/homePage.png?base64';
import styles from './homePageTooltip.module.css';

export const HomePageTooltip = ({ display }: { display: boolean }) => {
  const { save, has } = useUserHelpers();
  const shouldBeDisplayed = useMemo(
    () => display && !has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE),
    [display, has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE)],
  );
  const { t } = useTranslation('translation', { keyPrefix: 'tooltips' });

  return (
    <BubbleTooltipWrapper alwaysVisible>
      <span className={styles.discovery_tooltip}>
        {shouldBeDisplayed && (
          <DiscoveryTooltip
            title={t('homePageTooltip.title')}
            visible={true}
            isPersistent
            position="left"
          >
            <DiscoveryTooltip.TooltipImage className={styles.image}>
              <img src={HomePageImage} width={230} alt={'calendar'} />
            </DiscoveryTooltip.TooltipImage>
            <DiscoveryTooltip.TooltipFooter description={t('homePageTooltip.description')}>
              <DiscoveryTooltip.TooltipButton
                variant="secondary"
                isMainButton={true}
                size="small"
                onClick={() => save(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE)}
              >
                {t('gotIt')}
              </DiscoveryTooltip.TooltipButton>
            </DiscoveryTooltip.TooltipFooter>
          </DiscoveryTooltip>
        )}
      </span>
    </BubbleTooltipWrapper>
  );
};
