import { DashboardPage } from '../newDashboards';

export const funnelSales: DashboardPage = {
  title: 'Funnel Sales',
  sections: [
    {
      title: 'How is the funnel for Opportunities?',
      funnel: true,
      panels: [
        {
          type: 'SankeyPanel',
          title: 'Sales Funnel on Opportunities',
          information: '',
          report: 'Opportunity',
          isFunnel: true,
          funnelField: 'OPPORTUNITY__STATUS',
          funnelStartingStatus: 'OPPORTUNITY__STATUS__CLOSED_WON',
        },
      ],
    },
  ],
};
