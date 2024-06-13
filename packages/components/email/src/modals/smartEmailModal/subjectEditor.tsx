import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  RichTextEditor,
  useRichTextEditorPlugins,
  initialValue,
} from '@bloobirds-it/rich-text-editor';

import { useSmartEmailModal } from './smartEmailModal';

function SubjectEditor({ setSubjectEditor, defaultValue = initialValue, validator, children }) {
  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true,
  });

  const { t } = useTranslation('translation', { keyPrefix: 'emailModal' });
  const { storeEditorRef } = useSmartEmailModal();
  const { register, getValues } = useFormContext();
  const registerProps = register('subject', {
    validate: value => {
      if (value && (validator() || value[0].children[0].text !== '')) {
        return true;
      } else {
        return false;
      }
    },
  });

  return (
    <RichTextEditor
      id="emailSubject"
      placeholder={t('subjectPlaceholder')}
      plugins={subjectPlugins}
      style={{ width: '100%', padding: 0 }}
      // @ts-ignore
      setEditor={(value: MyEditor) => {
        storeEditorRef(value);
        setSubjectEditor(value);
      }}
      defaultValue={getValues('subject') || defaultValue}
      registerProps={registerProps}
    >
      {children}
    </RichTextEditor>
  );
}

export default SubjectEditor;
