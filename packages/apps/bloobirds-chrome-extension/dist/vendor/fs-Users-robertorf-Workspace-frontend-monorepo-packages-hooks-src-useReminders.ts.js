import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import {
  injectReferencesSearchProcess,
  getFieldByLogicRole,
  getValueFromLogicRole,
  getTextFromLogicRole,
  api
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useIsPersonAccountAsAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveAccount.ts.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveUser.ts.js";
import { useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useUserSettings.ts.js";
const REMINDERS_KEY = (accountId) => `bb-app-${accountId}-reminders`;
const storedReminders = JSON.parse(
  localStorage.getItem(REMINDERS_KEY(sessionStorage.getItem("accountId")))
);
const checkForString = (string, prefix = "") => {
  return string ? prefix + string : "";
};
function getRelatedBobjectInfo(task, isLeadBased) {
  const relatedCompany = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const relatedLead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const relatedOpportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE?.OPPORTUNITY)?.referencedBobject;
  const leadName = getTextFromLogicRole(relatedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const companyName = getTextFromLogicRole(relatedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const opportunityName = getTextFromLogicRole(
    relatedOpportunity,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME
  );
  const referenceString = checkForString(leadName) + (isLeadBased ? "" : checkForString(companyName, leadName ? " from " : "")) + checkForString(opportunityName, " in ");
  const getMainBobject = () => {
    if (relatedOpportunity)
      return relatedOpportunity;
    if (relatedLead)
      return relatedLead;
    if (relatedCompany)
      return relatedCompany;
    return { id: { value: null } };
  };
  const mainBobject = getMainBobject();
  return { bobjectId: mainBobject.id.value, referenceString };
}
const updateReminders = (reminderIds, accountId) => {
  try {
    return localStorage.setItem(REMINDERS_KEY(accountId), JSON.stringify(reminderIds));
  } catch (e) {
    return null;
  }
};
const remindersStateAtom = atom({
  key: "remindersNotNotified",
  default: storedReminders
});
export const useReminders = ({ setViewBobjectId }) => {
  const language = useActiveUserSettings()?.settings?.user.language;
  const isLeadBased = useIsPersonAccountAsAccount();
  const { createToast } = useToasts();
  const settings = useUserSettings();
  const accountId = settings?.account.id;
  const userSettings = { ...settings?.user };
  const [remindersState, setRemindersState] = useRecoilState(remindersStateAtom);
  const setSeenReminder = (taskId, scheduledDateTime) => {
    const alreadyStored = { ...remindersState };
    const alreadyShownReminder = !!alreadyStored && alreadyStored[taskId];
    if (!alreadyShownReminder) {
      alreadyStored[taskId] = scheduledDateTime;
      setRemindersState(alreadyStored);
      updateReminders(alreadyStored, accountId);
    }
  };
  const setEditedReminder = (taskId) => {
    const alreadyStored = remindersState || {};
    const alreadyShownReminder = !!alreadyStored[taskId];
    if (alreadyShownReminder) {
      const { [taskId]: _, ...newReminders } = alreadyStored;
      setRemindersState(newReminders);
      updateReminders(newReminders, accountId);
    }
  };
  const removeOldTasksFromLocalStorage = () => {
    const alreadyStored = { ...storedReminders };
    if (Object.keys(alreadyStored).length > 0) {
      Object.keys(alreadyStored).forEach((taskId) => {
        const taskScheduledDateTime = new Date(alreadyStored[taskId]).getTime();
        const currentDateTime = new Date().getTime();
        if (taskScheduledDateTime < currentDateTime) {
          delete alreadyStored[taskId];
        }
      });
      updateReminders(alreadyStored, accountId);
    }
  };
  const fetchTasks = () => {
    return api.post(`/bobjects/${settings.account?.id}/Task/search`, {
      injectReferences: true,
      query: {
        TASK__TASK_TYPE: [TASK_TYPE.NEXT_STEP, TASK_TYPE.PROSPECT_CADENCE],
        [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
          "__MATCH_EMPTY_ROWS__",
          TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO
        ],
        TASK__SCHEDULED_DATETIME: {
          query: {
            gte: spacetime().startOf("minute").format("iso-utc"),
            lte: spacetime().add(userSettings?.remindersBeforeMinutes, "minutes").endOf("minute").format("iso-utc")
          },
          searchMode: "RANGE__SEARCH"
        },
        TASK__STATUS: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
        TASK__ASSIGNED_TO: [userSettings.id]
      },
      columns: [
        TASK_FIELDS_LOGIC_ROLE.COMPANY,
        TASK_FIELDS_LOGIC_ROLE.LEAD,
        TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
        TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        TASK_FIELDS_LOGIC_ROLE.TITLE,
        TASK_FIELDS_LOGIC_ROLE.STATUS,
        TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
        TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
        TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO
      ],
      referencedColumns: [
        COMPANY_FIELDS_LOGIC_ROLE.NAME,
        LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
        OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME
      ],
      formFields: true,
      pageSize: 10
    });
  };
  const { data } = useSWR(
    userSettings && userSettings.remindersBeforeMinutes ? "/tasks/taskReminders" : null,
    fetchTasks,
    {
      refreshInterval: 6e4
    }
  );
  useEffect(() => {
    if (data && userSettings?.remindersEnabled) {
      const referencedData = injectReferencesSearchProcess(data.data);
      const notNotifiedTasks = referencedData.contents?.filter(
        (task) => remindersState ? !Object.keys(remindersState).includes(task.id.value) : true
      );
      notNotifiedTasks?.forEach((task) => {
        const relatedBobjectInfo = getRelatedBobjectInfo(task, isLeadBased);
        const scheduledDateTime = getValueFromLogicRole(
          task,
          TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME
        );
        const preciseDifference = getI18nSpacetimeLng(
          language,
          spacetime().startOf("minute")
        ).since(getI18nSpacetimeLng(language, spacetime(scheduledDateTime).startOf("minute")))?.precise;
        createToast({
          message: `Task due ${preciseDifference ?? "now: "} ${getTextFromLogicRole(
            task,
            TASK_FIELDS_LOGIC_ROLE.TITLE
          )}`,
          subtitle: relatedBobjectInfo.referenceString,
          duration: 5e4,
          type: "reminder",
          onClick: () => {
            setViewBobjectId?.(relatedBobjectInfo.bobjectId);
          },
          sound: userSettings?.remindersSoundEnabled ? "https://d38iwn7uw3305n.cloudfront.net/notification.mp3" : null
        });
        setSeenReminder(task.id.value, scheduledDateTime);
      });
      removeOldTasksFromLocalStorage();
    }
  }, [data]);
  return { setEditedReminder };
};
