import React, { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useRouter } from '@bloobirds-it/hooks';

import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import { useActiveActivitiesPage } from '../../../hooks/useActiveActivities';
import useUpdateSalesforceCampaignStatus from '../../../hooks/useUpdateCampaignStatus';
import { addActivityDateGrouping } from '../../../utils/activities.utils';
import { getValueFromLogicRole } from '../../../utils/bobjects.utils';
import UpdateCampaignMemberStatusModal from '../../updateCampaignMemberStatusModal/updateCampaignMemberStatusModal';
import ActivitiesPlaceholder from '../activitiesPlaceholder';
import ActivityItem from '../activityItem';
import styles from './activityList.module.css';

export function DateGroupHeader({ bobject }) {
  return (
    <header className={styles._header} id={bobject.activityDate.hashDate}>
      <Text color="peanut" weight="medium" size="m" inline>
        {bobject.activityDate.prefix}
      </Text>
      <Text color="softPeanut" size="m" inline>
        {bobject.activityDate.formattedDate}
      </Text>
    </header>
  );
}

const ActivityList = ({ bobjects, pinnedBobjects }) => {
  const { query } = useRouter();
  const { loadNextPage, hasNextPage } = useActiveActivitiesPage();
  const { t } = useTranslation();
  const {
    isOpen: isOpenUpdateCampaignStatusModal,
    closeModal: closeUpdateSalesforceCampaignStatus,
  } = useUpdateSalesforceCampaignStatus();
  const filteredBobjects = useMemo(() => {
    const activities = bobjects?.filter(bobject =>
      getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TIME),
    );
    return addActivityDateGrouping(activities, ACTIVITY_FIELDS_LOGIC_ROLE.TIME, t);
  }, [bobjects]);

  return (
    <InfiniteScroll
      dataLength={bobjects?.length}
      className={styles._container}
      hasMore={hasNextPage}
      loader={<ActivitiesPlaceholder visible />}
      next={loadNextPage}
      scrollableTarget={query?.id}
      scrollThreshold={0.75}
    >
      {pinnedBobjects.length > 0 && (
        <Fragment>
          <header className={styles._header}>
            <Text color="peanut" size="m" inline weight="medium">
              <div className={styles._pinned_icon_container}>
                <Icon name="pin" size={20} color="softPeanut" />
              </div>
              Pinned
            </Text>
          </header>
          {pinnedBobjects.map(bobject => (
            <ActivityItem bobject={bobject} pinned key={bobject?.id.objectId} />
          ))}
        </Fragment>
      )}
      {filteredBobjects.map((bobject, index) => {
        const nextBobject = filteredBobjects[index + 1];
        const showNextLine = nextBobject && !nextBobject?.activityDate.isFirstOfDay;
        return (
          <Fragment key={bobject.id.value}>
            {bobject.activityDate.isFirstOfDay && <DateGroupHeader bobject={bobject} />}
            <ActivityItem bobject={bobject} showNextLine={showNextLine} />
          </Fragment>
        );
      })}
      {isOpenUpdateCampaignStatusModal && (
        <UpdateCampaignMemberStatusModal onClose={closeUpdateSalesforceCampaignStatus} />
      )}
    </InfiniteScroll>
  );
};

export default ActivityList;
