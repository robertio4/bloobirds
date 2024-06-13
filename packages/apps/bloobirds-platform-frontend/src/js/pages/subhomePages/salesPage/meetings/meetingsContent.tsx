import React, { Fragment, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, createToast, Label, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { DateGroupHeader } from '../../../../components/activitySection/activityList/activityList.view';
import BulkActionToast from '../../../../components/bulkActionToast/bulkActionToast';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../../constants/activity';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useActivityDone } from '../../../../hooks/useActivity';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { addActivityDateGrouping } from '../../../../utils/activities.utils';
import { getFieldByLogicRole } from '../../../../utils/bobjects.utils';
import { MeetingActivityCard } from '../../components/subhomeCards/subcomponents/meetingActivityCard';
import { useSubhomeContext } from '../../subhomeContext';
import styles from '../companiesAndLeads/companiesAndLeads.module.css';
import { MeetingsFilters } from './meetingsFilters';
import { useSalesMeetingsPage, useSalesMeetingsActivities } from './useSalesMeetings';

export interface DateExtendedBobject extends Bobject<BobjectTypes.Activity> {
  activityDate: { isFirstOfDay: boolean };
}
interface ReportedBobject extends Bobject {
  isReported?: boolean;
}

const MeetingsList = () => {
  const {
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { t } = useTranslation();
  const { showToast } = useActivityDone();
  const { items, isLoading, totalMatching } = useSalesMeetingsActivities();
  const { hasNextPage, loadNextPage, setHasNextPage } = useSalesMeetingsPage();

  const activitiesWithDateGrouping = useMemo(
    () => addActivityDateGrouping(items, 'ACTIVITY__TIME', t),
    [items],
  );

  const handleSelectAll = () => {
    const itemsWithReportedInfo = items.map(item => {
      const isReported =
        getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole ===
        REPORTED_VALUES_LOGIC_ROLE.YES;
      return {
        ...item,
        isReported,
      };
    });
    setSelectedItems(isSelectAllChecked ? [] : itemsWithReportedInfo);
    toggleSelectAll(!isSelectAllChecked);
  };

  const reportItems = () => {
    mixpanel.track(MIXPANEL_EVENTS.MARK_AS_DONE_BULK_ACTION_CLICKED_ON_MEETING_TAB);
    const reportableItems = (selectedItems as ReportedBobject[]).filter(item => !item?.isReported);
    if (reportableItems.length > 0) {
      showToast(true, reportableItems);
    } else {
      createToast({ message: 'All the selected activities are already reported!', type: 'error' });
    }
  };

  useEffect(() => {
    if (items?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [items, totalMatching]);

  useEffect(() => {
    if ((totalMatching !== 0 && selectedItems?.length === totalMatching) !== isSelectAllChecked) {
      toggleSelectAll(selectedItems?.length === totalMatching);
    }
  }, [selectedItems]);

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
            <div className={styles._button_wrapper}>
              <Button variant="clear" iconLeft="thumbsUp" uppercase={false} onClick={reportItems}>
                Mark as Reported
              </Button>
            </div>
          )}
        </div>
        {totalMatching !== undefined && !Number.isNaN(totalMatching) && (
          <Label size="small">{`${totalMatching} results`}</Label>
        )}
      </div>
      <VirtualInifiniteScroll
        parentRef={parentRef}
        rows={activitiesWithDateGrouping}
        hasNextPage={hasNextPage}
        isFetchingData={isLoading}
        fetchNextPage={loadNextPage}
        hasNextItem={index =>
          !!activitiesWithDateGrouping[index + 1] &&
          !activitiesWithDateGrouping[index + 1]?.taskDate?.isFirstOfDay
        }
      >
        {(data: DateExtendedBobject, hasNext: boolean) =>
          data?.id?.objectId && (
            <Fragment key={data?.id?.objectId}>
              <div className={styles._list_header}>
                {data?.activityDate.isFirstOfDay && <DateGroupHeader bobject={data} />}
              </div>
              <MeetingActivityCard bobject={data} hasNextCard={hasNext} />
            </Fragment>
          )
        }
      </VirtualInifiniteScroll>
      <BulkActionToast />
    </>
  );
};

export default function () {
  return (
    <>
      <MeetingsFilters />
      <MeetingsList />
    </>
  );
}
