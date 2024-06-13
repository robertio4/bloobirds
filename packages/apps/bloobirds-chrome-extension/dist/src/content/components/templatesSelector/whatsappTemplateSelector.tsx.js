import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/templatesSelector/whatsappTemplateSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/templatesSelector/whatsappTemplateSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/templatesSelector/whatsappTemplateSelector.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Suspense = __vite__cjsImport2_react["Suspense"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Spinner, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId, useActiveUserSettings, useDataModel, useSuggestedTemplates } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { HandleTemplateModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-index.tsx.js";
import { Environment, PlaybookTab, PluralBobjectTypes, UserPermission, UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, insertTextWhatsApp, handleAddWhatsAppTemplate, forgeIdFieldsFromIdValue } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { RecoilRoot } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWR, { SWRConfig } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useActiveMessagingNameFilter } from "/src/hooks/useMessagingTemplates.tsx.js";
import { TemplateSelector } from "/src/content/components/templatesSelector/templateSelector.tsx.js";
import styles from "/src/content/components/templatesSelector/templatesSelector.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function getLeadById(bobjectIdFields) {
  _s();
  const {
    data: lead,
    isLoading
  } = useSWR(`/linkedin/leads/${bobjectIdFields.objectId}`, async () => api.get(`/linkedin/${PluralBobjectTypes[bobjectIdFields?.typeName]?.toLowerCase()}/${bobjectIdFields?.objectId}`).then((response) => response.data));
  return {
    lead,
    isLoading
  };
}
_s(getLeadById, "Z+LpP1J+9Zuc+rYFqJjzreOwImk=", false, function() {
  return [useSWR];
});
const WhatsappTemplateSelectorContent = ({
  leadId
}) => {
  _s2();
  const userId = useActiveUserId();
  const dataModel = useDataModel();
  const {
    settings
  } = useActiveUserSettings();
  const {
    visible,
    setVisible,
    ref
  } = useVisible(false);
  const {
    t,
    ready
  } = useTranslation("translation", {
    keyPrefix: "templateSelector"
  });
  const [, setMessagingTemplateName] = useActiveMessagingNameFilter();
  const [editModal, setEditModal] = useState({
    template: null,
    open: false
  });
  const bobjectIdObject = forgeIdFieldsFromIdValue(leadId);
  const {
    lead,
    isLoading
  } = getLeadById(bobjectIdObject);
  const stage = dataModel?.findValueById(lead?.stage);
  useEffect(() => {
    setMessagingTemplateName(null);
  }, []);
  const userName = settings?.user?.name;
  const userRoles = settings?.user?.roles;
  const userPermissions = settings?.user?.permissions;
  const isAdminUser = userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const hasEditAllPermissions = userPermissions?.includes(UserPermission.EDIT_ALL);
  const actionsDisabled = !isAdminUser && !hasEditAllPermissions && (userId !== lead?.assignedTo || !lead?.assignedTo);
  const suggestedTemplates = useSuggestedTemplates(lead, void 0, PlaybookTab.WHATSAPP);
  useEffect(() => {
    if (suggestedTemplates?.length === 1) {
      handleAdd({
        id: suggestedTemplates[0].id,
        fallbackContent: suggestedTemplates[0].previewContent,
        closeDropdown: false
      });
    }
    if (suggestedTemplates?.length === 0) {
      const badge = document.getElementById("badgeGroup");
      if (badge) {
        const classBadge = badge.classList;
        const classRunAnimation = Array.from(classBadge).find((className) => className.includes("wsRunAnimation"));
        if (classRunAnimation)
          badge.classList.remove(classRunAnimation);
      }
    }
  }, [suggestedTemplates?.length]);
  const handleAdd = ({
    id,
    fallbackContent,
    closeDropdown = true
  }) => handleAddWhatsAppTemplate(id, fallbackContent, lead, userName, () => closeDropdown && setVisible(false)).then((data) => {
    if (data) {
      const openNewPage = true;
      insertTextWhatsApp(
        openNewPage,
        '#main .copyable-area [contenteditable="true"][role="textbox"]',
        lead.phoneNumbers?.[0],
        data
      );
      setVisible(false);
    }
  });
  const classnames = clsx(styles.whatsAppContainer, {
    [styles.whatsAppContainerDisabled]: actionsDisabled,
    [styles.wsRunAnimation]: suggestedTemplates?.length > 0
  });
  const whatsappData = {
    phoneNumber: lead?.phoneNumbers?.[0],
    isSameActiveLead: true,
    userName: settings?.user?.name,
    lead
  };
  useEffect(() => {
    if (editModal?.open)
      setVisible(false);
  }, [editModal?.open]);
  if (isLoading || !lead) {
    return /* @__PURE__ */ _jsxDEV(Spinner, {
      name: "loadingCircle",
      size: 18
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 12
    }, void 0);
  }
  return ready ? /* @__PURE__ */ _jsxDEV("div", {
    className: styles.templateSelectorDropdown,
    children: [/* @__PURE__ */ _jsxDEV(Dropdown, {
      width: 424,
      ref,
      visible,
      zIndex: 2e4,
      style: {
        height: 620,
        padding: 0
      },
      anchor: /* @__PURE__ */ _jsxDEV("div", {
        id: "badgeGroup",
        className: classnames,
        onClick: () => !actionsDisabled && setVisible(!visible),
        children: isLoading || !lead ? /* @__PURE__ */ _jsxDEV(Spinner, {
          name: "loadingCircle",
          color: "softPeanut",
          size: 12
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 167,
          columnNumber: 15
        }, void 0) : /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: actionsDisabled && t("permissions"),
          position: "top",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "bBTemplate",
            color: "icon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 171,
            columnNumber: 17
          }, void 0), suggestedTemplates?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.badge,
            children: suggestedTemplates?.length
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 173,
            columnNumber: 19
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 169,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 11
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.templateSelectorWrapper,
        children: /* @__PURE__ */ _jsxDEV(TemplateSelector, {
          environment: Environment.WHATSAPP_TEMPLATE_SELECTOR,
          lead,
          handleAdd,
          setEditModal,
          whatsappData,
          closeDropdown: () => setVisible(false)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 181,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 180,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 7
    }, void 0), editModal?.open && /* @__PURE__ */ _jsxDEV(HandleTemplateModal, {
      template: editModal?.template,
      handleClose: () => {
        setVisible(true);
        setEditModal({
          template: null,
          open: false
        });
      },
      contextValues: {
        onSaveCallback: () => {
          setVisible(true);
        },
        onDeleteCallback: () => {
          setVisible(true);
          setEditModal({
            template: null,
            open: false
          });
        },
        ...stage ? {
          stage
        } : {}
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 153,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s2(WhatsappTemplateSelectorContent, "ZRSAVbArTKKRhQeDm4Eyr4guBoI=", false, function() {
  return [useActiveUserId, useDataModel, useActiveUserSettings, useVisible, useTranslation, useActiveMessagingNameFilter, useSuggestedTemplates];
});
_c = WhatsappTemplateSelectorContent;
export const WhatsappTemplateSelector = ({
  leadId
}) => {
  if (!leadId) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV(SWRConfig, {
    value: {
      revalidateOnFocus: false
    },
    children: /* @__PURE__ */ _jsxDEV(RecoilRoot, {
      children: /* @__PURE__ */ _jsxDEV(Suspense, {
        fallback: /* @__PURE__ */ _jsxDEV(Spinner, {
          name: "loadingCircle",
          size: 18
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 29
        }, void 0),
        children: /* @__PURE__ */ _jsxDEV(WhatsappTemplateSelectorContent, {
          leadId
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 229,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 228,
        columnNumber: 9
      }, void 0)
    }, "bb-whatsapp-template-selector", false, {
      fileName: _jsxFileName,
      lineNumber: 227,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 222,
    columnNumber: 5
  }, void 0);
};
_c2 = WhatsappTemplateSelector;
var _c, _c2;
$RefreshReg$(_c, "WhatsappTemplateSelectorContent");
$RefreshReg$(_c2, "WhatsappTemplateSelector");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
