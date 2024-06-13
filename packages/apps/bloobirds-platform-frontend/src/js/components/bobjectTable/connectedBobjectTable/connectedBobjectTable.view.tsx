import React, { useEffect, useMemo } from 'react';

import {
  useIsNoStatusPlanAccount,
  useUserSettings,
  useAiAnalysisEnabled,
} from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';

import { useEntity } from '../../../hooks';
import { useBobjectTypes } from '../../../hooks/useBobjectTypes';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import { BobjectTableView as BobjectTable } from '../bobjectTable.view';
import { SkeletonTableView } from '../bobjectTableSkeleton/skeletonTable.view';
import { useTableContext } from '../context/bobjectTable.context';
import {
  addStageRelatedFieldsToColumns,
  getColumnsOrderedByListOrdering,
  getShownBobjectFields,
} from '../context/bobjectTable.utils';
import { useBobjectTable } from '../useBobjectTable';

interface ConnectedBobjectTableInterface {
  actionsRow: any;
  bobjectType: BobjectTypes;
  emptyContentElement: any;
  errorContentElement: any;
  rowClick: any;
  viewActions: any;
  showRightPanelActions: any;
  requestedQuery: any;
}

const ConnectedBobjectTable = ({
  actionsRow,
  bobjectType,
  emptyContentElement,
  errorContentElement,
  rowClick,
  viewActions,
  showRightPanelActions,
  requestedQuery,
}: ConnectedBobjectTableInterface) => {
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypeEntity = useBobjectTypes()?.findBy('name')(bobjectType);
  const hasSalesEnabled = useFullSalesEnabled();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const settings = useUserSettings();
  const aiAnalysisEnabled = useAiAnalysisEnabled(settings?.account?.id);

  const {
    columns,
    initialStateColumns,
    initialStateQuery,
    isEmptyFetch,
    query,
    setColumns,
    setInitialStateColumns,
    setInitialStateQuery,
    view: { id: viewId },
    viewType,
  } = useBobjectTable();
  const {
    stageHandler: [stage],
  } = useTableContext();

  const defaultSetOfColumns = useMemo(() => {
    const columnFields = bobjectFields
      ?.all()
      .filter(
        field =>
          field.bobjectType === bobjectTypeEntity?.id && field.enabled && field.tableLayoutDefault,
      )
      .map(field => field.id);

    const orderedColumns = getColumnsOrderedByListOrdering(columnFields, bobjectFields);
    return addStageRelatedFieldsToColumns({
      columns: orderedColumns,
      bobjectFields,
      hasSalesEnabled,
      stage,
      isNoStatusPlanAccount,
    });
  }, [bobjectTypeEntity, bobjectFields, stage, isNoStatusPlanAccount]);

  useEffect(() => {
    if (!viewType && !viewId) {
      if (!columns) {
        setColumns(defaultSetOfColumns);
        setInitialStateColumns(defaultSetOfColumns);
      } else if (!initialStateColumns) {
        setInitialStateColumns(defaultSetOfColumns);
      }
    }
  }, [columns, initialStateColumns]);

  useEffect(() => {
    if (!viewType && !viewId && !initialStateQuery) {
      setInitialStateQuery(requestedQuery || {});
    }
  }, [query, initialStateQuery]);

  const shownBobjectFields = getShownBobjectFields(
    columns,
    bobjectFields,
    stage,
    hasSalesEnabled,
    isNoStatusPlanAccount,
    aiAnalysisEnabled,
  );

  if ((shownBobjectFields || isEmptyFetch) && bobjectTypeEntity) {
    return (
      <BobjectTable
        actionsRow={actionsRow}
        bobjectFields={shownBobjectFields}
        bobjectType={bobjectTypeEntity}
        emptyContentElement={emptyContentElement}
        errorContentElement={errorContentElement}
        rowClick={rowClick}
        viewActions={viewActions}
        showRightPanelActions={showRightPanelActions}
      />
    );
  }
  return <SkeletonTableView />;
};

export default ConnectedBobjectTable;
