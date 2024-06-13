import { DashboardPage } from '../newDashboards';

export const overviewSales: DashboardPage = {
  title: 'Overview',
  sections: [
    {
      title: 'How many opportunities did you generate?',
      panels: [
        {
          type: 'BarChartPanel',
          report: 'OPPORTUNITIES_GENERATED',
          title: 'Opportunities',
          information:
            'This chart shows all opportunities that were created in the selected time period.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          isTimeline: true,
          report: 'OPPORTUNITIES_GENERATED',
          title: 'Opportunities',
          information:
            'This chart shows how the number of created opportunities evolved over time.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
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
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
        {
          type: 'LineChartPanel',
          title: 'Closed opportunities',
          isTimeline: true,
          information:
            'This chart shows how the number of closed opportunities evolved over time. ',
          report: 'OPPORTUNITIES_CLOSED',
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
          isTimeline: true,
          report: 'OPPORTUNITIES_REVENUE',
          title: 'Revenue',
          information: 'This chart shows how the generated revenue evolved over time.',
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
          isTimeline: true,
          title: 'Sales Cycle',
          information: 'This chart shows how the average sales cycle evolved over time. ',
          report: 'SALES_CYCLE',
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
          isTimeline: true,
          report: 'OPPORTUNITIES_LOST_STAGE',
          title: 'Lost opportunities per stage',
          information:
            'This chart shows how the last status of closed lost opportunities evolved over time.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
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
          isTimeline: true,
          report: 'OPPORTUNITIES_LOST_REASONS',
          title: 'Reasons for lost opps',
          information:
            'This chart shows how the closed lost reason of opportunities evolved over time.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
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
          isTimeline: true,
          report: 'OPPORTUNITIES_MEETINGS',
          title: 'Sales meetings',
          information:
            'This chart shows how the number of meetings related to existing opportunities evolved over time.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
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
          isTimeline: true,
          report: 'OPPORTUNITIES_CHANNEL',
          title: 'Sales activity per channel',
          information:
            'This chart shows how the number of activities related to opportunities evolved over time.',
          options: {
            sortByValue: true,
            sortDirection: 'DESC',
          },
        },
      ],
    },
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
