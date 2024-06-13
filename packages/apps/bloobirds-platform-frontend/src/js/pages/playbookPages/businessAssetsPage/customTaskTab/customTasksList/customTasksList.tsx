import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconType, SortableList, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { CustomTask } from '@bloobirds-it/types';
import classnames from 'clsx';
import { KeyedMutator, useSWRConfig } from 'swr';

import { SearchLogs } from '../../../../../../assets/svg';
import { EntityCard } from '../../../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import { useEntity } from '../../../../../hooks';
import { api } from '../../../../../utils/api';
import styles from '../../businessAssetsPage.module.css';
import { CustomTaskCard } from '../customTasksCard/customTaskCard';
import { DisableCustomTaskModal } from '../disableCustomTaskModal/disableCustomTaskModal';
import { useCustomTaskCreation } from '../hooks/useCustomTaskCreation';

const emptyTask: CustomTask = {
  name: '',
  description: '',
  icon: 'questionCircle',
  iconColor: 'bloobirds',
  enabled: true,
  fields: [],
  logicRole: null,
};

interface CustomTaskListProps {
  customTasks: CustomTask[];
  mutate: KeyedMutator<CustomTask[]>;
}

interface Header {
  label: string;
  icon?: IconType;
  tooltip?: string;
}

const customTaskSort = (a: CustomTask, b: CustomTask) => {
  if (b.enabled && !a.enabled) {
    return 1;
  } else if (!b.enabled && a.enabled) {
    return -1;
  } else {
    return b.ordering - a.ordering;
  }
};

export const CustomTasksList = ({ customTasks, mutate }: CustomTaskListProps) => {
  const { mutate: globalMutate } = useSWRConfig();

  const [modalState, setModalState] = useState<{
    open: boolean;
    cadences: string[];
    steps: { id: string }[];
  }>({ open: false, cadences: [], steps: [] });

  const [customTaskToDisable, setCustomTaskToDisable] = useState<CustomTask>(undefined);
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.customTasks' });

  const [customTasksList, setCustomTasksList] = useState<CustomTask[]>(
    customTasks?.sort(customTaskSort),
  );

  const steps = useEntity('cadenceSteps');
  const cadences = useEntity('cadences');

  const getRelatedCadences = (customTask: CustomTask) => {
    const relatedSteps: { id: string; cadence: string }[] = steps.filterBy(
      'customTask',
      customTask.id,
    );
    const relatedCadences = cadences
      .all()
      .filter(cadence =>
        relatedSteps.map((step: { cadence: string }) => step.cadence).includes(cadence.id),
      );

    return {
      cadences: relatedCadences.map(cadence => cadence.name),
      steps: relatedSteps,
    };
  };

  useEffect(() => {
    setCustomTasksList(customTasks?.sort(customTaskSort));
  }, [customTasks]);

  const { customTaskCreation, setCustomTaskCreation } = useCustomTaskCreation();

  const handleTaskUpdated = () => {
    mutate();
  };

  const handleTaskCreated = (customTask: CustomTask) => {
    setCustomTaskCreation(false);
    setCustomTasksList([customTask, ...customTasksList]);
    mutate();
  };

  const handleUpdateOrder = (customTasks: CustomTask[]) => {
    api
      .post<CustomTask[]>(
        '/utils/customTask/order',
        customTasks.map((task, index) => ({
          customTaskId: task.id,
          ordering: customTasks.length - index - 1,
        })),
      )
      .then(response => {
        setCustomTasksList([...response.data.sort(customTaskSort)]);
      });
  };

  const openDisableModal = (customTask: CustomTask) => {
    const relatedCadences = getRelatedCadences(customTask);
    if (relatedCadences.steps.length > 0) {
      setCustomTaskToDisable(customTask);
      setModalState({ open: true, ...relatedCadences });
    } else {
      disableTask(customTask.id);
    }
  };

  const closeDisableModal = () => {
    setCustomTaskToDisable(undefined);
    setModalState({ open: false, cadences: [], steps: [] });
  };
  const disableTask = (customTaskId: string) => {
    const url = `/utils/customTask/disable/${customTaskId}`;

    api.patch<CustomTask>(url, {}, { params: { id: customTaskId } }).then(response => {
      mutate();
      globalMutate('/entity/cadenceSteps');
    });
  };

  const onDisable = () => {
    disableTask(customTaskToDisable.id);
    closeDisableModal();
  };

  const headerNames: Header[] = [
    {
      label: t('taskIconAndNameHeader'),
    },
    {
      label: t('taskDescriptionHeader'),
    },
    {
      label: t('taskExtraFieldsHeader'),
      icon: 'infoFilled',
      tooltip:
        'A task that has required fields will open a modal to fill them before logging the activity',
    },
    {
      label: t('taskShouldCreateActivity'),
    },
    {
      label: t('taskReminder'),
    },
    {
      label: t('taskStatusHeader'),
    },
  ];

  return (
    <>
      {customTasks || customTaskCreation ? (
        <EntityList>
          {customTasks?.length > 0 || customTaskCreation ? (
            <>
              <EntityListHeader>
                {headerNames.map(header => (
                  <EntityHeaderItem
                    label={header?.label}
                    key={header?.label}
                    order={undefined}
                    onClick={undefined}
                    icon={header.icon}
                    tooltip={header.tooltip}
                  />
                ))}
              </EntityListHeader>
              {customTaskCreation && (
                <EntityCard>
                  <CustomTaskCard
                    customTask={emptyTask}
                    isNew={true}
                    onCardUpdated={handleTaskCreated}
                    onDisable={openDisableModal}
                  />
                </EntityCard>
              )}
              <SortableList
                className={styles._tbody}
                data={customTasksList}
                keyExtractor={tm => tm?.id}
                onReorder={data => {
                  setCustomTasksList([...data]);
                  handleUpdateOrder([...data]);
                }}
                renderItem={({ item, innerRef, containerProps, handleProps, isDragging }) => (
                  <EntityCard
                    ref={innerRef}
                    {...containerProps}
                    {...handleProps}
                    className={classnames(isDragging && styles._card__dragging, styles.taskRow)}
                  >
                    <CustomTaskCard
                      customTask={item}
                      onCardUpdated={handleTaskUpdated}
                      onDisable={openDisableModal}
                    />
                  </EntityCard>
                )}
              />
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                {t('stillNoCustom')}
              </Text>
            </div>
          )}
        </EntityList>
      ) : (
        <Spinner name="dots" />
      )}
      <DisableCustomTaskModal onClose={closeDisableModal} {...modalState} onDisable={onDisable} />
    </>
  );
};
