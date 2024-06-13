import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import { BobjectTypes, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../../../../../../../../../../context';
import { TaskFeedTask } from '../../../../../../types';

export const EditTaskButton = ({ task }: { task: TaskFeedTask }) => {
  const { t } = useTranslation();
  const company = task.company;
  const lead = task.lead;
  const opportunity = task.opportunity;
  const { openMinimizableModal } = useMinimizableModals();
  const { setContactViewBobjectId, setCurrentTask } = useExtensionContext();

  const openTaskModal = async (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    mixpanel.track(MIXPANEL_EVENTS.TASK_FEED_EDIT_TASK_ACTION_CHROME_EXTENSION);
    const taskBobject = await api.get(`/bobjects/${task?.id}/form?injectReferences=true`);
    if (opportunity) {
      setContactViewBobjectId(opportunity?.id);
    } else if (lead) {
      setContactViewBobjectId(lead?.id);
    } else if (company) {
      setContactViewBobjectId(company?.id);
    } else {
      setCurrentTask(taskBobject?.data);
    }
    openMinimizableModal({
      type: 'task',
      data: {
        [BobjectTypes.Task.toLowerCase()]: taskBobject?.data,
        location: 'leftBar',
        bobjectId: task?.id,
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
