import React from 'react';

import { RescheduleModal } from '@bloobirds-it/bobjects';
import { Bobject, BobjectTypes, MessagesEvents, SalesforceTabs } from '@bloobirds-it/types';

import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout, { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { TasksTabFilters } from './filters/tasksTabFilters';
import { TasksTabList } from './list/tasksTabsList';

const TasksTabContent = ({ parentRef }: ViewPropsType) => {
  const {
    query,
    openedModalInfo: { openedModal, bobject },
    resetOpenedModalInfo,
    isLoading,
  } = useSubhomeContext();

  function onSave() {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: BobjectTypes.Task },
      }),
    );
  }

  return (
    <>
      <TasksTabFilters />
      {Object.keys(query).length > 0 ? (
        <TasksTabList parentRef={parentRef} isLoading={isLoading} />
      ) : null}
      {openedModal === 'reschedule' && (
        <RescheduleModal
          bobject={bobject as Bobject<BobjectTypes.Task>}
          onSave={onSave}
          onClose={resetOpenedModalInfo}
        />
      )}
    </>
  );
};

export default function TasksTab(props: ViewPropsType) {
  return (
    <SubhomeLayout defaultTab={SalesforceTabs.TASKS}>
      <SubhomeHeader />
      <TasksTabContent {...props} />
    </SubhomeLayout>
  );
}
