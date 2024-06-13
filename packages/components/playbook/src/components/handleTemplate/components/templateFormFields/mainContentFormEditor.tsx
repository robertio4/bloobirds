import React, { useContext, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AttachmentList } from '@bloobirds-it/misc';
import {
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarMeetingLink,
  EditorToolbarSection,
  EditorToolbarTemplateVariable,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  TemplateEditorToolbarFileAttachment,
  TemplateEditorToolbarImage,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import { TEMPLATE_TYPES } from '@bloobirds-it/types';

import styles from '../../handleTemplate.module.css';
import { TemplateFormContext } from '../templateForm';

export const MainContentFormEditor = ({
  attachedFiles,
  removeAttachedFile,
  uploadAttachedFile,
}: {
  attachedFiles;
  removeAttachedFile;
  uploadAttachedFile;
}) => {
  const [editor, setEditor] = useState(null);
  const { focusedRef, storeEditorRef, template, setElements } = useContext(TemplateFormContext);
  const { control } = useFormContext();
  //WARNING: the field is named content not body
  const { field } = useController({ control, name: 'content' });
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateForm' });

  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    rawHTMLBlock: true,
  });

  useEffect(() => {
    setElements(field.value, template.content, editor);
  }, [template, editor]);

  const showAttachmentSection = template?.type !== TEMPLATE_TYPES.SNIPPET;

  return (
    <div className={styles.bodyContainer} onClick={() => (focusedRef.current = 4)}>
      <RichTextEditor
        id="templateEditorBody"
        placeholder={t('bodyPlaceholder')}
        plugins={bodyPlugins}
        setEditor={value => {
          setEditor(value);
          storeEditorRef(value);
        }}
        style={{ width: '100%', padding: 0 }}
        {...field}
      >
        {editor => (
          <>
            {attachedFiles?.length > 0 && (
              <AttachmentList files={attachedFiles} onDelete={removeAttachedFile} />
            )}
            <div className={styles._editor__container_ast}>{editor}</div>
            <EditorToolbar backgroundColor="white">
              <div className={styles.editorToolbarSection}>
                <EditorToolbarControlsSection color="peanut" />
              </div>
              <div className={styles.editorToolbarSection}>
                <EditorToolbarFontStylesSection color="peanut" />
              </div>
              <div className={styles.editorToolbarSection}>
                <EditorToolbarTextMarksSection color="peanut" />
              </div>
              <div className={styles.editorToolbarSection}>
                <EditorToolbarListsSection color="peanut" />
              </div>
              {showAttachmentSection && (
                <div className={styles.editorToolbarLastSection}>
                  <EditorToolbarSection>
                    <EditorToolbarMeetingLink color="peanut" />
                    <TemplateEditorToolbarFileAttachment
                      onAttachment={uploadAttachedFile}
                      color="peanut"
                    />
                    <TemplateEditorToolbarImage color="peanut" />
                    <EditorToolbarTemplateVariable />
                  </EditorToolbarSection>
                </div>
              )}
            </EditorToolbar>
          </>
        )}
      </RichTextEditor>
    </div>
  );
};
