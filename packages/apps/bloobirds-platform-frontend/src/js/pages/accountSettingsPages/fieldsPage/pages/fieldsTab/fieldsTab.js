import React, { useLayoutEffect, useState } from 'react';

import { Button, Item, Pagination, SearchInput, Select } from '@bloobirds-it/flamingo-ui';

import { ChooseBobjectTooltip } from '../../../../../components/discoveryTooltips/fieldsTourTooltips/chooseBobjectTooltip';
import { CreateFieldTooltip } from '../../../../../components/discoveryTooltips/fieldsTourTooltips/createFieldTooltip';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import { useBobjectTypes } from '../../../../../hooks/useBobjectTypes';
import { useFullSalesEnabled } from '../../../../../hooks/useFeatureFlags';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabEmptyContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabTitle,
} from '../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { FieldCard } from '../../components/fieldCard/fieldCard';
import { FieldsFilters } from '../../components/fieldsFilters/fieldsFilters';
import { FieldsModal } from '../../components/fieldsModal/fieldsModal';
import { FIELDS_COLUMNS } from '../../constants/fields.constants';
import { usePaginatedEntity } from '../../hooks/usePaginatedEntity';
import { usePaginatedEntityFilters } from '../../hooks/usePaginatedEntityFilters';
import styles from '../../styles/fieldsPage.module.css';

const FieldsTab = () => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const bobjectTypes = useBobjectTypes();
  const defaultBobjectType = bobjectTypes?.findBy('name')('Company')?.id;
  const { isSmallDesktop } = useMediaQuery();
  const [open, setOpen] = useState(false);
  const [editField, setEditField] = useState();
  const [initialStep, setInitialStep] = useState();

  const openEditField = (field, isPicklist) => {
    setInitialStep(isPicklist ? 2 : 1);
    setEditField(field);
    setOpen(true);
  };

  const {
    updateEntityFilters,
    setFilters,
    filters,
    page,
    pageSize,
    setPageSize,
    setPage,
    handleReorder,
    sort,
  } = usePaginatedEntityFilters('bobjectFields');
  const { entities, totalElements, handleRefresh } = usePaginatedEntity({
    entityName: 'bobjectFields',
  });

  const resetFieldFilters = () => {
    setFilters({
      managedBySystem: false,
      qualifyingQuestion: false,
      bobjectType: filters.bobjectType,
    });
  };

  useLayoutEffect(() => {
    setFilters({
      managedBySystem: false,
      qualifyingQuestion: false,
      bobjectType: defaultBobjectType,
    });
  }, []);

  const handleSearch = newValue => {
    updateEntityFilters('name', newValue);
  };

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <div className={styles.tabTitle__container}>
            <AccountSettingsTabTitle icon="list">Select an Object</AccountSettingsTabTitle>
            <Select
              value={filters?.bobjectType}
              onChange={v => updateEntityFilters('bobjectType', v)}
            >
              {bobjectTypes?.all()?.map(type => {
                if (!isFullSalesEnabled && type.name === 'Opportunity') {
                  return null;
                }
                return (
                  <Item key={type?.id} value={type?.id}>
                    {type?.name}
                  </Item>
                );
              })}
              z
            </Select>
            <ChooseBobjectTooltip defaultTooltipVisible />
          </div>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <CreateFieldTooltip />
          <SearchInput
            width={200}
            placeholder="Search"
            onChange={handleSearch}
            value={filters.name ? filters?.name : ''}
            color="softBloobirds"
          />
          <Button iconLeft="plus" onClick={() => setOpen(true)} dataTest="bb-create-field-button">
            {!isSmallDesktop && 'Create new field'}
          </Button>
          {open && (
            <FieldsModal
              handleClose={() => {
                setOpen(false);
                setEditField(undefined);
                setInitialStep(1);
              }}
              isCreation={!editField}
              bobjectType={filters?.bobjectType}
              field={editField}
              initialStep={initialStep}
              refresh={handleRefresh}
            />
          )}
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <FieldsFilters resetFieldsFilters={resetFieldFilters} />
        {entities && entities.length > 0 ? (
          <>
            <AccountSettingsTableContainer>
              <EntityList>
                <EntityListHeader>
                  <EntityHeaderItem />
                  {FIELDS_COLUMNS.map(column => (
                    <EntityHeaderItem
                      key={column?.id}
                      canBeSorted={column?.sortable}
                      order={sort[column?.name] ? sort[column?.name] : null}
                      onClick={() => handleReorder(column?.name)}
                      label={column?.label}
                    />
                  ))}
                </EntityListHeader>
                {entities.map(field => (
                  <FieldCard
                    key={`field-${field?.id}`}
                    field={field}
                    refresh={handleRefresh}
                    openEditField={openEditField}
                  />
                ))}
              </EntityList>
            </AccountSettingsTableContainer>
            <div className={styles.pagination}>
              <Pagination
                rowsPerPageOptions={[20, 50, 100, 200]}
                page={page}
                count={totalElements}
                rowsPerPage={pageSize}
                onChangePage={setPage}
                onChangeRowsPerPage={setPageSize}
              />
            </div>
          </>
        ) : (
          <AccountSettingsTabEmptyContent>
            No fields for the following search
          </AccountSettingsTabEmptyContent>
        )}
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default FieldsTab;
