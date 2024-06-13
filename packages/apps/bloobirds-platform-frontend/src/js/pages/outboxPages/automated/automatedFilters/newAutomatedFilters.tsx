import React from 'react';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { sortBy } from 'lodash';
import { BobjectTypes } from '@bloobirds-it/types';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { SubhomeFilterGroup } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import {
  useOutboxAutomatedQuery,
  useOutboxAutomatedSort,
  useOutboxAutomatedTasks,
} from '../useOutboxAutomated';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import SessionManagerFactory from '../../../../misc/session';
import { SCHEDULED_DATES_VALUES } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filters.constants';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { RelatedBobjectFilter } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relatedBobjectFilter/relatedBobjectFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import CadenceFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/cadenceFilter/cadenceFilter';

const SessionManager = SessionManagerFactory();

export const NewAutomatedFilters = () => {
  const { setQuery } = useOutboxAutomatedQuery();
  const { setRelatedBobjectType } = useOutboxAutomatedTasks();
  const { sort, setSort } = useOutboxAutomatedSort();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter(user => user.enabled);
  const userId = SessionManager.getUser()?.id;
  const buyerPersonas = useGlobalPicklistValues({ logicRole: 'IDEAL_CUSTOMER_PROFILE' });
  const targetMarkets = useGlobalPicklistValues({
    logicRole: 'TARGET_MARKET',
  });

  return (
    <>
      <SubhomeFilters
        tabName="outboxAutomated"
        bobjectType={BobjectTypes.Task}
        defaultFilters={[
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, defaultValue: 'next_7_days' },
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
        ]}
        onQueryChange={setQuery}
        onSortChange={setSort}
        hasSortChanged={sort?.hasChanged}
        setOrsBobjectType={setRelatedBobjectType}
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
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName="outboxAutomated" />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};
