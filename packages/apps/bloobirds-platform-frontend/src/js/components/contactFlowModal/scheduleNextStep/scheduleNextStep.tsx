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
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useActiveUserId,
  useCustomTasks,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { TaskTypeSelector, PrioritySelector } from '@bloobirds-it/tasks';
import {
  BobjectType,
  BobjectTypes,
  ButtonsStepConfig,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  StrDict, TASK_ACTION_VALUE,
  TASK_PRIORITY_VALUE,
  UserHelperKeys,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { add } from '@bloobirds-it/utils';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useContactFlow } from '../../../hooks';
import { useSelectedOpportunity } from '../../../hooks/useSelectedOpportunity';
import { BobjectApi } from '../../../misc/api/bobject';
import { getTextFromLogicRole } from '../../../utils/bobjects.utils';
import { ScheduleShortTimes, ScheduleShortTimesValues, Unit } from './scheduleNextStep.constants';
import styles from './scheduleNextStep.module.css';

const createEntity = (data: any, entity: BobjectType) =>
  BobjectApi.request().bobjectType(entity).create(data);

const ScheduleNextStep = ({
  handleBack,
  handleSkip,
  handleClose,
  buttonsConfig,
}: {
  handleBack?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
  handleClose: () => void;
  buttonsConfig?: ButtonsStepConfig;
}) => {
  const { setScheduleStepData, referencedBobject: bobject } = useContactFlow();
  const { selectedOpportunity } = useSelectedOpportunity();
  const { createToast } = useToasts();
  const userId = useActiveUserId();
  const accountId = useActiveAccountId();
  const [assignedToId, setAssignedToId] = useState<string>(userId);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  let bobjectName: string;
  switch (bobject?.id?.typeName) {
    case 'Company':
      bobjectName = getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME);
      break;
    case 'Opportunity':
      bobjectName = getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
      break;
    case 'Lead':
      bobjectName = getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
      break;
  }
  const [bobjectSelectedName, setBobjectSelectedName] = useState<string>(bobjectName);
  const { get, saveCustom } = useUserHelpers();
  const savedDefaultValue = get(UserHelperKeys.SCHEDULE_NEXT_STEP_DATETIME_FILTER);
  const NOW = new Date();

  const { control, handleSubmit: handleSubmitForm, watch, reset } = useForm();

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
    defaultValue: bobject,
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

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  useEffect(() => {
    return () => reset();
  }, []);

  useEffect(() => {
    setAssignedToId(userId);
  }, [userId]);

  const dateTime = watch(TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const title = watch(TASK_FIELDS_LOGIC_ROLE.TITLE);
  const related = watch('related');

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

  function onSubmit(data: any) {
    setIsSubmitting(true);
    const { related, ...taskInfo } = data;

    let body = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE] ?? 'Untitled task',
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
      // @ts-ignore
      body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] =
        related?.rawBobject?.id || related?.id?.value;
    }

    if (selectedOpportunity) {
      body = { ...body, [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: selectedOpportunity?.id?.value };
    }

    createEntity(body, BobjectTypes.Task)
      .then(() => {
        createToast({ type: 'success', message: 'Task has been successfully scheduled!' });
        setIsSubmitting(false);
        handleClose();
      })
      .catch(error => {
        if (error) createToast({ type: 'error', message: 'Something went wrong!' });
        handleClose();
      });
  }

  useEffect(() => {
    const relatedDefaultBobjectType = related?.bobjectType || related?.id?.typeName;
    const relatedDefaultId = related?.rawBobject?.id || related?.id?.value;
    let bobjectId: StrDict;

    if (relatedDefaultBobjectType === BobjectTypes.Opportunity) {
      bobjectId = { opportunityId: relatedDefaultId };
    } else if (relatedDefaultBobjectType === BobjectTypes.Company) {
      bobjectId = { companyId: relatedDefaultId };
    } else {
      bobjectId = { leadId: relatedDefaultId };
    }

    setScheduleStepData({
      time: null,
      companyId: null,
      leadId: null,
      opportunityId: null,
      title: title ?? 'Untitled task',
      dateTime: dateTimeValue,
      ...bobjectId,
    });
  }, [title, dateTime, related]);

  return (
    <>
      <ModalContent>
        <div className={styles.content_container}>
          <div className={styles.editor}>
            <div className={styles.modal_title}>
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
            </div>
            <span className={styles.divider} />
            <span className={styles.taskInfo}>
              <Icon name="clock" color="softPeanut" size={16} />
              <Text size="xs" color="softPeanut">
                Due date
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
                  Assigned to
                </Text>
                <AssignedToSelector
                  assignedToId={assignedToId}
                  updateAssignedTo={setAssignedToId}
                />
              </span>
              <BobjectSelector
                accountId={accountId}
                selected={bobjectSelectedName}
                id="static"
                size="small"
                onBobjectChange={(bobject: any) => {
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
              placeholder="Describe your task... "
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
              {buttonsConfig?.previousButtonTitle || 'Back'}
            </Button>
          )}
          <div>
            {showSkipButton && (
              <Button
                variant="secondary"
                onClick={() => handleSkip(openCadenceControlOnClose)}
                className={styles.skip_button}
              >
                Skip
              </Button>
            )}
            <Button onClick={handleSubmitForm(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner name="loadingCircle" size={12} />
              ) : (
                buttonsConfig?.nextButtonTitle || 'Save & schedule next step'
              )}
            </Button>
          </div>
        </div>
      </ModalFooter>
    </>
  );
};

export default ScheduleNextStep;
