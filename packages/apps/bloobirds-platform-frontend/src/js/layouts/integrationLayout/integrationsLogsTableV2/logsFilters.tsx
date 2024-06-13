import React from 'react';

import {
  CheckItem,
  IconButton,
  Input,
  Item,
  MultiSelect,
  RelativeDatePicker,
  Select,
} from '@bloobirds-it/flamingo-ui';
import { toSentenceCase } from '@bloobirds-it/utils';
import debounce from 'lodash/debounce';

import { useBobjectTypes } from '../../../hooks/useBobjectTypes';
import { RangeType } from '../../../hooks/useDashboardFilters';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import { useIntegrationLogs, useIntegrationLogsStore } from './integrationLogs';
import styles from './integrationsLogsTable.module.css';

const HUBSPOT_DIRECTION_OPTIONS = [
  { value: 'inbound', label: 'Hubspot -> Bloobirds' },
  { value: 'outbound', label: 'Bloobirds -> Hubspot' },
];

const SALESFORCE_DIRECTION_OPTIONS = [
  { value: 'inbound', label: 'Salesforce -> Bloobirds' },
  { value: 'outbound', label: 'Bloobirds -> Salesforce' },
];

type Integration = 'SALESFORCE' | 'HUBSPOT';

export function LogsFilters({ integration }: { integration: Integration }) {
  const store = useIntegrationLogsStore();
  const bobjectTypes = useBobjectTypes();
  const dateFrom = useIntegrationLogs(state => state.dateFrom);
  const dateTo = useIntegrationLogs(state => state.dateTo);
  const selectedBobjectTypes = useIntegrationLogs(state => state.bobjectTypes);
  const status = useIntegrationLogs(state => state.status);
  const direction = useIntegrationLogs(state => state.direction);
  const bobjectId = useIntegrationLogs(state => state.bobjectId);
  const textQuery = useIntegrationLogs(state => state.textQuery);
  const externalId = useIntegrationLogs(state => state.externalId);
  const importId = useIntegrationLogs(state => state.importId);
  const [dateType, setDateType] = React.useState<RangeType>('custom');
  const [showMoreFilters, setShowMoreFilters] = React.useState<boolean>(
    !!externalId || !!importId || false,
  );

  const syncFilterOptions =
    integration === 'HUBSPOT' ? HUBSPOT_DIRECTION_OPTIONS : SALESFORCE_DIRECTION_OPTIONS;

  const resetPage = () => {
    store.setState('page', 0);
  };

  const handleBobjectIdChange = debounce((value: string) => {
    store.setState('bobjectId', value);
    resetPage();
  }, 500);

  const handleTextQueryChange = debounce((value: string) => {
    store.setState('textQuery', value);
    resetPage();
  }, 500);

  const handleExternalIdChange = debounce((value: string) => {
    store.setState('externalId', value);
    resetPage();
  }, 500);

  const handleImportIdChange = debounce((value: string) => {
    store.setState('importId', value);
    resetPage();
  }, 500);

  return (
    <div>
      <div className={styles.logFiltersRow}>
        <div className={styles.logFilters}>
          <RelativeDatePicker
            width="160px"
            onChange={rangeDate => {
              store.setState('dateFrom', rangeDate.start.toISOString());
              store.setState('dateTo', rangeDate.end.toISOString());
              resetPage();
              setDateType(rangeDate.type);
            }}
            size="small"
            value={{ type: dateType, start: new Date(dateFrom), end: new Date(dateTo) }}
          />
          <MultiSelect
            size="small"
            placeholder="Object type"
            borderless={false}
            width="108px"
            value={selectedBobjectTypes}
            onChange={value => {
              store.setState('bobjectTypes', value);
              resetPage();
            }}
          >
            {bobjectTypes &&
              bobjectTypes.all().map(bobjectTypeItem => {
                if (bobjectTypeItem.name === 'Task') {
                  return null;
                }
                return (
                  <CheckItem key={bobjectTypeItem.id} value={bobjectTypeItem.name}>
                    {bobjectTypeItem.name}
                  </CheckItem>
                );
              })}
          </MultiSelect>
          <Select
            size="small"
            placeholder="Status"
            width="108px"
            borderless={false}
            onChange={value => {
              store.setState('status', value);
              resetPage();
            }}
            value={status}
          >
            <Item key={'all'} value={''}>
              All
            </Item>
            {[
              { value: 'FAILED', label: 'Error' },
              { value: 'SUCCESS', label: 'Success' },
            ].map(status => (
              <Item key={status.value} value={status.value}>
                {status.label}
              </Item>
            ))}
          </Select>
          <Select
            size="small"
            placeholder="Direction"
            width="108px"
            borderless={false}
            onChange={value => {
              store.setState('direction', value);
              resetPage();
            }}
            value={direction}
          >
            <Item key={'all'} value={'both'}>
              All
            </Item>
            {syncFilterOptions.map(option => (
              <Item key={option.value} value={option.value}>
                {option.label}
              </Item>
            ))}
          </Select>
          <div className={styles.bobjectIdInput}>
            <Input
              transparent={false}
              borderless={false}
              width="128px"
              size="small"
              defaultValue={bobjectId}
              onChange={handleBobjectIdChange}
              placeholder="Bloobirds id"
              icon="search"
            />
          </div>
        </div>
        <div className={styles.textQueryFilter}>
          <div className={styles.bobjectIdInput}>
            <Input
              transparent={false}
              borderless={false}
              width="192px"
              size="small"
              defaultValue={textQuery}
              onChange={handleTextQueryChange}
              placeholder="Mapped data search"
              icon="search"
            />
          </div>
          <IconButton
            name="filter"
            size={16}
            color="bloobirds"
            onClick={() => setShowMoreFilters(showMoreFilters => !showMoreFilters)}
          />
        </div>
      </div>
      {showMoreFilters && (
        <div className={styles.logFiltersRow}>
          <div className={styles.logFilters}>
            <div className={styles.bobjectIdInput}>
              <Input
                transparent={false}
                borderless={false}
                width="128px"
                size="small"
                defaultValue={importId}
                onChange={handleImportIdChange}
                placeholder="Import id"
                icon="search"
              />
            </div>
            <div className={styles.bobjectIdInput}>
              <Input
                transparent={false}
                borderless={false}
                width="128px"
                size="small"
                defaultValue={externalId}
                onChange={handleExternalIdChange}
                placeholder={`${toSentenceCase(integration.toLowerCase())} id`}
                icon="search"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
