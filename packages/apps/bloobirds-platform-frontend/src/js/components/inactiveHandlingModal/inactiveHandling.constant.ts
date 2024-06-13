import { BobjectTypes } from '@bloobirds-it/types';

export enum INACTIVE_HANDLING_OPTIONS {
  NEXT_STEP = 'createNextStep',
  NEW_CADENCE = 'startNewCadence',
  SEND_TO_NURTURING = 'sendToNurturingAndSetCadence',
  DISCARD = 'discardCompanyAndLeads',
  BACK_TO_BACKLOG = 'setBacklogAndUnassign',
  REASSIGN = 'reassign',
  ON_HOLD = 'keepOnHold',
}

export const modalAndActionText = {
  [BobjectTypes.Company]: {
    infoText: {
      [INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG]:
        ' If you think this company is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned.',
      [INACTIVE_HANDLING_OPTIONS.DISCARD]:
        'Discarding a company will stop its cadence or tasks but it will remain in the database.',
    },
    actionText: 'What is the reason for discarding the company and leads',
    discardedRadioText: 'Discard company and leads',
  },
  [BobjectTypes.Lead]: {
    infoText: {
      [INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG]:
        ' If you think this lead is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned.',
      [INACTIVE_HANDLING_OPTIONS.DISCARD]:
        'Discarding a lead will stop its cadence or tasks but it will remain in the database.',
    },
    actionText: 'What is the reason for discarding the lead',
    discardedRadioText: 'Discard lead',
  },
  [BobjectTypes.Opportunity]: {
    infoText: {
      [INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG]:
        ' If you think this opportunity is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned.',
      [INACTIVE_HANDLING_OPTIONS.DISCARD]:
        'Discarding an opportunity will stop its cadence or tasks but it will remain in the database.',
    },
    actionText: 'What is the reason for closing the opportunity',
    discardedRadioText: 'Close opportunity',
  },
};
