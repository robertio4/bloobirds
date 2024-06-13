import React from 'react';
import { Button, Text } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import { FilterBarContainer } from '../../v1/filters/filterBarContainer';
import { DateWindowFilters } from './dateWindowFilters';
import { FilterItem } from './filterItem';
import styles from '../../v1/dashboardPageContent/dashboardPageContent.module.css';
import AdvancedGroupBy from './advancedGroupBy';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../../constants/activity';
import { useMediaQuery, useNewDashboard } from '../../../../hooks';
import { LogicRoleFilter } from './logicRoleFilter';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';
import { MoreFilters } from './moreFilters';
import { DashboardsDateFilterTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsDateFilterTooltip';
import { DashboardsGroupByTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsGroupByTooltip';
import { DashboardsFiltersTooltip } from '../../../../components/discoveryTooltips/dashboardsTourTooltips/dashboardsFiltersTooltip';
import { useInFunnelPage } from '../../../../hooks/useInFunnelPage';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';
import { useInHistoricDashboardPage } from '../../../../hooks/useInHistoricDashboardPage';

interface FilterBar {
  visibleFilters: string[];
}

export const FilterBar = ({ visibleFilters }: FilterBar) => {
  const isSalesEnabled = useFullSalesEnabled();
  const hasQSGEnabled = useQuickStartEnabled();
  const isFunnelPage = useInFunnelPage();
  const isInHistoricalPage = useInHistoricDashboardPage();
  const groupByTypes = [BOBJECT_TYPES.ACTIVITY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY];
  if (isSalesEnabled) {
    groupByTypes.push(BOBJECT_TYPES.OPPORTUNITY);
  }
  const { windowDimensions } = useMediaQuery();
  const { dashboardData } = useNewDashboard();
  const { updateFilters, setFilters, filters, clearFilters } = useDashboardFilters();

  if (filters) {
    delete filters['HISTORIC_ASSIGNED_TO'];
  }
  return (
    <FilterBarContainer>
      <DateWindowFilters />
      {hasQSGEnabled && <DashboardsDateFilterTooltip />}

      <FilterItem>
        <div className={styles.separator} />
      </FilterItem>
      {!isFunnelPage && (
        <>
          <FilterItem>
            <Text size="xs" color="softPeanut">
              Group By
            </Text>
          </FilterItem>
          {hasQSGEnabled && <DashboardsGroupByTooltip />}
          <FilterItem>
            <AdvancedGroupBy
              bobjectTypesToShow={groupByTypes}
              mainFieldsLogicRoles={[
                COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
                COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
                LEAD_FIELDS_LOGIC_ROLE.ICP,
                COMPANY_FIELDS_LOGIC_ROLE.SCENARIO,
                COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
                COMPANY_FIELDS_LOGIC_ROLE.DATA_SOURCE_AUTOMATED,
                ACTIVITY_FIELDS_LOGIC_ROLE.USER,
                COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS,
              ]}
            />
          </FilterItem>
        </>
      )}

      <FilterItem>
        <div className={styles.separator} />
      </FilterItem>
      <FilterItem>
        <Text size="xs" color="softPeanut">
          Filters
        </Text>
      </FilterItem>
      {hasQSGEnabled && <DashboardsFiltersTooltip />}
      {(isInHistoricalPage || isFunnelPage) && (
        <FilterItem key={`filter-HISTORIC_ASSIGNED_TO`}>
          <LogicRoleFilter
            customRole={'HISTORIC_ASSIGNED_TO'}
            globalPicklistRole={'USER'}
            onChange={value => updateFilters(value)}
          />
        </FilterItem>
      )}
      {visibleFilters.map((logicRole, i) => (
        <FilterItem
          key={`filter-${logicRole}`}
          className={classNames([], {
            [styles.hide_filter]: 1300 + 140 * i > windowDimensions.width,
          })}
        >
          <LogicRoleFilter logicRole={logicRole} onChange={value => updateFilters(value)} />
        </FilterItem>
      ))}
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
