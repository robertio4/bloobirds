import React from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { useIsAccountAdmin } from '../../../../../hooks/usePermissions';
import { useGlobalPicklistValues, usePicklistValues } from '../../../../../hooks/usePicklistValues';
import CadenceFilter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/cadenceFilter/cadenceFilter';
import Filter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { SCHEDULED_DATES_VALUES } from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filters.constants';
import MoreFilter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import { RelatedBobjectFilter } from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relatedBobjectFilter/relatedBobjectFilter';
import SubhomeFilters from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import TaskActionFilter from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/taskActionFilter/taskActionFilter';
import { SubhomeFilterGroup } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../../misc/session';
import { BobjectField } from '../../../../../typings/bobjects';
import { StatusObject } from '../../../../../typings/companies';
import { UserObject } from '../../../../../typings/user';
import { onCadenceFilterFields } from '../onCadence.constant';
import {
  useProspectingOnCadenceQuery,
  useProspectingOnCadenceSort,
} from '../useProspectingOnCadence';

const SessionManager = SessionManagerFactory();

const exemptStatuses = [
  COMPANY_STATUS_LOGIC_ROLE.NEW,
  COMPANY_STATUS_LOGIC_ROLE.BACKLOG,
  COMPANY_STATUS_LOGIC_ROLE.DELIVERED,
  COMPANY_STATUS_LOGIC_ROLE.FINDING_LEADS,
  COMPANY_STATUS_LOGIC_ROLE.READY_TO_PROSPECT,
  COMPANY_STATUS_LOGIC_ROLE.DISCARDED,
];

export const OnCadenceFilters = () => {
  const { setQuery, setSubqueryBobjectType } = useProspectingOnCadenceQuery();
  const { sort, setSort } = useProspectingOnCadenceSort();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  const userId = SessionManager.getUser()?.id;
  const mrRatings = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING });

  const companyStatuses = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  })
    .filter((status: BobjectField) => !exemptStatuses.includes(status.logicRole))
    ?.sort((statusA: StatusObject, statusB: StatusObject) => statusA.ordering - statusB.ordering);
  const leadStatuses = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.STATUS,
  })?.sort((statusA: StatusObject, statusB: StatusObject) => statusA.ordering - statusB.ordering);

  const buyerPersonas = useGlobalPicklistValues({ logicRole: 'IDEAL_CUSTOMER_PROFILE' });
  const sources = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SOURCE });
  const leadSources = usePicklistValues({ picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.SOURCE });
  const targetMarkets = useGlobalPicklistValues({
    logicRole: 'TARGET_MARKET',
  });
  const priorities = usePicklistValues({ picklistLogicRole: TASK_FIELDS_LOGIC_ROLE.PRIORITY });

  return (
    <>
      <SubhomeFilters
        tabName="onCadence"
        bobjectType={BobjectTypes.Task}
        defaultFilters={[
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, defaultValue: 'until_now' },
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
        ]}
        onQueryChange={setQuery}
        onSortChange={setSort}
        setOrsBobjectType={setSubqueryBobjectType}
        hasSortChanged={sort?.hasChanged}
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
              fieldLR={TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
              placeholder="Assigned to"
              values={users}
              isMultiselect
            />
          )}
          <RelatedBobjectFilter />
          <CadenceFilter />
          <TaskActionFilter />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
            conditions={{ relatedBobjectType: 'Company' }}
            showByDefault
            placeholder="Target markets"
            values={sortBy(targetMarkets, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.ICP}
            conditions={{ relatedBobjectType: 'Lead' }}
            showByDefault
            placeholder="Buyer persona"
            values={buyerPersonas}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.STATUS}
            placeholder="Company statuses"
            values={companyStatuses}
            isMultiselect
          />
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.STATUS}
            placeholder="Lead statuses"
            values={leadStatuses}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.SOURCE}
            conditions={{ relatedBobjectType: 'Company' }}
            placeholder="Company sources"
            values={sources}
            isMultiselect
          />
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.SOURCE}
            conditions={{ relatedBobjectType: 'Lead' }}
            placeholder="Lead sources"
            values={leadSources}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.MR_RATING}
            placeholder="MR ratings"
            values={sortBy(mrRatings, 'value')}
            isMultiselect
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
          <QuickFilters tabName="COMPANY_ON_CADENCE" />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};
