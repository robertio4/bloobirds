import React, { useEffect } from 'react';
import { useOutboxScheduledFilters, useOutboxScheduledQuery } from '../useOutboxScheduled';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { TASK_FIELDS_LOGIC_ROLE, BobjectTypes } from '@bloobirds-it/types';
import SessionManagerFactory from '../../../../misc/session';
import SubhomeFilterGroup from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilterGroup/subhomeFilterGroup';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { UserObject } from '../../../../typings/user';
import { SCHEDULED_DATES_VALUES } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filters.constants';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';

const SessionManager = SessionManagerFactory();

export const NewScheduledFilters = () => {
  const userId = SessionManager.getUser()?.id;
  const { resetFilters } = useOutboxScheduledFilters();

  const { setQuery } = useOutboxScheduledQuery();

  useEffect(() => () => resetFilters(), []);

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user?.enabled);

  const isAccountAdmin = useIsAccountAdmin();

  return (
    <SubhomeFilters
      tabName="outboxScheduled"
      bobjectType={BobjectTypes.Task}
      defaultFilters={[
        { fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, defaultValue: 'until_now' },
        { fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, defaultValue: [userId] },
      ]}
      onQueryChange={setQuery}
    >
      <SubhomeFilterGroup>
        <Filter
          fieldLR={TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME}
          placeholder="Date"
          values={SCHEDULED_DATES_VALUES}
        />
        {isAccountAdmin && (
          <Filter
            fieldLR={TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
            placeholder="Assigned to"
            values={users}
            isMultiselect
          />
        )}
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="outboxScheduled" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
