import { Trans, useTranslation } from 'react-i18next';

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
  BobjectTypes,
  QuickFilter,
  REPORTED_VALUES_LOGIC_ROLE,
  UserPermission,
} from '@bloobirds-it/types';
import { endOfDay, startOfDay, subDays } from '@bloobirds-it/utils';

import { useExtensionContext } from '../../../../../context';
import styles from '../../../../extensionLeftBar.module.css';
import { SubhomeResetButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { activityTypes } from '../utils';
import { InboxTabQuickFilters } from './inboxTabQuickFilters';

const getReportedValues = dataModel => {
  const reportedLR = ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED;
  const reportedField = dataModel?.findFieldByLogicRole(reportedLR);
  const reportedValues = reportedField?.values;

  return reportedValues.map(direction => {
    if (direction.logicRole === REPORTED_VALUES_LOGIC_ROLE.YES) direction.name = 'Reported';
    if (direction.logicRole === REPORTED_VALUES_LOGIC_ROLE.NO) direction.name = 'Not reported';
    return direction;
  });
};
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

export const InboxTabFilters = ({
  onToggleSelected,
}: {
  onToggleSelected: (quickFilterSelected: QuickFilter) => void;
}) => {
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const userFilterAvailable =
    settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();
  const { t } = useTranslation();

  const { selectedTab, setQuery, setSubquery, setHaveFiltersBeenChanged } = useSubhomeContext();

  const quickFilters = InboxTabQuickFilters(dataModel);

  const reportedValues = getReportedValues(dataModel);
  const noReportedId = reportedValues.find(
    reported => reported.logicRole === REPORTED_VALUES_LOGIC_ROLE.NO,
  )?.id;
  const isWhatsappAdmin = settings?.user?.permissions?.includes(
    UserPermission.WHATSAPP_BUSINESS_ADMIN,
  );
  const assignedToField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER);

  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  return (
    <Filters
      bobjectType={BobjectTypes.Activity}
      tabName={`filters-${selectedTab}`}
      bobjectFields={dataModel}
      defaultQuickFilters={quickFilters}
      defaultFilters={[
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER,
          defaultValue: isWhatsappAdmin ? [userId, null] : [userId],
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
          defaultValue: [noReportedId],
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          defaultValue: {
            start: startOfDay(subDays(new Date(), 7)),
            end: endOfDay(new Date()),
          },
        },
        {
          fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
          defaultValue: activityTypes,
        },
      ]}
      onQueryChange={({ query, subquery }) => {
        if (
          isWhatsappAdmin &&
          assignedToField?.id &&
          assignedToField?.id in query &&
          Array.isArray(query[assignedToField?.id]) &&
          query[assignedToField?.id].includes(userId) &&
          !query[assignedToField?.id].includes(null)
        ) {
          query[assignedToField?.id].push(null);
        }
        setQuery(query);
        setSubquery(subquery);
      }}
      onHaveFiltersBeenChanged={haveFiltersBeenChanged =>
        setHaveFiltersBeenChanged(!!haveFiltersBeenChanged)
      }
    >
      <FilterGroup>
        <RelativeDateFilter fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.TIME} />
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
      {quickFilters?.length > 0 && (
        <div className={styles.quickFilter}>
          <FilterGroup>
            <QuickFilters onToggleSelected={onToggleSelected}/>
            <SubhomeResetButton />
          </FilterGroup>
        </div>
      )}
    </Filters>
  );
};
