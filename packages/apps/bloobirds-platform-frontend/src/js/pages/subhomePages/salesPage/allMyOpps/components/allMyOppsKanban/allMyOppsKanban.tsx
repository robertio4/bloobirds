import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { mutate } from 'swr';
import mixpanel from 'mixpanel-browser';
import clsx from 'clsx';
import styles from '../../allMyOpps.module.css';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../../../constants/opportunity';
import { useEntity, useOpportunity } from '../../../../../../hooks';
import { AllMyOppsKanbanColumn } from './allMyOppsKanbanColumn';
import { useKanbanAllOpps } from '../../hooks/useSalesKanbanItems';
import useAssignUser from '../../../../../../hooks/useAssignUser';
import AssignUserModal from '../../../../../../components/assignUserModal/assignUserModal';
import { useUserSettings } from '../../../../../../components/userPermissions/hooks';
import { MIXPANEL_EVENTS } from '../../../../../../constants/mixpanel';
import { BobjectPicklistValueEntity } from '../../../../../../typings/entities.js';
import { useSubhome } from '../../../../../../layouts/subhomeLayout/subhomeLayout';

interface DragEndResult {
  combine: any;
  destination: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
  mode: string;
  reason: string;
  source: {
    droppableId: string;
    index: number;
  };
  type: string;
}

export const AllMyOppsKanban = () => {
  const opportunityStatusField = useEntity('bobjectFields')?.findByLogicRole(
    OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  );
  const { isOpen: isUserAssignModalOpen } = useAssignUser();
  const { updateOpportunity } = useOpportunity();
  const { moveOpp } = useKanbanAllOpps();
  const settings = useUserSettings();
  const { showStats } = useSubhome();
  const opportunityStatuses = useEntity('bobjectPicklistFieldValues')
    ?.filterBy('bobjectField')(opportunityStatusField?.id)
    ?.filter(st => st?.enabled)
    ?.sort((a, b) => a?.ordering - b?.ordering);
  const [columnDragged, setColumnDragged] = useState();
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (start: any) => {
    setIsDragging(true);
    setColumnDragged(start.source.droppableId);
  };

  const onDragEnd = (result: DragEndResult) => {
    setIsDragging(false);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      return;
    }
    moveOpp(draggableId, source.droppableId, destination.droppableId);
    updateOpportunity(draggableId, {
      [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: destination.droppableId,
    }).then(() => {
      mutate(
        '/bobjects/' + settings?.account.id + '/Opportunity/aggregation/' + destination.droppableId,
      );
      mutate(
        '/bobjects/' + settings?.account.id + '/Opportunity/aggregation/' + source.droppableId,
      );
    });
  };

  return (
    <div
      className={clsx(styles._kanban_container, {
        [styles._kanban_container_with_stats]: showStats,
        [styles._kanban_container_without_stats]: !showStats,
      })}
    >
      <DragDropContext
        onDragEnd={(result: any) => {
          mixpanel.track(MIXPANEL_EVENTS.CHANGE_STAGE_ACTION_CLICKED_ON_ALL_MY_OPPS_KANBAN_TAB, {
            'Drag result': result,
          });
          onDragEnd(result);
        }}
        onDragStart={onDragStart}
      >
        {opportunityStatuses?.map((st: BobjectPicklistValueEntity) => {
          return (
            <AllMyOppsKanbanColumn
              status={st}
              key={st?.id}
              columnDragged={columnDragged}
              isDragging={isDragging}
            />
          );
        })}
      </DragDropContext>
      {isUserAssignModalOpen && <AssignUserModal />}
    </div>
  );
};
