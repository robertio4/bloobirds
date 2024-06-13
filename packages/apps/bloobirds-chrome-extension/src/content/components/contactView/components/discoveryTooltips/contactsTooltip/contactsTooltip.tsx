import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Dropdown, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys } from '@bloobirds-it/types';

import styles from './contactsTooltip.module.css';

export const ContactsTooltip = ({
  left,
  top,
  display,
}: {
  top: number;
  left: number;
  display: boolean;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'tooltips' });
  const { save, has } = useUserHelpers();
  const shouldBeDisplayed = useMemo(
    () =>
      display &&
      has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE) &&
      !has(ExtensionHelperKeys.EXT_SALESFORCE_CONTACTS),
    [
      display,
      has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE),
      has(ExtensionHelperKeys.EXT_SALESFORCE_CONTACTS),
    ],
  );

  return (
    <span className={styles.dropdown_container} style={{ left: left + 30, top: top + 30 }}>
      {shouldBeDisplayed && (
        <Dropdown
          visible={shouldBeDisplayed}
          anchor={
            <div
              className={styles.anchor_container}
              style={{ background: 'var(--verySoftBloobirds)' }}
              role="button"
            >
              <div className={styles.dot} style={{ background: 'var(--bloobirds)' }} />
            </div>
          }
        >
          <div className={styles.dropdown_content}>
            <div className={styles.content_title}>
              <Icon name="bloobirds" size={32} />
              <Text size="s" weight="bold">
                {t('contactsTooltip.extensionName')}
              </Text>
            </div>
            <Text size="s">{t('contactsTooltip.navigateToProfile')} 🫧 </Text>
            <div style={{ alignSelf: 'flex-end' }}>
              <Button
                variant="clear"
                onClick={() => save(ExtensionHelperKeys.EXT_SALESFORCE_CONTACTS)}
                uppercase={false}
              >
                {t('gotIt')}
              </Button>
            </div>
          </div>
        </Dropdown>
      )}
    </span>
  );
};
