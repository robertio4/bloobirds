import React, { useEffect, useRef } from 'react';

import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import AssignUserModal from '../../../../../components/assignUserModal/assignUserModal';
import { STEPS } from '../../../../../components/cadenceControlModal/cadenceControlModal.machine';
import ChangeStatusModal from '../../../../../components/changeStatusModal/changeStatusModal';
import useChangeStatus from '../../../../../components/changeStatusModal/useChangeStatus';
import { VirtualInifiniteScroll } from '../../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { useCadenceControl } from '../../../../../hooks';
import useAssignUser from '../../../../../hooks/useAssignUser';
import SubhomeEmptyContent from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { useSubhomeContext } from '../../../subhomeContext';
import { ProspectingSubhomeCard } from '../../components/prospectingSubhomeCard';
import styles from './inactiveLead.module.css';
import InactiveLeadFilters from './inactiveLeadFilters';
import {
  useProspectingInactiveLead,
  useProspectingInactiveLeadAllItems,
} from './useProspectingInactiveLead';

const InactiveList = () => {
  const scrollRef = useRef<HTMLDivElement>();
  const { items: leads, isLoading, totalMatching } = useProspectingInactiveLead();
  const { getAllItems } = useProspectingInactiveLeadAllItems();
  const {
    setSelectedItems,
    selectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { openCadenceControl } = useCadenceControl();
  const { openAssignUserModal } = useAssignUser();
  const { openChangeStatusModal } = useChangeStatus();
  const { createToast } = useToasts();

  const onSaveAction = () => {
    setSelectedItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems?.length > 1
          ? `${selectedItems?.length} leads updated successfully.`
          : 'Lead updated successfully',
    });
  };

  useEffect(() => {
    if (
      selectedItems?.length !== 0 &&
      selectedItems?.length === leads?.length &&
      !isSelectAllChecked
    ) {
      toggleSelectAll(true);
    } else if (isSelectAllChecked && selectedItems?.length < leads?.length) {
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

  const handleSelectAllCompanies = () => {
    getAllItems().then(allCompanies => setSelectedItems(allCompanies));
  };

  if (!isLoading && leads?.length === 0) {
    return <SubhomeEmptyContent />;
  }

  return (
    <div className={styles._inactive_page_wrapper}>
      <div className={styles._select_all_wrapper}>
        <div>
          <Checkbox size="small" onClick={handleSelectAll} checked={isSelectAllChecked}>
            <Text size="s">Select all</Text>
          </Checkbox>
          {selectedItems?.length !== 0 && (
            <>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="calendar"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.SET_CADENCE_BULK_ACTION_CLICKED_ON_INACTIVE_PROSPECTING_TAB,
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
                    mixpanel.track(
                      MIXPANEL_EVENTS.REASSIGN_BULK_ACTION_CLICKED_ON_INACTIVE_PROSPECTING_TAB,
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
                      MIXPANEL_EVENTS.CHANGE_STATUS_BULK__ACTION_CLICKED_ON_INACTIVE_PROSPECTING_TAB,
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
            All <b>{selectedItems?.length}</b> leads on this page are selected from a total of{' '}
            <b>{totalMatching}</b>.
          </Text>{' '}
          {selectedItems?.length < totalMatching && (
            <span className={styles._link} onClick={handleSelectAllCompanies}>
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
        isFetchingData={isLoading}
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
    </div>
  );
};

export function InactiveLeadContent() {
  const { setSelectedItems, selectedItems } = useSubhomeContext();
  const { isOpen: isOpenAssignUserModal } = useAssignUser();
  const { isChangeStatusModalOpen } = useChangeStatus();
  const { createToast } = useToasts();

  return (
    <>
      <div
        className={clsx(styles._filter_container, {
          [styles._transition]: selectedItems?.length > 0,
        })}
      >
        <InactiveLeadFilters />
      </div>
      <div className={clsx({ [styles._list_container]: selectedItems?.length > 0 })}>
        <InactiveList />
      </div>
      {isChangeStatusModalOpen && (
        <ChangeStatusModal
          onSave={() => {
            if (selectedItems?.length > 1) {
              setSelectedItems([]);
            }
            createToast({
              type: 'success',
              message:
                selectedItems?.length > 1
                  ? `${selectedItems?.length} leads changed successfully.`
                  : 'Lead changed successfully',
            });
          }}
        />
      )}
      {isOpenAssignUserModal && (
        <AssignUserModal
          onSave={() => {
            if (selectedItems?.length > 1) {
              setSelectedItems([]);
            }
            createToast({
              type: 'success',
              message:
                selectedItems.length > 1
                  ? `${selectedItems.length} leads assigned successfully.`
                  : 'Lead assigned successfully',
            });
          }}
        />
      )}
    </>
  );
}
