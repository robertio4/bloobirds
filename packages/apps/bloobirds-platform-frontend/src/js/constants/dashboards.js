const overviewProspecting = {
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
          report: 'MEETINGS_CREATED_EVOLUTION',
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
          report: 'MEETINGS_CHANNEL_EVOLUTION',
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
          report: 'MEETINGS_RESULTS_EVOLUTION',
        },
      ],
    },
    {
      title: 'How many companies did you start to prospect?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Companies started to prospect',
          information:
            'This chart shows all companies that changed the status to "On Prospection" during the selected time period.',
          report: 'PROSPECTING_COMPANIES',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Companies started to prospect',
          information:
            'This chart shows how the number of companies that changed the status to "On Prospection" evolved over time.',
          report: 'PROSPECTING_COMPANIES_EVOLUTION',
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
          title: 'Activity per channel',
          information:
            'This chart shows you how the number of activities that took place evolved over time.',
          report: 'ALL_ACTIVITY_OUTGOING_EVOLUTION',
        },
      ],
    },
    {
      title: 'What is the number of prospects you have made an attempt?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Companies with some attempts',
          information:
            'This chart shows the number of activities in the selected time range grouped by company to show unique companies prospected in this period',
          report: 'PROSPECTS_WITH_ATTEMPTS',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Evolution of companies with some attempts',
          information:
            'This chart shows the evolution of activities in the selected time range grouped by company to show unique companies prospected in this period.',
          report: 'PROSPECTS_WITH_ATTEMPTS_EVOLUTION',
        },
      ],
      new: true,
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
          information: 'This chart shows you how the results of call attempts evolved over time.',
          report: 'CALL_RESULTS_EVOLUTION',
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
          report: 'PITCH_USED_EVOLUTION',
        },
      ],
    },
    {
      title: 'What were the main reasons you changed the status of companies to nurturing?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Nurturing reasons',
          information:
            'This chart gives an overview of all nurturing reasons that were selected for companies that changed the status to nurturing during the selected time period.',
          report: 'NURTURING_REASONS',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Nurturing reasons',
          information:
            'This chart gives an overview of how nurturing reasons that were selected for companies that changed the status to nurturing evolved over time.',
          report: 'NURTURING_REASONS_EVOLUTION',
        },
      ],
    },
    {
      title: 'What were the main reasons you changed the status of companies to discarded?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Discarded reasons',
          information:
            'This chart gives an overview of all discarded reasons that were selected for companies that changed the status to discarded during the selected time period.',
          report: 'DISCARDED_REASONS',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Discarded reasons',
          information:
            'This chart gives an overview how discarded reasons that were selected for companies that changed the status to discarded evolved over time.',
          report: 'DISCARDED_REASONS_EVOLUTION',
        },
      ],
    },
    {
      title: 'What is you current pipeline? Do you have enough companies in all stages?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Current Pipeline',
          information:
            'This chart gives an overview of all active companies that you currently have in your pipeline.',
          disclaimer: 'Not affected by selected date range',
          report: 'PIPELINE',
        },
      ],
    },
  ],
};

