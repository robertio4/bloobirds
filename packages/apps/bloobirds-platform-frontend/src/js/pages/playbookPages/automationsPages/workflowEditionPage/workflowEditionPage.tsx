import React, { useEffect, useState } from 'react';
import {
  Button,
  Callout,
  Icon,
  IconButton,
  Input,
  Switch,
  Tab,
  TabGroup,
  Text,
  Tooltip,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { isArray } from 'lodash';
import styles from './workflowEditionPage.module.css';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import WorkflowActionsPage from './actionsTabFolder/actionsTab';
import { useWorkflows } from '../useAutomationsEdition';
import { useWorkflow } from './context/workflowsContext';
import { CreateWorkflowRequest, Monitor, MonitoredField, MonitoredFields } from './workflows.types';
import WorkflowLogsPage from './logsTabFolder/logsTab';
import WorkflowSettingsPage from './settingsTabFolder/settingsTab';
import { WorkflowCounterResetModal } from '../workflowsPage/components/workflowResetRunsModal';
import AlertMessage from '../../../../components/accountAlerts/alertMessage';
import SessionManagerFactory from '../../../../misc/session';
import { ALERT_BANNER_TYPES } from '../../../../components/accountAlerts/alertMessage/alerMessage.constants';
import { formatDate } from '@bloobirds-it/utils';
import { WorklfowsSaveBeforeLeaving } from './worklfowsSaveBeforeLeaving';
import { APP_PLAYBOOK_MESSAGING_WORKFLOWS } from '../../../../app/_constants/routes';
import { useQueryParam } from '../../../../hooks/useQueryParams';
import { useSidebar } from '../../../../hooks/useSidebar';
import { useRouter } from '../../../../hooks';
import { WorkflowSettingsModal } from './workflowSettingsModal';

const rangeFieldTypes = ['LessThan', 'LessThanEqual', 'GreaterThan', 'GreaterThanEqual', 'Between'];

function parseNumberMonitors(conditions: any) {
  const {
    value: { type, value },
  } = conditions || {};
  let parsedConditions;
  const { fromValue, toValue } = value || {};
  const start = parseInt(fromValue) < parseInt(toValue) ? fromValue : toValue;
  const end = start === fromValue ? toValue : fromValue;

  switch (type) {
    case 'Between':
      parsedConditions = {
        type: 'Range',
        entries: [
          { value: start, operator: 'GTE' },
          { value: end, operator: 'LTE' },
        ],
      };
      break;
    case 'LessThan':
      parsedConditions = {
        type: 'Range',
        entries: [{ value, operator: 'LT' }],
      };
      break;
    case 'LessThanEqual':
      parsedConditions = {
        type: 'Range',
        entries: [{ value, operator: 'LTE' }],
      };
      break;
    case 'GreaterThan':
      parsedConditions = {
        type: 'Range',
        entries: [{ value, operator: 'GT' }],
      };
      break;
    case 'GreaterThanEqual':
      parsedConditions = {
        type: 'Range',
        entries: [{ value, operator: 'GTE' }],
      };
      break;
  }
  return parsedConditions;
}

const getParsedMonitors = (monitor: Monitor) => {
  const { type, value } = monitor;
  if (type === 'Equal' && Array.isArray(value)) {
    return { type, arrayValues: value };
  }
  return monitor;
};

const WorkflowEditionPage = () => {
  const [shouldShowSettingsModal, setShouldShowSettingsModal] = useState(false);
  const currentDate = formatDate(new Date(), 'MMM dd, yyyy hh:mm a');
  const SessionManager = SessionManagerFactory();
  const fromUrl = useQueryParam('from');
  const { toggle } = useSidebar();
  const { history } = useRouter();
  const { search } = useLocation();
  const [nameRef, isHover] = useHover();
  const [isEditingName, setIsEditingName] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    state,
    loadWorkflow,
    isSubmitting,
    updateIsLocked,
    updateIsDirty,
    isMissingInfo: updateMissingInfo,
  } = useWorkflow();
  const [isEnabled, setIsEnabled] = useState(false);
  const [workflowName, setWorkflowName] = useState(`${state?.name} - ${currentDate}`);
  const showHasUnsavedChanges = state?.isDirty && isExiting;

  const {
    workflows,
    handleCreateWorkflow,
    handleUpdateWorkflow,
    handleEnableWorkflow,
    handleDisableWorkflow,
  } = useWorkflows();
  useEffect(() => {
    if (search && !state.trigger) {
      const editingWorkflowId = search.split('&')[0].split('=')[1];
      const workflow = workflows.find(wf => wf?.id === editingWorkflowId);
      if (workflow) {
        loadWorkflow(workflow);
        setIsEditing(true);
        setWorkflowName(workflow.name);
        setIsEnabled(workflow.isEnabled);
        updateIsLocked(
          !(SessionManager.getUser()?.id === workflow.author) && !workflow.anyoneCanEdit,
        );
      }
    }
  }, [workflows]);

  const tabs = [
    <Tab name="Actions" key="actions" color="purple">
      <WorkflowActionsPage isEditing={isEditing} />
    </Tab>,
    <Tab name="Logs" key="logs" color="purple" disabled={!isEditing}>
      <WorkflowLogsPage />
    </Tab>,
    <Tab name="Settings" key="settings" color="purple">
      <AccountSettingsTab>
        <WorkflowSettingsPage />
      </AccountSettingsTab>
    </Tab>,
  ];

  const onSave = ({ enable }: { enable: boolean }) => {
    isSubmitting(true);
    const filters: MonitoredFields[] = [];
    state?.conditions.forEach(conditionBlock => {
      const fields: { [key: string]: MonitoredField } = {};
      conditionBlock.forEach(condition => {
        if (rangeFieldTypes.includes(condition?.value?.type)) {
          condition.value = parseNumberMonitors(condition);
        }
        if (typeof condition?.value?.value === 'object' && !isArray(condition?.value?.value)) {
          condition.value = {
            type: condition?.value?.type,
            ...condition?.value?.value,
          };
        }
        let monitoredField: MonitoredField = fields[condition?.bobjectFieldId];
        const monitors = getParsedMonitors(condition?.value);
        if (monitoredField) {
          monitoredField?.monitors?.push(monitors);
        } else {
          monitoredField = {
            monitors: [monitors],
            fieldId: condition?.bobjectFieldId,
          };
        }
        fields[condition?.bobjectFieldId] = monitoredField;
      });
      filters.push({ fields: Object.values(fields) });
    });

    const body: CreateWorkflowRequest = {
      name: `${workflowName}`,
      type: state?.trigger.name,
      actions: state?.actions,
      filters,
      runOnlyOnce: state?.runOnlyOnce,
      anyoneCanEdit: state?.anyoneCanEdit,
    };
    if (!state.isMissingInfo)
      isEditing
        ? handleUpdateWorkflow(state?.id, body)
        : handleCreateWorkflow({ body, enable, setIsEditing, setIsEnabled });
    setIsEditingName(false);
  };

  const handleEditingName = () => {
    if (!state?.isEnabled && !state?.isLocked) {
      setIsEditingName(true);
      updateIsDirty(true);
    }
  };

  const handleShowRunOnceModal = ({ enable }: { enable: boolean }) => {
    state?.runOnlyOnce && isEditing ? setShowResetConfirmation(true) : onSave({ enable });
  };
  const checkMissingInfo = () => {
    let infoMissing = false;
    if (!state?.trigger) return true;
    const conditionValueRequiringFields = ['Contains', 'Equal', 'NotEqual'];
    infoMissing = state?.conditions?.some(conditionBlock => {
      return conditionBlock?.some(condition => {
        const { value, type, arrayValues } = condition?.value || {};
        if (
          !condition?.bobjectFieldId ||
          !type ||
          (conditionValueRequiringFields.includes(type) && !value && !arrayValues)
        ) {
          return true;
        }
      });
    });

    infoMissing =
      infoMissing ||
      state?.actions.some(action => {
        if (!action?.type) return true;
        if (action?.type === 'UPDATE_PROPERTY') {
          return !Object?.values(action?.properties).every(propertyValue => !!propertyValue);
        }
        if (action?.type === 'CLEAR_PROPERTY') {
          return !action?.bobjectFieldIds[0];
        }
        if (action?.type === 'COPY_PROPERTY') {
          return action?.records?.some((record: { originFieldId: any; targetFieldId: any }) => {
            return Object.values(record).some(value => value === undefined);
          });
        }
        if (action?.type === 'CREATE_NOTIFICATION') {
          return !action?.title;
        }
        if (action?.type === 'CREATE_TASK') {
          return !action?.title;
        }
        if (action?.type === 'REASSIGN') {
          return !action?.users[0];
        }
      });

    return infoMissing;
  };

  const handleSave = () => {
    isSubmitting(true);
    const canSubmit = !checkMissingInfo();
    updateMissingInfo(!canSubmit);
    if (isEditing && canSubmit) {
      handleShowRunOnceModal({ enable: false });
      isSubmitting(false);
    } else if (canSubmit) {
      setShouldShowSettingsModal(true);
      isSubmitting(false);
    }
  };
  const handleBack = () => {
    history.push(fromUrl || APP_PLAYBOOK_MESSAGING_WORKFLOWS);
    toggle();
  };

  function handleExit() {
    if (!state?.isDirty) {
      handleBack();
    } else {
      setIsExiting(true);
    }
  }

  return (
    <>
      <main className={styles.workflow_page__container}>
        {state.isLocked && (
          <div className={styles._banner_wrapper}>
            <Callout
              text={
                <AlertMessage
                  type={ALERT_BANNER_TYPES.WORKFLOW_NOT_EDITABLE}
                  options={{ user: state?.authorName }}
                />
              }
              width="100%"
              variant="alert"
            />
          </div>
        )}
        <div className={styles.workflow_editor__container}>
          <Button
            className={styles._back__button}
            variant="clear"
            onClick={handleExit}
            iconLeft="arrowLeft"
            color="purple"
          >
            Back to workflows
          </Button>
          <div className={styles._workflow__form__container}>
            <div className={styles._workflow__form__content}>
              <div className={styles._workflow__form__header}>
                <div
                  ref={nameRef}
                  className={clsx(styles._workflow__form__name, {
                    [styles._workflow__form__name_unlocked]: !state?.isEnabled && !state?.isLocked,
                  })}
                  onClick={handleEditingName}
                >
                  {!isEditingName && (
                    <Text size="l" color="peanut">
                      {workflowName}
                    </Text>
                  )}
                  {isHover && !isEditingName && !state?.isEnabled && !state?.isLocked && (
                    <IconButton key="editIcon" name="edit" />
                  )}
                  {isEditingName && (
                    <Input
                      value={workflowName}
                      borderless
                      onChange={value => setWorkflowName(value)}
                      onSubmit={() => {
                        setIsEditingName(false);
                      }}
                    />
                  )}
                </div>
                <span className={styles._right__actions}>
                  <Tooltip
                    title={
                      state?.isDirty
                        ? 'There are some missing changes to be saved before being able to enable the workflow'
                        : ''
                    }
                    position="top"
                  >
                    <Switch
                      disabled={state.isLocked || !isEditing || state?.isDirty}
                      checked={isEditing ? state?.isEnabled : false}
                      color="purple"
                      onChange={() => {
                        state?.isEnabled
                          ? handleDisableWorkflow(state?.id)
                          : handleEnableWorkflow(state?.id, true);
                        if (isEditing) setIsEnabled(!isEnabled);
                      }}
                    />
                  </Tooltip>
                  <Text size="s" color="peanut">
                    Enabled
                  </Text>
                  <Tooltip
                    title="To be able to edit the workflow, first you have to disable it, edit the changes
                  and save them."
                    position="top"
                  >
                    <Icon color="darkBloobirds" name="infoFilled" />
                  </Tooltip>
                </span>
              </div>
              <div className={styles._workflow__form__items}>
                <TabGroup>{tabs}</TabGroup>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className={styles._save_bar}>
        <div className={styles._cancel_button}>
          <Button variant="clear" size="small" color="white" onClick={() => handleExit()}>
            Cancel
          </Button>
        </div>
        <div>
          <Tooltip
            title={
              state?.isEnabled
                ? 'To be able to save changes first you have to disable the workflow'
                : ''
            }
            position="top"
          >
            <Button
              variant="secondary"
              disabled={isEnabled || state?.isLocked}
              onClick={handleSave}
            >
              Save
            </Button>
          </Tooltip>
        </div>
      </div>
      {showResetConfirmation && isEditing && (
        <WorkflowCounterResetModal
          onClose={() => setShowResetConfirmation(false)}
          onSave={() => onSave({ enable: false })}
        />
      )}
      {showHasUnsavedChanges && (
        <WorklfowsSaveBeforeLeaving handleClose={() => setIsExiting(false)} />
      )}
      {shouldShowSettingsModal && (
        <WorkflowSettingsModal onSave={onSave} onClose={() => setShouldShowSettingsModal(false)} />
      )}
    </>
  );
};

export default WorkflowEditionPage;
