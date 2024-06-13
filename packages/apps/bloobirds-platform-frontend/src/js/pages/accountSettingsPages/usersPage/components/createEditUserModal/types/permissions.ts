export type PermissionType =
  | 'VIEW_INBOUND_TAB'
  | 'VIEW_INBOX'
  | 'VIEW_OUTBOX_TAB'
  | 'VIEW_ASSIGN_TAB'
  | 'VIEW_PROSPECT_TAB'
  | 'VIEW_SALES_TAB'
  | 'VIEW_DASHBOARDS_TAB'
  | 'VIEW_ADD_QC_TAB'
  | 'USER_ACTIVITY_VISIBILITY'
  | 'VIEW_REPORTS'
  | 'VIEW_CADENCES';

export interface SectionInterface {
  id: string;
  creationDatetime: string;
  updateDatetime: string;
  createdBy: string;
  updatedBy: string;
  enumName: PermissionType;
  name: string;
  _links: string;
  self: {
    href: string;
  };
  userPermission: {
    href: string;
  };
}
