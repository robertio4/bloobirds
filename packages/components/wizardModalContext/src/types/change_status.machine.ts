import { EVENTS, STEPS } from './wizardMachine';

export const stepsMachineChangeStatus = {
  id: 'change_status_steps',
  context: {},
  initial: STEPS.INITIAL,
  states: {
    [STEPS.INITIAL]: {
      on: {
        [STEPS.ORIGINAL_CHANGE_STATUS_COMPONENT]: STEPS.ORIGINAL_CHANGE_STATUS_COMPONENT,
        [STEPS.CHANGE_STATUS_SALESFORCE]: STEPS.CHANGE_STATUS_SALESFORCE,
      },
    },
    [STEPS.ORIGINAL_CHANGE_STATUS_COMPONENT]: {
      on: {
        [EVENTS.NEXT]: [
          {
            actions: ['handleClose'],
          },
        ],
        [EVENTS.SKIP]: [
          {
            actions: ['handleSkip'],
          },
        ],
      },
    },
    [STEPS.CHANGE_STATUS_SALESFORCE]: {
      on: {
        [EVENTS.NEXT]: [
          {
            actions: ['handleClose'],
          },
        ],
        [EVENTS.SKIP]: [
          {
            actions: ['handleSkip'],
          },
        ],
      },
    },
  },
};
