import React, { useMemo } from 'react';
import { Icon, Item, Section, Select, Text } from '@bloobirds-it/flamingo-ui';
import styles from './triggers.module.css';
import { useWorkflows } from '../../../useAutomationsEdition';
import { toTitleCase } from '../../../../../../utils/strings.utils';
import { useWorkflow } from '../../context/workflowsContext';
import { workflowsContextActions } from '../../context/workflowsContextActions';
import { WorkflowType } from '../../workflows.types';

const WorkflowTriggers = () => {
  interface WorkflowTypeSections {
    [key: string]: WorkflowType[];
  }

  const { availableActions } = useWorkflows();
  const generateSections = (): WorkflowTypeSections => {
    return availableActions?.reduce<WorkflowTypeSections>((acc, curr) => {
      const bobjectTypeWorkflowTypes = acc[curr?.bobjectType];
      if (bobjectTypeWorkflowTypes) {
        acc[curr?.bobjectType] = [...bobjectTypeWorkflowTypes, curr];
      } else {
        acc[curr?.bobjectType] = [curr];
      }
      return acc;
    }, {});
  };

  const {
    state: { trigger, isEnabled, isLocked, isSubmitting, isMissingInfo },
    dispatch,
    updateIsDirty,
  } = useWorkflow();
  const actionSections = useMemo(() => generateSections(), [availableActions]);
  const fieldIsIncomplete = isMissingInfo && isSubmitting && !trigger;

  return (
    <div className={styles._action_page__container}>
      <div className={styles._workflows_actions_icon}>
        <Icon
          name={trigger ? trigger.icon : 'plusSquare'}
          color={trigger ? 'banana' : 'lightPeanut'}
          size={40}
        />
      </div>
      <div className={styles._workflows_actions_text}>
        <Text size="l">When</Text>
      </div>
      <Select
        placeholder="Select type"
        width="260px"
        borderless={false}
        value={trigger}
        disabled={isEnabled || isLocked}
        defaultValue=""
        size="small"
        warning={fieldIsIncomplete && 'Missing required information'}
        renderDisplayValue={selectedTrigger => {
          const words = selectedTrigger?.label?.split(' ');
          return (
            <span>
              {words &&
                words.map((word: string, index: number) => {
                  if (index === 1) {
                    return <b>{word} </b>;
                  }
                  return `${word} `;
                })}
            </span>
          );
        }}
        onChange={value => {
          dispatch({ type: workflowsContextActions.SET_TRIGGER, payload: { trigger: value } });
          updateIsDirty(true);
        }}
      >
        {actionSections &&
          Object.keys(actionSections).map(type => {
            return [
              <Section key={`section-${type}`}>{toTitleCase(type)}</Section>,
              actionSections[type]?.map(t => (
                <Item key={t.name} value={t}>
                  {t.label}
                </Item>
              )),
            ];
          })}
      </Select>
    </div>
  );
};

export default WorkflowTriggers;
