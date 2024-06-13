import { Skeleton } from '@bloobirds-it/flamingo-ui';

import style from './relationsFeedSkeleton.module.css';

const TasksFeedSkeleton = () => (
  <div className={style.container}>
    <Skeleton variant="text" height={20} width="30%" />
    <Skeleton variant="rect" width="100%" height={120} />
    <Skeleton variant="text" height={20} width="30%" />
    <Skeleton variant="rect" width="100%" height={120} />
  </div>
);

export default TasksFeedSkeleton;
