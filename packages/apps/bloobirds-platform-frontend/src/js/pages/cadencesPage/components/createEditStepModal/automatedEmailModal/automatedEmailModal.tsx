import React, { useEffect, useMemo, useState } from 'react';
import { Controller, FieldError, useController, useFormContext } from 'react-hook-form';

import { Banner } from '@bloobirds-it/banner';
import { useCadenceSteps } from '@bloobirds-it/cadence';
import { ClearSelect, EmailModalRow } from '@bloobirds-it/email';
import {
  Button,
  Icon,
  Modal,
  ModalCloseIcon,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { AttachmentList } from '@bloobirds-it/misc';
import {
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFileAttachment,
  EditorToolbarFontStylesSection,
  EditorToolbarImage,
  EditorToolbarListsSection,
  EditorToolbarSection,
  EditorToolbarTemplateVariable,
  EditorToolbarTextMarksSection,
  FloatingTemplateVariable,
  RichTextEditor,
  serialize,
  TemplateEditorToolbarMeetingLink,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import {
  BobjectType,
  BodyElement,
  CadenceStep,
  MessagingTemplate,
  SaveCadenceStepCommand,
  TemplateStage,
  ThreadMode,
} from '@bloobirds-it/types';
import { removeHtmlTags, createParagraph } from '@bloobirds-it/utils';
import { insertElements, resetEditorChildren, select } from '@udecode/plate';
import { isEqual } from 'lodash';

import useAttachedFiles from '../../../../../hooks/useAttachedFiles';
import useAutomationEmailTemplates from '../../../../../hooks/useAutomationEmailTemplates';
import useLatestThreadMessagingTemplate from '../../../../../hooks/useLatestThreadMessagingTemplate';
import { useQueryParam } from '../../../../../hooks/useQueryParams';
import { useValidEmailFields } from '../../../../../hooks/useValidEmailFields';
import styles from './automatedEmailModal.module.css';
import MessagingTemplatesBar from './messagingTemplatesBar/messagingTemplatesBar';
import TemplateDecisionModal from './templateDecisionModal/templateDecisionModal';

interface AutomatedEmailModalProps {
  bobjectType: BobjectType;
  onClose: () => void;
  step: CadenceStep;
  onSave: (command: SaveCadenceStepCommand) => void;
  isAutomatedStep: boolean;
}

interface FormValues {
  subject: any;
  body: any;
  emailTemplateId: string;
  automationEmailThreadMode: ThreadMode;
  automationEmailToField: string;
}

function isEmptyRichText(value: any, plugins: Array<any>) {
  const html = serialize(value, { format: 'AST', plugins });
  const text = removeHtmlTags(html);
  return text.trim().length === 0;
}

function AutomatedEmailModal({
  step,
  bobjectType,
  onClose,
  onSave,
  isAutomatedStep,
}: AutomatedEmailModalProps) {
  const { fields } = useValidEmailFields(bobjectType);
  const { messagingTemplates } = useAutomationEmailTemplates();
  const cadenceId = useQueryParam('cadence', true);
  const [templateDecisionModalVisible, setTemplateDecisionModalVisible] = useState(false);
  const {
    control,
    reset,
    getValues,
    errors,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
    unregister,
  } = useFormContext();

  const actionTypes = watch('actionTypes');

  const { messagingTemplate: initialThreadMessagingTemplate } = useLatestThreadMessagingTemplate({
    cadenceId,
    dayNumber: step.dayNumber - 1,
    isAutomatedStep,
  });
  const { steps } = useCadenceSteps(cadenceId);
  const hasPreviuosManualEmail =
    steps.filter(step => step.actionTypes.includes('EMAIL')).length > 0 && isAutomatedStep;
  const isEdition = !!step.id;
  const {
    attachedFiles,
    removeAttachedFile,
    uploadAttachedFile,
    syncAttachments,
  } = useAttachedFiles();

  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    rawHTMLBlock: true,
    replyHistory: true,
  });

  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    singleLine: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
  });

  function getEditorHeight() {
    let height = 300;
    if (existingTemplate && isEdition) height -= 40;
    if (firstError) height -= 40;
    if (attachedFiles.length > 0) height -= 40;
    return height;
  }

  const emailTemplateId = watch('templates.emailTemplate.id') || step.emailTemplateId;
  const threadMode = watch('automationEmailThreadMode');
  const emailBody = watch('templates.emailTemplate.body');
  const emailSubject = watch('templates.emailTemplate.subject');
  const previousThreadExists = !!initialThreadMessagingTemplate;
  const firstError = Object.values(errors)?.[0] as FieldError;

  const modifiedSubject =
    emailSubject &&
    (emailSubject[0].children?.length > 1 || emailSubject[0].children[0].text !== '');
  const modifiedBody =
    emailBody &&
    emailBody.filter((element: BodyElement) => element.children[0].text !== '')?.length > 0;

  const existingTemplate = useMemo(() => {
    return messagingTemplates.find(t => t.id === emailTemplateId);
  }, [messagingTemplates]);

  const templateSelected = !!existingTemplate;

  const attachedFieldsModified = useMemo(() => {
    if (!existingTemplate) {
      return false;
    }
    return !isEqual(
      existingTemplate.mediaFiles.map(x => x.id),
      attachedFiles.map(x => x.id),
    );
  }, [attachedFiles, existingTemplate]);

  const templateModified = useMemo(() => {
    if (attachedFieldsModified) {
      return true;
    }
    const templateBody = JSON.parse(existingTemplate?.content || '[]');
    const templateSubject = JSON.parse(existingTemplate?.subject || '[]');
    templateBody?.push({ type: 'p', children: [{ text: '' }] });
    if (threadMode === 'REPLY_TO_THREAD') {
      return !isEqual(templateBody, emailBody);
    }
    return !isEqual(templateBody, emailBody) || !isEqual(templateSubject, emailSubject);
  }, [existingTemplate, emailBody, emailSubject, threadMode, attachedFieldsModified]);

  const [subjectEditor, setSubjectEditor] = useState(null);
  const [bodyEditor, setBodyEditor] = useState(null);

  function handleDiscardChanges() {
    unregister('templates.emailTemplate.id');
    unregister('templates.emailTemplate.body');
    unregister('templates.emailTemplate.subject');
    setValue('templates.emailTemplate', undefined);
    onClose();
  }

  useEffect(() => {
    if (fields.length > 0 && !step?.automationEmailToField) {
      reset({
        ...getValues(),
        automationEmailToField: fields.find(
          f => !f.readOnly || f.id === step.automationEmailToField,
        )?.id,
      });
    }
  }, [fields, step?.automationEmailToField]);

  useEffect(() => {
    if (subjectEditor || bodyEditor) {
      if (bodyEditor && existingTemplate?.content) {
        const body = JSON.parse(existingTemplate.content);

        resetEditorChildren(bodyEditor);
        insertElements(bodyEditor, body, { at: [0] });
        select(bodyEditor, [0]);
        setValue('templates.emailTemplate.body', body, { shouldValidate: true });
      }
      if (subjectEditor) {
        let subject;
        if (threadMode === 'NEW_MESSAGE' && existingTemplate?.subject) {
          subject = JSON.parse(existingTemplate.subject);
        } else if (threadMode === 'REPLY_TO_THREAD') {
          if (initialThreadMessagingTemplate?.subject) {
            const subjectThread = JSON.parse(initialThreadMessagingTemplate.subject);
            const text = subjectThread[0].children[0].text;
            subject = createParagraph(`RE: ${text}`);
          } else {
            subject = createParagraph('Re: Subject of Previous Step');
          }
        }

        if (subject) {
          resetEditorChildren(subjectEditor);
          insertElements(subjectEditor, subject, { at: [0] });
          setValue('templates.emailTemplate.subject', subject, { shouldValidate: true });
        }
      }
    }
  }, [existingTemplate, threadMode, bodyEditor, subjectEditor, initialThreadMessagingTemplate]);

  useEffect(() => {
    if (existingTemplate) {
      syncAttachments(existingTemplate.mediaFiles);
    }
  }, [existingTemplate]);

  const submitForm = (data: FormValues) => {
    if (templateSelected && !templateModified) {
      if (actionTypes?.length > 1) return onClose();
      return onSave({
        ...step,
        emailTemplateId: data.emailTemplateId,
        automationEmailThreadMode: data.automationEmailThreadMode || 'NEW_MESSAGE',
        automationEmailToField: data.automationEmailToField,
        emailTemplateAttachments: attachedFiles.map(f => f.id),
      });
    }
    if (existingTemplate) {
      setValue(
        'templates.emailTemplate.stage',
        existingTemplate.stage || TemplateStage.Prospecting,
      );
    }
    setTemplateDecisionModalVisible(true);
  };

  const sameThreadLabel = (
    <div className={styles._same_thread_container}>
      <span>Same thread</span>
      {!previousThreadExists && (
        <Tooltip
          title={
            'This email will be sent in the same thread as the last manual email sent in this cadence. If there is no previous email, it will be sent as a New thread.'
          }
          position="bottom"
        >
          <Icon name="infoFilled" size={18} color={'darkBloobirds'} />
        </Tooltip>
      )}
    </div>
  );

  const {
    field: { value: valueSubject, onChange: onChangeSubject },
  } = useController({
    control,
    name: 'templates.emailTemplate.subject',
    rules: {
      required: {
        value: true,
        message: 'Email subject is required',
      },
      validate: async value => {
        if (isEmptyRichText(value, subjectPlugins)) {
          return 'Email subject is required';
        }
        return true;
      },
    },
  });

  const {
    field: { value: valueBody, onChange: onChangeBody },
  } = useController({
    control,
    name: 'templates.emailTemplate.body',
    rules: {
      required: {
        value: true,
        message: 'Email body is required',
      },
      validate: async value => {
        if (isEmptyRichText(value, bodyPlugins)) {
          return 'Email body is required';
        }
        return true;
      },
    },
  });

  return (
    <Modal open onClose={onClose}>
      <form onSubmit={handleSubmit(submitForm)} className={styles.container}>
        <ModalHeader className={styles.header} variant="gradient" color="bloobirds">
          <div className={styles.title}>
            <Icon color="white" name="mail" size={24} />
            <Text color="white" size="m">
              Add email content
            </Text>
          </div>
          <ModalCloseIcon variant="gradient" onClick={handleDiscardChanges} />
        </ModalHeader>
        {existingTemplate && isEdition && (
          <div className={styles.warningBanner}>
            <Banner type="warningOrange" icon="edit">
              <Text htmlTag="span" size="xs">
                Changes in <b>subject and body will be applied immediately in active cadences</b>,
                the contact will receive the <b>updated email</b> when they reach this step in the
                cadence.
              </Text>
            </Banner>
          </div>
        )}
        {firstError && (
          <Banner type="error" icon="cross">
            {firstError.message}
          </Banner>
        )}
        <EmailModalRow>
          <Text size="m" color="verySoftPeanut">
            Thread:
          </Text>
          <Controller
            control={control}
            name="automationEmailThreadMode"
            defaultValue="NEW_MESSAGE"
            render={({ value, onChange }) => {
              return hasPreviuosManualEmail || previousThreadExists ? (
                <ClearSelect
                  value={value}
                  onChange={onChange}
                  emptyMessage="No email fields for this object"
                  options={[
                    { value: 'NEW_MESSAGE', label: 'New thread' },
                    { value: 'REPLY_TO_THREAD', label: sameThreadLabel },
                  ]}
                />
              ) : (
                <Text color="softPeanut" size="m">
                  New thread
                </Text>
              );
            }}
          />
        </EmailModalRow>
        <EmailModalRow>
          <Text size="m" color="verySoftPeanut">
            To:
          </Text>
          <Controller
            control={control}
            name="automationEmailToField"
            render={({ value, onChange }) => (
              <ClearSelect
                value={value}
                onChange={onChange}
                emptyMessage="No email fields for this object"
                options={fields
                  .filter(f => !f.readOnly || f.id === step.automationEmailToField)
                  .map(field => ({
                    value: field.id,
                    label: field.name,
                  }))}
              />
            )}
          />
        </EmailModalRow>
        <EmailModalRow>
          <RichTextEditor
            defaultValue={valueSubject}
            onChange={onChangeSubject}
            placeholder="Subject"
            plugins={subjectPlugins}
            style={{ width: '100%', padding: 0 }}
            setEditor={setSubjectEditor}
          >
            {editor => (
              <>
                {editor}
                {subjectEditor && <FloatingTemplateVariable editor={subjectEditor} />}
                {threadMode === 'REPLY_TO_THREAD' && <div className={styles.overlay} />}
              </>
            )}
          </RichTextEditor>
        </EmailModalRow>
        <RichTextEditor
          defaultValue={valueBody}
          onChange={onChangeBody}
          placeholder="Enter email body..."
          plugins={bodyPlugins}
          style={{ padding: '16px 20px', height: getEditorHeight() }}
          setEditor={setBodyEditor}
        >
          {editor => (
            <>
              <EditorToolbar backgroundColor="softBloobirds">
                <EditorToolbarControlsSection />
                <EditorToolbarFontStylesSection enableChangeSize />
                <EditorToolbarTextMarksSection enableChangeColor />
                <EditorToolbarListsSection />
                <EditorToolbarSection>
                  <TemplateEditorToolbarMeetingLink />
                  <EditorToolbarFileAttachment onAttachment={uploadAttachedFile} />
                  <EditorToolbarImage />
                  <EditorToolbarTemplateVariable />
                </EditorToolbarSection>
              </EditorToolbar>

              <Controller
                control={control}
                name="templates.emailTemplate.id"
                render={({ value, onChange }) => (
                  <MessagingTemplatesBar value={value} onChange={onChange} />
                )}
              />
              <div className={styles.editor}>{editor}</div>
            </>
          )}
        </RichTextEditor>
        {attachedFiles.length > 0 && (
          <div className={styles.attachmentList}>
            <AttachmentList files={attachedFiles} onDelete={removeAttachedFile} />
          </div>
        )}
        {templateDecisionModalVisible && (
          <TemplateDecisionModal
            existingTemplate={existingTemplate as MessagingTemplate}
            comeFromAutoEmail={true}
            onSave={({ decision, name, stage, segmentationValues }) => {
              const formData = getValues();
              return onSave({
                ...step,
                emailTemplateName: decision === 'update' ? step.emailTemplateName : name,
                emailTemplateBody: JSON.stringify(formData.body),
                emailTemplateSubject: JSON.stringify(formData.subject),
                emailTemplateId: decision === 'update' ? formData.emailTemplateId : undefined,
                automationEmailThreadMode: formData.automationEmailThreadMode,
                automationEmailToField: formData.automationEmailToField,
                emailTemplateAttachments: attachedFiles.map(f => f.id),
                emailTemplateSegmentationValues: segmentationValues,
                emailTemplateStage: stage,
              });
            }}
            onClose={() => {
              setTemplateDecisionModalVisible(false);
            }}
          />
        )}
        <ModalFooter className={styles.footer}>
          <Button variant="tertiary" color="softBloobirds" onClick={handleDiscardChanges}>
            Back
          </Button>
          <Button
            disabled={isSubmitting || (!templateSelected && (!modifiedSubject || !modifiedBody))}
            type="submit"
          >
            {isSubmitting ? <Spinner size={16} color="white" name="loadingCircle" /> : 'Save'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default AutomatedEmailModal;
