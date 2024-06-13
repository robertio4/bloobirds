import { useState } from 'react';
import Draggable from 'react-draggable';

import { useMinimizableModal, useMinimizableModals } from '@bloobirds-it/hooks';
import { TaskForm, useTaskForm } from '@bloobirds-it/tasks';
import clsx from 'clsx';

import { useDraggablePosition } from '../../../hooks/useDraggablePosition';
import { BubbleWindow } from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import { DraggableTopBar } from '../draggableTopBar/draggableTopBar';
import styles from './taskModal.module.css';

export const TaskModal = ({ id }: { id: string }) => {
  const {
    data: { location },
  } = useMinimizableModal<{ location: 'bubble' | 'leftBar' }>(id);

  const taskFormHookValues = useTaskForm(id);
  const { handleMinimize, handleClose } = taskFormHookValues || {};
  const { minimizableModals } = useMinimizableModals();
  const notesOpened = minimizableModals?.filter(modal => modal?.open && modal?.type === 'task')
    ?.length;

  const { useGetExtendedContext, useGetSidePeekEnabled } = useExtensionContext();
  const isExtendedOpened = useGetExtendedContext()?.open;
  const sidePeekEnabled = useGetSidePeekEnabled();
  const [dragging, setDragging] = useState<boolean>();

  const { position, setPosition, bounds } = useDraggablePosition(
    id,
    {
      width: 320,
      height: 280,
    },
    (notesOpened + 1) * 20,
    location,
    isExtendedOpened ? (sidePeekEnabled ? 398 : 348) : 8,
  );

  const wrapperClasses = clsx(styles.wrapper, { [styles.dragging]: dragging });

  return (
    <div className={wrapperClasses}>
      <Draggable
        handle={'#note' + id}
        position={position}
        bounds={bounds}
        onStart={() => setDragging(true)}
        onStop={() => setDragging(false)}
        onDrag={(e, data) => {
          setPosition({ x: data.x, y: data.y });
        }}
      >
        <div className={styles.container} onClick={event => event.stopPropagation()}>
          <DraggableTopBar
            dragging={dragging}
            id={id}
            onClose={handleClose}
            onMinimize={() => {
              handleMinimize();
            }}
          />
          <BubbleWindow height={230}>
            <TaskForm modalId={id} {...taskFormHookValues} />
          </BubbleWindow>
        </div>
      </Draggable>
    </div>
  );
};
