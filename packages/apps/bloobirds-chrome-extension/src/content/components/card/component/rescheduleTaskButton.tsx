import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { useCadences } from '../../../../hooks/useCadences';
import {
  getFieldByLogicRole,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { MIXPANEL_EVENTS } from '../../../../utils/mixpanel';
import { useSubhomeContext } from '../../extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout';

export const RescheduleTaskButton = ({
  bobject: task,
}: {
  bobject: Bobject<BobjectTypes.Task>;
}) => {
  const { setOpenedModalInfo } = useSubhomeContext();
  const { t } = useTranslation();

  const getTaskActiveStatus = () => {
    const taskStatus = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
    const isCompleted =
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED === taskStatus ||
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE === taskStatus;
    const isRejected = TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED === taskStatus;
    const isProspect =
      // @ts-ignore
      getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
      TASK_TYPE.PROSPECT_CADENCE;
    return isProspect && !isCompleted && !isRejected;
  };

  const getCadenceEntity = () => {
    const taskRelatedBobjectType = getRelatedBobjectTypeName(task);
    const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);
    const { cadences: cadencesEntities } = useCadences(taskRelatedBobjectType);
    return cadencesEntities?.find(
      (cadenceElement: { id: string }) => cadenceElement?.id === cadenceId,
    );
  };

  const isActiveTask = getTaskActiveStatus();
  const cadenceEntity = getCadenceEntity();
  const isNextStep =
    (getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE).valueLogicRole as string) ===
    TASK_TYPE.NEXT_STEP;
  const shouldDisplayButton =
    (cadenceEntity?.reschedulableMode === 'RESCHEDULABLE' && isActiveTask) || isNextStep;

  return (
    shouldDisplayButton && (
      <Tooltip title={t('extension.card.rescheduleTask')} position="top">
        <CardButton
          dataTest="task-reschedule"
          iconLeft="clock"
          variant="secondary"
          color="bloobirds"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            mixpanel.track(MIXPANEL_EVENTS.HOME_RESCHEDULE_ACTION_CLICKED_ON_SINGLE_CARD);
            setOpenedModalInfo({ openedModal: 'reschedule', bobject: task });
          }}
          size="small"
        />
      </Tooltip>
    )
  );
};
