import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { getUserTimeZone } from '@bloobirds-it/utils';
import spacetime from 'spacetime';

import { TaskFeedTask } from '../../../types/clusteredTaskFeed.type';

export function TaskDate({ task }: { task: TaskFeedTask }) {
  const date = useGetI18nSpacetime(task.scheduledDatetime, getUserTimeZone());
  let isOverdue;
  const isCompleted = !!task.completedDatetime;
  const isSkipped = !!task.rejectedDatetime;

  if (isSkipped) {
    return (
      <Text color="softPeanut" size="xs">
        Skipped
      </Text>
    );
  }

  if (isCompleted) {
    return (
      <>
        <Icon name="checkDouble" color="melon" size={16} />
        <Text color="melon" size="xs">
          Completed {spacetime.now().since(task.completedDatetime).rounded}
        </Text>
      </>
    );
  }
  if (task.type === 'PROSPECT_CADENCE') {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    isOverdue = date.isBefore(startOfDay);
  } else {
    isOverdue = date.isBefore(new Date());
  }
  const formattedDate =
    task.type === 'PROSPECT_CADENCE'
      ? date.format('{month-short} {date}')
      : date.format('{hour-24}:{minute-pad}, {month-short} {date}');

  return (
    <Text color={isOverdue ? 'tomato' : 'softPeanut'} size="xs">
      {formattedDate}
    </Text>
  );
}
