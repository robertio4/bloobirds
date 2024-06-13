import { assign, createMachine } from "/vendor/.vite-deps-xstate.js__v--ca84df4a.js";
export var STATES = /* @__PURE__ */ ((STATES2) => {
  STATES2["INITIAL"] = "INITIAL";
  STATES2["PARENT"] = "PARENT";
  STATES2["CHILD"] = "CHILD";
  STATES2["CONFIRM"] = "CONFIRM";
  STATES2["DELETE_PARENT"] = "DELETE_PARENT";
  return STATES2;
})(STATES || {});
export var EVENTS = /* @__PURE__ */ ((EVENTS2) => {
  EVENTS2["NEXT"] = "NEXT";
  EVENTS2["PREVIOUS"] = "PREVIOUS";
  EVENTS2["CANCEL"] = "CANCEL";
  return EVENTS2;
})(EVENTS || {});
const closeModal = (context) => {
  context.handleClose();
};
export const stepsMachine = (initialValue) => createMachine({
  id: "related_bobject_steps",
  context: {
    type: "",
    bobjectsToLink: null,
    handleClose: null,
    dataToAssign: null
  },
  initial: initialValue || "INITIAL" /* INITIAL */,
  states: {
    ["INITIAL" /* INITIAL */]: {
      on: {
        ["PARENT" /* PARENT */]: "PARENT" /* PARENT */,
        ["CHILD" /* CHILD */]: "CHILD" /* CHILD */,
        ["DELETE_PARENT" /* DELETE_PARENT */]: "DELETE_PARENT" /* DELETE_PARENT */
      }
    },
    ["PARENT" /* PARENT */]: {
      on: {
        ["CONFIRM" /* CONFIRM */]: [{
          target: "CONFIRM" /* CONFIRM */,
          actions: assign({
            dataToAssign: (context, event) => event.dataToAssign,
            type: "PARENT" /* PARENT */
          })
        }]
      }
    },
    ["CHILD" /* CHILD */]: {
      on: {
        ["CONFIRM" /* CONFIRM */]: [{
          target: "CONFIRM" /* CONFIRM */,
          actions: assign({
            dataToAssign: (context, event) => event.dataToAssign,
            type: "CHILD" /* CHILD */
          })
        }]
      }
    },
    ["CONFIRM" /* CONFIRM */]: {
      on: {
        ["NEXT" /* NEXT */]: [{
          actions: [closeModal]
        }],
        ["CANCEL" /* CANCEL */]: [{
          actions: [closeModal]
        }]
      }
    },
    ["DELETE_PARENT" /* DELETE_PARENT */]: {
      on: {
        ["NEXT" /* NEXT */]: [{
          actions: [closeModal]
        }],
        ["CANCEL" /* CANCEL */]: [{
          actions: [closeModal]
        }]
      }
    }
  }
});
