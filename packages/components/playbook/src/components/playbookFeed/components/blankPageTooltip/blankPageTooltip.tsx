import { useTranslation } from 'react-i18next';

import { IllustrationGroup as blankPageEmail } from '@bloobirds-it/assets';
import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';
import { getDifferenceInHours } from '@bloobirds-it/utils';

import styles from './blankPageTooltip.module.css';

export const BlankPageTooltip = () => {
  const { saveCustom, get } = useUserHelpers();
  const { t } = useTranslation('translation', { keyPrefix: 'tooltips' });
  const shouldBeDisplayed =
    getDifferenceInHours({
      startDate: new Date(get(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP) || ''),
      endDate: new Date(),
    }) > 120;

  return shouldBeDisplayed ? (
    <DiscoveryTooltip
      title={t('blankPageTooltip.title')}
      isPersistent
      visible={true}
      position="bottom"
      height="268px"
    >
      <DiscoveryTooltip.TooltipImage className={styles._home_filters_image}>
        <img src={blankPageEmail} width={180} alt={'calendar'} />
      </DiscoveryTooltip.TooltipImage>
      <DiscoveryTooltip.TooltipFooter description={t('blankPageTooltip.description')}>
        <DiscoveryTooltip.TooltipButton
          variant="clear"
          color="white"
          uppercase={false}
          className={styles._home_filters_button}
          onClick={() => {
            saveCustom({
              key: UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP,
              data: new Date().toISOString(),
            });
          }}
        >
          <>{t('ok')}!</>
        </DiscoveryTooltip.TooltipButton>
        <DiscoveryTooltip.TooltipButton
          uppercase={false}
          isMainButton
          className={styles._home_filters_button}
          onClick={() => {
            window.open('https://youtu.be/62LcjNaitGQ', '_blank');
          }}
          iconLeft="play"
        >
          {t('watchNow')}
        </DiscoveryTooltip.TooltipButton>
      </DiscoveryTooltip.TooltipFooter>
    </DiscoveryTooltip>
  ) : (
    <></>
  );
};
