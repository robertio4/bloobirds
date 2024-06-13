import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { CustomUserHelperKeys, UserHelperTooltipsKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveUser.ts.js";
import { useCopilotEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useFeatureFlags.ts.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useUserHelpers.ts.js";
export const COPILOT__HOSTNAME = "http://localhost:8000";
export const useTemplateInsights = ({
  content,
  templateId,
  store
}) => {
  const { isEnabled } = useCopilot();
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState(void 0);
  const [refresh, setRefresh] = useState(false);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    if (isEnabled && reload) {
      setIsLoading(true);
      api.post(
        `/copilot/templates/similarity?store=${store ? "true" : "false"}&refresh=${refresh}`,
        {
          asset_id: templateId ?? null,
          content: content ?? null
        }
      ).then((response) => {
        setIsLoading(false);
        setInsights(response.data);
        setReload(false);
        setRefresh(false);
        return response.data;
      });
    }
  }, [reload, isEnabled]);
  useEffect(() => {
    if (refresh) {
      setReload(true);
    }
  }, [refresh]);
  return {
    insights,
    isLoading,
    refresh: () => {
      setRefresh(true);
    }
  };
};
export const useCopilot = () => {
  const { save, has, deleteHelper, mutate, saveCustom, helpers } = useUserHelpers();
  const { settings } = useActiveUserSettings();
  const isFlagEnabled = useCopilotEnabled(settings?.account?.id);
  useEffect(() => {
    if (helpers && helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]) {
      setLanguage(helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]);
    }
  }, [helpers]);
  const [language, setLanguage] = useState(
    helpers && helpers[CustomUserHelperKeys.COPILOT_LANGUAGE] ? helpers[CustomUserHelperKeys.COPILOT_LANGUAGE] : "english"
  );
  const enabled = has(UserHelperTooltipsKeys.COPILOT_ENABLED);
  return {
    isEnabled: isFlagEnabled && enabled,
    setEnabled: (value) => {
      if (value) {
        save(UserHelperTooltipsKeys.COPILOT_ENABLED);
      } else {
        deleteHelper(UserHelperTooltipsKeys.COPILOT_ENABLED).then(() => {
          mutate();
        });
      }
    },
    language,
    setLanguage: (newLanguage) => {
      saveCustom({ key: CustomUserHelperKeys.COPILOT_LANGUAGE, data: newLanguage });
      setLanguage(newLanguage);
    }
  };
};
