import { BobjectPicklistValueEntity } from '@bloobirds-it/types';

export interface UseCallResultInterface {
  pitchDonePicklistValues: BobjectPicklistValueEntity[];
  availablePitches: any[];
  isPitchNo: (pitch: any) => boolean;
  findPitchDoneNo: (pitches: any) => any;
}
