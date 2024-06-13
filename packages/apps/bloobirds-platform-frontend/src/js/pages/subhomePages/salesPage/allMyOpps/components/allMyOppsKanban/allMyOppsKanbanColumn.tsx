import React, { useMemo, useRef } from 'react';
// @ts-ignore
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Button, Label, Skeleton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { useEntity } from '../../../../../../hooks';
import { BobjectPicklistValueEntity } from '../../../../../../typings/entities.js';
import { parseAmount, shortenAmount } from '../../../../../../utils/amount.utils';
import styles from '../../allMyOpps.module.css';
import {
  useOpportunityAggregationAmount,
  useSalesKanbanItems,
} from '../../hooks/useSalesKanbanItems';
import { AllMyOppsKanbanCard } from './allMyOppsKanbanCard';
import { Bobject, BobjectTypes } from "@bloobirds-it/types";

export const AllMyOppsKanbanColumn = ({
  status,
  columnDragged,
  isDragging,
}: {
  status: BobjectPicklistValueEntity;
  columnDragged: string;
  isDragging: boolean;
}) => {
  const {
    items: opportunities,
    isLoading,
    totalMatching,
    handleNextPage,
  }: {
    items: Bobject<BobjectTypes.Opportunity>[];
    isLoading: boolean;
    totalMatching: number;
    handleNextPage: () => void;
  } = useSalesKanbanItems(status?.id);
  const bobjectFields = useEntity('bobjectFields');
  const amountFieldPrefix = useMemo(
    () => bobjectFields.findByLogicRole('OPPORTUNITY__AMOUNT')?.layoutNumberPrefix,
    [bobjectFields],
  );
  // @ts-ignore
  const opportunitiesList: Bobject[] = opportunities?.[status?.id];
  const oppsLength = opportunitiesList?.length;
  const anotherColumnDragged = columnDragged !== status?.id;
  const stillNotVisible = totalMatching - oppsLength;
  const amountData = useOpportunityAggregationAmount(status?.id);
  const weightedPercentage = status?.weightedPercentage;
  const showWeighted = !!weightedPercentage && weightedPercentage > 0 && weightedPercentage < 100;
  const weightedAmount =
    showWeighted && !!amountData
      ? (Number.parseFloat(amountData) * weightedPercentage) / 100
      : undefined;
  const parentRef = useRef();

  return (
    <Droppable
      droppableId={status?.id}
      key={status?.id}
      isDropDisabled={status?.id === columnDragged}
    >
      {(provided: any) => {
        return (
          <div
            className={styles._column_container}
            key={status?.id}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className={styles._title_column_container}>
              <Tooltip title={status?.value} position="top">
                <Label
                  overrideStyle={{
                    backgroundColor: status?.backgroundColor,
                    paddingRight: '8px',
                    paddingLeft: '8px',
                  }}
                  uppercase={false}
                  inline={false}
                >
                  <Text
                    size="xs"
                    color={status?.textColor === '#ffffff' ? 'white' : 'peanut'}
                    align="center"
                    className={styles._status_value}
                    ellipsis={23}
                  >
                    {status?.value}
                  </Text>
                  <Text color={status?.textColor === '#ffffff' ? 'white' : 'peanut'} size="xs">
                    {totalMatching}
                  </Text>
                </Label>
              </Tooltip>
              <div className={styles._total_column}>
                <Text color="peanut" size="l">
                  {amountData ? (
                    <div className={styles._total_column_header_amount}>
                      <div className={styles._total_column_header_amount_row}>
                        <Tooltip
                          title={`${amountFieldPrefix} ${parseAmount(amountData, 2, 0)}`}
                          position="top"
                        >
                          <Text
                            color="peanut"
                            size="l"
                            className={styles._amount_text}
                          >{`${amountFieldPrefix} ${parseAmount(amountData, 2, 0)}`}</Text>
                        </Tooltip>
                      </div>
                      {showWeighted ? (
                        <div className={styles._total_column_header_amount_row}>
                          <Tooltip
                            title={`Weighted Percentage for this stage: ${weightedPercentage}%
                          Weighted amount: ${amountFieldPrefix} ${parseAmount(weightedAmount, 2)}`}
                            position="top"
                          >
                            <Text
                              color="peanut"
                              size="s"
                            >{`Weighted - ${amountFieldPrefix} ${shortenAmount(
                              weightedAmount,
                              3,
                            )}`}</Text>
                          </Tooltip>
                        </div>
                      ) : (
                        <div className={styles._empty_amount_percentage} />
                      )}
                    </div>
                  ) : (
                    <div className={styles._empty_amount} />
                  )}
                </Text>
              </div>
            </div>
            <div
              className={clsx(styles._content_column_container, {
                [styles._content_column_container_dragging]: anotherColumnDragged && isDragging,
              })}
              ref={parentRef}
            >
              {!isLoading ? (
                <>
                  {anotherColumnDragged && isDragging ? (
                    <></>
                  ) : (
                    <>
                      {opportunitiesList?.map((opp: Bobject, index: number) => {
                        return (
                          <Draggable
                            key={opp?.id?.objectId}
                            draggableId={opp?.id?.objectId}
                            index={index}
                          >
                            {(prov: any) => {
                              return (
                                <AllMyOppsKanbanCard
                                  myOpp={opp}
                                  ref={prov.innerRef}
                                  amountPrefix={amountFieldPrefix}
                                  {...prov.draggableProps}
                                  {...prov.dragHandleProps}
                                />
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {oppsLength < totalMatching && (
                        <Button
                          variant="clear"
                          size="small"
                          onClick={handleNextPage}
                          uppercase={false}
                          className={styles.show_more_button}
                        >
                          Show {stillNotVisible > 20 ? '20' : stillNotVisible} more
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className={styles._card_kanban__skeleton}>
                  <Skeleton width="100%" variant="rect" height="100px" />
                  <Skeleton width="100%" variant="rect" height="100px" />
                  <Skeleton width="100%" variant="rect" height="100px" />
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};
