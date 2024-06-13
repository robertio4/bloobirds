import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/leftBarFooter/leftBarFooter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/leftBarFooter/leftBarFooter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/leftBarFooter/leftBarFooter.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$(), _s6 = $RefreshSig$(), _s7 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, CircularBadge, Dropdown, Icon, IconButton, Item, Radio, RadioGroup, Switch, Text, Tooltip, useHover, useToasts, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId, useActiveUserSettings, useCopilot } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { MIXPANEL_EVENTS, UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, baseUrls } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport9_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport9_mixpanelBrowser.__esModule ? __vite__cjsImport9_mixpanelBrowser.default : __vite__cjsImport9_mixpanelBrowser;
import { accountDropdownItems, helpButton, redirectButtonsDropdown, userDropdownItems } from "/src/content/components/extensionLeftBar/extensionLeftBar.constants.ts.js";
import styles from "/src/content/components/leftBarFooter/leftBarFooter.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const AiSwitch = () => {
  _s();
  const {
    isEnabled,
    setEnabled,
    language,
    setLanguage
  } = useCopilot();
  const {
    visible,
    setVisible,
    ref
  } = useVisible(false);
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._switch_wrapper,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._switch_text,
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "stars",
        color: isEnabled ? "lightPurple" : "softPeanut",
        size: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "purple",
        children: t("common.copilot")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Switch, {
      size: "small",
      gradient: true,
      checked: isEnabled,
      onChange: setEnabled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref,
      anchor: /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "settings",
        color: "purple",
        onClick: () => setVisible(!visible)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 17
      }, void 0),
      visible,
      onClose: () => setVisible(false),
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._language_dropdown,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          align: "center",
          children: t("languages.pickALanguage")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(RadioGroup, {
          value: language,
          onChange: (value) => setLanguage(value),
          defaultValue: language,
          children: [/* @__PURE__ */ _jsxDEV(Radio, {
            size: "small",
            value: "english",
            expand: true,
            children: /* @__PURE__ */ _jsxDEV("span", {
              className: styles._language_option,
              children: t("languages.en")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 92,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Radio, {
            size: "small",
            value: "spanish",
            expand: true,
            children: /* @__PURE__ */ _jsxDEV("span", {
              className: styles._language_option,
              children: t("languages.es")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Radio, {
            size: "small",
            value: "italian",
            expand: true,
            children: /* @__PURE__ */ _jsxDEV("span", {
              className: styles._language_option,
              children: t("languages.it")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 98,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 97,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 68,
    columnNumber: 5
  }, void 0);
};
_s(AiSwitch, "oWpEhXmV0RgwRz5TO6uHFFsMS2Y=", false, function() {
  return [useCopilot, useVisible, useTranslation];
});
_c = AiSwitch;
export const LeftBarButton = ({
  iconName,
  children,
  url,
  externalUrl
}) => {
  _s2();
  const [ref, isHover] = useHover();
  const {
    i18n
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    ref,
    className: styles.footer_button_wrapper,
    children: /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: children,
      position: "right",
      children: /* @__PURE__ */ _jsxDEV(Button, {
        className: styles.footer_button,
        color: isHover ? "veryLightBloobirds" : "bloobirds",
        size: "small",
        onClick: () => handleOnClick({
          url,
          externalUrl,
          language: i18n.language
        }),
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: iconName,
          color: isHover ? "darkBloobirds" : "veryLightBloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 121,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 112,
    columnNumber: 5
  }, void 0);
};
_s2(LeftBarButton, "5ThZFuRZm6s6eWvJNx+M93i7BD4=", false, function() {
  return [useHover, useTranslation];
});
_c2 = LeftBarButton;
const LeftBarDropdownItem = ({
  label,
  url,
  iconName,
  isSmall,
  onClick
}) => {
  _s3();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.item_wrapper, {
      [styles.small_dropdown_item]: isSmall,
      [styles.medium_dropdown_item]: !isSmall
    }),
    children: /* @__PURE__ */ _jsxDEV(Item, {
      onClick: () => {
        if (onClick) {
          onClick();
        }
        if (url) {
          window.open(baseUrls[process.env.ENV] + url, "_blank");
        }
      },
      icon: iconName,
      iconColor: "verySoftPeanut",
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: isSmall ? "xxs" : "xs",
        color: "peanut",
        children: t(label)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 138,
    columnNumber: 5
  }, void 0);
};
_s3(LeftBarDropdownItem, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c3 = LeftBarDropdownItem;
const handleOnClick = ({
  url,
  externalUrl,
  language
}) => {
  if (externalUrl) {
    window.open(externalUrl[language], "_blank");
  }
  if (url) {
    window.open(baseUrls[process.env.ENV] + url, "_blank");
  }
};
const LeftBarDropdownHeader = ({
  name,
  shortname,
  color,
  isSmall,
  hideButtons,
  isAdmin
}) => {
  _s4();
  const {
    settings
  } = useActiveUserSettings();
  const {
    t,
    i18n
  } = useTranslation();
  const userEmail = settings?.user?.email;
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.dropdown_header, {
        [styles.small_dropdown_header]: isSmall,
        [styles.medium_dropdown_header]: !isSmall
      }),
      style: !isAdmin ? {
        minWidth: "216px"
      } : {
        justifyContent: "space-between"
      },
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.username_container,
        children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
          size: isSmall ? "s" : "m",
          color: "lightPeanut",
          style: {
            color: color ? "var(--white)" : "var(--peanut)",
            fontSize: "9px"
          },
          backgroundColor: color || "lightPeanut",
          children: shortname || "U"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 205,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: name?.length > 20 && name,
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: isSmall ? "xs" : "s",
            weight: isSmall ? "medium" : "bold",
            ellipsis: 20,
            color: "bloobirds",
            children: name || ""
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 214,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 213,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 204,
        columnNumber: 9
      }, void 0), hideButtons ? /* @__PURE__ */ _jsxDEV("div", {
        style: {
          display: "flex",
          gap: "8px",
          flex: 1,
          justifyContent: "flex-end"
        },
        children: redirectButtonsDropdown(userEmail).map(({
          iconName,
          label,
          url,
          externalUrl
        }, idx) => /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t(label),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: iconName,
            onClick: () => handleOnClick({
              url,
              externalUrl,
              language: i18n.language
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 229,
            columnNumber: 19
          }, void 0)
        }, label + "-" + idx, false, {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 17
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 225,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          size: "small",
          variant: "secondary",
          iconLeft: "questionCircle",
          uppercase: true,
          onClick: () => handleOnClick({
            ...helpButton(userEmail),
            language: i18n.language
          }),
          children: t("leftBar.footer.help")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 239,
          columnNumber: 13
        }, void 0)
      }, void 0, false)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.dropdown_divider, {
        [styles.small_dropdown_divider]: isSmall
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s4(LeftBarDropdownHeader, "4VPCYMJodq22z8+NqOKZtpASOy4=", false, function() {
  return [useActiveUserSettings, useTranslation];
});
_c4 = LeftBarDropdownHeader;
const DropdownBlock = ({
  title,
  items,
  isSmall,
  setVisible,
  withBorder = false,
  customItem
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.dropdown_block_container, {
      [styles.left_border]: withBorder
    }),
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: isSmall ? "xxs" : "xs",
      weight: isSmall ? "medium" : "bold",
      className: clsx(styles.dropdown_header, {
        [styles.small_dropdown_header]: isSmall,
        [styles.medium_dropdown_header]: !isSmall
      }),
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 7
    }, void 0), items.map((props, idx) => /* @__PURE__ */ _jsxDEV(LeftBarDropdownItem, {
      isSmall,
      ...props,
      onClick: () => setVisible(false)
    }, `${props?.label}-${idx}`, false, {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 9
    }, void 0)), customItem]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 279,
    columnNumber: 5
  }, void 0);
};
_c5 = DropdownBlock;
export const fetchLanguages = async () => {
  const result = await fetch(`https://delivery.localazy.com/_a7714004326121177803f2a33b98/_e0.json`);
  const data = await result.json();
  const languages = [];
  for (const key in Object.values(data)) {
    const item = Object.values(data)[key];
    const locales = item["locales"];
    locales.forEach((locale) => {
      let langCode = locale.language;
      if (locale.region) {
        langCode = langCode + "-" + locale.region;
      }
      if (!languages.includes(langCode)) {
        languages.push(langCode);
      }
    });
  }
  return languages;
};
const LanguagesDropdown = ({
  isSmall
}) => {
  _s5();
  const {
    t,
    i18n
  } = useTranslation();
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false);
  const [languages, setLanguages] = useState([]);
  const {
    createToast
  } = useToasts();
  const userId = useActiveUserId();
  useEffect(() => {
    fetchLanguages().then((languages2) => {
      setLanguages(languages2);
    });
  }, []);
  const updateLanguage = (language) => {
    api.patch(`/utils/service/users/${userId}/language/${language}`, {}).then(() => {
      createToast({
        message: t("leftBar.successChangeLng", {
          language: t(`languages.${language}`)
        }),
        type: "success"
      });
    }).catch((e) => {
      createToast({
        message: t("leftBar.errorChangeLng", {
          language: t(`languages.${language}`)
        }),
        type: "error"
      });
    });
  };
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    visible,
    anchor: /* @__PURE__ */ _jsxDEV(LeftBarDropdownItem, {
      isSmall,
      iconName: "timezones",
      onClick: () => {
        setVisible(true);
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CHANGE_LANGUAGE);
      },
      label: `languages.${i18n.language}`
    }, "language", false, {
      fileName: _jsxFileName,
      lineNumber: 365,
      columnNumber: 9
    }, void 0),
    onClose: () => setVisible(false),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._language_select,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xxs",
        color: "peanut",
        children: t("languages.selectALanguage")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 379,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(RadioGroup, {
        value: i18n.language,
        onChange: (value) => {
          i18n.changeLanguage(value);
          updateLanguage(value);
          mixpanel.track(MIXPANEL_EVENTS.CHANGE_LANGUAGE);
        },
        defaultValue: i18n.language,
        children: languages.map((language) => /* @__PURE__ */ _jsxDEV(Radio, {
          size: "small",
          value: language,
          expand: true,
          children: t(`languages.${language}`)
        }, language, false, {
          fileName: _jsxFileName,
          lineNumber: 392,
          columnNumber: 13
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 382,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 378,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 361,
    columnNumber: 5
  }, void 0);
};
_s5(LanguagesDropdown, "u7mOirXLNAY7ABy/MUY5KHmAifg=", false, function() {
  return [useTranslation, useVisible, useToasts, useActiveUserId];
});
_c6 = LanguagesDropdown;
export const useVisibleDropdownLng = (initialState = false, anchorRef = {
  current: void 0
}) => {
  _s6();
  const [visible, setVisible] = useState(initialState);
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && (anchorRef.current && !anchorRef.current.contains(event.target) || !anchorRef.current) && !["menuitem", "menuitemradio", "menuitemcheckbox", "radio"].includes(
        event.target?.role
      ) && typeof event.target.className === "string" && !event.target.className?.includes("leftBarFooter") && !event.target.className?.includes("BaseRadio")) {
        setVisible(false);
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return {
    ref,
    visible,
    setVisible
  };
};
_s6(useVisibleDropdownLng, "lwBz5oHv49wlp24Y1JazqW7qrEM=");
export const LeftBarUserDropdown = ({
  size = "medium",
  hideButtons
}) => {
  _s7();
  const {
    settings
  } = useActiveUserSettings();
  const enabledChangeLanguage = true;
  const anchorRef = useRef(null);
  const {
    t
  } = useTranslation();
  const {
    ref,
    visible,
    setVisible
  } = useVisibleDropdownLng(false, anchorRef);
  const {
    name,
    shortname,
    color
  } = settings?.user || {};
  const isAdminUser = settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) || settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);
  const isSmall = size === "small";
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    arrow: false,
    visible,
    position: "right-end",
    width: "100%",
    customStyles: {
      marginLeft: "14px"
    },
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      style: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center"
      },
      onClick: () => {
        setVisible(!visible);
      },
      ref: anchorRef,
      children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
        size: "m",
        color: "lightPeanut",
        style: {
          color: color ? "var(--white)" : "var(--peanut)",
          fontSize: "9px",
          border: "1px solid white"
        },
        backgroundColor: color || "lightPeanut",
        children: shortname || "U"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 472,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 465,
      columnNumber: 9
    }, void 0),
    children: [/* @__PURE__ */ _jsxDEV(LeftBarDropdownHeader, {
      name,
      shortname,
      color,
      isSmall,
      hideButtons,
      isAdmin: isAdminUser
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 487,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.dropdown_wrapper,
      children: [/* @__PURE__ */ _jsxDEV(DropdownBlock, {
        title: t("leftBar.footer.userSettings"),
        items: userDropdownItems,
        isSmall,
        setVisible,
        customItem: enabledChangeLanguage ? /* @__PURE__ */ _jsxDEV(LanguagesDropdown, {
          isSmall
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 501,
          columnNumber: 47
        }, void 0) : void 0
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 496,
        columnNumber: 9
      }, void 0), isAdminUser && /* @__PURE__ */ _jsxDEV(DropdownBlock, {
        title: t("leftBar.footer.accountSettings"),
        items: accountDropdownItems,
        isSmall,
        setVisible,
        withBorder: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 504,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 495,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 457,
    columnNumber: 5
  }, void 0);
};
_s7(LeftBarUserDropdown, "zkY7hpDxfNqGrZs7uZp5y/PRTGU=", false, function() {
  return [useActiveUserSettings, useTranslation, useVisibleDropdownLng];
});
_c7 = LeftBarUserDropdown;
var _c, _c2, _c3, _c4, _c5, _c6, _c7;
$RefreshReg$(_c, "AiSwitch");
$RefreshReg$(_c2, "LeftBarButton");
$RefreshReg$(_c3, "LeftBarDropdownItem");
$RefreshReg$(_c4, "LeftBarDropdownHeader");
$RefreshReg$(_c5, "DropdownBlock");
$RefreshReg$(_c6, "LanguagesDropdown");
$RefreshReg$(_c7, "LeftBarUserDropdown");
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
