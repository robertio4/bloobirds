import {
  ColorType,
  Icon,
  IconButton,
  Label,
  Switch,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import {
  EntityCard,
  EntityCardItem,
} from '../../../../../components/entityList/entityCard/entityCard';
import styles from '../workflowsPage.module.css';
import { useWorkflows } from '../../useAutomationsEdition';
import { workflowEditUrl } from '../../../../../app/_constants/routes';
import { useRouter } from '../../../../../hooks';
import { WorkflowCloneModal } from './workflowCloneModal';
import SessionManagerFactory from '../../../../../misc/session';
import { formatDate } from '@bloobirds-it/utils';

const WORKFLOW_STATUSES: {
  [key: string]: { label: string; tooltip: string; color: ColorType; textColor: ColorType };
} = Object.freeze({
  RUNNING: {
    label: 'Running',
    tooltip: 'The workflow does not have any errors in the las 7 days',
    color: 'verySoftMelon',
    textColor: 'melon',
  },
  SOME_ERRORS: {
    label: 'Some errors',
    tooltip: 'The workflow has had some errors in the last 7 days',
    color: 'verySoftTomato',
    textColor: 'tomato',
  },
  NO_ACTIONS_PERFORMED: {
    label: 'No actions performed',
    tooltip: 'The workflow has not performed any action in the last 60 days',
    color: 'banana',
    textColor: 'lightestBanana',
  },
  OFF: {
    label: 'Off',
    tooltip: 'The workflow is disabled',
    color: 'verySoftPeanut',
    textColor: 'softPeanut',
  },
});

const StatusLabel = ({ workflow }) => {
  const { workflowStatus } = workflow || {};
  const { label, tooltip, color, textColor } = WORKFLOW_STATUSES[workflowStatus] || {};

  return (
    <Tooltip title={tooltip} position="top">
      <Label size="small" uppercase={false} color={color} textColor={textColor}>
        {label}
      </Label>
    </Tooltip>
  );
};

const WorkflowsCard = ({ workflow }) => {
  const [showCloneModal, setShowCloneModal] = useState(false);
  const { history } = useRouter();
  const {
    id,
    author,
    authorName,
    isEnabled,
    name,
    createdAt,
    updatedAt,
    runs,
    anyoneCanEdit,
  } = workflow;
  const { handleDeleteWorkflow, handleEnableWorkflow, handleDisableWorkflow } = useWorkflows();
  const SessionManager = SessionManagerFactory();
  const isOwner = SessionManager?.getUser()?.id === author;
  const onClose = () => {
    setShowCloneModal(false);
  };

  return (
    <>
      <EntityCard />
      <EntityCard>
        <EntityCardItem>
          <Text size="s" color="peanut" ellipsis={60}>
            {name}
          </Text>
        </EntityCardItem>
        <EntityCardItem>
          <StatusLabel workflow={workflow} />
        </EntityCardItem>
        <EntityCardItem size="small" className={styles._card_ray}>
          <Icon name="zap" color="purple" size="18" />
          <Text color="purple" size="s">
            {runs}
          </Text>
        </EntityCardItem>
        <EntityCardItem>{authorName}</EntityCardItem>
        <EntityCardItem>{formatDate(new Date(createdAt), 'MMM dd, yyyy')}</EntityCardItem>
        <EntityCardItem>
          {formatDate(
            new Date(
              updatedAt?.split('.')[0]?.toString() +
                (updatedAt?.split('.')[0]?.toString().slice(-1) === 'Z' ? '' : 'Z'),
            ),
            'MMM dd, HH:mm yyyy',
          )}
        </EntityCardItem>
        <EntityCardItem size="small">
          <div className={styles._actions__container}>
            <Switch
              checked={isEnabled}
              color="purple"
              onChange={() =>
                isEnabled ? handleDisableWorkflow(id) : handleEnableWorkflow(id, false)
              }
            />
            <IconButton
              color="purple"
              name="clone"
              size={24}
              onClick={() => setShowCloneModal(true)}
            />
            <IconButton
              color="purple"
              name="edit"
              onClick={() => history.push(`${workflowEditUrl(workflow.id)}&name=${workflow.name}`)}
            />
            <Tooltip
              title={
                !anyoneCanEdit && !isOwner
                  ? `The author of the workflow has not allowed deleting this workflow. Ask ${authorName} for permissions to delete it`
                  : "Delete workflow, remember that deleting a workflow will not delete it's historical data."
              }
              position="top"
            >
              <IconButton
                color="purple"
                name="trashFull"
                disabled={!anyoneCanEdit && !isOwner}
                onClick={() => handleDeleteWorkflow(id)}
              />
            </Tooltip>
          </div>
        </EntityCardItem>
      </EntityCard>
      {showCloneModal && <WorkflowCloneModal workflow={workflow} onClose={onClose} />}
    </>
  );
};

export default WorkflowsCard;
