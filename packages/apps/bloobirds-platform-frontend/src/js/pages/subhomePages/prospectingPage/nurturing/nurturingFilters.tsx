import React from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
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
import { nurturingFilterFields } from './nurturing.constant';
import { useProspectingNurturingQuery, useProspectingNurturingSort } from './useProspectNurturing';

const SessionManager = SessionManagerFactory();

export const NurturingFilters = () => {
  const userId = SessionManager.getUser()?.id;
  const { setQuery, setSubqueryBobjectType } = useProspectingNurturingQuery();
  const { sort, setSort } = useProspectingNurturingSort();

  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });
  const mrRatings = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING });
  const buyerPersonas = useGlobalPicklistValues({ logicRole: 'IDEAL_CUSTOMER_PROFILE' });
  const targetMarkets = useGlobalPicklistValues({
    logicRole: 'TARGET_MARKET',
  });
  const nurturingReason = useGlobalPicklistValues({
    logicRole: 'NURTURING_REASON',
  });

  const scheduledFilterValues = [...SCHEDULED_DATES_VALUES];
  scheduledFilterValues.push({ id: 'next_6_months', value: 'Next 6 months' });

  return (
    <SubhomeFilters
      tabName="nurturing"
      bobjectType={BobjectTypes.Task}
      defaultFilters={[
        { fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, defaultValue: 'until_now' },
        { fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
      ]}
      onQueryChange={setQuery}
      onSortChange={setSort}
      hasSortChanged={sort?.hasChanged}
      setOrsBobjectType={setSubqueryBobjectType}
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
          <Item value="highPriority">High priority</Item>
          <Item value="timeZone">Time zone</Item>
          <Item value="country">Country</Item>
          <Item value="source">Source</Item>
          <Item value="mrRating">MR rating</Item>
          <Item value="assignedDateMostRecent">Assigned date most recent</Item>
          <Item value="assignedDateOldest">Assigned date oldest</Item>
          <Item value="lastAttemptMostRecent">Last attempt most recent</Item>
          <Item value="lastAttemptOldest">Last attempt oldest</Item>
          <Item value="lastUpdateMostRecent">Last update most recent</Item>
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
        <TaskActionFilter />
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS}
          conditions={{ relatedBobjectType: 'Company' }}
          strictConditions
          placeholder="Nurturing Reason"
          values={sortBy(nurturingReason, 'value')}
          isMultiselect
        />
        <Filter
          fieldLR={LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS}
          conditions={{ relatedBobjectType: 'Lead' }}
          strictConditions
          placeholder="Nurturing Reason"
          values={sortBy(nurturingReason, 'value')}
          isMultiselect
        />
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
          conditions={{ relatedBobjectType: 'Company' }}
          showByDefault
          placeholder="Target markets"
          values={sortBy(targetMarkets, 'value')}
          isMultiselect
        />
        <Filter
          fieldLR={LEAD_FIELDS_LOGIC_ROLE.ICP}
          conditions={{ relatedBobjectType: 'Lead' }}
          showByDefault
          placeholder="Buyer persona"
          values={buyerPersonas}
          isMultiselect
        />
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.MR_RATING}
          placeholder="MR ratings"
          values={sortBy(mrRatings, 'value')}
          isMultiselect
        />
        <MoreFilter
          bobjectType={BobjectTypes.Task}
          config={{
            filterFieldsMethod: field => !nurturingFilterFields.includes(field?.logicRole),
          }}
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="prospectingNurturing" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
