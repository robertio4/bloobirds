import React from 'react';

import {
  Bobject,
  BobjectTypes,
  EditableTemplateType,
  ExtensionBobject,
  LinkedInLead,
  MainBobjectTypes,
  MessagingTemplate,
  PlaybookTab,
  TemplateStage,
} from '@bloobirds-it/types';

import { Environment } from '../../types/playbook';
import { SegmentationFilters } from '../playbookFilters/segmentationFilter';
import { VisibilityFilters } from '../playbookFilters/useSegmentationFilter';

export interface TemplateListProps {
  parentRef: React.RefObject<HTMLDivElement>;
  shouldShowTooltip: boolean;
  sidePeekEnabled: boolean;
  displayedTemplates: {
    suggestedTemplates: MessagingTemplate[];
    myTemplates: MessagingTemplate[];
    teamTemplates: MessagingTemplate[];
    firstOfEach: { [key: string]: 'suggestedTemplates' | 'myTemplates' | 'teamTemplates' };
  };
  isTeamTemplates?: boolean;
  handleAddTemplateClick: () => void;
  renderTemplate: (template: MessagingTemplate, showSnippetsTooltip: boolean) => JSX.Element;
  isSmartEmail: boolean;
}

export interface PlaybookFeedProps {
  shouldShowTemplateSuggestions: boolean;
  accountId: string;
  mainBobject?: Bobject<MainBobjectTypes>;
  activeBobject: Bobject<MainBobjectTypes> | LinkedInLead;
  isMainBobjectSalesStage?: boolean;
  isFilterViewOpen?: boolean;
  stage: TemplateStage;
  company?: Bobject<BobjectTypes.Company>;
  leads?: Bobject[];
  opportunities?: Bobject[];
  selectedTab?: PlaybookTab;
  setSelectedTab?: (tab: PlaybookTab) => void;
  isSmartEmail?: boolean;
  isDialer?: boolean;
  onCardClicked: (
    template: MessagingTemplate,
    tabSelected?: string,
    handleEmailModal?: (template: MessagingTemplate) => void,
  ) => void;
  refreshMainBobject?: (bobjectType: string) => void;
  toggleFilterView: (value: boolean, selectedTab: PlaybookTab) => void;
  setFiltersContext?: (values: SegmentationFilters) => void;
  segmentationValues: any;
  visibilityFilters?: VisibilityFilters;
  templateFunctions: Record<string, (template: EditableTemplateType) => void>;
  actionsDisabled?: boolean;
  segmentationFields: any;
  sidePeekEnabled?: boolean;
  environment: Environment;
  whatsappData?: {
    phoneNumber: string;
    isSameActiveLead: boolean;
    userName: string;
    lead: LinkedInLead;
  };
  headerComponent: JSX.Element | Element;
}
export interface MessagingContentProps extends Partial<PlaybookFeedProps> {
  parentRef?: React.RefObject<HTMLDivElement>;
  shouldShowTemplateSuggestions: boolean;
  activeBobject: Bobject | ExtensionBobject;
  searchValue: string;
  tabSelected: PlaybookTab;
  contextData: { company: Bobject; leads: Bobject[] };
  sidePeekEnabled?: boolean;
  whatsappData?: {
    phoneNumber: string;
    isSameActiveLead: boolean;
    userName: string;
    lead: LinkedInLead;
  };
}
