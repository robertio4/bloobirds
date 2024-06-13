import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  MessagesEvents,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
} from '@bloobirds-it/types';
import { isImportantTask } from '@bloobirds-it/utils';
import { useSWRConfig } from 'swr';

import { api } from '../../../../utils/api';
import { getFieldByLogicRole } from '../../../../utils/bobjects.utils';
import styles from '../../contactView/components/miniCard/miniCard.module.css';
import { useExtensionContext } from '../../context';

export const PriorityTaskButton = ({ bobject: task }) => {
  const { t } = useTranslation();
  const { useGetActiveBobject } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const { createToast } = useToasts();
  const { cache: swrCache } = useSWRConfig();
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;

  const handleChangePriority = e => {
    e.preventDefault();
    e.stopPropagation();
    api
      .patch(`/bobjects/${task?.id.value}/raw`, {
        contents: {
          [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: isImportantTask(task)
            ? TASK_PRIORITY_VALUE.NO_PRIORITY
            : TASK_PRIORITY_VALUE.IMPORTANT,
        },
        params: {
          skipEmptyUpdates: true,
        },
      })
      .then(() => {
        createToast({ type: 'success', message: t('extension.card.toasts.changesSaved.success') });
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
        if (
          (activeBobject?.id.typeName === BobjectTypes.Lead && company) ||
          (activeBobject?.id.typeName === BobjectTypes.Company && lead)
        ) {
          const bobjectToClear = activeBobject?.id.typeName === BobjectTypes.Lead ? company : lead;
          swrCache.delete(`/tasksFeed/${bobjectToClear?.id?.value}/1`);
        }
      });
  };
  return (
    <Tooltip
      title={t(`extension.card.${isImportantTask(task) ? 'unmarkAsImportant' : 'markAsImportant'}`)}
      position="top"
    >
      <Button
        dataTest={styles.iconButton}
        size="small"
        variant="secondary"
        onClick={handleChangePriority}
      >
        <Icon name="flagFilled" size={12} color="bloobirds" />
      </Button>
    </Tooltip>
  );
};
