import React, { useEffect, useMemo, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

import { AssignedToSelector, BobjectSelector } from '@bloobirds-it/bobjects';
import {
  Button,
  Icon,
  ModalContent,
  ModalFooter,
  ShortTermRelativeDatePicker,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId, useCustomTasks, useUserHelpers } from '@bloobirds-it/hooks';
import { PrioritySelector, TaskTypeSelector } from '@bloobirds-it/tasks';
import {
  BobjectTypes,
  ExtensionBobject,
  LinkedInLead, TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  UserHelperKeys,
} from '@bloobirds-it/types';
import { add } from '@bloobirds-it/utils';

import { useContactFlow } from '../../hooks';
import { useContactFlowData } from '../../hooks/useContactFlowData';
import { ScheduleShortTimes, ScheduleShortTimesValues, Unit } from './scheduleNextStep.constants';
import styles from './scheduleNextSteps.module.css';
import { useTranslation } from "react-i18next";

export const ScheduleNextSteps = ({
  handleNext,
  handleBack,
  handleSkip,
}: {
  handleNext: () => void;
  handleBack?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useActiveUserId();
  const [assignedToId, setAssignedToId] = useState<string>(userId);
  const { referenceBobject, buttonStepConfig } = useContactFlow();
  const { handleSubmit } = useContactFlowData();
  const accountId = referenceBobject?.id.accountId;
  const { control, handleSubmit: handleSubmitForm, watch, getValues } = useForm();
  let bobjectName: string;
  const bobject = referenceBobject as ExtensionBobject;
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

  const { get, saveCustom } = useUserHelpers();
  const {t} = useTranslation('translation', {keyPrefix: 'contactFlowModal.scheduleNextSteps'});
  const savedDefaultValue = get(UserHelperKeys.SCHEDULE_NEXT_STEP_DATETIME_FILTER);
  const NOW = new Date();

  const showSkipButton =
    buttonStepConfig?.showSkipButton != undefined ? buttonStepConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonStepConfig?.hasPreviousStep != undefined ? buttonStepConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonStepConfig?.openCadenceOnSkip != undefined ? buttonStepConfig?.openCadenceOnSkip : false;

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
  });

  const {
    field: { onChange: relatedOnChange },
  } = useController({
    control,
    name: 'related',
    defaultValue: referenceBobject,
  });

  const dateTime = watch(TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);

  const dateTimeValue = useMemo(() => {
    if (dateTime?.type) {
      return dateTime?.type === ScheduleShortTimes.custom
        ? dateTime?.date
        : add(
            NOW,
            ScheduleShortTimesValues[dateTime?.type]?.unit as Unit,
            ScheduleShortTimesValues[dateTime?.type]?.amount as number,
          );
    } else {
      return savedDefaultValue
        ? add(
            NOW,
            ScheduleShortTimesValues[savedDefaultValue]?.unit as Unit,
            ScheduleShortTimesValues[savedDefaultValue]?.amount as number,
          )
        : add(NOW, 'minutes', 10);
    }
  }, [NOW, savedDefaultValue, dateTime?.type]);

  function onSubmit(data) {
    setIsSubmitting(true);
    const { related, ...taskInfo } = data;
    const body = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedToId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: dateTimeValue,
      [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: taskInfo[TASK_FIELDS_LOGIC_ROLE.PRIORITY]
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
      const relatedBobjectType =
        related?.bobjectType?.toUpperCase() || related?.id?.typeName?.toUpperCase();
      body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] =
        related?.rawBobject?.id || related?.id?.value;
    }
    handleSubmit({ nextStepData: { accountId, body } });
    setIsSubmitting(false);

    handleNext();
  }

  const formValues = getValues();
  const titleValue = formValues[TASK_FIELDS_LOGIC_ROLE.TITLE];
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    setIsDirty(titleValue && titleValue !== '');
  }, [titleValue]);

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
              <div className={styles.relative_date_picker}>
                <ShortTermRelativeDatePicker
                  size="small"
                  value={taskDate}
                  onChange={value => {
                    if (value?.type !== ScheduleShortTimes.custom) {
                      saveCustom({
                        key: UserHelperKeys.SCHEDULE_NEXT_STEP_DATETIME_FILTER,
                        data: value?.type,
                      });
                    }
                    taskDateOnChange(value);
                  }}
                  defaultValue={{
                    date: dateTimeValue,
                    type: savedDefaultValue ? savedDefaultValue : ScheduleShortTimes.tenMinutes,
                  }}
                  borderless
                  width="100px"
                  dropdownProps={{
                    zIndex: 10000,
                    arrow: true,
                    position: 'bottom',
                  }}
                />
              </div>
              <span className={styles.assigned_to}>
                <Icon name="personAdd" color="softPeanut" size={16} />
                <Text size="xs" color="softPeanut">
                  {t('assignedTo')}
                </Text>
                <AssignedToSelector
                  assignedToId={assignedToId}
                  updateAssignedTo={setAssignedToId}
                />
              </span>
              <BobjectSelector
                accountId={accountId}
                selected={bobjectSelectedName}
                id={'static'}
                size="small"
                onBobjectChange={bobject => {
                  const bobjectType = bobject?.bobjectType;
                  relatedOnChange(bobject);
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
          {hasPreviousStep && (
            <Button variant="clear" onClick={handleBack} className={styles.back_button}>
              {buttonStepConfig?.previousButtonTitle || t('back')}
            </Button>
          )}
          <div>
            {showSkipButton && (
              <Button
                variant="secondary"
                onClick={() => handleSkip(openCadenceControlOnClose)}
                className={styles.skip_button}
              >
                {t("skip")}
              </Button>
            )}
            <Button onClick={handleSubmitForm(onSubmit)} disabled={!isDirty || isSubmitting}>
              {isSubmitting ? (
                <Spinner name="loadingCircle" size={12} />
              ) : (
                buttonStepConfig?.nextButtonTitle || t('saveAndSchedule')
              )}
            </Button>
          </div>
        </div>
      </ModalFooter>
    </>
  );
};
