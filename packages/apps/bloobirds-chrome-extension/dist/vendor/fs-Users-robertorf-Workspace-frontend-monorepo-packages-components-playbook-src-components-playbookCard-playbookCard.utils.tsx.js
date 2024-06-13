var _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { PlaybookTab, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import __vite__cjsImport2_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport2_mixpanelBrowser.__esModule ? __vite__cjsImport2_mixpanelBrowser.default : __vite__cjsImport2_mixpanelBrowser;
export function getTabIcon(tabSelected) {
  switch (tabSelected) {
    case PlaybookTab.SNIPPETS:
      return "snippet";
    case PlaybookTab.PITCHES:
      return "chat";
    case PlaybookTab.EMAILS:
      return "mail";
    case PlaybookTab.LINKEDIN:
      return "linkedin";
    case PlaybookTab.WHATSAPP:
      return "whatsapp";
    case PlaybookTab.QQS:
      return "chatSupport";
    default:
      return "questionCircle";
  }
}
export const getButtonProps = (tabSelected, disabled) => {
  _s();
  const {
    t
  } = useTranslation();
  switch (tabSelected) {
    case PlaybookTab.PITCHES:
      return {
        iconLeft: "eye",
        onClick: () => {
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_VIEW_PITCH_ON_PLAYBOOK);
        },
        text: t("playbook.card.view")
      };
    case PlaybookTab.EMAILS:
      return {
        iconLeft: "send",
        onClick: () => {
        },
        text: t("playbook.card.send"),
        disabled
      };
    case PlaybookTab.SNIPPETS:
      return {
        iconLeft: "fileInsert",
        onClick: () => {
        },
        text: t("playbook.card.insert"),
        disabled
      };
    case PlaybookTab.LINKEDIN:
      return {
        iconLeft: "linkedin",
        onClick: () => {
        },
        text: t("playbook.card.send"),
        disabled
      };
    case PlaybookTab.WHATSAPP:
      return {
        iconLeft: "whatsapp",
        onClick: () => {
        },
        text: t("playbook.card.send"),
        disabled
      };
  }
};
_s(getButtonProps, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
