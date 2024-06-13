import { createMachine } from "/vendor/.vite-deps-xstate.js__v--ca84df4a.js";
export var STEPS = /* @__PURE__ */ ((STEPS2) => {
  STEPS2["INITIAL"] = "INITIAL";
  STEPS2["EXIT"] = "EXIT";
  STEPS2["NEXT_STEPS"] = "NEXT_STEPS";
  STEPS2["CONFIGURE_CADENCE"] = "CONFIGURE_CADENCE";
  STEPS2["SCHEDULE_NEXT_STEP"] = "SCHEDULE_NEXT_STEP";
  STEPS2["UPDATE_LEADS_STATUSES"] = "UPDATE_LEADS_STATUSES";
  STEPS2["STOP_CADENCE"] = "STOP_CADENCE";
  STEPS2["CADENCE_FEEDBACK"] = "CADENCE_FEEDBACK";
  return STEPS2;
})(STEPS || {});
const isConfigureNewCadence = (context, event) => event.selectedStep === "CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */;
const isDoAnytingElse = (context, event) => event.selectedStep === "EXIT" /* EXIT */;
const isScheduleNextStep = (context, event) => event.selectedStep === "NEXT_STEPS" /* NEXT_STEPS */;
const hasLeads = (context, event) => event.hasLeads;
const closeModals = (context) => context.handleClose();
export const EVENTS = Object.seal({
  NEXT: "NEXT",
  PREVIOUS: "PREVIOUS",
  SKIP: "SKIP"
});
export const stepsMachine = createMachine({
  id: "cadence_control_steps",
  context: {
    isAccount: false
  },
  initial: "NEXT_STEPS" /* NEXT_STEPS */,
  states: {
    ["INITIAL" /* INITIAL */]: {
      on: {
        ["NEXT_STEPS" /* NEXT_STEPS */]: "NEXT_STEPS" /* NEXT_STEPS */,
        ["CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */]: "CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */,
        ["UPDATE_LEADS_STATUSES" /* UPDATE_LEADS_STATUSES */]: "UPDATE_LEADS_STATUSES" /* UPDATE_LEADS_STATUSES */,
        ["SCHEDULE_NEXT_STEP" /* SCHEDULE_NEXT_STEP */]: "SCHEDULE_NEXT_STEP" /* SCHEDULE_NEXT_STEP */
      }
    },
    ["NEXT_STEPS" /* NEXT_STEPS */]: {
      on: {
        [EVENTS.NEXT]: [{
          target: "CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */,
          cond: isConfigureNewCadence
        }, {
          target: "SCHEDULE_NEXT_STEP" /* SCHEDULE_NEXT_STEP */,
          cond: isScheduleNextStep
        }, {
          actions: [closeModals],
          cond: isDoAnytingElse
        }],
        ["CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */]: "CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */,
        ["UPDATE_LEADS_STATUSES" /* UPDATE_LEADS_STATUSES */]: "UPDATE_LEADS_STATUSES" /* UPDATE_LEADS_STATUSES */
      }
    },
    ["CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */]: {
      on: {
        [EVENTS.NEXT]: "CADENCE_FEEDBACK" /* CADENCE_FEEDBACK */,
        [EVENTS.PREVIOUS]: "NEXT_STEPS" /* NEXT_STEPS */
      }
    },
    ["CADENCE_FEEDBACK" /* CADENCE_FEEDBACK */]: {
      on: {
        [EVENTS.NEXT]: [{
          target: "UPDATE_LEADS_STATUSES" /* UPDATE_LEADS_STATUSES */,
          cond: hasLeads
        }, {
          actions: [closeModals]
        }]
      }
    },
    ["UPDATE_LEADS_STATUSES" /* UPDATE_LEADS_STATUSES */]: {
      on: {
        [EVENTS.PREVIOUS]: "CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */
      }
    },
    ["STOP_CADENCE" /* STOP_CADENCE */]: {
      on: {
        [EVENTS.NEXT]: [{
          target: "CONFIGURE_CADENCE" /* CONFIGURE_CADENCE */,
          cond: isConfigureNewCadence
        }, {
          actions: "SCHEDULE_NEXT_STEP" /* SCHEDULE_NEXT_STEP */,
          cond: isScheduleNextStep
        }, {
          actions: [closeModals],
          cond: isDoAnytingElse
        }]
      }
    },
    ["SCHEDULE_NEXT_STEP" /* SCHEDULE_NEXT_STEP */]: {
      on: {
        [EVENTS.NEXT]: [{
          actions: [closeModals]
        }],
        [EVENTS.PREVIOUS]: [{
          target: "NEXT_STEPS" /* NEXT_STEPS */
        }]
      }
    }
  }
});
