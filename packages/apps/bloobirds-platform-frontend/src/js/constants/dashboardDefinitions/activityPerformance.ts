import { DashboardPage } from '../newDashboards';

export const activityPerformanceProspecting: DashboardPage = {
  title: 'Activity Performance',
  sections: [
    {
      title: "How have the team's emails performed?",
      statsPanel: {
        report: 'EMAIL_PERFORMANCE',
        stats: [
          {
            name: 'Total Sent',
            isPercentage: false,
            isTotal: true,
          },
          {
            name: 'Open Rate',
            isPercentage: true,
            isTotal: false,
          },
          {
            name: 'Reply Rate',
            isPercentage: true,
            isTotal: false,
          },
          {
            name: 'CTR (Click Through Rate)',
            isPercentage: true,
            isTotal: false,
          },
          {
            name: 'Bounced Rate',
            isPercentage: true,
            isTotal: false,
          },
        ],
      },
      panels: [
        {
          type: 'MultiPanel',
          title: 'Total prospects reached',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              title: 'Total companies reached',
              information: '',
              report: 'COMPANIES_REACHED_BY_EMAIL',
              options: { sortByValue: true, sortDirection: 'DESC' },
              hasSingleNumber: true,
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              title: 'Total leads reached',
              information: '',
              report: 'LEADS_REACHED_BY_EMAIL',
              options: { sortByValue: true, sortDirection: 'DESC' },
              hasSingleNumber: true,
            },
          ],
        },
        {
          type: 'BarChartPanel',
          title: 'Email deliverability rate',
          report: 'EMAIL_RATES',
          keysColors: {
            'Total Sent': '#1991ff',
            Opened: '#D9F0C0',
            Replied: '#63BA00',
            Clicked: '#B4DE85',
            Bounced: '#FF6685',
          },
          hideTotal: true,
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            hideAmount: true,
          },
        },
      ],
    },
    {
      title: 'How many messages have been sent on LinkedIn?',
      statsPanel: {
        report: 'LINKEDIN_PERFORMANCE',
        stats: [
          {
            name: 'Total Sent',
            isPercentage: false,
            isTotal: true,
          },
          {
            name: 'Conversations',
            isPercentage: false,
            isTotal: false,
          },
          {
            name: 'Reply Rate',
            isPercentage: true,
            isTotal: false,
          },
        ],
      },
      panels: [
        {
          type: 'MultiPanel',
          title: 'Total prospects reached',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              title: 'Total companies reached',
              information: '',
              report: 'COMPANIES_REACHED_BY_LINKEDIN',
              options: { sortByValue: true, sortDirection: 'DESC' },
              hasSingleNumber: true,
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              title: 'Total leads reached',
              information: '',
              report: 'LEADS_REACHED_BY_LINKEDIN',
              options: { sortByValue: true, sortDirection: 'DESC' },
              hasSingleNumber: true,
            },
          ],
        },
        {
          type: 'BarChartPanel',
          title: 'LinkedIn Messaging Rate',
          report: 'LINKEDIN_RATES',
          keysColors: {
            'Total Sent': '#1991ff',
            Conversations: '#0077b5',
            Replied: '#63ba00',
          },
          hideTotal: true,
          options: {
            sortByValue: true,
            hideAmount: true,
            sortDirection: 'DESC',
          },
        },
      ],
    },
    {
      title: 'How many calls have the team made?',
      statsPanel: {
        report: 'CALL_PERFORMANCE',
        stats: [
          {
            name: 'Total',
            isPercentage: false,
            isTotal: true,
          },
          {
            name: 'Incoming',
            isPercentage: true,
            isTotal: false,
          },
          {
            name: 'Missed',
            isPercentage: true,
            isTotal: false,
          },
          {
            name: 'Correct Contact',
            isPercentage: true,
            isTotal: false,
          },
        ],
      },
      panels: [
        {
          type: 'MultiPanel',
          title: 'Total prospects reached',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              title: 'Total companies reached',
              information: '',
              report: 'COMPANIES_REACHED_BY_CALL',
              options: { sortByValue: true, sortDirection: 'DESC' },
              hasSingleNumber: true,
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              title: 'Total leads reached',
              information: '',
              report: 'LEADS_REACHED_BY_CALL',
              options: { sortByValue: true, sortDirection: 'DESC' },
              hasSingleNumber: true,
            },
          ],
        },
        {
          type: 'BarChartPanel',
          title: 'Calls results',
          report: 'CALL_RATES',
          hideTotal: true,
          keysColors: {
            'Total calls': '#1991ff',
            'Incoming calls': '#0077b5',
            'Missed calls': '#f5245b',
            'Correct Contact': '#63ba00',
          },
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            hideAmount: true,
          },
        },
      ],
    },
  ],
};
