import { IconType } from '@bloobirds-it/flamingo-ui';

export const stepElementIds = {
  TOUR_OVERVIEW: 'tourStep1',
  TOUR_ACTIVITIES: 'tourStep2',
  TOUR_TASKS: 'tourStep3',
  TOUR_PLAYBOOK: 'tourStep4',
  TOUR_CONTACTABILITY_TOOLS: 'tourStep5',
};

interface stepDefinitionProps {
  titleKey: string;
  contentKey: string;
  icon: IconType;
  elementId: typeof stepElementIds[keyof typeof stepElementIds];
}

export const stepDefinitions: Record<keyof typeof stepElementIds, stepDefinitionProps> = {
  TOUR_OVERVIEW: {
    titleKey: 'leftBar.tour.overview.title',
    contentKey: 'leftBar.tour.overview.content',
    icon: 'assignBoard',
    elementId: stepElementIds.TOUR_OVERVIEW,
  },
  TOUR_ACTIVITIES: {
    titleKey: 'leftBar.tour.activities.title',
    contentKey: 'leftBar.tour.activities.content',
    icon: 'activity',
    elementId: stepElementIds.TOUR_ACTIVITIES,
  },
  TOUR_TASKS: {
    titleKey: 'leftBar.tour.tasks.title',
    contentKey: 'leftBar.tour.tasks.content',
    icon: 'checkDouble',
    elementId: stepElementIds.TOUR_TASKS,
  },
  TOUR_PLAYBOOK: {
    titleKey: 'leftBar.tour.playbook.title',
    contentKey: 'leftBar.tour.playbook.content',
    icon: 'magic',
    elementId: stepElementIds.TOUR_PLAYBOOK,
  },
  TOUR_CONTACTABILITY_TOOLS: {
    titleKey: 'leftBar.tour.contactabilityTools.title',
    contentKey: 'leftBar.tour.contactabilityTools.content',
    icon: 'calendarphone',
    elementId: stepElementIds.TOUR_CONTACTABILITY_TOOLS,
  },
};
