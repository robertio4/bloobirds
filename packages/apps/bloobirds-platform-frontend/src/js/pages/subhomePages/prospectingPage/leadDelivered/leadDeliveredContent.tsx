import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { LeadDeliveredFilters } from './leadDeliveredFilters';
import {
  useProspectingLeadDelivered,
  useProspectingLeadDeliveredAllItems,
  useProspectingLeadDeliveredPage,
} from './useProspectingLeadDelivered';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useCadenceControl } from '../../../../hooks';
import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import useAddCompany from '../../../../hooks/useAddCompany';
import styles from './leadDelivered.module.css';
import useDiscardLead from '../../../../hooks/useDiscardLead';
import DiscardLeadModal from '../discardLeadModal/discardLeadModal';
import { useQuickStart } from '../../../../hooks/useQuickStart';
import QuickStartModal from '../quickStartModal/quickStartModal';
import useAssignUser from '../../../../hooks/useAssignUser';
import AssignUserModal from '../../../../components/assignUserModal/assignUserModal';
import CadenceFeedbackModal from '../../../../components/cadenceFeedbackModal/cadenceFeedbackModal';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import ChangeStatusModal from '../../../../components/changeStatusModal/changeStatusModal';
import AddCompanyModal from '../../../../components/addCompanyModal/addCompanyModal';
import { ProspectingSubhomeCard } from '../components/prospectingSubhomeCard';
import { useSubhomeContext } from '../../subhomeContext';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import { Bobject } from '../../../../typings/bobjects';
import SubhomeStats from '../../../../layouts/subhomeLayout/subhomeContent/subhomeStats/subhomeStats';

