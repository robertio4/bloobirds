import React, { useState } from 'react';
import styles from '../../styles/fieldsPage.module.css';
import { Button, Icon, IconButton, Input, Switch, Tooltip } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import ReactDOM from 'react-dom';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { CALL_RESULTS_LOGIC_ROLE } from '../../../../../constants/callResult';
import { OPPORTUNITY_STATUS_LOGIC_ROLE } from '../../../../../constants/opportunity';
import { MEETING_RESULTS_LOGIC_ROLE } from '../../../../../constants/meetingResult';
import { v4 as uuid } from 'uuid';

export const Portal = ({ isDraggin, children }) => {
  if (!isDraggin) {
    return <>{children}</>;
  }

  return ReactDOM.createPortal(children, document.body);
};

export const PICKLIST_VALUES_FIELDS_DISABLED = [
  ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  LEAD_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  TASK_FIELDS_LOGIC_ROLE.STATUS,
];

export const SYSTEM_PICKLIST_VALUES = [
  CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT,
  CALL_RESULTS_LOGIC_ROLE.APPROACH,
  CALL_RESULTS_LOGIC_ROLE.GATEKEEPER,
  CALL_RESULTS_LOGIC_ROLE.NO_ANSWER,
  CALL_RESULTS_LOGIC_ROLE.WRONG_DATA,
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
  MEETING_RESULTS_LOGIC_ROLE.NO_SHOW,
  MEETING_RESULTS_LOGIC_ROLE.UNQUALIFIED,
  MEETING_RESULTS_LOGIC_ROLE.QUALIFIED,
  MEETING_RESULTS_LOGIC_ROLE.UNQUALIFIED_LEAD,
  MEETING_RESULTS_LOGIC_ROLE.SCHEDULED,
];

export const PicklistValue = ({
  value,
  handleProps,
  containerProps,
  removeValueFromPicklist,
  addValueToPicklist,
  editValuePicklist,
  isCreation,
  innerRef,
  isDragging,
  fieldOrGlobal,
}) => {
  const isSystemField = !!value?.logicRole;
  const isNameDisabled =
    (PICKLIST_VALUES_FIELDS_DISABLED.includes(fieldOrGlobal?.logicRole) && isSystemField) ||
    SYSTEM_PICKLIST_VALUES.includes(value?.logicRole);
  const [nameValue, setNameValue] = useState();
  const [scoreValue, setScoreValue] = useState();
  const [isConfirmation, setIsConfirmation] = useState(false);

  const handleReset = () => {
    setNameValue('');
    setScoreValue(null);
  };

  const handleAdd = () => {
    addValueToPicklist({
      id: uuid(),
      value: nameValue,
      enabled: true,
      score: scoreValue || 0,
    });
    handleReset();
  };

  const handleRemove = () => {
    removeValueFromPicklist({
      index: value?.index,
    });
    handleReset();
    setIsConfirmation(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && isCreation) {
      handleAdd();
    }
  };

  return (
    <Portal isDraggin={isDragging}>
      <div
        className={classNames(styles._picklist_value_container, {
          [styles._card__dragging]: isDragging,
          [styles._picklist_dragging]: isDragging,
        })}
        {...containerProps}
        {...handleProps}
        ref={innerRef}
      >
        <div className={styles._picklist_value_left}>
          <div>
            <Icon name="dragAndDrop" color="softPeanut" />
          </div>
          <div className={styles._picklist_value_name}>
            <Tooltip
              title={
                isNameDisabled &&
                'This is a value used by the system, some properties are not available to be edited.'
              }
              position={isNameDisabled && 'top-start'}
            >
              <Input
                disabled={isNameDisabled}
                placeholder="Name*"
                size="small"
                width="100%"
                onChange={v => {
                  isCreation ? setNameValue(v) : editValuePicklist({ ...value, value: v });
                }}
                defaultValue={isCreation ? nameValue : value?.value}
                value={isCreation ? nameValue : value?.value}
                onKeyPress={handleKeyPress}
              />
            </Tooltip>
          </div>
          <div className={styles._picklist_value_score}>
            <Input
              // disabled={!enableValue && !isCreation}
              placeholder="Score"
              size="small"
              type="number"
              width="100%"
              onChange={v => {
                isCreation ? setScoreValue(v) : editValuePicklist({ ...value, score: v });
              }}
              defaultValue={isCreation ? scoreValue : value?.score}
              value={isCreation ? scoreValue : value?.score}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className={styles._piclist_value_right}>
          {!isCreation && (
            <>
              <Tooltip
                title={
                  isSystemField &&
                  'This is a value used by the system, some properties are not available to be edited errors.'
                }
                position={isSystemField && 'top-start'}
              >
                <Switch
                  onChange={v => {
                    editValuePicklist({ ...value, enabled: v });
                  }}
                  checked={value?.enabled}
                  disabled={isSystemField}
                />
              </Tooltip>
              {isConfirmation ? (
                <Button
                  variant="clear"
                  color="tangerine"
                  size="small"
                  disabled={isSystemField}
                  onClick={handleRemove}
                >
                  Sure ?
                </Button>
              ) : (
                <IconButton
                  name="trashFull"
                  onClick={() => setIsConfirmation(true)}
                  disabled={isSystemField}
                />
              )}
            </>
          )}
          {isCreation && (
            <>
              <Button size="small" onClick={handleAdd}>
                ADD
              </Button>
              <IconButton name="redoReload" />
            </>
          )}
        </div>
      </div>
    </Portal>
  );
};
