import IntegrationsLogsTableView from './integrationsLogsTable.view';
import React, { useEffect, useState } from 'react';
import { useActiveUser, useEntity, useRouter } from '../../../hooks';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import PropTypes from 'prop-types';
import { GENERIC_INTEGRATIONS } from '../../../constants/integrations';
import { useUserSettings } from '../../../components/userPermissions/hooks';
import { mutate } from 'swr';
import { api } from '@bloobirds-it/utils';
import { RestApi } from '../../../misc/api/rest';

const ROWS_PER_PAGE_OPTION = [25, 50, 100];

const IntegrationsLogsTableContainer = ({ crm, syncDirections }) => {
  const [syncLogs, setSyncLogs] = useState({
    logs: [],
    itemsPerPage: 0,
    totalElements: 0,
    disabledNextPage: false,
    timeOut: false,
  });

  const { location, history } = useRouter();
  const query = Object.fromEntries(new URLSearchParams(location.search));
  const [refreshTable, setRefreshTable] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [logTracing, isLogTracing] = useState(false);
  const { activeAccount } = useActiveUser();
  const userSettings = useUserSettings();
  const accountSettings = useEntity('accounts')?.findBy('id', activeAccount.id);

  useEffect(
    () => isLogTracing(accountSettings?.logTracingEmail?.includes(userSettings.user.email)),
    [accountSettings],
  );

  const syncDirectionDefaultValue = queryDirection => {
    if (!queryDirection) {
      return syncDirections;
    }
    const values = queryDirection.split(',');
    if (values.length > 1) {
      return '';
    }
    return queryDirection;
  };
  const [filters, setFilters] = useState({
    page: query?.page ? Number(query?.page) : 0,
    pageSize: query?.page ? Number(query?.pageSize) : ROWS_PER_PAGE_OPTION[0],
    bobjectType: query?.bobjectType ?? '',
    dateRange: {
      type: query?.dateRange ?? 'this_week',
      start: startOfWeek(query?.startDate ? new Date(query?.startDate) : new Date(), {
        weekStartsOn: 1,
      }),
      end: endOfWeek(query?.endDate ? new Date(query?.endDate) : new Date(), { weekStartsOn: 1 }),
    },
    status: query?.status ?? '',
    textSearch: query?.textSearch ?? '',
    syncDirection: syncDirectionDefaultValue(query?.direction),
  });

  const [queryIsSet, setQueryIsSet] = useState(false);

  useEffect(() => {
    const queryObject = {
      page: filters.page,
      pageSize: filters.pageSize,
      bobjectType: filters.bobjectType,
      startDate: filters.dateRange.start
        ? format(filters.dateRange.start, 'yyyy-MM-dd')
        : undefined,
      endDate: filters.dateRange.end ? format(filters.dateRange.end, 'yyyy-MM-dd') : undefined,
      dateRange: filters.dateRange.type,
      status: filters.status,
      direction: filters.syncDirection,
      textSearch: filters.textSearch,
    };

    Object.keys(queryObject).forEach(
      key => (queryObject[key] === undefined || queryObject[key] === '') && delete queryObject[key],
    );
    const queryString = new URLSearchParams(queryObject).toString();
    history.push({
      pathname: location.pathname,
      search: queryString,
    });
    setQueryIsSet(true);
    setRefreshTable(true);
  }, [filters]);

  useEffect(() => {
    setFetching(true);
    const requestParams = {
      integrationType: filters.syncDirection,
      page: filters.page,
      size: filters.pageSize,
      dateTo: filters.dateRange.end ? format(filters.dateRange.end, 'yyyy-MM-dd') : undefined,
      status: filters.status,
      bobjectType: filters.bobjectType,
      textSearch: filters.textSearch || undefined,
    };
    if (filters.dateRange.type && filters.dateRange.type !== 'all_time') {
      requestParams.dateFrom = format(filters.dateRange.start, 'yyyy-MM-dd');
    }
    if (queryIsSet && refreshTable) {
      const bucket = GENERIC_INTEGRATIONS.includes(crm) ? 'generic' : 'triggers';
      const searchParams = new URLSearchParams(requestParams).toString();
      api
        .get(`/logging/logs/integrations/${activeAccount.id}/${bucket}?${searchParams}`)
        .then(response => {
          if (response.status === 504) {
            setSyncLogs({ ...syncLogs, logs: undefined, timeOut: true });
            setFetching(false);
            setRefreshTable(false);
          } else if (response.data) {
            setSyncLogs({
              ...syncLogs,
              logs: [...response.data.content],
              itemsPerPage: response.data.content.length,
              totalElements: response.data.totalElements,
              timeOut: false,
              disabledNextPage: response.last,
            });
            setRefreshTable(false);
            setFetching(false);
          }
        });
    } else {
      setFetching(false);
    }
  }, [queryIsSet, refreshTable]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    if (key !== 'page') {
      newFilters.page = 0;
    }
    setFilters({ ...newFilters });
  };

  const handleRefreshPressed = () => {
    setRefreshTable(true);
  };

  const handleAddEmail = value => {
    if (value) {
      RestApi.patch({
        entity: 'accounts',
        id: activeAccount.id,
        body: {
          logTracingEmail: `${accountSettings.logTracingEmail},${userSettings.user.email}`,
        },
      }).then(() => {
        mutate('/entity/accounts');
        isLogTracing(true);
      });
    } else {
      RestApi.patch({
        entity: 'accounts',
        id: activeAccount.id,
        body: {
          logTracingEmail: accountSettings.logTracingEmail.replace(
            `,${userSettings.user.email}`,
            '',
          ),
        },
      }).then(() => {
        mutate('/entity/accounts');
        isLogTracing(false);
      });
    }
  };
  return (
    <IntegrationsLogsTableView
      syncLogs={syncLogs}
      crm={crm}
      syncDirections={syncDirections}
      onRefreshClicked={handleRefreshPressed}
      filters={filters}
      onFilterChange={handleFilterChange}
      fetching={fetching}
      rowsPerPage={ROWS_PER_PAGE_OPTION}
      logTracing={logTracing}
      handleAddLogTracing={handleAddEmail}
    />
  );
};

IntegrationsLogsTableContainer.propTypes = {
  crm: PropTypes.string,
  syncDirections: PropTypes.arrayOf(PropTypes.string),
};
export default IntegrationsLogsTableContainer;
