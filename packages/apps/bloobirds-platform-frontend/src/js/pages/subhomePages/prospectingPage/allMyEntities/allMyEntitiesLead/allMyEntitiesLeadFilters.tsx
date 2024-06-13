import React from "react";

import { Item, Select } from "@bloobirds-it/flamingo-ui";
import { BobjectTypes } from "@bloobirds-it/types";
import { sortBy } from "lodash";

import { LEAD_FIELDS_LOGIC_ROLE } from "../../../../../constants/lead";
import { useEntity } from "../../../../../hooks";
import { useIsAccountAdmin } from "../../../../../hooks/usePermissions";
import { useGlobalPicklistValues, usePicklistValues } from "../../../../../hooks/usePicklistValues";
import Filter from "../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter";
import MoreFilter from "../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter";
import QuickFilters
  from "../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters";
import SubhomeFilters from "../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters";
import { SubhomeFilterGroup } from "../../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters";
import { UserObject } from "../../../../../typings/user";
import { PROSPECT_PAGES } from "../../constants/prospectPages";
import { allMyEntitiesLead } from "./allMyEntitiesLead.constant";
import { useProspectingLeadAllEntitiesQuery, useProspectingLeadAllEntitiesSort } from "./useProspectingMyEntitiesLead";

const AllMyEntitiesLeadFilters = () => {
  const { setQuery } = useProspectingLeadAllEntitiesQuery();
  const { sort, setSort } = useProspectingLeadAllEntitiesSort();

  const isAccountAdmin = useIsAccountAdmin();
  const buyerPersonas = useEntity('idealCustomerProfiles')?.all();

  const sources = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  });
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);

  return (
    <>
      <SubhomeFilters
        bobjectType={BobjectTypes.Lead}
        tabName="leadAllEntities"
        onQueryChange={setQuery}
        onSortChange={setSort}
        hasSortChanged={sort?.hasChanged}
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
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.ICP}
            showByDefault
            placeholder="Buyer personas"
            values={sortBy(buyerPersonas, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.SOURCE}
            placeholder="Source"
            values={sources}
            isMultiselect
          />
          <MoreFilter
            bobjectType={BobjectTypes.Lead}
            config={{
              filterFieldsMethod: field => !allMyEntitiesLead.includes(field?.logicRole),
            }}
          />
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName={PROSPECT_PAGES.LEAD_ALL_MY_COMPANIES} />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};

export default AllMyEntitiesLeadFilters;
