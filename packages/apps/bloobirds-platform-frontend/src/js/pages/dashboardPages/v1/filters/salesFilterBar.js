import React from 'react';
import { LogicRoleFilter } from './logicRoleFilter';
import { useDashboard, useMediaQuery } from '../../../../hooks';
import styles from '../dashboardPageContent/dashboardPageContent.module.css';
import { Button, Text } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import { MoreFilters } from './moreFilters';
import SalesSelectGroupBy from './salesSelectGroupBy';
import DateWindowFilters from './dateWindowFilters';
import { FilterItem } from './filterItem';
import { FilterBarContainer } from './filterBarContainer';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';

const AssignedToFilter = ({ value, onChange }) => {
  return (
    <LogicRoleFilter
      logicRole={OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
      placeholder="Assigned To"
      value={value}
      onChange={onChange}
    />
  );
};

const TargetMarketFilter = ({ value, onChange }) => {
  return (
    <LogicRoleFilter
      logicRole={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
      placeholder="Target Market"
      value={value}
      onChange={onChange}
    />
  );
};

const StatusScenarioFilter = ({ value, onChange }) => {
  return (
    <LogicRoleFilter
      logicRole={OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}
      placeholder="Status"
      value={value}
      onChange={onChange}
    />
  );
};

const SalesFilterBar = () => {
  const { dashboardData, clearFilters, setFilters, filters, updateFilters } = useDashboard();
  const { windowDimensions } = useMediaQuery();

  return (
    <FilterBarContainer>
      <DateWindowFilters />
      <FilterItem>
        <div className={styles.separator} />
      </FilterItem>
      <FilterItem>
        <Text size="xs" color="softPeanut">
          Group by
        </Text>
      </FilterItem>
      <FilterItem>
        <SalesSelectGroupBy />
      </FilterItem>
      <FilterItem>
        <div className={styles.separator} />
      </FilterItem>
      <FilterItem>
        <Text size="xs" color="softPeanut">
          Filters
        </Text>
      </FilterItem>
      <FilterItem className={classNames(styles.filters_item_hideOnExtraSmallScreen)}>
        <AssignedToFilter onChange={updateFilters} />
      </FilterItem>
      <FilterItem
        className={classNames(styles.filters_item_hideOnExtraSmallScreen, {
          [styles.filters__with_sideBar_open]:
            dashboardData.isSideBarOpen && windowDimensions.width < 1330,
        })}
      >
        <StatusScenarioFilter onChange={updateFilters} />
      </FilterItem>
      <FilterItem
        className={classNames(styles.filters_item_hideOnSmallScreen, {
          [styles.filters__with_sideBar_open]:
            dashboardData.isSideBarOpen && windowDimensions.width < 1470,
        })}
      >
        <TargetMarketFilter onChange={updateFilters} />
      </FilterItem>
      <FilterItem>
        <MoreFilters onChange={value => setFilters(value)} value={filters} />
      </FilterItem>
      <FilterItem>
        <Button iconLeft="cross" size="small" variant="clear" onClick={clearFilters}>
          Clear
        </Button>
      </FilterItem>
    </FilterBarContainer>
  );
};

export default SalesFilterBar;
