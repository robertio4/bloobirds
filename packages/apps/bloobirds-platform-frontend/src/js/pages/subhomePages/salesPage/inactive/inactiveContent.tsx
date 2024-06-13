import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject, MainBobjectTypes, PluralBobjectTypes, BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import AssignUserModal from '../../../../components/assignUserModal/assignUserModal';
import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import ChangeStatusModal from '../../../../components/changeStatusModal/changeStatusModal';
import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useCadenceControl } from '../../../../hooks';
import useAssignUser from '../../../../hooks/useAssignUser';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { SalesSubhomeCard } from '../../components/subhomeCards/salesSubhomeCard';
import { useSubhomeContext } from '../../subhomeContext';
import styles from '../companiesAndLeads/companiesAndLeads.module.css';
import InactiveFilters from './newInactiveFilters/inactiveFilters';
import { useSalesInactivePage, useSalesItemsInactive } from './useSalesInactive';

const InactiveList = ({ bobjectType }: { bobjectType: MainBobjectTypes }) => {
  const scrollRef = useRef<HTMLDivElement>();
  const {
    setSelectedItems,
    selectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { createToast } = useToasts();
  const { items, isLoading, totalMatching } = useSalesItemsInactive(bobjectType);
  const { hasNextPage, loadNextPage, setHasNextPage } = useSalesInactivePage();
  const { openCadenceControl } = useCadenceControl();
  const { openChangeStatusModal } = useChangeStatus();
  const { openAssignUserModal } = useAssignUser();
  const onSaveAction = () => {
    setSelectedItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} ${PluralBobjectTypes[bobjectType]} updated successfully.`
          : `${bobjectType} updated successfully`,
    });
  };

  const handleSelectAll = () => {
    setSelectedItems(isSelectAllChecked ? [] : items);
    toggleSelectAll(!isSelectAllChecked);
  };

  useEffect(() => {
    if (items?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [items, totalMatching]);

  if (!isLoading && items?.length === 0) {
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
                      MIXPANEL_EVENTS.COMPANY_SET_CADENCE_BULK_ACTION_CLICKED_ON_DELIVERED_TAB,
                    );
                    openCadenceControl({
                      bobjectToSet: selectedItems,
                      previousStep: false,
                      step: STEPS.CONFIGURE_CADENCE,
                      onSaveCallback: onSaveAction,
                      response: undefined,
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
      <VirtualInifiniteScroll
        ref={scrollRef}
        parentRef={parentRef}
        rows={items}
        hasNextPage={hasNextPage}
        isFetchingData={isLoading}
        fetchNextPage={loadNextPage}
        rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
      >
        {(data: Bobject, hasNext: boolean) =>
          data?.id?.objectId && (
            <SalesSubhomeCard key={data?.id?.objectId} bobject={data} hasNextCard={hasNext} />
          )
        }
      </VirtualInifiniteScroll>
    </>
  );
};

const tabBobjectType = (section: string) => {
  switch (section) {
    case 'leads':
      return BobjectTypes.Lead;
    case 'opportunities':
      return BobjectTypes.Opportunity;
    default:
      return BobjectTypes.Company;
  }
};

export function InactiveContent() {
  // @ts-ignore
  const { section } = useParams();
  const bobjectType = tabBobjectType(section);
  const { setSelectedItems, selectedItems } = useSubhomeContext();
  const { isChangeStatusModalOpen, closeChangeStatusModal } = useChangeStatus();
  const { isOpen: isOpenAssignUserModal } = useAssignUser();
  const { createToast } = useToasts();

  const handleBulkSave = () => {
    closeChangeStatusModal();
    const isBulk = selectedItems?.length > 1;
    setSelectedItems([]);
    createToast({
      type: 'success',
      message: `${
        isBulk
          ? `${selectedItems.length} ${PluralBobjectTypes[bobjectType]} updated successfully.`
          : `${bobjectType} updated successfully.`
      }`,
    });
  };

  return (
    <>
      <div
        className={clsx(styles._filter_container, {
          [styles._transition]: selectedItems.length > 0,
        })}
      >
        <InactiveFilters />
      </div>
      <InactiveList bobjectType={bobjectType} />
      {isChangeStatusModalOpen && <ChangeStatusModal onSave={handleBulkSave} />}
      {isOpenAssignUserModal && <AssignUserModal onSave={() => setSelectedItems([])} />}
    </>
  );
}
