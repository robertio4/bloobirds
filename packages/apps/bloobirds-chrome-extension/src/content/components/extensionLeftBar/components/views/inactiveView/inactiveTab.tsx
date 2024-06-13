import React from 'react';

import { AssignUserModal } from '@bloobirds-it/assign-user';
import { CadenceControlModal } from '@bloobirds-it/cadence';
import { useIsB2CAccount, useUserSearch } from '@bloobirds-it/hooks';
import { FIELDS_LOGIC_ROLE, PluralBobjectTypes, SalesforceTabs } from '@bloobirds-it/types';

import { getTextFromLogicRole } from '../../../../../../utils/bobjects.utils';
import { useExtensionContext } from '../../../../context';
import BulkActionsPanel from '../../../../salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel';
import { BulkActionButtonsTypes } from '../../../../salesforceLeftBar/components/bulkActionsPanel/typings/bulkActionsPanel.typings';
import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout, { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { InactiveTabFilters } from './filters/inactiveTabFilters';
import { useInactiveItems } from './hooks/useInactiveTab';
import { InactiveTabList } from './list/inactiveTabList';

const InactiveTabContent = ({ parentRef }: ViewPropsType) => {
  const {
    query,
    isLoading,
    tabBobject,
    openedModalInfo: { openedModal, bobject },
    resetOpenedModalInfo,
    selectedItems,
    useEveryBobject,
    handleModalClose,
    handleModalSave,
    selectedTab,
  } = useSubhomeContext();
  const { items, totalMatching } = useInactiveItems(tabBobject);
  const isBulk = Array.isArray(bobject);
  const sampleBobject = isBulk ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const hasActiveCadence =
    sampleBobject &&
    !!getTextFromLogicRole(sampleBobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE) &&
    getTextFromLogicRole(sampleBobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE_ENDED) !== 'Yes';
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const activeUser = settings?.user?.id;
  const accountId = settings?.account?.id;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === activeUser);

  return (
    <>
      <InactiveTabFilters />
      <BulkActionsPanel
        tab={SalesforceTabs.INACTIVE}
        items={items}
        totalMatching={totalMatching}
        availableActions={[
          {
            action: BulkActionButtonsTypes.StartCadence,
          },
          { action: BulkActionButtonsTypes.Reassign },
        ]}
      />
      {Object.keys(query).length > 0 ? (
        <InactiveTabList parentRef={parentRef} isLoading={isLoading} />
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

export default function InactiveTab(props: ViewPropsType) {
  const isB2CAccount = useIsB2CAccount();

  return (
    <SubhomeLayout
      defaultTab={SalesforceTabs.INACTIVE}
      defaultSubhomeTab={isB2CAccount ? PluralBobjectTypes.Lead : PluralBobjectTypes.Company}
    >
      <SubhomeHeader />
      <InactiveTabContent {...props} />
    </SubhomeLayout>
  );
}
