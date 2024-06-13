import { EVENTS } from '@bloobirds-it/wizard-modal-context';
import { createMachine } from 'xstate';

export const MODAL_STEPS = Object.seal({
  CONTACT_FLOW: 'CONTACT_FLOW',
  CADENCE_CONTROL: 'CADENCE_CONTROL',
  CHANGE_STATUS: 'CHANGE_STATUS',
});

const closeModals = context => context.handleClose();

export const modalStepsMachine = createMachine({
  id: 'contact_flow_modal_control',
  context: {
    handleClose: null,
  },
  initial: MODAL_STEPS.CONTACT_FLOW,
  states: {
    [MODAL_STEPS.CONTACT_FLOW]: {
      on: {
        [MODAL_STEPS.CADENCE_CONTROL]: MODAL_STEPS.CADENCE_CONTROL,
        [MODAL_STEPS.CHANGE_STATUS]: MODAL_STEPS.CHANGE_STATUS,
      },
    },
    [MODAL_STEPS.CADENCE_CONTROL]: {
      on: {
        [EVENTS.NEXT]: closeModals,
        [MODAL_STEPS.CHANGE_STATUS]: MODAL_STEPS.CHANGE_STATUS,
      },
    },
    [MODAL_STEPS.CHANGE_STATUS]: {
      on: {
        [EVENTS.NEXT]: closeModals,
        [MODAL_STEPS.CHANGE_STATUS]: MODAL_STEPS.CHANGE_STATUS,
      },
    },
  },
});