const conversionRatesProspecting = {
  title: 'Conversion Rates',
  sections: [
    {
      title: 'What was the conversion rate of companies from "On prospection" to "Contacted"?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'On prospection ► Contacted',
          information:
            'This chart shows the conversion rate of companies from the status "On Prospection" to the status "Contacted". ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of ' +
            '"On Prospection" during the selected time range. Of those companies, it counts how many have reached the status ' +
            '"Contacted" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
          report: 'CR_PROSPECTED_CONTACTED',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'On prospection ► Contacted',
          information:
            'This chart shows how the conversion rate of companies from the status "On Prospection" to the status "Contacted" ' +
            'evolved over time. Important: The conversion rate is calculated by only considering companies that changed to the status ' +
            'of "On Prospection" during the respective time range displayed on the x-axis. Of those companies, it counts how many have reached ' +
            'the status "Contacted" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
            'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
          report: 'CR_PROSPECTED_CONTACTED_EVOLUTION',
        },
      ],
    },
    {
      title: 'What was the conversion rate of companies from "Contacted" to "Meeting"?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Contacted ► Meeting',
          information:
            'This chart shows the conversion rate of companies from the status "Contacted" to the status "Meeting". ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of ' +
            '"Contacted" during the selected time range. Of those companies, it counts how many have reached the status "Meeting" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates.',
          report: 'CR_CONTACTED_MEETING',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Contacted ► Meeting',
          information:
            'This chart shows how the conversion rate of companies from the status "Contacted" to the status "Meeting" evolved over time. ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of "Contacted" during the ' +
            'respective time range displayed on the x-axis. Of those companies, it counts how many have reached the status "Meeting" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. Please note: Due to the way the ' +
            'conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
          report: 'CR_CONTACTED_MEETING_EVOLUTION',
        },
      ],
    },
    {
      title: 'What was the conversion rate of companies from "Meeting" to "Account"?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Meeting ► Account',
          information:
            'This chart shows the conversion rate of companies from the status "Meeting" to the status "Account". ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of ' +
            '"Meeting" during the selected time range. Of those companies, it counts how many have reached the status "Account" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates.',
          report: 'CR_MEETING_ACCOUNT',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Meeting ► Account',
          information:
            'This chart shows how the conversion rate of companies from the status "Meeting" to the status "Account" evolved over time. ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of "Meeting" during the ' +
            'respective time range displayed on the x-axis. Of those companies, it counts how many have reached the status "Account" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
            'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks.',
          report: 'CR_MEETING_ACCOUNT_EVOLUTION',
        },
      ],
    },
    {
      title: 'What was the conversion rate of companies from "Account" to "Client"?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Account ► Client',
          information:
            'This chart shows the conversion rate of companies from the status "Account" to the status "Client". ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of "Account" ' +
            'during the selected time range. Of those companies, it counts how many have reached the status "Client" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates.',
          report: 'CR_ACCOUNT_CLIENT',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Account ► Client',
          information:
            'This chart shows how the conversion rate of companies from the status "Account" to the status "Client", evolved over time. ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of "Account" during ' +
            'the respective time range displayed on the x-axis. Of those companies, it counts how many have reached the status "Client" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
            'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
          report: 'CR_ACCOUNT_CLIENT_EVOLUTION',
          options: {
            unit: '%',
          },
        },
      ],
    },
    {
      title: 'What was the conversion rate of ICPs from "On Prospection" to "Contacted"?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'On Prospection ► Contacted (ICPs)',
          information:
            'This chart shows the conversion rate of ICPs from the status "On Prospection" to "Contacted". ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "On Prospection" ' +
            'during the selected time range. Of those ICPs, it counts how many have reached the status "Contacted" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates.',
          report: 'CR_LEAD_PROSPECTED_CONTACTED',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'On Prospection ► Contacted (ICPs) ',
          information:
            'This chart shows how the conversion rate of ICPs from the status "On Prospection" to the status "Contacted" evolved over time. ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "On Prospection" during the ' +
            'respective time range displayed on the x-axis. Of those ICPs, it counts how many have reached the status "Contacted" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
            'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks.',
          report: 'CR_LEAD_PROSPECTED_CONTACTED_EVOLUTION',
          options: {
            unit: '%',
          },
        },
      ],
    },
    {
      title: 'What was the conversion rate of ICPs from "Contacted" to "Meeting"?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Contacted ► Meeting (ICPs)',
          information:
            'This chart shows the conversion rate of ICPs from the status "Contacted" to "Meeting". ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "Contacted" ' +
            'during the selected time range. Of those ICPs, it counts how many have reached the status "Meeting" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates.',
          report: 'CR_LEAD_CONTACTED_MEETING',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Contacted ► Meeting (ICPs) ',
          information:
            'This chart shows how the conversion rate of ICPs from the status "Contacted" to the status "Meeting" evolved over time. ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "Contacted" during the respective time range displayed ' +
            'on the x-axis. Of those ICPs, it counts how many have reached the status "Meeting" until today. We recommend using a longer time range (e.g. ' +
            'This quarter) to see more insightful conversion rates. Please note: Due to the way the conversion rate is calculated, ' +
            'it is normal to see a decrease in the conversion rate of recent weeks.',
          report: 'CR_LEAD_CONTACTED_MEETING_EVOLUTION',
          options: {
            unit: '%',
          },
        },
      ],
    },
    {
      title:
        'How far did the companies advance that you started to prospect in the selected time range?',
      panels: [
        {
          type: 'FunnelPanel',
          title: 'Prospecting Funnel (from "On Prospection")',
          information:
            'This chart shows the overall prospecting funnel for the selected date range. ' +
            'The chart counts all companies that changed to the status "On Prospection" in the selected time period. ' +
            'The different rows indicate the number of companies that have reached the given status until today. ' +
            'Example: A company was created during the selected time range, had the status "On Prospection" for 3 days, ' +
            'and now has the status "Contacted". This company is counted with 1 in the row "On Prospection" and also counted with 1 in the row "Contacted".',
          report: 'FUNNEL_PROSPECTION',
        },
        {
          type: 'MultiPanel',
          title: 'Prospecting Cohorts (from "On Prospection")',
          information:
            'This table gives an overview of how different cohorts perform. Each row represents one cohort. ' +
            'A cohort is defined by all companies that changed the status to "On Prospection" in the selected time period. ' +
            'The columns indicate the number of companies that have reached the given status until today. Example: ' +
            'A company had the status "On Prospection" for 3 days and now has the status "Contacted". ' +
            'This company is counted with 1 in the column "On Prospection" and also counted with 1 in the column "Contacted".\n' +
            '\n' +
            'When showing the results as "Percentage", it shows the number of companies that have reached the given status until today, ' +
            'calculated as a percentage of all companies of that cohort. \n' +
            '\n' +
            'When showing the result as "Days", it shows the average time (in days) after which companies reached the given stage. ',
          panels: [
            {
              type: 'TableChartPanel',
              report: 'COHORTS_PROSPECTED',
              dropdownTitle: 'Total',
              timeColumnTitle: 'Prospected in',
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_PROSPECTED_CR',
              dropdownTitle: 'Percentage',
              timeColumnTitle: 'Prospected in',
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_PROSPECTED_AVG_DAYS',
              dropdownTitle: 'Days',
              timeColumnTitle: 'Prospected in',
            },
          ],
        },
      ],
    },
    {
      title: 'How far did the companies advance that were delivered in the selected time range?',
      panels: [
        {
          type: 'FunnelPanel',
          title: 'Prospecting Funnel (from "Delivered")',
          information:
            'This chart shows the overall prospecting funnel for the selected date range. ' +
            'The chart counts all companies that changed to the status "Delivered" in the selected time period. ' +
            'The different rows indicate the number of companies that have reached the given status until today. ' +
            'Example: A company was created during the selected time range, had the status "On Prospection" for 3 days, ' +
            'and now has the status "Contacted". This company is counted with 1 in the row "On Prospection" and also counted with 1 in the row "Contacted".',
          report: 'FUNNEL_DELIVERED',
        },
        {
          type: 'MultiPanel',
          title: 'Prospecting cohorts (from "Delivered")',
          information:
            'This table gives an overview of how different cohorts perform. Each row represents one cohort. ' +
            'A cohort is defined by all companies that changed the status to "Delivered" in the selected time period. ' +
            'The columns indicate the number of companies that have reached the given status until today. Example: ' +
            'A company had the status "On Prospection" for 3 days and now has the status "Contacted". ' +
            'This company is counted with 1 in the column "On Prospection" and also counted with 1 in the column "Contacted".\n' +
            '\n' +
            'When showing the results as "Percentage", it shows the number of companies that have reached the given status until today, ' +
            'calculated as a percentage of all companies of that cohort. \n' +
            '\n' +
            'When showing the result as "Days", it shows the average time (in days) after which companies reached the given stage.',
          panels: [
            {
              type: 'TableChartPanel',
              report: 'COHORTS',
              dropdownTitle: 'Total',
              timeColumnTitle: 'Delivered in',
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_CR',
              dropdownTitle: 'Percentage',
              timeColumnTitle: 'Delivered in',
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_AVG_DAYS',
              dropdownTitle: 'Days',
              timeColumnTitle: 'Delivered in',
            },
          ],
        },
      ],
    },
  ],
};

