import { createMachine } from 'xstate';

export enum STEPS {
  INITIAL = 'INITIAL',
  EXIT = 'EXIT',
  NEXT_STEPS = 'NEXT_STEPS',
  CONFIGURE_CADENCE = 'CONFIGURE_CADENCE',
  SCHEDULE_NEXT_STEP = 'SCHEDULE_NEXT_STEP',
  UPDATE_LEADS_STATUSES = 'UPDATE_LEADS_STATUSES',
  STOP_CADENCE = 'STOP_CADENCE',
  CADENCE_FEEDBACK = 'CADENCE_FEEDBACK',
}

const isConfigureNewCadence = (context, event) => event.selectedStep === STEPS.CONFIGURE_CADENCE;
const isDoAnytingElse = (context, event) => event.selectedStep === STEPS.EXIT;
const isScheduleNextStep = (context, event) => event.selectedStep === STEPS.NEXT_STEPS;
const hasLeads = (context, event) => event.hasLeads;

const closeModals = context => context.handleClose();

export const EVENTS = Object.seal({
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
  SKIP: 'SKIP',
});

interface MachineContextProps {
  isAccount?: boolean;
  nextStep?: () => void;
  handleBack?: () => void;
  handleClose?: () => void;
  handleSkip?: () => void;
}

export const stepsMachine = createMachine({
  id: 'cadence_control_steps',
  context: {
    isAccount: false,
  } as MachineContextProps,
  initial: STEPS.NEXT_STEPS,
  states: {
    [STEPS.INITIAL]: {
      on: {
        [STEPS.NEXT_STEPS]: STEPS.NEXT_STEPS,
        [STEPS.CONFIGURE_CADENCE]: STEPS.CONFIGURE_CADENCE,
        [STEPS.UPDATE_LEADS_STATUSES]: STEPS.UPDATE_LEADS_STATUSES,
        [STEPS.SCHEDULE_NEXT_STEP]: STEPS.SCHEDULE_NEXT_STEP,
      },
    },
    [STEPS.NEXT_STEPS]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.CONFIGURE_CADENCE,
            cond: isConfigureNewCadence,
          },
          {
            target: STEPS.SCHEDULE_NEXT_STEP,
            cond: isScheduleNextStep,
          },
          {
            actions: [closeModals],
            cond: isDoAnytingElse,
          },
        ],
        [STEPS.CONFIGURE_CADENCE]: STEPS.CONFIGURE_CADENCE,
        [STEPS.UPDATE_LEADS_STATUSES]: STEPS.UPDATE_LEADS_STATUSES,
      },
    },
    [STEPS.CONFIGURE_CADENCE]: {
      on: {
        [EVENTS.NEXT]: STEPS.CADENCE_FEEDBACK,
        [EVENTS.PREVIOUS]: STEPS.NEXT_STEPS,
      },
    },
    [STEPS.CADENCE_FEEDBACK]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.UPDATE_LEADS_STATUSES,
            cond: hasLeads,
          },
          {
            actions: [closeModals],
          },
        ],
      },
    },
    [STEPS.UPDATE_LEADS_STATUSES]: {
      on: {
        [EVENTS.PREVIOUS]: STEPS.CONFIGURE_CADENCE,
      },
    },
    [STEPS.STOP_CADENCE]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.CONFIGURE_CADENCE,
            cond: isConfigureNewCadence,
          },
          {
            actions: STEPS.SCHEDULE_NEXT_STEP,
            cond: isScheduleNextStep,
          },
          {
            actions: [closeModals],
            cond: isDoAnytingElse,
          },
        ],
      },
    },
    [STEPS.SCHEDULE_NEXT_STEP]: {
      on: {
        [EVENTS.NEXT]: [
          {
            actions: [closeModals],
          },
        ],
        [EVENTS.PREVIOUS]: [
          {
            target: STEPS.NEXT_STEPS,
          },
        ],
      },
    },
  },
});
