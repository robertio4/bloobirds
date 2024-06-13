import { getI18n } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import {
  getAdminQuickStartGuideBlocks,
  getQuickStartGuideBlocks,
  UserPermission
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport4_lodash_isObject from "/vendor/.vite-deps-lodash_isObject.js__v--2eabab46.js"; const isObject = __vite__cjsImport4_lodash_isObject.__esModule ? __vite__cjsImport4_lodash_isObject.default : __vite__cjsImport4_lodash_isObject;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useActiveAccountId, useIsOTOAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveAccount.ts.js";
import { useActiveUserId, useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveUser.ts.js";
import { useCadenceV2Enabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useFeatureFlags.ts.js";
export const useGetUserHelpers = () => {
  const userId = useActiveUserId();
  const { data } = useSWR(
    `/utils/helpers/${userId}`,
    () => api.get("/utils/users/helpers").then((res) => res.data),
    {
      revalidateOnFocus: false
    }
  );
  return { helpers: data?.helpers };
};
export const useUserHelpers = (onGoalClick) => {
  const userId = useActiveUserId();
  const accountId = useActiveAccountId();
  const isLoggedIn = !!accountId;
  const { data, mutate, isLoading } = useSWR(
    userId && isLoggedIn ? `/utils/helpers/${userId}` : null,
    () => api.get("/utils/users/helpers").then((res) => res.data),
    {
      revalidateOnFocus: false
    }
  );
  const { createToast } = useToasts();
  const i18n = getI18n();
  const has = (key) => {
    return !isLoading && isObject(data?.helpers) && Object.prototype.hasOwnProperty.call(data?.helpers, key);
  };
  const get = (key) => {
    return isObject(data?.helpers) && data?.helpers[key];
  };
  const deleteHelper = (key) => {
    return api.delete("utils/users/helpers?helperKeys=" + key);
  };
  const { settings } = useActiveUserSettings(isLoggedIn);
  const cadencesV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const isOTOAccount = useIsOTOAccount();
  const isAccountAdmin = settings?.user?.accountAdmin;
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const quickStartGuideBlocks = getQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled);
  const adminQuickStartGuideBlocks = getAdminQuickStartGuideBlocks(
    hasCadencePermission,
    cadencesV2Enabled
  );
  function saveCustom(data2) {
    api.post("/utils/users/helpers/custom", data2).then(() => mutate());
  }
  const save = (key) => {
    if (!has(key)) {
      api.post("/utils/users/helpers/" + key).then(() => {
        const keys = isAccountAdmin ? adminQuickStartGuideBlocks.flatMap((guide) => guide.goals) : quickStartGuideBlocks.flatMap((guide) => guide.goals);
        const keySelected = keys.find((k) => k.key === key);
        if (keySelected && !isOTOAccount) {
          createToast({
            message: i18n?.t("helperKeys.goals.message") + i18n?.t(`helperKeys.goals.${keySelected.i18nKey}`),
            type: "reminder",
            icon: "check",
            iconColor: "extraCall",
            onClick: () => onGoalClick()
          });
        }
        mutate();
      });
    }
  };
  const forceSave = (key) => {
    return api.post("/utils/users/helpers/" + key).then(() => {
      mutate();
    });
  };
  const reset = (key) => {
    api.delete(
      "/utils/users/helpers?helperKeys=" + (key ? key : Object.keys(data?.helpers).filter(
        (helper) => !["delete"].includes(helper)
      ))
    ).then(() => mutate());
  };
  return {
    helpers: data?.helpers,
    mutate,
    save,
    saveCustom,
    has,
    get,
    deleteHelper,
    forceSave,
    reset,
    isLoading
  };
};
