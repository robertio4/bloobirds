var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/tabContent.utils.tsx";
import { Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { PlaybookTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const noResultsContent = ({
  tabSelected,
  callback,
  t
}) => {
  const content = {
    [PlaybookTab.SNIPPETS]: {
      title: t("playbook.tabContent.noTemplates", {
        type: "snippet",
        icon: "\u{1F4AC}"
      }),
      description: t("playbook.tabContent.noTemplatesMessage", {
        type: "snippets"
      }),
      actionButton: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        onClick: callback,
        iconLeft: "plus",
        color: "lightPurple",
        children: t("playbook.addNewTemplate")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, void 0)
    },
    [PlaybookTab.PITCHES]: {
      title: t("playbook.tabContent.noTemplates", {
        type: "pitch",
        icon: "\u{1F4AC}"
      }),
      description: t("playbook.tabContent.noTemplatesMessage", {
        type: "pitches"
      }),
      actionButton: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        onClick: callback,
        iconLeft: "plus",
        color: "lightPurple",
        children: t("playbook.addNewTemplate")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }, void 0)
    },
    [PlaybookTab.EMAILS]: {
      title: t("playbook.tabContent.noTemplates", {
        type: "email",
        icon: "\u2709\uFE0F"
      }),
      description: t("playbook.tabContent.noTemplatesMessage", {
        type: "templates"
      }),
      actionButton: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        onClick: callback,
        iconLeft: "plus",
        color: "lightPurple",
        children: t("playbook.addNewTemplate")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0)
    },
    [PlaybookTab.LINKEDIN]: {
      title: t("playbook.tabContent.noTemplates", {
        type: "LinkedIn",
        icon: "\u{1F4C4}\uFE0F"
      }),
      description: t("playbook.tabContent.noTemplatesMessage", {
        type: "templates"
      }),
      actionButton: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        onClick: callback,
        iconLeft: "plus",
        color: "lightPurple",
        children: t("playbook.addNewTemplate")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, void 0)
    },
    [PlaybookTab.WHATSAPP]: {
      title: t("playbook.tabContent.noTemplates", {
        type: "Whatsapp",
        icon: "\u{1F4C4}\uFE0F"
      }),
      description: t("playbook.tabContent.noTemplatesMessage", {
        type: "templates"
      }),
      actionButton: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        onClick: callback,
        iconLeft: "plus",
        color: "lightPurple",
        children: t("playbook.addNewTemplate")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 9
      }, void 0)
    },
    [PlaybookTab.QQS]: {
      title: t("playbook.tabContent.noQQs"),
      description: t("playbook.tabContent.noQQsMessage"),
      actionButton: /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        onClick: () => window.open("https://app.bloobirds.com/app/playbook/messaging/qq"),
        iconLeft: "plus",
        color: "lightPurple",
        children: t("playbook.addNewQQ")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, void 0)
    }
  };
  return content[tabSelected];
};
