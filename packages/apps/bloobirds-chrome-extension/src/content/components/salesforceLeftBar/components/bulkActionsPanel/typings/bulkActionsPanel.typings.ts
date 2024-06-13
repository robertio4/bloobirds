export enum BulkActionButtonsTypes {
  StartCadence = 'START_CADENCE_BULK_ACTION',
  StopCadence = 'STOP_CADENCE_BULK_ACTION',
  Reschedule = 'RESCHEDULE_BULK_ACTION',
  Reassign = 'REASSIGN_BULK_ACTION',
}

export type availableActionType = {
  action: BulkActionButtonsTypes;
  disabled?: boolean;
};
