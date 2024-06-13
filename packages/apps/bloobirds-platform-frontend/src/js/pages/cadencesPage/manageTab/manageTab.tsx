import React, { useState } from 'react';

import { Pagination, SearchInput } from '@bloobirds-it/flamingo-ui';

import { ShowDisableCheckbox } from '../../../components/showDisableCheckbox/showDisableCheckbox';
import {
  CadencesTab,
  CadencesTabContent,
  CadencesTabFooter,
  CadencesTabHeader,
  CadencesTabHeaderLeft,
  CadencesTabHeaderRight,
  CadencesTableContainer,
} from '../../../layouts/cadencesLayout/cadencesTabLayout/cadencesTabLayout';
import { CadencesList } from '../components/cadenceList/cadenceList';
import { useManageCadenceList } from '../components/cadenceList/useManageCadenceList';
import { CreateEditCadenceSettings } from '../components/createEditCadenceSettings/createEditCadenceSettings';
import { AuthorFilter, BobjectTypeFilter, TagFilter } from "../components/filters/cadenceFilters";
import styles from './manageTab.module.css';

export const ManageTab = () => {
  const {
    totalCadences,
    page,
    pageSize,
    setPage,
    setPageSize,
    searchValue,
    setSearchValue,
    selectedBobjectType,
    setSelectedBobjecType,
    showDisabled,
    setShowDisabled,
  } = useManageCadenceList();

  return (
    <CadencesTab>
      <>
        <CadencesTabHeader>
          <CadencesTabHeaderLeft>
            <div className={styles.tabTitle__container}>
              <BobjectTypeFilter
                selectedBobjectType={selectedBobjectType}
                setSelectedBobjecType={setSelectedBobjecType}
                setSearchValue={setSearchValue}
              />
              <AuthorFilter />
              <TagFilter />
            </div>
          </CadencesTabHeaderLeft>
          <CadencesTabHeaderRight>
            <ShowDisableCheckbox showDisabled={showDisabled} setShowDisabled={setShowDisabled} />
            <SearchInput
              width="200"
              placeholder="Search"
              color="softBloobirds"
              onChange={(value: string) => setSearchValue(value)}
              value={searchValue}
            />
          </CadencesTabHeaderRight>
        </CadencesTabHeader>
        <CadencesTabContent>
          <CadencesTableContainer>
            <CadencesList />
          </CadencesTableContainer>
        </CadencesTabContent>
        <CadencesTabFooter>
          <Pagination
            rowsPerPageOptions={[10, 20, 50]}
            page={page}
            count={totalCadences}
            rowsPerPage={pageSize}
            onChangePage={setPage}
            onChangeRowsPerPage={setPageSize}
          />
        </CadencesTabFooter>
      </>
    </CadencesTab>
  );
};
