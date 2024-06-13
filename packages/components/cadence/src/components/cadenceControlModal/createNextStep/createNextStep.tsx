import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';

import { BobjectSelector } from '@bloobirds-it/bobjects';
import {
  Button,
  DatePicker,
  Icon,
  ModalContent,
  ModalFooter,
  Spinner,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId, useCustomTasks } from '@bloobirds-it/hooks';
import { PrioritySelector, TaskTypeSelector } from '@bloobirds-it/tasks';
import {
  BobjectTypes,
  LinkedInLead, TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import { useCadenceControlModal } from '../useCadenceControlModal';
import styles from './createNextStep.module.css';
import { useGetI18nSpacetime } from "@bloobirds-it/internationalization";
import { useTranslation } from "react-i18next";

export const CreateNextStep = ({ handleBack, handleNext }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useActiveUserId();
  const { control, handleSubmit: handleSubmitForm } = useForm();
  let bobjectName: string;
  const { bobject } = useCadenceControlModal();
  const accountId = bobject?.id.accountId;
  switch (bobject.id.typeName) {
    case 'Company':
      bobjectName = bobject.name;
      break;
    case 'Opportunity':
      bobjectName = bobject.name;
      break;
    case 'Lead':
      bobjectName = (bobject as LinkedInLead).fullName;
      break;
  }

  const { customTasks } = useCustomTasks();
const {t }= useTranslation('translation', {keyPrefix: "cadence.cadenceControlModal.createNextStep"});

  const handleChangeTaskType = value => {
    actionTypeOnChange(value);
    if (!['TASK', 'CALL', 'EMAIL'].includes(value)) {
      const customTaskDescription = customTasks?.find(task => task.id === value)?.description;
      if (customTaskDescription) {
        titleField.onChange(customTaskDescription);
      }
    }
  };

  const [bobjectSelectedName, setBobjectSelectedName] = useState<string>(bobjectName);
  const {
    visible: datePickerVisible,
    setVisible: setDatePickerVisible,
    ref: datePickerRef,
  } = useVisible();

  //@ts-ignore
  const { field: titleField } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.TITLE,
  });

  const {
    field: { value: taskDate, onChange: taskDateOnChange },
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    defaultValue: new Date(),
  });

  const {
    field: { value: priority, onChange: priorityOnChange },
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
    defaultValue: TASK_PRIORITY_VALUE.NO_PRIORITY,
  });

  const {
    field: { value: actionType, onChange: actionTypeOnChange },
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE,
    defaultValue: 'TASK',
  });

  const {
    field: { onChange: relatedOnChange },
  } = useController({
    control,
    name: 'related',
    defaultValue: bobject,
  });

  function onSubmit(data) {
    setIsSubmitting(true);
    const { related, ...taskInfo } = data;
    const body = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]:
        taskInfo[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME],
      [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: taskInfo[TASK_FIELDS_LOGIC_ROLE.PRIORITY],
    };

    const actionType = taskInfo[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE];

    body[TASK_FIELDS_LOGIC_ROLE.TASK_TYPE] = TASK_TYPE.NEXT_STEP;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL] = actionType === 'CALL' ? TASK_ACTION_VALUE.CALL_YES : null;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL] = actionType === 'EMAIL' ? TASK_ACTION_VALUE.EMAIL_YES : null;

    if (actionType !== 'TASK' && actionType !== 'CALL' && actionType !== 'EMAIL') {
      body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] = TASK_ACTION_VALUE.CUSTOM_TASK_YES;
      body[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] = actionType;
    }

    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] ||= TASK_ACTION_VALUE.CUSTOM_TASK_NO;
    body[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] ||= null;

    if (related) {
      if (typeof related === 'string') {
        if (related?.includes('Lead')) {
          body[TASK_FIELDS_LOGIC_ROLE.LEAD] = related;
        } else if (related?.includes('Company')) {
          body[TASK_FIELDS_LOGIC_ROLE.COMPANY] = related;
        } else if (related?.includes('Opportunity')) {
          body[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        }
      } else {
        const relatedBobjectType = related.id.typeName.toUpperCase();
        body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] = related.id.value;
      }
    }
    api.post(`/bobjects/${accountId}/Task`, body).then(() => {
      setIsSubmitting(false);

      handleNext();
    });
  }

  return (
    <>
      <ModalContent>
        <div className={styles.content_container}>
          <div className={styles.editor}>
            <span className={styles.modal_title}>
              <TaskTypeSelector
                value={actionType}
                onChange={handleChangeTaskType}
                isWebapp={true}
              />
              <PrioritySelector
                value={priority}
                onChange={priorityOnChange}
                overrideStyle={{ right: '40px' }}
              />
            </span>
            <span className={styles.divider} />
            <span className={styles.taskInfo}>
              <Icon name="clock" color="softPeanut" size={16} />
              <Text size="xs" color="softPeanut">
                {t('dueDate')}
              </Text>
              <DatePicker
                withTimePicker
                value={taskDate}
                onChange={taskDateOnChange}
                openDefaultValue={new Date()}
                dropDownRef={datePickerRef}
                visible={datePickerVisible}
                setVisible={setDatePickerVisible}
                dropdownProps={{
                  zIndex: 10000,
                  anchor: (
                    <span onClick={() => setDatePickerVisible(true)} className={styles.dateButton}>
                      <Text size="xs" color="bloobirds" weight="regular">
                        {useGetI18nSpacetime(taskDate).format(
                          '{month-short} {date-ordinal}, {day} {time-24}',
                        )}
                      </Text>
                    </span>
                  ),
                }}
              />
              <BobjectSelector
                accountId={accountId}
                selected={bobjectSelectedName}
                id={'static'}
                onBobjectChange={bobject => {
                  const bobjectType = bobject?.bobjectType;
                  relatedOnChange(bobject?.rawBobject?.id);
                  if (bobjectType === BobjectTypes.Company) {
                    setBobjectSelectedName(bobject?.companyName);
                  } else if (bobjectType === BobjectTypes.Lead) {
                    setBobjectSelectedName(bobject?.fullName);
                  } else if (bobjectType === BobjectTypes.Opportunity) {
                    setBobjectSelectedName(bobject?.name);
                  }
                }}
              />
            </span>
            <span className={styles.divider} />
            <textarea
              className={styles.textArea}
              placeholder={t('placeholder')}
              autoFocus
              {...titleField}
            />
          </div>
          <div>
            <div className={styles.bottom_bar}>
              <span className={styles.record_related}>
                <div className={styles.bobject_selector}></div>
              </span>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className={styles.buttonsContainer}>
          <Button variant="clear" onClick={handleBack}>
            {t('back')}
          </Button>
          <div>
            <Button onClick={handleSubmitForm(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner name="loadingCircle" size={12} />
              ) : (
                t('save')
              )}
            </Button>
          </div>
        </div>
      </ModalFooter>
    </>
  );
};
