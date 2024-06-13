import { assign, createMachine } from 'xstate';

export enum STATES {
  INITIAL = 'INITIAL',
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  CONFIRM = 'CONFIRM',
  DELETE_PARENT = 'DELETE_PARENT',
}

export enum EVENTS {
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
  CANCEL = 'CANCEL',
}

const closeModal = context => {
  context.handleClose();
};

export const stepsMachine = initialValue =>
  createMachine({
    id: 'related_bobject_steps',
    context: {
      type: '',
      bobjectsToLink: null,
      handleClose: null,
      dataToAssign: null,
    },
    initial: initialValue || STATES.INITIAL,
    states: {
      [STATES.INITIAL]: {
        on: {
          [STATES.PARENT]: STATES.PARENT,
          [STATES.CHILD]: STATES.CHILD,
          [STATES.DELETE_PARENT]: STATES.DELETE_PARENT,
        },
      },
      [STATES.PARENT]: {
        on: {
          [STATES.CONFIRM]: [
            {
              target: STATES.CONFIRM,
              actions: assign({
                dataToAssign: (context, event) => event.dataToAssign,
                type: STATES.PARENT,
              }),
            },
          ],
        },
      },
      [STATES.CHILD]: {
        on: {
          [STATES.CONFIRM]: [
            {
              target: STATES.CONFIRM,
              actions: assign({
                dataToAssign: (context, event) => event.dataToAssign,
                type: STATES.CHILD,
              }),
            },
          ],
        },
      },
      [STATES.CONFIRM]: {
        on: {
          [EVENTS.NEXT]: [
            {
              actions: [closeModal],
            },
          ],
          [EVENTS.CANCEL]: [
            {
              actions: [closeModal],
            },
          ],
        },
      },
      [STATES.DELETE_PARENT]: {
        on: {
          [EVENTS.NEXT]: [
            {
              actions: [closeModal],
            },
          ],
          [EVENTS.CANCEL]: [
            {
              actions: [closeModal],
            },
          ],
        },
      },
    },
  });
