import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export function useEmailMatching(emails) {
  const { data, error, isValidating } = useSWR("/messaging/emails/matchEmails", async (url) => {
    const response = await api.post(url, { emails });
    return response.data;
  });
  return {
    company: data?.company,
    lead: data?.lead,
    opportunity: data?.opportunity,
    error,
    isLoading: isValidating
  };
}
