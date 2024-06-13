import { DashboardPage } from '../newDashboards';

export const conversionRatesProspecting: DashboardPage = {
  title: 'Conversion Rates',
  sections: [
    {
      title: 'What was the conversion rate from "On prospection" to "Contacted"?',
      panels: [
        {
          type: 'MultiPanel',
          hideTotal: true,
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_CONVERSION_ON_PROSPECTION',
              title: 'On prospection ► Contacted',
              information:
                'This chart shows the conversion rate of companies from the status "On Prospection" to the status "Contacted". ' +
                'Important: The conversion rate is calculated by only considering companies that changed to the status of ' +
                '"On Prospection" during the selected time range. Of those companies, it counts how many have reached the status ' +
                '"Contacted" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
                unit: '%',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_CONVERSION_ON_PROSPECTION',
              title: 'On prospection ► Contacted',
              information:
                'This chart shows the conversion rate of leads from the status "On Prospection" to the status "Contacted". ' +
                'Important: The conversion rate is calculated by only considering leads that changed to the status of ' +
                '"On Prospection" during the selected time range. Of those leads, it counts how many have reached the status ' +
                '"Contacted" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
                unit: '%',
              },
            },
          ],
        },
        {
          type: 'MultiPanel',
          hideTotal: true,
          panels: [
            {
              type: 'LineChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_CONVERSION_ON_PROSPECTION',
              isTimeline: true,
              title: 'On prospection ► Contacted',
              information:
                'This chart shows how the conversion rate of companies from the status "On Prospection" to the status "Contacted" ' +
                'evolved over time. Important: The conversion rate is calculated by only considering companies that changed to the status ' +
                'of "On Prospection" during the respective time range displayed on the x-axis. Of those companies, it counts how many have reached ' +
                'the status "Contacted" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
                'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
              options: {
                unit: '%',
              },
            },
            {
              type: 'LineChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_CONVERSION_ON_PROSPECTION',
              title: 'On prospection ► Contacted',
              isTimeline: true,
              information:
                'This chart shows how the conversion rate of leads from the status "On Prospection" to the status "Contacted" ' +
                'evolved over time. Important: The conversion rate is calculated by only considering leads that changed to the status ' +
                'of "On Prospection" during the respective time range displayed on the x-axis. Of those leads, it counts how many have reached ' +
                'the status "Contacted" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
                'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
              options: {
                unit: '%',
              },
            },
          ],
        },
      ],
    },
    {
      title: 'What was the conversion rate from "Contacted" to "Meeting"?',
      panels: [
        {
          type: 'MultiPanel',
          hideTotal: true,
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_CONVERSION_CONTACTED',
              title: 'Contacted ► Meeting',
              information:
                'This chart shows the conversion rate of companies from the status "Contacted" to the status "Meeting". ' +
                'Important: The conversion rate is calculated by only considering companies that changed to the status of ' +
                '"Contacted" during the selected time range. Of those companies, it counts how many have reached the status ' +
                '"Meeting" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
                unit: '%',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_CONVERSION_CONTACTED',
              title: 'Contacted ► Meeting',
              information:
                'This chart shows the conversion rate of leads from the status "Contacted" to the status "Meeting". ' +
                'Important: The conversion rate is calculated by only considering leads that changed to the status of ' +
                '"Contacted" during the selected time range. Of those leads, it counts how many have reached the status ' +
                '"Meeting" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
                unit: '%',
              },
            },
          ],
        },
        {
          type: 'MultiPanel',
          hideTotal: true,
          panels: [
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Companies',
              report: 'COMPANY_CONVERSION_CONTACTED',
              title: 'Contacted ► Meeting',
              information:
                'This chart shows how the conversion rate of companies from the status "Contacted" to the status "Meeting" ' +
                'evolved over time. Important: The conversion rate is calculated by only considering companies that changed to the status ' +
                'of "Contacted" during the respective time range displayed on the x-axis. Of those companies, it counts how many have reached ' +
                'the status "Meeting" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
                'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
              options: {
                unit: '%',
              },
            },
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Leads',
              report: 'LEAD_CONVERSION_CONTACTED',
              title: 'Contacted ► Meeting',
              information:
                'This chart shows how the conversion rate of leads from the status "Contacted" to the status "Meeting" ' +
                'evolved over time. Important: The conversion rate is calculated by only considering leads that changed to the status ' +
                'of "Contacted" during the respective time range displayed on the x-axis. Of those leads, it counts how many have reached ' +
                'the status "Meeting" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
                'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
              options: {
                unit: '%',
              },
            },
          ],
        },
      ],
    },
    {
      title: 'What was the conversion rate from "Meeting" to "Account/Contact"?',
      panels: [
        {
          type: 'MultiPanel',
          hideTotal: true,
          panels: [
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Companies',
              report: 'COMPANY_CONVERSION_MEETING',
              title: 'Meeting ► Account',
              information:
                'This chart shows the conversion rate of companies from the status "Meeting" to the status "Account". ' +
                'Important: The conversion rate is calculated by only considering companies that changed to the status of ' +
                '"Meeting" during the selected time range. Of those companies, it counts how many have reached the status ' +
                '"Account" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
                unit: '%',
              },
            },
            {
              type: 'BarChartPanel',
              dropdownTitle: 'Leads',
              report: 'LEAD_CONVERSION_MEETING',
              title: 'Meeting ► Contact',
              information:
                'This chart shows the conversion rate of leads from the status "Meeting" to the status "Contact". ' +
                'Important: The conversion rate is calculated by only considering leads that changed to the status of ' +
                '"Meeting" during the selected time range. Of those leads, it counts how many have reached the status ' +
                '"Contact" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
              options: {
                sortByValue: true,
                sortDirection: 'DESC',
                unit: '%',
              },
            },
          ],
        },
        {
          type: 'MultiPanel',
          hideTotal: true,
          panels: [
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Companies',
              report: 'COMPANY_CONVERSION_MEETING',
              title: 'Meeting ► Account',
              information:
                'This chart shows how the conversion rate of companies from the status "Meeting" to the status "Account" ' +
                'evolved over time. Important: The conversion rate is calculated by only considering companies that changed to the status ' +
                'of "Meeting" during the respective time range displayed on the x-axis. Of those companies, it counts how many have reached ' +
                'the status "Account" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
                'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
              options: {
                unit: '%',
              },
            },
            {
              type: 'LineChartPanel',
              isTimeline: true,
              dropdownTitle: 'Leads',
              report: 'LEAD_CONVERSION_MEETING',
              title: 'Meeting ► Contact',
              information:
                'This chart shows how the conversion rate of leads from the status "Meeting" to the status "Contact" ' +
                'evolved over time. Important: The conversion rate is calculated by only considering leads that changed to the status ' +
                'of "Meeting" during the respective time range displayed on the x-axis. Of those leads, it counts how many have reached ' +
                'the status "Contact" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
                'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
              options: {
                unit: '%',
              },
            },
          ],
        },
      ],
    },
    {
      title: 'What was the conversion rate of companies from "Account" to "Client"?',
      panels: [
        {
          type: 'BarChartPanel',
          hideTotal: true,
          report: 'COMPANY_CONVERSION_ACCOUNT',
          title: 'Account ► Client',
          information:
            'This chart shows the conversion rate of companies from the status "Account" to the status "Client". ' +
            'Important: The conversion rate is calculated by only considering companies that changed to the status of ' +
            '"Account" during the selected time range. Of those companies, it counts how many have reached the status ' +
            '"Client" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
          },
        },
        {
          type: 'LineChartPanel',
          report: 'COMPANY_CONVERSION_ACCOUNT',
          title: 'Account ► Client',
          isTimeline: true,
          information:
            'This chart shows how the conversion rate of companies from the status "Account" to the status "Client" ' +
            'evolved over time. Important: The conversion rate is calculated by only considering companies that changed to the status ' +
            'of "Account" during the respective time range displayed on the x-axis. Of those companies, it counts how many have reached ' +
            'the status "Client" until today. We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
            'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks. ',
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
          hideTotal: true,
          information:
            'This chart shows the conversion rate of ICPs from the status "On Prospection" to "Contacted". ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "On Prospection" ' +
            'during the selected time range. Of those ICPs, it counts how many have reached the status "Contacted" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates.',
          report: 'LEAD_ICP_CONVERSION_ON_PROSPECTION',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
            hideAmount: true,
          },
        },
        {
          type: 'LineChartPanel',
          title: 'On Prospection ► Contacted (ICPs) ',
          isTimeline: true,
          information:
            'This chart shows how the conversion rate of ICPs from the status "On Prospection" to the status "Contacted" evolved over time. ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "On Prospection" during the ' +
            'respective time range displayed on the x-axis. Of those ICPs, it counts how many have reached the status "Contacted" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates. ' +
            'Please note: Due to the way the conversion rate is calculated, it is normal to see a decrease in the conversion rate of recent weeks.',
          report: 'LEAD_ICP_CONVERSION_ON_PROSPECTION',
          options: {
            unit: '%',
            hideAmount: true,
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
          hideTotal: true,
          information:
            'This chart shows the conversion rate of ICPs from the status "Contacted" to "Meeting". ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "Contacted" ' +
            'during the selected time range. Of those ICPs, it counts how many have reached the status "Meeting" until today. ' +
            'We recommend using a longer time range (e.g. This quarter) to see more insightful conversion rates.',
          report: 'LEAD_ICP_CONVERSION_CONTACTED',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
            unit: '%',
            hideAmount: true,
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Contacted ► Meeting (ICPs) ',
          isTimeline: true,
          information:
            'This chart shows how the conversion rate of ICPs from the status "Contacted" to the status "Meeting" evolved over time. ' +
            'Important: The conversion rate is calculated by only considering ICPs that changed to the status of "Contacted" during the respective time range displayed ' +
            'on the x-axis. Of those ICPs, it counts how many have reached the status "Meeting" until today. We recommend using a longer time range (e.g. ' +
            'This quarter) to see more insightful conversion rates. Please note: Due to the way the conversion rate is calculated, ' +
            'it is normal to see a decrease in the conversion rate of recent weeks.',
          report: 'LEAD_ICP_CONVERSION_CONTACTED',
          options: {
            unit: '%',
            hideAmount: true,
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
              isTimeline: true,
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_PROSPECTED_CR',
              dropdownTitle: 'Percentage',
              timeColumnTitle: 'Prospected in',
              isTimeline: true,
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_PROSPECTED_AVG_DAYS',
              dropdownTitle: 'Days',
              timeColumnTitle: 'Prospected in',
              isTimeline: true,
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
              isTimeline: true,
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_CR',
              dropdownTitle: 'Percentage',
              timeColumnTitle: 'Delivered in',
              isTimeline: true,
            },
            {
              type: 'TableChartPanel',
              report: 'COHORTS_AVG_DAYS',
              dropdownTitle: 'Days',
              timeColumnTitle: 'Delivered in',
              isTimeline: true,
            },
          ],
        },
      ],
    },
  ],
};
