import React, { useCallback } from 'react';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { sortBy } from 'lodash';
import { useParams } from 'react-router-dom';
import { useGlobalPicklistValues, usePicklistValues } from '../../../../hooks/usePicklistValues';
import { SubhomeFilterGroup } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
} from '../../../../constants/company';
import { BobjectTypes } from '@bloobirds-it/types';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
} from '../../../../constants/lead';
import { UserObject } from '../../../../typings/user';
import { useEntity } from '../../../../hooks';
import {
  useSalesCompaniesAndLeadsQuery,
  useSalesCompaniesAndLeadsSort,
} from './useSalesCompaniesAndLeads';
import { GLOBAL_PICKLISTS } from '../../../../constants/globalPicklists';
import { companiesAndLeadsFilterFields } from './companiesAndLeads.constants';

const CompaniesAndLeadsCompanyFilters = () => {
  const { setQuery } = useSalesCompaniesAndLeadsQuery(BobjectTypes.Company);
  const { sort, setSort } = useSalesCompaniesAndLeadsSort(BobjectTypes.Company);

  const isAccountAdmin = useIsAccountAdmin();

  const sources = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  });
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  const targetMarkets = useEntity('targetMarkets')?.all();
  const mrRatings = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
  });
  const nurturingReasons = useGlobalPicklistValues({
    logicRole: GLOBAL_PICKLISTS.NURTURING_REASON,
  });
  const discardedReasons = useGlobalPicklistValues({
    logicRole: GLOBAL_PICKLISTS.DISCARDED_REASON,
  });
  const salesStatuses = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  })
    .sort(
      (a: { logicRole: string }, b: { logicRole: string }) =>
        Object.values(COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE).indexOf(a.logicRole) -
        Object.values(COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE).indexOf(b.logicRole),
    )
    .map(fieldStatus => {
      const { id, value } = fieldStatus;
      return {
        id,
        name: value,
      };
    });

  return (
    <SubhomeFilters
      bobjectType={BobjectTypes.Company}
      tabName="companyCompaniesAndLeads"
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
            filterFieldsMethod: field =>
              !companiesAndLeadsFilterFields[BobjectTypes.Company].includes(field?.logicRole),
          }}
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="COMPANY_COMPANIES_AND_LEADS" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};

const CompaniesAndLeadsLeadFilters = () => {
  const { setQuery } = useSalesCompaniesAndLeadsQuery(BobjectTypes.Lead);
  const { sort, setSort } = useSalesCompaniesAndLeadsSort(BobjectTypes.Lead);

  const isAccountAdmin = useIsAccountAdmin();
  const buyerPersonas = useEntity('idealCustomerProfiles')?.all();

  const sources = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  });
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  const salesStatuses = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  })
    .sort(
      (a, b) =>
        Object.values(LEAD_SALES_STATUS_VALUES_LOGIC_ROLE).indexOf(a.logicRole) -
        Object.values(LEAD_SALES_STATUS_VALUES_LOGIC_ROLE).indexOf(b.logicRole),
    )
    .map(fieldStatus => {
      const { id, value } = fieldStatus;
      return {
        id,
        name: value,
      };
    });

  return (
    <SubhomeFilters
      bobjectType="Lead"
      tabName="leadCompaniesAndLeads"
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
          fieldLR={LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS}
          showByDefault
          placeholder="Status"
          values={sortBy(salesStatuses, 'value')}
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
            filterFieldsMethod: field =>
              !companiesAndLeadsFilterFields[BobjectTypes.Lead].includes(field?.logicRole),
          }}
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName={'LEAD_COMPANIES_AND_LEADS'} />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};

const CompaniesAndLeadsFilters = () => {
  const { section } = useParams();

  const Filters = useCallback(() => {
    switch (section) {
      case 'leads':
        return <CompaniesAndLeadsLeadFilters />;
      default:
        return <CompaniesAndLeadsCompanyFilters />;
    }
  }, [section]);
  return <Filters />;
};

export default CompaniesAndLeadsFilters;
