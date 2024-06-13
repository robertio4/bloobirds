import { Bobject, BobjectTypes } from './bobjects';
import { TEMPLATE_TYPES, TemplateStage } from './templates';

export type TemplateFormat = 'AST' | 'HTML';

export interface MessagingTemplate {
  id: string;
  title?: string;
  name: string;
  subject: string;
  content: string;
  previewSubject?: string;
  previewContent?: string;
  creationDatetime: string;
  updateDatetime: string;
  createdBy: string;
  updatedBy: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  isOfficial: boolean;
  isBattlecard: boolean;
  stage: TemplateStage;
  type: TEMPLATE_TYPES;
  format: TemplateFormat;
  templateStatistics: Record<Metric, number>;
  segmentationValues?: any;
  mediaFiles: MediaFile[];
  cadenceUsages: number;
  shortcut?: string;
  updateDateTime: string;
  taskTitle?: string;
}

export type Metric =
  | 'USED_COUNT'
  | 'OPENED_RATE'
  | 'CLICKED_RATE'
  | 'REPLIED_RATE'
  | 'OPENED_COUNT'
  | 'CLICKED_COUNT'
  | 'REPLIED_COUNT';

export type CadenceActionType =
  | 'EMAIL'
  | 'LINKEDIN_MESSAGE'
  | 'PHONE_CALL'
  | 'AUTOMATED_EMAIL'
  | 'CUSTOM_TASK';

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
  emailTemplateStage?: Stage;
  emailTemplateAttachments: Array<string>;
  emailTemplateSegmentationValues?: string[];
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

export type AttachedFilesHookReturn = {
  attachedFiles: AttachedFile[];
  uploadAttachedFile: (files: File[], visible?: boolean) => Promise<void>;
  removeAttachedFile: (attachedFileId?: string | null) => void;
  syncAttachments: (mediaFiles: MediaFile[]) => void;
};

export interface GroupedLinkedInMessage extends Bobject<BobjectTypes.Activity> {
  messageDate: {
    isFirstOfDay: boolean;
    day: Date;
    formattedDate: string;
    prefix: string;
    hashDate: string;
  };
  messageStatus: {
    isReported: boolean;
  };
}
