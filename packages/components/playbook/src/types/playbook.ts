import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';
import { MessagingTemplate, PlaybookTab } from '@bloobirds-it/types';

type TemplateFunction = (template: MessagingTemplate) => void;

export interface PlaybookButtonProps {
  tooltipText: string;
  buttonText?: string;
  name: IconType;
  color: ColorType;
  onClick: (template: any) => void;
  disabled?: boolean;
}

export interface MessagingCardProps {
  template: MessagingTemplate;
  onClick?: (template: any) => void;
  tabSelected: PlaybookTab;
  isSmartEmail?: boolean;
  buttonProps?: PlaybookButtonProps[];
  templateFunctions?: Record<
    'replaceTemplate' | 'insertTemplate' | 'editTemplate',
    TemplateFunction
  >;
  actionsDisabled?: boolean;
  sidePeekEnabled?: boolean;
}

export interface PlaybookCardProps extends MessagingCardProps {
  onUpdateQQ?: (template: any) => void;
  QQValue?: string | Array<string>;
  refreshActiveBobject?: () => void;
}

export enum Environment {
  SMART_EMAIL,
  EXTENSION,
  DIALER,
  LINKEDIN_TEMPLATE_SELECTOR,
  WHATSAPP_TEMPLATE_SELECTOR,
}
