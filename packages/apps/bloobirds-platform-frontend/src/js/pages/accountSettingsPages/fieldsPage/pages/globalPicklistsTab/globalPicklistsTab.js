import React, { useLayoutEffect, useState } from 'react';

import { Button, Pagination, SearchInput } from '@bloobirds-it/flamingo-ui';

import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabEmptyContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { FieldsModal } from '../../components/fieldsModal/fieldsModal';
import { GlobalPicklistCard } from '../../components/globalPicklistCard/globalPicklistCard';
import { GLOBAL_PICKLISTS_COLUMNS } from '../../constants/globalPicklists.constants';
import { usePaginatedEntity } from '../../hooks/usePaginatedEntity';
import { usePaginatedEntityFilters } from '../../hooks/usePaginatedEntityFilters';
import styles from '../../styles/fieldsPage.module.css';

const GlobalPicklistTab = () => {
  const { isSmallDesktop } = useMediaQuery();
  const [open, setOpen] = useState(false);
  const [editGlobal, setEditGlobal] = useState();
  const {
    updateEntityFilters,
    setFilters,
    page,
    pageSize,
    setPageSize,
    setPage,
    handleReorder,
    sort,
  } = usePaginatedEntityFilters('bobjectGlobalPicklists');
  const { entities, totalElements, handleRefresh } = usePaginatedEntity({
    entityName: 'bobjectGlobalPicklists',
  });

  useLayoutEffect(() => {
    setFilters({
      qualifyingQuestion: false,
      managedBySystem: false,
    });
  }, []);

  const handleSearch = newValue => {
    updateEntityFilters('name', newValue);
  };

  const openEditField = global => {
    setEditGlobal(global);
    setOpen(true);
  };

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="list">Global Picklists</AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            A global picklist is a list of values that can be shared in different picklists across
            all objects.
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <SearchInput
            width={200}
            placeholder="Search"
            onChange={handleSearch}
            color="softBloobirds"
          />
          <Button iconLeft="plus" onClick={() => setOpen(true)}>
            {!isSmallDesktop && 'Create new Global Picklist'}
          </Button>
          {open && (
            <FieldsModal
              handleClose={() => {
                setOpen(false);
                setEditGlobal(undefined);
              }}
              isCreation={!editGlobal}
              initialStep={2}
              field={editGlobal}
              isGlobalPicklist
              refresh={handleRefresh}
            />
          )}
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        {entities && entities.length > 0 ? (
          <>
            <AccountSettingsTableContainer>
              <EntityList>
                <EntityListHeader>
                  <EntityHeaderItem />
                  {GLOBAL_PICKLISTS_COLUMNS.map(column => (
                    <EntityHeaderItem
                      key={column?.name}
                      canBeSorted={column?.sortable}
                      order={sort[column.name] ? sort[column?.name] : null}
                      onClick={() => handleReorder(column?.name)}
                      label={column?.label}
                    />
                  ))}
                </EntityListHeader>
                {entities.map((global, index) => (
                  <GlobalPicklistCard
                    key={`global-picklist-${index}`}
                    global={global}
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
            No Global Picklist for the following search
          </AccountSettingsTabEmptyContent>
        )}
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default GlobalPicklistTab;
