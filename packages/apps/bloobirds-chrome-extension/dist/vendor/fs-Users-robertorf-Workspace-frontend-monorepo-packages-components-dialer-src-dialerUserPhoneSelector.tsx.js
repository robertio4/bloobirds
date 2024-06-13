import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialerUserPhoneSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialerUserPhoneSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialerUserPhoneSelector.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Item, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings, useSessionStorage, useUserPhoneNumbers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { SessionStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { parsePhoneNumber } from "/vendor/.vite-deps-libphonenumber-js.js__v--da3005b6.js";
import { DialerStatus, useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.module.css.js";
import { PREFIX_TO_STATE, STATE_TO_PREFIXS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-localPresenceUtils.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function getLocalUsNumber(dialedPhone, usPhoneNumbers) {
  const prefix = dialedPhone.substring(2, 5);
  const stateOfPrefix = PREFIX_TO_STATE[prefix];
  const prefixesOfTheState = STATE_TO_PREFIXS[stateOfPrefix];
  const phoneNumbers = usPhoneNumbers.filter((phoneNumber) => !!prefixesOfTheState.find((prefix2) => prefix2 === phoneNumber.substring(2, 5)));
  if (phoneNumbers.length > 0) {
    return phoneNumbers[0];
  }
  return usPhoneNumbers[0];
}
export function DialerUserPhoneSelector() {
  _s();
  const {
    setState
  } = useDialerStore();
  const status = useDialer((state) => state.status);
  const selectedPhoneNumber = useDialer((state) => state.selectedPhoneNumber);
  const dialedPhoneNumber = useDialer((state) => state.dialedPhoneNumber);
  const {
    settings
  } = useActiveUserSettings();
  const autoChangePhoneExtension = settings?.user?.autoChangePhoneExtension;
  const {
    ref,
    visible,
    setVisible
  } = useVisible();
  const {
    t
  } = useTranslation();
  const {
    userPhones
  } = useUserPhoneNumbers((filteredPhones) => {
    if (selectedPhoneNumber === null && filteredPhones.length > 0) {
      const defaultOrFirst = filteredPhones.find((phoneNumber) => phoneNumber?.phoneByDefault) || filteredPhones[0];
      setState("selectedPhoneNumber", defaultOrFirst.phoneNumber);
    }
  });
  const {
    set
  } = useSessionStorage();
  useEffect(() => {
    if (autoChangePhoneExtension && dialedPhoneNumber && userPhones && userPhones.length > 1) {
      try {
        const phoneParsed = parsePhoneNumber(dialedPhoneNumber);
        if (phoneParsed && (!selectedPhoneNumber || parsePhoneNumber(selectedPhoneNumber)?.country !== phoneParsed?.country || phoneParsed.country === "US")) {
          const userPhonesSameCountry = userPhones.filter((userPhone) => {
            try {
              return parsePhoneNumber(userPhone.phoneNumber)?.country === phoneParsed?.country;
            } catch (e) {
              return false;
            }
          });
          if (userPhonesSameCountry.length > 0) {
            if (phoneParsed.country === "US") {
              const phone = getLocalUsNumber(dialedPhoneNumber, userPhonesSameCountry.map((phone2) => phone2.phoneNumber));
              setState("selectedPhoneNumber", phone);
            } else {
              setState("selectedPhoneNumber", userPhonesSameCountry[0]?.phoneNumber);
            }
          }
        }
      } catch (error) {
        console.error("Phone not parsed", error);
      }
    }
  }, [dialedPhoneNumber, userPhones, autoChangePhoneExtension]);
  const userPhoneSelectorClasses = clsx(styles.userPhoneSelector, {
    [styles.userPhoneSelector_disabled]: status < DialerStatus.idle
  });
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      className: userPhoneSelectorClasses,
      onClick: () => {
        if (status === DialerStatus.idle) {
          setVisible(true);
        }
      },
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.userPhoneSelectorLabels,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          weight: "bold",
          children: t("dialer.yourPhoneNumber")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: selectedPhoneNumber
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 11
      }, this), status === DialerStatus.idle && /* @__PURE__ */ _jsxDEV(Icon, {
        name: "chevronDown",
        size: 16,
        color: "bloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 44
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 9
    }, this),
    visible,
    ref,
    children: userPhones?.map((phoneNumber) => /* @__PURE__ */ _jsxDEV(Item, {
      onClick: () => {
        setState("selectedPhoneNumber", phoneNumber.phoneNumber);
        set(SessionStorageKeys.LastPhoneUsed, phoneNumber.phoneNumber);
        setVisible(false);
      },
      children: phoneNumber?.phoneNumber
    }, phoneNumber.id, false, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 9
    }, this))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 90,
    columnNumber: 5
  }, this);
}
_s(DialerUserPhoneSelector, "zbvWn2GD7o/CWZDaWwYAtq5Nq+g=", false, function() {
  return [useDialerStore, useDialer, useDialer, useDialer, useActiveUserSettings, useVisible, useTranslation, useUserPhoneNumbers, useSessionStorage];
});
_c = DialerUserPhoneSelector;
var _c;
$RefreshReg$(_c, "DialerUserPhoneSelector");
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
