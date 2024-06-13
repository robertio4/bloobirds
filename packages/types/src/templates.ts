import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

export interface TemplateButtonProps {
  tooltipText: string;
  buttonText?: string;
  name: IconType;
  color: ColorType;
  onClick: (template: any) => void;
  disabled?: boolean;
}

export enum TEMPLATE_TYPES {
  SNIPPET = 'SNIPPET',
  PITCH = 'PITCH',
  EMAIL = 'EMAIL',
  LINKEDIN_MESSAGE = 'LINKEDIN_MESSAGE',
  LINKEDIN = 'LINKEDIN_MESSAGE',
  WHATSAPP = 'WHATSAPP',
  QUALIFYING_QUESTION = 'QUALIFYING_QUESTION',
}

export enum QQ_TYPES {
  GLOBAL_PICKLIST = 'GLOBAL_PICKLIST',
  MULTI_GLOBAL_PICKLIST = 'MULTI_GLOBAL_PICKLIST',
  TEXT = 'TEXT',
}

export enum QQ_TYPES_COPIES {
  GLOBAL_PICKLIST = 'Picklist',
  MULTI_GLOBAL_PICKLIST = 'Multi Picklist',
  TEXT = 'Text',
}

export enum QQ_TYPES_MAP {
  picklist = 'GLOBAL_PICKLIST',
  multipicklist = 'MULTI_GLOBAL_PICKLIST',
  text = 'TEXT',
}

export enum TEMPLATE_TYPES_COPIES {
  PITCH = 'Pitch',
  EMAIL = 'Email',
  LINKEDIN_MESSAGE = 'Linkedin',
  LINKEDIN = 'Linkedin',
  QUALIFYING_QUESTION = 'qualifying question',
  SNIPPET = 'Snippet',
}

export enum TEMPLATE_TYPES_ICONS {
  PITCH = 'alignLeft',
  EMAIL = 'mail',
  LINKEDIN_MESSAGE = 'linkedin',
  LINKEDIN = 'linkedin',
  QUALIFYING_QUESTION = 'chat',
  SNIPPET = 'snippet',
}

export enum FORM_MODES {
  EDITION = 'EDITION',
  CREATION = 'CREATION',
  CLONE = 'CLONE',
}

export enum TemplateStage {
  Prospecting = 'PROSPECT',
  Sales = 'SALES',
  All = 'ALL',
}

export enum Environment {
  SMART_EMAIL,
  EXTENSION,
  DIALER,
  LINKEDIN_TEMPLATE_SELECTOR,
  WHATSAPP_TEMPLATE_SELECTOR,
}

export type TemplateSegmentationValues = Record<TemplateStage, { [key: string]: string }>;
