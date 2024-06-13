import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inboxView/card/linkedinCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/linkedinCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/card/linkedinCard.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import InfiniteScroll from "/vendor/.vite-deps-react-infinite-scroll-component.js__v--1912dfe6.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Card, CardBody, CardButton, CardContent, CardHeader, CardHoverButtons, CardLeft, CardRight, IconButton, Spinner, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ACTIVITY_DIRECTION, ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, DIRECTION_VALUES_LOGIC_ROLE, REPORTED_VALUES_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, generateDatePrefix, getDateTimestampString, getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole, isHtml, parseEmailPixels } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isSameDay, isValid, parse } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { NameComponent } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import CardIcon from "/src/content/components/cardIcon/cardIcon.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/inboxView/inboxPage.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const addMessageGrouping = (items, t, language) => items.map((item, index) => {
  const date = new Date(getValueFromLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
  const itemDirection = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)?.valueLogicRole;
  const reportedStatus = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole;
  const previous = items[index - 1];
  const previousItemDate = previous && new Date(getValueFromLogicRole(previous, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
  const formatStr = t("dates.standardDate");
  const formattedDay = isValid(date) ? getI18nSpacetimeLng(language, date).format(formatStr) : "";
  const dateDay = isValid(date) ? parse(formattedDay, "MMM do, yyyy", new Date()) : "";
  const hashDate = getDateTimestampString(date);
  const isReported = (value, direction) => value === REPORTED_VALUES_LOGIC_ROLE.YES || direction === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  return {
    ...item,
    messageDate: {
      isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
      day: dateDay,
      formattedDate: formattedDay,
      prefix: generateDatePrefix(date, true, t),
      hashDate
    },
    messageStatus: {
      isReported: isReported(reportedStatus, itemDirection)
    }
  };
});
const PAGE_SIZE = 8;
const ESTIMATED_PAGE_HEIGHT = 386;
export const LinkedinCard = ({
  messages,
  leadId,
  isLastDayItem
}) => {
  _s();
  const {
    t,
    i18n
  } = useTranslation();
  const [hasBeenRead, setHasBeenRead] = useState(false);
  const [readClicked, setReadClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    useGetSettings,
    setContactViewBobjectId,
    setExtendedContext
  } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const assignee = messages?.length > 0 && getFieldByLogicRole(messages?.[0], ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const [messageCollapsed, setMessageCollapsed] = useState(true);
  const lastMessage = messages[messages.length - 1];
  const lastMessageText = lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const lastMessageThread = lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LINKEDIN_THREAD);
  const conversationRef = useRef();
  const parsedMessages = addMessageGrouping(messages, t, i18n.language);
  const isHtmlMessage = lastMessageText && isHtml(lastMessageText);
  const [page, setPage] = useState(1);
  const beginIndex = parsedMessages?.length - page * PAGE_SIZE;
  const activityCompany = getFieldByLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const activityLead = getFieldByLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  const paginatedMessages = parsedMessages.slice(beginIndex >= 0 ? beginIndex : 0, parsedMessages?.length);
  const hasNextPage = parsedMessages?.length > paginatedMessages?.length;
  const notReportedMessages = parsedMessages.filter((message) => !message?.messageStatus?.isReported);
  const hasNotReportedMessages = notReportedMessages?.length > 0;
  const leadField = getFieldByLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  function handleHideAndComplete() {
    setIsLoading(false);
    setTimeout(() => {
      setHasBeenRead(true);
      window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    }, 750);
  }
  const goToLinkedinConversationPage = () => {
    window.open(`https://www.linkedin.com/${lastMessageThread}`, "_blank");
  };
  const markAllAsRead = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsLoading(true);
    const activitiesId = notReportedMessages?.map((activity) => activity?.id.objectId);
    let activitiesData = {};
    activitiesId.forEach((activityId) => {
      activitiesData = {
        ...activitiesData,
        [activityId]: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES
        }
      };
    });
    api.patch(`/bobjects/${accountId}/Activity/bulk`, activitiesData).then(handleHideAndComplete);
  };
  const conversationElement = conversationRef.current?.children[0]?.children[0];
  useEffect(() => {
    if (conversationRef?.current && !messageCollapsed) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversationRef, messageCollapsed]);
  useEffect(() => {
    if (page > 1 && conversationRef?.current && !messageCollapsed) {
      conversationElement.scrollTop += ESTIMATED_PAGE_HEIGHT - 100 / page;
    }
  }, [messageCollapsed, page]);
  const onCardClick = () => {
    setContactViewBobjectId(activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value);
    setExtendedContext({
      type: ExtendedContextTypes.LINKEDIN_THREAD,
      bobject: lastMessage
    });
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.container_linkedin, {
      [styles.hasBeenRead]: hasBeenRead && !isLastDayItem
    }),
    style: {
      height: messageCollapsed ? "100%" : "100%"
    },
    children: /* @__PURE__ */ _jsxDEV(Card, {
      size: "small",
      expand: true,
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        onCardClick();
      },
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        forceButtonVisibility: readClicked,
        children: [/* @__PURE__ */ _jsxDEV(CardLeft, {
          children: /* @__PURE__ */ _jsxDEV(CardIcon, {
            size: "xs",
            name: "linkedin",
            color: "darkBloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 206,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 205,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardBody, {
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            weight: "bold",
            className: styles._card_body__text,
            children: t("extension.card.conversationWith")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 209,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(NameComponent, {
            value: leadField.referencedBobject,
            bobject: lastMessage,
            showIcon: false
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 212,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 208,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardRight, {
          children: /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
            value: assignee
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 219,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 218,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardHoverButtons, {
          size: "small",
          children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("extension.card.openLinkedin"),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(CardButton, {
              iconLeft: "linkedin",
              variant: "secondary",
              onClick: goToLinkedinConversationPage
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 223,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 222,
            columnNumber: 13
          }, void 0), hasNotReportedMessages ? /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("extension.card.markAsRead"),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(CardButton, {
              size: "small",
              disabled: !hasNotReportedMessages,
              iconLeft: isLoading ? void 0 : "checkDouble",
              color: readClicked ? "verySoftMelon" : "bloobirds",
              className: clsx(styles._mark_as_read, {
                [styles._mark_as_read_clicked]: readClicked
              }),
              onClick: (e) => {
                setReadClicked(true);
                markAllAsRead(e);
              },
              children: isLoading && /* @__PURE__ */ _jsxDEV("div", {
                children: /* @__PURE__ */ _jsxDEV(Spinner, {
                  name: "loadingCircle",
                  size: 10,
                  color: "melon"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 246,
                  columnNumber: 23
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 245,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 231,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 230,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
            className: styles._button_reported_container,
            children: /* @__PURE__ */ _jsxDEV(CardButton, {
              size: "small",
              variant: "clear",
              iconLeft: "checkDouble",
              color: "melon"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 253,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 252,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 221,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 204,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles._card_content_linkedin,
          children: !messageCollapsed ? /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles._button,
              children: /* @__PURE__ */ _jsxDEV(IconButton, {
                name: "chevronDown",
                color: "softPeanut",
                size: 12,
                onClick: (event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setMessageCollapsed(true);
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 263,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 262,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles._messages_wrapper,
              ref: conversationRef,
              id: "conversationContent",
              children: /* @__PURE__ */ _jsxDEV(InfiniteScroll, {
                dataLength: paginatedMessages.length,
                hasMore: hasNextPage,
                next: () => setPage(page + 1),
                height: 217,
                scrollThreshold: 0.75,
                inverse: true,
                scrollableTarget: "conversationContent",
                loader: /* @__PURE__ */ _jsxDEV("div", {
                  className: styles._spinner_wrapper,
                  children: /* @__PURE__ */ _jsxDEV(Spinner, {
                    name: "dots"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 290,
                    columnNumber: 25
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 289,
                  columnNumber: 23
                }, void 0),
                style: {
                  display: "flex",
                  flexDirection: "column-reverse"
                },
                children: /* @__PURE__ */ _jsxDEV("div", {
                  className: styles._conversation_wrapper,
                  children: paginatedMessages.map((message) => {
                    const messageText = getTextFromLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
                    const messageDirection = getTextFromLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
                    return /* @__PURE__ */ _jsxDEV(_Fragment, {
                      children: [message.messageDate?.isFirstOfDay && /* @__PURE__ */ _jsxDEV("div", {
                        className: styles._date_separator,
                        children: /* @__PURE__ */ _jsxDEV(Text, {
                          color: "softPeanut",
                          size: "xs",
                          align: "center",
                          children: message?.messageDate?.formattedDate
                        }, void 0, false, {
                          fileName: _jsxFileName,
                          lineNumber: 309,
                          columnNumber: 33
                        }, void 0)
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 308,
                        columnNumber: 31
                      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                        className: clsx(styles._message, {
                          [styles._message_incoming]: messageDirection === ACTIVITY_DIRECTION.INCOMING,
                          [styles._message_outgoing]: messageDirection === ACTIVITY_DIRECTION.OUTGOING
                        }),
                        children: /* @__PURE__ */ _jsxDEV(Text, {
                          size: "xs",
                          children: messageText === "undefined" ? t("extension.card.messageNotParse") : messageText
                        }, void 0, false, {
                          fileName: _jsxFileName,
                          lineNumber: 322,
                          columnNumber: 31
                        }, void 0)
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 314,
                        columnNumber: 29
                      }, void 0)]
                    }, void 0, true);
                  })
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 295,
                  columnNumber: 21
                }, void 0)
              }, paginatedMessages[0]?.id?.value, false, {
                fileName: _jsxFileName,
                lineNumber: 279,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 274,
              columnNumber: 17
            }, void 0)]
          }, void 0, true) : /* @__PURE__ */ _jsxDEV("div", {
            className: styles._collapsed_message,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              children: /* @__PURE__ */ _jsxDEV(IconButton, {
                name: "chevronRight",
                color: "softPeanut",
                size: 12,
                onClick: (event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setMessageCollapsed(false);
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 338,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 337,
              columnNumber: 17
            }, void 0), isHtmlMessage ? /* @__PURE__ */ _jsxDEV("div", {
              className: styles._html_message_linkedin,
              dangerouslySetInnerHTML: {
                __html: parseEmailPixels(lastMessageText)
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 350,
              columnNumber: 19
            }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              className: styles._linkedin_message,
              children: lastMessageText === "undefined" ? t("extension.card.messageNotParse") : lastMessageText
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 355,
              columnNumber: 19
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 336,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 259,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 258,
        columnNumber: 9
      }, void 0)]
    }, leadId, true, {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 188,
    columnNumber: 5
  }, void 0);
};
_s(LinkedinCard, "Tntmeqa+dnrReRzAkCBuCCbBmgU=", true, function() {
  return [useTranslation, useExtensionContext];
});
_c = LinkedinCard;
var _c;
$RefreshReg$(_c, "LinkedinCard");
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
