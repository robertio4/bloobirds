import React, { useEffect, useState } from 'react';

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
import { CloneCadenceModal } from '../cloneCadenceModal/cloneCadenceModal';
import { CadenceCard } from './cadenceCard/cadenceCard';
import { emailAutomationHeaderNames } from './cadenceList.constants';
import { useManageCadenceList } from './useManageCadenceList';

export const CadencesList = () => {
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [cadenceToClone, setCadenceToClone] = useState();
  const {
    orderedCadences,
    refreshPaginatedCadences,
    sort,
    handleReorder,
    selectedBobjectType,
    selectedAuthor,
    page,
    resetPage,
    totalCadences,
    pageSize,
    error,
    isLoading,
  } = useManageCadenceList();

  // @ts-ignore
  useEffect(async () => {
    if (refreshPaginatedCadences) await refreshPaginatedCadences();
  }, [selectedBobjectType, selectedAuthor, page, pageSize]);

  useEffect(() => {
    resetPage();
  }, []);

  //TODO: This is temporay pagination must be done in BE
  const orderingEnabled = totalCadences === orderedCadences?.length;

  return (
    <>
      {error ? (
        <CadenceErrorPage />
      ) : isLoading ? (
        <CadenceListSkeleton rows={10} />
      ) : orderedCadences?.length > 0 ? (
        <EntityList>
          <>
            <EntityListHeader lastItemSticky>
              {emailAutomationHeaderNames(orderingEnabled).map(column => (
                <EntityHeaderItem
                  label={column?.label}
                  key={column?.name}
                  canBeSorted={column.sortable}
                  // @ts-ignore
                  order={sort[column?.name] ? sort[column?.name] : null}
                  onClick={() => handleReorder(column.name)}
                />
              ))}
            </EntityListHeader>
            {orderedCadences.map((cadence: any) => {
              return (
                <EntityCard key={cadence?.id}>
                  <CadenceCard
                    key={cadence?.id}
                    cadence={cadence}
                    handleRefresh={refreshPaginatedCadences}
                    setCadenceToClone={setCadenceToClone}
                    openCloneModal={() => setIsCloneModalOpen(true)}
                  />
                </EntityCard>
              );
            })}
          </>
        </EntityList>
      ) : (
        <CadenceListNoResults />
      )}
      {isCloneModalOpen && (
        <CloneCadenceModal
          onClose={() => setIsCloneModalOpen(false)}
          cadence={cadenceToClone}
          refresh={refreshPaginatedCadences}
        />
      )}
    </>
  );
};
