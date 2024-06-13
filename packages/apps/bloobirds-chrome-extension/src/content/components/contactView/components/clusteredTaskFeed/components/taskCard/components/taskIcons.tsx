import { ColorType, Icon, IconType } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';

import { TaskFeedTask } from '../../../types/clusteredTaskFeed.type';
import styles from '../taskCard.module.css';

const TaskIcon = (iconProps: { name: IconType; color: ColorType }) => {
  return <Icon size={16} {...iconProps} />;
};

const CustomTaskIcon = ({ customTaskId }: { customTaskId: string }) => {
  const { customTasks } = useCustomTasks();
  const customTask = customTasks?.find(ct => ct.id === customTaskId);
  if (!customTask) {
    return null;
  }
  return (
    <div className={styles.customTaskIcon}>
      <TaskIcon name={customTask.icon} color={customTask.iconColor} />
      <span className={styles.taskCardTitle} style={{ marginTop: '2px' }}>
        {customTask.name}
      </span>
    </div>
  );
};

export const TaskIcons = ({ task }: { task: TaskFeedTask }) => (
  <div className={styles.taskCardIcons}>
    {task.customTaskId ? (
      <CustomTaskIcon customTaskId={task.customTaskId} />
    ) : task.type === 'PROSPECT_CADENCE' ? (
      [
        task.actionCall && <TaskIcon key="callTaskIcon" name="phone" color="extraCall" />,
        task.actionEmail && <TaskIcon key="emailTaskIcon" name="mail" color="tangerine" />,
        task.actionLinkedin && (
          <TaskIcon key="linkedinTaskIcon" name="linkedin" color="darkBloobirds" />
        ),
      ]
    ) : task.customTaskId ? (
      <CustomTaskIcon customTaskId={task.customTaskId} />
    ) : task?.actionCall ? (
      <TaskIcon name="phone" color="extraCall" />
    ) : task?.actionEmail ? (
      <TaskIcon name="mail" color="tangerine" />
    ) : task?.actionLinkedin ? (
      <TaskIcon name="linkedin" color="darkBloobirds" />
    ) : (
      <TaskIcon name={task.icon} color={task.color} />
    )}
  </div>
);
