import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactCompanyPage/contactCompanyPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactCompanyPage/contactCompanyPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactCompanyPage/contactCompanyPage.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { LogCallModal, useDialerLauncher } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { CreateTasksTooltip, CustomTasksTooltip, EmailActionTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { Button, Dropdown, Item, Section, Skeleton, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useBaseSetEmailVariablesValues, useFullSalesEnabled, useMinimizableModals, useNewCadenceTableEnabled, useWhatsappEnabled, useWhatsappOpenNewPage, useUserSearch, useSyncBobjectStatus, useAircallPhoneLinkEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, ContactViewSubTab, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, EMAIL_MODE, openPhoneOrDialer, openWhatsAppWeb } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useTargetMarkets } from "/src/hooks/useTargetMarkets.ts.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { COMPANY_STAGE_LOGIC_ROLE } from "/src/utils/company.ts.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { SalesforceNoCompanyPage } from "/src/content/components/salesforceNoCompanyPage/salesforceNoCompanyPage.tsx.js";
import { StageAndStatusLabel } from "/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx.js";
import { ActivityFeedWrapper } from "/src/content/components/contactView/components/activityFeed/activityFeedWrapper.tsx.js";
import { ClusteredTasksList } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/tasksTabsList.tsx.js";
import { ContactViewAction, ContactViewActions, ContactViewDropdownAction } from "/src/content/components/contactView/components/contactViewActions/contactViewActions.tsx.js";
import { ContactViewContent } from "/src/content/components/contactView/components/contactViewContent/contactViewContent.tsx.js";
import { ContactViewDetails } from "/src/content/components/contactView/components/contactViewDetails/contactViewDetails.tsx.js";
import { ContactViewFooter, ContactViewFooterTab } from "/src/content/components/contactView/components/contactViewFooter/contactViewFooter.tsx.js";
import ContactViewHeader from "/src/content/components/contactView/components/contactViewHeader/contactViewHeader.tsx.js";
import { ContactViewPlaybook } from "/src/content/components/contactView/components/contactViewPlaybook/contactViewPlaybook.tsx.js";
import { CreateTaskMenu } from "/src/content/components/contactView/components/createTaskMenu/createTaskMenu.tsx.js";
import { LastActivityOverview } from "/src/content/components/contactView/components/lastActivityOverview/lastActivityOverview.tsx.js";
import { LeadBriefCard } from "/src/content/components/contactView/components/leadBriefCard/leadBriefCard.tsx.js";
import QuickLogCustomTask from "/src/content/components/contactView/components/quickLogCustomTask/quickLogCustomTask.tsx.js";
import { RelationsFeed } from "/src/content/components/contactView/components/relationsFeed/relationsFeed.tsx.js";
import { StageDivider } from "/src/content/components/contactView/components/stageDivider/stageDivider.tsx.js";
import { WizardHelper } from "/src/content/components/contactView/components/wizardHelper/wizardHelper.tsx.js";
import styles from "/src/content/components/contactView/contactView.module.css.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { useOpenNote } from "/src/content/components/contactView/hooks/useOpenNote.ts.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { PhoneDropdownContent } from "/src/content/components/contactView/pages/components/phoneDropdownContent.tsx.js";
import { ContactButtons } from "/src/content/components/contactView/pages/contactButtons/contactButtons.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const RenderLeads = ({
  leads,
  loading,
  sidePeekEnabled
}) => {
  _s();
  const leadsTitleClasses = clsx(styles.leadsTitle, {
    [styles.leadsTitleSidePeek]: sidePeekEnabled
  });
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      className: leadsTitleClasses,
      size: "xs",
      color: "softPeanut",
      weight: "bold",
      children: t("sidePeek.overview.leads")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }, void 0), leads?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.leadsList,
      children: leads?.map((lead) => {
        return /* @__PURE__ */ _jsxDEV(LeadBriefCard, {
          lead
        }, lead?.id?.value, false, {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 20
        }, void 0);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: loading ? /* @__PURE__ */ _jsxDEV(Skeleton, {
        height: 96,
        width: "100%",
        variant: "rect"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        align: "center",
        color: "softPeanut",
        children: t("sidePeek.overview.noBobjectInThisBobject", {
          bobject1: t("bobjectTypes.lead"),
          bobject2: t("bobjectTypes.company")
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 13
      }, void 0)
    }, void 0, false)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 102,
    columnNumber: 5
  }, void 0);
};
_s(RenderLeads, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = RenderLeads;
const contentToRender = (activeSubTab, bobject, leads, ref, loading) => {
  _s2();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const overviewContainerClasses = clsx(styles.overviewContainer, {
    [styles.overviewContainerSidePeek]: sidePeekEnabled
  });
  switch (activeSubTab) {
    case ContactViewSubTab.OVERVIEW:
      return /* @__PURE__ */ _jsxDEV("div", {
        className: overviewContainerClasses,
        children: [/* @__PURE__ */ _jsxDEV(LastActivityOverview, {
          bobjectId: bobject.id,
          touchesCount: bobject.touchesCount,
          lastAttempt: bobject.lastAttempt,
          lastTouch: bobject.lastTouch,
          attemptsCount: bobject.attemptsCount,
          leadsIds: leads?.map((l) => l?.id?.value)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 148,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewDetails, {
          bobject
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 156,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(RenderLeads, {
          leads,
          loading,
          sidePeekEnabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 157,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 9
      }, void 0);
    case ContactViewSubTab.ACTIVITIES:
      return /* @__PURE__ */ _jsxDEV(ActivityFeedWrapper, {
        parentRef: ref,
        bobject
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.TASKS:
      return /* @__PURE__ */ _jsxDEV(ClusteredTasksList, {
        mainBobject: bobject,
        parentRef: ref
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 163,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.RELATIONS:
      return /* @__PURE__ */ _jsxDEV(RelationsFeed, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.PLAYBOOK:
      return /* @__PURE__ */ _jsxDEV(ContactViewPlaybook, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 167,
        columnNumber: 14
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: "Under construction"
      }, void 0, false);
  }
};
_s2(contentToRender, "4i97H0v//x7XKvyGnqjsbPnAgHo=", true, function() {
  return [useExtensionContext];
});
export const ContactCompanyPage = ({
  company,
  leads,
  opportunities,
  loading = false
}) => {
  _s3();
  const {
    openExtendedScreen,
    closeExtendedScreen,
    useGetExtendedContext,
    useGetSettings,
    useGetDataModel,
    useGetActiveBobjectContext
  } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const activeContext = useGetActiveBobjectContext();
  const settings = useGetSettings();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions"
  });
  const ref = useRef(null);
  const {
    activeSubTab,
    setActiveSubTab,
    actionsDisabled
  } = useContactViewContext();
  const targetMarkets = useTargetMarkets();
  const {
    visible,
    setVisible,
    ref: dropdownRef
  } = useVisible();
  const quickLogVisibilityProps = useVisible();
  const [minimized, setMinimized] = useState(false);
  const [openLogCall, setOpenLogCall] = useState();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const {
    visible: whatsAppPhonesVisible,
    setVisible: setWhatsAppPhonesVisible,
    ref: whatsAppPhonesRef
  } = useVisible();
  const {
    visible: arePhoneNumbersVisible,
    setVisible: togglePhoneNumbersDropdown,
    ref: phoneNumbersRef
  } = useVisible();
  const {
    openDialer
  } = useDialerLauncher();
  const {
    targetMarket,
    name,
    stage
  } = company;
  const tm = targetMarkets?.find((bp) => bp?.id === targetMarket);
  const hasSalesEnabled = useFullSalesEnabled(company?.id.accountId);
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(company?.id?.accountId);
  const dataModel = useGetDataModel();
  const hasWhatsappEnabled = useWhatsappEnabled(company?.id?.accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(company?.id?.accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const assigneeId = company?.assignedTo;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find((user) => user?.id === assigneeId);
  const mainNote = company?.mainNote;
  const {
    syncStatus
  } = useSyncBobjectStatus(company?.id?.accountId, [company]);
  const {
    data: mainNoteData,
    mutate
  } = useSWR(mainNote && `/contactViewMainNote/${mainNote}`, () => api.get(`/bobjects/${mainNote}/form`));
  const noLeadNumbers = leads?.filter((l) => l?.phoneNumbers?.length > 0).length === 0;
  const noCompanyNumbers = !company?.phoneNumbers || company?.phoneNumbers?.length === 0;
  const noLeads = !leads || leads?.length === 0;
  const noPhoneNumbers = noLeads && noCompanyNumbers || noLeadNumbers && noCompanyNumbers;
  useSubscribeListeners(company?.id?.typeName, mutate);
  const {
    openNoteModal,
    openMainNoteModal
  } = useOpenNote(company, mainNoteData, setVisible);
  const isSalesStage = dataModel?.findValueById(stage)?.logicRole === COMPANY_STAGE_LOGIC_ROLE.SALES;
  const emailField = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.EMAIL)?.id;
  const handleOpenModal = () => {
    setEmailVariablesValue({
      company: company?.rawBobject,
      lead: null,
      opportunity: null
    });
    openMinimizableModal({
      type: "email",
      title: t("newEmail"),
      data: {
        template: {
          content: "",
          subject: "",
          id: null,
          format: null,
          mediaFiles: null
        },
        mode: EMAIL_MODE.SEND,
        isBlankEmail: true,
        company,
        leads,
        opportunities,
        pageBobjectType: BobjectTypes.Company,
        ...company?.rawBobject?.[emailField] ? {
          defaultToEmail: [company?.rawBobject?.[emailField]]
        } : {}
      },
      onSave: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      }
    });
  };
  function openMeetingModal() {
    openMinimizableModal({
      type: "calendarMeeting",
      data: {
        company
      },
      onSave: () => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      }
    });
  }
  function openBobjectDetail() {
    if (extendedContext?.type === ExtendedContextTypes.BOBJECT_DETAILS) {
      closeExtendedScreen();
    } else {
      openExtendedScreen({
        type: ExtendedContextTypes.BOBJECT_DETAILS,
        bobject: company
      });
    }
  }
  function openTaskModal() {
    openMinimizableModal({
      type: "task",
      data: {
        company,
        location: "bubble"
      }
    });
  }
  function openLinkedInView() {
    const linkedInCompanyLink = company.linkedInUrl;
    const salesNavLink = company.salesNavigatorUrl;
    if (linkedInCompanyLink) {
      window.open(linkedInCompanyLink + "?bb-messaging-tab-open", "_blank");
    } else if (salesNavLink) {
      window.open(salesNavLink + "?bb-messaging-tab-open", "_blank");
    } else {
      window.open("https://www.linkedin.com/messaging/thread/new/?bbFullName=" + company.name, "_blank");
    }
  }
  const largeDropdownStyles = {
    maxHeight: "600px",
    overflowY: "scroll",
    overflowX: "hidden",
    marginTop: "4px"
  };
  if (!company) {
    return /* @__PURE__ */ _jsxDEV(SalesforceNoCompanyPage, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 341,
      columnNumber: 12
    }, void 0);
  }
  const handleClickTab = (tab) => {
    setActiveSubTab(tab);
    closeExtendedScreen();
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(ContactViewHeader, {
      badgeColor: tm?.color,
      badgeContent: tm?.shortName,
      tooltip: tm && `${t("targetMarket")}: ${tm?.name}`,
      title: name,
      icon: "company",
      subtitle: tm?.name,
      assigneeUser,
      syncStatus,
      bobjectId: company.id,
      buttons: /* @__PURE__ */ _jsxDEV(ContactButtons, {
        bobject: company,
        mainNoteBobject: mainNoteData,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 362,
        columnNumber: 11
      }, void 0),
      labels: company ? /* @__PURE__ */ _jsxDEV(StageAndStatusLabel, {
        bobject: company,
        meta: activeContext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 368,
        columnNumber: 27
      }, void 0) : null,
      bobject: company,
      minimizedView: minimized
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewActions, {
      children: [/* @__PURE__ */ _jsxDEV(Dropdown, {
        ref: phoneNumbersRef,
        visible: arePhoneNumbersVisible,
        position: "bottom",
        customStyles: leads?.length > 12 ? largeDropdownStyles : null,
        anchor: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
          color: "extraCall",
          icon: "phone",
          onClick: () => {
            togglePhoneNumbersDropdown(true);
          },
          isDisabled: actionsDisabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 379,
          columnNumber: 13
        }, void 0),
        children: [/* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: company,
          callback: (phone) => {
            togglePhoneNumbersDropdown(false);
            openPhoneOrDialer(phone, settings, openDialer, company?.id?.value);
          },
          closeDropdown: () => togglePhoneNumbersDropdown(false)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 389,
          columnNumber: 11
        }, void 0), leads && leads?.length > 0 && leads?.map((lead, idx) => {
          return /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
            notShowIfEmpty: true,
            bobject: lead,
            callback: (phone) => {
              togglePhoneNumbersDropdown(false);
              openPhoneOrDialer(phone, settings, openDialer, lead?.id?.value);
            },
            closeDropdown: () => togglePhoneNumbersDropdown(false)
          }, idx + "_" + lead?.id?.value, false, {
            fileName: _jsxFileName,
            lineNumber: 401,
            columnNumber: 17
          }, void 0);
        }), /* @__PURE__ */ _jsxDEV(Section, {
          id: "logCallManually",
          icon: "zap",
          children: t("quickLog")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 413,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
          onClick: () => {
            togglePhoneNumbersDropdown(false);
            setOpenLogCall(true);
          },
          children: t("logCallManually")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 416,
          columnNumber: 11
        }, void 0), noPhoneNumbers && /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV(Section, {
            id: "callManually",
            icon: "zap",
            children: t("callManually")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 426,
            columnNumber: 15
          }, void 0), hasAircallPhoneLinkEnabled ? /* @__PURE__ */ _jsxDEV("a", {
            href: `callto:`,
            className: styles.openAircallDialer,
            children: /* @__PURE__ */ _jsxDEV(Item, {
              children: t("openDialer")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 431,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 430,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(Item, {
            onClick: () => {
              openPhoneOrDialer("", settings, openDialer);
            },
            children: t("openDialer")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 434,
            columnNumber: 17
          }, void 0)]
        }, void 0, true)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 373,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          position: "relative"
        },
        children: [/* @__PURE__ */ _jsxDEV(ContactViewAction, {
          color: "tangerine",
          icon: "mail",
          onClick: handleOpenModal,
          isDisabled: actionsDisabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 446,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(EmailActionTooltip, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 452,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 445,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "darkBloobirds",
        icon: "linkedin",
        onClick: openLinkedInView,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 454,
        columnNumber: 9
      }, void 0), hasWhatsappEnabled && /* @__PURE__ */ _jsxDEV(Dropdown, {
        ref: whatsAppPhonesRef,
        visible: whatsAppPhonesVisible,
        position: "bottom",
        customStyles: leads?.length > 12 ? largeDropdownStyles : null,
        anchor: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
          color: "whatsapp",
          icon: "whatsapp",
          onClick: () => company?.phoneNumbers?.length > 0 ? setWhatsAppPhonesVisible(true) : openWhatsAppWeb(forceWsOpenNewPage),
          isDisabled: actionsDisabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 467,
          columnNumber: 15
        }, void 0),
        children: [/* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: company,
          callback: (phone) => {
            setWhatsAppPhonesVisible(false);
            openWhatsAppWeb(forceWsOpenNewPage, phone);
          },
          isWhatsApp: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 479,
          columnNumber: 13
        }, void 0), leads && leads?.length > 0 && leads?.map((lead, idx) => {
          return /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
            notShowIfEmpty: true,
            bobject: lead,
            callback: (phone) => {
              setWhatsAppPhonesVisible(false);
              openWhatsAppWeb(forceWsOpenNewPage, phone);
            },
            isWhatsApp: true
          }, idx + "_" + lead?.id?.value, false, {
            fileName: _jsxFileName,
            lineNumber: 491,
            columnNumber: 19
          }, void 0);
        })]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 461,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          position: "relative"
        },
        children: [/* @__PURE__ */ _jsxDEV(CreateTaskMenu, {
          environment: {
            company
          },
          children: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
            color: "bloobirds",
            icon: "taskAction",
            isDisabled: actionsDisabled
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 507,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 506,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CreateTasksTooltip, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 509,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 505,
        columnNumber: 9
      }, void 0), mainNoteData ? /* @__PURE__ */ _jsxDEV(ContactViewDropdownAction, {
        color: "banana",
        icon: "noteAction",
        visible,
        setVisible,
        ref: dropdownRef,
        isDisabled: actionsDisabled,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.noteDropdown,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            children: t("noteMessage")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 521,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.noteOptions,
            children: [/* @__PURE__ */ _jsxDEV(Button, {
              size: "small",
              onClick: openNoteModal,
              variant: "secondary",
              uppercase: false,
              children: t("new")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 523,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
              size: "small",
              iconLeft: "starChecked",
              onClick: openMainNoteModal,
              uppercase: false,
              children: t("mainNote")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 526,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 522,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 520,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 512,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "banana",
        icon: "noteAction",
        onClick: openNoteModal,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 538,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "tomato",
        icon: "calendar",
        onClick: openMeetingModal,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 545,
        columnNumber: 9
      }, void 0), hasCustomTaskEnabled && /* @__PURE__ */ _jsxDEV(CustomTasksTooltip, {
        defaultTooltipVisible: true,
        children: /* @__PURE__ */ _jsxDEV(QuickLogCustomTask, {
          isDisabled: actionsDisabled,
          bobject: company,
          leads,
          visibilityProps: quickLogVisibilityProps
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 553,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 552,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "bloobirds",
        icon: "agendaPerson",
        onClick: openBobjectDetail,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 561,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 372,
      columnNumber: 7
    }, void 0), hasSalesEnabled && /* @__PURE__ */ _jsxDEV(StageDivider, {
      color: isSalesStage ? "peanut" : "softGrape"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 568,
      columnNumber: 27
    }, void 0), activeSubTab === ContactViewSubTab.OVERVIEW && /* @__PURE__ */ _jsxDEV(WizardHelper, {
      bobject: company,
      minimized
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 570,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewContent, {
      ref,
      fullWidth: activeSubTab !== ContactViewSubTab.TASKS,
      onScroll: (top, canMinimize, canMaximize) => {
        if (top === 0 && minimized && canMaximize) {
          setMinimized(false);
        } else if (top >= 30 && !minimized && canMinimize) {
          setMinimized(true);
        }
      },
      children: contentToRender(activeSubTab, company, leads, ref, loading)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 572,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooter, {
      children: [/* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.OVERVIEW,
        icon: "assignBoard",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 586,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.ACTIVITIES,
        icon: "activity",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 592,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.TASKS,
        icon: "checkDouble",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 598,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.RELATIONS,
        icon: "share",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 604,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.PLAYBOOK,
        icon: "magic",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 610,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 585,
      columnNumber: 7
    }, void 0), openLogCall && /* @__PURE__ */ _jsxDEV(LogCallModal, {
      companyId: company?.id?.value,
      dialedNumber: company?.phoneNumbers?.[0],
      onClose: () => setOpenLogCall(false),
      dataModel,
      leadsPhoneNumbers: (company?.phoneNumbers || [])?.concat(leads?.reduce((acc, lead) => {
        if (Array.isArray(lead?.phoneNumbers)) {
          return acc.concat(lead?.phoneNumbers);
        }
        return acc;
      }, []))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 618,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 350,
    columnNumber: 5
  }, void 0);
};
_s3(ContactCompanyPage, "yzYf37T8xTdCDunZLs0YbaCKmxg=", true, function() {
  return [useExtensionContext, useTranslation, useContactViewContext, useTargetMarkets, useVisible, useVisible, useMinimizableModals, useBaseSetEmailVariablesValues, useVisible, useVisible, useDialerLauncher, useFullSalesEnabled, useNewCadenceTableEnabled, useWhatsappEnabled, useWhatsappOpenNewPage, useAircallPhoneLinkEnabled, useUserSearch, useSyncBobjectStatus, useSWR, useSubscribeListeners, useOpenNote];
});
_c2 = ContactCompanyPage;
var _c, _c2;
$RefreshReg$(_c, "RenderLeads");
$RefreshReg$(_c2, "ContactCompanyPage");
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
