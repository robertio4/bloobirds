import React, { useEffect, useRef } from 'react';
import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import { useCadenceControl } from '../../../../hooks';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import {
  useProspectingCompanyDelivered,
  useProspectingCompanyDeliveredAllItems,
  useProspectingCompanyDeliveredPage,
} from './useProspectingCompanyDelivered';
import styles from './companyDelivered.module.css';
import { CompanyDeliveredFilters } from './companyDeliveredFilters';
import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import { useQuickStart } from '../../../../hooks/useQuickStart';
import QuickStartModal from '../quickStartModal/quickStartModal';
import AddLeadModal from '../addLeadModal/addLeadModal';
import useAddLead from '../../../../hooks/useAddLead';
import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import useAssignUser from '../../../../hooks/useAssignUser';
import AssignUserModal from '../../../../components/assignUserModal/assignUserModal';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import CadenceFeedbackModal from '../../../../components/cadenceFeedbackModal/cadenceFeedbackModal';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import ChangeStatusModal from '../../../../components/changeStatusModal/changeStatusModal';
import { ProspectingSubhomeCard } from '../components/prospectingSubhomeCard';
import { useSubhomeContext } from '../../subhomeContext';
import { Bobject } from '../../../../typings/bobjects';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import SubhomeStats from '../../../../layouts/subhomeLayout/subhomeContent/subhomeStats/subhomeStats';
import { ProspectCardInfoTooltip } from '../../../../components/discoveryTooltips/prospectCardInfoTooltip';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';

const CompanyDeliveredList = () => {
  const hasQSGEnabled = useQuickStartEnabled();
  const scrollRef = useRef();
  const { items: companies, isLoading, totalMatching } = useProspectingCompanyDelivered();
  const { hasNextPage, loadNextPage, setHasNextPage } = useProspectingCompanyDeliveredPage();
  const { getAllItems } = useProspectingCompanyDeliveredAllItems();
  const {
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { openCadenceControl } = useCadenceControl();
  const { openQuickStart } = useQuickStart();
  const { openChangeStatusModal } = useChangeStatus();
  const { openAssignUserModal } = useAssignUser();
  const { createToast } = useToasts();

  const onSaveAction = () => {
    setSelectedItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} companies updated successfully.`
          : 'Company updated successfully',
    });
  };

  useEffect(() => {
    if (companies?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [companies, totalMatching]);

  useEffect(() => {
    if (
      selectedItems.length !== 0 &&
      selectedItems.length === companies?.length &&
      !isSelectAllChecked
    ) {
      toggleSelectAll(true);
    } else if (isSelectAllChecked && selectedItems.length < companies?.length) {
      toggleSelectAll(false);
    }
  }, [selectedItems]);

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(companies);
      toggleSelectAll(!isSelectAllChecked);
    }
  };

  const handleSelectAllCompanies = () => {
    getAllItems().then(allCompanies => setSelectedItems(allCompanies));
  };

  if (!isLoading && companies?.length === 0) {
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
                  onClick={async () => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.QUICK_START_BULK_ACTION_CLICKED_ON_DELIVERED_TAB,
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
                      MIXPANEL_EVENTS.COMPANY_SET_CADENCE_BULK_ACTION_CLICKED_ON_DELIVERED_TAB,
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
                    mixpanel.track(MIXPANEL_EVENTS.REASSIGN_BULK_ACTION_CLICKED_ON_DELIVERED_TAB);
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
                      MIXPANEL_EVENTS.CHANGE_STATUS_BULK__ACTION_CLICKED_ON_DELIVERED_TAB,
                    );
                    openChangeStatusModal(selectedItems);
                  }}
                >
                  Change status
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
            All <b>{selectedItems.length}</b> companies on this page are selected from a total of{' '}
            <b>{totalMatching}</b>.
          </Text>{' '}
          {selectedItems.length < totalMatching && (
            <span className={styles._link} onClick={handleSelectAllCompanies}>
              <Text size="s" inline color="bloobirds" htmlTag="span">
                {totalMatching > 1000
                  ? 'Continue with a maximum of 1000'
                  : `Select all ${totalMatching} companies`}
              </Text>
            </span>
          )}
        </div>
      )}
      <VirtualInifiniteScroll
        ref={scrollRef}
        parentRef={parentRef}
        rows={companies}
        hasNextPage={hasNextPage}
        isFetchingData={isLoading}
        fetchNextPage={loadNextPage}
      >
        {(data: Bobject, hasNext: boolean, index) => {
          return index === 0 && hasQSGEnabled ? (
            <ProspectCardInfoTooltip defaultTooltipVisible>
              <ProspectingSubhomeCard
                key={data?.id?.objectId}
                bobject={data}
                hasNextCard={hasNext}
                rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
              />
            </ProspectCardInfoTooltip>
          ) : (
            data?.id?.objectId && (
              <ProspectingSubhomeCard
                key={data?.id?.objectId}
                bobject={data}
                hasNextCard={hasNext}
                rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
              />
            )
          );
        }}
      </VirtualInifiniteScroll>
    </>
  );
};

export function CompanyDeliveredListContent() {
  const { isOpen: isOpenQuickStart } = useQuickStart();
  const { isSelectAllChecked, setSelectedItems, selectedItems } = useSubhomeContext();
  const { isOpen: isOpenAddLeadModal } = useAddLead();
  const { isChangeStatusModalOpen } = useChangeStatus();
  const { isOpen: isOpenAssignUserModal } = useAssignUser();
  const { createToast } = useToasts();
  const {
    isOpen: isOpenCadenceFeedbackModal,
    openModal: openCadenceFeedbackModal,
    closeModal: closeCadenceFeedbackModal,
  } = useModalVisibility('cadenceFeedbackModal');

  return (
    <>
      <SubhomeStats
        tab={'prospectCompanyDelivered'}
        thereAreItemsSelected={selectedItems.length > 0}
      />
      <div
        className={clsx({
          [styles._hidden]: selectedItems.length > 0,
        })}
      >
        <CompanyDeliveredFilters />
      </div>
      <div className={clsx({ [styles._list_container]: selectedItems.length > 0 })}>
        <CompanyDeliveredList />
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
      {isOpenAddLeadModal && <AddLeadModal />}
      {isChangeStatusModalOpen && (
        <ChangeStatusModal
          onSave={
            isSelectAllChecked
              ? () => {
                  setSelectedItems([]);
                  createToast({
                    type: 'success',
                    message:
                      selectedItems.length > 1
                        ? `${selectedItems.length} companies updated successfully.`
                        : 'Company updated successfully',
                  });
                }
              : () => {}
          }
        />
      )}
      {isOpenAssignUserModal && (
        <AssignUserModal
          onSave={
            isSelectAllChecked
              ? () => {
                  setSelectedItems([]);
                  createToast({
                    type: 'success',
                    message:
                      selectedItems.length > 1
                        ? `${selectedItems.length} companies assigned successfully.`
                        : 'Company assigned successfully',
                  });
                }
              : () => {}
          }
        />
      )}
      {isOpenCadenceFeedbackModal && <CadenceFeedbackModal onClose={closeCadenceFeedbackModal} />}
    </>
  );
}
