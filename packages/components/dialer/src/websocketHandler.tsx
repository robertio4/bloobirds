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

export function WebsocketHandler() {
  Object.keys(EVENTS_TO_LISTEN).forEach(eventName => {
    useEventSubscription(
      eventName,
      () => {
        console.log('eventName', eventName);
      },
      { createSubscription: true },
    );
  });
  return null;
}
