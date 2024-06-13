export const headerNames = [
  {
    label: 'Name',
    name: 'name',
    sortable: true,
  },
  {
    label: 'Type',
    name: 'type',
    sortable: true,
  },
  {
    label: '',
    name: '',
    sortable: false,
  },
  {
    label: 'Steps',
    name: 'totalSteps',
    sortable: true,
  },
  {
    label: 'Duration (Days)',
    name: 'totalDays',
    sortable: true,
  },
  {
    label: 'Created',
    name: 'creationDatetime',
    sortable: true,
  },
  {
    label: 'Last Update',
    name: 'lastEntityUpdate',
    sortable: true,
  },
  {
    label: 'Created by',
    name: 'createdBy',
    sortable: true,
  },
  {
    label: 'Visibility',
    name: 'editMode',
    sortable: true,
  },
  {
    label: 'Status',
    name: 'status',
    sortable: false,
  },
];

export const emailAutomationHeaderNames = (orderingEnabled: boolean) => [
  {
    label: 'Name',
    name: 'name',
    sortable: orderingEnabled,
  },
  {
    label: '',
    name: '',
    sortable: false,
  },
  {
    label: 'Type',
    name: 'type',
    sortable: false,
  },
  /*{
    label: 'Prospects',
    name: 'prospectCount',
    sortable: orderingEnabled,
  },
  {
    label: 'Used',
    name: 'activeCount',
    sortable: orderingEnabled,
  },*/
  {
    label: 'Duration (Days)',
    name: 'totalDays',
    sortable: orderingEnabled,
  },
  {
    label: 'Steps',
    name: 'totalSteps',
    sortable: orderingEnabled,
  },
  {
    label: 'Automated',
    name: 'automatedPercentage',
    sortable: orderingEnabled,
  },
  {
    label: 'Opted-out',
    name: 'optOutCount',
    sortable: orderingEnabled,
  },
  {
    label: 'Created',
    name: 'creationDatetime',
    sortable: orderingEnabled,
  },
  {
    label: 'Author',
    name: 'createdBy',
    sortable: orderingEnabled,
  },
  {
    label: 'Visibility',
    name: 'editMode',
    sortable: orderingEnabled,
  },
  {
    label: 'Tags',
    name: 'tags',
    sortable: false,
  },
  {
    label: 'Status',
    name: 'status',
    sortable: false,
  },
];
