import { useEventSubscription } from '@bloobirds-it/plover';

const EVENTS_TO_LISTEN = Object.seal({
  'twilio-initiated': 'callInitiated',
  'twilio-finished-before-connection': 'callFailed',
  'twilio-ringing': 'callRinging',
  'twilio-in-progress': 'callStarted',
  'twilio-completed': 'callCompleted',
  'twilio-busy': 'callCompleted',
  'twilio-no-answer': 'callCompleted',
  'twilio-failed': 'callCompleted',
});

export const useSetCallFromPhoneSubscriptions = (send, isPhoneForwardingActive) => {
  Object.keys(EVENTS_TO_LISTEN).forEach(event => {
    useEventSubscription(event, () => send(EVENTS_TO_LISTEN[event]), {
      createSubscription: isPhoneForwardingActive,
    });
  });
};
