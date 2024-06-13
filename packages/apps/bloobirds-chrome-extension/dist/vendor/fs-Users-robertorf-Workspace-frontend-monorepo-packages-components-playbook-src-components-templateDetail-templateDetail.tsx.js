import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-templateDetail-templateDetail.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/templateDetail/templateDetail.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/templateDetail/templateDetail.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import __vite__cjsImport4_reactShadowRoot from "/vendor/.vite-deps-react-shadow-root.js__v--23020670.js"; const ReactShadowRoot = __vite__cjsImport4_reactShadowRoot.__esModule ? __vite__cjsImport4_reactShadowRoot.default : __vite__cjsImport4_reactShadowRoot;
import { Button, CircularBadge, createToast, Dropdown, Icon, Label, Spinner, Text, Tooltip, useHover, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMessagingTemplate, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { TEMPLATE_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useIsTemplateOwner } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-hooks-useIsTemplateOwner.ts.js";
import resetSalesforceStyles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-utils-resetSalesforceCSSs.module.css.js";
import { TemplateInformation } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormHeader.tsx.js";
import { PlaybookConfirmationModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookConfirmationModal-playbookConfirmationModal.tsx.js";
import Metric from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-templateDetail-metric-metric.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-templateDetail-templateDetail.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const TemplateHeader = ({
  name,
  isBattlecard,
  isOfficial,
  visibility,
  createdBy,
  type,
  cadenceUsages,
  templateStatistics,
  ...template
}) => {
  _s();
  const {
    users
  } = useUserSearch() || {};
  const author = users?.find((user) => user.id === createdBy);
  const isEmail = type === TEMPLATE_TYPES.EMAIL;
  const [anchorRef, isHovering] = useHover();
  const {
    ref,
    visible: infoVisible,
    setVisible: setInfoVisible
  } = useVisible(false, anchorRef);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extendedScreen.templateDetail"
  });
  useEffect(() => {
    setInfoVisible(isHovering);
  }, [isHovering]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.header,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "m",
      weight: "bold",
      children: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.headerIcons,
      children: [isEmail && cadenceUsages > 0 && /* @__PURE__ */ _jsxDEV(Label, {
        size: "small",
        color: "verySoftPurple",
        textColor: "purple",
        uppercase: false,
        overrideStyle: {
          maxWidth: "142px",
          letterSpacing: 0.5
        },
        children: t("usedInXCadences", {
          count: cadenceUsages || 0
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 11
      }, void 0), visibility && /* @__PURE__ */ _jsxDEV(Label, {
        size: "small",
        color: "verySoftPurple",
        textColor: "purple",
        uppercase: false,
        overrideStyle: {
          maxWidth: "77px"
        },
        children: /* @__PURE__ */ _jsxDEV("span", {
          className: styles.visibilityLabel,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: visibility === "PUBLIC" ? "unlock" : "lock",
            color: "purple",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 77,
            columnNumber: 15
          }, void 0), visibility === "PUBLIC" ? t("public") : t("private")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 11
      }, void 0), isBattlecard && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("battleCard"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "battlecards",
          color: "purple"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 11
      }, void 0), isOfficial && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("official"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "bookmark",
          color: "purple"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 11
      }, void 0), template?.format === "HTML" && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("html"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "coding",
          color: "purple"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Dropdown, {
        anchor: /* @__PURE__ */ _jsxDEV("div", {
          ref: anchorRef,
          className: styles.dropdownAnchorWrapper,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "infoFilled",
            color: "darkBloobirds",
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 100,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 13
        }, void 0),
        visible: infoVisible,
        ref,
        zIndex: 20001,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.dropdownWrapper,
          children: /* @__PURE__ */ _jsxDEV(TemplateInformation, {
            template: {
              createdBy,
              ...template
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 108,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 107,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 9
      }, void 0), author && /* @__PURE__ */ _jsxDEV("div", {
        className: styles._assigned_to,
        children: /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: `${t("author")}: ${author?.name}`,
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
            size: "s",
            color: "lightPeanut",
            style: {
              color: "var(--white)",
              fontSize: "9px"
            },
            backgroundColor: author?.color || "lightPeanut",
            children: author?.shortname || "U"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 118,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 11
      }, void 0), !!template?.taskTitle && /* @__PURE__ */ _jsxDEV("div", {
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
              height: "22px",
              display: "flex",
              padding: "4px"
            },
            children: template.taskTitle
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 133,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 132,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, void 0), isEmail && templateStatistics && Object.keys(templateStatistics).length !== 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.statistics,
      children: [/* @__PURE__ */ _jsxDEV(Metric, {
        name: "USED_COUNT",
        value: templateStatistics.USED_COUNT
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Metric, {
        name: "OPENED_RATE",
        value: templateStatistics.OPENED_RATE
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Metric, {
        name: "CLICKED_RATE",
        value: templateStatistics.CLICKED_RATE
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Metric, {
        name: "REPLIED_RATE",
        value: templateStatistics.REPLIED_RATE
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 52,
    columnNumber: 5
  }, void 0);
};
_s(TemplateHeader, "8M3j50LkZTXizx8jmQD6iSkLjhc=", false, function() {
  return [useUserSearch, useHover, useVisible, useTranslation];
});
_c = TemplateHeader;
export const TemplateDetail = ({
  template,
  extended,
  backButtonAction,
  dialerButtons,
  insertButtonAction = () => {
  },
  replaceButtonAction = () => {
  },
  setSelectedTemplate,
  onlyReadable = false
}) => {
  _s2();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();
  const isSnippet = template.type === TEMPLATE_TYPES.SNIPPET;
  const {
    deleteMessagingTemplate
  } = useMessagingTemplate(template?.id);
  const isOwner = useIsTemplateOwner(template);
  const handleDelete = () => {
    deleteMessagingTemplate(template?.id).then((res) => {
      if (res.error) {
        console.error(res);
      } else {
        createToast({
          type: "success",
          message: "Template deleted successfully"
        });
      }
      setIsModalOpen(false);
      backButtonAction();
      window.dispatchEvent(new CustomEvent("PLAYBOOK_FEED"));
    });
  };
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.playbookTab.header"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: !template ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.loading,
      children: /* @__PURE__ */ _jsxDEV(Spinner, {
        name: "loadingCircle"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 211,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [extended && /* @__PURE__ */ _jsxDEV("div", {
        className: clsx({
          [styles.buttons]: !dialerButtons,
          [styles.dialerButtons]: !!dialerButtons
        }),
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          iconLeft: "arrowLeft",
          size: "small",
          color: "purple",
          onClick: backButtonAction,
          variant: "clear",
          uppercase: false,
          children: t("back")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 15
        }, void 0), !dialerButtons ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttons_right,
          children: [!onlyReadable && /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
              title: isOwner ? t("deleteTemplate") : t("userCantEdit"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Button, {
                iconLeft: "trashFull",
                size: "small",
                color: isOwner ? "tomato" : "softPeanut",
                variant: "secondary",
                onClick: () => setIsModalOpen(true),
                disabled: !isOwner
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 240,
                columnNumber: 25
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 236,
              columnNumber: 23
            }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: isOwner ? t("editTemplate") : t("userCantEdit"),
              position: "top",
              children: template?.format === "AST" && /* @__PURE__ */ _jsxDEV(Button, {
                iconLeft: "edit",
                size: "small",
                color: isOwner ? "purple" : "softPeanut",
                variant: "secondary",
                onClick: () => setSelectedTemplate({
                  ...template,
                  edit: true
                }),
                disabled: !isOwner
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 254,
                columnNumber: 27
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 249,
              columnNumber: 23
            }, void 0), !isSnippet && template?.format !== "HTML" && /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: t("insertTemplate"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Button, {
                iconLeft: "fileInsert",
                size: "small",
                color: "purple",
                variant: "secondary",
                onClick: () => insertButtonAction(template)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 266,
                columnNumber: 27
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 265,
              columnNumber: 25
            }, void 0)]
          }, void 0, true), /* @__PURE__ */ _jsxDEV(Button, {
            iconLeft: isSnippet ? "fileInsert" : "sendEmailInvitation",
            size: "small",
            color: "purple",
            onClick: () => isSnippet ? insertButtonAction(template) : replaceButtonAction(template),
            variant: "primary",
            uppercase: false,
            children: isSnippet ? t("insert") : t("use")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 277,
            columnNumber: 19
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 233,
          columnNumber: 17
        }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttons_right,
          children: dialerButtons
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 291,
          columnNumber: 17
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 216,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.contentGeneralWrapper,
        children: [/* @__PURE__ */ _jsxDEV(TemplateHeader, {
          ...template
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 296,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(ReactShadowRoot, {
            children: /* @__PURE__ */ _jsxDEV("div", {
              ref,
              className: clsx(styles.templateBody, resetSalesforceStyles.salesforceReset),
              style: {
                overflow: "auto"
              },
              dangerouslySetInnerHTML: {
                __html: template?.format === "HTML" ? template?.content : template?.previewContent
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 299,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 298,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 297,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 295,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(PlaybookConfirmationModal, {
        openMode: isModalOpen && "Delete",
        templateId: template?.id,
        onClose: () => setIsModalOpen(false),
        onAccept: handleDelete
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 311,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 208,
    columnNumber: 5
  }, void 0);
};
_s2(TemplateDetail, "QrhsQOSO+oigNMTeqofUCvKwix0=", false, function() {
  return [useMessagingTemplate, useIsTemplateOwner, useTranslation];
});
_c2 = TemplateDetail;
var _c, _c2;
$RefreshReg$(_c, "TemplateHeader");
$RefreshReg$(_c2, "TemplateDetail");
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
