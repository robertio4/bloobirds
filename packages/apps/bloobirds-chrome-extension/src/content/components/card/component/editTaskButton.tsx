import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { getFieldByLogicRole } from '../../../../utils/bobjects.utils';
import { MIXPANEL_EVENTS } from '../../../../utils/mixpanel';
import { useExtensionContext } from '../../context';

export const EditTaskButton = ({ bobject: task }) => {
  const { t } = useTranslation();
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const { openMinimizableModal } = useMinimizableModals();
  const { setContactViewBobjectId, setCurrentTask } = useExtensionContext();

  const openTaskModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    mixpanel.track(MIXPANEL_EVENTS.BUBBLE_HOME_EDIT_TASK_ACTION_CHROME_EXTENSION);

    if (opportunity) {
      setContactViewBobjectId(opportunity?.id.value);
    } else if (lead) {
      setContactViewBobjectId(lead?.id.value);
    } else if (company) {
      setContactViewBobjectId(company?.id.value);
    } else {
      setCurrentTask(task);
    }
    openMinimizableModal({
      type: 'task',
      data: {
        [task?.id.typeName.toLowerCase()]: task,
        location: 'bubble',
        bobjectId: task?.id?.value,
        company,
        lead,
        opportunity,
      },
    });
  };

  return (
    <Tooltip title={t('extension.card.editTaskButton')} position="top">
      <CardButton
        dataTest="task-edit"
        iconLeft="edit"
        variant="secondary"
        color="bloobirds"
        onClick={openTaskModal}
        size="small"
      />
    </Tooltip>
  );
};
