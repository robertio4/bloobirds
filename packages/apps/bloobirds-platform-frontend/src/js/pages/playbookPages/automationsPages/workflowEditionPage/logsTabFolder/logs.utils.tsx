import React from 'react';

import { Skeleton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

import styles from '../../workflowsPage/workflowsPage.module.css';
import { WORKFLOWS_ACTIONS_TYPES_KEYS } from '../actionsTabFolder/actions/modules/actions.constants';
import { ActionType } from '../workflows.types';

interface WokflowLog {
  error: string;
  logType: string;
  bobjectEvent: string;
  action: ActionType;
  dataChange: any;
  targetBobjectName: string;
  sourceBobjectName: string;
  sourceBobjectId: string;
  targetBobjectId: string;
}

const getBaseBobject = sourceBobject => {
  const parsedSource = sourceBobject?.split('/')[1];
  switch (parsedSource) {
    case BOBJECT_TYPES.COMPANY:
      return 'company';
    case BOBJECT_TYPES.LEAD:
      return 'lead';
    case BOBJECT_TYPES.OPPORTUNITY:
      return 'opportunity';
    case BOBJECT_TYPES.ACTIVITY:
      return 'activity';
    case BOBJECT_TYPES.TASK:
      return 'task';
    default:
      return 'unknown';
  }
};

const logTextTranslator = (
  log: WokflowLog,
  bobjectFields: any,
  options: object,
  openBobjectDetails: (config: any) => void,
) => {
  const {
    action,
    targetBobjectName,
    sourceBobjectName,
    bobjectEvent,
    sourceBobjectId,
    targetBobjectId,
  } = log || {};
  const fieldNames = getFieldNames(log, bobjectFields);
  const fieldNamesLength = fieldNames?.length;
  const sourceBobjectType = getBaseBobject(sourceBobjectId);
  switch (action) {
    case WORKFLOWS_ACTIONS_TYPES_KEYS.CLEAR_PROPERTY:
    case WORKFLOWS_ACTIONS_TYPES_KEYS.CLEAR_PROPERTY_FOR_ALL_LEADS:
      return (
        <span className={styles._log_text_block_span}>
          <Text size="s">
            Propert{fieldNamesLength > 1 ? 'ies' : 'y'}{' '}
            <b>
              {fieldNames?.slice(0, 3).join(', ')}{' '}
              {fieldNamesLength >= 3 && `and ${fieldNamesLength - 3} more `}
            </b>
            cleared in{' '}
            <span
              onClick={() =>
                openBobjectDetails({
                  id: targetBobjectId,
                  showContactButton: true,
                })
              }
              className={styles._bobjectName}
            >
              {targetBobjectName || sourceBobjectName}{' '}
            </span>
            when {bobjectEvent?.toLowerCase()}d.
          </Text>
        </span>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.COPY_PROPERTY:
    case WORKFLOWS_ACTIONS_TYPES_KEYS.COPY_PROPERTY_FOR_ALL_LEADS:
      return (
        <span className={styles._log_text_block_span}>
          <Text size="s" inline>
            Propert{fieldNamesLength > 1 ? 'ies' : 'y'}{' '}
            <b>
              {fieldNames?.slice(0, 3).join(', ')}{' '}
              {fieldNamesLength >= 3 && `and ${fieldNamesLength - 3} more `}
            </b>
            copied in{' '}
            <span
              onClick={() =>
                openBobjectDetails({
                  id: targetBobjectId || sourceBobjectId,
                  showContactButton: true,
                })
              }
              className={styles._bobjectName}
            >
              {targetBobjectName || sourceBobjectName}{' '}
            </span>
            when {bobjectEvent?.toLowerCase()}d.
          </Text>
        </span>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.START_CADENCE:
    case WORKFLOWS_ACTIONS_TYPES_KEYS.START_CADENCE_FOR_ALL_LEADS:
      return (
        <div className={styles._log_text_block}>
          <Text size="s">
            <b>Cadence started </b>
            in{' '}
            <span
              onClick={() => openBobjectDetails({ id: targetBobjectId, showContactButton: true })}
              className={styles._bobjectName}
            >
              {log?.targetBobjectName}{' '}
            </span>
            when {log?.bobjectEvent?.toLowerCase()}d.
          </Text>
        </div>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.STOP_CADENCE:
    case WORKFLOWS_ACTIONS_TYPES_KEYS.STOP_CADENCE_FOR_ALL_LEADS:
      return (
        <div className={styles._log_text_block}>
          <Text size="s">
            <b>Cadence stopped</b> in{' '}
            <span
              onClick={() => openBobjectDetails({ id: targetBobjectId, showContactButton: true })}
              className={styles._bobjectName}
            >
              {targetBobjectName || sourceBobjectName}{' '}
            </span>
            when {bobjectEvent?.toLowerCase()}d.
          </Text>
        </div>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.BLACKLIST:
      return (
        <div className={styles._compound_text_block}>
          <div className={styles._log_text_block}>
            <Text size="s" inline>
              The lead{' '}
              <span
                onClick={() => openBobjectDetails({ id: sourceBobjectId, showContactButton: true })}
                className={styles._bobjectName}
              >
                {log?.sourceBobjectName}{' '}
              </span>
              could not be executed in the workflow to prevent an infinite loop. During the next
              hour this {sourceBobjectType} will be blacklisted.
            </Text>
          </div>
        </div>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.UPDATE_PROPERTY:
    case WORKFLOWS_ACTIONS_TYPES_KEYS.UPDATE_PROPERTY_FOR_ALL_LEADS:
      return (
        <span className={styles._log_text_block_span}>
          <Text size="s">
            Propert{fieldNamesLength > 1 ? 'ies' : 'y'}{' '}
            <b>
              {fieldNames?.slice(0, 3).join(', ')}{' '}
              {fieldNamesLength >= 3 && `and ${fieldNamesLength - 3} more `}
            </b>
            updated in{' '}
            <span
              onClick={() => openBobjectDetails({ id: targetBobjectId, showContactButton: true })}
              className={styles._bobjectName}
            >
              {targetBobjectName || sourceBobjectName}{' '}
            </span>
            when {bobjectEvent?.toLowerCase()}d.
          </Text>
        </span>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.CREATE_NOTIFICATION:
      return (
        <div className={styles._log_text_block}>
          <Text size="s">
            <b>Notification created</b> in{' '}
            <span
              onClick={() => openBobjectDetails({ id: targetBobjectId, showContactButton: true })}
              className={styles._bobjectName}
            >
              {targetBobjectName || sourceBobjectName}{' '}
            </span>
            when {bobjectEvent?.toLowerCase()}d.
          </Text>
        </div>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.CREATE_TASK:
      return (
        <div className={styles._log_text_block}>
          <Text size="s">
            <b>Task created</b> in{' '}
            <span
              onClick={() => openBobjectDetails({ id: targetBobjectId, showContactButton: true })}
              className={styles._bobjectName}
            >
              {targetBobjectName || sourceBobjectName}{' '}
            </span>
            when {bobjectEvent?.toLowerCase()}d.
          </Text>
        </div>
      );
    case WORKFLOWS_ACTIONS_TYPES_KEYS.REASSIGN:
    case WORKFLOWS_ACTIONS_TYPES_KEYS.REASSIGN_ALL_LEADS:
      return (
        <div className={styles._log_text_block}>
          <Text size="s">
            Reassign{' '}
            <span
              onClick={() => openBobjectDetails({ id: targetBobjectId, showContactButton: true })}
              className={styles._bobjectName}
            >
              {targetBobjectName || sourceBobjectName}{' '}
            </span>
            to <b>{options?.targetUserName} </b>
            when {bobjectEvent?.toLowerCase()}d.
          </Text>
        </div>
      );
  }
};

const getFieldNames = (log: WokflowLog, bobjectFields: any): string[] => {
  const fieldIds = log?.dataChange && Object.keys(JSON.parse(log?.dataChange));
  if (bobjectFields) return fieldIds?.map(fieldId => bobjectFields.findBy('id', fieldId)?.name);
};

export const LogsPlaceholder = () => {
  return (
    <div className={styles._card}>
      <header className={styles._card_header}>
        <div className={styles._skeleton_card}>
          <Skeleton variant="circle" width={32} height={32} />
          <div className={styles._card_header_text}>
            <Skeleton variant="text" width="40%" height={16} />
            <Skeleton variant="text" width="20%" height={12} />
          </div>
        </div>
        <div className={styles._skeleton_card}>
          <Skeleton variant="circle" width={32} height={32} />
          <div className={styles._card_header_text}>
            <Skeleton variant="text" width="60%" height={16} />
            <Skeleton variant="text" width="20%" height={12} />
          </div>
        </div>
        <div className={styles._skeleton_card}>
          <Skeleton variant="circle" width={32} height={32} />
          <div className={styles._card_header_text}>
            <Skeleton variant="text" width="40%" height={16} />
            <Skeleton variant="text" width="20%" height={12} />
          </div>
        </div>
      </header>
    </div>
  );
};

export const getText = (
  log: WokflowLog,
  bobjectFields: any,
  options: any,
  openBobjectDetails: (config: any) => void,
) => {
  const translateError = () => {
    if (log?.error.includes('id')) {
      const statusArray: string[] = log?.error.split(' ');
      statusArray[3] = log?.sourceBobjectName;
      return statusArray.join(' ');
    }
    return log?.error;
  };

  return (
    <div className={styles._log_text_block}>
      {logTextTranslator(log, bobjectFields, options, openBobjectDetails)}
      {log?.logType === 'ERROR' && log?.action !== WORKFLOWS_ACTIONS_TYPES_KEYS.BLACKLIST && (
        <div className={styles._log_text_block}>
          <Text size="s" color="tomato">
            {' '}
            Failed.{' '}
          </Text>
          <Tooltip title={translateError} position="top">
            <Text size="s" color="tomato" decoration="underline">
              See error details
            </Text>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
