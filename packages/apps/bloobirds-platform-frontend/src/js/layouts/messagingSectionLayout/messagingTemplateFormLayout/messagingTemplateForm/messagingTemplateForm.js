import React, { useEffect } from 'react';
import { Controller, FormProvider, useController, useForm } from 'react-hook-form';
import ReactShadowRoot from 'react-shadow-root';

import { checkIfIsEmpty } from '@bloobirds-it/email';
import {
  Button,
  CircularBadge,
  Icon,
  Input,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
  TextArea,
} from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { AttachmentList } from '@bloobirds-it/misc';
import {
  deserialize,
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
  UserHelperKeys,
  TEMPLATE_TYPES,
  TEMPLATE_TYPES_COPIES,
  TemplateStage,
} from '@bloobirds-it/types';
import { removeHtmlTags } from '@bloobirds-it/utils';
import spacetime from 'spacetime';
import useSWR from 'swr';

import MessagingTemplateFooterActions from '../../../../components/messagingTemplates/messagingTemplateFooterActions/messagingTemplateFooterActions';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useEntity, useRouter } from '../../../../hooks';
import useAttachedFiles from '../../../../hooks/useAttachedFiles';
import { useQueryParam } from '../../../../hooks/useQueryParams';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import { PAGES_ROUTES } from '../../../../pages/playbookPages/sidebar/sidebar';
import { api } from '../../../../utils/api';
import MessagingSidebarSettings from '../messagingSidebarSettings';
import styles from './messagingTemplateForm.module.css';

