import { useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";

import { useToasts, useVisible } from "@bloobirds-it/flamingo-ui";
import {
  useActiveUserSettings,
  useAddToCalendar,
  useCustomTasks,
  useMinimizableModal,
  useReminders,
  useUserHelpers
} from "@bloobirds-it/hooks";
import {
  BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE,
  ExtensionHelperKeys,
  FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE
} from "@bloobirds-it/types";
import {
  api,
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole
} from "@bloobirds-it/utils";
import { useConfirmDeleteModal } from "@bloobirds-it/bobjects";
import mixpanel from "mixpanel-browser";
import { useTranslation } from "react-i18next";

const REMINDERS_KEY = (accountId: string) => `bb-app-${accountId}-reminders`;

export const useTaskForm = (modalId: string) => {
  const {setEditedReminder} = useReminders({setViewBobjectId: ()=>undefined});
  const { control, watch, getValues, handleSubmit } = useForm();
  const {
    closeModal,
    // @ts-ignore
    data: { lead, opportunity, company, bobjectId, companyContext, ...otherData },
    onSave,
    onClose,
    bobject,
    minimize,
  } = useMinimizableModal(modalId);
  const { settings } = useActiveUserSettings();
  const accountId = settings?.account?.id;
  const { customTasks } = useCustomTasks({ disabled: true });
  const { has, saveCustom } = useUserHelpers();
  const { setAddToCalendarState, openAddToCalendarModal } = useAddToCalendar();

  // @ts-ignore
  const taskBobject = otherData?.task;
  const taskTitle = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const taskDateTime = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const taskIsCall = getFieldByLogicRole(taskBobject, TASK_ACTION.CALL)?.valueLogicRole === TASK_ACTION_VALUE.CALL_YES;
  const taskIsEmail = getFieldByLogicRole(taskBobject, TASK_ACTION.EMAIL)?.valueLogicRole === TASK_ACTION_VALUE.EMAIL_YES;
  const customTaskId = getFieldByLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);

  const getDefaultActionType = () => {
    if (taskIsCall) {
      return 'CALL';
    }
    if (taskIsEmail) {
      return 'EMAIL';
    }
    if (customTask) {
      return customTask?.id;
    }
    return 'TASK';
  };

  const taskPriority = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.PRIORITY);

  const taskRelatedBobject =
    getReferencedBobject(taskBobject)?.id?.value !== taskBobject?.id?.value &&
    getReferencedBobject(taskBobject);
  const taskRelatedBobjectName =
    getTextFromLogicRole(
      taskRelatedBobject,
      // @ts-ignore
      FIELDS_LOGIC_ROLE[taskRelatedBobject?.id?.typeName]?.FULL_NAME,
    ) ||
    getTextFromLogicRole(
      taskRelatedBobject,
      // @ts-ignore
      FIELDS_LOGIC_ROLE[taskRelatedBobject?.id?.typeName]?.NAME,
    );
  const isEditionModal = !!bobjectId;
  const defaultRelated =
    // @ts-ignore
    (otherData?.related
      ? // @ts-ignore
      otherData?.related
      : opportunity
        ? opportunity?.id?.value
        : lead
          ? lead?.id?.value
          : company
            ? company?.id?.value
            : undefined) || taskRelatedBobject?.id?.value;
  const defaultName =
    // @ts-ignore
    (otherData?.relatedName
      ? // @ts-ignore
      otherData?.relatedName
      : lead
        ? lead?.fullName || lead?.name || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
        : company
          ? company?.name || getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
          : opportunity
            ? opportunity?.name || getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME)
            : null) || taskRelatedBobjectName;

  const defaultValues = {
    title: otherData[TASK_FIELDS_LOGIC_ROLE.TITLE] || taskTitle,
    dateTime: otherData[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME] || taskDateTime || new Date(),
    priority:
      otherData[TASK_FIELDS_LOGIC_ROLE.PRIORITY] ||
      taskPriority ||
      TASK_PRIORITY_VALUE.NO_PRIORITY,
    actionType: otherData[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE] || getDefaultActionType() || 'TASK',
    assignedTo: otherData[TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO] || settings?.user?.id,
  };

  const [nameSelected, setNameSelected] = useState<string>(defaultName);
  const [assignedToId, setAssignedToId] = useState<string>(defaultValues.assignedTo);
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const { createToast } = useToasts();
  const {t} = useTranslation('translation', { keyPrefix: 'tasks' });

  const {
    visible: datePickerVisible,
    setVisible: setDatePickerVisible,
    ref: datePickerRef,
  } = useVisible();

  const {
    field: { value: actionType, onChange: actionTypeOnChange },
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE,
    defaultValue: defaultValues.actionType,
  });

  const {
    field: { value: priority, onChange: priorityOnChange },
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
    defaultValue: defaultValues.priority,
  });

  const {
    field: { value: title, onChange: titleOnChange },
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.TITLE,
    defaultValue: defaultValues.title,
  });

  const {
    field: { value: taskDate, onChange: taskDateOnChange },
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    defaultValue: new Date(defaultValues.dateTime),
  });

  const {
    field: { onChange: relatedOnChange },
  } = useController({
    control,
    name: 'related',
    defaultValue: defaultRelated,
  });

  const titleValue = watch(TASK_FIELDS_LOGIC_ROLE.TITLE);
  const isDirty = useMemo(() => {
    return titleValue && titleValue !== '';
  }, [titleValue]);

  const getBobjectType = () => {
    if (opportunity) return BobjectTypes.Opportunity;
    if (company) return BobjectTypes.Company;
    if (lead) return BobjectTypes.Lead;
  };

  const handleSave = () => {
    setTimeout(()=> {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Task },
        }),
      );
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: getBobjectType() },
        }),
      );
    }, 1000)
    onSave?.();
  };

  const handleClose = () => {
    closeModal?.();
    onClose?.();
  }

  const onSubmit = (isWebapp:boolean) => {
    setIsSubmitting(true);
    const { related, ...rest } = getValues();

    const dataToCreate = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: rest[TASK_FIELDS_LOGIC_ROLE.TITLE],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedToId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: rest[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME],
      [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: rest[TASK_FIELDS_LOGIC_ROLE.PRIORITY],
    };

    const actionType = rest[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE];

    dataToCreate[TASK_FIELDS_LOGIC_ROLE.TASK_TYPE] = TASK_TYPE.NEXT_STEP;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL] = actionType === 'CALL' ? TASK_ACTION_VALUE.CALL_YES : null;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL] = actionType === 'EMAIL' ? TASK_ACTION_VALUE.EMAIL_YES : null;

    if (actionType !== 'TASK' && actionType !== 'CALL' && actionType !== 'EMAIL') {
      dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] = TASK_ACTION_VALUE.CUSTOM_TASK_YES;
      dataToCreate[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] = actionType;
    }

    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] ||= TASK_ACTION_VALUE.CUSTOM_TASK_NO;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] ||= null;

    if (related) {
      if (related?.includes('Lead')) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = companyContext?.id?.value;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes('Company')) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = null;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes('Opportunity')) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = companyContext?.id?.value;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = null;
      }
    }
    if (!isEditionModal) {
      api
        .post(`/bobjects/${accountId}/Task`, {
          contents: { ...dataToCreate },
          params: {},
        })
        .then(() => {
          setIsSubmitting(false);
          createToast({ message: t('toasts.success'), type: 'success' });
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_TASK_FROM_NEW_TASK_MODAL);
          handleSave();
          closeModal();
        })
        .catch(() => {
          setIsSubmitting(false);
        });

      if (isWebapp) {
        setAddToCalendarState({
          dateTime: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME] || new Date(),
          title: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.TITLE],
          leadId: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.LEAD],
          companyId: dataToCreate?.[TASK_FIELDS_LOGIC_ROLE.COMPANY],
          bobjectType: related?.split('/')[1],
        });
        openAddToCalendarModal();
      }
    } else {
      api
        .patch(`/bobjects/${bobjectId}/raw`, {
          contents: { ...dataToCreate },
          params: {},
        })
        .then(() => {
          const remindersKey = REMINDERS_KEY(accountId);
          const storedReminders = localStorage.getItem(remindersKey);
          if(storedReminders && Object.keys(JSON.parse(storedReminders)).includes(bobjectId)){
            setEditedReminder(bobjectId)
          }
          setIsSubmitting(false);
          createToast({ message:  t('toasts.updateSuccess'), type: 'success' });
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_UPDATE_TASK_FROM_NEW_TASK_MODAL);

          handleSave();
          closeModal();
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    }
  };

  const {openDeleteModal} = useConfirmDeleteModal()

  function handleDelete() {
    openDeleteModal(
      taskBobject,
       false,
       () => {},
       () => {
        createToast({ message: t('toasts.deleteSuccess'), type: 'success' });
        handleSave();
        closeModal()
      },
    )
  }

  return {
    isEditionModal,
    taskId: bobjectId,
    title,
    titleOnChange,
    actionType,
    actionTypeOnChange,
    priority,
    priorityOnChange: (value: any) => {
      priorityOnChange(value)
      if(!has(ExtensionHelperKeys.CREATE_TASKS_TOOLTIP)) {
        saveCustom({
          key: ExtensionHelperKeys.CREATE_TASKS_TOOLTIP,
          data: new Date().toISOString()
        })
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
    handleMinimize: () =>
      minimize({
        title: `${t('newTask')} ${nameSelected || ''}`,
        data: {
          ...getValues(),
          [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedToId,
          relatedName: nameSelected,
        },
        bobject,
      }),
    defaultName,
    defaultRelated,
    defaultValues,
    closeModal,
    handleClose
  };
};
