import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { Table } from '@material-ui/core';

import { useEntity, useMediaQuery, usePicklistValues } from '../../hooks';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { ServiceApi } from '../../misc/api/service';
import { withWrappers } from '../../misc/utils';
import { MatchRows } from '../../typings/moreFilters';
import { getPluralBobjectName } from '../../utils/bobjects.utils';
import ConfirmResyncModal from '../confirmResyncModal/ConfirmResyncModal.view';
import { PaginationRowSelector } from '../paginationCustom';
import { ActionsPanel } from './actionsPanel/actionsPanel';
import styles from './bobjectTable.module.css';
import { BulkActionsPanel } from './bulkActionsPanel/bulkActionsPanel';
import { BulkActionsFeedbackModal } from './bulkActionsPanel/modals/feedbackModal/bulkActionsFeedbackModal';
import { useBulkActionsFeedbackModal } from './bulkActionsPanel/modals/feedbackModal/useBulkActionsFeedbackModal';
import { useTableContext } from './context/bobjectTable.context';
import { excludedViewTypes } from './context/bobjectTable.utils';
import ListSelector from './listSelector/listSelector';
import RightPanelView from './rightPanel/rightPanel.view';
import TableBodyContainer from './tableBody.container';
import TableHead from './tableHead/TableHead';
import { ListType, useBobjectTable } from './useBobjectTable';

