import React from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { usePicklistValues } from '../../../../hooks';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { InputPickerFilter } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/inputPickerFilter/InputPickerFilter';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import RelativeDateFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relativeDateFilter/relativeDateFilter';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { SubhomeFilterGroup } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { UserObject } from '../../../../typings/user';
import { SALES_PAGES } from '../useSales.constants';
import { allMyOppsFilterFields } from './allMyOpps.constant';
import { NameSearchFilter } from './components/nameSearchFilter';
import {
  useSalesAllMyOppsQuery,
  useSalesAllMyOppsSort,
  useSalesAllMyOppsViewMode,
} from './useSalesAllMyOpps';

const SessionManager = SessionManagerFactory();

const AllMyOppsFilters = () => {
  const { setQuery } = useSalesAllMyOppsQuery();
  const { sort, setSort } = useSalesAllMyOppsSort();
  const [viewMode] = useSalesAllMyOppsViewMode();
  const isKanban = viewMode === 'KANBAN';
  const isAccountAdmin = useIsAccountAdmin();

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  const userId = SessionManager.getUser()?.id;
  const stages = usePicklistValues({ picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS });

  return (
    <SubhomeFilters
      bobjectType={BobjectTypes.Opportunity}
      defaultFilters={[
        { fieldLR: OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
      ]}
      tabName="allMyOpps"
      hasSortChanged={sort?.hasChanged}
      onQueryChange={setQuery}
      onSortChange={setSort}
    >
      <SubhomeFilterGroup>
        <Select
          size="small"
          variant="filters"
          placeholder="Order by"
          value={sort?.value}
          onChange={setSort}
        >
          <Item value="closeDateOldest">Close date oldest</Item>
          <Item value="closeDateRecent">Close date most recent</Item>
          <Item value="stage">State</Item>
          <Item value="amount">Amount</Item>
          <Item value="creationDateRecent">Creation date most recent</Item>
          <Item value="creationDateOldest">Creation date oldest</Item>
          <Item value="lastUpdateRecent">Last update most recent</Item>
          <Item value="lastUpdateOldest">Last update oldest</Item>
        </Select>
        <NameSearchFilter />
        <RelativeDateFilter fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME} />
        {isAccountAdmin && (
          <Filter
            fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
            placeholder="Assigned to"
            values={users}
            isMultiselect
          />
        )}
        {!isKanban && (
          <Filter
            fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}
            placeholder="Stages"
            values={sortBy(stages, 'value')}
            isMultiselect
          />
        )}
        <InputPickerFilter
          fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT}
          options={{ placeholder: 'Amount' }}
        />
        <MoreFilter
          bobjectType={BobjectTypes.Opportunity}
          config={{
            filterFieldsMethod: field => !allMyOppsFilterFields.includes(field?.logicRole),
          }}
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName={SALES_PAGES.ALL_MY_OPPORTUNITIES} />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};

export default AllMyOppsFilters;
