import { Trans, useTranslation } from 'react-i18next';

import { Button, Checkbox, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useGeneralSearchVisibility, useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys } from '@bloobirds-it/types';

import { useExtensionContext } from '../../context';
import styles from '../noContextPage.module.css';

export const GeneralSearchBarBanner = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'generalSearchBar' });
  const { has, save, isLoading } = useUserHelpers();
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const dontShowHelper = has(ExtensionHelperKeys.DONT_SHOW_GENERAL_SEARCH_BAR_BANNER);
  const { toggleVisibility } = useGeneralSearchVisibility();

  let commandText = undefined;
  if (navigator.appVersion.indexOf('Win') != -1) {
    commandText = 'Ctrl + K';
  } else if (navigator.appVersion.indexOf('Mac') != -1) {
    commandText = 'Cmd⌘ + K';
  }

  function banishBanner() {
    save(ExtensionHelperKeys.DONT_SHOW_GENERAL_SEARCH_BAR_BANNER);
  }

  const handleLearnMore = () => {
    window.open(
      'https://support.bloobirds.com/hc/en-us/articles/6267573643676-How-does-the-general-search-bar-work-',
      '_blank',
    );
  };

  return commandText && !dontShowHelper && !isLoading ? (
    <div className={styles._info_banner}>
      <div className={styles._info_banner_title}>
        <Icon name="search" color="purple" size={24} />
        <Text size="m" color="purple" weight="bold">
          {t('bannerTitle')}
        </Text>
      </div>
      <div>
        <Text size="xs" color="purple" weight="regular">
          <Trans i18nKey="generalSearchBar.bannerSubtitle" />
        </Text>
      </div>
      <div className={styles._info_action}>
        <Text size="xs" color="purple" weight="bold">
          {t('openSearchBar')}
        </Text>
        <div className={styles.bannerCommandContainer} onClick={toggleVisibility}>
          <Text size="xs" weight="bold" color="peanut">
            {commandText?.toUpperCase()}
          </Text>
        </div>
      </div>
      <div className={styles._info_banner_footer}>
        <Checkbox
          color="purple"
          size="small"
          onClick={(value: boolean) => {
            if (value) banishBanner();
          }}
        >
          <Text size="xs">{t('checkBox')}</Text>
        </Checkbox>
        <Button
          size="small"
          variant="secondary"
          color="purple"
          uppercase={false}
          onClick={handleLearnMore}
        >
          <Icon name="book" color="purple" size={16} />
          {sidePeekEnabled && (
            <Text size="xs" color="purple" weight="bold">
              {t('learnMore')}
            </Text>
          )}
        </Button>
      </div>
    </div>
  ) : null;
};
