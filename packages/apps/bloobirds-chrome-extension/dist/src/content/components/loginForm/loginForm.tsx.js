import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/loginForm/loginForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/loginForm/loginForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/loginForm/loginForm.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useLayoutEffect = __vite__cjsImport2_react["useLayoutEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Checkbox, Icon, Input, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getAuthUrl, login } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useIsNewAuthEnabled } from "/src/hooks/useIsNewAuthEnabled.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import LogoHeader from "/src/content/components/logoHeader/logoHeader.tsx.js";
import styles from "/src/content/components/loginForm/loginForm.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const LoginForm = () => {
  _s();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const {
    setLoggedIn,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const isNewAuthEnabled = useIsNewAuthEnabled();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.login"
  });
  useLayoutEffect(() => {
    setLoginError(false);
  }, [email, password]);
  const enableLogin = () => !processing && terms && email.length && password.length;
  const handleLogin = async () => {
    setProcessing(true);
    try {
      await login({
        email,
        password
      });
      setLoginSuccess(true);
      setLoggedIn(true);
      window.dispatchEvent(new CustomEvent(MessagesEvents.UserLoggedIn));
      window.location.reload();
    } catch (error) {
      setLoginError(true);
    } finally {
      setProcessing(false);
    }
  };
  const logeWrapperClasses = clsx(styles._logoWrapper, {
    [styles._logoWrapperSidePeek]: sidePeekEnabled
  });
  const formBottomClasses = clsx(styles._formBottom, {
    [styles._formBottomSidePeek]: sidePeekEnabled
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: logeWrapperClasses,
      children: /* @__PURE__ */ _jsxDEV(LogoHeader, {
        sidePeekEnabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, void 0), !isNewAuthEnabled ? /* @__PURE__ */ _jsxDEV("form", {
      className: styles._form,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._formTop,
        children: [/* @__PURE__ */ _jsxDEV(Input, {
          placeholder: t("emailPlaceholder"),
          value: email,
          onChange: setEmail
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Input, {
          placeholder: t("passwordPlaceholder"),
          type: "password",
          value: password,
          onChange: setPassword
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          checked: terms,
          onClick: setTerms,
          dataTest: "login-terms-agree",
          children: /* @__PURE__ */ _jsxDEV("span", {
            style: {
              fontSize: 11
            },
            children: /* @__PURE__ */ _jsxDEV(Trans, {
              i18nKey: "extension.login.termsAndConditions",
              components: [/* @__PURE__ */ _jsxDEV("a", {
                href: "https://app.bloobirds.com/master-subscription-agreement",
                target: "_blank",
                rel: "noreferrer"
              }, "0", false, {
                fileName: _jsxFileName,
                lineNumber: 75,
                columnNumber: 21
              }, void 0)]
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 72,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 71,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 13
        }, void 0), loginError && /* @__PURE__ */ _jsxDEV("div", {
          className: styles._errorWrapper,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "alertCircle",
            color: "tomato"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 87,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            color: "tomato",
            size: "s",
            children: t("failed")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 88,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: formBottomClasses,
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          expand: true,
          disabled: !enableLogin(),
          onClick: handleLogin,
          dataTest: "login-submit",
          children: t("login")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
          onClick: () => {
            window.open("https://app.bloobirds.com/externalAction/requestResetPassword", "_blank");
          },
          variant: "tertiary",
          expand: true,
          children: t("forgotPassword")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 13
        }, void 0), loginSuccess && /* @__PURE__ */ _jsxDEV("p", {
          children: t("success")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 30
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.external_login,
      children: /* @__PURE__ */ _jsxDEV(Button, {
        onClick: () => window.open(getAuthUrl() + "?refUrl=" + window.location.href, "_blank"),
        dataTest: "login-external-submit",
        expand: true,
        iconRight: "externalLink",
        children: t("login")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(LoginForm, "QLX8mTaS471Mcm03/bHN8bdlS6s=", true, function() {
  return [useExtensionContext, useIsNewAuthEnabled, useTranslation];
});
_c = LoginForm;
export default LoginForm;
var _c;
$RefreshReg$(_c, "LoginForm");
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
