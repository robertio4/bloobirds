import { CadenceStatus } from './analyzeCadenceList.typings';

export const cadencesHeadersNames = () => [
  {
    label: 'Name',
    name: 'name',
    sortable: true,
  },
  {
    label: '',
    name: '',
    sortable: false,
  },
  {
    label: 'Type',
    name: 'type',
    sortable: true,
  },
];

export const objectsHeadersNames = (bobjectType: 'COMPANY' | 'LEAD' | 'OPPORTUNITY') =>
  [
    ['LEAD', 'OPPORTUNITY'].includes(bobjectType)
      ? {
          label: bobjectType,
          name: 'objectname',
          sortable: true,
        }
      : undefined,
    {
      label: 'Company',
      name: 'companyname',
      sortable: true,
    },
    {
      label: 'Status',
      name: 'cadencestatus',
      sortable: true,
    },
    {
      label: 'Started',
      name: 'starteddate',
      sortable: true,
    },
  ].filter(Boolean);

export const cadenceStatusColors = {
  [CadenceStatus.Active]: { textColor: 'extraCall', backgroundColor: 'verySoftMelon' },
  [CadenceStatus.Stopped]: { textColor: 'tomato', backgroundColor: 'verySoftTomato' },
  [CadenceStatus.Ended]: { textColor: 'peanut', backgroundColor: 'verySoftPeanut' },
};
