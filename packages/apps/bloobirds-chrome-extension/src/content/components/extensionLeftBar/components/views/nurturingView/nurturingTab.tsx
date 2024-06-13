import React from 'react';

import { RescheduleModal } from '@bloobirds-it/bobjects';
import { MessagesEvents, BobjectTypes, SalesforceTabs } from '@bloobirds-it/types';

import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout, { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { NurturingTabFilters } from './filters/nurturingTabFilters';
import { NurturingTabList } from './list/nurturingTabList';

const NurturingTabContent = ({ parentRef }: ViewPropsType) => {
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
      <NurturingTabFilters />
      {Object.keys(query).length > 0 ? (
        <NurturingTabList parentRef={parentRef} isLoading={isLoading} />
      ) : null}
      {openedModal === 'reschedule' && (
        <RescheduleModal bobject={bobject} onSave={onSave} onClose={resetOpenedModalInfo} />
      )}
    </>
  );
};

export default function NurturingTab(props: ViewPropsType) {
  return (
    <SubhomeLayout defaultTab={SalesforceTabs.NURTURING}>
      <SubhomeHeader />
      <NurturingTabContent {...props} />
    </SubhomeLayout>
  );
}
