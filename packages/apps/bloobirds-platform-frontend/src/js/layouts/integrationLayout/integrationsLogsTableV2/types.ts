import { TDateISODate } from '@bloobirds-it/utils';

import { BobjectTypes } from '@bloobirds-it/types';
import { ACTIONS } from '../../../constants/integrations';

type IntegrationTypes = 'SALESFORCE' | 'HUBSPOT' | 'INBOUND_HUBSPOT' | 'INBOUND_SALESFORCE';
export type IntegrationLogsState = {
  dateFrom: TDateISODate;
  dateTo: TDateISODate;
  integrationType: IntegrationTypes[];
  page: number;
  size: number;
  bobjectId: string;
  externalId: string;
  textQuery: string;
  direction: 'inbound' | 'outbound' | 'both';
  status: 'SUCCESS' | 'FAILED' | 'ALL';
  bobjectTypes: BobjectTypes[];
  importId: string;
};
export type IntegrationLogsStoreType = {
  setState: (key: string, value: any) => void;
  snapshot: () => IntegrationLogsState;
  emit: () => void;
  subscribe: (callback: () => void) => void;
};

export interface IntegrationLog {
  timestamp: string;
  accountName: string;
  accountId: string;
  action: string;
  bobjectName: string;
  status: string;
  integrationType: string;
  externalObject: string;
  externalObjectId: string;
  bobjectType: string;
  bobjectId: string;
  dataSent: any;
  triggerName: keyof typeof ACTIONS;
  error?: string;
  errorCode?: string;
  errorDescription?: string;
  importId?: string;
}

export type LogRowProps = {
  log: IntegrationLog;
  integration: IntegrationTypes;
  isOTOAccount?: boolean;
};
export type LogsTableProps = {
  integration: IntegrationTypes;
  logs: IntegrationLog[];
};
