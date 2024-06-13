import React from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { usePicklistValues } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import CadenceFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/cadenceFilter/cadenceFilter';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { SCHEDULED_DATES_VALUES } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filters.constants';
import { InputPickerFilter } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/inputPickerFilter/InputPickerFilter';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import { RelatedBobjectFilter } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relatedBobjectFilter/relatedBobjectFilter';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import TaskActionFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/taskActionFilter/taskActionFilter';
import SubhomeFilterGroup from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilterGroup/subhomeFilterGroup';
import SessionManagerFactory from '../../../../misc/session';
import { onCadenceFilterFields } from '../../prospectingPage/onCadence/onCadence.constant';
import { SALES_PAGES } from '../useSales.constants';
import { useSalesFollowUpQuery, useSalesFollowUpSort } from './useSalesFollowUp';

const SessionManager = SessionManagerFactory();

export const FollowUpFilters = () => {
  const userId = SessionManager.getUser()?.id;
  const { setQuery, setSubqueryBobjectType } = useSalesFollowUpQuery();
  const { sort, setSort } = useSalesFollowUpSort();

  const hasSalesEnabled = useFullSalesEnabled();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });
  const stages = usePicklistValues({ picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS });
  const priorities = usePicklistValues({ picklistLogicRole: TASK_FIELDS_LOGIC_ROLE.PRIORITY });

  return (
    <SubhomeFilters
      tabName={SALES_PAGES.FOLLOW_UP}
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
          values={SCHEDULED_DATES_VALUES}
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
        {hasSalesEnabled && <RelatedBobjectFilter />}
        <Filter
          fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}
          conditions={{ relatedBobjectType: 'Opportunity' }}
          placeholder="Stages"
          values={stages}
          isMultiselect
        />
        <CadenceFilter />
        <TaskActionFilter />
        <InputPickerFilter
          fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT}
          options={{ placeholder: 'Amount' }}
          conditions={{ relatedBobjectType: 'Opportunity' }}
          showByDefault={false}
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
        <QuickFilters tabName={SALES_PAGES.FOLLOW_UP} />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
