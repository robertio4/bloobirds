import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { createToast } from '@bloobirds-it/flamingo-ui';
import { useMessagingTemplate } from '@bloobirds-it/hooks';
import { useAttachedFiles } from '@bloobirds-it/misc';
import { SmartEmailContext, TEMPLATE_TYPES, TemplateStage } from '@bloobirds-it/types';
import { focusEditor, PlateEditor } from '@udecode/plate';
import { Editor } from 'slate';

import { useCadencesUsingTemplate } from '../../hooks/useCadencesUsingTemplate';
import { useSnippets } from '../../hooks/useSnippets';
import { PlaybookConfirmationModal } from '../playbookConfirmationModal/playbookConfirmationModal';
import { HandleTemplateHeader } from './components/handleTemplateHeader';
import { SegmentationForm } from './components/segmentationForm';
import { TemplateForm } from './components/templateForm';
import styles from './handleTemplate.module.css';
import {
  defaultTemplate,
  getSegmentationValuesToSendToDB,
  parseSegmentationValues,
  Template,
} from './handleTemplate.utils';

function getFocusPoint(focusedEditor, currentSelectedIndex) {
  return currentSelectedIndex !== 1 ? Editor.end(focusedEditor, []) : focusedEditor.selection;
}

export const HandleTemplate = ({
  accountId,
  onBack,
  template,
  contextValues,
  mutateSnippets,
  contextProps,
}: {
  contextProps;
  accountId: string;
  onBack;
  template: SmartEmailContext['selectedTemplate'];
  contextValues;
  mutateSnippets: ReturnType<typeof useSnippets>['mutate'];
}) => {
  const { editorsRef, editorsStored, focusedRef, updateFocusedIndex } = contextProps;
  const isEditing = !!template?.id;
  const isSnippet = template?.type === TEMPLATE_TYPES.SNIPPET;

  const defaultStage = useMemo(() => {
    if (isEditing) {
      return contextValues.stage === 'PROSPECTING'
        ? { stage: TemplateStage.Prospecting }
        : contextValues;
    } else {
      return { stage: TemplateStage.All };
    }
  }, [template?.id, contextValues?.stage]);

  const defaultValues: Template = {
    ...defaultTemplate,
    ...defaultStage,
    ...template,
    segmentationValues: parseSegmentationValues(template.segmentationValues, template.stage),
  };
  const formMethods = useForm<Template>({ defaultValues });
  const { handleSubmit, setError, reset } = formMethods;
  const { saveMessagingTemplate } = useMessagingTemplate(template?.id);
  const [viewSegmentation, setViewSegmentation] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const attachedFilesFunctions = useAttachedFiles();
  const { attachedFiles, syncAttachments } = attachedFilesFunctions;

  const { cadencesUsingTemplate } = useCadencesUsingTemplate(template?.id);
  // eslint-disable-next-line prettier/prettier
  const {t} = useTranslation('translation', { keyPrefix: 'playbook.handleTemplate' });

  useEffect(() => {
    reset(defaultValues);
    // sync attachments from minimized template
    if (template?.mediaFiles?.length > 0) {
      syncAttachments(template.mediaFiles);
    }
  }, [template]);

  function switchView() {
    setViewSegmentation(!viewSegmentation);
  }

  const onSubmit = async (data: Template) => {
    const isNameEmpty =
      !data || !data.name || !data.name[0].children || data.name[0].children[0].text === '';
    if (isNameEmpty) {
      switchView();
      setError('name', {
        type: 'required',
        message: t('toasts.nameRequired'),
      });
    } else {
      const newMessagingTemplate = {
        ...data,
        ...(template?.id ? { id: template?.id } : {}),
        name: data.name[0].children?.[0].text,
        subject: data.subject ? JSON.stringify(data.subject) : '',
        ...(data.shortcut ? { shortcut: data.shortcut } : {}),
        content: data.content ? JSON.stringify(data.content) : '',
        segmentationValues: getSegmentationValuesToSendToDB(data.segmentationValues, data.stage),
        visibility: data.visibility,
        type: template?.type ?? TEMPLATE_TYPES.EMAIL,
        format: 'AST',
        mediaFileIds: attachedFiles?.length > 0 ? attachedFiles.map(file => file.id) : [],
      };
      const res = await saveMessagingTemplate(newMessagingTemplate);
      if (res === 409) {
        createToast({
          type: 'error',
          message: t('toasts.nameAlreadyExists'),
        });
      } else {
        createToast({
          type: 'success',
          message: t('toasts.success'),
        });
        onBack();
        window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
        mutateSnippets();
      }
    }
  };

  function handleConfirm() {
    handleSubmit(
      data => onSubmit(data),
      err => console.log('error', err),
    )();
  }

  function handleSave() {
    if (isEditing && cadencesUsingTemplate && cadencesUsingTemplate?.length) {
      setIsOpenModal(true);
    } else {
      handleConfirm();
    }
  }
  function handleEvent(e) {
    if (e.key === 'Tab') {
      updateFocusedIndex();
      e.stopPropagation();
      const focusedEditor = editorsRef.current[focusedRef.current] as PlateEditor;
      if ((focusedEditor as { id: string })?.id === 'shortcutInput') {
        const shortcutInput = document.getElementById('shortcutInput') as HTMLInputElement;
        setTimeout(() => {
          shortcutInput?.focus();
          shortcutInput?.setSelectionRange(
            shortcutInput?.value?.length,
            shortcutInput?.value?.length,
          );
        });
      } else {
        const focusPoint = getFocusPoint(focusedEditor, focusedRef.current);
        setTimeout(() => focusEditor(focusedEditor, focusPoint), 0);
      }
    }
  }

  const memoedFunction = useCallback(handleEvent, [editorsStored]);

  useEffect(() => {
    if (editorsStored) {
      window.addEventListener('keydown', memoedFunction, true);
      return () => {
        window.removeEventListener('keydown', memoedFunction, true);
      };
    }
  }, [editorsStored]);

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <HandleTemplateHeader
          onBack={onBack}
          handleSave={handleSave}
          viewSegmentation={viewSegmentation}
          switchView={switchView}
          isEditing={isEditing}
          isSnippet={isSnippet}
        />
        {viewSegmentation ? (
          <SegmentationForm canBeBattlecard={isSnippet} />
        ) : (
          <TemplateForm
            template={template}
            contextProps={contextProps}
            {...attachedFilesFunctions}
          />
        )}
      </FormProvider>
      <PlaybookConfirmationModal
        openMode={isOpenModal && t('save')}
        onAccept={handleConfirm}
        onClose={() => setIsOpenModal(false)}
        cadencesUsingTemplate={cadencesUsingTemplate}
      />
    </div>
  );
};
