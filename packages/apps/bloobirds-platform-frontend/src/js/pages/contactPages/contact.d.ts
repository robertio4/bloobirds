//TODO: Add the bobjects as types
import { BobjectId } from './bobjects';
import { URLBobject } from './contactPage';

export interface Opporunity {}
export interface Leads {}
export interface Company {
  id: BobjectId;
  assignedTo?: string;
  attemptsCount: number;
  attemptsLastDay?: Date;
  country?: string;
  highPriority?: boolean;
  linkedinUrl: string;
  mrRating: string;
  name: string;
  numberOfLeads: number;
  qqRating: string;
  source: string;
  status: string;
  targetMarket?: string;
  timeZone?: string;
  touchesCount: number;
  touchesLastDay?: Date;
  website?: string;
  discardedReason?: string;
  nurturingReason?: string;
}

export interface ContactBobjects {
  opportunities: [any];
  leads: [any];
  company: any;
  active: any;
  error?: any;
  hasActiveBobjectUpdated?: boolean;
  isValidating?: boolean;
  urlBobject?: URLBobject;
  relatedBobjectIds?: string[];
}
