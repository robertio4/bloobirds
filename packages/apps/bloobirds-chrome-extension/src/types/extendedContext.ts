import {
  Bobject,
  BobjectId,
  Dictionary,
  ExtensionBobject,
  MessagingTemplate,
} from '@bloobirds-it/types';

export enum ExtendedContextTypes {
  BOBJECT_DETAILS = 'BOBJECT_DETAILS',
  CALL_DETAILS = 'CALL_DETAILS',
  EMAIL_THREAD = 'EMAIL_THREAD',
  INBOUND_ACTIVITY = 'INBOUND_ACTIVITY',
  LINKEDIN_THREAD = 'LINKEDIN_THREAD',
  MEETING_DETAILS = 'MEETING_DETAILS',
  NOTE_DETAILS = 'NOTE_DETAILS',
  ORDER_CONTACT_DETAILS = 'ORDER_CONTACT_DETAILS',
  PLAYBOOK_EMAIL = 'PLAYBOOK_EMAIL',
  PLAYBOOK_LINKEDIN_MESSAGE = 'PLAYBOOK_LINKEDIN_MESSAGE',
  PLAYBOOK_PITCH = 'PLAYBOOK_PITCH',
  PLAYBOOK_SEGMENTATION_FILTER = 'PLAYBOOK_SEGMENTATION_FILTER',
  PLAYBOOK_SNIPPET = 'PLAYBOOK_SNIPPET',
  PLAYBOOK_WHATSAPP = 'PLAYBOOK_WHATSAPP',
  RELATED_OBJECT_DETAILS = 'RELATED_OBJECT_DETAILS',
  SIMILAR_DEALS = 'SIMILAR_DEALS',
  SUGGESTED_ACTIONS = 'SUGGESTED_ACTIONS',
  WHATSAPP_BUSINESS_THREAD = 'WHATSAPP_BUSINESS_THREAD',
  WHATSAPP_THREAD = 'WHATSAPP_THREAD',
}

export type ExtendedContext = {
  type: ExtendedContextTypes;
  // Only for Email and Linkedin thread
  threadId?: string;
  bobjectId?: BobjectId;
  bobject?: Bobject | ExtensionBobject;
  extensionBobject?: ExtensionBobject;
  mutate?: () => void;
  open?: boolean;
  template?: MessagingTemplate;
  buttonData?: Array<any>;
  actionsDisabled?: boolean;
  extraInfo?: Dictionary<any>;
};
