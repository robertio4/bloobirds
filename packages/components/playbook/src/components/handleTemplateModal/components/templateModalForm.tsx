import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  deserialize,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFileAttachment,
  EditorToolbarFontStylesSection,
  EditorToolbarImage,
  EditorToolbarListsSection,
  TemplateEditorToolbarMeetingLink,
  EditorToolbarSection,
  EditorToolbarTemplateVariable,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import { TEMPLATE_TYPES } from '@bloobirds-it/types';
import { isHtml, stringToHTML, createParagraph } from '@bloobirds-it/utils';
import { focusEditor, insertElements, PlateEditor, resetEditorChildren } from '@udecode/plate';
import { Editor } from 'slate';

import { TemplateFormContext } from '../../handleTemplate/components/templateForm';
import { NameFormEditor } from '../../handleTemplate/components/templateFormFields/nameFormEditor';
import { TemplateFormFieldsByType } from '../../handleTemplate/components/templateFormFields/templateFormFieldsByType';
import styles from './templateModalForm.module.css';

function updateEditor(editor, value, plugins) {
  if (editor) {
    resetEditorChildren(editor);
    if (value) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        console.log('❌ Error parsing value', e);
        if (isHtml(value)) {
          const parsedNodes = deserialize(stringToHTML(value), { format: 'HTML', plugins });
          value = parsedNodes.map(node => ({ type: 'p', children: [node] }));
        } else {
          value = [{ type: 'p', children: [{ text: value }] }];
        }
      }

      // @ts-ignore
      insertElements(editor, value, {
        at: [0],
      });
    }
  }
}

export function TemplateModalForm({ template, uploadAttachedFile }) {
  const { control } = useFormContext();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateForm' });
  const [contentEditor, setContentEditor] = useState(null);
  const { field: contentField } = useController({
    name: 'content',
    control: control,
  });

  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    rawHTMLBlock: true,
  });

  useEffect(() => {
    updateEditor(contentEditor, contentField.value || template.content, bodyPlugins);
  }, [template.content, contentEditor]);

  const showAttachmentSection = template.type !== TEMPLATE_TYPES.SNIPPET;
  const showMeetingLinksAndAttachments = template.type === TEMPLATE_TYPES.EMAIL;
  const showImages = [TEMPLATE_TYPES.EMAIL, TEMPLATE_TYPES.PITCH].includes(template.type);
  const showVariables = [
    TEMPLATE_TYPES.EMAIL,
    TEMPLATE_TYPES.LINKEDIN,
    TEMPLATE_TYPES.WHATSAPP,
  ].includes(template.type);

  const {
    formState: { isDirty },
  } = useFormContext();
  const singleLinePlugins = useRichTextEditorPlugins({
    templateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true,
  });

  const [haveEditorsBeenStored, setHaveEditorsBeenStored] = useState<boolean>(false);
  const editorsRef = useRef<Editor[]>();
  const focusedEditorRef = useRef(0);

  function updateIndex(count, length) {
    return count === length - 1 ? 0 : count + 1;
  }

  function storeEditorRef(editor) {
    //editor has already been stored to Ref
    if (
      haveEditorsBeenStored ||
      editorsRef?.current?.some(storedEditor => storedEditor?.id === editor.id)
    )
      return;

    // fix to insert the input identifier in the correct position
    if (editor.id === 'shortcutInput') {
      const newArray = [...(editorsRef.current || [])];
      newArray.splice(1, 0, editor);
      editorsRef.current = newArray;
      return;
    }
    editorsRef.current = [...(editorsRef.current || []), editor];
  }

  useEffect(() => {
    if (
      editorsRef?.current?.length ===
      ([TEMPLATE_TYPES.EMAIL, TEMPLATE_TYPES.SNIPPET].includes(template.type) ? 3 : 2)
    ) {
      setHaveEditorsBeenStored(true);
    }
  }, [editorsRef?.current?.length]);

  const updateFocusedIndex = () => {
    focusedEditorRef.current = updateIndex(focusedEditorRef.current, editorsRef?.current?.length);
  };

  function handleEvent(e) {
    if (e.key === 'Tab') {
      updateFocusedIndex();
      e.stopPropagation();
      const focusedEditor = editorsRef.current[focusedEditorRef.current] as PlateEditor;
      if ((focusedEditor as { id: string })?.id === 'shortcutInput') {
        const shortcutInput = document.getElementById('shortcutInput') as HTMLInputElement;
        setTimeout(() => {
          shortcutInput?.focus();
          shortcutInput?.setSelectionRange(
            shortcutInput?.value?.length,
            shortcutInput?.value?.length,
          );
        }, 20);
      } else {
        const focusPoint = Editor.end(focusedEditor, []);
        setTimeout(() => focusEditor(focusedEditor, focusPoint), 0);
      }
    }
  }

  const memoedFunction = useCallback(handleEvent, [haveEditorsBeenStored]);

  useEffect(() => {
    if (!haveEditorsBeenStored) return;
    window.addEventListener('keydown', memoedFunction);
    return () => {
      window.removeEventListener('keydown', memoedFunction);
    };
  }, [haveEditorsBeenStored]);

  const setElements = (templateFieldValue, templateValue, editor, paragraph = false) => {
    if (editor && !!(isDirty && templateFieldValue ? templateFieldValue : templateValue)) {
      const toJson = e => (typeof e === 'string' ? JSON.parse(e) : e);
      const parseValue = e => (paragraph ? createParagraph(e) : toJson(e));

      const value = isDirty && templateFieldValue ? templateFieldValue : parseValue(templateValue);

      resetEditorChildren(editor);
      insertElements(editor, value, { at: [0] });
    }
  };

  return (
    <TemplateFormContext.Provider
      value={{
        template,
        setElements,
        plugins: singleLinePlugins,
        storeEditorRef,
        focusedRef: focusedEditorRef,
      }}
    >
      <div className={styles.form}>
        <NameFormEditor isTemplateModal />
        <TemplateFormFieldsByType isTemplateModal />
      </div>
      <div
        className={styles.bodyContainer}
        data-intercom="send-email-modal-body"
        onClick={() => (focusedEditorRef.current = 2)}
      >
        <RichTextEditor
          id="bodyEditor"
          placeholder={t('enterBodyPlaceholder')}
          plugins={bodyPlugins}
          style={{ padding: '16px 21px' }}
          setEditor={editor => {
            storeEditorRef(editor);
            setContentEditor(editor);
          }}
          /* snippets={hasSnippetsEnabled && snippets}*/
          {...contentField}
        >
          {editor => (
            <>
              <div className={styles.editorToolbar}>
                <EditorToolbar backgroundColor="transparent">
                  <EditorToolbarControlsSection />
                  <EditorToolbarFontStylesSection enableChangeSize />
                  <EditorToolbarTextMarksSection color="white" enableChangeColor />
                  <EditorToolbarListsSection />
                  {showAttachmentSection && (
                    <EditorToolbarSection>
                      {showMeetingLinksAndAttachments && (
                        <>
                          <TemplateEditorToolbarMeetingLink />
                          <EditorToolbarFileAttachment onAttachment={uploadAttachedFile} />
                        </>
                      )}
                      {showImages && <EditorToolbarImage />}
                      {showVariables && <EditorToolbarTemplateVariable />}
                    </EditorToolbarSection>
                  )}
                </EditorToolbar>
              </div>
              <div className={styles._editor__container_ast}>{editor}</div>
            </>
          )}
        </RichTextEditor>
      </div>
    </TemplateFormContext.Provider>
  );
}
