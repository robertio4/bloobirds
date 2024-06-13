import { QuickLogModalData } from '@bloobirds-it/hooks';
import { BobjectWithDate, CustomTask } from '@bloobirds-it/types';

import { useExtensionContext } from '../../../context';
import { ActivityMiniCard } from './activityMiniCard';
import { TaskMiniCard } from './taskMiniCard';

export const WizardMiniCard = ({
  bobject,
  isTaskFeed = false,
  ...props
}: {
  bobject: BobjectWithDate;
  hasNextCard?: boolean;
  isOverdue?: boolean;
  isTaskFeed?: boolean;
  updateIndexOnSave?: () => void;
  minimized: false;
  customTasks?: CustomTask[];
  logCustomActivity?: (data: QuickLogModalData) => void;
}) => {
  const bobjectType = bobject?.id?.typeName;
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();

  if (bobjectType === 'Task')
    return (
      <TaskMiniCard
        task={bobject}
        sidePeekEnabled={sidePeekEnabled}
        isTaskFeed={isTaskFeed}
        {...props}
      />
    );
  if (bobjectType === 'Activity')
    return <ActivityMiniCard activity={bobject} sidePeekEnabled={sidePeekEnabled} {...props} />;
  return <></>;
};