const LeadDeliveredList = () => {
  const scrollRef = useRef();
  const { items: leads, isLoading, totalMatching } = useProspectingLeadDelivered();
  const { hasNextPage, loadNextPage, setHasNextPage } = useProspectingLeadDeliveredPage();
  const { getAllItems } = useProspectingLeadDeliveredAllItems();
  const {
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { openAddCompanyModal } = useAddCompany();
  const { openDiscardLeadModal } = useDiscardLead();
  const { openCadenceControl } = useCadenceControl();
  const { createToast } = useToasts();
  const { openQuickStart } = useQuickStart();
  const { openAssignUserModal } = useAssignUser();
  const { openChangeStatusModal } = useChangeStatus();

  const onSaveAction = () => {
    setSelectedItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} leads updated successfully.`
          : 'Lead updated successfully',
    });
  };

  useEffect(() => {
    if (leads?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [leads, totalMatching]);

  useEffect(() => {
    if (
      selectedItems.length !== 0 &&
      selectedItems.length === leads.length &&
      !isSelectAllChecked
    ) {
      toggleSelectAll(true);
    } else if (isSelectAllChecked && selectedItems.length < leads.length) {
      toggleSelectAll(false);
    }
  }, [selectedItems]);

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(leads);
      toggleSelectAll(!isSelectAllChecked);
    }
  };

  const handleSelectAllLeads = () => {
    getAllItems().then(allLeads => setSelectedItems(allLeads));
  };

  if (!isLoading && leads?.length === 0) {
    return <SubhomeEmptyContent />;
  }

  return (
    <>
      <div className={styles._select_all_wrapper}>
        <div>
          <Checkbox size="small" onClick={handleSelectAll} checked={isSelectAllChecked}>
            <Text size="s">Select all</Text>
          </Checkbox>

          {selectedItems.length !== 0 && (
            <>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="playOutline"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.QUICK_START_LEAD_BULK_ACTION_CLICKED_ON_DELIVERED_TAB,
                    );
                    openQuickStart(selectedItems);
                  }}
                >
                  Quick start
                </Button>
              </div>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="calendar"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.LEAD_SET_CADENCE_BULK_ACTION_CLICKED_ON_DELIVERED_TAB,
                    );
                    openCadenceControl({
                      bobjectToSet: selectedItems,
                      previousStep: false,
                      step: STEPS.CONFIGURE_CADENCE,
                      onSaveCallback: onSaveAction,
                    });
                  }}
                >
                  Set cadence
                </Button>
              </div>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="personAdd"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(MIXPANEL_EVENTS.REASSIGN_LEAD_ACTION_CLICKED_ON_DELIVERED_TAB);
                    openAssignUserModal({
                      bobject: selectedItems,
                    });
                  }}
                >
                  Reassign
                </Button>
              </div>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="edit"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.CHANGE_STATUS_BULK__ACTION_CLICKED_ON_MY_COMPANIES_TAB,
                    );
                    openChangeStatusModal(selectedItems);
                  }}
                >
                  Change status
                </Button>
              </div>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="company"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.ASSIGN_COMPANY_BULK_ACTION_CLICKED_ON_DELIVERED_TAB,
                    );
                    openAddCompanyModal({
                      bobject: selectedItems,
                      onSaveCallback: onSaveAction,
                    });
                  }}
                >
                  Assign company
                </Button>
              </div>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  color="tomato"
                  iconLeft="cross"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.DISCARD_LEAD_BULK_ACTION_CLICKED_ON_DELIVERED_TAB,
                    );
                    openDiscardLeadModal({
                      lead: selectedItems,
                      onSaveCallback: onSaveAction,
                    });
                  }}
                >
                  Discard
                </Button>
              </div>
            </>
          )}
        </div>
        {totalMatching !== undefined && !Number.isNaN(totalMatching) && (
          <Label size="small">{`${totalMatching} results`}</Label>
        )}
      </div>
      {isSelectAllChecked && (
        <div className={styles._message}>
          <Text size="s" inline>
            All <b>{selectedItems.length}</b> leads on this page are selected from a total of{' '}
            <b>{totalMatching}</b>.
          </Text>{' '}
          {selectedItems.length < totalMatching && (
            <span className={styles._link} onClick={handleSelectAllLeads}>
              <Text size="s" inline color="bloobirds" htmlTag="span">
                {totalMatching > 1000
                  ? 'Continue with a maximum of 1000'
                  : `Select all ${totalMatching} leads`}
              </Text>
            </span>
          )}
        </div>
      )}
      <VirtualInifiniteScroll
        ref={scrollRef}
        parentRef={parentRef}
        rows={leads}
        hasNextPage={hasNextPage}
        isFetchingData={isLoading}
        fetchNextPage={loadNextPage}
      >
        {(data: Bobject, hasNext: boolean) =>
          data?.id?.objectId && (
            <ProspectingSubhomeCard
              key={data?.id?.objectId}
              bobject={data}
              hasNextCard={hasNext}
              rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
            />
          )
        }
      </VirtualInifiniteScroll>
    </>
  );
};

export function LeadDeliveredListContent() {
  const {
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    toggleSelectAll,
  } = useSubhomeContext();
  const { isOpen: isOpenAddCompanyModal } = useAddCompany();
  const { isOpen: isOpenDiscardLeadModal } = useDiscardLead();
  const { isOpen: isOpenQuickStart } = useQuickStart();
  const { isOpen: isAssignUserOpen } = useAssignUser();
  const { isChangeStatusModalOpen } = useChangeStatus();
  const { createToast } = useToasts();
  const {
    isOpen: isOpenCadenceFeedbackModal,
    openModal: openCadenceFeedbackModal,
    closeModal: closeCadenceFeedbackModal,
  } = useModalVisibility('cadenceFeedbackModal');

  useEffect(() => {
    setSelectedItems([]);
    toggleSelectAll(false);
  }, []);

  return (
    <>
      <SubhomeStats
        tab={'prospectLeadDelivered'}
        thereAreItemsSelected={selectedItems.length > 0}
      />
      <div
        className={clsx({
          [styles._hidden]: selectedItems.length > 0,
        })}
      >
        <LeadDeliveredFilters />
      </div>
      <div className={clsx({ [styles._list_container]: selectedItems.length > 0 })}>
        <LeadDeliveredList />
      </div>
      {isOpenQuickStart && (
        <QuickStartModal
          onSaved={() => {
            setSelectedItems([]);
            createToast({ message: 'Cadences set successfully', type: 'success' });
            openCadenceFeedbackModal();
          }}
        />
      )}
      {isAssignUserOpen && (
        <AssignUserModal
          onSave={
            isSelectAllChecked
              ? () => {
                  setSelectedItems([]);
                  createToast({ type: 'success', message: 'User Assigned Succesfully' });
                }
              : () => setSelectedItems([])
          }
        />
      )}
      {isChangeStatusModalOpen && (
        <ChangeStatusModal
          onSave={() => {
            setSelectedItems([]);
            createToast({
              type: 'success',
              message:
                selectedItems?.length > 1
                  ? `${selectedItems?.length} leads updated successfully.`
                  : 'Lead updated successfully',
            });
          }}
        />
      )}
      {isOpenAddCompanyModal && <AddCompanyModal />}
      {isOpenDiscardLeadModal && <DiscardLeadModal />}
      {isOpenCadenceFeedbackModal && <CadenceFeedbackModal onClose={closeCadenceFeedbackModal} />}
    </>
  );
}
