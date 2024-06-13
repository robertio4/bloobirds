import React from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useGlobalPicklistValues, usePicklistValues } from '../../../../hooks/usePicklistValues';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { SCHEDULED_DATES_VALUES } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filters.constants';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import { RelatedBobjectFilter } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relatedBobjectFilter/relatedBobjectFilter';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { SubhomeFilterGroup } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { UserObject } from '../../../../typings/user';
import { PROSPECT_PAGES } from '../constants/prospectPages';
import { scheduledFieldFilters } from '../scheduled/scheduled.constant';
import {
  useProspectingMeetingRemindersQuery,
  useProspectingMeetingRemindersSort,
} from './useProspectingMeetingReminders';

const SessionManager = SessionManagerFactory();

export const MeetingRemindersFilters = () => {
  const { setQuery, setSubqueryBobjectType } = useProspectingMeetingRemindersQuery();
  const { sort, setSort } = useProspectingMeetingRemindersSort();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  const userId = SessionManager.getUser()?.id;
  const targetMarkets = useGlobalPicklistValues({
    logicRole: 'TARGET_MARKET',
  });
  const buyerPersonas = useGlobalPicklistValues({ logicRole: 'IDEAL_CUSTOMER_PROFILE' });
  const companySources = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.SOURCE });
  const leadSources = usePicklistValues({ picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.SOURCE });
  const mrRatings = usePicklistValues({ picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING });
  const priorities = usePicklistValues({ picklistLogicRole: TASK_FIELDS_LOGIC_ROLE.PRIORITY });
  const meetingTypes = [
    { id: 'CONTACT_BEFORE_MEETING', value: 'Contact before Meeting' },
    { id: 'RESCHEDULE_MEETING', value: 'Reschedule Meeting' },
  ];
  return (
    <>
      <SubhomeFilters
        tabName="meetingReminders"
        bobjectType={BobjectTypes.Task}
        defaultFilters={[
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, defaultValue: 'until_now' },
          { fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
        ]}
        onQueryChange={setQuery}
        onSortChange={setSort}
        hasSortChanged={sort?.hasChanged}
        setOrsBobjectType={setSubqueryBobjectType}
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
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.SOURCE}
            conditions={{ relatedBobjectType: 'Company' }}
            placeholder="Company sources"
            values={companySources}
            isMultiselect
          />
          <Filter
            fieldLR={LEAD_FIELDS_LOGIC_ROLE.SOURCE}
            conditions={{ relatedBobjectType: 'Lead' }}
            placeholder="Sources"
            values={sortBy(leadSources, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.MR_RATING}
            conditions={{ relatedBobjectType: 'Company' }}
            showByDefault
            placeholder="MR ratings"
            values={sortBy(mrRatings, 'value')}
            isMultiselect
          />
          <Filter
            fieldLR={TASK_FIELDS_LOGIC_ROLE.TASK_TYPE}
            placeholder="Meeting Type"
            values={meetingTypes}
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
              filterFieldsMethod: field => !scheduledFieldFilters.includes(field?.logicRole),
            }}
          />
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName={PROSPECT_PAGES.COMPANY_SCHEDULED} />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </>
  );
};
