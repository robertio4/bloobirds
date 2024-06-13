import React from 'react';

import { CadencePreview } from '@bloobirds-it/cadence';
import { Text } from '@bloobirds-it/flamingo-ui';

import { EntityCard } from '../../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../components/entityList/entityList';
import {
  CadenceErrorPage,
  CadenceListNoResults,
  CadenceListSkeleton,
} from '../cadenceListComponents/cadenceListComponents';
import { cadencesHeadersNames, objectsHeadersNames } from './analyzeCadenceList.constants';
import styles from './analyzeCadenceList.module.css';
import { AnalyzeCadenceTableRow, AnalyzeObjectsTableRow } from './analyzeCadenceList.typings';
import { AnalyzeCadenceCard } from './analyzeCards/analyzeCadenceCard';
import { AnalyzeObjectsCard } from './analyzeCards/analyzeObjectsCard';

export const AnalyzeCadencesList = ({
  cadenceId,
  rows,
  totalRows,
  headers,
  sortField,
  sortDirection,
  handleReorder,
  isLoading,
  analyticsListError,
}: {
  cadenceId: string;
  rows: AnalyzeObjectsTableRow[] | AnalyzeCadenceTableRow[];
  headers: any;
  sortDirection?: string;
  sortField?: string;
  totalRows: number;
  handleReorder: (category: string) => void;
  isLoading: boolean;
  analyticsListError: boolean;
}) => {
  const tableHeaders = [
    ...(cadenceId ? objectsHeadersNames(rows[0]?.bobjectType) : cadencesHeadersNames()),
    ...(headers?.map((item: any) => ({
      ...item,
      sortable: false,
    })) || []),
  ];

  return (
    <>
      {cadenceId && (
        <div className={styles._cadence_preview_wrapper}>
          <Text>Cadence overview</Text>
          <div className={styles._cadence_table_preview_wrapper}>
            <CadencePreview cadenceId={cadenceId} fullWidth />
          </div>
        </div>
      )}
      {analyticsListError && <CadenceErrorPage />}
      {!analyticsListError && (
        <div>
          {cadenceId && (
            <Text className={styles._objects_table_title_wrapper}>Objects in cadence</Text>
          )}
          {isLoading ? (
            <CadenceListSkeleton />
          ) : rows?.length > 0 ? (
            <EntityList>
              <>
                <EntityListHeader>
                  {tableHeaders.map(column => (
                    <EntityHeaderItem
                      label={column?.label}
                      key={column?.tooltip}
                      canBeSorted={column.sortable}
                      icon={column?.icon}
                      color={column?.color ? column.color : column.iconColor}
                      tooltip={column?.tooltip}
                      // @ts-ignore
                      order={sortField === column.name ? sortDirection : null}
                      onClick={() => handleReorder(column.name)}
                      align={column?.icon ? 'center' : 'left'}
                    />
                  ))}
                </EntityListHeader>
                {rows.map((row: any, index) => (
                  <EntityCard key={'card-' + index + '-' + (row?.bobjectId || row?.cadenceId)}>
                    {cadenceId ? (
                      <AnalyzeObjectsCard row={row as AnalyzeObjectsTableRow} />
                    ) : (
                      <AnalyzeCadenceCard row={row as AnalyzeCadenceTableRow} />
                    )}
                  </EntityCard>
                ))}
              </>
            </EntityList>
          ) : (
            <CadenceListNoResults table={'Analytics'} />
          )}
        </div>
      )}
    </>
  );
};
