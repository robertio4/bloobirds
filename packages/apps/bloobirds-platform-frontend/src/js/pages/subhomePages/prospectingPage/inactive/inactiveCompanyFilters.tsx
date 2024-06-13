import React from 'react';
import { sortBy } from 'lodash';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { usePicklistValues } from '../../../../hooks';
import { SubhomeFilterGroup } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { BobjectTypes } from '@bloobirds-it/types';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { UserObject } from '../../../../typings/user';
import { StatusObject } from '../../../../typings/companies';
import SessionManagerFactory from '../../../../misc/session';
import {
  useProspectingCompanyInactiveQuery,
  useProspectingCompanyInactiveSort,
} from './useProspectingInactiveCompany';
import { inactiveFilterFields } from './inactive.constant';

const SessionManager = SessionManagerFactory();

export const InactiveCompanyFilters = () => {
  const { setQuery } = useProspectingCompanyInactiveQuery();
  const { sort, setSort } = useProspectingCompanyInactiveSort();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  const userId = SessionManager.getUser()?.id;
  const mrRatings = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING });

  const companyStatuses = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  })?.sort((statusA: StatusObject, statusB: StatusObject) => statusA.ordering - statusB.ordering);
  const sources = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SOURCE });
  const targetMarkets = useGlobalPicklistValues({
    logicRole: 'TARGET_MARKET',
  });

  return (
    <>
      <SubhomeFilters
        tabName="inactiveCompany"
        bobjectType={BobjectTypes.Company}
        defaultFilters={[
          { fieldLR: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
        ]}
        onQueryChange={setQuery}
        onSortChange={setSort}
        hasSortChanged={sort?.hasChanged}
      >
        <SubhomeFilterGroup>
          <Select
            placeholder="Order by"
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
              fieldLR={COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
              placeholder="Assigned to"
              values={users}
              isMultiselect
            />
          )}
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
            placeholder="Target Markets"
            values={sortBy(targetMarkets, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.STATUS}
            placeholder="Statuses"
            values={companyStatuses}
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
            values={sortBy(mrRatings, 'value')}
            isMultiselect
          />
          <MoreFilter
            bobjectType={BobjectTypes.Company}
            config={{
              filterFieldsMethod: field =>
                !inactiveFilterFields.includes(field?.logicRole as COMPANY_FIELDS_LOGIC_ROLE),
            }}
          />
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName="COMPANY_INACTIVE" />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};
