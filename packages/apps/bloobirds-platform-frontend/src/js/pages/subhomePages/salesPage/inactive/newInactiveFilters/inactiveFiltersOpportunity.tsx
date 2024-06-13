import React from 'react';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { useRecoilValue } from 'recoil';
import { BobjectTypes } from '@bloobirds-it/types';
import SubhomeFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { SubhomeFilterGroup } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import MoreFilter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import Filter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { useIsAccountAdmin } from '../../../../../hooks/usePermissions';
import { usePicklistValues } from '../../../../../hooks';
import { useGlobalPicklistValues } from '../../../../../hooks/usePicklistValues';
import { UserObject } from '../../../../../typings/user';
import {
  activeStatusesIds,
  useSalesInactiveQuery,
  useSalesInactiveSort,
} from '../useSalesInactive';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/opportunity';
import { inactiveOpportunityFilterFields } from '../inactive.constant';
import { InputPickerFilter } from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/inputPickerFilter/InputPickerFilter';

const InactiveOpportunityFilters = () => {
  const { setQuery } = useSalesInactiveQuery(BobjectTypes.Opportunity);
  const { sort, setSort } = useSalesInactiveSort(BobjectTypes.Opportunity);

  const activeOppStatusesIds = useRecoilValue(activeStatusesIds);

  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({ logicRole: 'USER' })?.filter(
    (user: UserObject) => user.enabled,
  );
  const stages = usePicklistValues({
    picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  }).filter((status: { value: string; id: string }) => activeOppStatusesIds?.includes(status?.id));

  return (
    <SubhomeFilters
      bobjectType={BobjectTypes.Opportunity}
      tabName="salesInactiveOpportunity"
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
        {isAccountAdmin && (
          <Filter
            fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
            placeholder="Assigned to"
            values={users}
            isMultiselect
          />
        )}
        <Filter
          fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}
          placeholder="Stages"
          values={stages}
          isMultiselect
        />
        <InputPickerFilter
          fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT}
          options={{ placeholder: 'Amount' }}
        />
        <MoreFilter
          bobjectType={BobjectTypes.Opportunity}
          config={{
            filterFieldsMethod: field =>
              !inactiveOpportunityFilterFields.includes(field?.logicRole),
          }}
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="Inactive_OPPORTUNITY" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};

export default InactiveOpportunityFilters;
