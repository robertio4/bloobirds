import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  RichTextEditor,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
} from '@bloobirds-it/rich-text-editor';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import styles from './noteModal.module.css';

const NoteContentEditor = ({ id, plugins, titlePlugins, defaultValues, children: bottomBar }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'extension.noteModal' });
  const { register, getValues } = useFormContext();
  const registerProps = register(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const titleRegisterProps = register(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);

  return (
    <RichTextEditor
      id={id + '-body'}
      defaultValue={getValues(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE) || defaultValues?.body}
      plugins={plugins}
      placeholder={t('placeholder')}
      registerProps={registerProps}
      style={{
        color: 'var(--peanut) !important',
        padding: '12px 28px 4px 28px',
      }}
    >
      {editor => (
        <>
          <div className={styles.editor}>
            <RichTextEditor
              id={id + '-title'}
              defaultValue={getValues(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE) || defaultValues?.title}
              placeholder={`${t('newNote')}: `}
              plugins={titlePlugins}
              style={{
                padding: '0px 24px 4px 24px',
                color: 'var(--peanut) !important',
              }}
              registerProps={titleRegisterProps}
            />
            <span className={styles.divider} />
            <div className={styles.body_wrapper}>{editor}</div>
          </div>
          <div>
            <NoteToolbar />
            {bottomBar}
          </div>
        </>
      )}
    </RichTextEditor>
  );
};

const NoteToolbar = React.memo(() => (
  <div className={styles.toolbar}>
    <EditorToolbar backgroundColor="var(--peanut) !important">
      <EditorToolbarControlsSection color="peanut" />
      <EditorToolbarFontStylesSection color="peanut" />
      <EditorToolbarTextMarksSection color="peanut" />
      <EditorToolbarListsSection color="peanut" />
    </EditorToolbar>
  </div>
));

export default React.memo(NoteContentEditor);
