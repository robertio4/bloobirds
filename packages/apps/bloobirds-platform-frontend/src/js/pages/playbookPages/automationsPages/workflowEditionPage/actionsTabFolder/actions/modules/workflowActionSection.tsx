import React from 'react';
import { Button, Icon, IconButton, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import styles from '../actions.module.css';
import AccountSettingsTab from '../../../../../../../layouts/accountSettingsLayout/accountSettingsTab';
import { WORKFLOWS_ACTIONS_TYPES } from './actions.constants';
import { useWorkflow } from '../../../context/workflowsContext';
import { moduleTranslator } from './moduleTranslator';
import { useFullSalesEnabled } from '../../../../../../../hooks/useFeatureFlags';
import { BOBJECT_TYPES, BobjectTypes } from '@bloobirds-it/types';

const bobjectRelations = {
  [BOBJECT_TYPES.LEAD]: [BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY],
  [BOBJECT_TYPES.COMPANY]: [BOBJECT_TYPES.COMPANY],
  [BOBJECT_TYPES.OPPORTUNITY]: [BOBJECT_TYPES.OPPORTUNITY],
  [BOBJECT_TYPES.TASK]: [BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.OPPORTUNITY],
  [BOBJECT_TYPES.ACTIVITY]: [BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.OPPORTUNITY],
};

const reassignBobjectRelations = {
  [BOBJECT_TYPES.LEAD]: [BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY],
  [BOBJECT_TYPES.COMPANY]: [BOBJECT_TYPES.COMPANY],
  [BOBJECT_TYPES.OPPORTUNITY]: [
    BOBJECT_TYPES.LEAD,
    BOBJECT_TYPES.COMPANY,
    BOBJECT_TYPES.OPPORTUNITY,
  ],
  [BOBJECT_TYPES.TASK]: [BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.OPPORTUNITY],
  [BOBJECT_TYPES.ACTIVITY]: [BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.OPPORTUNITY],
};

const WorkflowActionsSection = ({ blockIndex, action }) => {
  const {
    state: { actions, trigger, isEnabled, isLocked, isSubmitting, isMissingInfo },
    updateActionType,
    addActionBlock,
    removeActionBlock,
  } = useWorkflow();
  const isFullSalesEnabled = useFullSalesEnabled();
  const isRelatedBobjectAction =
    action?.type?.includes('CADENCE') ||
    action?.type?.includes('STOP_CADENCE') ||
    action?.type?.includes('TASK') ||
    action?.type?.includes('NOTIFICATION') ||
    action?.type?.includes('REASSIGN');

  const getBobjectBasedValue = () => {
    if (action?.type?.includes('TASK'))
      return `${action.type}_${action?.targetBobjectType?.toUpperCase()}`;
    if (!action?.type?.includes('ALL_LEADS')) {
      if (action?.bobjectType === 'Leads') {
        return `${action.type}_FOR_ALL_LEADS`;
      }
      return `${action.type}_${action?.bobjectType?.toUpperCase()}`;
    } else {
      return action?.type;
    }
  };
  const fieldIsIncomplete = isMissingInfo && isSubmitting && !action?.type;

  return (
    <div className={styles._actions_connector_wrapper}>
      <div className={styles._actions_connector} />
      <AccountSettingsTab>
        <div className={styles._action_page__container}>
          <div className={styles._workflows_actions_icon_wrapper}>
            <IconButton
              disabled={(blockIndex === 0 && !action?.type) || isLocked || isEnabled}
              color="purple"
              onClick={() => {
                if (blockIndex !== 0) {
                  removeActionBlock(blockIndex);
                } else {
                  updateActionType(blockIndex, '');
                }
              }}
              name="cross"
            />
          </div>

          <div className={styles._workflows_actions_icon}>
            <Icon
              name={action?.type ? moduleTranslator({ action })?.icon : 'plusSquare'}
              color={action?.type ? 'melon' : 'lightPeanut'}
              size={40}
            />
          </div>
          <div className={styles._workflows_actions_text}>
            <Text size="l">Then</Text>
          </div>
          <div className={styles._action_page__select}>
            <Select
              placeholder="Select action"
              width="260px"
              borderless={false}
              defaultValue=""
              warning={fieldIsIncomplete && 'Missing required information'}
              size="small"
              value={isRelatedBobjectAction ? getBobjectBasedValue() : action.type}
              disabled={!trigger || isEnabled || isLocked}
              onChange={type => {
                updateActionType(blockIndex, type);
              }}
            >
              <Item value="UPDATE_PROPERTY">{WORKFLOWS_ACTIONS_TYPES.UPDATE_PROPERTY}</Item>
              <Item value="CLEAR_PROPERTY">{WORKFLOWS_ACTIONS_TYPES.CLEAR_PROPERTY}</Item>
              <Item value="COPY_PROPERTY">{WORKFLOWS_ACTIONS_TYPES.COPY_PROPERTY}</Item>
              {bobjectRelations[trigger?.bobjectType]?.map(notificationBobjectType => {
                if (notificationBobjectType === BOBJECT_TYPES.OPPORTUNITY && !isFullSalesEnabled)
                  return null;
                return (
                  <Item
                    key={`create-notification-${notificationBobjectType}`}
                    value={`CREATE_NOTIFICATION_${notificationBobjectType.toUpperCase()}`}
                  >
                    {
                      WORKFLOWS_ACTIONS_TYPES[
                        `CREATE_NOTIFICATION_${notificationBobjectType.toUpperCase()}`
                      ]
                    }
                  </Item>
                );
              })}
              {bobjectRelations[trigger?.bobjectType]?.map(cadenceBobjectType => {
                if (cadenceBobjectType === BOBJECT_TYPES.OPPORTUNITY && !isFullSalesEnabled)
                  return null;
                return (
                  <Item
                    key={`start-cadence-${cadenceBobjectType}`}
                    value={`START_CADENCE_${cadenceBobjectType.toUpperCase()}`}
                  >
                    {WORKFLOWS_ACTIONS_TYPES[`START_CADENCE_${cadenceBobjectType.toUpperCase()}`]}
                  </Item>
                );
              })}
              {bobjectRelations[trigger?.bobjectType]?.map(bobjectType => {
                if (bobjectType === BOBJECT_TYPES.OPPORTUNITY && !isFullSalesEnabled) return null;
                return (
                  <Item
                    key={`Create-task-${bobjectType}`}
                    value={`CREATE_TASK_${bobjectType.toUpperCase()}`}
                  >
                    {WORKFLOWS_ACTIONS_TYPES[`CREATE_TASK_${bobjectType.toUpperCase()}`]}
                  </Item>
                );
              })}
              {bobjectRelations[trigger?.bobjectType]?.map(bobjectType => {
                if (bobjectType === BOBJECT_TYPES.OPPORTUNITY && !isFullSalesEnabled) return null;
                return (
                  <Item
                    key={`Stop-cadence-${bobjectType}`}
                    value={`STOP_CADENCE_${bobjectType.toUpperCase()}`}
                  >
                    {WORKFLOWS_ACTIONS_TYPES[`STOP_CADENCE_${bobjectType.toUpperCase()}`]}
                  </Item>
                );
              })}
              {reassignBobjectRelations[trigger?.bobjectType]?.map(bobjectType => {
                return (
                  <Item
                    key={`Reassign-${bobjectType}`}
                    value={`REASSIGN_${bobjectType.toUpperCase()}`}
                  >
                    {WORKFLOWS_ACTIONS_TYPES[`REASSIGN_${bobjectType.toUpperCase()}`]}
                  </Item>
                );
              })}
              {trigger?.bobjectType === BobjectTypes.Company && [
                <Item key="UPDATE_PROPERTY_FOR_ALL_LEADS" value="UPDATE_PROPERTY_FOR_ALL_LEADS">
                  {WORKFLOWS_ACTIONS_TYPES.UPDATE_PROPERTY_FOR_ALL_LEADS}
                </Item>,
                <Item key="CLEAR_PROPERTY_FOR_ALL_LEADS" value="CLEAR_PROPERTY_FOR_ALL_LEADS">
                  {WORKFLOWS_ACTIONS_TYPES.CLEAR_PROPERTY_FOR_ALL_LEADS}
                </Item>,
                <Item key="COPY_PROPERTY_FOR_ALL_LEADS" value="COPY_PROPERTY_FOR_ALL_LEADS">
                  {WORKFLOWS_ACTIONS_TYPES.COPY_PROPERTY_FOR_ALL_LEADS}
                </Item>,
                <Item key="REASSIGN_ALL_LEADS" value="REASSIGN_FOR_ALL_LEADS">
                  {WORKFLOWS_ACTIONS_TYPES.REASSIGN_FOR_ALL_LEADS}
                </Item>,
                <Item key="START_CADENCE_FOR_ALL_LEADS" value="START_CADENCE_FOR_ALL_LEADS">
                  {WORKFLOWS_ACTIONS_TYPES.START_CADENCE_FOR_ALL_LEADS}
                </Item>,
                <Item key="STOP_CADENCE_FOR_ALL_LEADS" value="STOP_CADENCE_FOR_ALL_LEADS">
                  {WORKFLOWS_ACTIONS_TYPES.STOP_CADENCE_FOR_ALL_LEADS}
                </Item>,
              ]}
            </Select>
          </div>
          {
            moduleTranslator({
              blockIndex,
              action,
            })?.component
          }
        </div>
      </AccountSettingsTab>
      {action?.type && (
        <>
          <div className={styles._actions_connector_wrapper}>
            <div className={styles._actions_connector} />
          </div>
          <div className={styles._actions_button}>
            <Button
              size="small"
              disabled={isEnabled || isLocked}
              variant="secondary"
              expand={false}
              color="purple"
              onClick={() => {
                addActionBlock();
              }}
            >
              {blockIndex + 1 === actions.length ? '+ action' : '+'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkflowActionsSection;
