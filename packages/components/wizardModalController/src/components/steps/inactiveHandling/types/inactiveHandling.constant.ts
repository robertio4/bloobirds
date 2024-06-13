export enum INACTIVE_HANDLING_OPTIONS {
  NEXT_STEP = 'createNextStep',
  NEW_CADENCE = 'startNewCadence',
  SEND_TO_NURTURING = 'sendToNurturingAndSetCadence',
  DISCARD = 'discardCompanyAndLeads',
  BACK_TO_BACKLOG = 'setBacklogAndUnassign',
  REASSIGN = 'reassign',
  ON_HOLD = 'keepOnHold',
}

export interface InactiveHandlingModalDataInterface {
  type: INACTIVE_HANDLING_OPTIONS;
  data: any;
}
