import { Bobject, BobjectPicklistValueEntity, ExtensionBobject } from '@bloobirds-it/types';

export enum CALL_RESULTS_LOGIC_ROLE {
  CORRECT_CONTACT = 'ACTIVITY__CALL_RESULT__CORRECT_CONTACT',
  APPROACH = 'ACTIVITY__CALL_RESULT__APPROACH',
  GATEKEEPER = 'ACTIVITY__CALL_RESULT__GATEKEEPER',
  NO_ANSWER = 'ACTIVITY__CALL_RESULT__NO_ANSWER',
  WRONG_DATA = 'ACTIVITY__CALL_RESULT__WRONG_DATA',
}

export interface ActivityRelatedInfoProps {
  referenceBobject: Bobject | ExtensionBobject;
  activityCompany: Bobject;
  activityLead: Bobject;
  activityOpportunity: Bobject;
  leadAvailablePhoneFields: any[];
  companyAvailablePhoneFields: any[];
  referenceBobjectIsSales: boolean;
}

export interface Pitch {
  id: string;
  name: string;
  subject: string;
  content: string;
  previewSubject: string;
  previewContent: string;
  creationDatetime: string;
  updateDatetime: string;
  createdBy: string;
  updatedBy: string;
  visibility: string;
  isOfficial: boolean;
  isBattlecard: boolean;
  stage: string;
  type: string;
  format: string;
  templateStatistics: Record<string, unknown>;
  segmentationValues: Record<string, unknown>;
  mediaFiles: any[];
  cadenceUsages: number;
}

export interface UseCallResultInterface {
  companyStatusPicklistValues: BobjectPicklistValueEntity[];
  companySalesStatusPicklistValues: BobjectPicklistValueEntity[];
  leadStatusPicklistValues: BobjectPicklistValueEntity[];
  leadSalesStatusPicklistValues: BobjectPicklistValueEntity[];
  pitchDonePicklistValues: BobjectPicklistValueEntity[];
  availablePitches: any[];
  callResultsPicklistValues: {
    backgroundColor: string;
    isEnabled: boolean;
    name: string;
    outlineColor: string;
    id: string;
    textColor: string;
    shortname: string;
    logicRole: string;
  }[];
  isPitchNo: (pitch: any) => boolean;
  findPitchDoneNo: (pitches: any) => any;
}
