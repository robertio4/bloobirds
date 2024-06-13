import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import {
  AVAILABLE_COMPANY_STATUS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
  SALESFORCE_LOGIC_ROLES
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport4_lodash_sortBy from "/vendor/.vite-deps-lodash_sortBy.js__v--db3f7ac0.js"; const sortBy = __vite__cjsImport4_lodash_sortBy.__esModule ? __vite__cjsImport4_lodash_sortBy.default : __vite__cjsImport4_lodash_sortBy;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveAccount.ts.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useDataModel.ts.js";
const fetchReasons = (bobjectType, isInSalesStage, hasNoStatusEnabled) => {
  const { data } = useSWR(
    !hasNoStatusEnabled && `/utils/service/view/field/statusReasons/${bobjectType}${isInSalesStage ? "?stage=SALES" : ""}`,
    (url) => api.get(url)
  );
  return data?.data;
};
const blackListedStatus = [
  COMPANY_STATUS_LOGIC_ROLE.FINDING_LEADS,
  COMPANY_STATUS_LOGIC_ROLE.READY_TO_PROSPECT
];
var REASON_STATUS = /* @__PURE__ */ ((REASON_STATUS2) => {
  REASON_STATUS2["NURTURING"] = "NURTURING";
  REASON_STATUS2["DISCARDED"] = "DISCARDED";
  REASON_STATUS2["ON_HOLD"] = "ON HOLD";
  return REASON_STATUS2;
})(REASON_STATUS || {});
const getOrderingArray = (bobjectType, isSalesStage) => {
  let orderingEnum;
  switch (bobjectType) {
    case "Company":
      orderingEnum = isSalesStage ? COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE : AVAILABLE_COMPANY_STATUS_LOGIC_ROLE;
      break;
    case "Lead":
      orderingEnum = isSalesStage ? LEAD_SALES_STATUS_VALUES_LOGIC_ROLE : LEAD_STATUS_LOGIC_ROLE;
      break;
    case "Opportunity":
      orderingEnum = OPPORTUNITY_STATUS_LOGIC_ROLE;
      break;
  }
  return Object.values(orderingEnum);
};
function getStatuses(bobjectType, isSales, dataModel, hasNoStatusPlanEnabled, salesforceStatusValues) {
  if (hasNoStatusPlanEnabled) {
    return salesforceStatusValues[`${bobjectType.toLowerCase()}CrmStatusValues`];
  }
  const isOpportunity = bobjectType === "Opportunity";
  if (isOpportunity) {
    return sortBy(
      dataModel.findValuesByFieldLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS)?.filter((status) => status?.isEnabled),
      "ordering"
    );
  } else {
    const statusOrderingArray = getOrderingArray(bobjectType, isSales);
    const fieldsLogicRoles = FIELDS_LOGIC_ROLE[bobjectType];
    if (!isSales) {
      return dataModel.findValuesByFieldLogicRole(fieldsLogicRoles.STATUS).filter(
        (status) => status?.isEnabled && status?.logicRole && !blackListedStatus.includes(status?.logicRole)
      ).sort((a, b) => {
        return statusOrderingArray.indexOf(a.logicRole) - statusOrderingArray.indexOf(b.logicRole);
      });
    } else {
      return dataModel.findValuesByFieldLogicRole(fieldsLogicRoles.SALES_STATUS)?.filter((status) => status?.isEnabled).sort(
        (a, b) => statusOrderingArray.indexOf(a.logicRole) - statusOrderingArray.indexOf(b.logicRole)
      );
    }
  }
}
function getAvailableReasons(bobjectType, selectedStatus, reasons) {
  if (!selectedStatus || !reasons)
    return { values: [], isRequired: false };
  if (bobjectType === "Opportunity" && reasons.length) {
    const oppReasonsField = reasons.find(
      ({ logicRole }) => logicRole === OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON
    );
    return { values: oppReasonsField.values, isRequired: oppReasonsField.required };
  }
  const nurturingReasonsField = reasons.find(({ logicRole }) => logicRole.includes("NURTURING"));
  const discardedReasonsField = reasons.find(({ logicRole }) => logicRole.includes("DISCARDED"));
  const onHoldReasonsField = reasons.find(({ logicRole }) => logicRole.includes("ON_HOLD"));
  if (selectedStatus?.logicRole.includes("NURTURING" /* NURTURING */)) {
    return {
      values: nurturingReasonsField?.fieldValues,
      isRequired: nurturingReasonsField?.required
    };
  } else if (selectedStatus?.logicRole.includes("DISCARDED" /* DISCARDED */)) {
    return {
      values: discardedReasonsField?.fieldValues,
      isRequired: discardedReasonsField?.required
    };
  } else if (selectedStatus?.logicRole.includes("ON HOLD" /* ON_HOLD */)) {
    return { values: onHoldReasonsField?.fieldValues, isRequired: onHoldReasonsField?.required };
  } else {
    return { values: [], isRequired: false };
  }
}
function getAvailableUsers(dataModel) {
  const usersField = dataModel.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  return {
    values: usersField.values.filter((user) => !user.name.includes("- Deleted")),
    isRequired: usersField?.required
  };
}
function getStageField(dataModel, bobjectType) {
  if (!dataModel || !bobjectType) {
    return void 0;
  }
  const fieldsByBobjectType = dataModel.getFieldsByBobjectType(bobjectType);
  if (!fieldsByBobjectType)
    return void 0;
  return fieldsByBobjectType?.find(({ name }) => name.includes("Stage"));
}
function getIsSales(dataModel, bobject, bobjectType) {
  const stageField = getStageField(dataModel, bobjectType);
  const stage = bobject?.rawBobject[stageField?.id];
  return dataModel.findValueById(stage)?.name === "Sales";
}
const getInitialStatusId = (bobject, isSales, hasNoStatusPlan) => {
  if (bobject.fields) {
    if (hasNoStatusPlan) {
      return getValueFromLogicRole(
        bobject,
        FIELDS_LOGIC_ROLE[bobject.id.typeName].SALESFORCE_STATUS
      );
    }
    return isSales ? getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobject.id.typeName].SALES_STATUS) : getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobject.id.typeName].STATUS);
  } else {
    return hasNoStatusPlan ? bobject?.salesforceStatus || bobject?.salesforceStage : bobject?.id?.typeName === BobjectTypes.Opportunity ? bobject.status : isSales ? bobject.salesStatus : bobject.prospectingStatus;
  }
};
const getInitialStatus = (bobject, availableStatuses, isSales, hasNoStatusPlan) => {
  const initialStatusId = getInitialStatusId(bobject, isSales, hasNoStatusPlan);
  return availableStatuses.find((status) => {
    return [status.id, status.name, status.salesforceLabel].includes(initialStatusId);
  });
};
const getInitialReason = (bobject, availableReasons, initialStatus) => {
  if (!initialStatus || !Array.isArray(availableReasons?.values))
    return null;
  return availableReasons.values.find(
    ({ value: reasonId }) => Object.values(bobject.rawBobject).includes(reasonId)
  );
};
function forgeRawIfNotPresent(bobject) {
  if (!bobject.rawBobject) {
    bobject.rawBobject = bobject.raw.contents;
  }
  return bobject;
}
const handledEntities = {
  companyCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_COMPANY_STATUS,
  leadCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_LEAD_STATUS,
  opportunityCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE
};
function parseFields(dataModel, entityLogicRole) {
  const crmStatusField = dataModel.findFieldByLogicRole(entityLogicRole);
  return crmStatusField.values?.filter((crmStatus) => crmStatus.isEnabled).sort((a, b) => a.ordering < b.ordering ? -1 : 1);
}
function parseAccountFields(dataModel) {
  return Object.keys(handledEntities).reduce((acc, key) => {
    acc[key] = parseFields(dataModel, handledEntities[key]);
    return acc;
  }, {});
}
export const useSalesforceStatusPicklistValue = () => {
  const dataModel = useDataModel();
  return { ...parseAccountFields(dataModel) };
};
export const useStatus = (propBobject) => {
  const hasNoStatusPlanEnabled = useIsNoStatusPlanAccount();
  const salesforceStatusValues = useSalesforceStatusPicklistValue();
  const dataModel = useDataModel();
  const bobject = forgeRawIfNotPresent(propBobject);
  const bobjectType = bobject.id.typeName;
  const reasons = fetchReasons(
    bobjectType,
    getIsSales(dataModel, bobject, bobjectType),
    hasNoStatusPlanEnabled
  );
  const isSales = hasNoStatusPlanEnabled ? false : getIsSales(dataModel, bobject, bobjectType);
  const availableStatuses = getStatuses(
    bobjectType,
    isSales,
    dataModel,
    hasNoStatusPlanEnabled,
    salesforceStatusValues
  );
  const availableUsers = getAvailableUsers(dataModel);
  const initialStatus = getInitialStatus(
    bobject,
    availableStatuses,
    isSales,
    hasNoStatusPlanEnabled
  );
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const availableReasons = getAvailableReasons(bobjectType, selectedStatus, reasons);
  const initialReason = getInitialReason(bobject, availableReasons, initialStatus);
  const [selectedReason, setSelectedReason] = useState(initialReason);
  useEffect(() => {
    if (!selectedReason && initialReason) {
      setSelectedReason(initialReason);
    }
  }, [initialReason]);
  useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [propBobject?.id.value]);
  return {
    selectedReason,
    setSelectedReason,
    selectedStatus,
    setSelectedStatus,
    availableStatuses,
    availableReasons,
    availableUsers,
    isSales
  };
};
