import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityDetails, ActivityFeed, NewActivityFeed } from '@bloobirds-it/activity-feed';
import { useNewActivityFeed, useAiAnalysisEnabled } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  DataModelResponse,
} from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';

import { ActivitySkeleton } from './activitySkeleton/activitySkeleton';
import { PastActivityFilters } from './filters/pastActivityFilters';
import styles from './pastActivity.module.css';
import { NoDataPage, NoResultsPage } from './pastActivity.utils';
import { usePastActivity } from './usePastActivity';
import { usePastActivityTab } from './usePastActivityTab';

interface ActivityFeedProps {
  setSelectedActivity: (value: Bobject) => void;
  setShowDetail: (value: boolean) => void;
  pastActivitiesInfo: ReturnType<typeof usePastActivity>['pastActivitiesInfo'];
  dataModel: DataModelResponse;
  setExternalSelectedActivity: (value: Bobject) => void;
  activeBobject: Bobject;
  accountId: string;
  subscribeMutator: () => void;
}

const ActivityFeedWrapper = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      setSelectedActivity,
      setShowDetail,
      pastActivitiesInfo,
      dataModel,
      setExternalSelectedActivity,
      activeBobject,
      accountId,
      subscribeMutator,
    },
    ref,
  ) => {
    const { activities, data, fetchNextPage, totalMatching } = pastActivitiesInfo || {};
    const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.pastActivityTab' });
    const hasNewActivityFeedDisabled = useNewActivityFeed(accountId);
    const aiAnalysisEnabled = useAiAnalysisEnabled(accountId);

    const handleActivityClick = (activity: Bobject) => {
      const activityTypeLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
        ?.valueLogicRole;

      if (
        ![
          'ACTIVITY__TYPE__STATUS',
          'ACTIVITY__TYPE__CADENCE',
          ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK,
        ].includes(activityTypeLogicRole)
      ) {
        setShowDetail(true);
        setExternalSelectedActivity(undefined);
        setSelectedActivity(activity);
      }
    };

    if (!activeBobject) {
      return <NoDataPage objectName={t('activities').toLowerCase()} />;
    }

    return (
      <div className={styles.past_activity_feed_container} ref={ref}>
        {activities?.length !== 0 &&
          (hasNewActivityFeedDisabled ? (
            <ActivityFeed
              activities={activities}
              isLoading={!data}
              dataModel={dataModel}
              handleOnClick={activity => handleActivityClick(activity)}
              // @ts-ignore
              parentRef={ref}
              total={totalMatching}
              fetchNextPage={fetchNextPage}
              contentSkeleton={() => (
                <div className={styles.skeleton}>
                  <ActivitySkeleton visible />
                </div>
              )}
              estimateSize={46}
              fixedHeight={true}
              extended
            />
          ) : (
            <NewActivityFeed
              activeBobject={activeBobject as Bobject}
              enabledArrowNavigation
              handleOnClick={activity => handleActivityClick(activity)}
              parentRef={ref as RefObject<HTMLDivElement>}
              estimateSize={45}
              subscribeMutator={subscribeMutator}
              aiAnalysisEnabled={aiAnalysisEnabled}
            />
          ))}
      </div>
    );
  },
);

export const PastActivityTab = React.forwardRef<any, any>(
  (
    {
      accountId,
      dataModel,
      user,
      selectedActivity: externalSelectedActivity,
      data,
      setSelectedActivity: setExternalSelectedActivity,
      subscribeMutator,
    },
    parentRef,
  ) => {
    const userId = user?.id;
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [selectedActivity, setSelectedActivity] = useState<Bobject>(externalSelectedActivity);
    const { leadFilterOptions } = usePastActivityTab(data);
    const { pastActivitiesInfo, error, isLoading, mutate, magicFilterHandling } = usePastActivity(
      data,
    );
    const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.pastActivityTab' });

    const ref = useRef();

    useEffect(() => {
      if (externalSelectedActivity) setShowDetail(true);
    }, [externalSelectedActivity]);

    return (
      <div className={styles.wrapper}>
        {showDetail ? (
          <ActivityDetails
            activity={selectedActivity}
            selectedActivity={externalSelectedActivity}
            userId={userId}
            callback={() => {
              setShowDetail(false);
              mutate();
              // @ts-ignore
              ref.current = ref.current || parentRef.current;
            }}
            // @ts-ignore
            extended
            dataModel={dataModel}
            visibleFooter={false}
          />
        ) : (
          <div className={styles.feed}>
            <PastActivityFilters
              magicFilterHandling={magicFilterHandling}
              leadFilterOptions={leadFilterOptions}
              filters={data.filters}
              setFilters={data.setFilters}
              activeBobject={data.activeBobject}
            />
            {error ? (
              <div className={styles.no_results}>
                <NoDataPage objectName={t('activities').toLowerCase()} />
              </div>
            ) : (
              <>
                {!isLoading && pastActivitiesInfo && pastActivitiesInfo.activities?.length === 0 && (
                  <div className={styles.no_results}>
                    <NoResultsPage />
                  </div>
                )}
                <ActivityFeedWrapper
                  ref={ref}
                  dataModel={dataModel}
                  accountId={accountId}
                  activeBobject={data.activeBobject}
                  pastActivitiesInfo={pastActivitiesInfo}
                  setSelectedActivity={setSelectedActivity}
                  setShowDetail={setShowDetail}
                  setExternalSelectedActivity={setExternalSelectedActivity}
                  subscribeMutator={subscribeMutator}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);
