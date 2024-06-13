import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject, PluralBobjectTypes, BOBJECT_TYPES, BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import AddCompanyModal from '../../../../components/addCompanyModal/addCompanyModal';
import AssignUserModal from '../../../../components/assignUserModal/assignUserModal';
import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import ChangeStatusModal from '../../../../components/changeStatusModal/changeStatusModal';
import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useCadenceControl } from '../../../../hooks';
import useAddCompany from '../../../../hooks/useAddCompany';
import useAssignUser from '../../../../hooks/useAssignUser';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { SubhomeSections } from '../../../../typings/params';
import { SalesSubhomeCard } from '../../components/subhomeCards/salesSubhomeCard';
import { useSubhomeContext } from '../../subhomeContext';
import styles from './companiesAndLeads.module.css';
import CompaniesAndLeadsFilters from './companiesAndLeadsFilters';
import {
  useCompaniesAndLeadsTabAllItems,
  useSalesCompaniesAndLeadsPage,
  useSalesItemsCompaniesAndLeads,
} from './useSalesCompaniesAndLeads';

const CompaniesAndLeadsList = () => {
  const scrollRef = useRef();
  const {
    setSelectedItems,
    selectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { section }: SubhomeSections = useParams();
  const { createToast } = useToasts();
  const tabBobjectType = section === 'leads' ? BOBJECT_TYPES.LEAD : BOBJECT_TYPES.COMPANY;
  const { items, isLoading, totalMatching } = useSalesItemsCompaniesAndLeads(tabBobjectType);
  const { hasNextPage, loadNextPage, setHasNextPage } = useSalesCompaniesAndLeadsPage();
  const { getAllItems } = useCompaniesAndLeadsTabAllItems(tabBobjectType);
  const { openCadenceControl } = useCadenceControl();
  const { openChangeStatusModal } = useChangeStatus();
  const { openAssignUserModal } = useAssignUser();

  const onSaveAction = () => {
    setSelectedItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} ${PluralBobjectTypes[tabBobjectType]} updated successfully.`
          : `${tabBobjectType} updated successfully`,
    });
  };

  useEffect(() => {
    if (items?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [items, totalMatching]);

  useEffect(() => {
    if (
      selectedItems?.length !== 0 &&
      selectedItems?.length === items?.length &&
      !isSelectAllChecked
    ) {
      toggleSelectAll(true);
    } else if (isSelectAllChecked && selectedItems?.length < items?.length) {
      toggleSelectAll(false);
    }
  }, [selectedItems]);

  const handleSelectAll = () => {
    setSelectedItems(isSelectAllChecked ? [] : items);
    toggleSelectAll(!isSelectAllChecked);
  };

  const handleSelectAllItems = () => {
    getAllItems().then(allItems => setSelectedItems(allItems));
  };

  if (!isLoading && items?.length === 0) {
    return <SubhomeEmptyContent />;
  }

  return (
    <>
      <div
        className={clsx(styles._select_all_wrapper, {
          [styles._hidden_filters]: selectedItems?.length !== 0,
        })}
      >
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
            All <b>{selectedItems?.length}</b> items on this page are selected from a total of{' '}
            <b>{totalMatching}</b>.
          </Text>{' '}
          {selectedItems?.length < totalMatching && (
            <span className={styles._link} onClick={handleSelectAllItems}>
              <Text size="s" inline color="bloobirds" htmlTag="span">
                {totalMatching > 1000
                  ? 'Continue with a maximum of 1000'
                  : `Select all ${totalMatching} items`}
              </Text>
            </span>
          )}
        </div>
      )}
      <VirtualInifiniteScroll
        ref={scrollRef}
        parentRef={parentRef}
        rows={items}
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
    </>
  );
};

export function CompaniesAndLeadsContent() {
  const { section }: SubhomeSections = useParams();
  const tabBobjectType = section === 'leads' ? BobjectTypes.Lead : BobjectTypes.Company;
  const { setSelectedItems, selectedItems } = useSubhomeContext();
  const { isChangeStatusModalOpen } = useChangeStatus();
  const { isOpen: isOpenAssignUserModal } = useAssignUser();
  const { isOpen: isOpenAddCompanyModal } = useAddCompany();
  const { createToast } = useToasts();
  const onSaveAction = () => {
    setSelectedItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} ${PluralBobjectTypes[tabBobjectType]} updated successfully.`
          : `${tabBobjectType} updated successfully`,
    });
  };
  useEffect(() => {
    setSelectedItems([]);
  }, [tabBobjectType]);

  return (
    <>
      <div
        className={clsx(styles._filter_container, {
          [styles._transition]: selectedItems.length > 0,
        })}
      >
        <CompaniesAndLeadsFilters />
      </div>
      <CompaniesAndLeadsList />
      {isChangeStatusModalOpen && <ChangeStatusModal onSave={onSaveAction} />}
      {isOpenAssignUserModal && <AssignUserModal onSave={onSaveAction} />}
      {isOpenAddCompanyModal && <AddCompanyModal />}
    </>
  );
}
