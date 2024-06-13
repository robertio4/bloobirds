import React, { useEffect } from 'react';
import { CompanyToAssign } from './CompanyToAssign';
import classNames from 'clsx';
import { FilterPanelSwitchButton } from '../../../../../../../../components/filter';
import { PaginationRowSelector } from '../../../../../../../../components/paginationCustom';
import PropTypes from 'prop-types';
import { Icon, Button, Spinner, Checkbox } from '@bloobirds-it/flamingo-ui';
import styles from './companiesToAssign.module.css';
import { useSearchSubscription } from '@bloobirds-it/plover';

const ListHeader = props => {
  const {
    query,
    selectAllToggle,
    isSelectedAll,
    isAnySelected,
    dispatchFiltersApply,
    deselectCompanies,
    isAnyDragged,
    companiesPage,
    companiesInPage,
    companiesPageSize,
    companiesTotal,
  } = props;

  const start = companiesPage * companiesPageSize + 1;
  const end = start - 1 + companiesInPage;

  return (
    <div className={styles.listHeader}>
      <div className={styles.listHeaderLeft}>
        <Checkbox size="small" checked={isSelectedAll} onClick={selectAllToggle(!isSelectedAll)}>
          Select All
        </Checkbox>
        {isAnySelected && !isSelectedAll && !isAnyDragged && (
          <div className={styles.deselect}>
            <Button onClick={deselectCompanies} variant="clear">
              <div className={styles.deselectIcon}>
                <Icon name="undoRevert" />
              </div>
              deselect
            </Button>
          </div>
        )}
      </div>
      <div className={styles.listHeaderRight}>
        <span className={styles.paginationIndicator}>
          {start}-{end} of {companiesTotal}
        </span>
        <FilterPanelSwitchButton
          query={query}
          delegateActionOnAccept={dispatchFiltersApply}
          bobjectType="Company"
        />
      </div>
    </div>
  );
};

ListHeader.propTypes = {
  companiesInPage: PropTypes.number,
  companiesPage: PropTypes.number,
  companiesPageSize: PropTypes.number,
  companiesTotal: PropTypes.number,
  deselectCompanies: PropTypes.func,
  dispatchFiltersApply: PropTypes.func,
  isAnyDragged: PropTypes.bool,
  isAnySelected: PropTypes.bool,
  isSelectedAll: PropTypes.bool,
  query: PropTypes.object,
  selectAllToggle: PropTypes.func,
};

const CompanyToAssignList = props => {
  const {
    areCompaniesLoaded,
    changePage,
    changePageRow,
    companies,
    companiesInPage,
    companiesPage,
    companiesPageSize,
    companiesTotal,
    deselectCompanies,
    dispatchFiltersApply,
    filtersDisplayed,
    isAnyDragged,
    isAnySelected,
    isSelectedAll,
    onLoaded,
    query,
    searchQuery,
    selectAllToggle,
  } = props;

  const { data } = useSearchSubscription(searchQuery, 'Company');

  useEffect(() => {
    if (data) {
      onLoaded(data.data);
    }
  }, [data]);

  return (
    <div className={styles.companyToAssignList}>
      <h2>COMPANY BACKLOG</h2>
      {!areCompaniesLoaded || !companies ? (
        <Spinner name="loadingCircle" />
      ) : (
        <React.Fragment>
          <ListHeader
            deselectCompanies={deselectCompanies}
            dispatchFiltersApply={dispatchFiltersApply}
            isAnyDragged={isAnyDragged}
            isAnySelected={isAnySelected}
            isSelectedAll={isSelectedAll}
            query={query}
            selectAllToggle={selectAllToggle}
            companiesPage={companiesPage}
            companiesInPage={companiesInPage}
            companiesPageSize={companiesPageSize}
            companiesTotal={companiesTotal}
          />
          {companies.length === 0 ? (
            <span> There are no companies to assign </span>
          ) : (
            <div
              className={classNames(styles.companyToAssignListTransition, {
                [styles.companyToAssignListOutOfFocus]: filtersDisplayed,
              })}
            >
              {companies.map((company, index) => (
                <CompanyToAssign key={company.id.value} company={company} index={index} />
              ))}
            </div>
          )}
          <PaginationRowSelector
            changePage={changePage}
            changePageRow={changePageRow}
            elementsTotal={companiesTotal}
            elementsPage={companiesPage}
            elementsPageSize={companiesPageSize}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export const CompanyToAssignListView = CompanyToAssignList;

CompanyToAssignListView.propTypes = {
  areCompaniesLoaded: PropTypes.bool.isRequired,
  changePage: PropTypes.func,
  changePageRow: PropTypes.func,
  companies: PropTypes.array,
  companiesInPage: PropTypes.number,
  companiesPage: PropTypes.number,
  companiesPageSize: PropTypes.number,
  companiesTotal: PropTypes.number,
  deselectCompanies: PropTypes.func,
  dispatchFiltersApply: PropTypes.func,
  filtersDisplayed: PropTypes.bool,
  isAnyDragged: PropTypes.bool,
  isAnySelected: PropTypes.bool,
  isSelectedAll: PropTypes.bool,
  onLoaded: PropTypes.func.isRequired,
  query: PropTypes.object,
  searchQuery: PropTypes.object.isRequired,
  selectAllToggle: PropTypes.func,
};
