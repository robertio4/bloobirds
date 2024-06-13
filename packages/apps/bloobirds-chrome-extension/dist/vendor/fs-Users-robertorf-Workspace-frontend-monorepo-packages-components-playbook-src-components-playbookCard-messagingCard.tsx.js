import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-messagingCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookCard/messagingCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookCard/messagingCard.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Label, Text, Tooltip, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MIXPANEL_EVENTS, PlaybookTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { removeHtmlTags } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import { useIsTemplateOwner } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-hooks-useIsTemplateOwner.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-playbookCard.module.css.js";
import { getButtonProps, getTabIcon } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-playbookCard.utils.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const standardButtonProps = {
  size: "small",
  uppercase: false,
  variant: "secondary",
  color: "purple"
};
export const MessagingCard = ({
  template,
  onClick,
  tabSelected,
  isSmartEmail,
  buttonProps,
  templateFunctions,
  actionsDisabled,
  sidePeekEnabled
}) => {
  _s();
  const [ref, isHovering] = useHover();
  const tabIcon = tabSelected && getTabIcon(tabSelected);
  const lastButtonProps = getButtonProps(tabSelected, actionsDisabled);
  const isPitches = tabSelected === PlaybookTab.PITCHES;
  const isSnippet = tabSelected === PlaybookTab.SNIPPETS;
  const isEmails = tabSelected === PlaybookTab.EMAILS;
  const {
    t
  } = useTranslation();
  const isOwner = useIsTemplateOwner(template);
  const containerClasses = clsx(styles.container, {
    [styles.containerSidePeek]: sidePeekEnabled,
    [styles.containerSmartEmail]: isSmartEmail
  });
  const cardClasses = clsx(styles.cardText, {
    [styles.cardTextSidePeek]: sidePeekEnabled
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    ref,
    className: containerClasses,
    onClick: () => onClick(template),
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: cardClasses,
      children: [!template?.taskTitle && template?.isOfficial && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.official_banner,
        children: /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("playbook.card.officialTemplate"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "bookmark_big",
            color: "purple",
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 63,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.leftIcons_container,
        children: [tabIcon && /* @__PURE__ */ _jsxDEV(Icon, {
          name: tabIcon,
          color: "lightPurple",
          size: 24
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 23
        }, void 0), (isPitches || isSnippet) && template?.isBattlecard && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("playbook.card.battlecard"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "battlecards",
            color: "purple"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 71,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 13
        }, void 0), isEmails && template?.format === "HTML" && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("playbook.card.html"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "coding",
            color: "softPurple",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 76,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.templateTextWrapper,
        children: [sidePeekEnabled ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.templateText,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            weight: "bold",
            children: template?.name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 83,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            children: /* @__PURE__ */ _jsxDEV("span", {
              className: styles.templateBody,
              children: removeHtmlTags(template?.previewContent)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 87,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 86,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          weight: "bold",
          children: [/* @__PURE__ */ _jsxDEV("span", {
            className: styles.template_name,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles.template_text,
              children: template?.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 17
            }, void 0), isEmails && !!template?.taskTitle && /* @__PURE__ */ _jsxDEV("div", {
              className: styles.step_banner,
              children: /* @__PURE__ */ _jsxDEV(Tooltip, {
                title: template?.taskTitle,
                position: "top",
                children: /* @__PURE__ */ _jsxDEV(Label, {
                  size: "small",
                  uppercase: false,
                  color: "verySoftTangerine",
                  textColor: "tangerine",
                  overrideStyle: {
                    ...{
                      paddingLeft: "3px",
                      paddingRight: "3px",
                      paddingTop: "0px",
                      paddingBottom: "0px"
                    }
                  },
                  children: template.taskTitle
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 99,
                  columnNumber: 23
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 98,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 97,
              columnNumber: 19
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.templateBody,
            children: removeHtmlTags(template?.previewContent)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 13
        }, void 0), isSnippet && template?.shortcut && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.shortcutContainer,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: sidePeekEnabled ? "s" : "xs",
            weight: "bold",
            children: t("playbook.card.shortcut")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 124,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: sidePeekEnabled ? "s" : "xs",
            color: "darkBloobirds",
            className: styles.shortcut,
            children: ["/", template?.shortcut]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 127,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 123,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: isSmartEmail ? styles.smartButtonsContainer : styles.buttonsContainer,
      children: [template?.format === "AST" && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: !isOwner && t("playbook.onlyOwner"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttonContainer,
          onClick: (e) => e.stopPropagation(),
          children: /* @__PURE__ */ _jsxDEV(Button, {
            iconLeft: "edit",
            ...isOwner ? standardButtonProps : {
              ...standardButtonProps,
              color: "softPeanut"
            },
            onClick: buttonProps[0]?.onClick,
            disabled: !isOwner,
            children: isHovering && t("playbook.card.edit")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 142,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 141,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "eye",
        ...standardButtonProps,
        ...isPitches && {
          variant: "primary"
        },
        children: isHovering && t("playbook.card.view")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 9
      }, void 0), !isPitches && !isSmartEmail && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: actionsDisabled && t("playbook.permissions") || tabSelected === PlaybookTab.WHATSAPP && buttonProps[1]?.disabled && t("playbook.noPhoneNumber"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Button, {
          ...standardButtonProps,
          variant: "primary",
          ...lastButtonProps,
          onClick: buttonProps[1]?.onClick,
          color: actionsDisabled ? void 0 : "purple",
          ...tabSelected === PlaybookTab.WHATSAPP && {
            disabled: actionsDisabled || buttonProps[1]?.disabled
          },
          children: isHovering && lastButtonProps.text
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 168,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 11
      }, void 0), isSmartEmail && /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [isSnippet && /* @__PURE__ */ _jsxDEV(Button, {
          ...standardButtonProps,
          iconLeft: "fileInsert",
          variant: isSnippet ? "primary" : "secondary",
          onClick: (e) => {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_SNIPPET_ON_EMAIL_MODAL);
            templateFunctions.insertTemplate(template);
          },
          children: isHovering && "Insert"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 15
        }, void 0), !isSnippet && /* @__PURE__ */ _jsxDEV(Button, {
          ...standardButtonProps,
          iconLeft: "sendEmailInvitation",
          variant: "primary",
          onClick: (e) => {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_TEMPLATE_ON_EMAIL_MODAL);
            templateFunctions.replaceTemplate(template);
          },
          children: isHovering && t("playbook.card.use")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 199,
          columnNumber: 15
        }, void 0)]
      }, void 0, true)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 5
  }, void 0);
};
_s(MessagingCard, "RoClCgnqrr06RwZ43izXPs6KdN4=", false, function() {
  return [useHover, useTranslation, useIsTemplateOwner];
});
_c = MessagingCard;
var _c;
$RefreshReg$(_c, "MessagingCard");
if (import.meta.hot) {
  let isReactRefreshBoundary = function(mod) {
    if (mod == null || typeof mod !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const exportName in mod) {
      hasExports = true;
      if (exportName === "__esModule") {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(mod, exportName);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = mod[exportName];
      if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  };
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept((mod) => {
    if (isReactRefreshBoundary(mod)) {
      if (!window.__vite_plugin_react_timeout) {
        window.__vite_plugin_react_timeout = setTimeout(() => {
          window.__vite_plugin_react_timeout = 0;
          RefreshRuntime.performReactRefresh();
        }, 30);
      }
    } else {
      import.meta.hot.invalidate();
    }
  });
}
