import React, { createContext, useContext, useEffect, useState } from 'react';

import { BobjectTypes } from '@bloobirds-it/types';
import isEqual from 'lodash/isEqual';

import { useQueryStringState } from '../../hooks';
import { ServiceApi } from '../../misc/api/service';
import { generateQueryFromFilters } from '../../utils/queries.utils';

export type ListTag = {
  id: string;
  value: string;
  account: string;
};

export type BobjectTableQuery = {
  [id: string]: { type: string; value: string[] };
};

export type BobjectTableColumn = {
  id: string;
  name: string;
};

export type BobjectTableFilter = {
  id: string;
  value: string;
};

export type BobjectTableView = {
  id?: string;
  name: string;
  visibility?: 'PUBLIC' | 'PRIVATE';
  sort?: string;
  sortDirection?: 'ASC' | 'DESC';
  viewType?: BobjectTypes | 'MEETINGS';
  createdBy?: string;
  creationDateTime?: string;
  updateDateTime?: string;
  tags?: ListTag[];
  views?: any[];
  isLoading?: boolean;
};

export type ListType = {
  bobjectView: BobjectTableView;
  bobjectViewFilters?: BobjectTableFilter[];
  bobjectViewColumns?: BobjectTableColumn[];
  views?: any; // Needs revision
};

type ViewTypeType = BobjectTypes | 'MEETINGS' | 'SAL' | 'MQL' | 'LEAD_WITHOUT_QC';

export interface BobjectTable {
  bobjectType: BobjectTypes;
  columns: BobjectTableColumn[];
  configureAsRawBobjectTable: () => void;
  direction: 'ASC' | 'DESC';
  editionMode: string;
  isEmptyFetch: boolean;
  isModified: boolean;
  isTableLoaded: boolean;
  isRawBobjectTable: boolean;
  initialStateQuery: BobjectTableQuery;
  initialStateColumns: string[];
  loadViewFromPayload: (payload: ListType) => void;
  page: number;
  pageSize: number;
  query: BobjectTableQuery;
  setBobjectType: (bobjectType: BobjectTypes) => void;
  setColumns: (columnId: string) => void;
  setDirection: (direction: string) => void;
  setInitialStateColumns: (initialStateColumns: string[]) => void;
  setInitialStateQuery: (initialStateQuery: BobjectTableQuery) => void;
  setIsLoadingView: (isLoadingView: boolean) => void;
  setIsModified: (isModified: boolean) => void;
  setIsTableLoaded: (isTableLoaded: boolean) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setQuery: (query: BobjectTableQuery) => void;
  setSort: (sort: string) => void;
  setViewId: (viewId: string) => void;
  setViewState: (viewState: BobjectTableView) => void;
  setViewType: (viewType: ViewTypeType) => void;
  sort: string;
  resetToInitialState: () => void;
  updateQueryIfNeeded: (query: BobjectTableQuery) => void;
  forceLoadTable: (payload: ListType) => void;
  view: BobjectTableView;
  viewType: ViewTypeType;
}

const initialViewState: BobjectTableView = {
  tags: [],
  visibility: undefined,
  name: '',
  views: [],
};

const requestViewById = (viewId: string) =>
  ServiceApi.request({
    url: `/service/view/bobjectview/${viewId}`,
    method: 'GET',
  });

const requestViewByType = (viewType: string) =>
  ServiceApi.request({
    url: `/service/view/bobjectview/type/${viewType}`,
    method: 'GET',
  });

const BobjectTableContext = createContext<BobjectTable | null>(null);

