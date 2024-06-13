import { useCrmStatus, useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, crmObjects, FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { mergeObjects } from "/vendor/.vite-deps-swr__internal.js__v--822e3570.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
export const useSalesforceStatusFilter = (tabBobject) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const accountId = settings?.account?.id;
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const salesForceStatusField = dataModel?.findFieldByLogicRole(
    FIELDS_LOGIC_ROLE[tabBobject].SALESFORCE_STATUS
  );
  const { crmStatusList } = useCrmStatus(
    accountId,
    crmObjects.map((crmObject) => crmObject.crmObject),
    "SALESFORCE",
    isNoStatusPlanAccount
  );
  const organizeStatusIdsByBobjectType = (data) => {
    const result = {};
    data?.forEach((obj) => {
      const objectType = obj.crmObjectType;
      const statusMappingList = obj.crmStatusMappingList;
      const statusLabelsByCategory = {};
      statusMappingList?.forEach((status) => {
        const categoryId = status.statusCategoryId;
        if (!statusLabelsByCategory[categoryId]) {
          statusLabelsByCategory[categoryId] = [];
        }
        statusLabelsByCategory[categoryId].push(status.crmStatusLabel);
      });
      result[objectType] = statusLabelsByCategory;
    });
    return {
      [BobjectTypes.Company]: result?.["Account"],
      [BobjectTypes.Lead]: mergeObjects(result?.["Lead"], result?.["Contact"]),
      [BobjectTypes.Opportunity]: result?.["Opportunity"]
    };
  };
  const parseSalesforceStatus = (query, bobjectType) => {
    let salesforceStatusQuery = [];
    if (isNoStatusPlanAccount && query && query?.[salesForceStatusField?.id]) {
      const crmStatusIdsByBobjectType = organizeStatusIdsByBobjectType(crmStatusList);
      const queriedFields = Object.keys(query);
      queriedFields.forEach((key) => {
        if (key === salesForceStatusField?.id) {
          query[key]?.forEach((value) => {
            salesforceStatusQuery = [
              ...salesforceStatusQuery,
              ...crmStatusIdsByBobjectType[bobjectType ?? tabBobject]?.[value] ?? []
            ];
          });
        }
      });
      return {
        ...query,
        [salesForceStatusField?.id]: {
          query: salesforceStatusQuery.flat(),
          searchMode: "EXACT__SEARCH"
        }
      };
    } else {
      return query;
    }
  };
  return { parseSalesforceStatus, organizeStatusIdsByBobjectType };
};
