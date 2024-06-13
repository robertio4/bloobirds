import React, { useState } from 'react';
import {
  Text,
  Icon,
  Button,
  Spinner,
  RelativeDatePicker,
  Select,
  Item,
  SearchInput,
  Switch,
} from '@bloobirds-it/flamingo-ui';
import styles from './logsFilters.module.css';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

const LogsFiltersView = ({
  crm,
  syncDirections,
  fetching,
  onRefreshClicked,
  bobjectTypes,
  onFilterChange,
  filters,
  handleAddLogTracing,
  logTracing,
}) => {
  const [textSearch, setTextSearch] = useState(filters.textSearch);
  const logStatuses = [
    { value: 'FAILED', label: 'Error' },
    { value: 'SUCCESS', label: 'Success' },
  ];

  const generateSyncDirection = type => {
    if (type.toLowerCase().includes('inbound')) {
      return (
        <span>
          {capitalize(crm)} <Icon name="arrowRight" color="peanut" size="12" /> Bloobirds
        </span>
      );
    }
    return (
      <span>
        Bloobirds <Icon name="arrowRight" color="peanut" size="12" /> {capitalize(crm)}
      </span>
    );
  };

  const syncFilterOptions = syncDirections.map(type => ({
    key: type,
    label: generateSyncDirection(type),
  }));

  const handleSearchEnterPressed = e => {
    if (e.key === 'Enter' && textSearch !== filters.textSearch) {
      onFilterChange('textSearch', textSearch);
    }
  };

  const handleSearchChange = value => {
    if (value === '') {
      onFilterChange('textSearch', value);
    }
    setTextSearch(value);
  };

  return (
    <>
      <div className={styles._card_table_container}>
        <div className={styles._sync_logs_header}>
          <div>
            <Icon name="alignLeft" size="24" color="bloobirds" />
            <Text size="l" weight="medium">
              Sync logs
            </Text>
            <Button
              iconLeft={!fetching && 'refresh'}
              variant="secondary"
              size="small"
              uppercase
              onClick={onRefreshClicked}
            >
              {fetching ? <Spinner size={16} name="loadingCircle" /> : 'refresh'}
            </Button>
          </div>
          <div>
            <div className={styles._sync_logs_search_filter}>
              <SearchInput
                placeholder="Search"
                value={textSearch}
                onChange={handleSearchChange}
                onKeyPress={handleSearchEnterPressed}
              />
            </div>
          </div>
        </div>

        <div className={styles._sync_logs_table}>
          <div className={styles._sync_logs_table_filters}>
            <div>
              <div className={styles._sync_logs_time_filter}>
                <RelativeDatePicker
                  onChange={rangeDate => onFilterChange('dateRange', { ...rangeDate })}
                  size="small"
                  value={filters.dateRange}
                />
              </div>
              <div className={styles._sync_logs_separator} />
              <div className={styles._sync_logs_object_filter}>
                <Select
                  size="small"
                  placeholder="Object type"
                  borderless={false}
                  width="108px"
                  value={filters.bobjectType}
                  onChange={value => onFilterChange('bobjectType', value)}
                >
                  <Item key={'all'} value={''}>
                    <em>All</em>
                  </Item>
                  {bobjectTypes &&
                    bobjectTypes.map(bobjectTypeItem => (
                      <Item key={bobjectTypeItem.id} value={bobjectTypeItem.name.toUpperCase()}>
                        {bobjectTypeItem.name}
                      </Item>
                    ))}
                </Select>
              </div>
              <div className={styles._sync_logs_status_filter}>
                <Select
                  size="small"
                  placeholder="Status"
                  width="108px"
                  borderless={false}
                  onChange={value => onFilterChange('status', value)}
                  value={filters.status}
                >
                  <Item key={'all'} value={''}>
                    <em>All</em>
                  </Item>
                  {logStatuses.map(status => (
                    <Item key={status.value} value={status.value}>
                      {status.label}
                    </Item>
                  ))}
                </Select>
              </div>
              <div className={styles._sync_logs_status_filter}>
                <Select
                  size="small"
                  placeholder="Sync direction"
                  width="108px"
                  borderless={false}
                  onChange={value => onFilterChange('syncDirection', value)}
                  value={filters.syncDirection}
                >
                  <Item key={'all'} value={''}>
                    <em>All</em>
                  </Item>
                  {syncFilterOptions.map(option => (
                    <Item key={option.key} value={option.key}>
                      {option.label}
                    </Item>
                  ))}
                </Select>
              </div>
            </div>
            <div className={styles._sync_logs_log_tracing}>
              <Switch checked={logTracing} onChange={handleAddLogTracing} />
              <Text size="xs" weight="medium" color="peanut">
                Send me an email when new errors occur
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LogsFiltersView.propTypes = {
  bobjectTypes: PropTypes.arrayOf(PropTypes.object),
  crm: PropTypes.string,
  fetching: PropTypes.bool,
  filters: PropTypes.object,
  onFilterChange: PropTypes.func,
  onRefreshClicked: PropTypes.func,

  syncDirections: PropTypes.arrayOf(PropTypes.string),
};
export default LogsFiltersView;
