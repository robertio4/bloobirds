import React from 'react';

import {
  Button,
  DateRangePicker,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount, useLazyRef } from '@bloobirds-it/hooks';
import { BobjectTypes, SearchType } from '@bloobirds-it/types';
import { api, TDateISODate } from '@bloobirds-it/utils';
import { capitalize } from 'lodash/string';
import spacetime from 'spacetime';
import useSWR from 'swr';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { SearchLogs } from '../../../../assets/svg';
import { useActiveUser, useQueryParams, useRouter } from '../../../hooks';
import styles from './integrationsLogsTable.module.css';
import { LogRow } from './logRow';
import { LogsFilters } from './logsFilters';
import { IntegrationLogsState, IntegrationLogsStoreType, LogsTableProps } from './types';

const NoSyncLogs = ({ title, text }: { title: string; text: string }) => (
  <div className={styles._sync_logs_content}>
    <SearchLogs className={styles._sync_logs_content_img} />
    <Text size="xl" weight="bold" align="center" color="softPeanut">
      {title}
    </Text>
    <Text size="m" align="center" weight="regular" color="softPeanut">
      {text}
    </Text>
  </div>
);

interface IntegrationLogsTableProps {
  integration: 'SALESFORCE' | 'HUBSPOT';
}

const IntegrationLogsStore = React.createContext<IntegrationLogsStoreType>(null);
export const useIntegrationLogsStore = () => React.useContext(IntegrationLogsStore);

export function useIntegrationLogs<T = any>(selector: (state: IntegrationLogsState) => T) {
  const store = useIntegrationLogsStore();
  const cb = () => selector(store.snapshot());
  // @ts-ignore
  return useSyncExternalStore(store.subscribe, cb, cb);
}

function LogsTable({ integration, logs }: LogsTableProps) {
  const isOTOAccount = useIsOTOAccount();
  return (
    <Table className={styles.table}>
      <TableHead>
        <TableCell>Datetime</TableCell>
        <TableCell>Bloobirds Id</TableCell>
        <TableCell>Object</TableCell>
        <TableCell>Action</TableCell>
        <TableCell>Sync Direction</TableCell>
        <TableCell>Status</TableCell>
      </TableHead>
      <TableBody>
        {logs &&
          logs.map(log => (
            <LogRow
              key={log.timestamp}
              log={log}
              integration={integration}
              isOTOAccount={isOTOAccount}
            />
          ))}
      </TableBody>
    </Table>
  );
}

function getIntegrationType(
  integration: 'SALESFORCE' | 'HUBSPOT' | 'DYNAMICS',
  direction: 'inbound' | 'outbound' | 'both',
) {
  if (integration === 'SALESFORCE') {
    if (direction === 'inbound') {
      return ['INBOUND_SALESFORCE'];
    }
    if (direction === 'outbound') {
      return ['SALESFORCE'];
    }
    return ['SALESFORCE', 'INBOUND_SALESFORCE'];
  }
  if (integration === 'HUBSPOT') {
    if (direction === 'inbound') {
      return ['INBOUND_HUBSPOT'];
    }
    if (direction === 'outbound') {
      return ['HUBSPOT'];
    }
    return ['HUBSPOT', 'INBOUND_HUBSPOT'];
  }
  if (integration === 'DYNAMICS') {
    if (direction === 'inbound') {
      return ['DYNAMICS'];
    }
    if (direction === 'outbound') {
      return ['DYNAMICS'];
    }
    return ['DYNAMICS'];
  }
}

function getQueryParams(
  dateFrom: TDateISODate,
  dateTo: TDateISODate,
  integrationsArray: string[],
  bobjectTypes: BobjectTypes[],
  bobjectId: string,
  textQuery: string,
  status: 'ALL' | 'SUCCESS' | 'FAILED',
  externalId: string,
  importId: string,
) {
  let queryParams = `dateFrom=${dateFrom}&dateTo=${dateTo}&integrationType=${integrationsArray?.join(
    ',',
  )}`;
  if (status && status !== 'ALL') {
    queryParams += `&status=${status}`;
  }
  if (bobjectTypes && bobjectTypes.length > 0) {
    queryParams += `&bobjectTypes=${bobjectTypes.join(',')}`;
  }
  if (bobjectId) {
    queryParams += `&bobjectId=${bobjectId}`;
  }
  if (textQuery) {
    queryParams += `&textSearch=${textQuery}`;
  }
  if (externalId) {
    queryParams += `&externalId=${externalId}`;
  }
  if (importId) {
    queryParams += `&importId=${importId}`;
  }
  return queryParams;
}

