import { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BobjectSelector } from '@bloobirds-it/bobjects';
import { Button, IconButton, Spinner } from '@bloobirds-it/flamingo-ui';
import { useSessionStorage } from '@bloobirds-it/hooks';
import {
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectTypes,
  ExtensionBobject,
  LinkedInLead,
  SessionStorageKeys,
} from '@bloobirds-it/types';
import hash from 'object-hash';

import { useExtensionContext } from '../../../context';
import styles from './noteDetail.module.css';
import useNoteData from './useNoteData';

export interface NoteModalProps {
  lead: LinkedInLead;
  opportunity: ExtensionBobject;
  company: ExtensionBobject;
  bobjectId: string;
  originallyMainNote: boolean;
  location: 'bubble' | 'leftBar';
  related: string;
  relatedName: string;
}

export const NoteDetail = ({
  id,
  data,
  onSave,
}: {
  id: string;
  data: NoteModalProps;
  onSave: () => void;
}) => {
  const { useGetSettings, useGetDataModel, closeExtendedScreen } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const dataModel = useGetDataModel();
  const { set } = useSessionStorage();
  const { t } = useTranslation('translation', { keyPrefix: 'extension.noteModal' });

  const { control, getValues, handleSubmit, watch } = useForm();

  const titlePlugins = useRichTextEditorPlugins({
    singleLine: true,
  });
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });

  const { defaultName, isSubmitting, onSubmit, isDirty, ...defaultValues } = useNoteData(
    dataModel,
    accountId,
    data,
    plugins,
    titlePlugins,
    getValues,
    onSave,
    closeExtendedScreen,
    watch,
  );
  const [nameSelected, setNameSelected] = useState<string>(defaultName);

  const {
    field: { value: title, onChange: titleOnChange },
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.TITLE,
    defaultValue: defaultValues.title,
  });
  const {
    field: { value: mainNote, onChange: mainNoteOnChange },
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE,
    defaultValue: defaultValues.mainNote,
  });

  const {
    field: { value: note, onChange: noteOnChange },
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.NOTE,
    defaultValue: defaultValues.body,
  });

  const {
    field: { value: related, onChange: relatedOnChange },
  } = useController({
    control,
    name: 'related',
    defaultValue: defaultValues.defaultRelated,
  });

  useEffect(() => {
    setNameSelected(defaultName);
  }, [defaultName]);

  useEffect(() => {
    titleOnChange(defaultValues?.title);
  }, [hash(defaultValues.title)]);

  useEffect(() => {
    mainNoteOnChange(defaultValues?.mainNote);
  }, [defaultValues.mainNote]);

  useEffect(() => {
    noteOnChange(defaultValues?.body);
  }, [hash(defaultValues.body)]);

  useEffect(() => {
    relatedOnChange(defaultValues?.defaultRelated);
  }, [defaultValues.defaultRelated]);

  useEffect(() => {
    set(SessionStorageKeys.NoteInfo, {
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: note,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: title,
      [ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE]: mainNote,
      related,
      relatedName: nameSelected,
    });
  }, [note, title, mainNote, related]);

  return (
    <div key={id} className={styles.container} onClick={event => event.stopPropagation()}>
      <div className={styles.content_container}>
        <RichTextEditor
          id={id + '-body'}
          defaultValue={note}
          plugins={plugins}
          placeholder={t('placeholder')}
          onChange={noteOnChange}
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
                  defaultValue={title}
                  placeholder={`${t('newNote')}: `}
                  plugins={titlePlugins}
                  onChange={titleOnChange}
                  style={{
                    padding: '0px 24px 4px 24px',
                    color: 'var(--peanut) !important',
                  }}
                />
                <span className={styles.divider} />
                <div className={styles.body_wrapper}>{editor}</div>
              </div>
              <div>
                <div className={styles.toolbar}>
                  <EditorToolbar backgroundColor="var(--peanut) !important">
                    <EditorToolbarControlsSection color="peanut" />
                    <EditorToolbarFontStylesSection color="peanut" />
                    <EditorToolbarTextMarksSection color="peanut" />
                    <EditorToolbarListsSection color="peanut" />
                  </EditorToolbar>
                </div>
                <div className={styles.bottom_bar}>
                  <span className={styles.record_related}>
                    <BobjectSelector
                      accountId={accountId}
                      selected={nameSelected}
                      id={id}
                      onBobjectChange={bobject => {
                        relatedOnChange(bobject?.rawBobject?.id);
                        if (bobject?.bobjectType === BobjectTypes.Company) {
                          setNameSelected(bobject?.companyName);
                        } else if (bobject?.bobjectType === BobjectTypes.Lead) {
                          setNameSelected(bobject?.fullName);
                        } else if (bobject?.bobjectType === BobjectTypes.Opportunity) {
                          setNameSelected(bobject?.name);
                        }
                      }}
                    />
                  </span>
                  <span className={styles.bottom_bar_right}>
                    <IconButton
                      name={mainNote ? 'starChecked' : 'starUnchecked'}
                      onClick={() => {
                        mainNoteOnChange(!mainNote);
                      }}
                      color="bloobirds"
                      size={24}
                      className={styles.mainNote}
                    />
                    <Button
                      size="small"
                      onClick={() => {
                        handleSubmit(onSubmit)();
                      }}
                      disabled={!isDirty || isSubmitting}
                    >
                      {isSubmitting ? <Spinner name="loadingCircle" size={12} /> : t('save')}
                    </Button>
                  </span>
                </div>
              </div>
            </>
          )}
        </RichTextEditor>
      </div>
    </div>
  );
};
