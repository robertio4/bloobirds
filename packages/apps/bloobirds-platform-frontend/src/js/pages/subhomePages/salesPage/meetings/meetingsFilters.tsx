import React from 'react';
import clsx from 'clsx';
import { useEntity, usePicklistValues } from '../../../../hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../../constants/activity';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { BobjectTypes } from '@bloobirds-it/types';
import Filter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/filter/newFilter';
import RelativeDateFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/relativeDateFilter/relativeDateFilter';
import QuickFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/quickFilters/quickFilters';
import { SubhomeFilterGroup } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useSalesMeetingsQuery } from './useSalesMeetings';
import SubhomeFilters from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import MoreFilter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/moreFilter/moreFilter';
import { meetingsFiltersFields } from './salesMeetings.constant';
import styles from '../companiesAndLeads/companiesAndLeads.module.css';
import { useSubhomeContext } from '../../subhomeContext';

export const MeetingsFilters = () => {
  const { selectedItems } = useSubhomeContext();
  const { setQuery } = useSalesMeetingsQuery();
  const reported = usePicklistValues({ picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED });
  const mainTypes = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  });
  const targetMarkets = useEntity('targetMarkets')?.all();
  const mrRatings = usePicklistValues({
    picklistLogicRole: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
  });
  const meetingResults = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  });

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });

  const isAccountAdmin = useIsAccountAdmin();

  return (
    <div
      className={clsx(styles._filter_container, {
        [styles._transition]: selectedItems.length > 0,
      })}
    >
      <SubhomeFilters
        tabName="salesMeetings"
        bobjectType={BobjectTypes.Activity}
        onQueryChange={setQuery}
      >
        <SubhomeFilterGroup>
          <RelativeDateFilter fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.TIME} />
          {isAccountAdmin && (
            <Filter
              fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO}
              placeholder="User"
              values={users}
              isMultiselect
            />
          )}
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED}
            placeholder="Reported"
            values={reported}
            isMultiselect
          />
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE}
            placeholder="Meeting type"
            values={mainTypes}
            isMultiselect
          />
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT}
            placeholder="Meeting Results"
            values={meetingResults}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET}
            placeholder="Target Markets"
            values={targetMarkets}
            isMultiselect
          />
          <Filter
            fieldLR={COMPANY_FIELDS_LOGIC_ROLE.MR_RATING}
            placeholder="MR Ratings"
            values={mrRatings}
            isMultiselect
          />
          <MoreFilter
            bobjectType={BobjectTypes.Activity}
            config={{
              filterFieldsMethod: field => !meetingsFiltersFields.includes(field?.logicRole),
            }}
          />
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <QuickFilters tabName="salesMeetings" />
        </SubhomeFilterGroup>
      </SubhomeFilters>
    </div>
  );
};
