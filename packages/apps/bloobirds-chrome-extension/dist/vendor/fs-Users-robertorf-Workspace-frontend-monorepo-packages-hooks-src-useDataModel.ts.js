import {
  BobjectTypes
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
if (typeof chrome !== "undefined") {
  chrome.storage?.sync?.set({ dataBackendUrl: "https://bobject-api.bloobirds.com" });
}
export function useDataModel(key = "/utils/service/datamodel", isLoggedIn = true) {
  const { data } = useSWR(isLoggedIn ? key : null, getDataModel, {
    revalidateOnFocus: false
  });
  return data;
}
const accountDataModel = (dataModel) => {
  return {
    getAccountId: () => dataModel?.accountId,
    getFieldsByBobjectType: (bobjectType) => dataModel?.types?.find((type) => type?.name === bobjectType)?.fields,
    findValueById: (id) => dataModel?.types?.flatMap((type) => type?.fields)?.flatMap((field) => field?.values)?.find((value) => value?.id === id),
    findValueByLabel: (label) => dataModel?.types?.flatMap((type) => type?.fields)?.flatMap((field) => field?.values)?.find((value) => value?.name === label),
    findValueByLogicRole: (logicRole) => dataModel?.types?.flatMap((type) => type?.fields)?.flatMap((field) => field?.values)?.find((value) => value?.logicRole === logicRole),
    findValuesByFieldId: (fieldId) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.id === fieldId)?.values,
    findValuesByFieldLogicRole: (fieldLogicRole) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.logicRole === fieldLogicRole)?.values,
    findFieldById: (id) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.id === id),
    findFieldByLogicRole: (logicRole) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.logicRole === logicRole),
    findFieldsByTypeAndBobjectType: (bobjectType, fieldType) => dataModel?.types?.find((type) => type?.name === bobjectType)?.fields?.filter((field) => field?.fieldType === fieldType),
    findMainBobjectTypes: () => dataModel?.types?.filter(
      (type) => [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(
        type?.name
      )
    ),
    all: () => dataModel?.types
  };
};
export async function getDataModel() {
  try {
    const { data } = await api.get("/utils/service/datamodel", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {}
    });
    return accountDataModel(data);
  } catch (e) {
    return null;
  }
}
