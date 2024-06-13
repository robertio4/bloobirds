import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useCustomTasks, useDebouncedCallback } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectTypes,
  ContactViewSubTab,
  TypeSearch
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, injectReferencesSearchProcess } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { getQuery, parseLastActivity } from "/src/content/components/contactView/components/lastActivityOverview/utils/lastActivity.utils.ts.js";
const LAST_ACTIVITY_COLUMNS = [
  ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  ACTIVITY_FIELDS_LOGIC_ROLE.TIME
];
const fetchLastActivity = async (bobjectIdFields, leadsIds, companyId, time) => {
  const { data } = await api.post(
    `/bobjects/${bobjectIdFields.accountId}/Activity/${TypeSearch.SEARCH}`,
    {
      ...getQuery(bobjectIdFields, leadsIds, companyId, time),
      formFields: true,
      page: 0,
      pageSize: 1,
      columns: LAST_ACTIVITY_COLUMNS,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: "DESC"
        }
      ]
    }
  );
  return data;
};
export const useLastActivity = (bobjectId, leadsIds, companyId) => {
  const { setExtendedContext } = useExtensionContext();
  const { setActiveSubTab } = useContactViewContext();
  const tHook = useTranslation();
  const { data, mutate } = useSWR(
    `lastActivity/${bobjectId.value}`,
    () => {
      const time = new Date();
      return fetchLastActivity(bobjectId, leadsIds, companyId, time);
    },
    {
      revalidateOnFocus: true
    }
  );
  const { getCustomTaskLogicRole } = useCustomTasks();
  const debouncedMutate = useDebouncedCallback(mutate, 1e3, [mutate]);
  useSubscribeListeners(BobjectTypes.Activity, debouncedMutate);
  const { contents: lastActivity } = injectReferencesSearchProcess(data);
  if (!lastActivity)
    return null;
  const { onClick, ...parsedActivity } = parseLastActivity(
    lastActivity ?? [],
    tHook,
    getCustomTaskLogicRole,
    (extendedContext) => {
      setActiveSubTab(ContactViewSubTab.ACTIVITIES);
      setExtendedContext(extendedContext);
    }
  );
  return {
    ...parsedActivity,
    onClick,
    hasNoActivity: lastActivity?.length === 0
  };
};
