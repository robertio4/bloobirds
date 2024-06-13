import { DashboardPage } from '../newDashboards';

export const funnelProspecting: DashboardPage = {
  title: 'Funnel Prospecting',
  sections: [
    {
      title: 'How is the funnel for companies?',
      funnel: true,
      panels: [
        {
          type: 'SankeyPanel',
          title: 'Prospection Funnel on Companies',
          information: '',
          report: 'Company',
          isFunnel: true,
          funnelField: 'COMPANY__STATUS',
          funnelStartingStatus: 'COMPANY__STATUS__ON_PROSPECTION',
        },
      ],
    },
    {
      title: 'How is the funnel for leads?',
      funnel: true,
      panels: [
        {
          type: 'SankeyPanel',
          title: 'Prospection Funnel on Leads',
          information: '',
          report: 'Lead',
          isFunnel: true,
          funnelField: 'LEAD__STATUS',
          funnelStartingStatus: 'LEAD__STATUS__ON_PROSPECTION',
        },
      ],
    },
    {
      title: 'How is the funnel for Meetings?',
      funnel: true,
      beta: true,
      panels: [
        {
          type: 'SankeyPanel',
          title: 'Meeting Funnel',
          information: '',
          report: 'Activity',
          isFunnel: true,
          funnelField: 'ACTIVITY__MEETING_RESULT',
          funnelStartingStatus: 'ACTIVITY__MEETING_RESULT__SCHEDULED',
          keysColors: {
            ACTIVITY__MEETING_RESULT__QUALIFIED: '#464f57',
            ACTIVITY__MEETING_RESULT__UNQUALIFIED: '#b8b8b8',
            ACTIVITY__MEETING_RESULT__UNQUALIFIED_LEAD: '#dedede',
            ACTIVITY__MEETING_RESULT__SCHEDULED: '#FFB3C2',
            ACTIVITY__MEETING_RESULT__NO_SHOW: '#d4e0f1',
          },
        },
      ],
    },
  ],
};
