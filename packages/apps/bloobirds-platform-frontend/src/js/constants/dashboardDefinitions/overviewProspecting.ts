import { DashboardPage } from '../newDashboards';

export const overviewProspecting: DashboardPage = {
  title: 'Overview',
  sections: [
    {
      title: 'How many meetings did you book? ',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Meetings',
          information:
            'This chart shows all meetings that were created in the selected time period. (Example: The meeting was created last week, and it is scheduled for tomorrow).',
          report: 'MEETINGS_CREATED',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Meetings',
          information: 'This chart shows how the number of created meetings evolved over time.',
          report: 'MEETINGS_CREATED',
          isTimeline: true,
        },
      ],
    },
    {
      title: 'Through which channels did you get your meetings? ',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Meetings per channel',
          information:
            'This chart shows via which channels you got your meetings. The information is filled out by the user when creating the meeting.',
          report: 'MEETINGS_CHANNEL',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Meetings per channel',
          information:
            'This chart shows you how the number of meetings per channel evolved over time.',
          report: 'MEETINGS_CHANNEL',
          isTimeline: true,
        },
      ],
    },
    {
      title: 'What were the results of the meetings that took place? ',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Meeting results',
          information:
            'This chart shows the meeting results of all meetings that were scheduled for the selected time period. (Example: The meeting was created last week, and it is scheduled for tomorrow).',
          report: 'MEETINGS_RESULTS',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Meeting results',
          information: 'This chart shows how meeting results evolved over time.',
          report: 'MEETINGS_RESULTS',
          isTimeline: true,
        },
      ],
    },
    {
      title: 'How many companies and leads did you start prospecting?',
      panels: [
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_PROSPECTS',
              title: 'Companies started to prospect',
              information:
                'This chart shows all companies that changed their status to "On Prospection" during the selected time period.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_PROSPECTS',
              title: 'Leads started to prospect',
              information:
                'This chart shows all leads that changed their status to "On Prospection" during the selected time period.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
          ],
        },
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'LineChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_PROSPECTS',
              isTimeline: true,
              title: 'Companies started to prospect',
              information:
                'This chart shows how the number of companies that changed their status to "On Prospection" evolved over time.',
            },
            {
              type: 'LineChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_PROSPECTS',
              title: 'Leads started to prospect',
              isTimeline: true,
              information:
                'This chart shows how the number of leads that changed their status to "On Prospection" evolved over time.',
            },
          ],
        },
      ],
    },
    {
      title: 'What were your most used channels when trying to establish contact?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Activity per channel',
          information:
            'This chart shows you all activities that took place during the selected time period.',
          report: 'ALL_ACTIVITY_OUTGOING',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          report: 'ALL_ACTIVITY_OUTGOING',
          title: 'Activity per channel',
          isTimeline: true,
          information:
            'This chart shows you how the number of activities that took place evolved over time.',
        },
      ],
    },
    {
      title: 'What is the number of prospects you have made an attempt?',
      panels: [
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              title: 'Companies with some attempts',
              information:
                'This chart shows the number of activities in the selected time range grouped by company to show unique companies prospected in this period',
              report: 'COMPANIES_WITH_ATTEMPTS',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              title: 'Leads with some attempts',
              information:
                'This chart shows the number of activities in the selected time range grouped by lead to show unique leads prospected in this period',
              report: 'LEADS_WITH_ATTEMPTS',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
          ],
        },
        {
          type: 'MultiPanel',
          panels: [
            {
              isTimeline: true,
              type: 'LineChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANIES_WITH_ATTEMPTS',
              title: 'Evolution of companies with some attempts',
              information:
                'This chart shows the evolution of activities in the selected time range grouped by company to show unique companies prospected in this period.',
            },
            {
              isTimeline: true,
              type: 'LineChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEADS_WITH_ATTEMPTS',
              title: 'Evolution of leads with some attempts',
              information:
                'This chart shows the evolution of activities in the selected time range grouped by lead to show unique leads prospected in this period.',
            },
          ],
        },
      ],
    },
    {
      title: 'What were the results of your call attempts?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Call results',
          information:
            'This chart shows you the results of all call attempt that took place during the selected time period.',
          report: 'CALL_RESULTS',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Call results',
          isTimeline: true,
          information: 'This chart shows you how the results of call attempts evolved over time.',
          report: 'CALL_RESULTS',
        },
      ],
    },
    {
      title: 'Which pitch did you use most often when making a "correct contact"?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Pitch used',
          information:
            'This chart shows you which pitch was used when you reached an ICPs via phone.',
          report: 'PITCH_USED',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Pitch used',
          information: 'This chart shows how the used pitches evolved over time.',
          report: 'PITCH_USED',
          isTimeline: true,
        },
      ],
    },
    {
      title:
        'What were the main reasons you changed the status of companies and leads to nurturing?',
      panels: [
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              title: 'Nurturing reasons',
              information:
                'This chart gives an overview of all nurturing reasons that were selected for companies that changed the status to nurturing during the selected time period.',
              report: 'COMPANY_NURTURING_REASONS',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              title: 'Nurturing reasons',
              information:
                'This chart gives an overview of all nurturing reasons that were selected for leads that changed the status to nurturing during the selected time period.',
              report: 'LEAD_NURTURING_REASONS',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
          ],
        },
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Companies',
              title: 'Nurturing reasons',
              information:
                'This chart gives an overview of how nurturing reasons that were selected for companies that changed the status to nurturing evolved over time.',
              report: 'COMPANY_NURTURING_REASONS',
            },
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Leads',
              title: 'Nurturing reasons',
              information:
                'This chart gives an overview of how nurturing reasons that were selected for leads that changed the status to nurturing evolved over time.',
              report: 'LEAD_NURTURING_REASONS',
            },
          ],
        },
      ],
    },
    {
      title:
        'What were the main reasons you changed the status of companies and leads to discarded?',
      panels: [
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              title: 'Discarded reasons',
              information:
                'This chart gives an overview of all discarded reasons that were selected for companies that changed the status to discarded during the selected time period.',
              report: 'COMPANY_DISCARDED_REASONS',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              title: 'Discarded reasons',
              information:
                'This chart gives an overview of all discarded reasons that were selected for leads that changed the status to discarded during the selected time period.',
              report: 'LEAD_DISCARDED_REASONS',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
          ],
        },
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Companies',
              title: 'Discarded reasons',
              information:
                'This chart gives an overview of how nurturing reasons that were selected for companies that changed the status to discarded evolved over time.',
              report: 'COMPANY_DISCARDED_REASONS',
            },
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Leads',
              title: 'Discarded reasons',
              information:
                'This chart gives an overview of how nurturing reasons that were selected for leads that changed the status to discarded evolved over time.',
              report: 'LEAD_DISCARDED_REASONS',
            },
          ],
        },
      ],
    },
    {
      title: 'What is you current pipeline? Do you have enough companies and leads in all stages?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Companies Pipeline',
          information:
            'This chart gives an overview of all active companies that you currently have in your pipeline.',
          report: 'COMPANY_PIPELINE',
          disclaimer: 'Not affected by selected date range',
          defaultVisibleBars: [
            'COMPANY__STATUS__DELIVERED',
            'COMPANY__STATUS__ON_PROSPECTION',
            'COMPANY__STATUS__CONTACTED',
            'COMPANY__STATUS__ENGAGED',
            'COMPANY__STATUS__MEETING',
            'COMPANY__STATUS__READY_TO_PROSPECT',
            'COMPANY__STATUS__FINDING_LEADS',
            'COMPANY__STATUS__ACCOUNT',
          ],
        },
        {
          type: 'BarChartPanel',
          title: 'Leads Pipeline',
          information:
            'This chart gives an overview of all active leads that you currently have in your pipeline.',
          report: 'LEAD_PIPELINE',
          disclaimer: 'Not affected by selected date range',
          defaultVisibleBars: [
            'LEAD__STATUS__DELIVERED',
            'LEAD__STATUS__ON_PROSPECTION',
            'LEAD__STATUS__CONTACTED',
            'LEAD__STATUS__ENGAGED',
            'LEAD__STATUS__MEETING',
            'LEAD__STATUS__CONTACT',
          ],
        },
      ],
    },
  ],
};
