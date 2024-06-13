import { BobjectTypes, LogicRoleType } from '@bloobirds-it/types';

export interface BobjectPicklistValueEntity {
  account: string;
  backgroundColor: string;
  bobjectField: string;
  bobjectGlobalPicklist: string;
  createdBy: string;
  creationDatetime: string;
  deprecated: boolean;
  description: string;
  enabled: boolean;
  id: string;
  logicRole: LogicRoleType<BobjectTypes>;
  ordering: number;
  outlineColor: string;
  parentBobjectPicklistFieldValue: string;
  score: number;
  textColor: string;
  updateDatetime: string;
  updatedBy: string;
  value: string;
  nurturingStage: boolean;
  weightedPercentage: number;
}
