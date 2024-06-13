import React from 'react';
import { usePicklistValues } from '../../../hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import { useGlobalPicklistValues } from '../../../hooks/usePicklistValues';
import { SubhomeFilterGroup } from '../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useInboxCallsQuery } from './useInboxCalls';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import SubhomeFilters from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { BobjectTypes } from '@bloobirds-it/types';
import SessionManagerFactory from '../../../misc/session';
import Filter from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import QuickFilters from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import RelativeDateFilter from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relativeDateFilter/relativeDateFilter';
import { endOfDay, startOfDay, subDays } from '@bloobirds-it/utils';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { InboxFiltersTooltip } from '../../../components/discoveryTooltips/inboxTourTooltips/inboxFiltersTooltip';

const SessionManager = SessionManagerFactory();

export const NewCallsFilters = () => {
  const { setQuery } = useInboxCallsQuery();
  const userId = SessionManager.getUser()?.id;
  const directions = usePicklistValues({ picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION });
  const sources = useGlobalPicklistValues({ logicRole: 'DATA_SOURCE' });

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });

  const isAccountAdmin = useIsAccountAdmin();
  const hasQSGEnabled = useQuickStartEnabled();

  return (
    <div>
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
            values={directions}
            isMultiselect
          />
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.SOURCE}
            placeholder="Source"
            values={sources}
            isMultiselect
          />
          {hasQSGEnabled && <InboxFiltersTooltip defaultTooltipVisible />}
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName="inboxCalls" />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </div>
  );
};
