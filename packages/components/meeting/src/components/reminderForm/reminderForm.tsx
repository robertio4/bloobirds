import React, { useContext, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Icon,
  IconButton,
  Input,
  Item,
  Section,
  Select,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useMessagingTemplates } from '@bloobirds-it/hooks';
import { MessagingTemplate, TEMPLATE_TYPES } from '@bloobirds-it/types';
import truncate from 'lodash/truncate';

import { RemindeBeforeType, ReminderBefore, useCalendar } from '../../hooks/useCalendar';
import MeetingModalContext from '../../meetingModal/context';
import styles from './reminderForm.module.css';

export const ReminderForm = () => {
  const {
    reminderTemplate,
    setReminderBefore,
    reminderBefore,
    setReminderTemplate,
    showReminder,
    setShowReminder,
  } = useCalendar();
  // @ts-ignore
  const { control, setValue, formState } = useFormContext();
  const { messagingTemplates } = useMessagingTemplates({
    onlyMine: false,
    visibility: null,
    name: '',
    segmentationValues: {},
    type: TEMPLATE_TYPES.EMAIL,
    page: 0,
    size: 200,
  });
  const { userId } = useContext(MeetingModalContext);
  const privateTemplates = messagingTemplates.filter(
    (template: MessagingTemplate) => template?.createdBy === userId,
  );
  const publicTemplates = messagingTemplates.filter(
    (template: MessagingTemplate) => template?.visibility === 'PUBLIC',
  );
  const { t } = useTranslation('translation', {
    keyPrefix: 'meetingModal.mainForm.reminderForm',
  });
  const {
    field: { value: reminderTemplateValue, onChange: templateOnChange },
  } = useController({
    control,
    name: 'reminderTemplate',
    rules: {
      required: !!showReminder,
    },
    defaultValue: reminderTemplate,
  });
  const {
    field: { value: reminderBeforeValue, onChange: reminderBeforeOnChange },
  } = useController({
    control,
    name: 'reminderBefore',
    defaultValue: reminderBefore?.value,
    rules: {
      required: true,
    },
  });
  const {
    field: { value: reminderBeforeTypeValue, onChange: reminderBeforeTypeOnChange },
  } = useController({
    control,
    name: 'reminderBeforeType',
    defaultValue: reminderBefore?.type,
    rules: {
      required: true,
    },
  });
  const errorTemplate =
    formState?.errors && formState?.errors['reminderTemplate'] && t('thisFieldIsRequired');

  useEffect(() => {
    if (reminderTemplate && !reminderTemplateValue) {
      setValue('reminderTemplate', reminderTemplate);
    }
  }, [reminderTemplate, reminderTemplateValue]);

  useEffect(() => {
    if (
      messagingTemplates &&
      reminderTemplateValue &&
      !messagingTemplates?.find(template => template?.id === reminderTemplateValue)
    ) {
      setValue('reminderTemplate', null);
    }
  }, [reminderTemplateValue, messagingTemplates]);

  return (
    <div>
      <div className={styles._reminder_container}>
        <div className={styles._title}>
          <Icon name="bell" />
          <Text size="s">{t('addNotificationEmail')}</Text>
          <Tooltip title={t('tooltipMessage')} position="top">
            <Icon name="infoFilled" size={16} />
          </Tooltip>
        </div>
        <IconButton name="plus" onClick={() => setShowReminder(true)} />
      </div>
      {showReminder && (
        <div className={styles._reminder_form_container}>
          <Select
            borderless={false}
            size="small"
            width="150px"
            error={errorTemplate}
            value={reminderTemplateValue}
            placeholder={`${t('emailTemplate')} *`}
            onChange={templateId => {
              setReminderTemplate(templateId);
              templateOnChange(templateId);
            }}
          >
            <Section id="my-templates">{t('myTemplates')}</Section>
            {privateTemplates.map((messagingTemplate: any) => (
              <Item key={messagingTemplate.id} section="my-templates" value={messagingTemplate.id}>
                {truncate(messagingTemplate.name, { length: 32 })}
              </Item>
            ))}
            <Section id="team-templates">{t('teamTemplates')}</Section>
            {publicTemplates.map((messagingTemplate: any) => (
              <Item
                key={messagingTemplate.id}
                section="team-templates"
                value={messagingTemplate.id}
              >
                {truncate(messagingTemplate.name, { length: 32 })}
              </Item>
            ))}
          </Select>
          <Input
            size="small"
            type="number"
            width="50px"
            value={reminderBeforeValue}
            onChange={(v: string) => {
              setReminderBefore((prevStatus: ReminderBefore) => {
                return {
                  type: prevStatus.type,
                  value: v,
                };
              });
              reminderBeforeOnChange(v);
            }}
          />
          <Select
            size="small"
            width="60px"
            borderless={false}
            value={reminderBeforeTypeValue}
            onChange={(type: RemindeBeforeType) => {
              setReminderBefore((prevStatus: ReminderBefore) => {
                return {
                  type,
                  value: prevStatus.value,
                };
              });
              reminderBeforeTypeOnChange(type);
            }}
          >
            <Item value={RemindeBeforeType.minutes}>{t('minutes')}</Item>
            <Item value={RemindeBeforeType.hours}>{t('hours')}</Item>
            <Item value={RemindeBeforeType.days}>{t('days')}</Item>
          </Select>
          <IconButton
            name="cross"
            onClick={() => {
              setReminderBefore({
                type: RemindeBeforeType.minutes,
                value: 30,
              });
              setReminderTemplate(null);
              setShowReminder(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
