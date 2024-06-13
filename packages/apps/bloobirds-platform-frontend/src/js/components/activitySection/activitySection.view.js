import React from 'react';

import { Button, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { isEqual } from 'lodash';

import { useActiveActivities, useActiveActivitiesFilters } from '../../hooks/useActiveActivities';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import ActivitiesPlaceholder from './activitiesPlaceholder';
import ActivityFilters from './activityFilters';
import ActivityList from './activityList';
import styles from './activitySection.module.css';

const EmptyList = () => {
  const { resetAllFilters, typeFilter } = useActiveActivitiesFilters();
  const { helpers } = useUserHelpers();
  const activityFilters =
    helpers?.['ACTIVITY_FILTERS'] && JSON.parse(helpers?.['ACTIVITY_FILTERS'])?.filter(i => i);
  const isDisabled = isEqual(typeFilter, activityFilters);

  return (
    <div className={styles._no_match}>
      <Text htmlTag="h2" color="peanut">
        No results were found with the current filters
      </Text>
      <Text color="softPeanut" size="m">
        Try modifying you search criteria
      </Text>
      <Tooltip
        title={
          isDisabled &&
          'Filters are already cleared, show more types of activity managing visibility in the settings next to the activity search bar'
        }
        position="bottom"
      >
        <Button
          onClick={resetAllFilters}
          variant="secondary"
          color="bloobirds"
          disabled={isDisabled}
        >
          Clear filters
        </Button>
      </Tooltip>
    </div>
  );
};

const OnlyStatusActivitiesLeft = () => {
  const { setTypeFilter } = useActiveActivitiesFilters();
  return (
    <div className={styles._no_match}>
      <Text htmlTag="h2" color="peanut">
        No activities for these activity types were found
      </Text>
      <Text color="softPeanut" size="m">
        Do you wish to view the activities of type Status?
      </Text>
      <Button onClick={() => setTypeFilter([])} variant="secondary" color="bloobirds">
        View activities
      </Button>
    </div>
  );
};

const ActivityContent = () => {
  const { activities, pinnedActivities, loading } = useActiveActivities({
    shouldCreateSubscription: true,
  });
  const { usingDefaultFilters } = useActiveActivitiesFilters();

  if (!loading && activities?.length === 0) {
    return usingDefaultFilters ? <OnlyStatusActivitiesLeft /> : <EmptyList />;
  }

  return (
    <>
      <ActivitiesPlaceholder visible={loading} />
      {!loading && <ActivityList bobjects={activities} pinnedBobjects={pinnedActivities} />}
    </>
  );
};

const ActivitySection = () => (
  <section id="activity-tab" className={styles._section}>
    <div className={styles._container}>
      <ActivityFilters />
      <ActivityContent />
    </div>
  </section>
);

export default ActivitySection;
