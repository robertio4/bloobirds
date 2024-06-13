import { CadenceActionType, TemplateStage } from '@bloobirds-it/types';

export type TemplateFormat = 'AST' | 'HTML';

export interface MessagingTemplate {
  id: string;
  title: string;
  name: string;
  content: string;
  stage: 'PROSPECT' | 'SALES' | 'ALL';
  subject: string;
  previewSubject?: string;
  previewContent?: string;
  format: TemplateFormat;
  visibility: 'PUBLIC' | 'PRIVATE';
  mediaFiles: MediaFile[];
  createdBy: string;
  segmentationValues?: any;
  isOfficial: boolean;
  isBattlecard: boolean;
}

export interface MeetingLink {
  id?: string;
  title: string;
  url: string;
  userId: string;
  defaultLink: boolean;
}

export type CadenceAutomation = 'DEFAULT' | 'DISABLED' | 'ENABLED';

export type ThreadMode = 'NEW_MESSAGE' | 'REPLY_TO_THREAD';

export interface CadenceStepStatistics {
  totalEmailsSent: number;
  openRate: number;
  replyRate: number;
  clickRate: number;
}

export interface CadenceStep {
  actionTypes: Array<CadenceActionType>;
  automation: CadenceAutomation;
  automationEmailThreadMode?: ThreadMode;
  automationEmailToField?: string;
  automationPauseOverdueEnabled?: boolean;
  automationPauseTouchEnabled?: boolean;
  automationSchedulingMode?: 'RANGE' | 'DELAY' | 'START' | 'ALL_DAY';
  automationTimeZoneToApply?: 'USER_TIMEZONE' | 'BOBJECT_TIMEZONE';
  customTaskId?: string;
  dayNumber: number;
  delayAutomation: number;
  description: string;
  emailTemplateId?: string;
  emailTemplateName?: string;
  endAutomationRange?: string;
  id: string;
  optOutContent?: any;
  optOutEnabled?: boolean;
  startAutomationRange?: string;
  startTime?: string;
  statistics: CadenceStepStatistics;
  suggestedLinkedinTemplate: string;
  suggestedPitch: string;
  suggestedWhatsappTemplate: string;
}

export type Stage = 'PROSPECT' | 'SALES';

export interface SaveCadenceStepCommand extends Omit<CadenceStep, 'id'> {
  emailTemplateSubject?: string;
  emailTemplateBody?: string;
  emailTemplateStage?: TemplateStage;
  emailTemplateAttachments: Array<string>;
  emailTemplateSegmentationValues?: Record<TemplateStage, { [fieldId: string]: string[] }>;
}

export interface AttachedFile {
  id: string | null;
  name: string;
  internalId: string;
  uploading: boolean;
}

export interface EmailSettings {
  dailyLimit: number;
  minuteLimit: number;
}

export interface MediaFile {
  id: string;
  category: 'DOCUMENT' | 'AUDIO' | 'IMAGE' | 'VIDEO' | 'SPREADSHEET' | 'OTHER';
  createdBy: string;
  creationDatetime: string;
  updateDatetime: string;
  updatedBy: string;
  account: any;
  name: string;
  mimeType: string;
  url: string;
  visible: boolean;
  size: number;
  key: string;
}
