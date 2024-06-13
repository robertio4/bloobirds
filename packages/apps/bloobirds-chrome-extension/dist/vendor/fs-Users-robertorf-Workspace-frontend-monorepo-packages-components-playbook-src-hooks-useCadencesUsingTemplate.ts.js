import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export const useCadencesUsingTemplate = (templateId) => {
  const { data: cadences, isValidating } = useSWR(
    templateId ? `/messaging/messagingTemplates/${templateId}/cadences` : null,
    (url) => api.get(url, {
      headers: { "Content-Type": "application/json" },
      data: {}
    })
  );
  const cadencesUsingTemplate = cadences?.data?.cadences;
  return { cadencesUsingTemplate, isValidating };
};
