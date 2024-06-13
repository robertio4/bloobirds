import React, { useEffect, useState } from 'react';

import { useForceRerender, useRouter, useEntity } from '../../hooks';
import { useBobjectTypes } from '../../hooks/useBobjectTypes';
import { withWrappers } from '../../misc/utils';
import { SkeletonTableView } from './bobjectTableSkeleton/skeletonTable.view';
import { ConnectedBobjectTable } from './connectedBobjectTable';
import { contextWrapper } from './context/bobjectTable.context.provider';
import { bobjectTableContextWrapper, useBobjectTable } from './useBobjectTable';

const BobjectTableContainer = props => {
  const {
    retrieveInboundView,
    viewType,
    customView,
    location,
    resetStateQuery,
    setViewAsSelected,
    bobjectType,
    ...remainingProps
  } = props;
  const { requestedQuery } = remainingProps;
  const [entitiesReady, setEntitiesReady] = useState(false);
  const entityBobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const fieldTypes = useEntity('fieldTypes');

  const {
    configureAsRawBobjectTable,
    isTableLoaded,
    setBobjectType,
    setViewType,
    updateQueryIfNeeded,
    view: { id },
  } = useBobjectTable();

  useEffect(() => {
    if (entityBobjectFields && bobjectTypes && fieldTypes) {
      setEntitiesReady(true);
    }
  }, [entityBobjectFields, fieldTypes, bobjectTypes]);

  useEffect(() => {
    if (bobjectType) {
      setBobjectType(bobjectType);
    }
  }, [bobjectType]);

  useEffect(() => {
    if (viewType && !id) {
      setViewType(viewType);
    } else if (!id) {
      configureAsRawBobjectTable();
    }
  }, [viewType, id]);

  useEffect(() => {
    if (requestedQuery && !id) {
      updateQueryIfNeeded(requestedQuery);
    }
  }, [requestedQuery]);

  return isTableLoaded && entitiesReady ? (
    <ConnectedBobjectTable bobjectType={bobjectType} {...remainingProps} />
  ) : (
    <SkeletonTableView />
  );
};

const WrappedBobjectTable = withWrappers({ router: true })(
  contextWrapper(bobjectTableContextWrapper(BobjectTableContainer)),
);

const BobjectTable = props => {
  const { location } = useRouter();
  const { forceRerender, id } = useForceRerender();
  useEffect(() => {
    if (location.search === '') {
      forceRerender();
    }
  }, [location.search]);
  return <WrappedBobjectTable {...props} key={id} />;
};

export default BobjectTable;
