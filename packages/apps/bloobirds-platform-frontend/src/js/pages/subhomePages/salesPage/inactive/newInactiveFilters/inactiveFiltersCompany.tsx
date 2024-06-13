import React from 'react';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';
import SubhomeFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { SubhomeFilterGroup } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
} from '../../../../../constants/company';
import MoreFilter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import Filter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { useIsAccountAdmin } from '../../../../../hooks/usePermissions';
import { useEntity, usePicklistValues } from '../../../../../hooks';
import { useGlobalPicklistValues } from '../../../../../hooks/usePicklistValues';
import { UserObject } from '../../../../../typings/user';
import { useSalesInactiveQuery, useSalesInactiveSort } from '../useSalesInactive';
import { inactiveCompanyFilterFields } from '../inactive.constant';

const InactiveCompanyFilters = () => {
  const { setQuery } = useSalesInactiveQuery(BobjectTypes.Company);
  const { sort, setSort } = useSalesInactiveSort(BobjectTypes.Company);

  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({ logicRole: 'USER' })?.filter(
    (user: UserObject) => user.enabled,
  );
  const targetMarkets = useEntity('targetMarkets')?.all();
  const salesStatuses = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  })
    .sort(
      (a: { logicRole: string }, b: { logicRole: string }) =>
        Object.values(COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE).indexOf(a.logicRole) -
        Object.values(COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE).indexOf(b.logicRole),
    )
    .map((fieldStatus: { id: any; value: any }) => {
      return { id: fieldStatus.id, name: fieldStatus.value };
    });
  const sources = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SOURCE });
  const mrRatings = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING });

  return (
    <SubhomeFilters
      bobjectType={BobjectTypes.Company}
      tabName="salesInactiveCompany"
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
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
            placeholder="Assigned to"
            values={users}
            isMultiselect
          />
        )}
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
          placeholder="Target Markets"
          values={targetMarkets}
          isMultiselect
        />
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS}
          placeholder="Statuses"
          values={salesStatuses}
          isMultiselect
        />
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.SOURCE}
          placeholder="Sources"
          values={sources}
          isMultiselect
        />
        <Filter
          fieldLR={COMPANY_FIELDS_LOGIC_ROLE.MR_RATING}
          placeholder="MR Ratings"
          values={mrRatings}
          isMultiselect
        />
        <MoreFilter
          bobjectType={BobjectTypes.Company}
          config={{
            filterFieldsMethod: field => !inactiveCompanyFilterFields.includes(field?.logicRole),
          }}
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="Inactive_COMPANY" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};

export default InactiveCompanyFilters;
