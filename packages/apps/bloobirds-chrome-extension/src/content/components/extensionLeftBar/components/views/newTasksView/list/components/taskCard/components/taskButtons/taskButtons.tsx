import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton, createToast, Spinner, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActivities, useCustomTasks, useQuickLogActivity } from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  MessagesEvents,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { getReferencedBobject, getUserTimeZone, isBeforeToday } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import mixpanel from 'mixpanel-browser';
import normalizeUrl from 'normalize-url';

import { api } from '../../../../../../../../../../../utils/api';
import { MIXPANEL_EVENTS } from '../../../../../../../../../../../utils/mixpanel';
import { TASK_STATUS_VALUE_LOGIC_ROLE } from '../../../../../../../../../../../utils/task';
import { isSalesforcePage } from '../../../../../../../../../../../utils/url';
import styles from '../../../../../../../../../card/card.module.css';
import { useExtensionContext } from '../../../../../../../../../context';
import { useExtensionLeftBarContext } from '../../../../../../../../extensionLeftBarContext';
import { useSubhomeContext } from '../../../../../../../layouts/subhomeLayout/subhomeLayout';
import { useTaskFeedContext } from '../../../../../hooks/useTasksTab';
import { TaskFeedTask } from '../../../../../types';
import { EditTaskButton } from './components/editTaskButton';
import { TaskPriorityButton } from './components/priorityButton';
import { RescheduleTaskButton } from './components/rescheduleButton';
import { SkipTaskButton } from './components/skipTaskButton';

enum ButtonStatus {
  Idle = 'idle',
  Processing = 'processing',
  Completed = 'completed',
}

export const TaskButtons = ({
  task,
  setBanished,
  setIsProcessing,
}: {
  task: TaskFeedTask;
  setBanished: () => void;
  setIsProcessing: (value: boolean) => void;
}) => {
  const [buttonStatus, setButtonStatus] = useState(ButtonStatus.Idle);
  const { useGetSettings } = useExtensionContext();
  const { collapseLeftBar } = useExtensionLeftBarContext();
  const { useGetConfiguration } = useTaskFeedContext();
  const configuration = useGetConfiguration?.();
  const {
    selectedItems,
    useEveryBobject: { isActive },
  } = useSubhomeContext();
  const settings = useGetSettings();
  const { logCustomActivity } = useQuickLogActivity();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const hasAutoCloseLeftBar = settings?.user?.autoCloseLeftBar;
  const { t } = useTranslation();
  const { logActivityFromTask } = useActivities();
  const { openWizard, resetWizardProperties } = useWizardContext();
  function handleClose() {
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  // data needed from task
  const referencedBobject = getReferencedBobject(task);
  const type = task.type as TASK_TYPE;
  const opportunity = task.opportunity;
  const lead = task.lead;

  const url = normalizeUrl(window.location.href);
  const isSalesforce = isSalesforcePage(url);
  const canEditTask = type === TASK_TYPE.NEXT_STEP;
  const isSkippable = task.skippable;
  const isCallAction = canEditTask && task.actionCall;

  const salesforceCrmId = task?.crmIds?.crmName === 'SALESFORCE' ? task?.crmIds?.crmId : null;

  const company = task.company;
  // Logic when checking tasks
  const isChecked = selectedItems?.some(item => item?.id?.objectId === task?.id) || isActive;
  const buttonData = { disabled: !(task.canBeMarkedAsDone || task.skippable), tooltip: '' };

  const { customTasks } = useCustomTasks();

  const customTaskId = task?.customTaskId;
  const customTask = customTasks?.find(ct => ct.id === customTaskId);

  function handleHideAndComplete() {
    setButtonStatus(ButtonStatus.Completed);
    createToast({ type: 'success', message: t('tasks.toasts.completedSuccess') });
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Task },
        }),
      );
      setBanished();
      setIsProcessing(false);
    }, 400);
  }

  const handleMarkAsDone = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    event?.preventDefault();
    event?.stopPropagation();
    setButtonStatus(ButtonStatus.Processing);
    setIsProcessing(true);
    api
      .patch(`/bobjects/${id}/raw`, {
        contents: {
          [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
        },
        params: {
          skipEmptyUpdates: true,
        },
      })
      .then(() => {
        if (hasAutoLogCustomActivity && customTask) {
          logCustomActivity({
            customTask,
            selectedBobject: referencedBobject,
            leads: [],
            company,
          });
        }
        if (isCallAction) {
          logActivityFromTask({
            taskId: task?.id,
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
        handleHideAndComplete();
      });
  };

  const salesforceUrl = salesforceCrmId ? `/${salesforceCrmId}` : null;

  const getInfoSalesforceUrl = (t: TFunction) => {
    let text = '';
    if (!salesforceUrl) {
      if (lead) {
        text = t('extension.card.noSalesforceIdLead');
      } else if (opportunity) {
        text = t('extension.card.noSalesforceIdOpportunity');
      } else if (company) {
        text = t('extension.card.noSalesforceIdCompany');
      }
    }
    return text;
  };
  const infoSalesforceUrl = getInfoSalesforceUrl(t);

  const handleGoToSalesforce = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (salesforceUrl) {
      window.location.href = salesforceUrl;
      if (hasAutoCloseLeftBar) collapseLeftBar();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        paddingRight: '16px',
      }}
    >
      {!isChecked && (
        <div className={styles.cardButtons}>
          {canEditTask && <EditTaskButton task={task} />}
          {isSalesforce && (company || lead || opportunity) && (
            <Tooltip
              title={
                salesforceUrl ? t('extension.card.navigateSalesforceTooltip') : infoSalesforceUrl
              }
              position="top"
            >
              <CardButton
                dataTest="home-GoToSalesforce"
                iconLeft="salesforceOutlined"
                onClick={event => {
                  mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD);
                  handleGoToSalesforce(event);
                }}
                size="small"
                variant="secondary"
                disabled={!salesforceUrl}
              />
            </Tooltip>
          )}
          {/*{isLinkedIn && (company || lead) && <LinkedinNavigationButton bobject={task} />}*/}
          {!!configuration?.canSeeImportance && <TaskPriorityButton task={task} />}
          <RescheduleTaskButton task={task} />
          {isSkippable && (
            <SkipTaskButton task={{ id: { value: task.id } }} onBanish={() => setBanished()} />
          )}
          <Tooltip title={buttonData?.tooltip} position="top">
            <CardButton
              dataTest="home-MarkAsDone"
              iconLeft={buttonStatus === ButtonStatus.Idle ? 'check' : undefined}
              variant={buttonData.disabled ? 'secondary' : 'primary'}
              color={buttonData.disabled ? 'verySoftPeanut' : 'bloobirds'}
              className={clsx(styles._mark_as_done, {
                [styles._mark_as_done_clicked]: buttonStatus === ButtonStatus.Completed,
              })}
              onClick={event => {
                mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD);
                handleMarkAsDone(event, task?.id);
              }}
              disabled={buttonData.disabled}
              size="small"
            >
              {buttonStatus === ButtonStatus.Processing && (
                <div>
                  <Spinner name="loadingCircle" size={10} color="melon" />
                </div>
              )}
            </CardButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
