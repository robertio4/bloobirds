import React, { useEffect } from 'react';
import { Control, useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField, useConfirmDeleteModal } from '@bloobirds-it/bobjects';
import {
  Button,
  Icon,
  IconButton,
  Item,
  Modal,
  ModalFooter,
  ModalHeader,
  Select,
} from '@bloobirds-it/flamingo-ui';
import { useQuickLogActivity, useDataModel } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectFieldDataModel,
  BobjectTypes,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  recoverScrollOfBox,
  removeScrollOfBox,
} from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import styles from './quickLogModal.module.css';

interface FormValues {
  fields: {
    [id: string]: any;
  };
}

const LeadSelector = ({
  control,
  leadFieldId,
  leads,
  required,
}: {
  control: Control<FormValues>;
  leadFieldId: string;
  leads: Bobject[];
  required: boolean;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'quickLogModal.leadSelector' });
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: `fields.${leadFieldId}`,
    rules: {
      required: {
        value: required,
        message: t('required'),
      },
    },
  });

  return (
    <Select
      placeholder={t('placeholder', { required: required ? ' *' : '' })}
      width="100%"
      value={value}
      onChange={onChange}
      error={error?.message}
    >
      {!required && (
        <Item value="">
          <em>{t('none')}</em>
        </Item>
      )}
      {leads?.map((lead, idx) => (
        <Item key={lead?.id.value + '-' + idx} value={lead?.id.value}>
          {
            // @ts-ignore
            lead?.fullName || getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
          }
        </Item>
      ))}
    </Select>
  );
};

export const QuickLogModalContent = ({
  isOpen,
  modalData,
  logCustomActivity,
  editCustomActivity,
  closeQuickLogModal,
}) => {
  const { customTask, leads, selectedBobject, activity, isEdition } = modalData || {};
  const dataModel: DataModelResponse = useDataModel();
  const { openDeleteModal } = useConfirmDeleteModal();
  const dateField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME);
  const leadField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const noteField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const customActivityFields = customTask?.fields.map(field => ({
    [field.bobjectFieldId]: activity?.raw?.contents?.[field.bobjectFieldId],
  }));

  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityNote = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);

  const { t } = useTranslation('translation', { keyPrefix: 'quickLogModal' });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      fields: {},
    },
  });

  useEffect(() => {
    if (isOpen) {
      removeScrollOfBox();
    }

    if (!isOpen) {
      recoverScrollOfBox();
    }

    return () => {
      recoverScrollOfBox();
      reset();
    };
  }, [isOpen]);

  useEffect(() => {
    const fields = watch('fields');
    let defaultFieldValues = fields;

    if (customActivityFields) {
      defaultFieldValues = {
        ...defaultFieldValues,
        ...customActivityFields.reduce((acc, f) => {
          const [key] = Object.keys(f);
          if (fields?.[key] === undefined) {
            return { ...acc, ...f };
          }
        }, defaultFieldValues),
      };
    }

    if (dateField && fields[dateField.id] === undefined) {
      defaultFieldValues = { ...defaultFieldValues, [dateField.id]: new Date() };
    }

    if (leadField && fields[leadField.id] === undefined) {
      if (activityLead) {
        defaultFieldValues = { ...defaultFieldValues, [leadField.id]: activityLead?.id?.value };
      } else if (!activityLead && selectedBobject?.id?.typeName === BobjectTypes.Lead) {
        defaultFieldValues = { ...defaultFieldValues, [leadField.id]: selectedBobject?.id?.value };
      } else if (!activityLead && !selectedBobject && leadField?.required && leads?.length > 0) {
        defaultFieldValues = { ...defaultFieldValues, [leadField.id]: leads[0]?.id.value };
      }
    }

    if (noteField && fields[noteField.id] === undefined) {
      defaultFieldValues = { ...defaultFieldValues, [noteField.id]: activityNote };
    }

    if (Object.keys(defaultFieldValues)?.length !== 0) {
      setValue('fields', defaultFieldValues);
    }
  }, [
    dateField,
    leadField,
    selectedBobject,
    activityLead,
    noteField,
    customActivityFields?.length,
    leads,
  ]);

  const fields =
    dataModel && customTask
      ? customTask?.fields
          .map(f => ({
            ...dataModel?.findFieldById(f.bobjectFieldId),
            required: f.required,
          }))
          .sort((f1, f2) => f2.ordering - f1.ordering)
      : [];

  const finalFields: BobjectFieldDataModel[] = [
    { ...dateField, required: true },
    ...fields,
    noteField,
  ]
    .filter(f => f?.isEnabled)
    .map(f => ({ ...f, type: f?.fieldType }))
    .map(f => {
      if (f?.fieldType === 'PICKLIST' || f?.fieldType === 'MULTIPICKLIST') {
        return {
          ...f,
          values: dataModel.findValuesByFieldId(f.id).map(v => ({ ...v, enabled: v.isEnabled })),
        };
      }
      return f;
    });

  const submitForm = (values: FormValues) => {
    if (!isEdition) {
      logCustomActivity(modalData, values?.fields, cleanAndClose, true);
    } else {
      editCustomActivity(activity, modalData, values?.fields, cleanAndClose);
    }
  };

  const cleanAndClose = () => {
    reset();
    setValue('fields', {});
    closeQuickLogModal();
  };

  const handleDelete = () => {
    openDeleteModal(
      activity,
      false,
      () => {},
      () => {
        modalData?.onSubmit?.();
        closeQuickLogModal?.();
      },
    );
  };

  return (
    <Modal className={styles.modal} open onClose={cleanAndClose} width={342}>
      <ModalHeader className={styles.header}>
        <div className={styles.title}>
          <Icon name={customTask?.icon} size={24} color="peanut" />
          {isEdition
            ? t('editTitle', { customTask: customTask?.name })
            : t('logTitle', { customTask: customTask?.name })}
        </div>

        <IconButton name="cross" color="bloobirds" size={24} onClick={cleanAndClose} />
      </ModalHeader>
      <form onSubmit={handleSubmit(submitForm)}>
        <main className={styles.content}>
          <LeadSelector
            control={control}
            leadFieldId={leadField?.id}
            leads={leads}
            required={leadField?.required}
          />
          {finalFields.map((field, idx) => {
            return (
              <div key={field.id + '-' + idx}>
                {/*@ts-ignore*/}
                <FormField control={control} {...field} size="medium" />
              </div>
            );
          })}
        </main>
        <ModalFooter>
          <div className={styles.footer_buttons}>
            <Button
              size="small"
              uppercase={false}
              variant="clear"
              color="tomato"
              onClick={
                isEdition
                  ? () => {
                      handleDelete();
                      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_DELETE_CUSTOM_ACTIVITY);
                    }
                  : cleanAndClose
              }
            >
              {isEdition ? t('delete') : t('cancel')}
            </Button>
            <Button size="small" uppercase={false} type="submit" disabled={isSubmitting}>
              {isEdition ? t('save') : t('create')}
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export const QuickLogModal = () => {
  const { isOpen, ...rest } = useQuickLogActivity();
  return isOpen ? <QuickLogModalContent isOpen={isOpen} {...rest} /> : <></>;
};
