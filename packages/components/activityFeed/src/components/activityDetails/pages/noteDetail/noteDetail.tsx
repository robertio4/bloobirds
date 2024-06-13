import React, { useMemo, useState } from 'react';
import { useController, useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ActivityTimelineItem } from '@bloobirds-it/activity-timeline-item';
import { BobjectSelector } from '@bloobirds-it/bobjects';
import { Button, IconButton, Spinner, useToasts } from '@bloobirds-it/flamingo-ui';
import {
  checkEmptyText,
  deserialize,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  serialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BOBJECT_TYPES,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, getReferencedBobjectFromLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';

import styles from './noteDetail.module.css';

const mainNoteField = {
  [BOBJECT_TYPES.COMPANY]: [COMPANY_FIELDS_LOGIC_ROLE.MAIN_NOTE],
  [BOBJECT_TYPES.LEAD]: [LEAD_FIELDS_LOGIC_ROLE.MAIN_NOTE],
  [BOBJECT_TYPES.OPPORTUNITY]: [OPPORTUNITY_FIELDS_LOGIC_ROLE.MAIN_NOTE],
};

export const NoteDetail = ({
  activity,
  dataModel,
  accountId,
  visibleHeader = false,
}: {
  activity: Bobject;
  dataModel: DataModelResponse;
  accountId: string;
  visibleHeader: boolean;
}) => {
  const { t } = useTranslation();
  const noteTitle = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const noteContent = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const noteMainNoteValue = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE);
  const relatedCompany = getReferencedBobjectFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
  );
  const relatedLead = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const relatedOpportunity = getReferencedBobjectFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  );

  const relatedCompanyName = getTextFromLogicRole(relatedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const relatedLeadName = getTextFromLogicRole(relatedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const relatedOpportunityName = getTextFromLogicRole(
    relatedOpportunity,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  );

  const defaultNewNoteValueTitle = [
    {
      type: 'h2',
      children: [
        {
          text: `${t('notes.newNote')}: `,
        },
      ],
    },
  ];

  const titlePlugins = useRichTextEditorPlugins({
    singleLine: true,
  });
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const defaultValues = {
    title:
      noteTitle && typeof noteTitle === 'string'
        ? deserialize(noteTitle, {
            format: 'HTML',
            plugins: titlePlugins,
          })
        : defaultNewNoteValueTitle,
    body:
      noteContent && typeof noteContent === 'string'
        ? deserialize(noteContent, {
            format: 'HTML',
            plugins: plugins,
          })
        : null,
    mainNote: noteMainNoteValue === 'Main note Yes',
  };
  const defaultRelated = relatedLead
    ? relatedLead?.id?.value
    : relatedCompany
    ? relatedCompany?.id?.value
    : relatedOpportunity
    ? relatedOpportunity?.id?.value
    : null;
  const defaultName = relatedLead
    ? // @ts-ignore
      relatedLead?.fullName || relatedLeadName || t('activityTimelineItem.item.untitledLead')
    : relatedCompany
    ? // @ts-ignore
      relatedCompany?.name || relatedCompanyName || t('activityTimelineItem.item.untitledCompany')
    : relatedOpportunity
    ? // @ts-ignore
      relatedOpportunity?.name ||
      relatedOpportunityName ||
      t('activityTimelineItem.item.untitledOpp')
    : null;

  const { control, getValues, handleSubmit, watch } = useForm();
  const [nameSelected, setNameSelected] = useState<string>(defaultName);
  const { createToast } = useToasts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
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
    defaultValue: defaultRelated,
  });

  const noteValue = watch(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const isDirty = useMemo(() => {
    return noteValue && (noteValue.length > 1 || !checkEmptyText(noteValue[0]));
  }, [noteValue]);

  const onSubmit = () => {
    setIsSubmitting(true);
    const { related, ...rest } = getValues();
    const isMainNote = rest[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE];
    const dataToCreate = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]
        ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE], {
            format: 'AST',
            plugins,
          })
        : null,
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]
        ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE], {
            format: 'AST',
            plugins,
          })
        : null,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE,
      [ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE]: isMainNote
        ? ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES
        : ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.NO,
    };
    let relatedBobjectType: string;
    if (related) {
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

    api
      .patch(`/bobjects/${activity?.id?.value}/raw`, {
        contents: { ...dataToCreate },
        params: {},
      })
      .then(() => {
        setIsSubmitting(false);
        createToast({ message: 'Note updated successfully', type: 'success' });
        if (isMainNote && related && relatedBobjectType) {
          api.patch(`/bobjects/${related}/raw`, {
            contents: {
              [mainNoteField[relatedBobjectType]]: [activity?.id?.value],
            },
          });
        } else if (!isMainNote && related && relatedBobjectType) {
          api.patch(`/bobjects/${related}/raw`, {
            contents: {
              [mainNoteField[relatedBobjectType]]: null,
            },
          });
        }
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      {visibleHeader && (
        <ActivityTimelineItem
          activity={activity}
          startDisplayDivider={false}
          endDisplayDivider={false}
          activeHover={false}
          extended
          dataModel={dataModel}
        />
      )}
      <div className={styles.detail_content_container}>
        <div className={styles.editor}>
          <RichTextEditor
            id={'note-detail-title'}
            defaultValue={title}
            placeholder={t('activityTimelineItem.item.newNote') + ': '}
            plugins={titlePlugins}
            onChange={titleOnChange}
            style={{
              padding: '0px 24px 4px 24px',
            }}
          />
          <span className={styles.divider} />
          <RichTextEditor
            id={'note-detail-body'}
            defaultValue={note}
            plugins={plugins}
            placeholder={t('activityTimelineItem.item.startNewNote')}
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
        <div>
          <div className={styles.bottom_bar}>
            <span className={styles.record_related}>
              <div className={styles.bobject_selector}>
                <BobjectSelector
                  accountId={accountId}
                  selected={nameSelected}
                  id={activity?.id?.value}
                  onBobjectChange={bobject => {
                    relatedOnChange(bobject?.rawBobject?.id);
                    if (bobject?.bobjectType === BobjectTypes.Company) {
                      setNameSelected(
                        bobject?.companyName ||
                          //@ts-ignore
                          getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME),
                      );
                    } else if (bobject?.bobjectType === BobjectTypes.Lead) {
                      setNameSelected(
                        bobject?.fullName ||
                          //@ts-ignore
                          getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
                      );
                    } else if (bobject?.bobjectType === BobjectTypes.Opportunity) {
                      setNameSelected(
                        bobject?.name ||
                          //@ts-ignore
                          getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
                      );
                    }
                  }}
                />
              </div>
            </span>
            <span>
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
                {isSubmitting ? <Spinner name="loadingCircle" size={12} /> : t('common.save')}
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      // @ts-ignore
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
              // @ts-ignore
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
    {/* @ts-ignore */}
    <EditorToolbar backgroundColor="var(--peanut) !important">
      <EditorToolbarControlsSection color="peanut" />
      <EditorToolbarFontStylesSection color="peanut" />
      <EditorToolbarTextMarksSection color="peanut" />
      <EditorToolbarListsSection color="peanut" />
    </EditorToolbar>
  </div>
));

export default React.memo(NoteContentEditor);
