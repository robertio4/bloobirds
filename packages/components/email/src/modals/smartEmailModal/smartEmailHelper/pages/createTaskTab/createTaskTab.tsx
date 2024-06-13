import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BobjectSelector, AssignedToSelector } from '@bloobirds-it/bobjects';
import {
  Button,
  DatePicker,
  Icon,
  Spinner,
  Text,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  BobjectTypes,
  ExtensionBobject,
  LinkedInLead,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  SmartEmailTab,
} from '@bloobirds-it/types';
import { getNameFieldLRFromBobjectType, getTextFromLogicRole, api } from '@bloobirds-it/utils';

import { useSmartEmailModal } from '../../../smartEmailModal';
import styles from './createTaskTab.module.css';

export const CreateTaskTab = () => {
  const {
    activeBobject,
    accountId,
    isExtension,
    setSelectedTab,
    setTaskTitle,
  } = useSmartEmailModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.createTaskTab' });
  const userId = useActiveUserId();
  const [assignedToId, setAssignedToId] = useState<string>(userId);
  let bobjectName: string;
  if (isExtension) {
    const bobject = activeBobject as ExtensionBobject;
    switch (bobject?.id?.typeName) {
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
  } else {
    const referencedBobjectType = activeBobject?.id?.typeName;
    bobjectName = getTextFromLogicRole(
      // @ts-ignore
      activeBobject,
      getNameFieldLRFromBobjectType(referencedBobjectType),
    );
  }
  const [bobjectSelectedName, setBobjectSelectedName] = useState<string>(bobjectName);
  const { createToast } = useToasts();

  const {
    visible: datePickerVisible,
    setVisible: setDatePickerVisible,
    // @ts-ignore
    ref: datePickerRef,
  } = useVisible();
  const { control, handleSubmit } = useForm<{
    [TASK_FIELDS_LOGIC_ROLE.TITLE]: string;
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: Date;
    related: any;
  }>();

  const {
    field: { onChange: titleOnChange, ...restTitleProps },
  } = useController({
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
    field: { onChange: relatedOnChange, value: relatedValue },
  } = useController({
    control,
    name: 'related',
    defaultValue: activeBobject?.id?.value,
  });

  const onSubmit = async data => {
    setIsSubmitting(true);
    const { related, ...taskInfo } = data;
    const body = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedToId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]:
        taskInfo[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME],
    };
    if (related) {
      const relatedBobjectType = related.split('/')[1].toUpperCase();
      body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] = related;
    }
    api
      .post(`/bobjects/${accountId}/Task`, {
        contents: { ...body },
        params: {},
      })
      .then(() => {
        setIsSubmitting(false);
        createToast({ message: t('toasts.success'), type: 'success' });
        setTaskTitle(undefined);
        setSelectedTab(SmartEmailTab.PAST_ACTIVITY);
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleHeader}>
          <Icon name="checkDouble" size={20} />
          <Text weight="bold" size="l">
            {t('newTask')}
          </Text>
        </div>
        <span className={styles.divider} />
        <div className={styles.infoHeader}>
          <div className={styles.date}>
            <div className={styles.dateDescription}>
              <Icon name="clock" color="softPeanut" size={16} />
              <Text size="xs" color="softPeanut">
                {t('dueDate')}
              </Text>
            </div>
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
          </div>
          <span className={styles.assigned_to}>
            <span className={styles.assigned_to_title}>
              <Icon name="personAdd" color="softPeanut" size={16} />
              <Text size="xs" color="softPeanut">
                {t('assignedTo')}
              </Text>
            </span>
            <AssignedToSelector assignedToId={assignedToId} updateAssignedTo={setAssignedToId} />
          </span>
          <div className={styles.object}>
            <div className={styles.objectDescription}>
              <Icon name="record" color="softPeanut" size={16} />
              <Text size="xs" color="softPeanut">
                {t('object')}
              </Text>
            </div>
            <BobjectSelector
              accountId={accountId}
              iconSize={16}
              selected={bobjectSelectedName}
              id={'static'}
              bobjectType={relatedValue?.split('/')[1]}
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
          </div>
        </div>
        <span className={styles.divider} />
      </div>
      <textarea
        className={styles.textArea}
        placeholder={t('descriptionPlaceholder')}
        autoFocus
        onChange={e => {
          titleOnChange(e);
          setTaskTitle(e.target.value);
        }}
        {...restTitleProps}
      />
      <div className={styles.footer}>
        <Button
          size="small"
          variant="tertiary"
          iconLeft="trashEmpty"
          color="extraMeeting"
          uppercase={false}
          onClick={() => setSelectedTab(SmartEmailTab.PAST_ACTIVITY)}
        >
          {t('discard')}
        </Button>
        <Button
          size="small"
          iconLeft="plus"
          uppercase={false}
          onClick={handleSubmit(onSubmit)}
          disabled={!restTitleProps.value}
        >
          {isSubmitting ? <Spinner name="loadingCircle" size={14} /> : t('createTask')}
        </Button>
      </div>
    </div>
  );
};
