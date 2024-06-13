import React from 'react';

import { AssignUserModal } from '@bloobirds-it/assign-user';
import { CadenceControlModal, StopCadenceModal } from '@bloobirds-it/cadence';
import { useIsB2CAccount, useUserSearch } from '@bloobirds-it/hooks';
import { FIELDS_LOGIC_ROLE, PluralBobjectTypes, SalesforceTabs } from '@bloobirds-it/types';

import { getTextFromLogicRole } from '../../../../../../utils/bobjects.utils';
import { useExtensionContext } from '../../../../context';
import BulkActionsPanel from '../../../../salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel';
import { BulkActionButtonsTypes } from '../../../../salesforceLeftBar/components/bulkActionsPanel/typings/bulkActionsPanel.typings';
import { useExtensionLeftBarContext } from '../../../extensionLeftBarContext';
import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout, { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { PipelineTabFilters } from './filters/pipelineTabFilters';
import { usePipelinesItems } from './hooks/usePipelineTab';
import { PipelineTabList } from './list/pipelineTabList';

const PipelineTabContent = ({ parentRef }: ViewPropsType) => {
  const {
    tabBobject,
    query,
    openedModalInfo: { openedModal, bobject },
    resetOpenedModalInfo,
    isLoading,
    selectedItems,
    useEveryBobject,
    handleModalClose,
    handleModalSave,
    selectedTab,
  } = useSubhomeContext();
  const isBulk = Array.isArray(bobject);
  const sampleBobject = isBulk ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const hasActiveCadence =
    sampleBobject &&
    !!getTextFromLogicRole(sampleBobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE) &&
    getTextFromLogicRole(sampleBobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE_ENDED) !== 'Yes';
  const itemHandling = usePipelinesItems(tabBobject);
  const { items, totalMatching } = itemHandling;
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const activeUser = settings?.user?.id;
  const accountId = settings?.account?.id;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === activeUser);

  return (
    <>
      <PipelineTabFilters />
      <BulkActionsPanel
        tab={SalesforceTabs.PIPELINE}
        items={items}
        totalMatching={totalMatching}
        availableActions={[
          {
            action: BulkActionButtonsTypes.StartCadence,
          },
          { action: BulkActionButtonsTypes.StopCadence },
          { action: BulkActionButtonsTypes.Reassign },
        ]}
      />
      {Object.keys(query).length > 0 ? (
        <PipelineTabList
          parentRef={parentRef}
          itemHandling={itemHandling}
          isLoading={isLoading}
          bobjectType={tabBobject}
        />
      ) : null}
      {openedModal === 'cadence' && (
        <CadenceControlModal
          step="CONFIGURE_CADENCE"
          bobject={bobject}
          setIsOpen={resetOpenedModalInfo}
          initialStep={{
            step:
              hasActiveCadence && (!isBulk || bobject?.length <= 1)
                ? 'NEXT_STEP'
                : 'CONFIGURE_CADENCE',
            hadStartedCadence: false,
          }}
          callbackOnClose={handleModalClose}
          callbackOnSave={handleModalSave}
          useEveryBobject={useEveryBobject}
          subhomeTab={selectedTab}
        />
      )}
      {openedModal === 'stopCadence' && (
        <StopCadenceModal
          bobject={bobject}
          handleClose={handleModalClose}
          handleSave={handleModalSave}
          useEveryBobject={useEveryBobject}
          subhomeTab={selectedTab}
        />
      )}
      {openedModal === 'assignUser' && (
        <AssignUserModal
          assigneeUser={assigneeUser}
          bobject={selectedItems}
          accountId={accountId}
          onClose={handleModalClose}
          onSave={handleModalSave}
          useEveryBobject={useEveryBobject}
          subhomeTab={selectedTab}
        />
      )}
    </>
  );
};

export default function PipelineTab(props: ViewPropsType) {
  const { currentSubTab } = useExtensionLeftBarContext();
  const isB2CAccount = useIsB2CAccount();

  return (
    <SubhomeLayout
      defaultTab={SalesforceTabs.PIPELINE}
      defaultSubhomeTab={
        currentSubTab || (isB2CAccount ? PluralBobjectTypes.Lead : PluralBobjectTypes.Company)
      }
    >
      <SubhomeHeader />
      <PipelineTabContent {...props} />
    </SubhomeLayout>
  );
}
