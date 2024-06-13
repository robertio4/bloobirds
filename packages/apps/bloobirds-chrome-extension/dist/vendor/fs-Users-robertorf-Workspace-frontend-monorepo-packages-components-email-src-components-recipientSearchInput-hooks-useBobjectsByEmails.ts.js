import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
function getBobjectsByEmails(accountId, bobjectType, fields, emails) {
  const queries = fields.map((field) => ({ [field]: emails }));
  return api.post("/bobjects/" + accountId + "/" + bobjectType + "/search", {
    query: {},
    queries,
    formFields: true,
    pageSize: 50
  });
}
export const useBobjectsByEmails = (accountId, bobjectType, fields, emails) => {
  const { data, isValidating } = useSWR(
    accountId && bobjectType && fields && emails ? accountId + bobjectType + emails : null,
    () => getBobjectsByEmails(accountId, bobjectType, fields, emails)
  );
  const bobjects = data?.data?.contents;
  return { bobjects, isValidating };
};
