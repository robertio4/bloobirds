import React, { useRef, useState } from 'react';

import { PastActivityTab } from '@bloobirds-it/activity-feed';
import { useDataModel, useUserSettings } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import { getRelatedBobject } from '@bloobirds-it/utils';

const ActivityFeed = ({ activity }: { activity: Bobject }) => {
  const ref = useRef();
  const dataModel = useDataModel();
  const { user } = useUserSettings();
  const [selectedActivity, setSelectedActivity] = useState<Bobject>();
  const lead = getRelatedBobject(activity, 'Lead');
  const [filters, setFilters] = useState({
    type: [],
    lead: [lead?.id?.value],
    user: [],
  });

  return (
    <div ref={ref}>
      <PastActivityTab
        ref={ref}
        dataModel={dataModel}
        user={user}
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
        data={{
          activeBobject: lead,
          opportunity: null,
          pageBobjectType: BobjectTypes.Lead,
          filters,
          setFilters,
          company: null,
          leads: null,
        }}
      />
    </div>
  );
};

export default ActivityFeed;
