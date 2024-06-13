import { CSSProperties, memo, useEffect } from 'react';

import { recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';
import { Plate, TComboboxItem, focusEditor } from '@udecode/plate';
import clsx from 'clsx';
import normalizeUrl from 'normalize-url';

import { MarkBalloonToolbar } from './components/ballonToolbar/MarkBallonToolbar';
import { SaveSnippetButton } from './components/saveSnippetButton/saveSnippetButton';
import { MyEditor, MyValue, useMyPlateEditorRef } from './config/typescript';
import { SnippetCombobox } from './plugins/snippetPlugin/SnippetCombobox';
import styles from './richTextEditor.module.css';

const Editor = ({ setEditor }: { setEditor: (editor: MyEditor) => void }) => {
  const editor = useMyPlateEditorRef();

  useEffect(() => {
    setTimeout(() => {
      if (editor?.id && editor?.id?.toLowerCase().includes('body')) {
        focusEditor(editor);
      }
    }, 100);
  }, []);

  setEditor?.(editor);
  return null;
};

export const PlateWrapper = memo(
  ({
    id,
    placeholder,
    markBallonEnabled,
    saveSnippetCallback,
    setEditor,
    snippets,
    style,
  }: {
    id: string;
    placeholder?: string;
    markBallonEnabled: boolean;
    saveSnippetCallback?: (snippet: string) => void;
    setEditor: (editor: MyEditor) => void;
    snippets?: TComboboxItem[];
    style: CSSProperties;
  }) => {
    const url = normalizeUrl(window.location.href);
    const isSalesforcePage = !!url.match('^.*://.*.lightning.force.com.*');

    const classes = clsx(styles.plate_container, {
      [styles.plate_container_sfc]: isSalesforcePage,
    });

    return (
      <div className={classes} onFocus={removeScrollOfBox} onBlur={recoverScrollOfBox}>
        <Plate<MyValue>
          id={id}
          editableProps={{
            spellCheck: true,
            placeholder,
            style: {
              fontSize: '13px',
              fontFamily: 'Arial, Helvetica, sans-serif',
              padding: 12,
              ...style,
            },
          }}
        >
          {markBallonEnabled && (
            <MarkBalloonToolbar id={id}>
              {snippets && <SaveSnippetButton saveSnippetCallback={saveSnippetCallback} />}
            </MarkBalloonToolbar>
          )}
          <Editor setEditor={setEditor} />

          <SnippetCombobox items={snippets} />
        </Plate>
      </div>
    );
  },
);
