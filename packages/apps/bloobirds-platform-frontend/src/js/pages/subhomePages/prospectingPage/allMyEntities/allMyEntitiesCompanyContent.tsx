import React, { useEffect, useRef } from 'react';

import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import AssignUserModal from '../../../../components/assignUserModal/assignUserModal';
import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import ChangeStatusModal from '../../../../components/changeStatusModal/changeStatusModal';
import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import StopCadenceModal from '../../../../components/stopCadenceModal/stopCadenceModal';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useCadenceControl } from '../../../../hooks';
import useAddLead from '../../../../hooks/useAddLead';
import useAssignUser from '../../../../hooks/useAssignUser';
import { useSetCadenceEnabled } from '../../../../hooks/useFeatureFlags';
import useStopCadence from '../../../../hooks/useStopCadence';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { useSubhomeContext } from '../../subhomeContext';
import AddLeadModal from '../addLeadModal/addLeadModal';
import { ProspectingSubhomeCard } from '../components/prospectingSubhomeCard';
import styles from './allMyEntitiesCompany.module.css';
import AllMyEntitiesCompanyFilters from './allMyEntitiesCompanyFilters';
import {
  useProspectingAllMyCompanies,
  useProspectingAllMyCompaniesAllItems,
  useProspectingAllMyCompaniesPage,
} from './useProspectingMyEntitiesCompany';

const AllMyEntitiesList = () => {
  const scrollRef = useRef<HTMLDivElement>();
  const { items: entities, isLoading, totalMatching } = useProspectingAllMyCompanies();
  const { hasNextPage, loadNextPage, setHasNextPage } = useProspectingAllMyCompaniesPage();
  const { getAllItems } = useProspectingAllMyCompaniesAllItems();
  const { openChangeStatusModal } = useChangeStatus();
  const {
    setSelectedItems,
    selectedItems,
    toggleSelectAll,
    isSelectAllChecked,
    parentRef,
  } = useSubhomeContext();
  const { openCadenceControl } = useCadenceControl();
  const { openStopCadenceModal } = useStopCadence();
  const { openAssignUserModal } = useAssignUser();
  const { createToast } = useToasts();
  const isSetCadenceEnabled = useSetCadenceEnabled();

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
    if (entities?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [entities, totalMatching]);

  useEffect(() => {
    if (
      selectedItems.length !== 0 &&
      selectedItems.length === entities.length &&
      !isSelectAllChecked
    ) {
      toggleSelectAll(true);
    } else if (isSelectAllChecked && selectedItems.length < entities.length) {
      toggleSelectAll(false);
    }
  }, [selectedItems]);

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(entities);
      toggleSelectAll(!isSelectAllChecked);
    }
  };

  const handleSelectAllCompanies = () => {
    getAllItems().then(allCompanies => setSelectedItems(allCompanies));
  };

  if (!isLoading && entities?.length === 0) {
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
                  iconLeft="calendar"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.SET_CADENCE_BULK_ACTION_CLICKED_ON_MY_COMPANIES_TAB,
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
              {isSetCadenceEnabled && (
                <div className={styles._button_wrapper}>
                  <Button
                    variant="clear"
                    iconLeft="slash"
                    uppercase={false}
                    onClick={async () => {
                      mixpanel.track(
                        MIXPANEL_EVENTS.STOP_CADENCE_BULK_ACTION_CLICKED_ON_MY_COMPANIES_TAB,
                      );
                      openStopCadenceModal({
                        bobjectToSet: selectedItems,
                        callback: () => setSelectedItems([]),
                      });
                    }}
                  >
                    Stop cadence
                  </Button>
                </div>
              )}
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="personAdd"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.REASSIGN_BULK_ACTION_CLICKED_ON_MY_COMPANIES_TAB,
                    );
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
        rows={entities}
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
              rectVirtualList={scrollRef.current && scrollRef.current.getBoundingClientRect()}
            />
          )
        }
      </VirtualInifiniteScroll>
    </>
  );
};

export function AllMyEntitiesCompanyContent() {
  const { setSelectedItems, selectedItems } = useSubhomeContext();
  const { isChangeStatusModalOpen } = useChangeStatus();
  const { isOpen: isOpenStopCadenceModal, closeStopCadenceModal } = useStopCadence();
  const { isOpen: isOpenAddLeadModal } = useAddLead();
  const { isOpen: isOpenAssignUserModal } = useAssignUser();
  const { createToast } = useToasts();

  return (
    <>
      <div
        className={clsx(styles._filter_container, {
          [styles._transition]: selectedItems.length > 0,
        })}
      >
        <AllMyEntitiesCompanyFilters />
      </div>
      <div className={clsx({ [styles._list_container]: selectedItems.length > 0 })}>
        <AllMyEntitiesList />
      </div>
      {isOpenAddLeadModal && <AddLeadModal />}
      {isOpenStopCadenceModal && <StopCadenceModal handleClose={closeStopCadenceModal} open />}
      {isChangeStatusModalOpen && (
        <ChangeStatusModal
          onSave={() => {
            setSelectedItems([]);
            createToast({
              type: 'success',
              message:
                selectedItems?.length > 1
                  ? `${selectedItems?.length} companies updated successfully.`
                  : 'Company updated successfully',
            });
          }}
        />
      )}
      {isOpenAssignUserModal && (
        <AssignUserModal
          onSave={() => {
            setSelectedItems([]);
          }}
        />
      )}
    </>
  );
}
