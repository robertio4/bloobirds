import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  Icon,
  IconButton,
  Input,
  Switch,
  Tag,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { CustomTask, CustomTaskField } from '@bloobirds-it/types';

import { EntityCardItem } from '../../../../../components/entityList/entityCard/entityCard';
import { IconPicker } from '../../../../../components/iconPicker/iconPicker';
import { useEntity } from '../../../../../hooks';
import { api } from '../../../../../utils/api';
import styles from '../../businessAssetsPage.module.css';
import { CustomTaskFieldsModal } from '../customTaskFieldsModal/customTaskFieldsModal';
import { pickableIcons } from '../customTasks.constants';
import { useCustomTaskCreation } from '../hooks/useCustomTaskCreation';

interface CustomTaskCardProps {
  customTask: CustomTask;
  isNew?: boolean;
  clickOutside?: boolean;
  onCardUpdated: (customTask: CustomTask) => void;
  onDisable: (customTask: CustomTask) => void;
}

export const CustomTaskCard = ({
  customTask,
  isNew = false,
  onCardUpdated,
  clickOutside,
  onDisable,
}: CustomTaskCardProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(isNew);
  const [task, setTask] = useState<CustomTask>(customTask);
  const [error, setError] = useState<{ name?: string; description?: string; icon?: boolean }>({});
  const [showHiddenFields, setShowHiddenFields] = useState(false);
  const { setCustomTaskCreation } = useCustomTaskCreation();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.customTasks' });
  const { t: commonT } = useTranslation();

  const handleToggleEnabled = (value: boolean) => {
    if (!value) {
      onDisable(customTask);
    } else {
      updateTask('enabled', value);
      enableTask(task.id, value);
    }
  };

  useEffect(() => {
    if (!isNew && edit) {
      setEdit(false);
    }
  }, [clickOutside]);

  const refName = useRef<HTMLInputElement>();
  const refDesc = useRef<HTMLInputElement>();
  const revertChanges = useCallback(() => {
    if (isNew) {
      setCustomTaskCreation(false);
    }
    setTask(customTask);
    setError({});
    setEdit(false);
    refName?.current?.blur();
    refDesc?.current?.blur();
  }, [refName, customTask]);

  const updateTask = (key: keyof CustomTask, value: any) => {
    setTask({ ...task, [key]: value });
  };

  const handleFieldsUpdate = (fields: CustomTaskField[]) => {
    saveCard({
      ...task,
      fields: fields.map((f, index) => ({ ...f, ordering: fields.length - index - 1 })),
    });
  };

  const saveCard = async (taskToSave: CustomTask) => {
    let updatedTask: CustomTask;
    if (!taskToSave.name || !taskToSave.description || taskToSave.icon === 'questionCircle') {
      setError({
        name: taskToSave.name ? undefined : t('mustHaveName'),
        description: taskToSave.description ? undefined : t('mustHaveDescription'),
        icon: taskToSave.icon === 'questionCircle',
      });
    } else {
      if (taskToSave.id) {
        const { data } = await api.patch<CustomTask>(
          `/utils/customTask/${taskToSave.id}`,
          {
            ...taskToSave,
            fields: taskToSave.fields ?? [],
          },
          { params: { id: taskToSave.id } },
        );
        updatedTask = data;
      } else {
        const { data } = await api.post<CustomTask>('/utils/customTask', {
          ...taskToSave,
          ordering: 0,
          fields: taskToSave.fields ?? [],
        });

        updatedTask = data;
      }

      setEdit(false);
      setTask({ ...updatedTask });
      setError({});
      onCardUpdated(updatedTask);
    }
  };

  const enableTask = (customTaskId: string, enabled: boolean) => {
    const url = `/utils/customTask/${enabled ? 'enable' : 'disable'}/${customTaskId}`;

    api.patch<CustomTask>(url, {}, { params: { id: customTaskId } }).then(response => {
      setTask({ ...response.data });
      onCardUpdated(response.data);
    });
  };

  const bobjectFields = useEntity('bobjectFields');

  const { logicRole } = customTask;

  return (
    <>
      <>
        <EntityCardItem>
          <Icon name="dragAndDrop" size={24} color="softPeanut" />
          {edit && !logicRole ? (
            <IconPicker
              selectedIcon={{ name: customTask.icon, color: customTask.iconColor }}
              onSelectIcon={pick => {
                setTask({ ...task, icon: pick.name, iconColor: pick.color });
              }}
              hasError={error.icon}
              pickableIcons={pickableIcons}
            />
          ) : logicRole ? (
            <Tooltip title={logicRole && t('cannotChangeIcon')} position="top">
              <Icon name={task.icon} color={task.iconColor} size={24} />
            </Tooltip>
          ) : (
            <IconButton
              name={task.icon}
              color={task.iconColor}
              size={24}
              onClick={() => setEdit(true)}
            />
          )}
          {!logicRole ? (
            <Input
              innerRef={refName}
              size="small"
              width="300px"
              placeholder={t('placeholderTitle')}
              transparent={!edit}
              value={task.name}
              onChange={value => updateTask('name', value)}
              onFocus={() => setEdit(true)}
              error={error.name}
            />
          ) : (
            <Tooltip title={t('cannotChangeTitle')} position="top">
              <div className={styles.taskNameDisabled}>
                <Text size="xs">{task.name}</Text>
              </div>
            </Tooltip>
          )}
        </EntityCardItem>
        <EntityCardItem>
          <Input
            innerRef={refDesc}
            size="small"
            width="450px"
            placeholder={t('placeholderDescription')}
            transparent={!edit}
            value={task.description}
            onChange={value => updateTask('description', value)}
            onFocus={() => setEdit(true)}
            error={error.description}
          />
        </EntityCardItem>
        <EntityCardItem>
          {(!customTask?.fields || customTask?.fields?.length === 0 || edit) && (
            <Button
              variant="clear"
              iconLeft="add"
              uppercase={false}
              onClick={() => setOpenModal(true)}
            >
              {!customTask?.fields || customTask?.fields?.length === 0
                ? commonT('common.add')
                : commonT('common.edit')}
            </Button>
          )}

          <div className={styles.customTaskFields}>
            {task.fields
              .slice(0, showHiddenFields ? task.fields.length : 2)
              .sort((a, b) => b.ordering - a.ordering)
              .map(field => (
                <Tag uppercase={false} key={field.bobjectFieldId}>
                  <Text size="s" ellipsis={35}>
                    {bobjectFields?.get(field.bobjectFieldId)?.name}
                  </Text>
                  {field.required && <Icon name="required" size={16} />}
                </Tag>
              ))}
            <span className={styles.taskFieldsCounter} onClick={() => setShowHiddenFields(true)}>
              {!showHiddenFields && task.fields.length > 2 && `+${task.fields.slice(2).length}`}
            </span>
          </div>
        </EntityCardItem>
        {edit && (
          <>
            <EntityCardItem>
              <Checkbox
                checked={task.shouldCreateActivity}
                onClick={value => updateTask('shouldCreateActivity', value)}
              >
                Should Create Activity
              </Checkbox>
            </EntityCardItem>
            <EntityCardItem>
              <Checkbox checked={task.reminder} onClick={value => updateTask('reminder', value)}>
                Reminder
              </Checkbox>
            </EntityCardItem>
          </>
        )}
        {!edit && (
          <>
            <EntityCardItem>
              {task.shouldCreateActivity && <Icon name="check" size={24} color="softPeanut" />}
            </EntityCardItem>
            <EntityCardItem>
              {task.reminder && <Icon name="check" size={24} color="softPeanut" />}
            </EntityCardItem>
          </>
        )}
        <EntityCardItem size="small">
          <span className={styles._status__span}>
            {edit ? (
              <>
                <span className={styles._status__span}>
                  <Button color="purple" size="small" onClick={() => saveCard(task)}>
                    {commonT('common.save')}
                  </Button>
                  <IconButton color="purple" onClick={revertChanges} name="undoRevert" size={24} />
                </span>
              </>
            ) : (
              <>
                <Switch checked={task.enabled} color="purple" onChange={handleToggleEnabled} />
                <IconButton
                  color="purple"
                  onClick={() => {
                    setEdit(true);
                  }}
                  name={commonT('common.edit')}
                  size={24}
                />
              </>
            )}
          </span>
        </EntityCardItem>
      </>
      {openModal && (
        <CustomTaskFieldsModal
          onClose={() => setOpenModal(false)}
          customTaskFields={task.fields}
          onSave={handleFieldsUpdate}
        />
      )}
    </>
  );
};
