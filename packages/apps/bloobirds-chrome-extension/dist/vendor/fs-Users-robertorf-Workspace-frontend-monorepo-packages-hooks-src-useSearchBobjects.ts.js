import { api, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const useSearchBobjects = ({
  searchValue,
  accountId,
  callback,
  numberOfResults = 20,
  bobjectTypes = ["Company", "Lead", "Opportunity"]
}) => {
  const { data: response } = useSWR(
    searchValue && searchValue !== "" ? ["bobjectSelector", searchValue] : null,
    () => {
      return api.post(`/bobjects/${accountId}/global-search`, {
        query: searchValue,
        bobjectTypes,
        numberOfResults
      }).then((response2) => {
        callback?.();
        return response2;
      });
    },
    { use: [keepPreviousResponse] }
  );
  const results = response?.data?.results;
  const totalMatching = response?.data?.totalMatching;
  return { results, totalMatching, response };
};