function IntegrationLogs({ integration }: { integration: 'SALESFORCE' | 'HUBSPOT' }) {
  const { activeAccount } = useActiveUser();
  const dateFrom = useIntegrationLogs(state => state.dateFrom);
  const dateTo = useIntegrationLogs(state => state.dateTo);
  const page = useIntegrationLogs(state => state.page);
  const pageSize = useIntegrationLogs(state => state.size);
  const direction = useIntegrationLogs(state => state.direction);
  const textQuery = useIntegrationLogs(state => state.textQuery);
  const bobjectId = useIntegrationLogs(state => state.bobjectId);
  const bobjectTypes = useIntegrationLogs(state => state.bobjectTypes);
  const status = useIntegrationLogs(state => state.status);
  const externalId = useIntegrationLogs(state => state.externalId);
  const importId = useIntegrationLogs(state => state.importId);
  const store = useIntegrationLogsStore();

  const integrationsArray = getIntegrationType(integration, direction);
  const queryParams = getQueryParams(
    dateFrom,
    dateTo,
    integrationsArray,
    bobjectTypes,
    bobjectId,
    textQuery,
    status,
    externalId,
    importId,
  );

  const {
    data: logs,
    mutate: mutateLogs,
    isValidating: isLoadingLogs,
  } = useSWR(
    `/logging/v2/logs/integrations/${activeAccount?.id}?${queryParams}&page=${
      page + 1
    }&size=${pageSize}`,
    url => api.get(url).then(res => res.data),
  );

  /*const { data: logsStatus, mutate: mutateStatus, isValidating: isLoadingStatus } = useSWR(
    `/logging/v2/logs/integrations/status/${
      activeAccount?.id
    }?dateFrom=${dateFrom}&dateTo=${dateTo}&integrationType=${integrationsArray.join(',')}`,
    url =>
      api.get(url).then(res => {
        return Object.values(res.data)?.reduce<{ failed: number; success: number }>(
          (acc, curr) => {
            return {
              // @ts-ignore
              failed: curr.FAILED ? parseInt(curr.FAILED) + acc.failed : acc.failed,
              // @ts-ignore
              success: curr.SUCCESS ? parseInt(curr.SUCCESS) + acc.success : acc.success,
            };
          },
          { failed: 0, success: 0 },
        );
      }),
  );*/

  const {
    data: logsCount,
    mutate: mutateCount,
    isValidating: isLoadingCount,
  } = useSWR(`/logging/v2/logs/integrations/count/${activeAccount?.id}?${queryParams}`, url =>
    api.get(url).then(res => res.data),
  );

  return (
    <>
      <div className={styles._card_table_container}>
        <div className={styles.header}>
          <Text size="l" color="peanut" weight="medium" htmlTag="h1">
            {integration && capitalize(integration)} logs
          </Text>
          {/*<div className={styles.statusCounters}>
            <div>
              <Icon name="checkDouble" size={16} color="extraCall" />
              <Text size="xs" color="softPeanut" weight="medium" htmlTag="span">
                Successful actions: {logsStatus?.success}
              </Text>
            </div>
            <div>
              <Icon name="alertCircle" size={16} color="tomato" />
              <Text size="xs" color="softPeanut" weight="medium" htmlTag="span">
                Failed actions: {logsStatus?.failed}
              </Text>
            </div>
          </div>*/}
          <Button
            variant="clear"
            uppercase={false}
            disabled={isLoadingLogs || isLoadingCount}
            onClick={() => {
              mutateLogs();
              mutateCount();
            }}
            iconLeft="refresh"
          >
            Refresh
          </Button>
        </div>
        <LogsFilters integration={integration} />
        {!isLoadingLogs && !isLoadingCount && logs?.logs?.length === 0 ? (
          <NoSyncLogs title="No logs found for this search" text="Try to change your filters" />
        ) : (
          <LogsTable integration={integration} logs={logs?.logs} />
        )}
      </div>
      {
        <div className={styles._pagination}>
          <Pagination
            page={page}
            rowsPerPage={pageSize}
            onChangePage={page => store.setState('page', page)}
            onChangeRowsPerPage={pageSize => store.setState('size', pageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            count={logsCount?.count || 0}
          />
        </div>
      }
    </>
  );
}

function getFromQPAndClear(key: string, qp: URLSearchParams, history: any) {
  const qpValue = qp.get(key);
  const regexSeq = new RegExp(`[?&]${key}=([^&]+)`);
  history.replace({
    search: qp.toString().replace(regexSeq, ''),
  });
  return qpValue;
}

const IntegrationLogsWrapper = ({ integration }: IntegrationLogsTableProps) => {
  const listener = useLazyRef<Set<() => void>>(() => new Set());
  const { history } = useRouter();
  const qp = useQueryParams();

  const state = useLazyRef<IntegrationLogsState>(() => {
    const bobjectIdFromQS = getFromQPAndClear('bobjectId', qp, history);
    const bobjectTypeFromQS = getFromQPAndClear('bobjectType', qp, history);
    const datetimeFromQS = getFromQPAndClear('dateRange', qp, history);
    const importIdFromQS = getFromQPAndClear('importId', qp, history);
    return {
      dateFrom:
        datetimeFromQS === SearchType.ALL_TIME
          ? new Date('1970-01-01').toISOString()
          : (spacetime()
              .subtract(importIdFromQS || bobjectIdFromQS ? 90 : 7, 'day')
              .toNativeDate()
              .toISOString() as TDateISODate),
      dateTo: new Date(new Date().setHours(23, 59, 59, 999)).toISOString() as TDateISODate,
      integrationType: [],
      page: 0,
      size: 25,
      bobjectId: bobjectIdFromQS || null,
      externalId: null,
      textQuery: null,
      direction: 'both',
      status: 'ALL',
      bobjectTypes: [bobjectTypeFromQS] || null,
      importId: importIdFromQS || null,
    };
  });

  const store = React.useMemo<IntegrationLogsStoreType>(() => {
    return {
      setState: (key, value) => {
        // @ts-ignore
        if (Object.is(state.current[key], value)) {
          return;
        }
        // @ts-ignore
        state.current[key] = value;
        store.emit();
      },
      snapshot: () => state.current,
      subscribe: callback => {
        listener.current.add(callback);
        return () => listener.current.delete(callback);
      },
      emit: () => listener.current.forEach(cb => cb()),
    };
  }, []);

  return (
    <IntegrationLogsStore.Provider value={store}>
      <IntegrationLogs integration={integration} />
    </IntegrationLogsStore.Provider>
  );
};

export default IntegrationLogsWrapper;
