import React from 'react';

import clsx from 'clsx';

import SubhomeStats from '../../../../layouts/subhomeLayout/subhomeContent/subhomeStats/subhomeStats';
import { useSubhomeContext } from '../../subhomeContext';
import styles from './allMyOpps.module.css';
import AllMyOppsFilters from './allMyOppsFilters';
import { AllMyOppsKanban } from './components/allMyOppsKanban/allMyOppsKanban';
import { OppsList } from './components/allMyOppsList';
import { useSalesAllMyOppsViewMode } from './useSalesAllMyOpps';

const AllMyOppsList = () => {
  const [viewMode] = useSalesAllMyOppsViewMode();
  const isKanban = viewMode === 'KANBAN';

  return <>{isKanban ? <AllMyOppsKanban /> : <OppsList />}</>;
};

export function AllMyOppsListContent() {
  const { selectedItems } = useSubhomeContext();

  return (
    <>
      <SubhomeStats
        tab={'salesAllOpportunities'}
        thereAreItemsSelected={selectedItems.length > 0}
        showAssignedToFilter
      />
      <div
        className={clsx(styles._filter_container, {
          [styles._transition]: selectedItems.length > 0,
        })}
      >
        <AllMyOppsFilters />
      </div>
      <AllMyOppsList />
    </>
  );
}
