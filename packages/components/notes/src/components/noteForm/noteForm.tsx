import React, { useEffect, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BobjectSelector } from '@bloobirds-it/bobjects';
import { CopilotSummary } from '@bloobirds-it/copilot';
import { Button, Icon, IconButton, Spinner, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useCopilotEnabled, useDebouncedCallback } from '@bloobirds-it/hooks';
import {
  deserialize,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  MyEditor,
  RichTextEditor,
  serialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  ActivityInsights,
  BOBJECT_TYPES,
  BobjectId,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, isHtml, createParagraph } from '@bloobirds-it/utils';
import { insertNodes, removeNodes } from '@udecode/plate';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import useSWR from 'swr';

import styles from './noteForm.module.css';
import { onBobjectChange } from './noteForm.utils';

const mainNoteField = {
  [BOBJECT_TYPES.COMPANY]: [COMPANY_FIELDS_LOGIC_ROLE.MAIN_NOTE],
  [BOBJECT_TYPES.LEAD]: [LEAD_FIELDS_LOGIC_ROLE.MAIN_NOTE],
  [BOBJECT_TYPES.OPPORTUNITY]: [OPPORTUNITY_FIELDS_LOGIC_ROLE.MAIN_NOTE],
};

const defaultNewNoteValueTitle = (t: TFunction) => [
  {
    type: 'h2',
    children: [
      {
        text: t('newNote'),
      },
    ],
  },
];

