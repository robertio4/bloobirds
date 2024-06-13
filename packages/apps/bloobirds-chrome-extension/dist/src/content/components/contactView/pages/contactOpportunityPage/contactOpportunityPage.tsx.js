import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactOpportunityPage/contactOpportunityPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactOpportunityPage/contactOpportunityPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactOpportunityPage/contactOpportunityPage.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { LogCallModal, useDialerLauncher } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { CreateTasksTooltip, CustomTasksTooltip, EmailActionTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { Button, Dropdown, Item, Section, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useBaseSetEmailVariablesValues, useIsB2CAccount, useIsNoStatusPlanAccount, useMinimizableModals, useNewCadenceTableEnabled, useNoStatusOppSetting, useSyncBobjectStatus, useUserSearch, useWhatsappEnabled, useWhatsappOpenNewPage, useIsPersonAccountAsAccount, useB2CShowAccountPhonesSetting, useAircallPhoneLinkEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, ContactViewSubTab, MessagesEvents, OPPORTUNITY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, EMAIL_MODE, getExtensionBobjectByIdFields, getLeadById, openPhoneOrDialer, openWhatsAppWeb } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { SalesforceStageLabel } from "/src/content/components/salesforceStageLabel/salesforceStageLabel.tsx.js";
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
import { LeadsList } from "/src/content/components/contactView/pages/contactLeadsList/contactsLeadsList.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const contentToRender = (activeSubTab, opportunity, leads, companyId, ref) => {
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
          bobjectId: opportunity.id,
          touchesCount: opportunity.touchesCount,
          lastAttempt: opportunity.lastAttempt,
          lastTouch: opportunity.lastTouch,
          attemptsCount: opportunity.attemptsCount,
          leadsIds: opportunity.leads,
          companyId
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewDetails, {
          bobject: opportunity
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 107,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(LeadsList, {
          leads,
          withTitle: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 9
      }, void 0);
    case ContactViewSubTab.ACTIVITIES:
      return /* @__PURE__ */ _jsxDEV(ActivityFeedWrapper, {
        parentRef: ref,
        bobject: opportunity
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.TASKS:
      return /* @__PURE__ */ _jsxDEV(ClusteredTasksList, {
        mainBobject: opportunity,
        parentRef: ref
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.RELATIONS:
      return /* @__PURE__ */ _jsxDEV(RelationsFeed, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 14
      }, void 0);
    case ContactViewSubTab.PLAYBOOK:
      return /* @__PURE__ */ _jsxDEV(ContactViewPlaybook, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 118,
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
export const ContactOpportunityPage = ({
  opportunity
}) => {
  _s2();
  const ref = useRef(null);
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const [minimized, setMinimized] = useState(false);
  const [openLogCall, setOpenLogCall] = useState();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions"
  });
  const {
    activeSubTab,
    setActiveSubTab
  } = useContactViewContext();
  const {
    useGetDataModel,
    useGetActiveBobjectContext,
    useGetSettings,
    closeExtendedScreen
  } = useExtensionContext();
  const settings = useGetSettings();
  const contextBobjects = useGetActiveBobjectContext();
  const dataModel = useGetDataModel();
  const hasWhatsappEnabled = useWhatsappEnabled(opportunity?.id?.accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(opportunity?.id?.accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(opportunity?.id?.accountId);
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const statusLabel = dataModel?.findValueById(opportunity?.status);
  const primaryContactFieldId = dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT)?.id;
  const assigneeId = opportunity?.assignedTo;
  const mainNote = opportunity?.mainNote;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find((user) => user?.id === assigneeId);
  const {
    visible,
    setVisible,
    ref: dropdownRef
  } = useVisible();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const B2CShowAccountPhonesActive = useB2CShowAccountPhonesSetting();
  const quickLogVisibilityProps = useVisible();
  const {
    visible: whatsAppPhonesVisible,
    setVisible: setWhatsAppPhonesVisible,
    ref: whatsAppPhonesRef
  } = useVisible();
  const {
    data: mainNoteData,
    mutate
  } = useSWR(mainNote && `/contactViewMainNote/${mainNote}`, () => api.get(`/bobjects/${mainNote}/form`));
  const {
    syncStatus
  } = useSyncBobjectStatus(opportunity?.id?.accountId, [opportunity]);
  const [opportunityLinkedInLeads, setOpportunityLinkedInLeads] = useState([]);
  useSubscribeListeners(opportunity?.id?.typeName, mutate);
  const {
    openNoteModal,
    openMainNoteModal
  } = useOpenNote(opportunity, mainNoteData, setVisible);
  const companyId = contextBobjects?.company?.id?.value;
  const {
    actionsDisabled
  } = useContactViewContext();
  const {
    openDialer
  } = useDialerLauncher();
  const {
    visible: arePhoneNumbersVisible,
    setVisible: togglePhoneNumbersDropdown,
    ref: phoneNumbersRef
  } = useVisible();
  const opportunityLeads = contextBobjects?.leads?.filter((lead2) => opportunity.leads?.includes(lead2?.id?.value));
  let noLeadNumbers = false;
  const parsedOppLeads = opportunityLeads?.map((l) => {
    if (!l.phoneNumbers || l.phoneNumbers?.length === 0) {
      noLeadNumbers = true;
    }
    return {
      phoneNumbers: l.phoneNumbers || [],
      fullName: l.fullName,
      id: l.id
    };
  }) || [];
  const noCompanyPhoneNumbers = !contextBobjects?.company?.phoneNumbers || contextBobjects?.company?.phoneNumbers.length === 0;
  const noLeads = !parsedOppLeads || parsedOppLeads?.length === 0;
  const noCompany = !contextBobjects?.company;
  const showAccountPhones = !noCompany && (!isPersonAccountAsAccount && !isB2CAccount || B2CShowAccountPhonesActive);
  const noPhoneNumbers = isB2CAccount ? noLeadNumbers || noLeads : noLeads && noCompanyPhoneNumbers || noLeads && noCompany || noCompany && noLeadNumbers || noLeadNumbers && noCompanyPhoneNumbers;
  const leadIdValue = opportunity?.rawBobject[primaryContactFieldId] ?? opportunity?.leads?.[0];
  const emailField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL)?.id;
  const {
    lead
  } = getLeadById(leadIdValue?.split("/")[2], opportunity?.id?.accountId);
  const uniqueLead = opportunityLeads?.length === 1 && opportunityLeads?.[0];
  useSubscribeListeners(opportunity?.id?.typeName, mutate);
  function openEmailModal() {
    setEmailVariablesValue({
      company: contextBobjects?.company?.rawBobject,
      lead: uniqueLead ? uniqueLead?.rawBobject : null,
      opportunity: opportunity?.rawBobject
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
        ...uniqueLead ? {
          lead: uniqueLead,
          defaultToEmail: [uniqueLead?.rawBobject?.[emailField]]
        } : {},
        leads: contextBobjects?.leads || opportunityLeads || [lead],
        opportunity,
        pageBobjectType: BobjectTypes.Opportunity
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
  function openTaskModal() {
    openMinimizableModal({
      type: "task",
      data: {
        opportunity,
        location: "bubble",
        companyContext: contextBobjects?.company
      }
    });
  }
  useEffect(async () => {
    const result = await Promise.all(opportunity?.leads?.map((o) => getExtensionBobjectByIdFields({
      typeName: BobjectTypes.Lead,
      objectId: o?.split("/")[2]
    })) || []);
    setOpportunityLinkedInLeads(result?.map((r) => r.data) || []);
  }, []);
  const handleClickTab = (tab) => {
    setActiveSubTab(tab);
    closeExtendedScreen();
  };
  if (!opportunity) {
    return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
      children: "No opportunity found"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 306,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(ContactViewHeader, {
      subtitle: opportunity?.amount,
      title: opportunity?.name,
      icon: "fileOpportunity",
      assigneeUser,
      syncStatus,
      bobjectId: opportunity.id,
      labels: isNoStatusOppSetting ? /* @__PURE__ */ _jsxDEV(SalesforceStageLabel, {
        bobject: opportunity
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 320,
        columnNumber: 13
      }, void 0) : (statusLabel || isNoStatusPlanAccount) && /* @__PURE__ */ _jsxDEV(StageAndStatusLabel, {
        bobject: opportunity,
        meta: contextBobjects
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 323,
        columnNumber: 15
      }, void 0),
      buttons: /* @__PURE__ */ _jsxDEV(ContactButtons, {
        bobject: opportunity,
        mainNoteBobject: mainNoteData,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 328,
        columnNumber: 11
      }, void 0),
      bobject: opportunity,
      minimizedView: minimized
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 311,
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
          lineNumber: 343,
          columnNumber: 13
        }, void 0),
        children: [parsedOppLeads?.length > 0 && parsedOppLeads?.map((lead2, idx) => /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: lead2,
          callback: (phone) => {
            togglePhoneNumbersDropdown(false);
            openPhoneOrDialer(phone, settings, openDialer, lead2?.id?.value);
          },
          closeDropdown: () => togglePhoneNumbersDropdown(false)
        }, idx + "_" + lead2?.id?.value, false, {
          fileName: _jsxFileName,
          lineNumber: 355,
          columnNumber: 15
        }, void 0)), showAccountPhones && /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: contextBobjects?.company,
          callback: (phone) => {
            togglePhoneNumbersDropdown(false);
            openPhoneOrDialer(phone, settings, openDialer, companyId);
          },
          closeDropdown: () => togglePhoneNumbersDropdown(false)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 366,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Section, {
          id: "logCallManually",
          icon: "zap",
          children: t("quickLog")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 375,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
          onClick: () => {
            togglePhoneNumbersDropdown(false);
            setOpenLogCall(true);
          },
          children: t("logCallManually")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 378,
          columnNumber: 11
        }, void 0), noPhoneNumbers && /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV(Section, {
            id: "callManually",
            icon: "zap",
            children: t("callManually")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 388,
            columnNumber: 15
          }, void 0), hasAircallPhoneLinkEnabled ? /* @__PURE__ */ _jsxDEV("a", {
            href: `callto:`,
            className: styles.openAircallDialer,
            children: /* @__PURE__ */ _jsxDEV(Item, {
              children: t("openDialer")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 393,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 392,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(Item, {
            onClick: () => {
              openPhoneOrDialer("", settings, openDialer);
            },
            children: t("openDialer")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 396,
            columnNumber: 17
          }, void 0)]
        }, void 0, true)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 338,
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
          lineNumber: 408,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(EmailActionTooltip, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 414,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 407,
        columnNumber: 9
      }, void 0), hasWhatsappEnabled && /* @__PURE__ */ _jsxDEV(Dropdown, {
        ref: whatsAppPhonesRef,
        visible: whatsAppPhonesVisible,
        position: "top",
        anchor: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
          color: "whatsapp",
          icon: "whatsapp",
          onClick: () => !noLeadNumbers ? setWhatsAppPhonesVisible(true) : openWhatsAppWeb(forceWsOpenNewPage),
          isDisabled: actionsDisabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 422,
          columnNumber: 15
        }, void 0),
        children: [parsedOppLeads?.length > 0 && parsedOppLeads?.map((lead2, idx) => {
          return /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
            bobject: lead2,
            callback: (phone) => {
              setWhatsAppPhonesVisible(false);
              openWhatsAppWeb(forceWsOpenNewPage, phone);
            },
            isWhatsApp: true
          }, idx + "_" + lead2?.id?.value, false, {
            fileName: _jsxFileName,
            lineNumber: 437,
            columnNumber: 19
          }, void 0);
        }), showAccountPhones && /* @__PURE__ */ _jsxDEV(PhoneDropdownContent, {
          bobject: contextBobjects?.company,
          callback: (phone) => {
            setWhatsAppPhonesVisible(false);
            openWhatsAppWeb(forceWsOpenNewPage, phone);
          },
          isWhatsApp: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 449,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 417,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          position: "relative"
        },
        children: [/* @__PURE__ */ _jsxDEV(CreateTaskMenu, {
          environment: contextBobjects,
          children: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
            color: "bloobirds",
            icon: "taskAction",
            isDisabled: actionsDisabled
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 462,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 461,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CreateTasksTooltip, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 464,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 460,
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
            lineNumber: 476,
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
              lineNumber: 478,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
              size: "small",
              iconLeft: "starChecked",
              onClick: openMainNoteModal,
              uppercase: false,
              children: t("mainNote")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 481,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 477,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 475,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 467,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "banana",
        icon: "noteAction",
        onClick: openNoteModal,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 493,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "tomato",
        icon: "calendar",
        onClick: openMeetingModal,
        isDisabled: actionsDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 500,
        columnNumber: 9
      }, void 0), hasCustomTaskEnabled && /* @__PURE__ */ _jsxDEV(CustomTasksTooltip, {
        defaultTooltipVisible: true,
        children: /* @__PURE__ */ _jsxDEV(QuickLogCustomTask, {
          isDisabled: actionsDisabled,
          bobject: opportunity,
          leads: contextBobjects?.leads || opportunityLeads || [lead],
          visibilityProps: quickLogVisibilityProps
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 508,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 507,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 337,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(StageDivider, {
      color: "peanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 517,
      columnNumber: 7
    }, void 0), activeSubTab === ContactViewSubTab.OVERVIEW && /* @__PURE__ */ _jsxDEV(WizardHelper, {
      bobject: opportunity,
      relatedCompany: contextBobjects?.company,
      minimized
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 519,
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
      children: contentToRender(activeSubTab, opportunity, opportunityLinkedInLeads, companyId, ref)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 525,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooter, {
      children: [/* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.OVERVIEW,
        icon: "assignBoard",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 539,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.ACTIVITIES,
        icon: "activity",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 545,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.TASKS,
        icon: "checkDouble",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 551,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.RELATIONS,
        icon: "share",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 557,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewFooterTab, {
        name: ContactViewSubTab.PLAYBOOK,
        icon: "magic",
        onClick: handleClickTab,
        selected: activeSubTab
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 563,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 538,
      columnNumber: 7
    }, void 0), openLogCall && /* @__PURE__ */ _jsxDEV(LogCallModal, {
      leadId: opportunityLeads?.[0]?.id?.value,
      opportunityId: opportunity?.id?.value,
      companyId: contextBobjects?.company?.id?.value,
      onClose: () => setOpenLogCall(false),
      dataModel,
      leadsPhoneNumbers: opportunityLeads?.reduce((acc, lead2) => {
        if (Array.isArray(lead2.phoneNumbers)) {
          return acc.concat(lead2.phoneNumbers);
        }
        return acc;
      }, [])
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 571,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 310,
    columnNumber: 5
  }, void 0);
};
_s2(ContactOpportunityPage, "tob2Lcklce9GGWBT+5SgBXElB1g=", true, function() {
  return [useMinimizableModals, useTranslation, useContactViewContext, useExtensionContext, useWhatsappEnabled, useWhatsappOpenNewPage, useAircallPhoneLinkEnabled, useBaseSetEmailVariablesValues, useNewCadenceTableEnabled, useNoStatusOppSetting, useUserSearch, useVisible, useIsB2CAccount, useIsPersonAccountAsAccount, useIsNoStatusPlanAccount, useB2CShowAccountPhonesSetting, useVisible, useVisible, useSWR, useSyncBobjectStatus, useSubscribeListeners, useOpenNote, useContactViewContext, useDialerLauncher, useVisible, useSubscribeListeners];
});
_c = ContactOpportunityPage;
var _c;
$RefreshReg$(_c, "ContactOpportunityPage");
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
