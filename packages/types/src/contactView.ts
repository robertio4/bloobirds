import { ExtensionBobject } from './entities';
import { TEMPLATE_TYPES } from './templates';

export interface ContactViewContext {
  activeTab: ContactViewTab;
  setActiveTab?: (value: ContactViewTab) => void;
  activeSubTab: ContactViewSubTab;
  setActiveSubTab?: (value: ContactViewSubTab) => void;
  activeBobject: ExtensionBobject;
  setActiveBobject?: (value: ExtensionBobject) => void;
  actionsDisabled?: boolean;
}

export enum ContactViewTab {
  COMPANY = 'Company',
  LEAD = 'Lead',
  OPPORTUNITY = 'Opportunity',
  RELATED_COMPANIES = 'Related Companies',
}

export enum ContactViewSubTab {
  OVERVIEW = 'Overview',
  ACTIVITIES = 'Activities',
  TASKS = 'Tasks',
  RELATIONS = 'Relations',
  PLAYBOOK = 'Playbook',
}

export enum PlaybookTab {
  SNIPPETS = 'Snippets',
  PITCHES = 'Pitches',
  EMAILS = 'Emails',
  LINKEDIN = 'LinkedIn',
  WHATSAPP = 'WhatsApp',
  QQS = 'QQs',
}

export const templateTypes: Record<PlaybookTab, TEMPLATE_TYPES> = {
  [PlaybookTab.SNIPPETS]: TEMPLATE_TYPES.SNIPPET,
  [PlaybookTab.PITCHES]: TEMPLATE_TYPES.PITCH,
  [PlaybookTab.EMAILS]: TEMPLATE_TYPES.EMAIL,
  [PlaybookTab.LINKEDIN]: TEMPLATE_TYPES.LINKEDIN,
  [PlaybookTab.WHATSAPP]: TEMPLATE_TYPES.WHATSAPP,
  [PlaybookTab.QQS]: TEMPLATE_TYPES.QUALIFYING_QUESTION,
};

export enum SidepeekState {
  UserMinimized = 'USER_MINIMIZED',
  UserMaximized = 'USER_MAXIMIZED',
  InitialState = 'INITIAL_STATE',
}
