import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  RichTextEditor,
  useRichTextEditorPlugins,
  initialValue,
} from '@bloobirds-it/rich-text-editor';
import { SmartEmailTab, SlotsData } from '@bloobirds-it/types';

import { useSmartEmailModal } from './smartEmailModal';
import { isMissingVariable } from './smartEmailModal.view';

function BodyEditor({ setBodyEditor, handleSaveSnippet, defaultValue = initialValue, children }) {
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true,
  });

  const { register, getValues } = useFormContext();
  const { t } = useTranslation();
  const registerProps = register('body', {
    validate: value => {
      if (isMissingVariable(value, false)) {
        return false;
      } else {
        return true;
      }
    },
  });

  const {
    hasSnippetsEnabled,
    setSlotsData,
    setSelectedTab,
    snippets,
    storeEditorRef,
  } = useSmartEmailModal();

  return (
    <RichTextEditor
      id="emailBody"
      placeholder={t('emailModal.bodyPlaceholder')}
      plugins={bodyPlugins}
      style={{ padding: '16px 21px' }}
      // @ts-ignore
      setEditor={(value: MyEditor) => {
        storeEditorRef(value);
        setBodyEditor(value);
      }}
      // @ts-ignore
      snippets={hasSnippetsEnabled && snippets}
      saveSnippetCallback={handleSaveSnippet}
      handleEditSlots={() => {
        setSlotsData((prevSlotsData: SlotsData) => {
          return {
            ...prevSlotsData,
            calendarSlotsVisible: true,
          };
        });
        setSelectedTab(SmartEmailTab.CALENDAR);
      }}
      defaultValue={getValues('body') || defaultValue}
      registerProps={registerProps}
    >
      {children}
    </RichTextEditor>
  );
}

export default BodyEditor;
