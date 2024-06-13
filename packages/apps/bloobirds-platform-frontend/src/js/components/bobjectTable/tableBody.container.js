import React, { useCallback, useEffect, useMemo } from 'react';

import { useDataModel } from '@bloobirds-it/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { injectReferencesSearchProcess } from '@bloobirds-it/utils';
import hash from 'object-hash';
import useSWR from 'swr';

import { useEntity } from '../../hooks';
import { BobjectApi, preProcessSearchRequest } from '../../misc/api/bobject';
import { useUserPermissions, useUserSettings } from '../userPermissions/hooks';
import { SkeletonTableBody } from './bobjectTableSkeleton/skeletonTable.view';
import { SEARCH_MODES } from './context/bobjectTable.constants';
import { useTableContext } from './context/bobjectTable.context';
import { bobjectTableActions } from './context/bobjectTable.types';
import { addQueryParamsFromTypes } from './context/bobjectTable.utils';
import { TableBody } from './table/layout/tableBody.view';
import { useBobjectTable } from './useBobjectTable';

const TableBodyContainer = props => {
  const {
    bobjectFields,
    actionsRow,
    bobjectType,
    bobjects,
    onLoaded,
    onHasError,
    onHasRefresh,
    onHasLoading,
    searchQuery,
    isRefresh,
  } = props;

  const searchRequest = async () =>
    BobjectApi.request()
      .bobjectType(bobjectType.name)
      .search(searchQuery)
      .then(response => {
        const extendedResponse = injectReferencesSearchProcess(response);
        onLoaded(extendedResponse);
        onHasRefresh(false);
      })
      .catch(() => {
        onHasError(true);
        onHasRefresh(false);
      });

  const { mutate, isValidating } = useSWR(
    `bobjectField/list/${bobjectType.name}/${hash(searchQuery)}`,
    searchRequest,
  );

  useEffect(() => {
    mutate();
  }, [searchQuery]);

  useEffect(() => {
    if (isRefresh) {
      mutate();
    }
  }, [isRefresh]);

  useEffect(() => {
    onHasLoading(isValidating && isRefresh);
  }, [isValidating]);

  return (
    <TableBody
      bobjects={bobjects}
      bobjectFields={bobjectFields}
      actionsRow={actionsRow}
      bobjectType={bobjectType}
      rowClick={props.rowClick}
    />
  );
};

const Wrapper = props => {
  const {
    bobjectFields,
    actionsRow,
    bobjectType,
    onHasNoContent = () => {},
    onHasContent = () => {},
    onHasError,
    onHasRefresh,
    onHasLoading,
    isRefresh,
  } = props;
  const { dispatch, state, stageHandler } = useTableContext();
  const { bobjects } = state;
  const [stage] = stageHandler;
  const entityBobjectFields = useEntity('bobjectFields');
  const fieldTypes = useEntity('fieldTypes');

  const hasFields = fieldTypes !== undefined;
  const { query, sort, page, pageSize, direction, setPage } = useBobjectTable();

  const onLoaded = useCallback(
    payload => {
      dispatch({ type: bobjectTableActions.BOBJECT_TABLE_LOADED, payload });
      if (payload.totalMatching === 0) {
        onHasNoContent();
      }
      if (payload.totalMatching > 0) {
        onHasContent();
      }
      if (payload.totalMatching < page * pageSize) {
        setPage(Math.floor(payload.totalMatching / pageSize));
      }
    },
    [onHasNoContent, onHasContent, dispatch, page, pageSize],
  );

  const { othersActivities: canViewOthersActivities } = useUserPermissions();
  const dataModel = useDataModel();
  const { user } = useUserSettings();

  const searchQuery = useMemo(() => {
    const activityAssignedToId = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER)
      ?.id;
    const activityUserQuery =
      !canViewOthersActivities && bobjectType?.name === 'Activity'
        ? {
            [activityAssignedToId]: {
              searchMode: SEARCH_MODES.EXACT_SEARCH,
              query: [user?.id],
            },
          }
        : {};
    return preProcessSearchRequest({
      query: {
        ...addQueryParamsFromTypes(query, bobjectType, entityBobjectFields, stage),
        ...activityUserQuery,
      },
      sort: sort ? [{ field: sort, direction }] : [],
      formFields: true,
      page,
      pageSize,
      injectReferences: true,
    });
  }, [
    bobjectType,
    query,
    sort,
    page,
    pageSize,
    direction,
    hasFields,
    entityBobjectFields,
    stage,
    canViewOthersActivities,
  ]);

  return searchQuery ? (
    <TableBodyContainer
      bobjectFields={bobjectFields}
      actionsRow={actionsRow}
      bobjectType={bobjectType}
      bobjects={bobjects}
      onLoaded={onLoaded}
      onHasError={onHasError}
      onHasRefresh={onHasRefresh}
      onHasLoading={onHasLoading}
      isRefresh={isRefresh}
      searchQuery={searchQuery}
    />
  ) : (
    <SkeletonTableBody bobjectFields={[...new Array(10).keys()]} />
  );
};

export default Wrapper;
