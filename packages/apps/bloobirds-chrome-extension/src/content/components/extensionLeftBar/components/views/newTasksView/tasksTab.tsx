import React, { Fragment, Suspense, useEffect } from "react";

import { RescheduleModal } from '@bloobirds-it/bobjects';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { BobjectTypes, MessagesEvents, SalesforceTabs } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { preload } from 'swr';

import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout, { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { TaskFeedProvider } from './hooks/useTasksTab';
import { TasksTabList } from './list/tasksTabsList';

const TasksTabContent = ({ parentRef }: ViewPropsType) => {
  const isB2CAccount = useIsB2CAccount();
  useEffect(() => {
    preload('/taskFeed/cadences', () =>
      api
        .get(
          `/messaging/cadences/?bobjectTypes=${!isB2CAccount ? BobjectTypes.Company : ''},${
            BobjectTypes.Lead
          },${BobjectTypes.Opportunity}`,
        )
        .then(response => response.data),
    );
  }, []);
  const {
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
      <TasksTabList parentRef={parentRef} isLoading={isLoading} />
      {openedModal === 'reschedule' && (
        <RescheduleModal bobject={bobject} onSave={onSave} onClose={resetOpenedModalInfo} />
      )}
    </>
  );
};

function TasksSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Fragment key={index + 'title'}>
          <Skeleton height="40px" width="100%" variant="rect" />
          <Skeleton height="154px" width="100%" variant="rect" />
        </Fragment>
      ))}
    </div>
  );
}

export default function TasksTab(props: ViewPropsType) {
  return (
    <Suspense fallback={<TasksSkeleton />}>
      <TaskFeedProvider>
        <SubhomeLayout defaultTab={SalesforceTabs.TASKS}>
          <SubhomeHeader />
          <TasksTabContent {...props} />
        </SubhomeLayout>
      </TaskFeedProvider>
    </Suspense>
  );
}