const BobjectTable = ({
  actionsRow,
  bobjectFields,
  bobjectType,
  emptyContentElement,
  errorContentElement,
  rowClick,
  showRightPanelActions,
  viewActions,
}: {
  actionsRow: any;
  bobjectFields: any;
  bobjectType: { name: BobjectTypes.Company | BobjectTypes.Lead };
  emptyContentElement: any;
  errorContentElement: any;
  rowClick: any;
  showRightPanelActions: any;
  viewActions: any;
}) => {
  const {
    state: { total = 0 },
    selectFunctions,
    stageHandler,
  } = useTableContext() as {
    state: { total: number };
    selectFunctions: any;
    stageHandler: any;
  };
  const [contentEmpty, setContentEmpty] = useState(false);
  const [isContentError, setIsContentError] = useState(false);
  const [isRefreshList, setIsRefreshList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bobjectFieldsEntity = useEntity('bobjectFields');

  const {
    isEmptyFetch,
    query,
    sort,
    page,
    pageSize,
    direction,
    isModified,
    setPage,
    setPageSize,
    viewType,
    editionMode,
    setIsModified,
    setQuery,
  } = useBobjectTable();

  useEffect(() => {
    setContentEmpty(false);
  }, [query, page, pageSize]);

  const setContentIsEmpty = React.useCallback(() => setContentEmpty(true), [setContentEmpty]);
  const setContentIsNotEmpty = React.useCallback(() => setContentEmpty(false), [setContentEmpty]);
  const stageFieldId = bobjectFieldsEntity?.findBy('logicRole')(
    FIELDS_LOGIC_ROLE[bobjectType?.name as BobjectTypes.Company | BobjectTypes.Lead].STAGE,
  )?.id;
  const stageValuesEntities = usePicklistValues({
    picklistLogicRole: FIELDS_LOGIC_ROLE[bobjectType?.name].STAGE,
  });

  const { isDesktop } = useMediaQuery();
  const entityType = [
    excludedViewTypes.MQL,
    excludedViewTypes.SAL,
    excludedViewTypes.LEAD_WITHOUT_QC,
  ].includes(viewType)
    ? viewType
    : viewType === 'MEETINGS'
    ? 'Meeting'
    : bobjectType.name;
  const topScrollRef = useRef<HTMLElement>();
  const tableWrapper = useRef<HTMLElement>();
  const tableRef = useRef<HTMLElement>();

  // TEMPORAL
  const { selectedItems, setSelectedItems, setSelectAllCheckedState } = selectFunctions;

  const hasSalesEnabled = useFullSalesEnabled();
  const isCompanyOrLead = BobjectTypes.Company === entityType || BobjectTypes.Lead === entityType;
  const [bulkStage, setBulkStage] = stageHandler;
  const isLists = useLocation()?.pathname.includes('app/cl/');

  const shouldShowStageSelector = hasSalesEnabled && isLists && isCompanyOrLead;
  const { isOpen: isFeedbackModalOpen } = useBulkActionsFeedbackModal();

  const handleScroll = (event: any) => {
    topScrollRef.current.scroll({ left: event.currentTarget.scrollLeft });
  };
  const handleTopScroll = (event: any) => {
    tableWrapper.current.scroll({ left: event.currentTarget.scrollLeft });
  };

  function handleChangeStage(value: string) {
    if (value === 'All' && query) {
      delete query[stageFieldId];
      setQuery(query);
    } else {
      let parsedValue = value;
      const isProspect = parsedValue === 'Prospect';
      if (isProspect) parsedValue = 'Prospecting';
      const stageValueID = stageValuesEntities.find(stage => stage?.value === parsedValue)?.id;
      const filterValue = isProspect ? [stageValueID, MatchRows.EMPTY] : [stageValueID];
      setQuery({
        ...query,
        ...{
          [stageFieldId]: {
            type: 'EXACT__SEARCH',
            value: filterValue,
          },
        },
      });
    }
    setSelectedItems([]);
    setSelectAllCheckedState(false);
    setBulkStage(value);
    setIsModified(true);
  }

  const shouldShowTopScroll = tableRef.current?.offsetHeight > window.innerHeight;
  const [lists, setLists] = useState<ListType[]>([]);

  useEffect(() => {
    const requestType = entityType === 'Meetings' ? 'MEETINGS' : bobjectType?.name.toUpperCase();
    ServiceApi.request({
      url: `/service/view/bobjectview/type/${requestType}`,
      method: 'GET',
    })
      .then(res => {
        setLists(res);
      })
      .catch(err => console.error('No lists recieved because of:', err));
  }, [isModified]);

  //get the stage value from the query and apply it to the selector
  useEffect(() => {
    if (query && Object.keys(query).includes(stageFieldId)) {
      const queryStageValue = query[stageFieldId];
      const stageValue = Array.isArray(queryStageValue)
        ? queryStageValue[0]?.value
        : queryStageValue.value;

      const stageFromQuery = stageValuesEntities?.find(stage => stage.id === stageValue[0]);
      setBulkStage(stageFromQuery?.value === 'Prospecting' ? 'Prospect' : stageFromQuery?.value);
    }
  }, [query]);

  return (
    <React.Fragment>
      <div className={styles._container} data-intercom="bobject-table">
        <Fragment>
          <div className={styles._header_wrapper}>
            <div className={styles._header}>
              <div className={styles._header_left}>
                <ListSelector lists={lists} entityType={entityType} />
                {shouldShowStageSelector && (
                  <div className={styles._bobject_type_selector}>
                    <Select
                      borderless={true}
                      defaultValue={'All'}
                      value={bulkStage || 'All'}
                      size="small"
                      onChange={handleChangeStage}
                    >
                      <Item value={'Prospect'}>Prospecting</Item>
                      <Item value={'Sales'}>Sales</Item>
                      <Item value={'All'}>All</Item>
                    </Select>
                  </div>
                )}
                <div className={styles._counter__container}>
                  {total}{' '}
                  {isDesktop && isLists
                    ? getPluralBobjectName(entityType, total).toLowerCase()
                    : ''}
                </div>
                <ActionsPanel
                  viewType={entityType}
                  editionMode={editionMode}
                  bobjectType={bobjectType.name}
                  viewActions={viewActions}
                  refreshAction={() => setIsRefreshList(true)}
                  isLoading={isLoading}
                />
              </div>
              <div className={styles._header_right}>
                <RightPanelView
                  bobjectType={bobjectType}
                  showRightPanelActions={showRightPanelActions}
                />
              </div>
            </div>
            {isLists && selectedItems?.length > 0 && (
              <div>
                <BulkActionsPanel
                  bobjectType={entityType === 'Meeting' ? 'Activity' : entityType}
                  bulkStage={bulkStage}
                  setRefresh={setIsRefreshList}
                />
              </div>
            )}
          </div>
          <>
            <div
              style={{
                width: '100%',
                height: '8px',
                overflow: 'auto',
                position: 'relative',
                top: '59px',
              }}
              ref={topScrollRef}
              onScroll={handleTopScroll}
            >
              {shouldShowTopScroll ? (
                <div
                  style={{
                    width: `${tableRef?.current?.offsetWidth}px`,
                  }}
                />
              ) : (
                <div />
              )}
            </div>
            <div
              className={
                contentEmpty || isContentError || isEmptyFetch ? styles._noDisplay : styles._box
              }
              ref={tableWrapper}
              onScroll={handleScroll}
            >
              <Table className={styles._table} ref={tableRef}>
                <TableHead bobjectType={bobjectType} bobjectFields={bobjectFields} />
                <TableBodyContainer
                  bobjectFields={bobjectFields}
                  actionsRow={actionsRow}
                  bobjectType={bobjectType}
                  onHasNoContent={setContentIsEmpty}
                  onHasContent={setContentIsNotEmpty}
                  onHasError={setIsContentError}
                  onHasRefresh={setIsRefreshList}
                  onHasLoading={setIsLoading}
                  query={query}
                  sort={sort}
                  page={page}
                  direction={direction}
                  pageSize={pageSize}
                  rowClick={rowClick}
                  isRefresh={isRefreshList}
                />
              </Table>
            </div>
            {contentEmpty && emptyContentElement}
            {(isContentError || isEmptyFetch) && errorContentElement}
          </>
        </Fragment>
      </div>
      <PaginationRowSelector
        changePage={(e, paginationPage) => {
          setPage(paginationPage);
        }}
        changePageRow={({ target: { value: targetValue } }) => {
          setPage(0);
          setPageSize(targetValue);
        }}
        elementsTotal={total}
        elementsPage={page}
        elementsPageSize={pageSize}
      />
      {isFeedbackModalOpen && <BulkActionsFeedbackModal onClose={() => setIsRefreshList(true)} />}
      <ConfirmResyncModal />
    </React.Fragment>
  );
};

export const BobjectTableView = withWrappers({ router: true })(BobjectTable);
