import React, { createContext, PropsWithChildren, useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEventSubscription } from '@bloobirds-it/plover';
import { BobjectTypes, MessagesEvents, EventTypes, WebSocketEvent } from '@bloobirds-it/types';
import { WizardsModalParams } from '@bloobirds-it/wizard-modal-context';

import {
  ModalContextType,
  TaskActionStates,
  TaskManagementContextType,
  TaskManagementModals,
} from '../types/taskManagement.types';
import { useCurrentTasks } from './useCurrentTasks';

const defaultModalContext = {
  modal: undefined,
  task: undefined,
};

const TaskManagementContext = createContext(null);
export const TaskManagementProvider = ({
  children,
  machineContext,
  ...props
}: PropsWithChildren<WizardsModalParams>) => {
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.taskManagement' });
  const [modalContext, setModalContext] = useState<ModalContextType>(defaultModalContext);
  const [isProcessingTasks, setIsProcessingTasks] = useState(false);
  const lastModalOpened = useRef<TaskManagementModals>(null);

  const { referenceBobject, selectedOpportunityObject } = machineContext;
  const bobject = selectedOpportunityObject ?? referenceBobject;
  const {
    hasCadenceSteps,
    hasNextSteps,
    mutate,
    clusters,
    isLoading,
    ...currentTasksProps
  } = useCurrentTasks(bobject?.id);

  const getStepState = () => {
    if (hasCadenceSteps) {
      return TaskActionStates.CadenceOnGoing;
    } else if (hasNextSteps) {
      return TaskActionStates.NextSteps;
    } else {
      return TaskActionStates.NoTasks;
    }
  };

  useEventSubscription(EventTypes.Cadence, (data: WebSocketEvent<EventTypes.Cadence>['data']) => {
    if (bobject?.id?.value === data?.bobjectId && data?.operation === 'SCHEDULED') {
      mutate();
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Task },
        }),
      );
      setIsProcessingTasks(false);
    }
  });

  const resetModalContext = (softReset = false) => {
    setModalContext(defaultModalContext);
    if (!softReset) lastModalOpened.current = null;
  };

  return (
    <TaskManagementContext.Provider
      value={{
        bobject,
        t,
        modalContext,
        setModalContext: (modalContext: ModalContextType) => {
          setModalContext(modalContext);
          lastModalOpened.current = modalContext?.modal;
        },
        lastModalOpened,
        handleSaveCadence: (timeout = 10000) => {
          setIsProcessingTasks(true);
          setTimeout(() => {
            setIsProcessingTasks(false);
          }, timeout);
        },
        handleSaveModal: (timeout = 10) => {
          setIsProcessingTasks(true);
          setTimeout(() => {
            mutate().then(() => {
              window.dispatchEvent(
                new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                  detail: { type: BobjectTypes.Task },
                }),
              );
              setIsProcessingTasks(false);
              resetModalContext();
            });
          }, timeout);
        },
        handleCloseModal: (softReset?: boolean) => resetModalContext(softReset),
        stepState: getStepState(),
        currentTasksProps: {
          ...currentTasksProps,
          mutate: () => {
            lastModalOpened.current = null;
            mutate();
          },
          clusters,
          hasCadenceSteps,
          isLoading: isLoading || isProcessingTasks,
        },
        machineContext,
        ...props,
      }}
    >
      {children}
    </TaskManagementContext.Provider>
  );
};

export const useTaskManagementContext = (): TaskManagementContextType => {
  const context = useContext(TaskManagementContext);

  if (context === undefined) {
    throw new Error('useTaskManagement must be used within the modal provider');
  }

  return context;
};
