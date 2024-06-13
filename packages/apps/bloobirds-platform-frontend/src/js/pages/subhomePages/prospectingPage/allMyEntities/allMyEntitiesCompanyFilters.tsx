import React from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';
import { sortBy } from 'lodash';
import useSWR from 'swr';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useGlobalPicklistValues, usePicklistValues } from '../../../../hooks/usePicklistValues';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { SubhomeFilterGroup } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { ServiceApi } from '../../../../misc/api/service';
import { UserObject } from '../../../../typings/user';
import { PROSPECT_PAGES } from '../constants/prospectPages';
import {
  allMyCompaniesAdminFilterFields,
  allMyCompaniesUserFilterFields,
} from './allMyCompanies.constant';
import {
  useProspectingCompanyAllEntitiesQuery,
  useProspectingCompanyAllEntitiesSort,
} from './useProspectingMyEntitiesCompany';

const fetcherReason = (url: string) =>
  ServiceApi.request({
    url,
    method: 'GET',
  });

const AllMyEntitiesCompanyFilters = () => {
  const { setQuery } = useProspectingCompanyAllEntitiesQuery();
  const { sort, setSort } = useProspectingCompanyAllEntitiesSort();

  const isAccountAdmin = useIsAccountAdmin();
  const targetMarkets = useGlobalPicklistValues({ logicRole: 'TARGET_MARKET' });

  const sources = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  });

  const statuses = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  }).sort((a, b) => a.ordering - b.ordering);

  const mrRatings = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
  });

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);

  const { data: companyReasons } = useSWR(
    '/service/view/field/statusReasons/Company',
    fetcherReason,
  );

  // @ts-ignore
  users.push({
    id: '__MATCH_EMPTY_ROWS__',
    value: 'Unassigned',
  });

  const nurturingReasons = companyReasons
    ?.find(
      (reasons: { logicRole: COMPANY_FIELDS_LOGIC_ROLE }) =>
        reasons.logicRole === COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
    )
    ?.fieldValues?.map((reason: { value: string; label: string }) => ({
      id: reason.value,
      value: reason.label,
    }));
  const discardedReasons = companyReasons
    ?.find(
      (reasons: { logicRole: COMPANY_FIELDS_LOGIC_ROLE }) =>
        reasons.logicRole === COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
    )
    ?.fieldValues?.map((reason: { value: string; label: string }) => ({
      id: reason.value,
      value: reason.label,
    }));

  return (
    <>
      <SubhomeFilters
        bobjectType={BobjectTypes.Company}
        tabName="companyAllEntities"
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
            placeholder="Target Markets"
            values={sortBy(targetMarkets, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.STATUS}
            placeholder="Statuses"
            values={statuses}
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
            placeholder="Mr Ratings"
            values={mrRatings}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS}
            placeholder="Nurturing Reasons"
            values={nurturingReasons}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS}
            placeholder="Discarded Reasons"
            values={discardedReasons}
            isMultiselect
          />
          <MoreFilter
            bobjectType={BobjectTypes.Company}
            config={{
              filterFieldsMethod: field => {
                const fieldsToFilter = isAccountAdmin
                  ? allMyCompaniesAdminFilterFields
                  : allMyCompaniesUserFilterFields;
                return !fieldsToFilter.includes(field?.logicRole as COMPANY_FIELDS_LOGIC_ROLE);
              },
            }}
          />
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName={PROSPECT_PAGES.COMPANY_ALL_MY_COMPANIES} />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};

export default AllMyEntitiesCompanyFilters;
