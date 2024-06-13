import React from 'react';
import { useTranslation } from 'react-i18next';

import { AssignedToSelector, BobjectSelector } from '@bloobirds-it/bobjects';
import {
  Button,
  DatePicker,
  Icon,
  IconButton,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useCustomTasks } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';

import { PrioritySelector } from '../components/prioritySelector/prioritySelector';
import { TaskTypeSelector } from '../components/taskTypeSelector/taskTypeSelector';
import { useTaskForm } from '../hooks/useTaskForm';
import styles from './taskForm.module.css';

interface TaskFormProps extends ReturnType<typeof useTaskForm> {
  modalId: string;
  isWebapp?: boolean;
}

export const TaskForm = ({
  modalId,
  isEditionModal,
  handleDelete,
  title,
  titleOnChange,
  actionType,
  actionTypeOnChange,
  priority,
  priorityOnChange,
  taskDate,
  taskDateOnChange,
  datePickerVisible,
  datePickerRef,
  setDatePickerVisible,
  assignedToId,
  setAssignedToId,
  relatedOnChange,
  nameSelected,
  setNameSelected,
  onSubmit,
  formMethods,
  isWebapp = false,
}: TaskFormProps) => {
  const { isSubmitting, isDirty, handleSubmit } = formMethods;

  const accountId = useActiveAccountId();

  const { customTasks } = useCustomTasks();
  const { t } = useTranslation('translation', { keyPrefix: 'tasks.taskForm' });
  const { t: dateT } = useTranslation('translation', { keyPrefix: 'dates' });

  const handleChangeTaskType = value => {
    actionTypeOnChange(value);
    if (!['TASK', 'CALL', 'EMAIL'].includes(value)) {
      const customTaskDescription = customTasks?.find(task => task.id === value)?.description;
      if (customTaskDescription) {
        titleOnChange(customTaskDescription);
      }
    }
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.editor}>
        <span className={styles.modal_title}>
          <div className={styles._bobject_type_selector}>
            <TaskTypeSelector
              value={actionType}
              onChange={handleChangeTaskType}
              isWebapp={isWebapp}
            />
            <PrioritySelector value={priority} onChange={priorityOnChange} />
          </div>
        </span>
        <span className={styles.divider} />
        <div className={styles.task_info}>
          <span className={styles.task_date}>
            <span className={styles.task_date_title}>
              <Icon name="clock" color="softPeanut" size={16} />
              <Text size="xs" color="softPeanut">
                {t('dueDate')}
              </Text>
            </span>
            <DatePicker
              withTimePicker
              value={taskDate}
              openDefaultValue={taskDate ?? new Date()}
              onChange={taskDateOnChange}
              dropDownRef={datePickerRef}
              visible={datePickerVisible}
              setVisible={setDatePickerVisible}
              dropdownProps={{
                zIndex: 10000,
                anchor: (
                  <span onClick={() => setDatePickerVisible(true)} className={styles.date_button}>
                    <Text size="xs" color="bloobirds" weight="regular">
                      {useGetI18nSpacetime(taskDate).format(dateT('shortMonthFullDate'))}
                    </Text>
                  </span>
                ),
              }}
            />
          </span>
          <span className={styles.task_date}>
            <span className={styles.task_date_title}>
              <Icon name="personAdd" color="softPeanut" size={16} />
              <Text size="xs" color="softPeanut">
                {t('assignedTo')}
              </Text>
            </span>
            <AssignedToSelector assignedToId={assignedToId} updateAssignedTo={setAssignedToId} />
          </span>
        </div>
        <span className={styles.divider} />
        <textarea
          className={clsx(styles.textArea, { [styles.textArea_extended]: isWebapp })}
          value={title}
          placeholder={t('placeholder')}
          onChange={e => titleOnChange(e.target.value)}
          autoFocus
        />
      </div>
      <div>
        <div className={styles.bottom_bar}>
          <span className={styles.record_related}>
            <div className={styles.bobject_selector}>
              <Tooltip title={!isWebapp && nameSelected} position="top">
                <BobjectSelector
                  accountId={accountId}
                  selected={nameSelected}
                  id={modalId}
                  onBobjectChange={bobject => {
                    relatedOnChange(bobject?.rawBobject?.id);
                    if (bobject?.bobjectType === BobjectTypes.Company) {
                      setNameSelected(bobject?.companyName);
                    } else if (bobject?.bobjectType === BobjectTypes.Lead) {
                      setNameSelected(bobject?.fullName);
                    } else if (bobject?.bobjectType === BobjectTypes.Opportunity) {
                      setNameSelected(bobject?.name);
                    }
                  }}
                />
              </Tooltip>
            </div>
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {isEditionModal && (
              <Tooltip title={t('deleteTask')} position="top">
                <IconButton name="trashFull" size={22} onClick={handleDelete} />
              </Tooltip>
            )}
            <Button
              className={styles.add_task_button}
              size="small"
              onClick={() => {
                handleSubmit(() => onSubmit(isWebapp))();
              }}
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? (
                <Spinner name="loadingCircle" size={12} />
              ) : isEditionModal ? (
                t('saveTask')
              ) : (
                t('addTask')
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
