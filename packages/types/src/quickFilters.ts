interface Filter {
  bobjectFieldId: string;
  values: any[];
}

export interface QuickFilter {
  name: string;
  defaultGroup?: boolean;
  filters: Filter[];
  id: string;
  tabName?: string;
  color: string;
  iconName?: string;
  iconColor?: string;
}

export interface QuickFilterValue {
  bobjectPicklistValue: string;
  textValue: string;
  searchType: string;
}