const BobjectTableProvider = ({ children }: { children: React.ReactNode }) => {
  const [stateViewType, setViewType] = useState<ViewTypeType>();
  const [initialStateQuery, setInitialStateQuery] = useState<BobjectTableQuery>(null);
  const [initialStateColumns, setInitialStateColumns] = useState<string[]>(null);
  const [isRawBobjectTable, setIsRawBobjectTable] = useState(false);

  const [stateQuery, setQuery] = useQueryStringState(
    'query',
    {},
    string => (string ? JSON.parse(decodeURI(string.replace(/&/g, '##AND##'))) : string),
    q => JSON.stringify(q),
  );
  const [stateColumns, setColumns] = useQueryStringState('columns', undefined, string =>
    string ? JSON.parse(string) : string,
  );
  const [stateSort, setSort] = useQueryStringState('sort', undefined);
  const [statePage, setPage] = useQueryStringState('paginationPage', '0');
  const [statePageSize, setPageSize] = useQueryStringState('pageSize', 50);
  const [stateDirection, setDirection] = useQueryStringState('direction', 'ASC');
  const [stateViewId, setViewId] = useQueryStringState('viewId', undefined);
  const [isEmptyFetch, setIsEmptyFetch] = useState(false);
  const [viewState, setViewState] = useState(initialViewState);
  const [bobjectType, setBobjectType] = useState<BobjectTypes>(null);
  const [isLoadingView, setIsLoadingView] = useState(false);
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    let hasChanges = false;
    if (stateColumns && initialStateColumns) {
      hasChanges = !isEqual(stateColumns, initialStateColumns);
    }
    if (initialStateQuery) {
      hasChanges = hasChanges || !isEqual(stateQuery, initialStateQuery);
    }
    setIsModified(hasChanges);
    if (!stateViewId || stateViewId !== viewState.id) setViewId(viewState.id);
  }, [initialStateColumns, initialStateQuery, stateColumns, stateQuery]);

  const updateQueryIfNeeded = (newQuery: BobjectTableQuery) => {
    if (isEqual(stateQuery, {})) {
      setQuery(newQuery);
      setIsTableLoaded(true);
    } else if (!isEqual(stateQuery, {}) && !isEqual(newQuery, stateQuery)) {
      setIsModified(true);
    }
  };

  const forceLoadTable = (payload: ListType) => {
    const queryFromFilters = generateQueryFromFilters(payload?.bobjectViewFilters);
    const columnsFromView = payload?.bobjectViewColumns?.map(c => c.id);
    setQuery(queryFromFilters);
    setInitialStateQuery(queryFromFilters);
    setInitialStateColumns(columnsFromView);
    setColumns(columnsFromView);
    setSort(payload?.bobjectView?.sort);
    setDirection(payload?.bobjectView?.sortDirection);
    setViewState({
      id: payload?.bobjectView?.id,
      tags: payload?.bobjectView?.tags || [],
      name: payload?.bobjectView?.name,
      visibility: payload?.bobjectView?.visibility,
    });
    setViewType(payload.bobjectView?.viewType);
  };

  const loadViewFromPayload = (payload: ListType) => {
    setIsLoadingView(false);
    setIsTableLoaded(true);
    const queryFromFilters = generateQueryFromFilters(payload?.bobjectViewFilters);
    const columnsFromView = payload?.bobjectViewColumns?.map(c => c.id);
    if (!payload) {
      setIsEmptyFetch(true);
    }
    if (isEqual(stateQuery, {})) {
      setQuery(queryFromFilters);
      setInitialStateQuery(queryFromFilters);
    } else if (!isEqual(queryFromFilters, stateQuery)) {
      setInitialStateQuery(stateQuery);
      setIsModified(true);
    }
    if (!stateColumns) {
      setColumns(columnsFromView);
      setInitialStateColumns(columnsFromView);
    } else if (!isEqual(columnsFromView, stateColumns)) {
      setInitialStateColumns(stateColumns);
      setIsModified(true);
    }
    setSort(payload?.bobjectView?.sort);
    setDirection(payload?.bobjectView?.sortDirection);
    setViewState({
      id: payload?.bobjectView?.id,
      tags: payload?.bobjectView?.tags || [],
      name: payload?.bobjectView?.name,
      views: payload?.views,
      visibility: payload?.bobjectView?.visibility,
    });
    if (payload) {
      setViewType(payload.bobjectView?.viewType);
    }
  };

  const configureAsRawBobjectTable = () => {
    setIsRawBobjectTable(true);
    setIsTableLoaded(true);
  };

  const resetToInitialState = () => {
    setQuery(initialStateQuery);
    setColumns(initialStateColumns);
  };

  return (
    <BobjectTableContext.Provider
      value={{
        bobjectType,
        columns: stateColumns,
        configureAsRawBobjectTable,
        direction: stateDirection,
        editionMode: isModified ? 'SAVE' : 'EDIT',
        isEmptyFetch,
        isModified,
        isTableLoaded,
        isRawBobjectTable,
        initialStateQuery,
        initialStateColumns,
        loadViewFromPayload,
        page: parseInt(statePage, 10),
        pageSize: parseInt(statePageSize, 10),
        query: stateQuery,
        setBobjectType,
        setColumns,
        setDirection,
        setInitialStateColumns,
        setInitialStateQuery,
        setIsLoadingView,
        setIsModified,
        setIsTableLoaded,
        setPage,
        setPageSize,
        setQuery,
        setSort,
        setViewId,
        setViewState,
        setViewType,
        sort: stateSort,
        resetToInitialState,
        updateQueryIfNeeded,
        forceLoadTable,
        view: {
          id: stateViewId,
          isLoading: isLoadingView,
          name: viewState.name,
          tags: viewState.tags,
          views: viewState.views,
          visibility: viewState.visibility,
        },
        viewType: stateViewType,
      }}
    >
      {children}
    </BobjectTableContext.Provider>
  );
};

export const bobjectTableContextWrapper = (Component: any) => (props: BobjectTable) => (
  <BobjectTableProvider>
    <Component {...props} />
  </BobjectTableProvider>
);

export const useBobjectTable = () => {
  const bobjectTableContext = useContext(BobjectTableContext);

  if (bobjectTableContext === undefined) {
    throw new Error('useBobjectTable should be called inside a BobjectTableProvider');
  }

  useEffect(() => {
    if (!bobjectTableContext.view.isLoading && !bobjectTableContext.isTableLoaded) {
      if (bobjectTableContext.view.id && !bobjectTableContext.view.isLoading) {
        requestViewById(bobjectTableContext.view.id).then(bobjectTableContext.loadViewFromPayload);
      } else if (bobjectTableContext.viewType && !bobjectTableContext.view.isLoading) {
        requestViewByType(bobjectTableContext.viewType).then(payload =>
          bobjectTableContext.loadViewFromPayload(payload[0]),
        );
      }
    }
  }, [bobjectTableContext.view.id, bobjectTableContext.viewType]);

  return bobjectTableContext;
};
