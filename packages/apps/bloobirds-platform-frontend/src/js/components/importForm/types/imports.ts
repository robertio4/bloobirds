export interface ValidationMessage {
  type: string;
  message: string;
}

export enum ImportAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface ColumnName {
  index: number;
  label: string;
}
