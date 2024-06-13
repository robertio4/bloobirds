import { WORKFLOWS_ACTIONS_TYPES } from './actions.constants';
import React from 'react';
import ClearPropertyModule from './components/actionsComponents/clearPropertyComponent';
import UpdatePropertyModule from './components/actionsComponents/updatePropertyComponent';
import CopyPropertyModule from './components/actionsComponents/copyPropertyComponent';
import CreateTaskModule from './components/actionsComponents/createTaskComponent';
import StartCadenceComponent from './components/actionsComponents/startCadenceComponent';
import ReassignComponent from './components/actionsComponents/reassignComponent';

export const moduleTranslator = props => {
  switch (WORKFLOWS_ACTIONS_TYPES[typeof props === 'string' ? props : props?.action?.type]) {
    case WORKFLOWS_ACTIONS_TYPES.CREATE_TASK:
      return {
        icon: 'check',
        component: <CreateTaskModule blockIndex={props.blockIndex} action={props.action} />,
      };
    case WORKFLOWS_ACTIONS_TYPES.COPY_PROPERTY_FOR_ALL_LEADS:
    case WORKFLOWS_ACTIONS_TYPES.COPY_PROPERTY:
      return {
        icon: 'copy',
        component: <CopyPropertyModule blockIndex={props.blockIndex} action={props.action} />,
      };
    case WORKFLOWS_ACTIONS_TYPES.UPDATE_PROPERTY_FOR_ALL_LEADS:
    case WORKFLOWS_ACTIONS_TYPES.UPDATE_PROPERTY:
      return {
        icon: 'repeat',
        component: <UpdatePropertyModule blockIndex={props.blockIndex} action={props.action} />,
      };
    case WORKFLOWS_ACTIONS_TYPES.CLEAR_PROPERTY_FOR_ALL_LEADS:
    case WORKFLOWS_ACTIONS_TYPES.CLEAR_PROPERTY:
      return {
        icon: 'cross',
        component: <ClearPropertyModule blockIndex={props.blockIndex} action={props.action} />,
      };
    case WORKFLOWS_ACTIONS_TYPES.CREATE_NOTIFICATION:
      return {
        icon: 'bell',
        component: <CreateTaskModule blockIndex={props.blockIndex} action={props.action} />,
      };
    case WORKFLOWS_ACTIONS_TYPES.START_CADENCE_FOR_ALL_LEADS:
    case WORKFLOWS_ACTIONS_TYPES.START_CADENCE:
      return {
        icon: 'flag',
        component: <StartCadenceComponent blockIndex={props.blockIndex} action={props.action} />,
      };
    case WORKFLOWS_ACTIONS_TYPES.STOP_CADENCE_FOR_ALL_LEADS:
    case WORKFLOWS_ACTIONS_TYPES.STOP_CADENCE:
      return {
        icon: 'slash',
        component: <></>,
      };
    case WORKFLOWS_ACTIONS_TYPES.BLACKLIST:
      return {
        icon: 'refresh',
        component: <></>,
      };
    case WORKFLOWS_ACTIONS_TYPES.REASSIGN_FOR_ALL_LEADS:
    case WORKFLOWS_ACTIONS_TYPES.REASSIGN:
      return {
        icon: 'deliver',
        component: <ReassignComponent blockIndex={props.blockIndex} action={props.action} />,
      };
  }
};
