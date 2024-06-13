import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-dialerExtendedContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/extendedScreen/dialerExtendedContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/extendedScreen/dialerExtendedContent.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Checkbox, IconButton, Spinner } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId, useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { NoteForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-notes-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getFieldByLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-dialerExtendedScreen.module.css.js";
import { DialerPlaybookFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-playbook-dialerPlaybook.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function PlaybookExtendedScreen(props) {
  _s();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.content,
      children: /* @__PURE__ */ _jsxDEV(DialerPlaybookFeed, {
        accountId: props.settings?.account.id,
        isRightOpen: props.rightOpen,
        handleOnClose: props.handleOnClose,
        setShowAutoSetting: props.showAutoSetting,
        userId: props.userId,
        isAdminUser: props.adminUser
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, this), props.showAutoSetting1 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.checkbox,
      children: /* @__PURE__ */ _jsxDEV(Checkbox, {
        color: "purple",
        backgroundColor: "lightPurple",
        size: "small",
        expand: true,
        checked: props.checked,
        onClick: props.onClick,
        children: t("dialer.extendedScreen.autoOpen")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 9
    }, this)]
  }, void 0, true);
}
_s(PlaybookExtendedScreen, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = PlaybookExtendedScreen;
function NoteExtendedScreen({
  rightOpen,
  handleOnClose
}) {
  _s2();
  const [isLoading, setIsLoading] = useState(false);
  const activity = useDialer((state) => state.activity);
  const {
    t
  } = useTranslation();
  if (!activity) {
    return null;
  }
  const activityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.notesContent,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.header, {
        [styles.headerLeft]: !rightOpen,
        [styles.headerRight]: rightOpen
      }),
      ...rightOpen ? {
        style: {
          flexDirection: "row-reverse"
        }
      } : {},
      children: isLoading ? /* @__PURE__ */ _jsxDEV(Spinner, {
        size: 24,
        name: "loadingCircle",
        color: "softPeanut"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 11
      }, this) : /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "cross",
        color: "bloobirds",
        onClick: handleOnClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(NoteForm, {
      activityId: activity?.id,
      activityType,
      accountId: activity?.id.accountId,
      showFooter: false,
      fitAllHeight: true,
      title: t("dialer.extendedScreen.note"),
      setIsLoading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 77,
    columnNumber: 5
  }, this);
}
_s2(NoteExtendedScreen, "Sj19KFe8f1uRSU7E/GDwP09jH4Y=", false, function() {
  return [useDialer, useTranslation];
});
_c2 = NoteExtendedScreen;
export const DialerExtendedContent = ({
  isRightOpen,
  handleOnClose
}) => {
  _s3();
  const {
    settings,
    mutate,
    saveUserSettings
  } = useActiveUserSettings();
  const autoOpenPitchesInDialer = settings?.user?.autoOpenPitchesInDialer;
  const userId = useActiveUserId();
  const userRoles = settings?.user?.roles;
  const isAdminUser = userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const {
    setAutoOpenPitchesInDialer
  } = useDialerStore();
  const [showAutoSetting, setShowAutoSetting] = useState(true);
  const extendedScreenType = useDialer((state) => state.extendedScreenType);
  const setAutoOpenPitchesInDialerSetting = (newSetting) => saveUserSettings(userId, {
    autoOpenPitchesInDialer: newSetting
  }).then(() => {
    mutate();
    setAutoOpenPitchesInDialer(newSetting);
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.container, {
        [styles.containerPadding]: showAutoSetting && extendedScreenType !== "notes"
      }),
      children: [extendedScreenType === "pitches" && /* @__PURE__ */ _jsxDEV(PlaybookExtendedScreen, {
        settings,
        rightOpen: isRightOpen,
        handleOnClose,
        showAutoSetting: setShowAutoSetting,
        userId,
        adminUser: isAdminUser,
        showAutoSetting1: showAutoSetting,
        checked: autoOpenPitchesInDialer,
        onClick: setAutoOpenPitchesInDialerSetting
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 11
      }, void 0), extendedScreenType === "notes" && /* @__PURE__ */ _jsxDEV(NoteExtendedScreen, {
        rightOpen: isRightOpen,
        handleOnClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s3(DialerExtendedContent, "p1vxmF8A7G9WkujuJxfs1ITVxdk=", false, function() {
  return [useActiveUserSettings, useActiveUserId, useDialerStore, useDialer];
});
_c3 = DialerExtendedContent;
var _c, _c2, _c3;
$RefreshReg$(_c, "PlaybookExtendedScreen");
$RefreshReg$(_c2, "NoteExtendedScreen");
$RefreshReg$(_c3, "DialerExtendedContent");
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
