import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-notificationsDisplay-notificationsDisplay.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/misc/src/notificationsDisplay/notificationsDisplay.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/misc/src/notificationsDisplay/notificationsDisplay.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$(), _s6 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Avatar, CompoundIcon, Dropdown, Icon, IconButton, Spinner, Tab, TabGroup, Text, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useNotifications, useNotificationsData } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { NotificationsCategory, NotificationsTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { isDynamicsPage, isSalesforcePage, normalizeUrl } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import classNames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { format } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-notificationsDisplay-notificationsDisplay.module.css.js";
import { ICONS, NEW_TABS, TABS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-notificationsDisplay-notificationsDisplayConstants.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const notificationsWithStatus = [NotificationsTypes.MEETING_ACCEPTED, NotificationsTypes.MEETING_DELETED, NotificationsTypes.MEETING_CANCELLED, NotificationsTypes.MEETING_RESCHEDULED];
export const getCompoundIcon = (type, parentRef) => {
  let compoundProps;
  switch (type) {
    case NotificationsTypes.MEETING_ACCEPTED:
      compoundProps = {
        bagdeColor: "lightestCall",
        icon: "check",
        iconColor: "extraCall"
      };
      break;
    case NotificationsTypes.MEETING_DELETED:
      compoundProps = {
        bagdeColor: "lightestMeeting",
        icon: "trashFull",
        iconColor: "extraMeeting"
      };
      break;
    case NotificationsTypes.MEETING_CANCELLED:
      compoundProps = {
        bagdeColor: "lightestMeeting",
        icon: "cross",
        iconColor: "extraMeeting"
      };
      break;
    case NotificationsTypes.MEETING_RESCHEDULED:
      compoundProps = {
        bagdeColor: "verySoftPeanut",
        icon: "repeat",
        iconColor: "peanut"
      };
      break;
  }
  return /* @__PURE__ */ _jsxDEV(CompoundIcon, {
    parent: /* @__PURE__ */ _jsxDEV(Icon, {
      name: "calendar",
      color: "tomato"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 27
    }, void 0),
    parentRef,
    children: /* @__PURE__ */ _jsxDEV(Avatar, {
      size: "supertiny",
      color: compoundProps.bagdeColor,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: compoundProps.icon,
        color: compoundProps.iconColor,
        size: 10
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 72,
    columnNumber: 5
  }, void 0);
};
const NotificationCard = (props) => {
  _s();
  const {
    date,
    id,
    subtitle,
    title,
    type,
    read,
    onDelete,
    fromHome,
    onCardClick
  } = props;
  const classes = classNames(styles._card, {
    [styles._unread]: !read
  });
  const handleRemove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete(id);
  };
  const parentRef = useRef();
  return /* @__PURE__ */ _jsxDEV("li", {
    className: classes,
    onClick: onCardClick,
    children: [notificationsWithStatus.includes(type) ? getCompoundIcon(type, parentRef) : /* @__PURE__ */ _jsxDEV(Icon, {
      ...ICONS[type]
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._card__body,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        dataTest: `Text-Notification-${title}`,
        color: "darkGray",
        size: "xs",
        className: classNames(styles.title, {
          [styles.titleAlone]: !subtitle && fromHome
        }),
        children: title || ""
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        dataTest: `Notification-Company-${subtitle}`,
        color: "softPeanut",
        size: "xs",
        className: styles.subtitle,
        children: subtitle || ""
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._card__info,
      children: [/* @__PURE__ */ _jsxDEV(IconButton, {
        name: "trashFull",
        size: 16,
        color: "bloobirds",
        onClick: handleRemove
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
        position: "bottom",
        title: date && format(date, "PPP ppp"),
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          className: styles._card_date,
          children: useGetI18nSpacetime().since(useGetI18nSpacetime(date)).rounded
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 136,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 107,
    columnNumber: 5
  }, void 0);
};
_s(NotificationCard, "DhkXrM5HBFcUclnK5VFRHBNVFRU=", false, function() {
  return [useGetI18nSpacetime, useGetI18nSpacetime];
});
_c = NotificationCard;
const LoadingNotifications = () => /* @__PURE__ */ _jsxDEV("div", {
  className: styles._loading_container,
  children: /* @__PURE__ */ _jsxDEV(Spinner, {
    name: "loadingCircle"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 147,
    columnNumber: 5
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 146,
  columnNumber: 3
}, void 0);
_c2 = LoadingNotifications;
const EmptyNotifications = () => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "misc.notifications"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._empty_container,
    children: t("noUpdates")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 154,
    columnNumber: 5
  }, void 0);
};
_s2(EmptyNotifications, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c3 = EmptyNotifications;
const LoadMore = ({
  onClick
}) => {
  _s3();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "misc.notifications"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._show_more,
    onClick,
    children: /* @__PURE__ */ _jsxDEV(Text, {
      size: "xxs",
      color: "bloobirds",
      children: t("loadMore")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 165,
    columnNumber: 5
  }, void 0);
};
_s3(LoadMore, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c4 = LoadMore;
const NotificationDisplay = (notificationsInfo) => {
  _s4();
  const {
    onCardClick,
    notifications,
    isLoading,
    isLastPage,
    loadMore,
    removeNotification,
    markAsReadById
  } = notificationsInfo;
  if (isLoading) {
    return /* @__PURE__ */ _jsxDEV(LoadingNotifications, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 12
    }, void 0);
  }
  const {
    t
  } = useTranslation();
  if (notifications?.length === 0 || Array.isArray(notifications) && !notifications[0]) {
    return /* @__PURE__ */ _jsxDEV(EmptyNotifications, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [notifications && notifications.map(({
      id,
      timestamp,
      read,
      title,
      titleKey,
      subtitle,
      subtitleKey,
      variable,
      ...info
    }) => /* @__PURE__ */ _jsxDEV(NotificationCard, {
      id,
      read,
      date: new Date(timestamp),
      onDelete: removeNotification,
      onCardClick: async () => {
        if (!read) {
          await markAsReadById(id);
        }
        onCardClick(info);
      },
      title: titleKey ? variable ? t(titleKey, variable) : t(titleKey) : title,
      subtitle: subtitleKey ? t(subtitleKey) : subtitle,
      ...info
    }, id, false, {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 13
    }, void 0)), !isLastPage && /* @__PURE__ */ _jsxDEV(LoadMore, {
      onClick: loadMore
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 23
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 193,
    columnNumber: 5
  }, void 0);
};
_s4(NotificationDisplay, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c5 = NotificationDisplay;
const NotificationsBody = (props) => {
  _s5();
  const {
    unreadByCategory,
    markAsReadByCategory,
    category,
    setCategory
  } = props;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "misc.notifications"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._wrap,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._header_wrapper,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        color: "darkGray",
        children: t("notifications")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 226,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._link,
        "data-test": `Link-HeaderNotificationDropdownMarkRead`,
        onClick: markAsReadByCategory,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "bloobirds",
          children: t("markAllAsRead")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 232,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 227,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("main", {
      className: classNames(styles._tabs_container),
      children: /* @__PURE__ */ _jsxDEV(TabGroup, {
        value: NEW_TABS(t)[category],
        onClick: (tabValue) => {
          setCategory(NEW_TABS(t)[tabValue]);
        },
        children: TABS.map(({
          key,
          category: category2
        }) => /* @__PURE__ */ _jsxDEV(Tab, {
          name: t(`tabs.${key}`),
          size: "xs",
          extraSize: "xxs",
          extra: unreadByCategory?.data?.[category2] || void 0,
          children: /* @__PURE__ */ _jsxDEV(NotificationDisplay, {
            ...props
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 252,
            columnNumber: 15
          }, void 0)
        }, category2, false, {
          fileName: _jsxFileName,
          lineNumber: 245,
          columnNumber: 13
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 238,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.poweredByContainer,
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.poweredByBox,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "bloobirds",
          color: "bloobirds",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 259,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "misc.notifications.poweredByBloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 261,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 260,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 258,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 224,
    columnNumber: 5
  }, void 0);
};
_s5(NotificationsBody, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c6 = NotificationsBody;
export const NotificationsDisplay = ({
  onCardClick
}) => {
  _s6();
  const url = normalizeUrl(window.location.href);
  const isSalesforce = isSalesforcePage(url);
  const isDynamics = isDynamicsPage(url);
  const unreadInfo = useNotificationsData();
  const notificationData = useNotifications();
  const props = {
    ...unreadInfo,
    ...notificationData,
    onCardClick: (value) => {
      onCardClick(value);
      setVisible(false);
      notificationData.setCategory(NotificationsCategory.UPDATES);
    }
  };
  const {
    totalUnread
  } = unreadInfo;
  const anchorRef = useRef();
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false, anchorRef);
  const classes = classNames(styles.bell, {
    [styles.pending]: totalUnread !== 0
  });
  const classesRoot = !isDynamics ? !isSalesforce ? styles.linkedinNotificationBell : styles.salesforceNotificationBell : null;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classesRoot,
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref,
      visible,
      anchor: /* @__PURE__ */ _jsxDEV("div", {
        "data-test": "Button-HeaderNotificationBell",
        role: "button",
        tabIndex: 0,
        className: classes,
        onClick: () => {
          notificationData.setCategory(NotificationsCategory.UPDATES);
          setVisible(!visible);
        },
        ref: anchorRef,
        children: [/* @__PURE__ */ _jsxDEV(IconButton, {
          name: "bellFilled",
          color: "bloobirds",
          size: 24
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 320,
          columnNumber: 13
        }, void 0), totalUnread > 0 && /* @__PURE__ */ _jsxDEV("div", {
          "data-test": "Number-HeaderNotificationCounterValue",
          className: styles.count,
          children: totalUnread
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 322,
          columnNumber: 15
        }, void 0)]
      }, totalUnread, true, {
        fileName: _jsxFileName,
        lineNumber: 308,
        columnNumber: 11
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV(NotificationsBody, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 329,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 304,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 303,
    columnNumber: 5
  }, void 0);
};
_s6(NotificationsDisplay, "20x5feG1m6mYYeuo0lp3Q6ZbArQ=", false, function() {
  return [useNotificationsData, useNotifications, useVisible];
});
_c7 = NotificationsDisplay;
var _c, _c2, _c3, _c4, _c5, _c6, _c7;
$RefreshReg$(_c, "NotificationCard");
$RefreshReg$(_c2, "LoadingNotifications");
$RefreshReg$(_c3, "EmptyNotifications");
$RefreshReg$(_c4, "LoadMore");
$RefreshReg$(_c5, "NotificationDisplay");
$RefreshReg$(_c6, "NotificationsBody");
$RefreshReg$(_c7, "NotificationsDisplay");
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
