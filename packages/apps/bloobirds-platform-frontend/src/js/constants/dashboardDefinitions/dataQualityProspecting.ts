import { DashboardPage } from '../newDashboards';

export const dataQualityProspecting: DashboardPage = {
  title: 'Data Quality',
  sections: [
    {
      title:
        'How close are you following the cadence? How many tasks were rejected? How many completed overdue?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Overdue & rejected tasks',
          information:
            'This chart shows all rejected tasks, overdue tasks, and tasks that were completed overdue. ' +
            'Rejected tasks have never been completed and are now closed. Completed overdue tasks have been completed after the scheduled date. ' +
            'Overdue tasks are already past the scheduled date but can still be completed.',
          report: 'TASK_OVERDUE',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Overdue & rejected tasks',
          isTimeline: true,
          information:
            'This chart shows the evolution of all rejected tasks, overdue tasks, and tasks that were completed overdue.',
          report: 'TASK_OVERDUE',
        },
      ],
    },
    {
      title:
        'How many companies/leads with the status On Prospection, Contacted or Engaged do not have an activity in the past days?',
      panels: [
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_NO_ATTEMPTS_7DAYS',
              title: '7 days no activity (companies)',
              information:
                'This chart shows all companies with the status "On prospection", "Contacted" or "Engaged" that do not have an activity in the past 7 days.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_NO_ATTEMPTS_7DAYS',
              title: '7 days no activity (leads)',
              information:
                'This chart shows all leads with the status "On prospection", "Contacted" or "Engaged" that do not have an activity in the past 7 days.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
          ],
          disclaimer: 'Not affected by selected date range',
        },
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_NO_ATTEMPTS_14DAYS',
              title: '14 days no activity (companies)',
              information:
                'This chart shows all companies with the status "On prospection", "Contacted" or "Engaged" that do not have an activity in the past 14 days.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_NO_ATTEMPTS_14DAYS',
              title: '14 days no activity (leads)',
              information:
                'This chart shows all leads with the status "On prospection", "Contacted" or "Engaged" that do not have an activity in the past 14 days.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
          ],
          disclaimer: 'Not affected by selected date range',
        },
      ],
    },
    {
      title:
        'How many companies/leads with the status On Prospection, Contacted or Engaged do not have a next step scheduled?',
      panels: [
        {
          type: 'MultiPanel',
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_INACTIVE',
              title: 'Inactive companies',
              information:
                'This chart shows all companies with the status "On prospection", "Contacted" or "Engaged" that do not have a next step scheduled.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_INACTIVE',
              title: 'Inactive leads',
              information:
                'This chart shows all leads with the status "On prospection", "Contacted" or "Engaged" that do not have a next step scheduled.',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
              },
            },
          ],
          disclaimer: 'Not affected by selected date range',
        },
      ],
    },
  ],
};

export const newInactive = {
  title:
    'How many companies/leads with the status On Prospection, Contacted, Meeting, Engaged or Nurturing do not have a next step scheduled?',
  panels: [
    {
      type: 'MultiPanel',
      panels: [
        {
          type: 'BarChartPanel',
          dropdownTitle: 'Companies',
          report: 'COMPANY_INACTIVE_NEW',
          title: 'Inactive companies',
          information:
            'This chart shows all companies with the status On Prospection, Contacted, Meeting, Engaged or Nurturing that do not have a next step scheduled.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'BarChartPanel',
          dropdownTitle: 'Leads',
          report: 'LEAD_INACTIVE_NEW',
          title: 'Inactive leads',
          information:
            'This chart shows all leads with the status On Prospection, Contacted, Meeting, Engaged or Nurturing that do not have a next step scheduled.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
      ],
      disclaimer: 'Not affected by selected date range',
    },
  ],
};
