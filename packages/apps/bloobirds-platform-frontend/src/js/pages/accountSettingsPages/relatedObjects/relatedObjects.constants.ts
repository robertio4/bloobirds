import { IconType } from '@bloobirds-it/flamingo-ui';

export interface FieldColumns {
  sortable: boolean;
  id: string;
  align: 'left' | 'center' | 'right';
  icon?: IconType;
}

export const fieldColumns: FieldColumns[] = [
  {
    sortable: false,
    id: 'icon',
    align: 'center',
  },
  {
    sortable: true,
    id: 'objectName',
    align: 'left',
  },
  {
    sortable: false,
    id: 'titleField',
    align: 'left',
  },
  {
    sortable: false,
    id: 'relationshipsField',
    align: 'left',
  },
  {
    sortable: false,
    id: 'valuesToShow',
    align: 'left',
    icon: 'infoFilled',
  },
  {
    sortable: false,
    id: 'displayObject',
    align: 'center',
  },
];

export const crmObjects = [
  {
    label: 'Account',
    crmObject: 'Account',
  },
  {
    label: 'Lead',
    crmObject: 'Lead',
  },
  {
    label: 'Contact',
    crmObject: 'Contact',
  },
  {
    label: 'Opportunity',
    crmObject: 'Opportunity',
  },
];
