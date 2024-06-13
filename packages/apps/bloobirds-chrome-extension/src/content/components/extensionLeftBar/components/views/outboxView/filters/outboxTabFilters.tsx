import { useTranslation } from 'react-i18next';

import { Filter, FilterGroup, Filters, QuickFilters } from '@bloobirds-it/filters';
import { useUserSearch } from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  QuickFilter,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  UserPermission,
} from '@bloobirds-it/types';

import { useExtensionContext } from '../../../../../context';
import styles from '../../../../extensionLeftBar.module.css';
import { SubhomeResetButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { scheduledFilterValues } from '../../view.utils';
import { EMAILING_TYPE } from '../outbox.constants';
import { OutboxTabQuickFilters } from './outboxTabQuickFilters';
import StatusFilter from './statusFilter';

export const OutboxTabFilters = ({
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

  const {
    selectedTab,
    setQuery,
    setSubquery,
    selectedQuickFilter,
    setHaveFiltersBeenChanged,
  } = useSubhomeContext();

  const quickFilters = OutboxTabQuickFilters(dataModel);

  return (
    <Filters
      bobjectType={BobjectTypes.Task}
      tabName={`filters-${selectedTab}`}
      bobjectFields={dataModel}
      defaultQuickFilters={quickFilters}
      defaultFilters={[
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
          defaultValue: [userId],
        },
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          defaultValue: 'until_now',
        },
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
          defaultValue: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE],
        },
      ]}
      onQueryChange={({ query, subquery }) => {
        setQuery(query);
        setSubquery(subquery);
      }}
      onHaveFiltersBeenChanged={haveFiltersBeenChanged =>
        setHaveFiltersBeenChanged(!!haveFiltersBeenChanged)
      }
    >
      <FilterGroup>
        <Filter
          fieldLR={TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME}
          placeholder={t('leftBar.filters.date')}
          values={scheduledFilterValues}
        />
        {userFilterAvailable && (
          <Filter
            fieldLR={TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO}
            placeholder={t('leftBar.filters.assignedTo')}
            values={users?.users}
            isMultiselect
            options={{ variant: 'filters' }}
          />
        )}
        <StatusFilter
          shouldBeDisplayed={!!selectedQuickFilter}
          isAutomatedStatus={selectedQuickFilter?.id === EMAILING_TYPE.AUTOMATED}
        />
      </FilterGroup>
      {quickFilters?.length > 0 && (
        <div className={styles.quickFilter}>
          <FilterGroup>
            <QuickFilters onToggleSelected={onToggleSelected} />
            <SubhomeResetButton />
          </FilterGroup>
        </div>
      )}
    </Filters>
  );
};
