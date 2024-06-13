import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssignCadenceDropdown } from '@bloobirds-it/cadence';
import {
  Card,
  CardButton,
  CardCheckbox,
  CardContent,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  Spinner,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { QuickLogModalData, useIsB2CAccount, useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  CustomTask,
  ExtensionBobject,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  SalesforceTabs,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
  UserPermission,
} from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getTaskText,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isCadenceTask,
  isSkippableTask,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import mixpanel from 'mixpanel-browser';
import normalizeUrl from 'normalize-url';

import { api } from '../../../utils/api';
import { MIXPANEL_EVENTS } from '../../../utils/mixpanel';
import { TASK_STATUS_VALUE_LOGIC_ROLE } from '../../../utils/task';
import { getButtonMarkAsDone } from '../../../utils/tasks.utils';
import { getSalesforceUrl, isLinkedinOrSalesNav, isSalesforcePage } from '../../../utils/url';
import { useExtensionContext } from '../context';
import { useSubhomeContext } from '../extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout';
import { checkIsOverdue } from '../extensionLeftBar/extensionLeftBar.utils';
import { useExtensionLeftBarContext } from '../extensionLeftBar/extensionLeftBarContext';
import styles from './card.module.css';
import CustomCardBody from './cardBody';
import { EditTaskButton } from './component/editTaskButton';
import { LinkedinNavigationButton } from './component/linkedinNavigationButton';
import { MiniSkipTaskButton } from './component/miniSkipTaskButton';
import { PriorityTaskButton } from './component/priorityTaskButton';
import { RescheduleTaskButton } from './component/rescheduleTaskButton';

interface DateExtendedBobject extends Bobject<BobjectTypes.Task> {
  taskDate: { isLastOfDay: boolean };
}
export const CustomCard = ({
  bobject,
  fieldsArray,
  mutate,
  tabName,
  showNew,
  isSelectable,
  customTasks,
  logCustomActivity,
}: {
  bobject: Bobject | DateExtendedBobject;
  fieldsArray?: Array<string>;
  mutate?: () => void;
  tabName?: string;
  showNew?: boolean;
  isSelectable?: boolean;
  customTasks?: CustomTask[];
  logCustomActivity?: (data: QuickLogModalData) => void;
}) => {
  const [hasBeenCompleted, setHasBeenCompleted] = useState(false);
  const [persistentButtonClicked, setPersistentButtonClicked] = useState(false);
  const [displayTooltips, setDisplayTooltips] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setActiveBobject,
    setContactViewBobjectId,
    closeExtendedScreen,
    setCurrentTask,
    setTaskId,
    useGetSettings,
  } = useExtensionContext();
  const { collapseLeftBar } = useExtensionLeftBarContext();
  const {
    setOpenedModalInfo,
    selectedItems,
    selectOneItem,
    useEveryBobject: { isActive },
    tabBobject,
  } = useSubhomeContext();
  const settings = useGetSettings();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const hasAutoCloseLeftBar = settings?.user?.autoCloseLeftBar;
  const { openWizard } = useWizardContext();
  const { t } = useTranslation();
  const isB2CAccount = useIsB2CAccount();
  // data needed from task
  const referencedBobject = getReferencedBobject(bobject);
  const type = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const status = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;

  const automated = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)
    ?.valueLogicRole;
  const taskStatus = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const leadLastAttemptDate = lead
    ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY)
    : null;
  const isHome = tabName === SalesforceTabs.HOME;
  const isInactive = tabName === SalesforceTabs.INACTIVE;
  const isPipeline = tabName === SalesforceTabs.PIPELINE;
  const isTasksTab = tabName === SalesforceTabs.TASKS;
  const isNurturing = tabName === SalesforceTabs.NURTURING;
  const canRescheduleTasks = isTasksTab || isNurturing || isHome;
  const url = normalizeUrl(window.location.href);
  const isSalesforce = isSalesforcePage(url);
  const isLinkedIn = isLinkedinOrSalesNav(url);
  // @ts-ignore
  const canEditTask = isTasksTab && type === TASK_TYPE.NEXT_STEP;
  const isTask = type in TASK_TYPE;
  const isOverdue = checkIsOverdue(bobject);
  const isCadence = isTask && isCadenceTask(bobject);
  const isSkippable = isTask && isSkippableTask(bobject);
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const companyLastAttemptDate = getValueFromLogicRole(
    company,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );
  const scheduledDate =
    isTask && getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const scheduledDateTime =
    isTask && getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);

  const bobjectType = bobject?.id?.typeName;
  const isCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status as TASK_STATUS_VALUE_LOGIC_ROLE);

  // Logic when checking tasks
  const isChecked =
    selectedItems?.some(item => item?.id?.objectId === bobject?.id?.objectId) || isActive;
  const buttonData = getButtonMarkAsDone({
    taskType: type,
    taskStatus,
    bobjectLastAttemptDate: leadLastAttemptDate || companyLastAttemptDate,
    taskDateField: scheduledDate || scheduledDateTime,
    taskIsAutomated: automated,
  });

  const customTaskId = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);

  function handleHideAndComplete() {
    setIsLoading(false);
    setTimeout(() => {
      setHasBeenCompleted(true);
      mutate();
    }, 750);
  }

  function handleSaveInactiveModal() {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: tabBobject },
      }),
    );
  }

  const handleMarkAsDone = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
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
        if (hasAutoLogCustomActivity && customTask && customTask.shouldCreateActivity) {
          logCustomActivity({
            customTask,
            selectedBobject: referencedBobject,
            leads: [],
            company,
          });
        }
        handleHideAndComplete();
      });
  };

  const salesforceUrl = getSalesforceUrl(bobject, lead, company, opportunity);

  const getInfoSalesforceUrl = (t: TFunction) => {
    let text = '';
    if (!salesforceUrl) {
      if (lead || bobjectType === BobjectTypes.Lead) {
        text = t('extension.card.noSalesforceIdLead');
      } else if (opportunity || bobjectType === BobjectTypes.Opportunity) {
        text = t('extension.card.noSalesforceIdOpportunity');
      } else if (company || bobjectType === BobjectTypes.Company) {
        text = t('extension.card.noSalesforceIdCompany');
      }
    }
    return text;
  };
  const infoSalesforceUrl = getInfoSalesforceUrl(t);

  const handleGoToSalesforce = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    if (salesforceUrl) {
      window.location.href = salesforceUrl;
      if (hasAutoCloseLeftBar) collapseLeftBar();
    }
  };

  const stage = getTextFromLogicRole(
    referencedBobject,
    FIELDS_LOGIC_ROLE[referencedBobject?.id?.typeName]['STAGE'],
  );

  const onCardClick = () => {
    const bobjectType = bobject?.id?.typeName;
    const bobjectId = bobject?.id?.value;
    if ([BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(bobjectType)) {
      setContactViewBobjectId(bobjectId);
    } else if (!company && !lead && !opportunity) {
      setActiveBobject(null);
      setContactViewBobjectId(null);
      setCurrentTask(bobject);
      setTaskId(bobjectId);
    } else if (bobjectType === 'Task') {
      const leadId = lead?.id?.value;
      const companyId = company?.id?.value;
      const opportunityId = opportunity?.id?.value;

      const b2bOrder = companyId || opportunityId;
      const b2cOrder = opportunityId || companyId;

      setContactViewBobjectId(leadId || isB2CAccount ? b2cOrder : b2bOrder);
      setCurrentTask(bobject);
      setTaskId(bobjectId);
    } else {
      setContactViewBobjectId(referencedBobject?.id?.value);
    }
    closeExtendedScreen();
  };

  const taskDescription =
    customTasks && getTaskText(bobject, 'Description', customTasks, isCadence, t);
  const hasBobject = isTask && (!!company || !!lead || !!opportunity);

  const taskHeaderFieldsArray = [TASK_FIELDS_LOGIC_ROLE.TITLE, TASK_FIELDS_LOGIC_ROLE.PRIORITY];
  const taskFirstLineFieldsArray = [
    ...(!taskDescription
      ? [
          TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
          TASK_FIELDS_LOGIC_ROLE.LEAD,
          ...(!isB2CAccount ? [TASK_FIELDS_LOGIC_ROLE.COMPANY] : []),
          TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
        ]
      : []),
    ...[TASK_FIELDS_LOGIC_ROLE.DESCRIPTION],
  ];

  const taskSecondLineFieldsArray = [
    TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
    TASK_FIELDS_LOGIC_ROLE.LEAD,
    ...(!isB2CAccount ? [TASK_FIELDS_LOGIC_ROLE.COMPANY] : []),
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  ];

  return (
    <div
      className={clsx(styles.container, {
        [styles.borderGreen]: stage === 'Prospecting',
        [styles.borderGray]: stage === 'Sales' || !!opportunity,
        [styles.border]: isNoStatusPlanAccount,
        [styles.borderRed]: isOverdue,
        [styles.isCompleted]:
          hasBeenCompleted && !(bobject as DateExtendedBobject)?.taskDate?.isLastOfDay,
        [styles.withBody]: isTask,
      })}
    >
      <Card
        size="small"
        expand
        completed={isCompleted}
        onClick={onCardClick}
        //borderColor={stage === 'Sales' ? 'verySoftMelon' : 'verySoftPeanut'}
      >
        <CardHeader forceButtonVisibility={persistentButtonClicked}>
          <>
            {isSelectable && (
              <CardLeft>
                <CardCheckbox
                  checked={isChecked}
                  onClick={(value, event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    selectOneItem({ ...bobject });
                  }}
                />
              </CardLeft>
            )}
          </>
          <CustomCardBody
            bobject={bobject as DateExtendedBobject}
            fieldsArray={isTask ? taskHeaderFieldsArray : fieldsArray}
          />
          {showNew ? <span className={styles.cardNewTag}>{t('common.new')}</span> : <></>}
          <CardHoverButtons size="small">
            {!isChecked && (
              <div className={styles.cardButtons}>
                {canEditTask && <EditTaskButton bobject={bobject} />}
                {isSalesforce &&
                  (company ||
                    lead ||
                    opportunity ||
                    [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(
                      bobjectType as BobjectTypes,
                    )) && (
                    <Tooltip
                      title={
                        salesforceUrl
                          ? t('extension.card.navigateSalesforceTooltip')
                          : infoSalesforceUrl
                      }
                      position="top"
                    >
                      <CardButton
                        dataTest="home-GoToSalesforce"
                        iconLeft="salesforceOutlined"
                        onClick={event => {
                          mixpanel.track(
                            MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD,
                          );
                          handleGoToSalesforce(event);
                        }}
                        size="small"
                        variant="secondary"
                        disabled={!salesforceUrl}
                      />
                    </Tooltip>
                  )}
                {isLinkedIn && (company || lead) && <LinkedinNavigationButton bobject={bobject} />}
                {bobjectType === BobjectTypes.Task && <PriorityTaskButton bobject={bobject} />}
                {canRescheduleTasks && (
                  <RescheduleTaskButton bobject={bobject as DateExtendedBobject} />
                )}
                {isSkippable && <MiniSkipTaskButton task={bobject} />}
                {bobjectType === BobjectTypes.Task ? (
                  <Tooltip title={buttonData?.tooltip} position="top">
                    <CardButton
                      dataTest="home-MarkAsDone"
                      iconLeft={isLoading ? undefined : 'check'}
                      variant={buttonData.disabled ? 'secondary' : 'primary'}
                      color={buttonData.disabled ? 'verySoftPeanut' : 'bloobirds'}
                      className={clsx(styles._mark_as_done, {
                        [styles._mark_as_done_clicked]: persistentButtonClicked,
                      })}
                      onClick={event => {
                        setPersistentButtonClicked(true);
                        mixpanel.track(
                          MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD,
                        );
                        handleMarkAsDone(event, bobject?.id.value);
                      }}
                      disabled={buttonData.disabled}
                      size="small"
                    >
                      {isLoading && (
                        <div>
                          <Spinner name="loadingCircle" size={10} color="melon" />
                        </div>
                      )}
                    </CardButton>
                  </Tooltip>
                ) : isInactive ? (
                  <Tooltip title={t('extension.card.nextStep')} position="top">
                    <CardButton
                      dataTest="Subhome-NextStep"
                      iconLeft="rewind"
                      onClick={event => {
                        mixpanel.track(
                          MIXPANEL_EVENTS[`NEXT_STEP_ACTION_CLICKED_ON_EXTENSION_INACTIVE_TAB`],
                        );
                        event.preventDefault();
                        event.stopPropagation();
                        openWizard(WIZARD_MODALS.NEXT_STEP, bobject, {
                          onSaveCallback: handleSaveInactiveModal,
                        });
                      }}
                    />
                  </Tooltip>
                ) : (
                  isPipeline && (
                    <Tooltip title={displayTooltips && t('common.setCadence')} position="top">
                      <AssignDropdownWrapper
                        bobject={bobject}
                        onClick={event => {
                          mixpanel.track(
                            MIXPANEL_EVENTS[
                              `START_CADENCE_ACTION_CLICKED_ON_EXTENSION_INACTIVE_TAB`
                            ],
                          );
                          event?.preventDefault();
                          event?.stopPropagation();
                          setOpenedModalInfo({
                            openedModal: 'cadence',
                            bobject,
                          });
                        }}
                        onRenderDropdown={() => {
                          setPersistentButtonClicked(true);
                          setDisplayTooltips(false);
                        }}
                        onUnmountDropdown={() => setPersistentButtonClicked(false)}
                      >
                        <CardButton dataTest="Subhome-StartCadence" iconLeft="calendar" />
                      </AssignDropdownWrapper>
                    </Tooltip>
                  )
                )}
              </div>
            )}
          </CardHoverButtons>
        </CardHeader>
        {isTask && (taskDescription || hasBobject) ? (
          <CardContent>
            <CustomCardBody
              bobject={bobject as DateExtendedBobject}
              fieldsArray={taskFirstLineFieldsArray}
              isBody
            />
          </CardContent>
        ) : (
          <></>
        )}
        {taskDescription ? (
          <CardContent>
            <CustomCardBody
              bobject={bobject as DateExtendedBobject}
              fieldsArray={taskSecondLineFieldsArray}
              isBody
            />
          </CardContent>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

const AssignDropdownWrapper = ({
  onClick,
  onRenderDropdown,
  onUnmountDropdown,
  bobject,
  children,
}: {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onRenderDropdown: () => void;
  onUnmountDropdown: () => void;
  bobject: Bobject;
  children: JSX.Element;
}) => {
  const { useGetSettings, useGetActiveBobjectContext } = useExtensionContext();
  const settings = useGetSettings();
  const contactBobjects = useGetActiveBobjectContext();

  const hasPermissions =
    settings?.user?.accountAdmin && settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);

  return (
    <AssignCadenceDropdown
      activeUserId={settings?.user.id}
      contactBobjects={contactBobjects}
      callback={onClick}
      // @ts-ignore
      activeBobject={bobject as ExtensionBobject}
      //As this point can only be reached by admin users
      actionsDisabled={false}
      hasPermissions={hasPermissions}
      onRenderDropdown={onRenderDropdown}
      onUnmountDropdown={onUnmountDropdown}
    >
      {children}
    </AssignCadenceDropdown>
  );
};
