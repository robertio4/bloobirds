import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { UserHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, fetchLanguages } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveUser.ts.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useUserHelpers.ts.js";
export const useLanguage = () => {
  const userId = useActiveUserId();
  const { t } = useTranslation();
  const { createToast } = useToasts();
  const [languages, setLanguages] = useState([]);
  const { has, save } = useUserHelpers();
  useEffect(() => {
    fetchLanguages().then((languages2) => {
      setLanguages(languages2);
    });
  }, []);
  const updateLanguage = (language) => {
    api.patch(`/utils/service/users/${userId}/language/${language}`, {}).then(() => {
      if (!has(UserHelperKeys.CHOOSE_LANGUAGE)) {
        save(UserHelperKeys.CHOOSE_LANGUAGE);
      }
      createToast({
        message: t("leftBar.successChangeLng", {
          language: t(`languages.${language}`)
        }),
        type: "success"
      });
    }).catch(() => {
      createToast({
        message: t("leftBar.errorChangeLng", {
          language: t(`languages.${language}`)
        }),
        type: "error"
      });
    });
  };
  return {
    languages,
    updateLanguage
  };
};
