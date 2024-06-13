import { EVENTS, STEPS } from './wizardMachine';

export const stepsMachineMeetingReportResult = {
  id: 'meeting_report_result_steps',
  context: {},
  initial: STEPS.INITIAL,
  states: {
    [STEPS.INITIAL]: {
      always: [
        {
          target: STEPS.MEETING_RESULT,
        },
      ],
    },
    [STEPS.MEETING_RESULT]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.NOTES,
          },
        ],
      },
    },
    [STEPS.NOTES]: {
      on: {
        [EVENTS.PREVIOUS]: [
          {
            target: STEPS.MEETING_RESULT,
          },
        ],
        // [EVENTS.NEXT]: [
        //   {
        //     actions: [handleClose],
        //   },
        // ],
      },
    },
  },
};
