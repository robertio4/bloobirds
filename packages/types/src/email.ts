import React, { Dispatch, SetStateAction } from 'react';

import { Editor } from 'slate';
import { KeyedMutator } from 'swr';

import { Bobject, BobjectType, BobjectTypes, MainBobjectTypes } from './bobjects';
import { LiveEvent } from './calendar';
import { Connections } from './connections';
import { PlaybookTab } from './contactView';
import { DataModelResponse } from './dataModel';
import { ExtensionBobject, ExtensionCompany } from './entities';
import { MediaFile, MessagingTemplate, TemplateFormat } from './messaging';
import { SmartEmailTab } from './smartEmailHelper';
import { UserSettings } from './user';

export interface CollapsedComponentData {
  setShowPreview: () => void;
  showPreview: boolean;
  bodyPluginsReplacedVariables: any;
  preview: any;
}

export type ServerSideCalendarSlots = { [day: string]: LiveEvent[] };

export type SlotsData = {
  selectedTimezone: string;
  calendarSlots: ServerSideCalendarSlots | [];
  calendarSlotsVisible: boolean;
  meetingTitle: string;
};

interface BobjectInfoType {
  pageBobjectType?: BobjectType;
  activeBobject: Bobject<MainBobjectTypes> | ExtensionBobject;
  leads: Bobject<BobjectTypes.Lead>[];
  lead?: Bobject<BobjectTypes.Lead>;
  company: Bobject<BobjectTypes.Company>;
  opportunity?: Bobject<BobjectTypes.Opportunity>;
  opportunities?: Bobject<BobjectTypes.Opportunity>[];
  activitiesData?: any;
}

export interface EmailModalProps {
  id?: string;
  user?: any;
  bobjectsInfo: BobjectInfoType;
  accountId?: string;
  handleRedirect: () => void;
  scheduleEmailRedirect?: () => void;
  emailSettingsRedirect: () => void;
  baseUrl?: string;
  dataModel?: DataModelResponse;
  connections?: Connections;
  mutateConnections?: KeyedMutator<Connections>;
  statusActivityRedirect?: (bobject: Bobject) => void;
  mode?: string;
  isExtension?: boolean;
  userSettings: UserSettings;
}

export interface Email {
  to: Array<string>;
  cc: Array<string>;
  bcc: Array<string>;
  templateId?: string | null;
  body: string;
  subject: string;
  emailFrom: string;
  attachmentIds: Array<string>;
  emailReplayTo: string;
  nameFrom: string | null;
  nameReplayTo: string | null;
  format: TemplateFormat;
  replyToMessageId: string | null;
  calendarSlots: {
    day: string;
    duration: number;
    startDateTime: string;
  }[];
  slotsTimezone: string | null;
  meetingTitle: string | null;
  bobjectId: string | null;
}

export interface FormValues {
  attachments?: MediaFile[];
  emailFrom: string;
  to: Array<string>;
  cc: Array<string>;
  bcc: Array<string>;
  templateId?: string;
  subject: any;
  body: any;
  htmlContent: string;
}

export type EditorMode = 'HTML' | 'AST';

export interface EmailMinimizableData {
  activity?: Bobject;
  company?: Bobject;
  leads: Array<Bobject>;
  lead?: Bobject;
  opportunity?: Bobject;
  opportunities?: Array<Bobject>;
  savedData?: FormValues;
  mode: 'REPLY' | 'SEND';
  isBlankEmail: boolean;
  isScheduledEmail?: boolean;
  isFailedAutomation?: boolean;
  taskId?: string;
  scheduledDate: Date | string;
  template?: EditableTemplateType;
  defaultToEmail?: string;
  defaultCcEmail?: string[];
  defaultBccEmail?: string[];
  editorMode?: EditorMode;
}

// SMART EMAIL MODAL

export interface EmailProviderType {
  id?: string;
  user?: { [id: string]: string };
  accountId?: string;
  statusActivityRedirect?: (bobject?: Bobject) => void;
  bobjectsInfo?: BobjectInfoType;
  connections?: Connections;
  mutateConnections?: KeyedMutator<Connections>;
  dataModel?: DataModelResponse;
  children?: React.ReactElement;
  mode?: string;
  isExtension: boolean;
}

export interface EditableTemplateType extends MessagingTemplate {
  edit: boolean;
}

export type EmailFiltersType = {
  type?: string[];
  lead?: string[];
  user?: string[];
};

export interface SmartEmailContext
  extends Exclude<EmailProviderType, 'bobjectsInfo'>,
    BobjectInfoType {
  slotsData: SlotsData;
  setSlotsData: Dispatch<SetStateAction<SlotsData>>;
  editorsStored: boolean;
  focusedRef: React.MutableRefObject<number>;
  updateFocusedIndex: () => void;
  editorsRef: React.MutableRefObject<Editor[]>;
  storeEditorRef: (editor: Editor) => void;
  selectedTab: SmartEmailTab;
  snippets: { [snippetId: string]: any };
  mutateSnippets: any;
  setSelectedTab: (tab: SmartEmailTab) => void;
  tooltipVisible: boolean;
  setTooltipVisible: (visible: boolean) => void;
  playbookTab: PlaybookTab;
  setPlaybookTab: (tab: PlaybookTab) => void;
  similarDealsHook: any;
  children?: React.ReactElement;
  isExtension: boolean;
  taskTitle: string | undefined;
  setTaskTitle: (newTitle: string) => void;
  newLeadInfo: { email: string; company: ExtensionCompany | Bobject<BobjectTypes.Company> };
  setNewLeadInfo: ({
    email,
    company,
  }: {
    email: string;
    company: ExtensionCompany | Bobject<BobjectTypes.Company>;
  }) => void;
  leadCreatedCallback: (leadEmail: string) => void;
  setLeadCreatedCallback: (callback: (leadEmail: string) => void) => void;
  selectedActivity: Bobject;
  setSelectedActivity: (selectedActivity: Bobject) => void;
  replaceEmailBodyWithTemplate: (template: MessagingTemplate) => void;
  updateReplaceMethod: (replaceMethod: (template: MessagingTemplate) => void) => void;
  selectedTemplate: EditableTemplateType;
  setSelectedTemplate: (template: EditableTemplateType) => void;
  setRelatedBobjectsInfo: (value: Partial<Record<keyof BobjectInfoType, any>>) => void;
  filters: EmailFiltersType;
  setFilters: (filters: EmailFiltersType) => void;
  resetBobjectEnvironment: () => void;
  hasSnippetsEnabled: boolean;
  hasTimeSlotsEnabled: boolean;
  contactBobject: BobjectInfoType['activeBobject'];
}