const dataQualityProspecting = {
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
          report: 'TASKS_OVERDUE',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Overdue & rejected tasks',
          information:
            'This chart shows the evolution of all rejected tasks, overdue tasks, and tasks that were completed overdue.',
          report: 'TASKS_OVERDUE_EVOLUTION',
        },
      ],
    },
    {
      title:
        'How many companies with the status On Prospection, Contacted or Engaged do not have an activity in the past days?',
      panels: [
        {
          type: 'BarChartPanel',
          title: '7 days no activity',
          information:
            'This chart shows all companies with the status "On prospection", "Contacted" or "Engaged" that do not have an activity in the past 7 days.',
          report: 'COMPANIES_7_DAYS',
          disclaimer: 'Not affected by selected date range',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'BarChartPanel',
          title: '14 days no activity',
          information:
            'This chart shows all companies with the status "On prospection", "Contacted" or "Engaged" that do not have an activity in the past 14 days.',
          report: 'COMPANIES_14_DAYS',
          disclaimer: 'Not affected by selected date range',
        },
      ],
    },
    {
      title:
        'How many companies with the status On Prospection, Contacted or Engaged do not have a next step scheduled?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Inactive companies',
          information:
            'This chart shows all companies with the status "On prospection", "Contacted" or "Engaged" that do not have a next step scheduled.',
          report: 'COMPANIES_INACTIVE',
          disclaimer: 'Not affected by selected date range',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
      ],
    },
  ],
};

