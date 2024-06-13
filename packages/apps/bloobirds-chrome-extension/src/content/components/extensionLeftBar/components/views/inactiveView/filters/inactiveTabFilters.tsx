import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Filter, FilterGroup, Filters } from '@bloobirds-it/filters';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  UserPermission,
} from '@bloobirds-it/types';

import { useExtensionContext } from '../../../../../context';
import { SubhomeResetButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import {
  INACTIVE_FIELDS_LOGIC_ROLE,
  INACTIVE_YES_FIELDS_LOGIC_ROLE,
} from '../inactiveTab.constants';

const SortFilter = () => {
  const { t } = useTranslation();
  const { tabBobject, sort, setSort } = useSubhomeContext();

  useEffect(() => {
    setSort(tabBobject === BobjectTypes.Opportunity ? 'lastUpdateRecent' : 'recentAssigned');
  }, [tabBobject]);

  if (tabBobject === BobjectTypes.Opportunity) {
    return (
      <Select
        size="small"
        variant="filters"
        placeholder={t('leftBar.filters.orderBy')}
        value={sort}
        onChange={value => {
          setSort(value);
        }}
      >
        <Item value="lastUpdateRecent">{t('leftBar.filters.lastUpdateRecent')}</Item>
        <Item value="lastUpdateOldest">{t('leftBar.filters.lastUpdateOldest')}</Item>
      </Select>
    );
  } else {
    return (
      <Select
        size="small"
        variant="filters"
        placeholder={t('leftBar.filters.orderBy')}
        value={sort}
        onChange={value => {
          setSort(value);
        }}
      >
        <Item value="lastAssigned">{t('leftBar.filters.lastAssigned')}</Item>
        <Item value="recentAssigned">{t('leftBar.filters.recentAssigned')}</Item>
      </Select>
    );
  }
};

export const InactiveTabFilters = () => {
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const userFilterAvailable =
    settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();
  const { t } = useTranslation();

  const { selectedTab, tabBobject, setQuery, setHaveFiltersBeenChanged } = useSubhomeContext();

  if (!dataModel) return null;

  return (
    <Filters
      bobjectType={tabBobject}
      tabName={`filters-${selectedTab}-${tabBobject}`}
      bobjectFields={dataModel}
      defaultFilters={[
        //@ts-ignore
        { fieldLR: FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO, defaultValue: [userId] },
        {
          fieldLR: INACTIVE_FIELDS_LOGIC_ROLE[tabBobject],
          defaultValue: [INACTIVE_YES_FIELDS_LOGIC_ROLE[tabBobject]],
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
        <SortFilter />
        {userFilterAvailable && (
          <Filter
            fieldLR={FIELDS_LOGIC_ROLE[tabBobject as MainBobjectTypes].ASSIGNED_TO}
            placeholder={t('leftBar.filters.assignedTo')}
            values={users?.users}
            isMultiselect
            options={{ variant: 'filters' }}
          />
        )}
        <SubhomeResetButton />
      </FilterGroup>
    </Filters>
  );
};
