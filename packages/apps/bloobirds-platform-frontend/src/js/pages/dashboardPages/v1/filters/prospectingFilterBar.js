import React from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import classNames from 'clsx';

import { DashboardsDateFilterTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsDateFilterTooltip';
import { DashboardsFiltersTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsFiltersTooltip';
import { DashboardsGroupByTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsGroupByTooltip';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { useDashboard, useMediaQuery } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';
import styles from '../dashboardPageContent/dashboardPageContent.module.css';
import DateWindowFilters from './dateWindowFilters';
import { FilterBarContainer } from './filterBarContainer';
import { FilterItem } from './filterItem';
import { LogicRoleFilter } from './logicRoleFilter';
import { MoreFilters } from './moreFilters';
import { ProspectingSelectGroupBy } from './prospectingSelectGroupBy';

const ICPFilter = ({ value, onChange }) => {
  return (
    <LogicRoleFilter
      logicRole={LEAD_FIELDS_LOGIC_ROLE.ICP}
      value={value}
      placeholder="ICP"
      onChange={onChange}
      filterName="icp"
    />
  );
};
const AssignedToFilter = ({ value, onChange }) => {
  return (
    <LogicRoleFilter
      logicRole={COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
      value={value}
      placeholder="Assigned To"
      onChange={onChange}
      filterName="assignedTo"
    />
  );
};
const TargetMarketFilter = ({ value, onChange }) => {
  return (
    <LogicRoleFilter
      logicRole={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
      value={value}
      placeholder="Target Market"
      onChange={onChange}
      filterName="targetMarket"
    />
  );
};
const CompanyScenarioFilter = ({ value, onChange }) => {
  return (
    <LogicRoleFilter
      logicRole={COMPANY_FIELDS_LOGIC_ROLE.SCENARIO}
      value={value}
      placeholder="Scenario"
      onChange={onChange}
      filterName="scenario"
    />
  );
};

const ProspectingFilterBar = () => {
  const { dashboardData, clearFilters, setFilters, filters, updateFilters } = useDashboard();
  const { windowDimensions } = useMediaQuery();

  const isSalesEnabled = useFullSalesEnabled();
  const hasQSGEnabled = useQuickStartEnabled();

  const groupByTypes = [BOBJECT_TYPES.ACTIVITY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY];
  if (isSalesEnabled) {
    groupByTypes.push(BOBJECT_TYPES.OPPORTUNITY);
  }
  return (
    <FilterBarContainer>
      <DateWindowFilters />
      {hasQSGEnabled && <DashboardsDateFilterTooltip />}
      <FilterItem>
        <div className={styles.separator} />
      </FilterItem>
      <FilterItem>
        <Text size="xs" color="softPeanut">
          Group by
        </Text>
      </FilterItem>
      {hasQSGEnabled && <DashboardsGroupByTooltip />}
      <FilterItem>
        <ProspectingSelectGroupBy />
      </FilterItem>
      <FilterItem>
        <div className={styles.separator} />
      </FilterItem>
      <FilterItem>
        <Text size="xs" color="softPeanut">
          Filters
        </Text>
      </FilterItem>
      {hasQSGEnabled && <DashboardsFiltersTooltip />}
      <FilterItem className={classNames(styles.filters_item_hideOnExtraSmallScreen)}>
        <AssignedToFilter onChange={updateFilters} />
      </FilterItem>
      <FilterItem
        className={classNames(styles.filters_item_hideOnExtraSmallScreen, {
          [styles.filters__with_sideBar_open]:
            dashboardData.isSideBarOpen && windowDimensions.width < 1330,
        })}
      >
        <TargetMarketFilter
          onChange={value => {
            updateFilters(value);
          }}
        />
      </FilterItem>
      <FilterItem
        className={classNames(styles.filters_item_hideOnSmallScreen, {
          [styles.filters__with_sideBar_open]:
            dashboardData.isSideBarOpen && windowDimensions.width < 1470,
        })}
      >
        <ICPFilter
          onChange={value => {
            updateFilters(value);
          }}
        />
      </FilterItem>
      <FilterItem
        className={classNames(styles.filters_item_hideOnSmallScreen, {
          [styles.filters__with_sideBar_open]:
            dashboardData.isSideBarOpen && windowDimensions.width < 1610,
        })}
      >
        <CompanyScenarioFilter
          onChange={value => {
            updateFilters(value);
          }}
        />
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

export default ProspectingFilterBar;
