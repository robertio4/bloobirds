import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-searchLeadsGuests-searchLeadsGuests.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/searchLeadsGuests/searchLeadsGuests.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/searchLeadsGuests/searchLeadsGuests.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { Chip, Icon, Item, SearchInput, Spinner, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsOTOAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import classNames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useSearchLeadsGuests } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useSearchLeadsGuests.ts.js";
import { SearchType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-types-calendar.ts.js";
import { NoContacts } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-noContacts-noContacts.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-searchLeadsGuests-searchLeadsGuests.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SearchLeadsGuests = ({
  size = 16,
  handleSelect,
  company,
  inviteesEmails
}) => {
  _s();
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const inputRef = React.useRef(null);
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false);
  const [error, setError] = useState();
  useClickAway(ref, () => setVisible(false));
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.searchLeadsGuests"
  });
  const includeCoworkers = useIsOTOAccount();
  const {
    searchType,
    setSearchType,
    debounceSearchValue,
    allCoworkersAdded,
    availableContacts,
    isValidating,
    searchQuery,
    setSearchQuery,
    isValidEmail
  } = useSearchLeadsGuests({
    company,
    inviteesEmails
  });
  function setDropdownFocused(focus) {
    setVisible((v) => v === focus ? v : focus);
  }
  const handleDropdownChipClick = (type) => {
    setDropdownFocused(true);
    if (type !== searchType) {
      setSearchType(type);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (debounceSearchValue) {
        if (isValidEmail) {
          handleSelect(debounceSearchValue);
          setVisible(false);
          setSearchQuery(null);
        } else {
          setError(t("invalidEmail"));
        }
      }
    }
  };
  useEffect(() => {
    if (error && isValidEmail) {
      setError(null);
    }
  }, [debounceSearchValue]);
  useEffect(() => {
    if (focused) {
      setVisible(true);
    }
  }, [focused]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.inputContainer,
    onClick: () => {
      const input = inputRef.current;
      input?.focus();
      setFocused(true);
    },
    children: [/* @__PURE__ */ _jsxDEV(SearchInput, {
      innerRef: inputRef,
      width: "100%",
      placeholder: t("addAnother"),
      value: searchQuery,
      onChange: setSearchQuery,
      onKeyPress: handleKeyPress,
      error,
      size: "small",
      name: "lead",
      onFocus,
      onBlur,
      onClick: () => setVisible(true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 7
    }, void 0), visible ? /* @__PURE__ */ _jsxDEV("div", {
      ref,
      className: styles.dropdown,
      children: [includeCoworkers && /* @__PURE__ */ _jsxDEV(DropdownHeader, {
        allCoworkersAdded,
        handleDropdownChipClick,
        searchType,
        hasCompany: !!company
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 13
      }, void 0), isValidating ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles.spinnerContainer,
        children: /* @__PURE__ */ _jsxDEV(Spinner, {
          name: "loadingCircle"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 13
      }, void 0) : availableContacts?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles._item_wrapper,
        children: /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: availableContacts?.map((option) => {
            const isCoworker = "type" in option && option.type === "Coworker";
            const name = isCoworker ? option.name : getValueFromLogicRole(option, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
            const email = isCoworker ? option.email : getValueFromLogicRole(option, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
            return /* @__PURE__ */ _jsxDEV(GuestCard, {
              size,
              option,
              name,
              email,
              handleSelect
            }, typeof option?.id === "string" ? option?.id : option.id?.value, false, {
              fileName: _jsxFileName,
              lineNumber: 151,
              columnNumber: 21
            }, void 0);
          })
        }, void 0, false)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV(NoContacts, {
        hasSearchTerm: searchQuery !== "" && !isValidating
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 9
    }, void 0) : null]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 96,
    columnNumber: 5
  }, void 0);
};
_s(SearchLeadsGuests, "uzar+55h1E19Ni0ELkS7V9Cz2Hk=", false, function() {
  return [useVisible, useClickAway, useTranslation, useIsOTOAccount, useSearchLeadsGuests];
});
_c = SearchLeadsGuests;
const DropdownHeader = ({
  searchType,
  handleDropdownChipClick,
  allCoworkersAdded,
  hasCompany = true
}) => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.searchLeadsGuests.dropdownHeader"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.chipGroupDiv,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: classNames({
        [styles.chipSelected]: searchType === SearchType.leads
      }),
      children: /* @__PURE__ */ _jsxDEV(Chip, {
        size: "small",
        variant: "secondary",
        selected: searchType === SearchType.leads,
        onClick: () => handleDropdownChipClick(SearchType.leads),
        children: [t("search"), " ", hasCompany ? t("inCompany") : t("everywhere")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 194,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: classNames({
        [styles.chipSelected]: searchType === SearchType.coworkers
      }),
      children: /* @__PURE__ */ _jsxDEV(Chip, {
        size: "small",
        variant: allCoworkersAdded ? "primary" : "secondary",
        disabled: allCoworkersAdded,
        selected: searchType === SearchType.coworkers,
        onClick: () => handleDropdownChipClick(SearchType.coworkers),
        children: t("coworkersEmails")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 208,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 203,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 188,
    columnNumber: 5
  }, void 0);
};
_s2(DropdownHeader, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = DropdownHeader;
const GuestCard = ({
  option,
  name,
  email,
  size,
  handleSelect
}) => /* @__PURE__ */ _jsxDEV(Item, {
  onMouseDown: () => {
    handleSelect(option);
  },
  value: typeof option?.id === "string" ? option?.id : option?.id?.value,
  className: styles.item,
  children: /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._lead_icon,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "person",
        size: 14,
        color: "white"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 246,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._lead__info,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        color: "peanut",
        size: size === "medium" ? "m" : "s",
        weight: "medium",
        ellipsis: 30,
        children: name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 249,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        color: "softPeanut",
        size: size === "medium" ? "s" : "xs",
        inline: true,
        className: styles._lead__company,
        children: email && /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            size: 16,
            name: "mail",
            color: "softPeanut",
            className: styles._company__icon
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 260,
            columnNumber: 15
          }, void 0), email]
        }, void 0, true)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 252,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 7
    }, void 0)]
  }, void 0, true)
}, typeof option?.id === "string" ? option?.id : option?.id?.value, false, {
  fileName: _jsxFileName,
  lineNumber: 235,
  columnNumber: 3
}, void 0);
_c3 = GuestCard;
var _c, _c2, _c3;
$RefreshReg$(_c, "SearchLeadsGuests");
$RefreshReg$(_c2, "DropdownHeader");
$RefreshReg$(_c3, "GuestCard");
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
