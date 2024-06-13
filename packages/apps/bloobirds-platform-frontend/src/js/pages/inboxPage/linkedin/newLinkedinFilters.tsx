import React from 'react';
import { SubhomeFilterGroup } from '../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useInboxLinkedinQuery } from './useInboxLinkedin';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../../hooks/usePicklistValues';
import SubhomeFilters from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { BobjectTypes } from '@bloobirds-it/types';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import { endOfDay, startOfDay, subDays } from '@bloobirds-it/utils';
import SessionManagerFactory from '../../../misc/session';
import Filter from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import QuickFilters from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import RelativeDateFilter from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relativeDateFilter/relativeDateFilter';

const SessionManager = SessionManagerFactory();

export const NewLinkedinFilters = () => {
  const { setNewQuery: setQuery, resetQuery } = useInboxLinkedinQuery();
  const userId = SessionManager.getUser()?.id;

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });

  const isAccountAdmin = useIsAccountAdmin();

  return (
    <SubhomeFilters
      tabName="inboxLinkedin"
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
      ]}
      onQueryChange={(query: any) => {
        if (Object.keys(query || {}).length === 0) {
          resetQuery();
        } else {
          setQuery(query);
        }
      }}
      defaultSort="select"
    >
      <SubhomeFilterGroup>
        <RelativeDateFilter />
        {isAccountAdmin && (
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.USER}
            placeholder="User"
            values={users}
            isMultiselect
          />
        )}
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <QuickFilters tabName="inboxLinkedin" />
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
