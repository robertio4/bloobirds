import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useController, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useToasts, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import {
  useActiveUserSettings,
  useAddToCalendar,
  useCustomTasks,
  useMinimizableModal,
  useReminders,
  useUserHelpers
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  ExtensionHelperKeys,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import {
  api,
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useConfirmDeleteModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
const REMINDERS_KEY = (accountId) => `bb-app-${accountId}-reminders`;
export const useTaskForm = (modalId) => {
  const { setEditedReminder } = useReminders({ setViewBobjectId: () => void 0 });
  const { control, watch, getValues, handleSubmit } = useForm();
  const {
    closeModal,
    data: { lead, opportunity, company, bobjectId, companyContext, ...otherData },
    onSave,
    onClose,
    bobject,
    minimize
  } = useMinimizableModal(modalId);
  const { settings } = useActiveUserSettings();
  const accountId = settings?.account?.id;
  const { customTasks } = useCustomTasks({ disabled: true });
  const { has, saveCustom } = useUserHelpers();
  const { setAddToCalendarState, openAddToCalendarModal } = useAddToCalendar();
  const taskBobject = otherData?.task;
  const taskTitle = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const taskDateTime = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const taskIsCall = getFieldByLogicRole(taskBobject, TASK_ACTION.CALL)?.valueLogicRole === TASK_ACTION_VALUE.CALL_YES;
  const taskIsEmail = getFieldByLogicRole(taskBobject, TASK_ACTION.EMAIL)?.valueLogicRole === TASK_ACTION_VALUE.EMAIL_YES;
  const customTaskId = getFieldByLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find((ct) => ct.id === customTaskId?.value);
  const getDefaultActionType = () => {
    if (taskIsCall) {
      return "CALL";
    }
    if (taskIsEmail) {
      return "EMAIL";
    }
    if (customTask) {
      return customTask?.id;
    }
    return "TASK";
  };
  const taskPriority = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const taskRelatedBobject = getReferencedBobject(taskBobject)?.id?.value !== taskBobject?.id?.value && getReferencedBobject(taskBobject);
  const taskRelatedBobjectName = getTextFromLogicRole(
    taskRelatedBobject,
    FIELDS_LOGIC_ROLE[taskRelatedBobject?.id?.typeName]?.FULL_NAME
  ) || getTextFromLogicRole(
    taskRelatedBobject,
    FIELDS_LOGIC_ROLE[taskRelatedBobject?.id?.typeName]?.NAME
  );
  const isEditionModal = !!bobjectId;
  const defaultRelated = (otherData?.related ? otherData?.related : opportunity ? opportunity?.id?.value : lead ? lead?.id?.value : company ? company?.id?.value : void 0) || taskRelatedBobject?.id?.value;
  const defaultName = (otherData?.relatedName ? otherData?.relatedName : lead ? lead?.fullName || lead?.name || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) : company ? company?.name || getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) : opportunity ? opportunity?.name || getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME) : null) || taskRelatedBobjectName;
  const defaultValues = {
    title: otherData[TASK_FIELDS_LOGIC_ROLE.TITLE] || taskTitle,
    dateTime: otherData[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME] || taskDateTime || new Date(),
    priority: otherData[TASK_FIELDS_LOGIC_ROLE.PRIORITY] || taskPriority || TASK_PRIORITY_VALUE.NO_PRIORITY,
    actionType: otherData[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE] || getDefaultActionType() || "TASK",
    assignedTo: otherData[TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO] || settings?.user?.id
  };
  const [nameSelected, setNameSelected] = useState(defaultName);
  const [assignedToId, setAssignedToId] = useState(defaultValues.assignedTo);
  const [isSubmitting, setIsSubmitting] = useState();
  const { createToast } = useToasts();
  const { t } = useTranslation("translation", { keyPrefix: "tasks" });
  const {
    visible: datePickerVisible,
    setVisible: setDatePickerVisible,
    ref: datePickerRef
  } = useVisible();
  const {
    field: { value: actionType, onChange: actionTypeOnChange }
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE,
    defaultValue: defaultValues.actionType
  });
  const {
    field: { value: priority, onChange: priorityOnChange }
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
    defaultValue: defaultValues.priority
  });
  const {
    field: { value: title, onChange: titleOnChange }
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.TITLE,
    defaultValue: defaultValues.title
  });
  const {
    field: { value: taskDate, onChange: taskDateOnChange }
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    defaultValue: new Date(defaultValues.dateTime)
  });
  const {
    field: { onChange: relatedOnChange }
  } = useController({
    control,
    name: "related",
    defaultValue: defaultRelated
  });
  const titleValue = watch(TASK_FIELDS_LOGIC_ROLE.TITLE);
  const isDirty = useMemo(() => {
    return titleValue && titleValue !== "";
  }, [titleValue]);
  const getBobjectType = () => {
    if (opportunity)
      return BobjectTypes.Opportunity;
    if (company)
      return BobjectTypes.Company;
    if (lead)
      return BobjectTypes.Lead;
  };
  const handleSave = () => {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Task }
        })
      );
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: getBobjectType() }
        })
      );
    }, 1e3);
    onSave?.();
  };
  const handleClose = () => {
    closeModal?.();
    onClose?.();
  };
  const onSubmit = (isWebapp) => {
    setIsSubmitting(true);
    const { related, ...rest } = getValues();
    const dataToCreate = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: rest[TASK_FIELDS_LOGIC_ROLE.TITLE],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedToId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: rest[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME],
      [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: rest[TASK_FIELDS_LOGIC_ROLE.PRIORITY]
    };
    const actionType2 = rest[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE];
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.TASK_TYPE] = TASK_TYPE.NEXT_STEP;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL] = actionType2 === "CALL" ? TASK_ACTION_VALUE.CALL_YES : null;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL] = actionType2 === "EMAIL" ? TASK_ACTION_VALUE.EMAIL_YES : null;
    if (actionType2 !== "TASK" && actionType2 !== "CALL" && actionType2 !== "EMAIL") {
      dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] = TASK_ACTION_VALUE.CUSTOM_TASK_YES;
      dataToCreate[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] = actionType2;
    }
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] ||= TASK_ACTION_VALUE.CUSTOM_TASK_NO;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] ||= null;
    if (related) {
      if (related?.includes("Lead")) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = companyContext?.id?.value;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes("Company")) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = null;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes("Opportunity")) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = companyContext?.id?.value;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = null;
      }
    }
    if (!isEditionModal) {
      api.post(`/bobjects/${accountId}/Task`, {
        contents: { ...dataToCreate },
        params: {}
      }).then(() => {
        setIsSubmitting(false);
        createToast({ message: t("toasts.success"), type: "success" });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_TASK_FROM_NEW_TASK_MODAL);
        handleSave();
        closeModal();
      }).catch(() => {
        setIsSubmitting(false);
      });
      if (isWebapp) {
        setAddToCalendarState({
          dateTime: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME] || new Date(),
          title: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.TITLE],
          leadId: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.LEAD],
          companyId: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.COMPANY],
          bobjectType: related?.split("/")[1]
        });
        openAddToCalendarModal();
      }
    } else {
      api.patch(`/bobjects/${bobjectId}/raw`, {
        contents: { ...dataToCreate },
        params: {}
      }).then(() => {
        const remindersKey = REMINDERS_KEY(accountId);
        const storedReminders = localStorage.getItem(remindersKey);
        if (storedReminders && Object.keys(JSON.parse(storedReminders)).includes(bobjectId)) {
          setEditedReminder(bobjectId);
        }
        setIsSubmitting(false);
        createToast({ message: t("toasts.updateSuccess"), type: "success" });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_UPDATE_TASK_FROM_NEW_TASK_MODAL);
        handleSave();
        closeModal();
      }).catch(() => {
        setIsSubmitting(false);
      });
    }
  };
  const { openDeleteModal } = useConfirmDeleteModal();
  function handleDelete() {
    openDeleteModal(
      taskBobject,
      false,
      () => {
      },
      () => {
        createToast({ message: t("toasts.deleteSuccess"), type: "success" });
        handleSave();
        closeModal();
      }
    );
  }
  return {
    isEditionModal,
    taskId: bobjectId,
    title,
    titleOnChange,
    actionType,
    actionTypeOnChange,
    forceOpened: otherData?.forceOpened,
    priority,
    priorityOnChange: (value) => {
      priorityOnChange(value);
      if (!has(ExtensionHelperKeys.CREATE_TASKS_TOOLTIP)) {
        saveCustom({
          key: ExtensionHelperKeys.CREATE_TASKS_TOOLTIP,
          data: new Date().toISOString()
        });
      }
    },
    taskDate,
    taskDateOnChange,
    datePickerVisible,
    datePickerRef,
    setDatePickerVisible,
    assignedToId,
    setAssignedToId,
    relatedOnChange,
    nameSelected,
    setNameSelected,
    formMethods: { isSubmitting, isDirty, handleSubmit, getValues },
    onSubmit,
    handleDelete,
    handleMinimize: () => minimize({
      title: `${t("newTask")} ${nameSelected || ""}`,
      data: {
        ...getValues(),
        [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedToId,
        relatedName: nameSelected
      },
      bobject
    }),
    defaultName,
    defaultRelated,
    defaultValues,
    closeModal,
    handleClose
  };
};
