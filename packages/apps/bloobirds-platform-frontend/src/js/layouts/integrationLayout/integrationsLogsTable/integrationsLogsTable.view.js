import React from 'react';
import { Pagination, Text } from '@bloobirds-it/flamingo-ui';
import styles from './integrationsLogsTable.module.css';
import { SearchLogs } from '../../../../assets/svg';
import PropTypes from 'prop-types';
import LogsTable from './logsTable';
import LogsFilters from './logsFilters';
import { capitalize } from 'lodash';
import { CRM } from '../../../constants/integrations';
import { HubspotLogsTooltip } from '../../../components/discoveryTooltips/integrationHubspotTooltips/hubspotLogsTooltip';
import { SalesforceLogsTooltip } from '../../../components/discoveryTooltips/integrationSalesforceTooltips/salesforceLogsTooltip';
import { HubspotNoLogsTooltip } from '../../../components/discoveryTooltips/integrationHubspotTooltips/hubspotNoLogsTooltip';
import { SalesforceNoLogsTooltip } from '../../../components/discoveryTooltips/integrationSalesforceTooltips/salesforceNoLogsTooltip';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';

const NoSyncLogs = ({ title, text }) => (
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

const IntegrationsLogsTableView = ({
  crm,
  syncDirections,
  syncLogs,
  filters,
  onFilterChange,
  onRefreshClicked,
  fetching,
  rowsPerPage,
  logTracing,
  handleAddLogTracing,
}) => {
  const hasQSGEnabled = useQuickStartEnabled();
  return (
    <>
      <div className={styles._card_table_container}>
        <div>
          <LogsFilters
            syncDirections={syncDirections}
            filters={filters}
            onFilterChange={onFilterChange}
            onRefreshClicked={onRefreshClicked}
            crm={crm}
            fetching={fetching}
            logTracing={logTracing}
            handleAddLogTracing={handleAddLogTracing}
          />
        </div>
        {hasQSGEnabled &&
          syncLogs.itemsPerPage !== 0 &&
          (crm === CRM.HUBSPOT ? <HubspotLogsTooltip /> : <SalesforceLogsTooltip />)}

        {syncLogs.timeOut && (
          <NoSyncLogs title="Max entries exceeded!" text="Please add another time filter" />
        )}
        {syncLogs.itemsPerPage > 0 && syncLogs && (
          <div className={styles._sync_logs_table_table}>
            <LogsTable syncLogs={syncLogs.logs} crm={crm} />
          </div>
        )}
        {syncLogs.itemsPerPage === 0 && !syncLogs.timeOut && (
          <>
            <NoSyncLogs
              title={'No Sync logs could be found'}
              text={`it appears you haven't synced any data to ${capitalize(crm)} yet`}
            />
            {hasQSGEnabled && crm === CRM.HUBSPOT ? (
              <HubspotNoLogsTooltip />
            ) : (
              <SalesforceNoLogsTooltip />
            )}
          </>
        )}
      </div>
      {syncLogs.itemsPerPage > 0 && !syncLogs.timeOut && (
        <div className={styles._pagination}>
          <Pagination
            page={filters.page}
            count={syncLogs.totalElements}
            rowsPerPage={filters.pageSize}
            disabledNextPage={syncLogs.disabledNextPage}
            onChangePage={value => onFilterChange('page', value)}
            onChangeRowsPerPage={value => onFilterChange('pageSize', value)}
            itemsPerPage={filters.pageSize}
            rowsPerPageOptions={rowsPerPage}
          />
        </div>
      )}
    </>
  );
};

IntegrationsLogsTableView.propTypes = {
  crm: PropTypes.string,
  fetching: PropTypes.bool,
  filters: PropTypes.object,
  onFilterChange: PropTypes.func,
  onRefreshClicked: PropTypes.func,
  rowsPerPage: PropTypes.arrayOf(PropTypes.number),
  syncDirections: PropTypes.arrayOf(PropTypes.string),
  syncLogs: PropTypes.object,
};
export default IntegrationsLogsTableView;
