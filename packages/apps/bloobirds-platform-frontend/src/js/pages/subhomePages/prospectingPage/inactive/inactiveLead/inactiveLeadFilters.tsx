import React from 'react';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { sortBy } from 'lodash';
import { SubhomeFilterGroup } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import SubhomeFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { useGlobalPicklistValues, usePicklistValues } from '../../../../../hooks/usePicklistValues';
import { BobjectTypes } from '@bloobirds-it/types';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { useIsAccountAdmin } from '../../../../../hooks/usePermissions';
import { UserObject } from '../../../../../typings/user';
import QuickFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import Filter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import MoreFilter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import { useEntity } from '../../../../../hooks';
import { inactiveLeadConstant } from './inactiveLead.constant';
import { PROSPECT_PAGES } from '../../constants/prospectPages';
import {
  useProspectingInactiveLeadQuery,
  useProspectingInactiveLeadSort,
} from './useProspectingInactiveLead';

const inactiveLeadFilters = () => {
  const { setQuery } = useProspectingInactiveLeadQuery();
  const { sort, setSort } = useProspectingInactiveLeadSort();

  const isAccountAdmin = useIsAccountAdmin();
  const buyerPersonas = useEntity('idealCustomerProfiles')?.all();

  const statuses = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.STATUS,
  });
  const sources = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  });
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);

  return (
    <>
      <SubhomeFilters
        bobjectType="Lead"
        tabName="leadInactive"
        onQueryChange={setQuery}
        hasSortChanged={sort?.hasChanged}
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
            <Item value="highPriority">High priority</Item>
            <Item value="timeZone">Time zone</Item>
            <Item value="country">Country</Item>
            <Item value="name">Name</Item>
            <Item value="source">Source</Item>
            <Item value="mrRating">MR Rating</Item>
            <Item value="assignedDateRecent">Assigned date most recent</Item>
            <Item value="assignedDateOldest">Assigned date oldest</Item>
            <Item value="lastAttemptRecent">Last attempt most recent</Item>
            <Item value="lastAttemptOldest">Last attempt oldest</Item>
            <Item value="lastUpdateRecent">Last update most recent</Item>
            <Item value="lastUpdateOldest">Last update oldest</Item>
          </Select>
          {isAccountAdmin && (
            <Filter
              fieldLR={LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
              placeholder="Assigned to"
              values={users}
              isMultiselect
            />
          )}
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.STATUS}
            showByDefault
            placeholder="Status"
            values={sortBy(statuses, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.ICP}
            showByDefault
            placeholder="Buyer personas"
            values={sortBy(buyerPersonas, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.SOURCE}
            placeholder="Sources"
            values={sources}
            isMultiselect
          />
          <MoreFilter
            bobjectType={BobjectTypes.Lead}
            config={{
              filterFieldsMethod: field => !inactiveLeadConstant.includes(field?.logicRole),
            }}
          />
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName={PROSPECT_PAGES.LEAD_INACTIVE} />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};

export default inactiveLeadFilters;
