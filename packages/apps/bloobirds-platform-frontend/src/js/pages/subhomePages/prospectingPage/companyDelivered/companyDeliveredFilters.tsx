import React from 'react';
import { sortBy } from 'lodash';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import {
  useProspectingCompanyDeliveredQuery,
  useProspectingCompanyDeliveredSort,
} from './useProspectingCompanyDelivered';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { BobjectTypes } from '@bloobirds-it/types';
import { UserObject } from '../../../../typings/user';
import SubhomeFilterGroup from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilterGroup/subhomeFilterGroup';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import { useGlobalPicklistValues, usePicklistValues } from '../../../../hooks/usePicklistValues';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { companyDeliveredFilterFields } from './companyDelivered.constants';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { InputPickerFilter } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/inputPickerFilter/InputPickerFilter';
import SessionManagerFactory from '../../../../misc/session';

const SessionManager = SessionManagerFactory();

export const CompanyDeliveredFilters = () => {
  const { setQuery } = useProspectingCompanyDeliveredQuery();
  const { sort, setSort } = useProspectingCompanyDeliveredSort();
  const targetMarkets = useGlobalPicklistValues({ logicRole: 'TARGET_MARKET' });
  const sources = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  });
  const mrRatings = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
  });

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  const userId = SessionManager.getUser()?.id;
  const isAccountAdmin = useIsAccountAdmin();

  return (
    <>
      <SubhomeFilters
        bobjectType="Company"
        tabName="companyDelivered"
        defaultFilters={[
          { fieldLR: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
        ]}
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
              fieldLR={COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
              placeholder="Assigned to"
              values={users}
              isMultiselect
            />
          )}
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
            showByDefault
            placeholder="Target markets"
            values={sortBy(targetMarkets, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.SOURCE}
            placeholder="Source"
            values={sources}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.MR_RATING}
            placeholder="MR ratings"
            values={sortBy(mrRatings, 'value')}
            isMultiselect
          />
          <InputPickerFilter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS}
            options={{ placeholder: 'Nº of leads' }}
          />
          <MoreFilter
            bobjectType={BobjectTypes.Company}
            config={{
              filterFieldsMethod: field => !companyDeliveredFilterFields.includes(field?.logicRole),
            }}
          />
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName="COMPANY_DELIVERED" />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};
