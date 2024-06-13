import { useTranslation } from 'react-i18next';

import { CardButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount, useSubhomeContext } from '@bloobirds-it/hooks';
import { BobjectTypes, MIXPANEL_EVENTS, TASK_TYPE } from '@bloobirds-it/types';
import { api, injectReferencedBobjects } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import { useTaskFeedContext } from '../../../../../utils/useTasksTab';
import { TaskFeedTask } from '../../../types/taskFeed.type';

export const RescheduleTaskButton = ({ task }: { task: TaskFeedTask }) => {
  const isB2CAccount = useIsB2CAccount();
  const { setOpenedModalInfo } = useTaskFeedContext();
  const { t } = useTranslation();
  //TODO study different way to do this
  const { data: cadenceEntities } = useSWR('/taskFeed/cadences', () =>
    api
      .get(
        `/messaging/cadences/?bobjectTypes=${!isB2CAccount ? BobjectTypes.Company : ''},${
          BobjectTypes.Lead
        },${BobjectTypes.Opportunity}`,
      )
      .then(response => response.data),
  );

  const cadenceEntity = cadenceEntities?.cadences.find(
    (cadenceElement: { id: string }) => cadenceElement?.id === task.cadenceId,
  );
  const isNextStep = task.type === TASK_TYPE.NEXT_STEP;
  const shouldDisplayButton = cadenceEntity?.reschedulableMode === 'RESCHEDULABLE' || isNextStep;

  return (
    shouldDisplayButton && (
      <Tooltip title={t('extension.card.rescheduleTask')} position="top">
        <CardButton
          dataTest="task-reschedule"
          iconLeft="clock"
          variant="secondary"
          color="bloobirds"
          onClick={async e => {
            e?.stopPropagation();
            e?.preventDefault();
            const taskBobject = await api.get(`/bobjects/${task?.id}/form?injectReferences=true`);
            mixpanel.track(MIXPANEL_EVENTS.HOME_RESCHEDULE_ACTION_CLICKED_ON_SINGLE_CARD);
            setOpenedModalInfo({
              type: 'reschedule',
              bobject: injectReferencedBobjects(taskBobject?.data),
            });
          }}
          size="small"
        />
      </Tooltip>
    )
  );
};
