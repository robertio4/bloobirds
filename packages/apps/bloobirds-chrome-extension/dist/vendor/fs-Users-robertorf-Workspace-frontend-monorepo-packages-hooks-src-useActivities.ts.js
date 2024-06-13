import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { createToast } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  LEAD_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  SessionStorageKeys
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useSessionStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useSessionStorage.ts.js";
import { useUserPhoneNumbers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useUserPhoneNumbers.ts.js";
import { useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useUserSettings.ts.js";
export const useActivities = () => {
  const { t } = useTranslation("translation", { keyPrefix: "activityTimelineItem.toasts.created" });
  const settings = useUserSettings();
  const hasSettingActive = settings?.account?.createActivitiesWhenCompletingCallTasks;
  const { get } = useSessionStorage();
  const lastUsedPhone = get(SessionStorageKeys.LastPhoneUsed);
  const { userPhones } = useUserPhoneNumbers();
  const getMatchingPrefixPhone = (leadPhone) => {
    if (!leadPhone)
      return;
    return userPhones?.find(
      ({ phoneNumber }) => phoneNumber?.substring(0, 3) === leadPhone?.substring(0, 3)
    );
  };
  const logActivityFromTask = ({
    taskId,
    callback
  }) => {
    if (!hasSettingActive)
      return;
    api.get("/bobjects/" + taskId + "/form?injectReferences=true").then((response) => {
      const task = response.data;
      const accountId = task?.id?.accountId;
      const opportunityId = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY);
      const leadId = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD);
      const companyId = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY);
      const opportunity = task?.referencedBobjects?.[opportunityId];
      const lead = task?.referencedBobjects?.[leadId];
      const company = task?.referencedBobjects?.[companyId];
      const leadPhoneNumber = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.PHONE);
      const userPhone = lastUsedPhone ?? getMatchingPrefixPhone(leadPhoneNumber)?.phoneNumber ?? userPhones[0]?.phoneNumber ?? null;
      api.post(`/bobjects/${accountId}/Activity`, {
        contents: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES.CALL,
          [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: ACTIVITY_DIRECTION.OUTGOING,
          [ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME]: new Date(),
          [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: getValueFromLogicRole(
            task,
            TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO
          ),
          [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: getValueFromLogicRole(
            task,
            TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY
          ),
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: getValueFromLogicRole(
            task,
            TASK_FIELDS_LOGIC_ROLE.LEAD
          ),
          [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: getValueFromLogicRole(
            task,
            TASK_FIELDS_LOGIC_ROLE.COMPANY
          ),
          [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER]: leadPhoneNumber,
          [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_USER_PHONE_NUMBER]: userPhone
        },
        params: {}
      }).then(({ data }) => {
        api.get("/bobjects/" + data?.value + "/form?injectReferences=true").then(({ data: activity }) => {
          callback?.(activity, opportunity ?? lead ?? company);
        });
        createToast({ type: "success", message: t("success") });
      }).catch(() => {
        createToast({ type: "error", message: t("error") });
      });
    });
  };
  return { logActivityFromTask };
};
