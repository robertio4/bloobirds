import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';
import {
  EditorToolbar,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  deserialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import { createParagraph } from '@bloobirds-it/utils';
import { isHtml } from '@bloobirds-it/utils';

import styles from './notesForm.module.css';

const getText = (value, notesPlugins) => {
  if (value) {
    return typeof value === 'string'
      ? isHtml(value)
        ? deserialize(value, {
            format: 'HTML',
            plugins: notesPlugins,
          })
        : createParagraph(value)
      : value;
  }

  return null;
};

export const NotesForm = ({
  notesField,
  title,
  placeholder,
}: {
  notesField: { value: any; onChange: any; ref: any };
  title: string;
  placeholder: string;
}) => {
  const { value, onChange, ref } = notesField;

  const notesPlugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });

  const text = getText(value, notesPlugins); // create paragraph

  return (
    <div className={styles._notes__container} ref={ref}>
      <Text size="s" color="softPeanut">
        {title}
      </Text>
      <div className={styles._notes__box}>
        <RichTextEditor
          defaultValue={text}
          value={text}
          placeholder={placeholder}
          plugins={notesPlugins}
          onChange={onChange}
          style={{
            fontFamily: 'Proxima Nova Soft',
          }}
        >
          {editor => (
            <>
              <EditorToolbar>
                <EditorToolbarFontStylesSection />
                <EditorToolbarTextMarksSection />
                <EditorToolbarListsSection />
              </EditorToolbar>
              <div className={styles._notes_content}>{editor}</div>
            </>
          )}
        </RichTextEditor>
      </div>
    </div>
  );
};
