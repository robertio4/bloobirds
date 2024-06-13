import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

export type AnalyzeCadenceTableResponse = {
  result: AnalyzeCadenceTableRow[] | AnalyzeObjectsTableRow[];
  headers: CadenceTableKPI[] | ObjectsInCadenceMetric[];
  page: number;
  pageSize: number;
  totalElements: number;
  orderBy: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
};

export type AnalyzeCadenceTableRow = {
  cadenceId: string;
  name: string;
  type: string;
  defaultCadence: boolean;
  kpis: CadenceTableKPI[];
  bobjectType: 'COMPANY' | 'LEAD' | 'OPPORTUNITY';
};

export type AnalyzeObjectsTableRow = {
  bobjectId: string;
  bobjectType: 'COMPANY' | 'LEAD' | 'OPPORTUNITY';
  companyName: string;
  companyId: string;
  startDate: string;
  objectLinkedinUrl: string;
  companyLinkedinUrl: string;
  objectSalesforceId: string;
  companySalesforceId: string;
  name: string;
  status: CadenceStatus;
  metrics: ObjectsInCadenceMetric[];
};

export type CadenceTableKPI = {
  value: number;
  icon: string;
  iconColor: string;
  kpiGroup: string;
  type: 'PERCENTAGE' | 'FIXED';
  label: string;
  tooltip: string;
};

export type ObjectsInCadenceMetric = {
  value: number;
  icon: IconType;
  color: ColorType;
  tooltip: string;
};

export enum CadenceStatus {
  Active = 'Active',
  Ended = 'Ended',
  Stopped = 'Stopped',
}
