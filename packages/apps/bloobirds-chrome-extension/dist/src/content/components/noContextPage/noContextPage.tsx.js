var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noContextPage/noContextPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { BobjectItemCompressed, SearchBobjects } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { useDialerLauncher } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { CreateTasksTooltip, EmailActionTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { Action, Input, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useAircallPhoneLinkEnabled, useBaseSetEmailVariablesValues, useMinimizableModals, useWhatsappEnabled, useWhatsappOpenNewPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { isUnassignedTask, openPhoneOrDialer, isElementLoaded, openWhatsAppWeb } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import { BubbleWindow, BubbleWindowContent } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { ContactsTooltip } from "/src/content/components/contactView/components/discoveryTooltips/contactsTooltip/contactsTooltip.tsx.js";
import { HomePageTooltip } from "/src/content/components/contactView/components/discoveryTooltips/homePageTooltip/homePageTooltip.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import TaskHomePageCard from "/src/content/components/taskHomePageCard/taskHomePageCard.tsx.js";
import { GeneralSearchBarBanner } from "/src/content/components/noContextPage/components/generalSearchBarBanner.tsx.js";
import styles from "/src/content/components/noContextPage/noContextPage.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s(() => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    useGetSettings: useGetSettings2,
    setContactViewBobjectId,
    useGetCurrentTask: useGetCurrentTask2,
    useGetLoggedIn: useGetLoggedIn2,
    useGetOpenStartTasksNavigation: useGetOpenStartTasksNavigation2,
    useGetSidePeekEnabled: useGetSidePeekEnabled2
  } = useExtensionContext();
  const isLoggedIn = useGetLoggedIn2();
  const sidePeekEnabled = useGetSidePeekEnabled2();
  const settings = useGetSettings2();
  const accountId = settings?.account?.id;
  const username = settings?.user?.name;
  const hasWhatsApp = useWhatsappEnabled(accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const {
    openDialer
  } = useDialerLauncher();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const {
    getLastVisitedBobjects,
    setIsHome
  } = useFloatingMenuContext();
  const lastVisitedBobjects = getLastVisitedBobjects();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const currentTask = useGetCurrentTask2();
  const isUnassignedCurrentTask = isUnassignedTask(currentTask);
  const {
    open: openStartTaskNavigation
  } = useGetOpenStartTasksNavigation2();
  const [contactsTooltipParams, setContactsTooltipParams] = useState({
    top: 0,
    left: 0,
    display: false
  });
  const [displayHomePageTooltip, setDisplayHomePageTooltip] = useState(false);
  const ref = useRef();
  const [visibleBobjects, setVisibleBobjects] = useState(0);
  const containerRef = useRef(null);
  const handleMailAction = () => {
    mixpanel.track(`SEND_EMAIL_FROM_NO_CONTEXT_BUBBLE`);
    setEmailVariablesValue({
      company: null,
      lead: null,
      opportunity: null
    });
    openMinimizableModal({
      type: "email",
      title: "New Email",
      data: {}
    });
  };
  const handleCallAction = () => {
    mixpanel.track(`CALL_FROM_NO_CONTEXT_BUBBLE`);
    openPhoneOrDialer("", settings, openDialer);
  };
  const handleLinkedinAction = () => {
    mixpanel.track(`SEND_LINKEDIN_FROM_NO_CONTEXT_BUBBLE`);
    window.open("https://www.linkedin.com", "_blank");
  };
  const handleWhatsAppAction = () => {
    mixpanel.track(`SEND_WHATSAPP_FROM_NO_CONTEXT_BUBBLE`);
    openWhatsAppWeb(forceWsOpenNewPage);
  };
  const handleTaskAction = () => {
    mixpanel.track(`CREATE_TASK_FROM_NO_CONTEXT_BUBBLE`);
    openMinimizableModal({
      type: "task",
      data: {
        location: "bubble"
      }
    });
  };
  const handleCalendarAction = () => {
    mixpanel.track(`CREATE_MEETING_FROM_NO_CONTEXT_BUBBLE`);
    openMinimizableModal({
      type: "calendarMeeting",
      data: {},
      onSave: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      }
    });
  };
  const handleNoteAction = () => {
    mixpanel.track(`CREATE_NOTE_FROM_NO_CONTEXT_BUBBLE`);
    openMinimizableModal({
      type: "note",
      data: {
        location: "bubble"
      }
    });
  };
  const handleChange = (bobject) => {
    if (bobject?.id?.value) {
      setContactViewBobjectId(bobject?.id?.value);
    } else {
      setContactViewBobjectId(bobject?.rawBobject?.id);
    }
    setIsHome(false);
  };
  const contentClasses = clsx(styles.content, {
    [styles.contentSidePeek]: sidePeekEnabled
  });
  const currentTaskClasses = clsx(styles.currentTask, {
    [styles.currentTaskSidePeek]: sidePeekEnabled
  });
  const lastVisitedItemClasses = clsx(styles.lastVisitedItem, {
    [styles.lastVisitedItemSidePeek]: sidePeekEnabled
  });
  useEffect(() => {
    const container = containerRef.current;
    const adjustVisibleElements = () => {
      const containerHeight = container?.clientHeight;
      let totalHeight = 0;
      let visibleElements = 0;
      while (totalHeight < containerHeight) {
        visibleElements++;
        const itemHeight = 52;
        totalHeight += itemHeight;
      }
      setVisibleBobjects(visibleElements);
    };
    adjustVisibleElements();
    window.addEventListener("resize", adjustVisibleElements);
    return () => {
      window.removeEventListener("resize", adjustVisibleElements);
    };
  }, [currentTask]);
  useEffect(() => {
    if (isLoggedIn) {
      isElementLoaded('[data-target-selection-name="sfdc:TabDefinition.standard-Contact"]').then(() => {
        const contactsButton = document.querySelector('[data-target-selection-name="sfdc:TabDefinition.standard-Contact"]');
        const contactsButtonPosition = contactsButton?.getBoundingClientRect();
        if (contactsButtonPosition) {
          setContactsTooltipParams({
            top: contactsButtonPosition.top,
            left: contactsButtonPosition.left,
            display: true
          });
        }
      });
      if (ref?.current) {
        const width = ref?.current?.clientWidth;
        if (width > 0) {
          setTimeout(() => {
            setDisplayHomePageTooltip(true);
          }, 500);
        }
      }
    }
  }, [isLoggedIn]);
  const getLastVisitedVisibleObject = () => {
    const items = [];
    let i = 0;
    Object.keys(lastVisitedBobjects).map((key) => {
      if (i < visibleBobjects - 1) {
        const bobject = lastVisitedBobjects[key];
        items.push(/* @__PURE__ */ _jsxDEV("div", {
          className: lastVisitedItemClasses,
          children: /* @__PURE__ */ _jsxDEV(BobjectItemCompressed, {
            bobject: {
              ...bobject,
              bobjectType: bobject.id.typeName,
              ...bobject.id.typeName === "Company" && {
                companyName: bobject.name
              }
            },
            handleCompanyClicked: () => null,
            handleClick: handleChange,
            isBubbleHomePage: true
          }, bobject?.rawBobject?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 220,
            columnNumber: 13
          }, void 0)
        }, key, false, {
          fileName: _jsxFileName,
          lineNumber: 219,
          columnNumber: 11
        }, void 0));
        i++;
      }
    });
    return items;
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    height: 594,
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: contentClasses,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles.title, {
          [styles.invisibleTitle]: openStartTaskNavigation
        }),
        ref,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "l",
          weight: "medium",
          className: styles.title_text,
          children: [t("common.welcome"), ", ", username, "!"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 247,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 243,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.searchBar,
        children: [/* @__PURE__ */ _jsxDEV(SearchBobjects, {
          accountId,
          onChange: handleChange,
          isBubbleHomePage: !sidePeekEnabled,
          customStyles: {
            width: sidePeekEnabled ? "calc(33% - 108px)" : "260px"
          },
          anchorElement: (setSearchValue, searchValue) => /* @__PURE__ */ _jsxDEV(Input, {
            width: "100%",
            placeholder: t("common.search") + " ...",
            onChange: setSearchValue,
            value: searchValue,
            className: styles.input,
            icon: "search"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 258,
            columnNumber: 15
          }, void 0),
          numberOfResults: 20
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 252,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(GeneralSearchBarBanner, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 269,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 251,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.containerButtons,
        children: [/* @__PURE__ */ _jsxDEV(HomePageTooltip, {
          display: displayHomePageTooltip
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 272,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: sidePeekEnabled ? styles.buttons : styles.buttonsBubble,
          style: {
            gap: "8px",
            maxWidth: sidePeekEnabled ? "100%" : "80%"
          },
          children: [hasAircallPhoneLinkEnabled ? /* @__PURE__ */ _jsxDEV("a", {
            href: `callto:`,
            children: /* @__PURE__ */ _jsxDEV(Action, {
              color: "extraCall",
              icon: "phone"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 279,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 278,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ _jsxDEV(Action, {
            color: "extraCall",
            icon: "phone",
            onClick: handleCallAction,
            size: "xl"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 282,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            style: {
              position: "relative"
            },
            children: [/* @__PURE__ */ _jsxDEV(Action, {
              color: "tangerine",
              icon: "mail",
              onClick: handleMailAction,
              size: "xl"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 285,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(EmailActionTooltip, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 286,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 284,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Action, {
            color: "darkBloobirds",
            icon: "linkedin",
            onClick: handleLinkedinAction,
            size: "xl"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 288,
            columnNumber: 13
          }, void 0), hasWhatsApp && /* @__PURE__ */ _jsxDEV(Action, {
            color: "whatsapp",
            icon: "whatsapp",
            onClick: handleWhatsAppAction,
            size: "xl"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 295,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            style: {
              position: "relative"
            },
            children: [/* @__PURE__ */ _jsxDEV(Action, {
              color: "softBloobirds",
              icon: "taskAction",
              onClick: handleTaskAction,
              size: "xl"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 298,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(CreateTasksTooltip, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 304,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 297,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Action, {
            color: "banana",
            icon: "noteAction",
            onClick: handleNoteAction,
            size: "xl"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 306,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Action, {
            color: "tomato",
            icon: "calendar",
            onClick: handleCalendarAction,
            size: "xl"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 307,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 273,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 9
      }, void 0), Object.keys(lastVisitedBobjects).length > 0 && !isUnassignedCurrentTask ? /* @__PURE__ */ _jsxDEV("div", {
        ref: containerRef,
        className: styles.lastVisited,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "softPeanut",
          children: t("common.last_visited")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 313,
          columnNumber: 13
        }, void 0), getLastVisitedVisibleObject()]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 312,
        columnNumber: 11
      }, void 0) : currentTask && isUnassignedCurrentTask ? /* @__PURE__ */ _jsxDEV("div", {
        className: currentTaskClasses,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "softPeanut",
          children: t("sidePeek.noContextPage.currentTask")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 320,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(TaskHomePageCard, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 323,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 319,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
        className: styles.extraMile,
        style: {
          padding: `0 ${sidePeekEnabled ? 8 : 16}px`
        },
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: sidePeekEnabled ? "xl" : "m",
          weight: "bold",
          align: "center",
          children: t("sidePeek.noContextPage.extraMile")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 332,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: sidePeekEnabled ? "m" : "xs",
          color: "softPeanut",
          align: "center",
          children: t("sidePeek.noContextPage.stayOnTop")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 335,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 326,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactsTooltip, {
      ...contactsTooltipParams
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 341,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 241,
    columnNumber: 5
  }, void 0);
}, "4VV31kAuX3ZcQKbY/hGPhqfarCg=", false, function() {
  return [useTranslation, useExtensionContext, useGetLoggedIn, useGetSidePeekEnabled, useGetSettings, useWhatsappEnabled, useWhatsappOpenNewPage, useAircallPhoneLinkEnabled, useDialerLauncher, useMinimizableModals, useFloatingMenuContext, useBaseSetEmailVariablesValues, useGetCurrentTask, useGetOpenStartTasksNavigation];
});
