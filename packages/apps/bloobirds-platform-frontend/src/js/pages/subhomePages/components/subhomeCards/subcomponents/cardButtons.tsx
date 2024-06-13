import React from 'react';

import { BobjectTypes, CustomTask, Bobject } from '@bloobirds-it/types';

import { MainBobjectButtons } from './mainBobjectButtons';
import { TaskCardButtons } from './taskCardButtons';

interface CardButtonsProps {
  bobject: Bobject;
  isHovering: boolean;
  customTask?: CustomTask;
}

export const CardButtons = ({ bobject, isHovering, customTask }: CardButtonsProps) => {
  const bobjectType = bobject?.id?.typeName;

  switch (bobjectType) {
    case BobjectTypes.Task:
      return <TaskCardButtons bobject={bobject} isHovering={isHovering} customTask={customTask} />;
    default:
      return <MainBobjectButtons bobject={bobject} isHovering={isHovering} />;
  }
};