export interface NoteFormProps {
  activityId: BobjectId;
  title?: string;
  content?: any;
  mainNote?: string;
  related?: string;
  relatedName?: string;
  accountId: string;
  onSave?: (id?: string) => void;
  bodyPlaceholder?: string;
  activityType?: string;
  alternativeFooter?: JSX.Element;
  showFooter?: boolean;
  fitAllHeight?: boolean;
  copilotAnalysis?: string;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteForm = (props: NoteFormProps) => {
  const {
    activityId,
    title: noteTitle,
    content: noteContent,
    mainNote: noteMainNoteValue,
    related,
    relatedName,
    accountId,
    onSave,
    bodyPlaceholder,
    activityType,
    alternativeFooter,
    showFooter = true,
    fitAllHeight,
    setIsLoading,
    copilotAnalysis,
  } = props;
  const { t } = useTranslation('translation', { keyPrefix: 'notes' });

  const { control, getValues, handleSubmit, watch } = useForm();
  const [nameSelected, setNameSelected] = useState<string>(relatedName);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const isEditionModal = useRef(!!activityId);

  const isNote =
    activityType !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING &&
    activityType !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;

  const isCall = activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  const isMeeting = activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING;

  const isAnActivityFieldNote = isMeeting || isCall;

  const { createToast } = useToasts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(isSubmitting);
    }
  }, [isSubmitting]);

  const titlePlugins = useRichTextEditorPlugins({
    singleLine: true,
  });

  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });

  function getTitle() {
    if (isHtml(noteTitle)) {
      if (noteTitle && typeof noteTitle === 'string') {
        return deserialize(noteTitle, {
          format: 'HTML',
          plugins: titlePlugins,
        });
      } else {
        return defaultNewNoteValueTitle(t);
      }
    } else {
      if (noteTitle && typeof noteTitle === 'string') {
        return !isNote ? noteTitle : createParagraph(noteTitle);
      } else {
        return defaultNewNoteValueTitle(t);
      }
    }
  }

  const defaultValues = {
    title: getTitle(),
    body:
      noteContent && typeof noteContent === 'string'
        ? isHtml(noteContent)
          ? deserialize(noteContent, {
              format: 'HTML',
              plugins: plugins,
            })
          : createParagraph(noteContent)
        : null,
    mainNote: noteMainNoteValue === 'Main note Yes',
  };

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
    field: { onChange: relatedOnChange },
  } = useController({
    control,
    name: 'related',
    defaultValue: related,
  });

  const titleValue = watch(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const noteValue = watch(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);

  useEffect(() => {
    if (!hasChanges && (titleValue || noteValue)) {
      if (
        JSON.stringify(defaultValues.title) !== JSON.stringify(titleValue) ||
        JSON.stringify(defaultValues.body) !== JSON.stringify(noteValue)
      ) {
        setHasChanges(true);
      }
    }
  }, [titleValue, noteValue]);

  const onSubmit = () => {
    setIsSubmitting(true);
    const { related, ...rest } = getValues();
    const isMainNote = rest[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE];
    const dataToCreate = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]
        ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE], {
            format: 'AST',
            plugins,
          })
        : null,
    };
    if (isNote) {
      dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE] = rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]
        ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE], {
            format: 'AST',
            plugins,
          })
        : null;

      dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] = isMainNote
        ? ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES
        : ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.NO;

      dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.TYPE] = ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE;
    }
    let relatedBobjectType: string;
    if (related && isNote) {
      if (related?.includes('Lead')) {
        relatedBobjectType = BOBJECT_TYPES.LEAD;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes('Company')) {
        relatedBobjectType = BOBJECT_TYPES.COMPANY;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes('Opportunity')) {
        relatedBobjectType = BOBJECT_TYPES.OPPORTUNITY;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = null;
      }
    }

    const params = { duplicateValidation: true };
    if (!isEditionModal.current) {
      api
        .post(`/bobjects/${accountId}/Activity`, {
          contents: { ...dataToCreate },
          params,
        })
        .then(activityCreated => {
          setIsSubmitting(false);
          //createToast({ message: 'Note created successfully', type: 'success' });
          if (isMainNote && related && relatedBobjectType && activityCreated?.data) {
            api.patch(`/bobjects/${related}/raw`, {
              contents: {
                [mainNoteField[relatedBobjectType]]: [activityCreated?.data?.value],
              },
              params,
            });
          } else if (!isMainNote && related && relatedBobjectType) {
            api.patch(`/bobjects/${related}/raw`, {
              contents: {
                [mainNoteField[relatedBobjectType]]: null,
              },
              params,
            });
          }
          onSave?.(activityCreated?.data?.value);
        })
        .catch(() => {
          setIsSubmitting(false);
          createToast({ message: t('toasts.errorCreating'), type: 'error' });
        });
    } else {
      api
        .patch(`/bobjects/${activityId?.value}/raw`, {
          contents: dataToCreate,
          params: {},
        })
        .then(() => {
          setIsSubmitting(false);
          //createToast({ message: 'Note updated successfully.', type: 'success' });
          if (isMainNote && related && relatedBobjectType) {
            api.patch(`/bobjects/${related}/raw`, {
              contents: {
                [mainNoteField[relatedBobjectType]]: [activityId?.value],
              },
            });
          } else if (!isMainNote && related && relatedBobjectType) {
            api.patch(`/bobjects/${related}/raw`, {
              contents: {
                [mainNoteField[relatedBobjectType]]: null,
              },
            });
          }
          onSave?.(activityId?.value);
        })
        .catch(() => {
          setIsSubmitting(false);
          createToast({ message: t('toasts.errorUpdating'), type: 'error' });
        });
    }
  };

  const saveNote = useDebouncedCallback(
    () => {
      onSubmit();
      isEditionModal.current = true;
    },
    500,
    [onSubmit],
  );

  useEffect(() => {
    if (hasChanges) {
      saveNote();
    }
  }, [JSON.stringify(noteValue)]);

  const alternativeFooterComponent = alternativeFooter
    ? React.cloneElement(alternativeFooter, {
        onSubmit: handleSubmit(onSubmit),
      })
    : null;

  const containerClass = clsx(styles.container, {
    [styles.fullHeight]: fitAllHeight,
  });

  function getBackgroundColor() {
    if (isMeeting) return 'var(--lightestMeeting)';
    if (isCall) return 'var(--lightestCall)';
    return 'var(--banana)';
  }

  const isCopilotEnabled = useCopilotEnabled(accountId);

  const hasAi = !!copilotAnalysis;

  const { data: activityInsights } = useSWR(
    hasAi && `/copilot/transcript/insights/${activityId.objectId}`,
    key => api.get<ActivityInsights>(key).then(res => res.data),
  );

  const copyToNote = (value: string) => {
    if (noteValue.length === 1 && noteValue[0].children[0].text === '') {
      removeNodes(bodyEditor, { at: [0] });
      insertNodes(bodyEditor, createParagraph(value)?.[0], { at: [0] });
    } else {
      removeNodes(bodyEditor, { at: [0] });
      insertNodes(bodyEditor, [...noteValue, ...createParagraph(''), ...createParagraph(value)], {
        at: [0],
      });
    }
  };

  const [bodyEditor, setBodyEditor] = useState<MyEditor>(null);

  return (
    <div className={containerClass}>
      <div className={styles.detail_content_container}>
        <div className={styles.editor}>
          <span className={styles.title_container}>
            {!isCall && (
              <div
                className={styles.noteIcon}
                style={{
                  backgroundColor: getBackgroundColor(),
                }}
              >
                {isMeeting && <Icon name="calendar" color="extraMeeting" size={16} />}
                {isNote && <Icon name="noteAction" color="peanut" size={16} />}
              </div>
            )}
            {isAnActivityFieldNote ? (
              <Text weight="bold" className={styles.title}>
                {noteTitle}
              </Text>
            ) : (
              <RichTextEditor
                id={'note-detail-title'}
                defaultValue={title}
                placeholder={t('titlePlaceholder')}
                plugins={titlePlugins}
                onChange={titleOnChange}
                style={{
                  padding: '4px 12px',
                }}
              />
            )}
            {isSubmitting && (
              <div className={styles.isSavingContainer}>
                <Spinner size={11} name="loadingCircle" color="softPeanut" />
                <Text size="xs" color="softPeanut">
                  {t('saving')}
                </Text>
              </div>
            )}
          </span>
          {isCopilotEnabled && activityInsights && (
            <CopilotSummary
              summary={activityInsights.summary}
              activityId={activityId}
              buttonIcon="arrowDown"
              copyToNote={copyToNote}
              isInPreview={true}
            />
          )}
          {!isCopilotEnabled || (!activityInsights && <span className={styles.divider} />)}
          <RichTextEditor
            id={'note-detail-body'}
            defaultValue={note}
            setEditor={setBodyEditor}
            plugins={plugins}
            placeholder={bodyPlaceholder || t('placeholder')}
            onChange={noteOnChange}
            style={{
              padding: '12px 28px 4px 28px',
            }}
          >
            {editor => (
              <>
                <div className={styles.body_wrapper}>{editor}</div>
                <div className={styles.toolbar}>
                  {/* @ts-ignore */}
                  <EditorToolbar backgroundColor="var(--peanut) !important">
                    <EditorToolbarControlsSection color="peanut" />
                    <EditorToolbarFontStylesSection color="peanut" />
                    <EditorToolbarTextMarksSection color="peanut" />
                    <EditorToolbarListsSection color="peanut" />
                  </EditorToolbar>
                </div>
              </>
            )}
          </RichTextEditor>
        </div>
        {showFooter && (
          <div>
            <div
              className={clsx(styles.bottom_bar, {
                [styles.bottom_bar_alternative]: !!alternativeFooter,
              })}
            >
              <span className={styles.record_related}>
                {isNote && (
                  <div className={styles.bobject_selector}>
                    <BobjectSelector
                      accountId={accountId}
                      selected={nameSelected}
                      id={activityId?.value}
                      onBobjectChange={bobject =>
                        onBobjectChange(bobject, relatedOnChange, setNameSelected)
                      }
                    />
                  </div>
                )}
              </span>
              {alternativeFooter ? (
                alternativeFooterComponent
              ) : (
                <span>
                  {isNote && (
                    <IconButton
                      name={mainNote ? 'starChecked' : 'starUnchecked'}
                      onClick={() => {
                        mainNoteOnChange(!mainNote);
                      }}
                      color="bloobirds"
                      size={24}
                      className={styles.mainNote}
                    />
                  )}
                  <Button
                    size="small"
                    onClick={() => {
                      handleSubmit(onSubmit)();
                    }}
                    disabled={isSubmitting || !hasChanges}
                  >
                    {isSubmitting ? <Spinner name="loadingCircle" size={12} /> : t('save')}
                  </Button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