function ConfirmationModal({ data, onClose, openMode, onSubmit, onDiscard, cadences }) {
  const { history } = useRouter();

  const cadencesUsingTemplate = cadences?.data?.cadences;

  return (
    <Modal open={!!openMode} onClose={onClose} width={640}>
      <ModalHeader variant="gradient" color="purple" className={styles.modal_header}>
        <ModalTitle variant="gradient">
          <div className={styles.modal_title}>
            <Icon color="purple" name="autoMail" size={24} />
            <Text color="peanut" size="s">
              Email template in cadence
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon size="small" onClick={onClose} color="purple" />
      </ModalHeader>
      <ModalContent>
        {openMode === 'SAVE' ? (
          <Text color="softPeanut" size="s" className={styles.modal_text}>
            This template is being used in {cadencesUsingTemplate?.length} cadence(s), this changes
            will be applied to all the auto-email tasks that are using this template and already
            scheduled.
          </Text>
        ) : (
          <Text color="softPeanut" size="s" className={styles.modal_text}>
            This template cannot be delete because is being used in {cadencesUsingTemplate?.length}{' '}
            cadence(s), if you want to delete it unlink the template from these cadences.
          </Text>
        )}
        {cadencesUsingTemplate && (
          <ul>
            {cadencesUsingTemplate?.map(
              cadence =>
                'name' in cadence && (
                  <li key={cadence.id}>
                    <Text color="softPeanut" size="s">
                      {cadence.name}
                    </Text>
                  </li>
                ),
            )}
          </ul>
        )}
      </ModalContent>
      <ModalFooter>
        <div />
        {openMode === 'SAVE' ? (
          <div>
            <Button
              variant="secondary"
              color="lightPurple"
              onClick={onDiscard}
              className={styles.secondary_button}
            >
              Discard Changes
            </Button>
            <Button variant="primary" color="purple" onClick={() => onSubmit(data)}>
              Accept
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="secondary"
              color="lightPurple"
              onClick={() => history.push(PAGES_ROUTES.CADENCES)}
              className={styles.secondary_button}
            >
              Go to Cadences
            </Button>
            <Button variant="primary" color="purple" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </ModalFooter>
    </Modal>
  );
}

const MessagingHTMLTemplateForm = ({
  mode,
  templateType,
  messagingTemplate,
  onSave,
  onDelete,
  onCancel,
  error,
}) => {
  const { data: cadences } = useSWR(
    messagingTemplate ? `/messaging/messagingTemplates/${messagingTemplate.id}/cadences` : null,
    url =>
      api.get(url, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      }),
  );

  const [modalMode, setModalMode] = React.useState(null);
  const [dataToSubmit, setDataToSubmit] = React.useState(null);
  const [editorMode, setEditorMode] = React.useState(mode === 'EDITION' ? 'preview' : 'editor');

  const { save } = useUserHelpers();
  const {
    attachedFiles,
    removeAttachedFile,
    uploadAttachedFile,
    syncAttachments,
  } = useAttachedFiles();
  const settings = useUserSettings();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  useEffect(() => {
    if (messagingTemplate && messagingTemplate.mediaFiles?.length > 0) {
      syncAttachments(messagingTemplate.mediaFiles);
    }
  }, [messagingTemplate]);

  const users = useEntity('users');

  const author = users
    ?.all()
    ?.find(
      user =>
        user?.id === messagingTemplate?.createdBy ||
        (!messagingTemplate && user?.id === settings?.user?.id),
    );

  const defaultValues = {
    id: messagingTemplate?.id,
    name: mode !== 'CLONE' ? messagingTemplate?.name : `${messagingTemplate?.name} - Copy`,
    subject: messagingTemplate?.subject || '',
    content: messagingTemplate?.content || '',
    isOfficial: mode === 'CLONE' ? false : messagingTemplate?.isOfficial,
    isBattlecard: messagingTemplate?.isBattlecard || false,
    visibility: messagingTemplate ? messagingTemplate.visibility === 'PUBLIC' : true,
    stage:
      messagingTemplate?.stage || isNoStatusPlanAccount
        ? TemplateStage.Sales
        : TemplateStage.Prospecting,
    segmentationValues: messagingTemplate?.segmentationValues
      ? messagingTemplate?.segmentationValues
      : {},
  };

  const methods = useForm({ defaultValues, shouldUnregister: false });

  const {
    field: { onChange: handleChangeShortcut, value: shortcutValue },
  } = useController({
    control: methods.control,
    name: 'shortcut',
  });

  const {
    field: { onChange: handleContentChange, value: contentValue },
  } = useController({
    control: methods.control,
    name: 'content',
    rules: { required: 'The body is required' },
  });

  const onSubmit = async data => {
    const templatePayload = {
      id: messagingTemplate?.id,
      name: data?.name ? data.name : '',
      subject: data?.subject || '',
      content: data.content || '',
      visibility: data.visibility ? 'PUBLIC' : 'PRIVATE',
      type: templateType,
      stage: data.stage,
      segmentationValues: data?.segmentationValues ? data?.segmentationValues : {},
      format: 'HTML',
      isOfficial: data.isOfficial,
      isBattlecard: data.isBattlecard,
      mediaFileIds: attachedFiles?.length > 0 ? attachedFiles.map(file => file.id) : [],
    };
    if (mode === 'CLONE') {
      await onSave({ ...templatePayload, id: undefined });
    } else {
      await onSave(templatePayload);
      save(UserHelperKeys.CREATE_FIRST_EMAIL_TEMPLATE);
    }
  };

  function openConfirmationModal(data) {
    setModalMode('SAVE');
    setDataToSubmit(data);
  }

  function openDeleteModal() {
    setModalMode('DELETE');
    setDataToSubmit(null);
  }

  useEffect(() => {
    if (error) {
      methods?.setError('name', { type: 'custom', message: error?.name });
    }
  }, [error, methods?.setError]);

  const isEmailtemplate = templateType === TEMPLATE_TYPES.EMAIL;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          messagingTemplate?.cadenceUsages > 0 && mode === 'EDITION'
            ? openConfirmationModal
            : onSubmit,
        )}
      >
        <main className={styles._content}>
          <div className={styles._editor}>
            <Button
              className={styles._back__button}
              onClick={onCancel}
              variant="clear"
              color="bloobirds"
              iconLeft="arrowLeft"
            >
              Back to the list
            </Button>
            <Text className={styles._title} color="softPeanut" size="l" weight="medium">
              Configure {TEMPLATE_TYPES_COPIES[templateType]} template
            </Text>
            {mode !== 'CLONE' && mode !== 'CREATION' && (
              <div className={styles._audit_box}>
                <CircularBadge
                  size="s"
                  color="lightPeanut"
                  style={{ color: 'var(--white)', fontSize: '9px' }}
                  backgroundColor={author?.color || 'lightPeanut'}
                >
                  {author?.shortname || 'U'}
                </CircularBadge>
                <Text color="softPeanut" size="s">
                  Created by:{' '}
                </Text>
                <Text color="peanut" size="s">
                  {`${author?.name}${
                    messagingTemplate?.creationDatetime
                      ? ` on ${spacetime(messagingTemplate?.creationDatetime).format('nice-short')}`
                      : ''
                  }`}
                </Text>
                <Text color="softPeanut" size="s">
                  {messagingTemplate?.updatedBy ? `Last updated by: ` : 'Last updated '}{' '}
                </Text>
                {messagingTemplate?.updatedBy && (
                  <Text color="peanut" size="s">
                    {messagingTemplate?.updatedBy}
                    {`${
                      messagingTemplate?.updateDatetime
                        ? ` on ${spacetime(messagingTemplate?.updateDatetime).format('nice-short')}`
                        : ''
                    }`}
                  </Text>
                )}
              </div>
            )}
            <div className={styles._form__row}>
              <Controller
                name="name"
                as={
                  <Input
                    width="100%"
                    error={methods.errors?.name?.message}
                    placeholder={`Template Name`}
                  />
                }
                control={methods.control}
                rules={{ required: 'A name for the template is required' }}
              />
            </div>
            <Text color="peanut" size="m" weight="medium">
              Content
            </Text>
            {isEmailtemplate && (
              <Controller
                name="subject"
                as={
                  <Input
                    width="100%"
                    error={methods.errors?.subject?.message}
                    placeholder={`Email subject`}
                  />
                }
                control={methods.control}
                rules={{ required: 'An email subject is required' }}
              />
            )}
            <div className={styles.previewEditorSelector}>
              <Button
                variant={editorMode === 'preview' ? 'primary' : 'secondary'}
                color={'bloobirds'}
                size={'small'}
                onClick={() => setEditorMode('preview')}
              >
                Preview
              </Button>
              <Button
                variant={editorMode === 'preview' ? 'secondary' : 'primary'}
                color={'bloobirds'}
                size={'small'}
                onClick={() => setEditorMode('editor')}
              >
                Editor
              </Button>
            </div>
            {editorMode === 'editor' && (
              <div className={styles.editor_html}>
                <EditorToolbar id="content">
                  {isEmailtemplate && (
                    <EditorToolbarFileAttachment onAttachment={uploadAttachedFile} />
                  )}
                </EditorToolbar>
                <div className={styles.html}>
                  <TextArea
                    width={'100%'}
                    className={styles.htmlTextArea}
                    onChange={handleContentChange}
                    value={contentValue}
                  />
                </div>
                {attachedFiles.length > 0 && (
                  <AttachmentList files={attachedFiles} onDelete={removeAttachedFile} />
                )}
              </div>
            )}
            {editorMode === 'preview' && (
              <div>
                <ReactShadowRoot>
                  <div dangerouslySetInnerHTML={{ __html: methods.getValues('content') }} />
                </ReactShadowRoot>
              </div>
            )}
            {templateType === TEMPLATE_TYPES.SNIPPET && (
              <div className={styles.shortcutsWrapper}>
                <Text color="peanut" size="m" weight="bold">
                  Shortcuts
                </Text>
                <Text color="softPeanut" size="s">
                  To use a snippet, type “ / ” followed by the snippet name in the text editor,
                  without spaces
                </Text>
                <Input
                  placeholder="Shortcut name"
                  width="100%"
                  value={shortcutValue ? '/' + shortcutValue : ''}
                  onChange={value => {
                    const cleanValue = value.replace(/\s|\//g, '');
                    const parsedValue =
                      cleanValue.length > 49 ? cleanValue.slice(0, 49) : cleanValue;
                    handleChangeShortcut(parsedValue);
                  }}
                  onKeyDown={e => {
                    if (e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            )}
          </div>
          <MessagingSidebarSettings
            templateId={messagingTemplate?.id}
            content={''}
            templateType={templateType}
            templateOwner={messagingTemplate?.createdBy}
            mode={mode}
          />
        </main>
        <MessagingTemplateFooterActions
          type={templateType}
          mode={mode}
          onCancel={onCancel}
          onDelete={cadences?.data?.cadences?.length > 0 ? openDeleteModal : onDelete}
          templateOwner={messagingTemplate?.createdBy}
        />
      </form>
      <ConfirmationModal
        openMode={modalMode}
        data={dataToSubmit}
        onClose={() => setModalMode(false)}
        onSubmit={onSubmit}
        onDiscard={onCancel}
        cadences={cadences}
      />
    </FormProvider>
  );
};

const MessagingASTTemplateForm = ({
  mode,
  templateType,
  messagingTemplate,
  onSave,
  onDelete,
  onCancel,
  error,
}) => {
  const { data: cadences } = useSWR(
    messagingTemplate ? `/messaging/messagingTemplates/${messagingTemplate.id}/cadences` : null,
    url =>
      api.get(url, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      }),
  );

  const [subjectEditor, setSubjectEditor] = React.useState(null);
  const [bodyEditor, setBodyEditor] = React.useState(null);

  const [modalMode, setModalMode] = React.useState(null);
  const [dataToSubmit, setDataToSubmit] = React.useState(null);
  const { save } = useUserHelpers();
  const {
    attachedFiles,
    removeAttachedFile,
    uploadAttachedFile,
    syncAttachments,
  } = useAttachedFiles();
  const settings = useUserSettings();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const isSnippet = templateType === TEMPLATE_TYPES.SNIPPET;

  useEffect(() => {
    if (messagingTemplate && messagingTemplate.mediaFiles?.length > 0) {
      syncAttachments(messagingTemplate.mediaFiles);
    }
  }, [messagingTemplate]);

  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    singleLine: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
  });

  const contentPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    marks: true,
    elements: true,
    images: true,
  });

  const users = useEntity('users');

  const author = users
    ?.all()
    ?.find(
      user =>
        user?.id === messagingTemplate?.createdBy ||
        (!messagingTemplate && user?.id === settings?.user?.id),
    );

  const defaultValues = {
    id: messagingTemplate?.id,
    name: mode !== 'CLONE' ? messagingTemplate?.name : `${messagingTemplate?.name} - Copy`,
    subject: deserialize(messagingTemplate?.subject, {
      format: messagingTemplate?.format,
      plugins: subjectPlugins,
    }),
    content: deserialize(messagingTemplate?.content, {
      format: messagingTemplate?.format,
      plugins: contentPlugins,
    }),
    isOfficial: mode === 'CLONE' ? false : messagingTemplate?.isOfficial,
    isBattlecard: messagingTemplate?.isBattlecard || false,
    visibility: messagingTemplate ? messagingTemplate.visibility === 'PUBLIC' : true,
    stage:
      messagingTemplate?.stage || isNoStatusPlanAccount
        ? TemplateStage.Sales
        : TemplateStage.Prospecting,
    segmentationValues: messagingTemplate?.segmentationValues
      ? messagingTemplate?.segmentationValues
      : {},
    ...(isSnippet ? { shortcut: messagingTemplate?.shortcut } : {}),
  };

  const methods = useForm({ defaultValues });

  const {
    field: { onChange: handleChangeContent, value: contentValue },
  } = useController({
    control: methods.control,
    name: 'content',
  });
  const {
    field: { onChange: handleChangeSubject, value: subjectValue },
  } = useController({
    control: methods.control,
    name: 'subject',
  });

  const {
    field: { onChange: handleChangeShortcut, value: shortcutValue },
  } = useController({
    control: methods.control,
    name: 'shortcut',
  });

  const onSubmit = async data => {
    const templatePayload = {
      id: messagingTemplate?.id,
      name: data?.name ? data.name : '',
      subject: !checkIfIsEmpty(data.subject) ? JSON.stringify(data.subject) : '',
      content: data.content ? JSON.stringify(data.content) : '',
      visibility: data.visibility ? 'PUBLIC' : 'PRIVATE',
      type: templateType,
      stage: data.stage,
      segmentationValues: data?.segmentationValues ? data?.segmentationValues : {},
      format: 'AST',
      isOfficial: data.isOfficial,
      isBattlecard: data.isBattlecard,
      mediaFileIds: attachedFiles?.length > 0 ? attachedFiles.map(file => file.id) : [],
      ...(isSnippet && { shortcut: data.shortcut }),
    };
    if (mode === 'CLONE') {
      await onSave({ ...templatePayload, id: undefined });
    } else {
      await onSave(templatePayload);
      save(UserHelperKeys.CREATE_FIRST_EMAIL_TEMPLATE);
    }
  };

  function openConfirmationModal(data) {
    setModalMode('SAVE');
    setDataToSubmit(data);
  }

  function openDeleteModal() {
    setModalMode('DELETE');
    setDataToSubmit(null);
  }

  useEffect(() => {
    if (error) {
      methods?.setError('name', { type: 'custom', message: error?.name });
    }
  }, [error, methods?.setError]);

  const isEmailtemplate = templateType === TEMPLATE_TYPES.EMAIL;
  const shouldShowImages = isEmailtemplate || templateType === TEMPLATE_TYPES.PITCH;
  const shouldShowTemplateVariables =
    isEmailtemplate ||
    templateType === TEMPLATE_TYPES.LINKEDIN ||
    templateType === TEMPLATE_TYPES.WHATSAPP;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          messagingTemplate?.cadenceUsages > 0 && mode === 'EDITION'
            ? openConfirmationModal
            : onSubmit,
        )}
      >
        <main className={styles._content}>
          <div className={styles._editor}>
            <Button
              className={styles._back__button}
              onClick={onCancel}
              variant="clear"
              color="bloobirds"
              iconLeft="arrowLeft"
            >
              Back to the list
            </Button>
            <Text className={styles._title} color="softPeanut" size="l" weight="medium">
              Configure {TEMPLATE_TYPES_COPIES[templateType]} template
            </Text>
            {mode !== 'CLONE' && mode !== 'CREATION' && (
              <div className={styles._audit_box}>
                <CircularBadge
                  size="s"
                  color="lightPeanut"
                  style={{ color: 'var(--white)', fontSize: '9px' }}
                  backgroundColor={author?.color || 'lightPeanut'}
                >
                  {author?.shortname || 'U'}
                </CircularBadge>
                <Text color="softPeanut" size="s">
                  Created by:{' '}
                </Text>
                <Text color="peanut" size="s">
                  {`${author?.name}${
                    messagingTemplate?.creationDatetime
                      ? ` on ${spacetime(messagingTemplate?.creationDatetime).format('nice-short')}`
                      : ''
                  }`}
                </Text>
                <Text color="softPeanut" size="s">
                  {messagingTemplate?.updatedBy ? `Last updated by: ` : 'Last updated '}{' '}
                </Text>
                {messagingTemplate?.updatedBy && (
                  <Text color="peanut" size="s">
                    {messagingTemplate?.updatedBy}
                    {`${
                      messagingTemplate?.updateDatetime
                        ? ` on ${spacetime(messagingTemplate?.updateDatetime).format('nice-short')}`
                        : ''
                    }`}
                  </Text>
                )}
              </div>
            )}
            <div className={styles._form__row}>
              <Controller
                name="name"
                as={
                  <Input
                    width="100%"
                    error={methods.errors?.name?.message}
                    placeholder={`${isSnippet ? 'Internal' : 'Template'} Name`}
                  />
                }
                control={methods.control}
                rules={{ required: 'A name for the template is required' }}
              />
            </div>
            <Text color="peanut" size="m" weight="medium">
              Content
            </Text>
            {isEmailtemplate && (
              <RichTextEditor
                placeholder="Enter email subject..."
                plugins={subjectPlugins}
                style={{ width: '100%' }}
                defaultValue={subjectValue}
                onChange={handleChangeSubject}
                setEditor={setSubjectEditor}
              >
                {editor => (
                  <div className={styles.subjectAst}>
                    {editor}
                    {subjectEditor && <FloatingTemplateVariable editor={subjectEditor} />}
                  </div>
                )}
              </RichTextEditor>
            )}
            <RichTextEditor
              plugins={contentPlugins}
              defaultValue={contentValue}
              onChange={handleChangeContent}
              setEditor={setBodyEditor}
            >
              {editor => (
                <div className={styles.editor}>
                  <EditorToolbar id="content">
                    <EditorToolbarControlsSection />
                    <EditorToolbarFontStylesSection enabledChangeSize />
                    <EditorToolbarTextMarksSection enableChangeColor />
                    <EditorToolbarListsSection />
                    <EditorToolbarSection>
                      {isEmailtemplate && <TemplateEditorToolbarMeetingLink />}
                      {isEmailtemplate && (
                        <EditorToolbarFileAttachment onAttachment={uploadAttachedFile} />
                      )}
                      {shouldShowImages && <EditorToolbarImage />}
                      {shouldShowTemplateVariables && <EditorToolbarTemplateVariable />}
                    </EditorToolbarSection>
                  </EditorToolbar>
                  <div className={styles.ast}>{editor}</div>
                  {attachedFiles.length > 0 && (
                    <AttachmentList files={attachedFiles} onDelete={removeAttachedFile} />
                  )}
                </div>
              )}
            </RichTextEditor>
            {templateType === TEMPLATE_TYPES.SNIPPET && (
              <div className={styles.shortcutsWrapper}>
                <Text color="peanut" size="m" weight="bold">
                  Shortcuts
                </Text>
                <Text color="softPeanut" size="s">
                  To use a snippet, type “ / ” followed by the snippet name in the text editor,
                  without spaces
                </Text>
                <Input
                  placeholder="Shortcut name"
                  width="100%"
                  value={shortcutValue ? '/' + shortcutValue : ''}
                  onChange={value => {
                    const cleanValue = value.replace(/\s|\//g, '');
                    const parsedValue =
                      cleanValue.length > 49 ? cleanValue.slice(0, 49) : cleanValue;
                    handleChangeShortcut(parsedValue);
                  }}
                  onKeyDown={e => {
                    if (e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            )}
          </div>
          <MessagingSidebarSettings
            templateId={messagingTemplate?.id}
            content={removeHtmlTags(
              serialize(JSON.stringify(contentValue), {
                format: 'AST',
                plugins: contentPlugins,
              }),
            )}
            templateType={templateType}
            templateOwner={messagingTemplate?.createdBy}
            mode={mode}
          />
        </main>
        <MessagingTemplateFooterActions
          type={templateType}
          mode={mode}
          onCancel={onCancel}
          onDelete={cadences?.data?.cadences?.length > 0 ? openDeleteModal : onDelete}
          templateOwner={messagingTemplate?.createdBy}
        />
      </form>
      <ConfirmationModal
        openMode={modalMode}
        data={dataToSubmit}
        onClose={() => setModalMode(false)}
        onSubmit={onSubmit}
        onDiscard={onCancel}
        cadences={cadences}
      />
    </FormProvider>
  );
};

const MessagingTemplateForm = ({
  mode,
  templateType,
  messagingTemplate,
  onSave,
  onDelete,
  onCancel,
  error,
}) => {
  const templateTypeQuery = useQueryParam('templateType');
  const isHTMLEmail =
    templateType === TEMPLATE_TYPES.EMAIL &&
    (messagingTemplate?.format === 'HTML' || templateTypeQuery === 'HTML');
  return isHTMLEmail ? (
    <MessagingHTMLTemplateForm
      mode={mode}
      templateType={templateType}
      messagingTemplate={messagingTemplate}
      onSave={onSave}
      onDelete={onDelete}
      onCancel={onCancel}
      error={error}
    />
  ) : (
    <MessagingASTTemplateForm
      mode={mode}
      templateType={templateType}
      messagingTemplate={messagingTemplate}
      onSave={onSave}
      onDelete={onDelete}
      onCancel={onCancel}
      error={error}
    />
  );
};

export default MessagingTemplateForm;
