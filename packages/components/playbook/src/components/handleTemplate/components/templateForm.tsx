import React, { createContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { SmartEmailContext } from '@bloobirds-it/types';
import { removeHtmlTags, createParagraph } from '@bloobirds-it/utils';
import { insertElements, resetEditorChildren } from '@udecode/plate';

import { MainContentFormEditor } from './templateFormFields/mainContentFormEditor';
import { NameFormEditor } from './templateFormFields/nameFormEditor';
import { TemplateFormFieldsByType } from './templateFormFields/templateFormFieldsByType';
import { TemplateHeader } from './templateFormHeader';

interface TemplateFormContextInterface {
  template: SmartEmailContext['selectedTemplate'];
  setElements;
  plugins;
  storeEditorRef?;
  focusedRef?;
}

export const TemplateFormContext = createContext<TemplateFormContextInterface>(null);

export const TemplateForm = ({
  template,
  contextProps,
  ...attachedFilesFunctions
}: {
  contextProps;
  template: SmartEmailContext['selectedTemplate'];
  attachedFiles;
  removeAttachedFile;
  uploadAttachedFile;
}) => {
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

  const setElements = (templateFieldValue, templateValue, editor, paragraph = false) => {
    if (editor && !!(isDirty && templateFieldValue ? templateFieldValue : templateValue)) {
      const toJson = e => (typeof e === 'string' ? JSON.parse(removeHtmlTags(e)) : e);
      const parseValue = e => (paragraph ? createParagraph(e) : toJson(e));

      const value = isDirty && templateFieldValue ? templateFieldValue : parseValue(templateValue);

      resetEditorChildren(editor);
      insertElements(editor, value, { at: [0] });
    }
  };

  return (
    <TemplateFormContext.Provider
      value={{ ...contextProps, template, setElements, plugins: singleLinePlugins }}
    >
      <TemplateHeader />
      <NameFormEditor />
      <TemplateFormFieldsByType />
      <MainContentFormEditor {...attachedFilesFunctions} />
    </TemplateFormContext.Provider>
  );
};
