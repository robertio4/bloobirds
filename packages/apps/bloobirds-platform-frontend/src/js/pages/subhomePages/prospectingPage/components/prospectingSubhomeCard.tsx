import React from 'react';

import {
  Card,
  CardBody,
  CardCheckbox,
  CardHeader,
  CardLeft,
  ColorType,
  Text,
  useDelayedHover,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes, CustomTask, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { isScheduledTask } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { bobjectUrl } from '../../../../app/_constants/routes';
import { useContextMenu, useRouter } from '../../../../hooks';
import { CardVariant } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import styles from '../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard.module.css';
import { getFieldByLogicRole } from '../../../../utils/bobjects.utils';
import { getTaskReferenceBobject } from '../../../../utils/tasks.utils';
import { CardButtons } from '../../components/subhomeCards/subcomponents/cardButtons';
import { useTaskInfo } from '../../components/subhomeCards/subcomponents/taskRelatedBobject.utils';
import { useSubhomeContext } from '../../subhomeContext';
import { ProspectingCardBody } from './prospectingCardBody';

interface NewSubhomeCardProps {
  bobject: Bobject;
  dataTest?: string;
  hasNextCard?: boolean;
  isCompleted?: boolean;
  variant?: keyof typeof CardVariant;
  extraButtons?: React.ReactNode[];
  extraDropdownButtons?: React.ReactNode[];
  fieldsArray?: Array<string>;
  rectVirtualList?: DOMRect;
  customTasks?: CustomTask[];
}

const VARIANT_STYLES = {
  error: {
    backgroundColor: '#fcdfe4',
    borderColor: 'verySoftTomato',
  },
  warning: {
    backgroundColor: '#fdeade',
    borderColor: 'verySoftBanana',
  },
  info: {
    backgroundColor: 'lighterGray',
    borderColor: 'veryLightBloobirds',
  },
};

export const ProspectingSubhomeCard = React.memo(
  ({
    bobject,
    dataTest = bobject?.id?.objectId,
    hasNextCard = false,
    isCompleted = false,
    variant,
    fieldsArray,
    rectVirtualList,
    customTasks,
  }: NewSubhomeCardProps) => {
    const { selectOneItem, selectedItems } = useSubhomeContext();
    const { history } = useRouter();
    const referenceBobject = getTaskReferenceBobject(bobject as Bobject<BobjectTypes.Task>);
    const { getCanBeMarkedAsDone, getCadenceEntity } = useTaskInfo(bobject);
    const { disabled } = getCanBeMarkedAsDone();
    const isReschedulable = getCadenceEntity()?.reschedulableMode === 'RESCHEDULABLE';

    const {
      ref: refContextMenu,
      xPos,
      yPos,
      isContextMenuVisible,
      handleContextMenu,
      hideContextMenu,
    } = useContextMenu();
    const variantStyles = variant
      ? VARIANT_STYLES[variant]
      : { backgroundColor: undefined, borderColor: undefined };

    const [isHovering, hoverProps] = useDelayedHover();
    const isChecked = selectedItems.some(item => item?.id?.objectId === bobject?.id.objectId);
    const isScheduled = isScheduledTask(bobject);

    const url = bobjectUrl(referenceBobject || bobject);

    const handleOnClick = (e: any) => {
      history.push(url, { event: e });
    };

    const customTaskId = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
    const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);
    return (
      <div
        data-test={`Card-Subhome-${dataTest}`}
        className={clsx(styles._container, styles[variant])}
        onContextMenu={e => handleContextMenu(e, rectVirtualList)}
        ref={refContextMenu}
        {...hoverProps}
      >
        <Card
          expand
          completed={isCompleted}
          onClick={handleOnClick}
          backgroundColor={variantStyles?.backgroundColor as ColorType}
          borderColor={variantStyles?.borderColor as ColorType}
        >
          <CardHeader>
            <CardLeft>
              <div className={styles._check_wrapper}>
                <CardCheckbox
                  size="small"
                  checked={isChecked}
                  onClick={(value, event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    selectOneItem({
                      ...bobject,
                      disabled,
                      reschedulable: isReschedulable,
                    } as Bobject);
                  }}
                />
              </div>
            </CardLeft>
            <ProspectingCardBody
              key={`card-body-${bobject?.id?.objectId}`}
              bobject={bobject}
              contextMenuProps={{
                xPos,
                yPos,
                isContextMenuVisible,
                hideContextMenu,
              }}
              customTask={customTask}
              fieldsArray={fieldsArray}
            />
            {selectedItems?.length === 0 && isHovering ? (
              <CardButtons bobject={bobject} isHovering={isHovering} customTask={customTask} />
            ) : (
              <></>
            )}
          </CardHeader>
          {customTask && !isScheduled ? (
            <CardBody>
              <div className={styles.card_description}>
                <Text size="xs" weight="bold">
                  Description:
                </Text>
                <Text size="xs">{customTask.description}</Text>
              </div>
            </CardBody>
          ) : (
            <></>
          )}
        </Card>
        {hasNextCard && <div className={styles._dashed_line} />}
      </div>
    );
  },
);
