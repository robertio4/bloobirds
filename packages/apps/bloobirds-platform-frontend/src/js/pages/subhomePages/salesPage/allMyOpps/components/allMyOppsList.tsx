import React, { useEffect, useRef } from 'react';

import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
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
import { Bobject } from '../../../../../typings/bobjects';
import { SalesSubhomeCard } from '../../../components/subhomeCards/salesSubhomeCard';
import { useSubhomeContext } from '../../../subhomeContext';
import styles from '../allMyOpps.module.css';
import {
  useSalesAllMyOpps,
  useSalesAllMyOppsPage,
  useSalesOpportunitiesAllItems,
} from '../useSalesAllMyOpps';

export const OppsList = () => {
  const scrollRef = useRef();
  const { items: opportunities, isLoading, totalMatching } = useSalesAllMyOpps();
  const { hasNextPage, loadNextPage, setHasNextPage } = useSalesAllMyOppsPage();
  const {
    setSelectedItems,
    toggleSelectAll,
    selectedItems,
    isSelectAllChecked,
    parentRef,
  } = useSubhomeContext();
  const { getAllItems } = useSalesOpportunitiesAllItems();
  const { openCadenceControl } = useCadenceControl();
  const { openChangeStatusModal, isChangeStatusModalOpen } = useChangeStatus();
  const { createToast } = useToasts();

  const onSaveAction = () => {
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} opportunities updated successfully.`
          : 'Opportunity updated successfully',
    });
    setSelectedItems([]);
    toggleSelectAll(false);
  };
  const { isOpen: isOpenAssignUserModal, openAssignUserModal } = useAssignUser();

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(opportunities);
    }
    toggleSelectAll(!isSelectAllChecked);
  };

  const handleSelectAllOpportunities = () => {
    getAllItems().then((allOpps: any) => setSelectedItems(allOpps));
  };

  useEffect(() => {
    if (opportunities?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [opportunities, totalMatching]);

  if (!isLoading && opportunities?.length === 0) {
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
                      MIXPANEL_EVENTS.SET_CADENCE_BULK_ACTION_CLICKED_ON_ALL_OPPS_SALES_TAB,
                    );
                    openCadenceControl({
                      bobjectToSet: selectedItems,
                      previousStep: false,
                      step: STEPS.CONFIGURE_CADENCE,
                      onSaveCallback: () => {
                        setSelectedItems([]);
                        toggleSelectAll(false);
                      },
                      response: null,
                    });
                  }}
                >
                  Set cadence
                </Button>
                <Button
                  variant="clear"
                  iconLeft="personAdd"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.REASSIGN_BULK_ACTION_CLICKED_ON_ALL_OPPS_SALES_TAB,
                    );
                    openAssignUserModal({
                      bobject: selectedItems,
                    });
                  }}
                >
                  Reassign
                </Button>
                <Button
                  variant="clear"
                  iconLeft="edit"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.CHANGE_STATUS_BULK_ACTION_CLICKED_ON_ALL_OPPS_SALES_TAB,
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
            All <b>{selectedItems.length}</b> opportunities on this page are selected from a total
            of <b>{totalMatching}</b>.
          </Text>{' '}
          {selectedItems.length < totalMatching && (
            <span className={styles._link} onClick={handleSelectAllOpportunities}>
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
        rows={opportunities}
        hasNextPage={hasNextPage}
        isFetchingData={isLoading}
        fetchNextPage={loadNextPage}
      >
        {(data: Bobject, hasNext: boolean) =>
          data?.id?.objectId && (
            <SalesSubhomeCard
              key={data?.id?.objectId}
              bobject={data}
              hasNextCard={hasNext}
              rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
            />
          )
        }
      </VirtualInifiniteScroll>

      {isOpenAssignUserModal && (
        <AssignUserModal
          onSave={() => {
            setSelectedItems([]);
            toggleSelectAll(false);
          }}
        />
      )}
      {isChangeStatusModalOpen && <ChangeStatusModal onSave={onSaveAction} />}
    </>
  );
};
