import { EVENTS, STEPS } from './wizardMachine';

export const stepsMachineNextSteps = {
  id: 'inactive_handling_steps',
  context: {},
  initial: STEPS.INACTIVE_HANDLING,
  states: {
    [STEPS.INACTIVE_HANDLING]: {
      on: {
        [EVENTS.NEXT]: [
          {
            // actions: [pureHandleSubmit],
            actions: ['handleSubmit'],
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
