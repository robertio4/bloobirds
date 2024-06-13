import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Banner } from '@bloobirds-it/banner';
import { Button, Item, SearchInput, Select, Skeleton } from '@bloobirds-it/flamingo-ui';
import { usePreventWindowUnload } from '@bloobirds-it/hooks';

import { EntityCard, EntityCardItem } from '../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../components/entityList/entityList';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabTitle,
} from '../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import ErrorRelated from './feedbackViews/errorRelated';
import LoadingRelated from './feedbackViews/loadingRelated';
import NoRelatedFound from './feedbackViews/noRelatedFound';
import SuccessRelated from './feedbackViews/successRelated';
import { useGetRelatedObjects } from './hooks/useGetRelatedObjects';
import { RelatedObjectCard } from './relatedObjectCard';
import { fieldColumns, crmObjects } from './relatedObjects.constants';
import styles from './relatedObjects.module.css';

export const RelatedBobjectSkeleton = ({ id }: { id: number }) => {
  return (
    <EntityCard key={`skeleton-${id}`} className={styles.cardRow}>
      <EntityCardItem size="small" align="center">
        <Skeleton variant="rect" height="30px" width="30px" />
      </EntityCardItem>
      <EntityCardItem align="center">
        <Skeleton variant="rect" height="30px" width="100px" />
      </EntityCardItem>
      <EntityCardItem>
        <Skeleton variant="rect" height="30px" width="300px" />
      </EntityCardItem>
      <EntityCardItem>
        <Skeleton variant="rect" height="30px" width="300px" />
      </EntityCardItem>
      <EntityCardItem>
        <Skeleton variant="rect" height="30px" width="150px" />
      </EntityCardItem>
      <EntityCardItem size="small" align="center">
        <Skeleton variant="rect" height="30px" width="100px" />
      </EntityCardItem>
    </EntityCard>
  );
};

export const RelatedObjectsTable = () => {
  const [selectedSobjectType, setSelectedSobjectType] = useState<string>(crmObjects[0]?.crmObject);
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects',
  });
  const {
    data,
    hasNewRelations,
    isLoading,
    isError,
    searchInput,
    order,
    handleReorder,
    handleSearch,
    handleSyncNewObjects,
  } = useGetRelatedObjects(selectedSobjectType);

  usePreventWindowUnload(isLoading);

  const onChange = (selected: string) => {
    setSelectedSobjectType(selected);
  };

  return (
    <>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <div className={styles.headerLeftcontainer}>
              <AccountSettingsTabTitle icon="list">{t('titleSelect')}</AccountSettingsTabTitle>
              <Select value={selectedSobjectType} onChange={onChange} disabled={isLoading}>
                {Object.values(crmObjects).map(type => (
                  <Item key={type?.crmObject} value={type?.crmObject}>
                    {type?.label}
                  </Item>
                ))}
              </Select>
              <Button
                size="medium"
                variant="secondary"
                iconLeft="refresh"
                uppercase={false}
                onClick={handleSyncNewObjects}
                disabled={isLoading}
              >
                {t('syncNewObjects')}
              </Button>
            </div>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <SearchInput
              width={'280px'}
              placeholder={t('searchPlaceholder')}
              onChange={handleSearch}
              value={searchInput}
              color="softBloobirds"
            />
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          {data && data.length > 0 ? (
            <AccountSettingsTableContainer>
              {isLoading && (
                <Banner type="info" icon={<div className={styles.loaderMini} />} enableClose>
                  {t('banner.loading')}
                </Banner>
              )}
              {isError && (
                <Banner type="error" icon={'cross'} enableClose>
                  {t('banner.error')}
                </Banner>
              )}
              {!isLoading && !isError && hasNewRelations === true && (
                <Banner type="success" icon={'thumbsUp'} enableClose>
                  {t('banner.success')}
                </Banner>
              )}
              {!isLoading && !isError && hasNewRelations === false && (
                <Banner type="info" icon={'checkDouble'} enableClose>
                  {t('banner.noChanges')}
                </Banner>
              )}
              <EntityList className={styles.rows}>
                <EntityListHeader>
                  {fieldColumns.map(column => (
                    <EntityHeaderItem
                      key={column?.id}
                      canBeSorted={column?.sortable}
                      align={column?.align}
                      order={order}
                      onClick={() => handleReorder()}
                      label={t(`${column.id}TableHeader`)}
                      icon={column.icon}
                      tooltip={
                        column.id === 'valuesToShow' ? t(`${column.id}TableHeaderTooltip`) : ''
                      }
                    />
                  ))}
                </EntityListHeader>
                <>
                  {data.map(item => (
                    <RelatedObjectCard
                      key={`field-${item?.id ?? item?.objectApiName?.apiName}`}
                      data={item}
                    />
                  ))}
                  {isLoading && (
                    <>
                      <RelatedBobjectSkeleton id={1} />
                      <RelatedBobjectSkeleton id={2} />
                    </>
                  )}
                </>
              </EntityList>
            </AccountSettingsTableContainer>
          ) : data && data.length === 0 && hasNewRelations === false ? (
            <SuccessRelated onReload={handleSyncNewObjects} />
          ) : isLoading ? (
            <LoadingRelated />
          ) : isError ? (
            <ErrorRelated onReload={handleSyncNewObjects} />
          ) : (
            <NoRelatedFound onReload={handleSyncNewObjects} />
          )}
        </AccountSettingsTabContent>
      </AccountSettingsTab>
    </>
  );
};
