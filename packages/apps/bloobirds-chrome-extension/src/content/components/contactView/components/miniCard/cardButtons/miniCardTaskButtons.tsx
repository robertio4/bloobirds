import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Spinner, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useMinimizableModals,
  checkIsOverdue,
  useActivities,
} from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  getReferencedBobject,
  isCadenceTask,
  isMeetingTypeTask,
  isScheduledTask,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';
import { useSWRConfig } from 'swr';

import { api } from '../../../../../../utils/api';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../../../utils/bobjects.utils';
import { getButtonMarkAsDone } from '../../../../../../utils/tasks.utils';
import { PriorityTaskButton } from '../../../../card/component/priorityTaskButton';
import { useExtensionContext } from '../../../../context';
import { useContactViewContext } from '../../../context/contactViewContext';
import styles from '../miniCard.module.css';

export function MiniCardTaskButtons({
  task,
  isLoading,
  setIsLoading,
  markAsDoneClicked,
  setMarkAsDoneClicked,
  updateIndexOnSave,
  customTask,
  logCustomActivity,
}) {
  const { cache: swrCache } = useSWRConfig();
  const { useGetActiveBobject, useGetActiveBobjectContext, useGetSettings } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const { leads } = useGetActiveBobjectContext() || {};
  const settings = useGetSettings();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const { logActivityFromTask } = useActivities();

  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const referencedBobject = getReferencedBobject(task);
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)
    ?.valueLogicRole as TASK_TYPE;
  const taskStatus = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const isEditable = type === TASK_TYPE.NEXT_STEP;
  const isCallAction =
    isEditable && getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL) === 'Yes';

  const companyLastAttemptDate = getValueFromLogicRole(
    company,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );
  const lastAttemptDate = lead
    ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY)
    : null;
  const scheduledDate = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const scheduledDateTime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)?.valueLogicRole;
  const buttonData = getButtonMarkAsDone({
    taskType: type,
    taskStatus,
    bobjectLastAttemptDate: lastAttemptDate || companyLastAttemptDate,
    taskDateField: scheduledDate || scheduledDateTime,
    taskIsAutomated: automated,
  });
  const { actionsDisabled } = useContactViewContext();
  const assignedTo = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value;
  const activeUserId = useActiveUserId();
  const assignedToActiveUser = assignedTo === activeUserId;
  const { t } = useTranslation('translation', { keyPrefix: 'extension.card' });
  const { t: bobjectT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });
  const { openWizard, resetWizardProperties } = useWizardContext();
  function handleClose() {
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  const handleMarkAsDone = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    api
      .patch(`/bobjects/${task?.id?.value}/raw`, {
        contents: {
          [TASK_FIELDS_LOGIC_ROLE.STATUS]: checkIsOverdue(task)
            ? TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE
            : TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
        },
        params: {
          skipEmptyUpdates: true,
        },
      })
      .then(() => {
        updateIndexOnSave?.();
        mixpanel.track(MIXPANEL_EVENTS.COMPLETE_TASK_FROM_CONTACT_VIEW_OTO);
        if (hasAutoLogCustomActivity && customTask) {
          logCustomActivity({
            customTask,
            selectedBobject: referencedBobject,
            leads,
            onSubmit: () => {
              //setActiveSubTab(ContactViewSubTab.ACTIVITIES);
            },
          });
        }
        if (isCallAction) {
          logActivityFromTask({
            taskId: task?.id?.value,
            callback: (activity, mainBobject) => {
              openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activity, {
                referenceBobject: mainBobject,
                handleClose,
              });
              window.dispatchEvent(
                new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                  detail: { type: BobjectTypes.Activity },
                }),
              );
            },
          });
        }
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.TaskCompleted, {
            detail: { id: task?.id?.value },
          }),
        );
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
        if (
          (activeBobject?.id.typeName === BobjectTypes.Lead && company) ||
          (activeBobject?.id.typeName === BobjectTypes.Company && lead)
        ) {
          const bobjectToClear = activeBobject?.id.typeName === BobjectTypes.Lead ? company : lead;
          swrCache.delete(`/tasksFeed/${bobjectToClear?.id?.value}/1`);
        }
        setIsLoading(false);
      });
  };

  const { openMinimizableModal } = useMinimizableModals();

  const openTaskModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openMinimizableModal({
      type: 'task',
      data: {
        [task?.id.typeName.toLowerCase()]: task,
        location: 'bubble',
        bobjectId: task?.id?.value,
        company,
        lead,
        opportunity,
      },
    });
  };

  const isScheduled = isScheduledTask(task);
  const isMeeting = isMeetingTypeTask(task);
  const isCadence = isCadenceTask(task);

  if (isScheduled || isMeeting || isCadence) {
    return (
      <>
        {/* Don't know why but this does not makes sense as it changes the status of meeting result modal
        <Button
          dataTest={styles.iconButton}
          size="small"
          onClick={() => {
            setOpenedModal();
          }}
        >
          <Icon size={12} color="white" name="clock" />
        </Button>*/}

        <PriorityTaskButton bobject={task} />

        {isEditable && (
          <Tooltip title={t('editTaskButton')} position="top">
            <Button
              dataTest={styles.iconButton}
              size="small"
              variant="secondary"
              onClick={openTaskModal}
            >
              <Icon size={12} color="bloobirds" name="edit" />
            </Button>
          </Tooltip>
        )}
        <Tooltip
          title={
            actionsDisabled && !assignedToActiveUser
              ? t('noPermissions', { bobject: bobjectT('task') })
              : buttonData?.tooltip
          }
          position="top"
        >
          <Button
            dataTest={styles.iconButton}
            size="small"
            color={markAsDoneClicked ? 'verySoftMelon' : undefined}
            onClick={event => {
              setMarkAsDoneClicked(true);
              handleMarkAsDone(event);
            }}
            disabled={actionsDisabled && !assignedToActiveUser}
            {...(isCadence
              ? { disabled: buttonData.disabled || (actionsDisabled && !assignedToActiveUser) }
              : {})}
          >
            {isLoading ? (
              <div>
                <Spinner name="loadingCircle" size={8} color="melon" />
              </div>
            ) : (
              <Icon size={12} color={markAsDoneClicked ? 'melon' : 'white'} name="check" />
            )}
          </Button>
        </Tooltip>
      </>
    );
  }
  return <></>;
}