const overviewSales = {
  title: 'Overview',
  sections: [
    {
      title: 'How many opportunities did you generate?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Opportunities',
          information:
            'This chart shows all opportunities that were created in the selected time period.',
          report: 'OPPORTUNITIES_GENERATED',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Opportunities',
          information:
            'This chart shows how the number of created opportunities evolved over time.',
          report: 'OPPORTUNITIES_GENERATED_EVOLUTION',
        },
      ],
    },
    {
      title: 'How many opportunities did you close?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Closed opportunities',
          information:
            'This chart shows all opportunities that were closed in the selected time period. ',
          report: 'OPPORTUNITIES_CLOSED',
        },
        {
          type: 'LineChartPanel',
          title: 'Closed opportunities',
          information:
            'This chart shows how the number of closed opportunities evolved over time. ',
          report: 'OPPORTUNITIES_CLOSED_EVOLUTION',
        },
      ],
    },
    {
      title: 'How much revenue did you generate with the opportunities you won? ',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Revenue',
          information:
            'This chart shows the total revenue that was generated in the selected time range. ' +
            'Revenue is calculated as the sum of the amount of all opportunities that were closed won in the selected time range.',
          report: 'OPPORTUNITIES_REVENUE',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '€',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Revenue',
          information: 'This chart shows how the generated revenue evolved over time.',
          report: 'OPPORTUNITIES_REVENUE_EVOLUTION',
          options: {
            unit: '€',
          },
        },
      ],
    },
    {
      title:
        'How long is your average sales cycle? How many days ago did you create the opportunities you won?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Sales Cycle',
          information:
            'This chart shows the average sales cycle (in days) of all opportunities that were closed won in the selected time period. ' +
            'The sales cycle is calculated as the duration from opportunity creation date to opportunity closed won date.',
          report: 'SALES_CYCLE',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: 'd',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Sales Cycle',
          information: 'This chart shows how the average sales cycle evolved over time. ',
          report: 'SALES_CYCLE_EVOLUTION',
          options: {
            unit: 'days',
          },
        },
      ],
    },
    {
      title:
        'In which stage are you losing opportunities? What was the last stage of the opportunities you lost?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Lost opportunities per stage',
          information:
            'This chart shows the last status of the opportunities that were Closed lost in the selected time range. ',
          report: 'OPPORTUNITIES_LOST_STAGE',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Lost opportunities per stage',
          information:
            'This chart shows how the last status of closed lost opportunities evolved over time.',
          report: 'OPPORTUNITIES_LOST_STAGE_EVOLUTION',
        },
      ],
    },
    {
      title: 'Why are you losing opportunities?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Reasons for lost opps',
          information:
            'This chart shows the closed lost reason of all opportunities that were Closed lost in the selected time period.',
          report: 'OPPORTUNITIES_LOST_REASONS',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Reasons for lost opps',
          information:
            'This chart shows how the closed lost reason of opportunities evolved over time.',
          report: 'OPPORTUNITIES_LOST_REASONS_EVOLUTION',
        },
      ],
    },
    {
      title: 'How many meetings related to opportunities did you have?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Sales meetings',
          information:
            'This chart shows the number of meetings related to existing opportunities in the selected time range. ' +
            'Meetings related to companies are not counted (e.g. a demo meeting that took place before an opportunity was created, is not counted).',
          report: 'OPPORTUNITIES_MEETINGS',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Sales meetings',
          information:
            'This chart shows how the number of meetings related to existing opportunities evolved over time.',
          report: 'OPPORTUNITIES_MEETINGS_EVOLUTION',
        },
      ],
    },
    {
      title: 'What were your most used channels for communication related to opportunities?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Sales activity per channel',
          information:
            'This chart shows all activities related to opportunities that took place during the selected time period.',
          report: 'OPPORTUNITIES_CHANNEL',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Sales activity per channel',
          information:
            'This chart shows how the number of activities related to opportunities evolved over time.',
          report: 'OPPORTUNITIES_CHANNEL_EVOLUTION',
        },
      ],
    },
    // {
    //   title: 'How many weeks ago was your last activity per opportunity?',
    //   panels: [
    //     {
    //       type: 'BarChartPanel',
    //       title: 'Last activity per opp',
    //       information:
    //         'For all currently active opportunities, this chart shows how many weeks ago the last activity took place.',
    //       report: 'OPPORTUNITIES_LAST_ACTIVITY',
    //     },
    //   ],
    // },
    {
      title: 'What is your current sales pipeline? Do you have enough opportunities in all stages?',
      panels: [
        {
          type: 'BarChartPanel',
          title: 'Sales pipeline',
          information:
            'This chart gives an overview of all active opportunities that are currently in the pipeline.',
          report: 'SALES_PIPELINE',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
      ],
    },
  ],
};

export const paths = {
  prospecting: {
    overview: overviewProspecting,
    conversionRates: conversionRatesProspecting,
    dataQuality: dataQualityProspecting,
  },
  sales: {
    overview: overviewSales,
  },
};
