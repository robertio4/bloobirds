export type ContactViewContext = {
  activeTab: ContactViewTab;
  setActiveTab?: (value: ContactViewTab) => void;
  activeSubTab: ContactViewSubTab;
  setActiveSubTab?: (value: ContactViewSubTab) => void;
};

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
  PLAYBOOK = 'Playbook',
}

export enum PlaybookTab {
  PITCHES = 'Pitches',
  EMAILS = 'Emails',
  LINKEDIN = 'LinkedIn',
  QQS = 'QQs',
  WHATSAPP = 'Whatsapp',
}
