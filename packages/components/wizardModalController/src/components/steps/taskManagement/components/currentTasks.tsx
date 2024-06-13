import React, { useRef } from 'react';

import { TasksTabList } from './list/tasksTabsList';

const CurrentTasks = () => {
  const parentRef = useRef<HTMLDivElement>();
  return (
    <div ref={parentRef}>
      <TasksTabList parentRef={parentRef} />
    </div>
  );
};

export default CurrentTasks;
