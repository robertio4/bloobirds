import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
if (typeof chrome !== "undefined") {
  chrome?.storage?.sync?.set({ dataBackendUrl: "https://bobject-api.bloobirds.com" });
}
const accountDataModel = (dataModel) => ({
  getAccountId: () => dataModel?.accountId,
  getFieldsByBobjectType: (bobjectType) => dataModel?.types?.find((type) => type?.name === bobjectType),
  findValueById: (id) => dataModel?.types?.flatMap((type) => type?.fields)?.flatMap((field) => field?.values)?.find((value) => value?.id === id),
  findValueByLabel: (label) => dataModel?.types?.flatMap((type) => type?.fields)?.flatMap((field) => field?.values)?.find((value) => value?.name === label),
  findValueByLogicRole: (logicRole) => dataModel?.types?.flatMap((type) => type?.fields)?.flatMap((field) => field?.values)?.find((value) => value?.id === logicRole),
  findValuesByFieldId: (fieldId) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.id === fieldId)?.values,
  findValuesByFieldLogicRole: (fieldLogicRole) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.logicRole === fieldLogicRole)?.values,
  findFieldById: (id) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.id === id),
  findFieldByLogicRole: (logicRole) => dataModel?.types?.flatMap((type) => type?.fields)?.find((field) => field?.logicRole === logicRole)
});
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
export async function getBuyerPersonas() {
  try {
    const { data } = await api.get("/utils/service/view/idealCustomerProfile", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {}
    });
    return data;
  } catch (e) {
    return null;
  }
}
export async function getTargetMarkets() {
  try {
    const { data } = await api.get("/utils/service/view/targetMarket", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {}
    });
    return data;
  } catch (e) {
    return null;
  }
}
export async function searchUsers() {
  try {
    const { data } = await api.post("/utils/service/users/search", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {
        active: true
      }
    });
    return data;
  } catch (e) {
    return null;
  }
}
export async function searchLead(linkedInUrl) {
  try {
    const { data } = await api.get("/linkedin/search/leads", {
      params: { linkedInUrl }
    });
    return data;
  } catch (e) {
    return null;
  }
}
export async function searchLeadByQuery(query) {
  try {
    const { data } = await api.post("/linkedin/leads/query", {
      ...query
    });
    return data;
  } catch (e) {
    return null;
  }
}
export async function searchCompaniesByQuery(query) {
  try {
    const { data } = await api.post("/linkedin/companies/query", {
      ...query
    });
    return data;
  } catch (e) {
    return null;
  }
}
export async function searchOppsByQuery(query) {
  try {
    const { data } = await api.post(
      "/linkedin/opportunities/query",
      {
        ...query
      }
    );
    return data;
  } catch (e) {
    return null;
  }
}
export async function updateLeadSalesNavigatorUrl(bobjectId, salesNavigatorUrl) {
  return api.put(`/linkedin/leads/${bobjectId.objectId}/setSalesNavigatorUrl`, {
    salesNavigatorUrl
  });
}
export async function updateLeadLinkedInUrl(bobjectId, linkedInUrl) {
  return api.put(`/linkedin/leads/${bobjectId.objectId}/setLinkedInUrl`, {
    linkedInUrl
  });
}
export async function updateLead(bobjectId, linkedInUrl, salesNavigatorURL) {
  return api.put("/linkedin/leads/" + bobjectId?.objectId, {
    salesNavigatorUrl: salesNavigatorURL || null,
    linkedInUrl: linkedInUrl || null
  });
}
