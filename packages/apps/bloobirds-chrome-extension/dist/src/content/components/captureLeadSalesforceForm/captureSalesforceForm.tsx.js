import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { FormGroup, FormLabel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Button, Icon, Text, Tooltip, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount, useIsPersonAccountAsAccount, useOtoSyncWithRelatedObjects, useSalesforceDataModel, useIsAutoSyncFromDifferentOwner } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, MessagesEvents, MIXPANEL_EVENTS, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, removeDulpicatedBobjects, baseUrls } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { motion, useAnimation } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import __vite__cjsImport11_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport11_mixpanelBrowser.__esModule ? __vite__cjsImport11_mixpanelBrowser.default : __vite__cjsImport11_mixpanelBrowser;
import { useCreationForm } from "/src/hooks/useCreationForm.ts.js";
import { useSyncWithParentsSalesforceSobject } from "/src/hooks/useSyncSalesforceSobject.ts.js";
import { SALESFORCE } from "/src/utils/integrations.ts.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowGradientFooter } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import ContactViewHeader from "/src/content/components/contactView/components/contactViewHeader/contactViewHeader.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { DuplicatedBobjectsPage } from "/src/content/components/linkedInScreens/duplicatedBobjectsPage.tsx.js";
import NavigateMessageSalesforce from "/src/content/components/linkedInScreens/navigateMessageSalesforce.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import { AccountField } from "/src/content/components/captureLeadSalesforceForm/accountField/accountField.tsx.js";
import styles from "/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.module.css.js";
import { CompanyField } from "/src/content/components/captureLeadSalesforceForm/companyField/companyField.tsx.js";
import { ConfirmationModal } from "/src/content/components/captureLeadSalesforceForm/confirmationModal/confirmationModal.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const picklistFieldTypes = ["PICKLIST", "MULTI_PICKLIST", "GLOBAL_PICKLIST", "MULTI_GLOBAL_PICKLIST"];
const HIDED_FIELDS_LOGIC_ROLE = [LEAD_FIELDS_LOGIC_ROLE.NAME, LEAD_FIELDS_LOGIC_ROLE.SURNAME, COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT, COMPANY_FIELDS_LOGIC_ROLE.PERSON_CONTACT_ID, SALESFORCE.LEAD_ID_FIELD, SALESFORCE.ACCOUNT_ID_FIELD, SALESFORCE.OPPORTUNITY_ID_FIELD, SALESFORCE.CONTACT_ID_FIELD];
const ASSIGNED_TO_FIELDS_LOGIC_ROLE = [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO, OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO];
const bobjectFromSobject = {
  Lead: "Lead",
  Contact: "Lead",
  Account: "Company",
  Opportunity: "Opportunity"
};
const variants = {
  start: () => ({
    x: [0, 3, -3],
    transition: {
      repeat: 4,
      duration: 0.1
    }
  }),
  reset: {
    rotate: 0
  }
};
const CaptureSalesforceForm = ({
  defaultSobjectType,
  sobjectId,
  afterSyncing,
  syncLead = false
}) => {
  _s();
  const {
    data,
    mutate
  } = useSyncWithParentsSalesforceSobject({
    sobjectType: defaultSobjectType,
    sobjectId
  });
  const sobjectType = defaultSobjectType;
  const bobjectType = bobjectFromSobject[sobjectType];
  const mainObject = data?.[bobjectType?.toLowerCase()];
  const accountRelatedData = data?.company;
  const {
    createToast
  } = useToasts();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const controls = useAnimation();
  const {
    useGetDataModel,
    useGetSettings,
    setSalesforceSyncMutate,
    useGetIsLoading,
    setIsLoading,
    setDuplicatesDetected,
    useGetDuplicatesDetected,
    refreshActiveBobjectContext,
    setActiveBobject
  } = useExtensionContext();
  const isLoading = useGetIsLoading();
  const {
    setCreateLead,
    setSyncLead
  } = useCreationForm();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.salesforcePages.captureSalesforceForm"
  });
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const duplicatesDetected = useGetDuplicatesDetected();
  const syncAutomatically = settings?.user?.autoSyncObjectsSalesforce;
  const isAccountAdmin = settings?.user?.accountAdmin;
  const activeUserId = settings?.user?.id;
  const isLead = sobjectType === "Lead";
  const isContact = sobjectType === "Contact";
  const isAccount = sobjectType === "Account";
  const isOpportunity = sobjectType === "Opportunity";
  const [duplicates, setDuplicates] = useState([]);
  const sfdcDataModel = useSalesforceDataModel();
  const hasOtoSyncWithRelatedObjectsFlag = useOtoSyncWithRelatedObjects(dataModel?.getAccountId());
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const isB2CAccount = useIsB2CAccount();
  const isAutoSyncFromDifferentOwner = useIsAutoSyncFromDifferentOwner();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: {
      isSubmitting
    }
  } = useForm({
    defaultValues: {
      fields: {},
      companyName: "",
      createCompany: false
    }
  });
  const assignedToFieldId = {
    company: dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id,
    lead: dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id,
    opportunity: dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id
  };
  const accountRelatedAssignedToFieldValue = accountRelatedData?.rawBobject?.[assignedToFieldId?.company];
  const accountRelatedHasAssignedToField = !!accountRelatedAssignedToFieldValue;
  const accountRelatedIsDifferentAssignedTo = accountRelatedHasAssignedToField && !!activeUserId && accountRelatedAssignedToFieldValue !== activeUserId;
  const accountRelatedSalesforceOwner = sfdcDataModel?.salesforceUsers?.find((user) => user?.salesforceUserId === accountRelatedData?.sobject?.["OwnerId"]);
  const isPersonAccount = accountRelatedData?.sobject?.IsPersonAccount;
  const leadNameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.NAME);
  const salesforceOwner = sfdcDataModel?.salesforceUsers?.find((user) => user?.salesforceUserId === mainObject?.sobject?.["OwnerId"]);
  const assignedToFieldValue = mainObject?.rawBobject?.[assignedToFieldId?.[mainObject?.id?.typeName?.toLowerCase()]];
  const hasAssignedToField = !!assignedToFieldValue;
  const isDifferentAssignedTo = hasAssignedToField && !!activeUserId && assignedToFieldValue !== activeUserId && !isAutoSyncFromDifferentOwner;
  const leadSurnameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.SURNAME);
  const leadCompanyField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.COMPANY);
  const companyNameField = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const companyWebsiteField = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.WEBSITE);
  const oppNameField = dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const bloobirdsAssignedToName = dataModel?.findValueById(assignedToFieldValue)?.name;
  const hasLeadNameOrSurname = mainObject?.rawBobject?.[leadNameField?.id] || mainObject?.rawBobject?.[leadSurnameField?.id];
  const baseUrl = baseUrls[process.env.ENV];
  const mappingUrl = `${baseUrl}/app/account-settings/integration/salesforce/mapping`;
  useEffect(() => {
    const {
      fields: currentFields,
      createCompany: createCompany2
    } = getValues();
    reset({
      createCompany: createCompany2,
      companyName: mainObject?.sobject?.["Company"],
      fields: {
        ...currentFields,
        ...mainObject?.rawBobject
      }
    });
  }, [data]);
  useEffect(() => {
    setSalesforceSyncMutate(() => mutate());
  }, []);
  const companyId = watch(`fields.${leadCompanyField?.id}`);
  const createCompany = watch("createCompany");
  const syncAccount = watch("syncAccount");
  const saveButtonMessage = useMemo(() => {
    if (isContact || isOpportunity) {
      return isContact ? t("saveContactIn") : isOpportunity ? t("saveOpportunityIn") : "";
    }
    if (isAccount) {
      return t("saveAccountIn");
    }
    if (createCompany || syncAccount) {
      return t("saveLeadIn");
    }
    if (companyId) {
      return t("saveLeadToCompanyIn");
    }
    return t("saveLeadIn");
  }, [companyId, createCompany, data, syncAccount, accountRelatedData]);
  const viewPerSobjectType = {
    Lead: {
      title: hasLeadNameOrSurname ? `${mainObject?.rawBobject?.[leadNameField?.id] || ""} ${mainObject?.rawBobject?.[leadSurnameField?.id] || ""}` : t("untitledLead"),
      icon: "person",
      subtitle: null
    },
    Contact: {
      title: hasLeadNameOrSurname ? `${mainObject?.rawBobject?.[leadNameField?.id] || ""} ${mainObject?.rawBobject?.[leadSurnameField?.id] || ""}` : t("untitledLead"),
      icon: "person",
      subtitle: null
    },
    Account: {
      title: mainObject?.rawBobject?.[companyNameField?.id] || t("untitledAccount"),
      subtitle: mainObject?.rawBobject?.[companyWebsiteField?.id],
      icon: "company"
    },
    Opportunity: {
      title: mainObject?.rawBobject?.[oppNameField?.id],
      icon: "fileOpportunity",
      subtitle: null
    }
  };
  const companyField = {
    id: leadCompanyField?.id,
    logicRole: LEAD_FIELDS_LOGIC_ROLE.COMPANY,
    name: "Company",
    order: leadCompanyField?.ordering,
    type: "REFERENCE",
    visible: true,
    required: false,
    enabled: true,
    values: []
  };
  const syncWithRelatedObjects = async () => {
    try {
      const syncResponse = await api.post(`/utils/service/salesforce/syncSobjectWithParents/${sobjectType}/${sobjectId}`, {
        params: {
          returnRepresentation: true
        }
      });
      if (afterSyncing) {
        setCreateLead(false);
        setSyncLead(false);
        afterSyncing(syncResponse?.data);
      }
      if (sobjectType == "Account" && isPersonAccountAsAccount && isB2CAccount && syncResponse?.data?.salesforceId != null && syncResponse?.data?.personContactId != null) {
        setActiveBobject(null);
        refreshActiveBobjectContext();
      } else {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: bobjectType
          }
        }));
        setTimeout(() => {
          refreshActiveBobjectContext();
        }, 1500);
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        setIsLoading(false);
        setDuplicatesDetected(true);
        setDuplicates(error?.response?.data?.duplicates);
      } else {
        createToast({
          message: t("toast", {
            object: sobjectType || "object"
          }),
          type: "error"
        });
      }
    }
  };
  const save = async (data2) => {
    const isOppWithRelated = sobjectType === "Opportunity" && data2?.syncAccount;
    try {
      let possibleAccountIdCreated;
      if (data2?.syncAccount && accountRelatedData && !accountRelatedData?.id?.objectId && !isOppWithRelated) {
        const accountResponse = await api.post("/linkedin/companies", {
          contents: {
            ...accountRelatedData?.rawBobject
          },
          params: {
            returnRepresentation: true
          }
        });
        if (accountResponse) {
          possibleAccountIdCreated = accountResponse?.data?.id?.value;
        }
      }
      const fetch = {
        lead: async () => await api.post("/linkedin/leads", {
          fields: {
            ...data2.fields,
            [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: accountRelatedData?.id?.objectId ? accountRelatedData?.id?.value : possibleAccountIdCreated
          },
          companyName: syncAccount ? null : data2.companyName,
          createCompany: syncAccount ? false : data2.createCompany
        }),
        contact: async () => await api.post("/linkedin/leads", {
          fields: {
            ...data2.fields,
            [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: accountRelatedData?.id?.objectId ? accountRelatedData?.id?.value : possibleAccountIdCreated
          },
          companyName: null,
          createCompany: false
        }),
        account: async () => await api.post("/linkedin/companies", {
          contents: {
            ...data2.fields
          },
          params: {
            returnRepresentation: true
          }
        }),
        opportunity: async () => {
          return isOppWithRelated ? await api.post(`/utils/service/salesforce/syncSobjectWithParents/${sobjectType}/${sobjectId}`, {
            params: {
              returnRepresentation: true
            }
          }) : await api.post("/linkedin/opportunities", {
            contents: {
              ...data2.fields,
              [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: accountRelatedData?.id?.objectId ? accountRelatedData?.id?.value : possibleAccountIdCreated
            },
            params: {
              returnRepresentation: true
            }
          });
        }
      };
      const response = await fetch[sobjectType?.toLowerCase()]();
      if (sobjectType?.toLowerCase() === "lead") {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_LEAD_OTO);
      }
      if (afterSyncing) {
        setCreateLead(false);
        setSyncLead(false);
        afterSyncing(response?.data);
      }
      if (isOppWithRelated) {
        setTimeout(() => {
          refreshActiveBobjectContext();
        }, 2e3);
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        setIsLoading(false);
        setDuplicatesDetected(true);
        setDuplicates(error?.response?.data?.duplicates);
      } else {
        createToast({
          message: t("toast", {
            object: sobjectType || "object"
          }),
          type: "error"
        });
      }
    }
  };
  const automaticallySync = async () => {
    if (hasOtoSyncWithRelatedObjectsFlag) {
      await syncWithRelatedObjects();
    } else {
      if (isLead) {
        if (accountRelatedData) {
          const values = getValues()?.fields;
          save({
            createCompany: false,
            companyName: null,
            syncAccount: true,
            fields: {
              ...values
            }
          });
        } else {
          const companyName = mainObject?.sobject?.["Company"];
          if (companyName) {
            const companies = await api.get("/linkedin/search/companies", {
              params: {
                name: companyName
              }
            });
            const company = companies?.data.find((company2) => company2.name === companyName);
            if (company) {
              const values = getValues()?.fields;
              save({
                createCompany: false,
                syncAccount: false,
                companyName,
                fields: {
                  ...values,
                  [leadCompanyField?.id]: company?.id?.value
                }
              });
            } else {
              save({
                ...getValues(),
                createCompany: true
              });
            }
          } else {
            save(getValues());
          }
        }
      } else if (isAccount || isContact || isOpportunity) {
        const values = getValues()?.fields;
        save({
          createCompany: false,
          companyName: null,
          syncAccount: !isAccount,
          fields: {
            ...values
          }
        });
      }
    }
  };
  const allowSavingWithOrWithoutAssignedTo = hasAssignedToField || isPersonAccount || isAutoSyncFromDifferentOwner;
  useEffect(() => {
    if (data && syncAutomatically && allowSavingWithOrWithoutAssignedTo && !isDifferentAssignedTo) {
      automaticallySync();
    }
  }, [allowSavingWithOrWithoutAssignedTo, data]);
  useEffect(() => {
    if (syncLead && data) {
      automaticallySync();
    }
  }, [syncLead, data]);
  useEffect(() => {
    controls?.start("start");
  }, []);
  if (!isLead && !isAccount && !isOpportunity && !isContact) {
    return /* @__PURE__ */ _jsxDEV(NavigateMessageSalesforce, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 538,
      columnNumber: 12
    }, void 0);
  }
  if (!data || isLoading) {
    return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 541,
      columnNumber: 12
    }, void 0);
  }
  if (syncAutomatically && allowSavingWithOrWithoutAssignedTo && !isDifferentAssignedTo) {
    const filteredDuplicates = removeDulpicatedBobjects(duplicates?.map((d) => d?.bobject) || []);
    return duplicatesDetected ? /* @__PURE__ */ _jsxDEV(DuplicatedBobjectsPage, {
      bobjects: filteredDuplicates,
      sobjectId
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 549,
      columnNumber: 7
    }, void 0) : /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 551,
      columnNumber: 7
    }, void 0);
  }
  const isAssignedToGroupUser = mainObject?.sobject?.["OwnerId"]?.slice(0, 3) === "00G";
  if (syncLead) {
    return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 558,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(ContactViewHeader, {
          onlyHeader: true,
          title: viewPerSobjectType[sobjectType]?.title,
          subtitle: viewPerSobjectType[sobjectType]?.subtitle,
          icon: viewPerSobjectType[sobjectType]?.icon
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 565,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 564,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
        children: [/* @__PURE__ */ _jsxDEV("form", {
          className: styles.formContainer,
          children: [!allowSavingWithOrWithoutAssignedTo && /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [/* @__PURE__ */ _jsxDEV(FormGroup, {
              children: [/* @__PURE__ */ _jsxDEV(FormLabel, {
                children: t("assignedTo")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 577,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV("span", {
                className: styles.tooltip_container,
                children: /* @__PURE__ */ _jsxDEV(Tooltip, {
                  title: t("tooltipNotMapped", {
                    sobjectType
                  }),
                  position: "top",
                  children: /* @__PURE__ */ _jsxDEV(Icon, {
                    name: "alertTriangle",
                    color: "banana"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 580,
                    columnNumber: 23
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 579,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 578,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 576,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(motion.div, {
              className: styles.callout,
              variants,
              animate: controls,
              id: "callout-bb-assigned-to",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "peanut",
                children: [t("recordNotSynced"), !isAssignedToGroupUser ? /* @__PURE__ */ _jsxDEV(_Fragment, {
                  children: [/* @__PURE__ */ _jsxDEV("b", {
                    children: salesforceOwner?.salesforceUserName || mainObject?.sobject?.["OwnerId"]
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 594,
                    columnNumber: 25
                  }, void 0), " ", t("notMapped"), isAccountAdmin && /* @__PURE__ */ _jsxDEV("a", {
                    color: "var(--bloobirds)",
                    style: {
                      cursor: "pointer"
                    },
                    onClick: () => window.open(`${baseUrl}/app/account-settings/integration/salesforce/users`, "_blank"),
                    children: t("reviewMapped")
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 599,
                    columnNumber: 27
                  }, void 0)]
                }, void 0, true) : /* @__PURE__ */ _jsxDEV(Trans, {
                  i18nKey: "extension.salesforcePages.captureSalesforceForm.assignedToGroup"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 614,
                  columnNumber: 23
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 590,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 584,
              columnNumber: 17
            }, void 0)]
          }, void 0, true), (isContact || isOpportunity || isLead) && accountRelatedData?.id?.objectId && /* @__PURE__ */ _jsxDEV(FormGroup, {
            children: [/* @__PURE__ */ _jsxDEV(FormLabel, {
              children: t("account")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 622,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              color: "peanut",
              className: styles.ellipsis,
              children: accountRelatedData?.name || t("untitledCompany")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 623,
              columnNumber: 17
            }, void 0)]
          }, accountRelatedData?.id?.objectId, true, {
            fileName: _jsxFileName,
            lineNumber: 621,
            columnNumber: 15
          }, void 0), data && mainObject?.rawBobject && Object.keys(mainObject?.rawBobject)?.map((fieldId) => {
            const value = mainObject?.rawBobject?.[fieldId];
            const field = dataModel?.findFieldById(fieldId);
            if (HIDED_FIELDS_LOGIC_ROLE.includes(field?.logicRole)) {
              return null;
            }
            const showAssignedAlert = ASSIGNED_TO_FIELDS_LOGIC_ROLE.includes(field?.logicRole) && isDifferentAssignedTo;
            const fieldLabel = field?.name;
            const isPicklist = picklistFieldTypes.includes(field?.fieldType);
            const fieldValue = isPicklist ? dataModel?.findValueById(value)?.name : typeof value === "string" ? value : t("empty");
            return /* @__PURE__ */ _jsxDEV(FormGroup, {
              children: [/* @__PURE__ */ _jsxDEV(FormLabel, {
                children: fieldLabel
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 648,
                columnNumber: 21
              }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                className: showAssignedAlert && styles.with_assigned_value,
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  size: "s",
                  color: fieldValue ? "peanut" : "softPeanut",
                  className: styles.ellipsis,
                  children: fieldValue || t("empty")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 650,
                  columnNumber: 23
                }, void 0), showAssignedAlert && /* @__PURE__ */ _jsxDEV(Tooltip, {
                  title: t("tooltipOwner", {
                    sobjectType
                  }),
                  position: "top",
                  children: /* @__PURE__ */ _jsxDEV(Icon, {
                    name: "alertTriangle",
                    color: "banana"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 659,
                    columnNumber: 27
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 658,
                  columnNumber: 25
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 649,
                columnNumber: 21
              }, void 0)]
            }, fieldId, true, {
              fileName: _jsxFileName,
              lineNumber: 647,
              columnNumber: 19
            }, void 0);
          })]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 573,
          columnNumber: 11
        }, void 0), isAccountAdmin && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.extraFormInfo,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "softPeanut",
            align: "center",
            children: t("missingInfo")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 669,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            onClick: () => window.open(mappingUrl, "_blank"),
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "bloobirds",
              align: "center",
              children: [t("mapMoreFields"), /* @__PURE__ */ _jsxDEV(Icon, {
                name: "externalLink",
                size: 16
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 675,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 673,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 672,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 668,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 572,
        columnNumber: 9
      }, void 0), (isContact || isOpportunity || isLead) && !accountRelatedData?.id?.objectId && accountRelatedData && /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
        className: styles.company_footer,
        children: /* @__PURE__ */ _jsxDEV("span", {
          children: /* @__PURE__ */ _jsxDEV(AccountField, {
            control,
            accountName: accountRelatedData?.rawBobject?.[companyNameField?.id],
            hasDifferentAssignedTo: accountRelatedIsDifferentAssignedTo,
            salesforceOwnerName: accountRelatedSalesforceOwner?.salesforceUserName,
            hasBloobirdsAssignedTo: !!accountRelatedAssignedToFieldValue,
            sobjectType
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 686,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 685,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 684,
        columnNumber: 13
      }, void 0), isLead && !accountRelatedData && /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
        className: styles.company_footer,
        children: /* @__PURE__ */ _jsxDEV("span", {
          className: styles.companyField,
          children: /* @__PURE__ */ _jsxDEV(CompanyField, {
            style: "gradient",
            control,
            ...companyField
          }, companyField?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 700,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 699,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 698,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowGradientFooter, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.footer_container,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "white",
            className: styles.wizardStartCadenceTitle,
            weight: "bold",
            children: t("nextStep")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 711,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            onClick: () => !allowSavingWithOrWithoutAssignedTo && controls.start("start"),
            children: /* @__PURE__ */ _jsxDEV(Button, {
              expand: true,
              disabled: !allowSavingWithOrWithoutAssignedTo || isSubmitting,
              onClick: () => {
                isDifferentAssignedTo ? setConfirmationModal(true) : handleSubmit(save)();
              },
              variant: "tertiary",
              iconRight: "bloobirds",
              className: styles.button,
              children: saveButtonMessage
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 715,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 714,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 710,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 709,
        columnNumber: 9
      }, void 0)]
    }, void 0, true), confirmationModal && /* @__PURE__ */ _jsxDEV(ConfirmationModal, {
      onClose: () => setConfirmationModal(false),
      onSave: () => {
        handleSubmit(save)();
        setConfirmationModal(false);
      },
      sobjectType,
      assignedName: bloobirdsAssignedToName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 732,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 562,
    columnNumber: 5
  }, void 0);
};
_s(CaptureSalesforceForm, "NVLct0aPyOuJQQ8/T00N3iarvL0=", true, function() {
  return [useSyncWithParentsSalesforceSobject, useToasts, useAnimation, useExtensionContext, useCreationForm, useTranslation, useSalesforceDataModel, useOtoSyncWithRelatedObjects, useIsPersonAccountAsAccount, useIsB2CAccount, useIsAutoSyncFromDifferentOwner, useForm];
});
_c = CaptureSalesforceForm;
export default CaptureSalesforceForm;
var _c;
$RefreshReg$(_c, "CaptureSalesforceForm");
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
