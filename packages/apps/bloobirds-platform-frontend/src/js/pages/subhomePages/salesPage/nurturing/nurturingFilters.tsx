import React from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { usePicklistValues } from '../../../../hooks';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { SCHEDULED_DATES_VALUES } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filters.constants';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import { RelatedBobjectFilter } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relatedBobjectFilter/relatedBobjectFilter';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import TaskActionFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/taskActionFilter/taskActionFilter';
import SubhomeFilterGroup from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilterGroup/subhomeFilterGroup';
import SessionManagerFactory from '../../../../misc/session';
import { onCadenceFilterFields } from '../../prospectingPage/onCadence/onCadence.constant';
import { useSalesNurturingQuery, useSalesNurturingSort } from './useSalesNurturing';

const SessionManager = SessionManagerFactory();

export const NurturingFilters = () => {
  const userId = SessionManager.getUser()?.id;
  const { setQuery, setORsBobjectTypes } = useSalesNurturingQuery();
  const { sort, setSort } = useSalesNurturingSort();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });
  const stages = usePicklistValues({ picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS });
  const nurturingReasons = useGlobalPicklistValues({
    logicRole: 'NURTURING_SALES_REASON',
  });

  const scheduledFilterValues = [...SCHEDULED_DATES_VALUES];
  scheduledFilterValues.push({ id: 'next_6_months', value: 'Next 6 months' });
  const priorities = usePicklistValues({ picklistLogicRole: TASK_FIELDS_LOGIC_ROLE.PRIORITY });

  return (
    <SubhomeFilters
      tabName="salesNurturing"
      bobjectType={BobjectTypes.Task}
      defaultFilters={[
        { fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, defaultValue: 'until_now' },
        { fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
      ]}
      onQueryChange={setQuery}
      onSortChange={setSort}
      hasSortChanged={sort?.hasChanged}
      setOrsBobjectType={setORsBobjectTypes}
    >
      <SubhomeFilterGroup>
        <Filter
          fieldLR={TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME}
          placeholder="Date"
          values={scheduledFilterValues}
        />
        <Select
          placeholder="Order"
          size="small"
          variant="filters"
          value={sort?.value}
          onChange={setSort}
        >
          <Item value="select">Scheduled date</Item>
          <Item value="closeDateOldest">Close date oldest</Item>
          <Item value="closeDateRecent">Close date most recent</Item>
          <Item value="stage">State</Item>
          <Item value="amount">Amount</Item>
          <Item value="creationDateRecent">Creation date most recent</Item>
          <Item value="creationDateOldest">Creation date oldest</Item>
          <Item value="lastUpdateRecent">Last update most recent</Item>
          <Item value="lastUpdateOldest">Last update oldest</Item>
        </Select>
        {isAccountAdmin && (
          <Filter
            fieldLR={TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
            placeholder="Assigned to"
            values={users}
            isMultiselect
          />
        )}
        <RelatedBobjectFilter />
        <Filter
          fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}
          conditions={{ relatedBobjectType: 'Opportunity' }}
          placeholder="Stages"
          values={stages}
          isMultiselect
        />
        <TaskActionFilter />
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS}
          placeholder="Company Nurturing Reason"
          conditions={{ relatedBobjectType: BobjectTypes.Company }}
          values={nurturingReasons}
        />
        <Filter
          fieldLR={LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS}
          placeholder="Lead Nurturing Reason"
          conditions={{ relatedBobjectType: BobjectTypes.Lead }}
          values={nurturingReasons}
        />
        <Filter
          fieldLR={TASK_FIELDS_LOGIC_ROLE.PRIORITY}
          placeholder="Priority"
          values={sortBy(priorities, 'value')}
          isMultiselect
        />
        <MoreFilter
          bobjectType={BobjectTypes.Task}
          config={{
            filterFieldsMethod: field => !onCadenceFilterFields.includes(field?.logicRole),
          }}
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="salesNurturing" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
