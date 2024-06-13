import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Filter,
  FilterGroup,
  Filters,
  QuickFilters,
  RelativeDateFilter,
} from '@bloobirds-it/filters';
import { CheckItem, Item, Section, Select } from '@bloobirds-it/flamingo-ui';
import { useFullSalesEnabled, useIsNoStatusPlanAccount, useUserSearch } from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  SingularFromPluralBobjectTypes,
  UserPermission,
  StatusBBCategories,
} from '@bloobirds-it/types';

import { useExtensionContext } from '../../../../../context';
import styles from '../../../../extensionLeftBar.module.css';
import { SubhomeResetButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import {
  SALES_STATUS_FIELDS_LOGIC_ROLE,
  STATUS_FIELDS_LOGIC_ROLE,
} from '../../inactiveView/inactiveTab.constants';
import { useSalesforceStatusFilter } from '../hooks/useSalesforceStatusFilter';
import { pipelineTabQuickFilters } from './pipelineTabQuickFilters';

const SortFilter = () => {
  const { tabBobject, sort, setSort } = useSubhomeContext();
  const { t } = useTranslation('translation', { keyPrefix: 'leftBar.filters' });

  useEffect(() => {
    setSort(tabBobject === BobjectTypes.Opportunity ? 'lastUpdateRecent' : 'recentAssigned');
  }, [tabBobject]);

  if (tabBobject === BobjectTypes.Opportunity) {
    return (
      <Select
        size="small"
        variant="filters"
        placeholder={t('orderBy')}
        value={sort}
        onChange={value => {
          setSort(value);
        }}
      >
        <Item value="lastUpdateRecent">{t('lastUpdateRecent')}</Item>
        <Item value="lastUpdateOldest">{t('lastUpdateOldest')}</Item>
      </Select>
    );
  } else {
    return (
      <Select
        size="small"
        variant="filters"
        placeholder={t('orderBy')}
        value={sort}
        onChange={value => {
          setSort(value);
        }}
        renderDisplayValue={value => t(value)}
      >
        <Item value="recentAssigned">{t('recentAssigned')}</Item>
        <Item value="lastAssigned">{t('lastAssigned')}</Item>
      </Select>
    );
  }
};

export const PipelineTabFilters = () => {
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const accountId = settings?.account?.id;
  const userFilterAvailable =
    settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const {
    selectedTab,
    selectedSubhomeTab,
    tabBobject,
    setQuery,
    setSubquery,
    setHaveFiltersBeenChanged,
  } = useSubhomeContext();
  const users = useUserSearch();
  const { t } = useTranslation();
  const prospectingStatuses = dataModel.findValuesByFieldLogicRole(
    STATUS_FIELDS_LOGIC_ROLE[tabBobject],
  );
  const salesStatuses = dataModel.findValuesByFieldLogicRole(
    SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject],
  );
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const bobjectType = SingularFromPluralBobjectTypes[selectedSubhomeTab];

  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  const generateStatusValues = () => {
    const items: Array<object> = [];
    if (prospectingStatuses?.length > 0 && bobjectType !== BobjectTypes.Opportunity) {
      if (isFullSalesEnabled) {
        items.push(
          <Section key="salesProspecting" id="salesProspecting">
            {t('common.prospecting')}
          </Section>,
        );
      }
      prospectingStatuses
        .sort((a, b) => a.ordering - b.ordering)
        .forEach(status => {
          items.push(
            <CheckItem label={status?.name} key={status?.id} value={status?.id}>
              {status?.name}
            </CheckItem>,
          );
        });
    }

    if (isFullSalesEnabled && salesStatuses?.length > 0) {
      if (bobjectType !== BobjectTypes.Opportunity) {
        items.push(
          salesStatuses?.length > 0 ? (
            <Section key="salesStatuses" id="salesStatuses">
              {t('common.sales')}
            </Section>
          ) : undefined,
        );
      }
      salesStatuses
        .sort((a, b) => a.ordering - b.ordering)
        .forEach(status => {
          items.push(
            <CheckItem label={status?.name} key={status?.id} value={status?.id}>
              {status?.name}
            </CheckItem>,
          );
        });
    }

    return items;
  };

  const generateSalesforceStatusValues = () => {
    const items: Array<object> = [];

    StatusBBCategories?.forEach(category => {
      items.push(
        <CheckItem label={category?.value} key={category?.id} value={category?.logicRole}>
          {category?.value}
        </CheckItem>,
      );
    });

    return items;
  };

  const statusValues = !isNoStatusPlanAccount
    ? generateStatusValues()
    : generateSalesforceStatusValues();
  const quickFilters = pipelineTabQuickFilters(tabBobject, dataModel);

  const { parseSalesforceStatus } = useSalesforceStatusFilter(tabBobject);

  return (
    <Filters
      bobjectType={tabBobject}
      tabName={`filters-${selectedTab}-${tabBobject}`}
      bobjectFields={dataModel}
      defaultQuickFilters={quickFilters}
      defaultFilters={[
        {
          fieldLR:
            FIELDS_LOGIC_ROLE[
              tabBobject as BobjectTypes.Company | BobjectTypes.Lead | BobjectTypes.Opportunity
            ].ASSIGNED_TO,
          defaultValue: [userId],
        },
      ]}
      onQueryChange={({ query, subquery }) => {
        const parsedQuery = parseSalesforceStatus(query);
        setQuery(parsedQuery);
        setSubquery(subquery);
      }}
      onHaveFiltersBeenChanged={haveFiltersBeenChanged =>
        setHaveFiltersBeenChanged(!!haveFiltersBeenChanged)
      }
    >
      <FilterGroup>
        <SortFilter />
        {tabBobject === BobjectTypes.Opportunity && (
          <RelativeDateFilter fieldLR={OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME} />
        )}
        {userFilterAvailable && (
          <Filter
            //@ts-ignore
            fieldLR={FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO}
            placeholder={t('leftBar.filters.assignedTo')}
            values={users?.users}
            isMultiselect
            options={{ variant: 'filters' }}
          />
        )}
        {isNoStatusPlanAccount ? (
          <Filter
            //@ts-ignore
            fieldLR={FIELDS_LOGIC_ROLE[tabBobject].SALESFORCE_STATUS}
            placeholder={t('leftBar.filters.status')}
            values={statusValues}
            isMultiselect
            options={{ variant: 'filters' }}
          />
        ) : (
          <Filter
            //@ts-ignore
            fieldLR={FIELDS_LOGIC_ROLE[tabBobject].STATUS}
            placeholder={t('leftBar.filters.status')}
            values={statusValues}
            isMultiselect
            options={{ variant: 'filters' }}
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
