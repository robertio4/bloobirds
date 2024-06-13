import { useTranslation, Trans } from 'react-i18next';

import {
  Filter,
  FilterGroup,
  Filters,
  QuickFilters,
  RelativeDateFilter,
} from '@bloobirds-it/filters';
import { useCopilotEnabled, useUserSearch } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  REPORTED_VALUES_LOGIC_ROLE,
  UserPermission,
} from '@bloobirds-it/types';
import { endOfDay, startOfDay } from '@bloobirds-it/utils';
import { addYears } from 'date-fns';

import { useExtensionContext } from '../../../../../context';
import styles from '../../../../extensionLeftBar.module.css';
import { SubhomeResetButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { meetingsTabQuickFilters } from './meetingsTabQuickFilters';

const reportedFilterValues = [
  { id: '', value: <Trans i18nKey={'leftBar.filters.all'} /> },
  { id: REPORTED_VALUES_LOGIC_ROLE.YES, value: <Trans i18nKey={'leftBar.filters.yes'} /> },
  {
    id: [REPORTED_VALUES_LOGIC_ROLE.NO, '__MATCH_EMPTY_ROWS__'],
    value: <Trans i18nKey={'leftBar.filters.no'} />,
  },
];

const hasCopilotAnalysisFilterValues = [
  { id: '', value: <Trans i18nKey={'leftBar.filters.all'} /> },
  { id: '__MATCH_FULL_ROWS__', value: <Trans i18nKey={'leftBar.filters.yes'} /> },
  {
    id: '__MATCH_EMPTY_ROWS__',
    value: <Trans i18nKey={'leftBar.filters.no'} />,
  },
];
export const MeetingsTabFilters = () => {
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const userFilterAvailable =
    settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();
  const { t } = useTranslation();

  const { selectedTab, setQuery, setHaveFiltersBeenChanged } = useSubhomeContext();

  const quickFilters = meetingsTabQuickFilters(dataModel);

  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  return (
    <Filters
      bobjectType={BobjectTypes.Activity}
      tabName={`filters-${selectedTab}`}
      bobjectFields={dataModel}
      defaultQuickFilters={quickFilters}
      defaultFilters={[
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME,
          defaultValue: {
            start: startOfDay(new Date('1970-01-01')),
            end: endOfDay(addYears(new Date(), 5)),
          },
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER,
          defaultValue: [userId],
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
          defaultValue: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING],
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
          defaultValue: ['__MATCH_FULL_ROWS__'],
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
          defaultValue: [REPORTED_VALUES_LOGIC_ROLE.NO, '__MATCH_EMPTY_ROWS__'],
        },
      ]}
      onQueryChange={({ query }) => {
        setQuery(query);
      }}
      onHaveFiltersBeenChanged={haveFiltersBeenChanged =>
        setHaveFiltersBeenChanged(!!haveFiltersBeenChanged)
      }
    >
      <FilterGroup>
        <RelativeDateFilter fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME} />
        {userFilterAvailable && (
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.USER}
            placeholder={t('leftBar.filters.assignedTo')}
            values={users?.users}
            isMultiselect
            options={{ variant: 'filters' }}
          />
        )}
        <Filter
          fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED}
          placeholder={t('leftBar.filters.reported')}
          values={reportedFilterValues}
          sortDisabled
        />
        {isCopilotEnabled && (
          <Filter
            fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS}
            placeholder={t('leftBar.filters.copilotAnalysis')}
            values={hasCopilotAnalysisFilterValues}
            sortDisabled
          />
        )}
      </FilterGroup>
      {quickFilters?.length > 0 ? (
        <div className={styles.quickFilter}>
          <FilterGroup>
            <QuickFilters />
            <SubhomeResetButton />
          </FilterGroup>
        </div>
      ) : (
        <></>
      )}
    </Filters>
  );
};
