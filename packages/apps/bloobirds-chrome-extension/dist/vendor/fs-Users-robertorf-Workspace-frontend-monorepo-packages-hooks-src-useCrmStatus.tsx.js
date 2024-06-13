var _s = $RefreshSig$();
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const useCrmStatus = (accountId, crmObjectTypes, crm, hasNoStatusPlanEnabled) => {
  _s();
  const fetcher = (params) => api.post(params[0], {
    crmObjects: crmObjectTypes,
    crm
  }).then((response) => {
    return response?.data;
  });
  const {
    data: crmStatusList,
    mutate: mutateList,
    isLoading
  } = useSWR(hasNoStatusPlanEnabled && [`/utils/crmStatus/getCrmStatusList/` + accountId, crmObjectTypes], fetcher);
  return {
    crmStatusList,
    mutateList,
    isLoading
  };
};
_s(useCrmStatus, "rfAsN220iUNZzpZxoezHoMU50Nk=", false, function() {
  return [useSWR];
});
