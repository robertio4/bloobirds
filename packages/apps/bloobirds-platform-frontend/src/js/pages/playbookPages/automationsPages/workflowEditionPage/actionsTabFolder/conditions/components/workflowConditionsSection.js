import React from 'react';
import styles from '../conditions.module.css';
import { Button, Icon, IconButton, Label, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import AccountSettingsTab from '../../../../../../../layouts/accountSettingsLayout/accountSettingsTab';
import ConditionSelectModule from './workflowConditionSelect';
import { useWorkflow } from '../../../context/workflowsContext';

const WorkflowConditionsSection = ({ index, fields }) => {
  const moduleIndex = index;
  const { state, addAndCondition, removeOrBlock, addOrBlock, cloneOrBlock } = useWorkflow();
  const { conditions, isEnabled } = state;

  return (
    <div className={styles._conditions_connector_wrapper}>
      <div className={styles._conditions_connector} />
      <AccountSettingsTab>
        <div className={styles._conditions_module_header}>
          {moduleIndex === 0 ? (
            <>
              <div className={styles._workflows_conditions_icon}>
                <Icon name="sliders" color={conditions ? 'purple' : 'lightPeanut'} size={40} />
              </div>
              <div className={styles._workflows_conditions_icon_wrapper}>
                <Tooltip title="Duplicate current condition block" position="top">
                  <IconButton
                    color={isEnabled ? 'verySoftPeanut' : 'purple'}
                    disabled={state?.isEnabled || state?.isLocked}
                    onClick={() => {
                      cloneOrBlock(index);
                    }}
                    name="copy"
                  />
                </Tooltip>
                <IconButton
                  color={state?.isEnabled ? 'verySoftPeanut' : 'purple'}
                  disabled={state?.isEnabled || state?.isLocked}
                  onClick={() => {
                    removeOrBlock(index);
                  }}
                  name="cross"
                />
              </div>
              <div className={styles._workflows_conditions_text}>
                <Text size="l">and</Text>
              </div>
            </>
          ) : (
            <>
              <div className={styles._conditions_header_space} />
              <div className={styles._workflows_conditions_icon_wrapper}>
                <Tooltip title="Duplicate current condition block" position="top">
                  <IconButton
                    color={isEnabled ? 'verySoftPeanut' : 'purple'}
                    disabled={state?.isEnabled}
                    onClick={() => {
                      cloneOrBlock(index);
                    }}
                    name="copy"
                  />
                </Tooltip>
                <IconButton
                  color={isEnabled ? 'verySoftPeanut' : 'purple'}
                  disable={state?.isEnabled || state?.isLocked}
                  onClick={() => {
                    if (!state?.isEnabled) removeOrBlock(index);
                  }}
                  name="cross"
                />
              </div>
            </>
          )}
        </div>
        {fields.map((fieldPair, fieldIndex) => (
          <ConditionSelectModule
            key={`${index} - ${fieldIndex}`}
            index={fieldIndex}
            block={moduleIndex}
            fieldPair={fieldPair}
          />
        ))}
        <div className={styles._conditions_section_button}>
          <Button
            size="small"
            variant="clear"
            expand={false}
            color="purple"
            disabled={!fields[fields.length - 1]?.value?.type || isEnabled}
            onClick={() => {
              addAndCondition(moduleIndex);
            }}
          >
            + condition
          </Button>
        </div>
      </AccountSettingsTab>
      <>
        <div className={styles._conditions_connector_wrapper}>
          <div className={styles._conditions_connector} />
          {index + 1 !== conditions?.length ? (
            <>
              <div className={styles._conditions_label}>
                <Label color="verySoftPurple" textColor="purple" uppercase={false}>
                  or fulfills the following conditions
                </Label>
              </div>
              <div className={styles._conditions_connector} />
            </>
          ) : (
            <div className={styles._conditions_excluding_button}>
              <Button
                size="small"
                variant="secondary"
                expand={false}
                disabled={isEnabled}
                color="purple"
                onClick={() => addOrBlock()}
              >
                {index === 1 ? '+' : '+ or'}
              </Button>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default WorkflowConditionsSection;
