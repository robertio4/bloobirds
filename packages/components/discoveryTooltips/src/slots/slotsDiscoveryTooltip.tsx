import React from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoveryTooltip, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { MIXPANEL_EVENTS, UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

// @ts-ignore
import Image from '../assets/slotsTooltipImage.png';
import styles from './slotsTooltips.module.css';

const tooltipContent = {
  helperKey: UserHelperTooltipsKeys.SLOTS_TOOLTIP,
  title: 'title',
  image: Image,
  footer: 'footer',
  buttonText: 'buttonText',
  buttonUrl: {
    en:
      'https://support.bloobirds.com/hc/en-us/articles/10121942256284-How-can-I-create-edit-and-discard-calendar-slots-',
    es:
      'https://support.bloobirds.com/hc/es-es/articles/10121942256284--C%C3%B3mo-puedo-crear-editar-y-descartar-calendar-slots-',
  },
};

export const SlotsDiscoveryTooltip = () => {
  const { has, save, get } = useUserHelpers();
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'tooltips.slotsTooltip' });
  const lang = i18n.language;
  const hasBeenSaved = has(tooltipContent.helperKey);

  const isSlotsEnabled = get(UserHelperKeys.COMPLETE_WELCOME_SCREEN);
  const daysSinceWelcomeScreen =
    isSlotsEnabled && spacetime(isSlotsEnabled).diff(spacetime.now(), 'day');
  const shouldBeDisplayed = !hasBeenSaved && daysSinceWelcomeScreen && daysSinceWelcomeScreen > 7;
  return shouldBeDisplayed ? (
    <div className={styles.wrapper}>
      <DiscoveryTooltip isPersistent height="310px" position="bottom" visible={!hasBeenSaved}>
        <Text size="m" color="white" align="center" weight="medium" className={styles.title}>
          {t('title')}
        </Text>
        <DiscoveryTooltip.TooltipImage className={styles.image}>
          <img src={tooltipContent?.image} alt="slots-image" />
        </DiscoveryTooltip.TooltipImage>
        <DiscoveryTooltip.TooltipFooter>
          <div>
            <Text size="xs" color="white" className={styles.footer}>
              {t('footer')}
            </Text>
            <div className={styles.buttonsWrapper}>
              <DiscoveryTooltip.TooltipButton
                isMainButton
                onClick={() => {
                  mixpanel.track(MIXPANEL_EVENTS.EXTENSION_SEE_SLOTS_TOOLTIP_CLOSE_CLICK);
                  if (!hasBeenSaved) {
                    save(tooltipContent.helperKey);
                  }
                }}
                variant="secondary"
                color="white"
                className={clsx(styles.footerButton, styles.secondaryButton)}
                uppercase={false}
              >
                <>{t('ok')}!</>
              </DiscoveryTooltip.TooltipButton>
              <DiscoveryTooltip.TooltipButton
                isMainButton
                color="purple"
                variant="tertiary"
                className={clsx(styles.footerButton, styles.mainButton)}
                uppercase={false}
                onClick={() => {
                  window.open(tooltipContent.buttonUrl[lang], '_blank');
                  mixpanel.track(MIXPANEL_EVENTS.EXTENSION_SEE_SLOTS_TOOLTIP_INFO_CLICK);
                  if (!hasBeenSaved) {
                    save(tooltipContent.helperKey);
                  }
                }}
              >
                <>
                  <Icon name="book" color="purple" size={16} /> {t(tooltipContent?.buttonText)}
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
