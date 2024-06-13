import { useTranslation } from 'react-i18next';

import { IconType } from '@bloobirds-it/flamingo-ui';
import { PlaybookTab, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

export function getTabIcon(tabSelected: PlaybookTab): IconType {
  switch (tabSelected) {
    case PlaybookTab.SNIPPETS:
      return 'snippet';
    case PlaybookTab.PITCHES:
      return 'chat';
    case PlaybookTab.EMAILS:
      return 'mail';
    case PlaybookTab.LINKEDIN:
      return 'linkedin';
    case PlaybookTab.WHATSAPP:
      return 'whatsapp';
    case PlaybookTab.QQS:
      return 'chatSupport';
    default:
      return 'questionCircle';
  }
}

export const getButtonProps = (
  tabSelected,
  disabled,
): { iconLeft: IconType; onClick: () => void; text: string; disabled?: boolean } => {
  const { t } = useTranslation();
  switch (tabSelected) {
    case PlaybookTab.PITCHES:
      return {
        iconLeft: 'eye',
        onClick: () => {
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_VIEW_PITCH_ON_PLAYBOOK);
        },
        text: t('playbook.card.view'),
      };
    case PlaybookTab.EMAILS:
      return {
        iconLeft: 'send',
        onClick: () => {},
        text: t('playbook.card.send'),
        disabled,
      };
    case PlaybookTab.SNIPPETS:
      return {
        iconLeft: 'fileInsert',
        onClick: () => {},
        text: t('playbook.card.insert'),
        disabled,
      };
    case PlaybookTab.LINKEDIN:
      return {
        iconLeft: 'linkedin',
        onClick: () => {},
        text: t('playbook.card.send'),
        disabled,
      };
    case PlaybookTab.WHATSAPP:
      return {
        iconLeft: 'whatsapp',
        onClick: () => {},
        text: t('playbook.card.send'),
        disabled,
      };
  }
};
