import React, { useEffect } from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import {
  deserialize,
  EditorToolbar,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { getValueFromLogicRole, isHtml } from '@bloobirds-it/utils';

import { useStatusNoteActionContext } from '../../hooks/useStatusNoteActions';
import { ColumnHeader } from '../common/columnHeader';
import styles from './noteColumn.module.css';

export const NoteColumn = () => {
  const { note, setNote, loading, saveNote, hasSaved, activity, t } = useStatusNoteActionContext();
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const isCallActivity =
    getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE) ===
    ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;

  const activityTypeString = isCallActivity ? t('noteColumn.call') : t('noteColumn.meeting');

  const deserializedNote = isHtml(note)
    ? deserialize(note, {
        format: 'HTML',
        plugins,
      })
    : note;

  useEffect(saveNote, [JSON.stringify(note)]);

  return (
    <div className={styles.noteColumn}>
      <ColumnHeader
        icon="noteAction"
        text={t('noteColumn.header', { activityType: activityTypeString })}
        subtext={t('noteColumn.description', {
          activityType: activityTypeString,
        })}
        loading={loading}
      >
        {hasSaved && (
          <div style={{ display: 'flex' }}>
            <Icon name="check" color="softPeanut" size={16} />
            <Text size="s" color="softPeanut">
              {t('header.saved')}
            </Text>
          </div>
        )}
      </ColumnHeader>
      <RichTextEditor
        id={'note-detail-body'}
        defaultValue={deserializedNote || ''}
        plugins={plugins}
        placeholder={t('noteColumn.placeholder')}
        onChange={setNote}
        style={{
          padding: '0',
          height: '100%',
        }}
      >
        {editor => (
          <>
            <div className={styles.body_wrapper}>{editor}</div>
            <div className={styles.toolbar}>
              {/* @ts-ignore */}
              <EditorToolbar backgroundColor="var(--peanut) !important">
                <EditorToolbarTextMarksSection color="peanut" />
                <EditorToolbarListsSection color="peanut" />
                <EditorToolbarFontStylesSection color="peanut" />
              </EditorToolbar>
            </div>
          </>
        )}
      </RichTextEditor>
    </div>
  );
};
