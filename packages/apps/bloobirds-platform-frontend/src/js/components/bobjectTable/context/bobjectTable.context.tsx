import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router';

import { Bobject } from '@bloobirds-it/types';

import { useRouter } from '../../../hooks';
import { useSelectBobjects } from '../../../hooks/useSelectBobjects';
import { queryGenerator, queryToParams } from '../../../misc/urlQueryUtils';
import { useTableReducer } from './bobjectTable.reducer';
import { bobjectTableActions } from './bobjectTable.types';

type StagesType = 'All' | 'Prospect' | 'Sales';

interface TableContextInterface {
  state: React.ReducerState<any>;
  dispatch: React.ReducerAction<any>;
  selectFunctions: {
    selectOneItem: (item: Bobject) => void;
    selectedItems: Bobject[];
    setSelectedItems: React.Dispatch<React.SetStateAction<Bobject[]>>;
    isSelectAllChecked: boolean;
    setSelectAllCheckedState: (isChecked: boolean) => void;
  };
  stageHandler: [StagesType, React.Dispatch<React.SetStateAction<StagesType>>];
}

const TableContext = createContext<TableContextInterface>(null);

export const TableContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useTableReducer();
  const stageHandler = useState<StagesType>('All');
  const selectFunctions = useSelectBobjects(state?.bobjects?.length);

  return (
    <TableContext.Provider value={{ state, dispatch, selectFunctions, stageHandler }}>
      {children}
    </TableContext.Provider>
  );
};

/*
 Function to update the url search string. Usage:
 updateUrl({ ...state, columnsShown }, location, history);
 */
const updateUrl = ({ state, location, history, isViewModified, replace = false }) => {
  const urlParams = queryToParams(location.search);
  const newUrlParams = {
    ...urlParams,
    query: JSON.stringify(state.query),
    columns: state.columnsShown || urlParams.columns,
    sort: state.sort,
    direction: state.direction,
    isViewModified: isViewModified || urlParams.isViewModified,
  };
  const search = queryGenerator(newUrlParams, location.search);
  if (search !== location.search) {
    if (replace) {
      history.replace({ search });
    } else {
      history.push({ search });
    }
  }
};

const cleanupQuery = query =>
  Object.entries(query)
    .filter(
      entry => entry[1] !== undefined && entry[1] !== null && entry[1] !== '' && entry[1] !== [],
    )
    .map(([key, value]) => ({ [key]: value }))
    .reduce((a, b) => ({ ...a, ...b }), {});

export const useTableContext = () => {
  const { state, dispatch, stageHandler, selectFunctions } = useContext(TableContext);
  // Those two hooks should stay at first level, not within functions. Rules of hooks.
  const { history } = useRouter();
  const location = useLocation();

  return {
    state,
    dispatch,
    stageHandler,
    selectFunctions,
    setEditionMode: editionMode =>
      dispatch({ type: bobjectTableActions.BOBJECT_TABLE_SET_EDITION_MODE, editionMode }),
    /* Use those methods to avoid using directly the dispatch. Those methods are and can be decorated to
     * implement further behaviour, like mirror the state to the url search string. */
    setColumnsShown: (columnsShown, isViewModified) => {
      updateUrl({ state: { ...state, columnsShown }, location, history, isViewModified });
    },
    setQuery: (query, isViewModified, setDefaultQuery = false) => {
      query = cleanupQuery(query || {});
      dispatch({ type: bobjectTableActions.BOBJECT_TABLE_SET_QUERY, query, setDefaultQuery });
      updateUrl({ state: { ...state, query }, location, history, isViewModified });
    },
    setSort: (field, direction) => {
      updateUrl({ state: { ...state, sort: field, direction }, location, history });
    },
    setColumnsQuerySort: (
      columnsShown,
      query,
      sort,
      direction,
      setUrl = false,
      viewId = undefined,
    ) => {
      dispatch({
        type: bobjectTableActions.BOBJECT_TABLE_STATE_FROM_URL,
        query: query || {},
        columnsShown,
        sort,
        direction,
        viewId,
      });
      if (setUrl) {
        updateUrl({
          state: { ...state, columnsShown, query, sort, direction },
          location,
          history,
        });
      }
    },
    setViewId: viewId => dispatch({ type: bobjectTableActions.BOBJECT_TABLE_SET_VIEW_ID, viewId }),
    setView: (payload, columns, query) =>
      dispatch({ type: bobjectTableActions.BOBJECT_TABLE_SET_VIEW, payload, columns, query }),
    setConfigure: (bobjectType, requestedQuery) => {
      dispatch({
        type: bobjectTableActions.BOBJECT_TABLE_RESET_CONFIG,
        bobjectType,
        query: requestedQuery || {},
      });
    },
    setProvisionalRemoveRow: id => {
      dispatch({
        type: bobjectTableActions.BOBJECT_TABLE_REMOVE_PROVISIONAL_ROW,
        id,
      });
    },
  };
};
