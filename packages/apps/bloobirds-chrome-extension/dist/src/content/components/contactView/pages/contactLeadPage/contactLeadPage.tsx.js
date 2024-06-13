import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactLeadPage/contactLeadPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactLeadPage/contactLeadPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactLeadPage/contactLeadPage.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { LogCallModal, useDialerLauncher } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { CreateTasksTooltip, CustomTasksTooltip, EmailActionTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { Button, Dropdown, Item, Section, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useBaseSetEmailVariablesValues, useFullSalesEnabled, useIsB2CAccount, useMinimizableModals, useNewCadenceTableEnabled, useSyncBobjectStatus, useUserSearch, useWhatsappEnabled, useWhatsappOpenNewPage, useIsPersonAccountAsAccount, useB2CShowAccountPhonesSetting, useAircallPhoneLinkEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, ContactViewSubTab, LEAD_FIELDS_LOGIC_ROLE, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, EMAIL_MODE, openPhoneOrDialer, openWhatsAppWeb } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useBuyerPersonas } from "/src/hooks/useBuyerPersonas.ts.js";
import { clickMessageButton } from "/src/injectors/linkedin/linkedinMessagesFromBBInjector.tsx.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { LEAD_STAGE_LOGIC_ROLE } from "/src/utils/lead.ts.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
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
import { OpportunityList } from "/src/content/components/contactView/pages/contactOpportunityList/contactOpportunityList.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function findRelatedOpps(lead, opportunities) {
  if (!opportunities)
    return;
  const filteredOpps = opportunities.filter((opportunity) => opportunity.leads.includes(lead?.id.value));
  return filteredOpps?.length > 0 ? filteredOpps : null;
}
const contentToRender = (activeSubTab, lead, opportunities, ref) => {
  _s();
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
          bobjectId: lead.id,
          touchesCount: lead.touchesCount,
          lastAttempt: lead.lastAttempt,
          lastTouch: lead.lastTouch,
          attemptsCount: lead.attemptsCount
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 103,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewDetails, {
          bobject: lead
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(OpportunityList, {
          opportunities,
          withTitle: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 9
      }, void 0);
    case ContactViewSubTab.ACTIVITIES:
      return /* @__PURE__ */ _jsxDEV(ActivityFeedWrapper, {
        parentRef: ref,
        bobject: lead
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.TASKS:
      return /* @__PURE__ */ _jsxDEV(ClusteredTasksList, {
        mainBobject: lead,
        parentRef: ref
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.RELATIONS:
      return /* @__PURE__ */ _jsxDEV(RelationsFeed, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.PLAYBOOK:
      return /* @__PURE__ */ _jsxDEV(ContactViewPlaybook, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 14
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: "Under construction"
      }, void 0, false);
  }
};
_s(contentToRender, "4i97H0v//x7XKvyGnqjsbPnAgHo=", true, function() {
  return [useExtensionContext];
});
export const ContactLeadPage = ({
  lead,
  leads
}) => {
  _s2();
  const {
    openExtendedScreen,
    closeExtendedScreen,
    useGetExtendedContext,
    useGetSettings,
    setActiveBobject,
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetCurrentPage,
    useGetDataModel
  } = useExtensionContext();
  const settings = useGetSettings();
  const extendedContext = useGetExtendedContext();
  const ref = useRef(null);
  const {
    leadIcp,
    stage
  } = lead;
  const {
    activeSubTab,
    setActiveSubTab
  } = useContactViewContext();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const contextBobjects = useGetActiveBobjectContext();
  const currentPage = useGetCurrentPage();
  const [minimized, setMinimized] = useState(false);
  const hasSalesEnabled = useFullSalesEnabled(lead?.id.accountId);
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(lead?.id?.accountId);
  const dataModel = useGetDataModel();
  const hasWhatsappEnabled = useWhatsappEnabled(lead?.id?.accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(lead?.id?.accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const isSalesStage = dataModel?.findValueById(stage)?.logicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  const opportunityFieldId = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES)?.id;
  const [openLogCall, setOpenLogCall] = useState();
  const opportunitiesIds = lead?.rawBobject[opportunityFieldId]?.split("");
  const hasOpportunities = opportunitiesIds?.length > 0;
  const buyerPersonas = useBuyerPersonas();
  const icp = buyerPersonas?.find((bp) => bp?.id === leadIcp);
  const assigneeId = lead?.assignedTo;
  const users = useUserSearch();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const B2CShowAccountPhonesActive = useB2CShowAccountPhonesSetting();
  const activeBobject = useGetActiveBobject();
  const {
    syncStatus
  } = useSyncBobjectStatus(lead?.id?.accountId, [lead]);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions"
  });
  const assigneeUser = users?.users?.find((user) => user?.id === assigneeId);
  const mainNote = lead?.mainNote;
  const {
    visible,
    setVisible,
    ref: dropdownRef
  } = useVisible();
  const {
    visible: arePhoneNumbersVisible,
    setVisible: togglePhoneNumbersDropdown,
    ref: phoneNumbersRef
  } = useVisible();
  const {
    visible: whatsAppPhonesVisible,
    setVisible: setWhatsAppPhonesVisible,
    ref: whatsAppPhonesRef
  } = useVisible();
  const quickLogVisibilityProps = useVisible();
  const {
    actionsDisabled
  } = useContactViewContext();
  const {
    openDialer
  } = useDialerLauncher();
  const {
    data: mainNoteData,
    mutate
  } = useSWR(mainNote && `/contactViewMainNote/${mainNote}`, () => api.get(`/bobjects/${mainNote}/form`));
  const noLeadNumbers = !lead?.phoneNumbers || lead?.phoneNumbers?.length === 0;
  const noCompany = !contextBobjects?.company;
  const noCompanyNumbers = !contextBobjects?.company?.phoneNumbers || contextBobjects?.company?.phoneNumbers?.length === 0;
  const noPhoneNumbers = isB2CAccount ? noLeadNumbers : noCompany && noLeadNumbers || noLeadNumbers && noCompanyNumbers;
  const showAccountPhones = contextBobjects?.company && (!isPersonAccountAsAccount && !isB2CAccount || B2CShowAccountPhonesActive);
  useSubscribeListeners(lead?.id?.typeName, mutate);
  const {
    openNoteModal,
    openMainNoteModal
  } = useOpenNote(lead, mainNoteData, setVisible);
  function openEmailModal() {
    setEmailVariablesValue({
      company: contextBobjects?.company?.rawBobject,
      lead: lead?.rawBobject,
      opportunity: null
    });
    openMinimizableModal({
      type: "email",
      title: t("newEmail"),
      data: {
        template: {
          content: "",
          subject: ""
        },
        mode: EMAIL_MODE.SEND,
        activity: null,
        company: contextBobjects?.company,
        leads,
        lead
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
  function openMeetingModal() {
    openMinimizableModal({
      type: "calendarMeeting",
      data: {
        company: !isB2CAccount ? contextBobjects?.company : null,
        lead
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
        bobject: lead
      });
    }
  }
  function openTaskModal() {
    setVisible(false);
    openMinimizableModal({
      type: "task",
      data: {
        lead,
        location: "bubble",
        companyContext: contextBobjects?.company
      }
    });
  }
  function openLinkedInView() {
    const linkedInLeadLink = lead.linkedInUrl;
    const linkedinLeadName = linkedInLeadLink?.split("/")[4]?.split("?")[0];
    const salesNavLink = lead.salesNavigatorUrl;
    const isInLeadProfile = currentPage.includes(linkedinLeadName);
    if (linkedInLeadLink) {
      if (isInLeadProfile) {
        clickMessageButton();
      } else {
        window.open(linkedInLeadLink + "?bb-messaging-tab-open", "_blank");
      }
    } else if (salesNavLink) {
      window.open(salesNavLink + "?bb-messaging-tab-open", "_blank");
    } else {
      window.open("https://www.linkedin.com/messaging/thread/new/?bbFullName=" + lead.fullName, "_blank");
    }
  }
  useEffect(() => {
    if (!contextBobjects?.company && activeBobject?.id?.value !== lead?.id?.value) {
      setActiveBobject(lead);
    }
  }, [contextBobjects]);
  const defaultNumber = lead?.phoneNumbers?.length > 0 ? lead?.phoneNumbers?.[0] : contextBobjects?.company?.phoneNumbers?.length > 0 ? contextBobjects?.company?.phoneNumbers?.[0] : "";
  const handleClickTab = (tab) => {
    setActiveSubTab(tab);
    closeExtendedScreen();
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(ContactViewHeader, {
      badgeColor: icp?.color,
      badgeContent: icp?.shortName,
      tooltip: icp && `${t("buyerPersona")}: ${icp?.name}`,
      title: lead?.fullName,
      subtitle: lead?.jobTitle || lead?.email,
      assigneeUser,
      labels: /* @__PURE__ */ _jsxDEV(StageAndStatusLabel, {
        bobject: lead,
        meta: {
          ...contextBobjects,
          opportunities: findRelatedOpps(lead, contextBobjects?.opportunities)
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 331,
        columnNumber: 11
      }, void 0),
      syncStatus,
      bobjectId: lead?.id,
      buttons: /* @__PURE__ */ _jsxDEV(ContactButtons, {
        bobject: lead,
        mainNoteBobject: mainNoteData,
        isDisabled: actionsDisabled,
        hasOpportunities
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 342,
        columnNumber: 11
      }, void 0),
      minimizedView: minimized,
      bobject: lead
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 323,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewActions, {
      children: [/* @__PURE__ */ _jsxDEV(Dropdown, {
        ref: phoneNumbersRef,
        visible: arePhoneNumbersVisible,
        position: "top",
        anchor: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
          color: "extraCall",
          icon: "phone",
          onClick: () => {
            togglePhoneNumbersDropdown(true);
          },
          isDisabled: actionsDisabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 358,
          columnNumber: 13
        }, void 0),
        children: [/* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: lead,
          callback: (phone) => {
            togglePhoneNumbersDropdown(false);
            openPhoneOrDialer(phone, settings, openDialer, lead?.id?.value);
          },
          closeDropdown: () => togglePhoneNumbersDropdown(false)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 368,
          columnNumber: 11
        }, void 0), showAccountPhones && /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: contextBobjects?.company,
          callback: (phone) => {
            togglePhoneNumbersDropdown(false);
            openPhoneOrDialer(phone, settings, openDialer, contextBobjects?.company?.id?.value);
          },
          closeDropdown: () => togglePhoneNumbersDropdown(false)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 377,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Section, {
          id: "logCallManually",
          icon: "zap",
          children: t("quickLog")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 386,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
          onClick: () => {
            togglePhoneNumbersDropdown(false);
            setOpenLogCall(true);
          },
          children: t("logCallManually")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 389,
          columnNumber: 11
        }, void 0), noPhoneNumbers && /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV(Section, {
            id: "callManually",
            icon: "zap",
            children: t("callManually")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 399,
            columnNumber: 15
          }, void 0), hasAircallPhoneLinkEnabled ? /* @__PURE__ */ _jsxDEV("a", {
            href: `callto:`,
            className: styles.openAircallDialer,
            children: /* @__PURE__ */ _jsxDEV(Item, {
              children: t("openDialer")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 404,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 403,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(Item, {
            onClick: () => {
              openPhoneOrDialer("", settings, openDialer);
            },
            children: t("openDialer")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 407,
            columnNumber: 17
          }, void 0)]
        }, void 0, true)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 353,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          position: "relative"
        },
        children: [/* @__PURE__ */ _jsxDEV(ContactViewAction, {
          color: "tangerine",
          icon: "mail",
          onClick: openEmailModal,
          isDisabled: actionsDisabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 419,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(EmailActionTooltip, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 425,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 418,
        columnNumber: 9
      }, void 0), !isB2CAccount && /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "darkBloobirds",
        icon: "linkedin",
        onClick: openLinkedInView,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 428,
        columnNumber: 11
      }, void 0), hasWhatsappEnabled && /* @__PURE__ */ _jsxDEV(Dropdown, {
        ref: whatsAppPhonesRef,
        visible: whatsAppPhonesVisible,
        position: "top",
        anchor: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
          color: "whatsapp",
          icon: "whatsapp",
          onClick: () => lead?.phoneNumbers?.length > 0 ? setWhatsAppPhonesVisible(true) : openWhatsAppWeb(forceWsOpenNewPage),
          isDisabled: actionsDisabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 441,
          columnNumber: 15
        }, void 0),
        children: [/* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: lead,
          callback: (phone) => {
            setWhatsAppPhonesVisible(false);
            openWhatsAppWeb(forceWsOpenNewPage, phone);
          },
          isWhatsApp: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 453,
          columnNumber: 13
        }, void 0), showAccountPhones && /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: contextBobjects?.company,
          callback: (phone) => {
            setWhatsAppPhonesVisible(false);
            openWhatsAppWeb(forceWsOpenNewPage, phone);
          },
          isWhatsApp: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 462,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 436,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          position: "relative"
        },
        children: [/* @__PURE__ */ _jsxDEV(CreateTaskMenu, {
          environment: contextBobjects,
          children: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
            color: "softBloobirds",
            icon: "taskAction"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 475,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 474,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CreateTasksTooltip, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 477,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 473,
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
            lineNumber: 489,
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
              lineNumber: 491,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
              size: "small",
              iconLeft: "starChecked",
              onClick: openMainNoteModal,
              uppercase: false,
              children: t("mainNote")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 494,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 490,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 488,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 480,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "banana",
        icon: "noteAction",
        onClick: openNoteModal,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 506,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "tomato",
        icon: "calendar",
        onClick: openMeetingModal,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 513,
        columnNumber: 9
      }, void 0), hasCustomTaskEnabled && /* @__PURE__ */ _jsxDEV(CustomTasksTooltip, {
        defaultTooltipVisible: true,
        children: /* @__PURE__ */ _jsxDEV(QuickLogCustomTask, {
          isDisabled: actionsDisabled,
          bobject: lead,
          leads,
          visibilityProps: quickLogVisibilityProps
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 522,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 521,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "bloobirds",
        icon: "agendaPerson",
        onClick: openBobjectDetail,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 530,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 352,
      columnNumber: 7
    }, void 0), hasSalesEnabled && /* @__PURE__ */ _jsxDEV(StageDivider, {
      color: isSalesStage ? "peanut" : "softGrape"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 537,
      columnNumber: 27
    }, void 0), activeSubTab === ContactViewSubTab.OVERVIEW && /* @__PURE__ */ _jsxDEV(WizardHelper, {
      bobject: lead,
      relatedCompany: contextBobjects?.company,
      minimized
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 539,
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
      children: contentToRender(activeSubTab, lead, contextBobjects?.opportunities, ref)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 545,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooter, {
      children: [/* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.OVERVIEW,
        icon: "assignBoard",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 559,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.ACTIVITIES,
        icon: "activity",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 565,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.TASKS,
        icon: "checkDouble",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 571,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.RELATIONS,
        icon: "share",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 577,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.PLAYBOOK,
        icon: "magic",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 583,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 558,
      columnNumber: 7
    }, void 0), openLogCall && /* @__PURE__ */ _jsxDEV(LogCallModal, {
      leadId: lead?.id?.value,
      companyId: contextBobjects?.company?.id?.value,
      dialedNumber: defaultNumber,
      onClose: () => setOpenLogCall(false),
      dataModel,
      leadsPhoneNumbers: lead?.phoneNumbers
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 591,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 322,
    columnNumber: 5
  }, void 0);
};
_s2(ContactLeadPage, "lBqP78CA0pWAuMWQwr+jqgNLX7w=", true, function() {
  return [useExtensionContext, useContactViewContext, useMinimizableModals, useBaseSetEmailVariablesValues, useFullSalesEnabled, useNewCadenceTableEnabled, useWhatsappEnabled, useWhatsappOpenNewPage, useAircallPhoneLinkEnabled, useBuyerPersonas, useUserSearch, useIsB2CAccount, useIsPersonAccountAsAccount, useB2CShowAccountPhonesSetting, useSyncBobjectStatus, useTranslation, useVisible, useVisible, useVisible, useVisible, useContactViewContext, useDialerLauncher, useSWR, useSubscribeListeners, useOpenNote];
});
_c = ContactLeadPage;
var _c;
$RefreshReg$(_c, "ContactLeadPage");
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
