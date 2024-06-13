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
import { CustomTask, TASK_FIELDS_LOGIC_ROLE, BobjectTypes, Bobject } from '@bloobirds-it/types';
import { isScheduledTask } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { bobjectUrl } from '../../../../app/_constants/routes';
import { useContextMenu, useRouter } from '../../../../hooks';
import { CardVariant } from '../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import { getFieldByLogicRole, getReferencedBobject } from '../../../../utils/bobjects.utils';
import { useSubhomeContext } from '../../subhomeContext';
import styles from './card.module.css';
import { SalesCardBody } from './salesCardBody';
import { CardButtons } from './subcomponents/cardButtons';

interface SalesSubhomeCardProps {
  bobject: Bobject;
  fieldsArray?: Array<string>;
  dataTest?: string;
  hasNextCard?: boolean;
  isCompleted?: boolean;
  variant?: keyof typeof CardVariant;
  extraButtons?: React.ReactNode[];
  extraDropdownButtons?: React.ReactNode[];
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

export const SalesSubhomeCard = ({
  bobject,
  fieldsArray,
  dataTest = bobject?.id?.objectId,
  hasNextCard = false,
  isCompleted = false,
  variant,
  rectVirtualList,
  customTasks,
}: SalesSubhomeCardProps) => {
  const isTaskCard = bobject?.id?.typeName === BobjectTypes.Task;
  const { selectOneItem, selectedItems } = useSubhomeContext();
  const { history } = useRouter();

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

  const handleOnClick = (e: any) => {
    const referencedBobject = isTaskCard ? getReferencedBobject(bobject) : bobject;
    const url = referencedBobject && bobjectUrl(referencedBobject);
    history.push(url, { event: e });
  };

  const isScheduled = isScheduledTask(bobject);
  const customTaskId = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);
  const classname = customTask
    ? styles._with_custom_task_container
    : clsx(styles._container, styles[variant]);
  return (
    <div
      data-test={`Card-Subhome-${dataTest}`}
      className={classname}
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
                  selectOneItem(bobject);
                }}
              />
            </div>
          </CardLeft>
          <SalesCardBody
            bobject={bobject}
            fieldsArray={fieldsArray}
            customTask={customTask}
            contextMenuProps={{
              xPos,
              yPos,
              isContextMenuVisible,
              hideContextMenu,
            }}
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
};
