import React from 'react';
import { usePicklistValues } from '../../../hooks';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { SubhomeFilterGroup } from '../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useInboxEmailsQuery } from './useInboxEmails';
import { useGlobalPicklistValues } from '../../../hooks/usePicklistValues';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import SubhomeFilters from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { BobjectTypes } from '@bloobirds-it/types';
import { endOfDay, startOfDay, subDays } from '@bloobirds-it/utils';
import SessionManagerFactory from '../../../misc/session';
import Filter from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import QuickFilters from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import RelativeDateFilter from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relativeDateFilter/relativeDateFilter';

const SessionManager = SessionManagerFactory();

export const NewEmailsFilters = () => {
  const { setQuery } = useInboxEmailsQuery();
  const directions = usePicklistValues({ picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION });
  const emailDirections = directions.filter(
    direction => direction.logicRole !== 'ACTIVITY__DIRECTION__MISSED',
  );
  const parsedEmailDirections = emailDirections.map(direction => {
    if (direction.logicRole === DIRECTION_VALUES_LOGIC_ROLE.INCOMING) direction.name = 'Recieved';
    if (direction.logicRole === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING) direction.name = 'Sent';
    return direction;
  });

  const userId = SessionManager.getUser()?.id;
  const incomingId = directions.filter(
    direction => direction.value === ACTIVITY_DIRECTION.INCOMING,
  )[0]?.id;

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });

  const isAccountAdmin = useIsAccountAdmin();

  return (
    <SubhomeFilters
      tabName="inboxCalls"
      bobjectType={BobjectTypes.Activity}
      defaultFilters={[
        { fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER, defaultValue: [userId] },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          defaultValue: {
            start: startOfDay(subDays(new Date(), 7)),
            end: endOfDay(new Date()),
          },
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
          defaultValue: [incomingId],
        },
      ]}
      onQueryChange={setQuery}
      defaultSort="select"
    >
      <SubhomeFilterGroup>
        <RelativeDateFilter fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.TIME} />
        {isAccountAdmin && (
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.USER}
            placeholder="User"
            values={users}
            isMultiselect
          />
        )}
        <Filter
          fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION}
          placeholder="Type"
          values={parsedEmailDirections}
          isMultiselect
        />
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="inboxEmails" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
