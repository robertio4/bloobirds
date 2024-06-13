import { Bobject, BobjectPicklistValueEntity, ExtensionBobject } from '@bloobirds-it/types';

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
  // availablePitches: any[];
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
  // isPitchNo: (pitch: any) => boolean;
  // findPitchDoneNo: (pitches: any) => any;
}
